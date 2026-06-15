import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Trophy, Shield, Radio } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  isActive: boolean;
}

interface Match {
  id: number;
  utcDate: string;
  status: string;
  stage: string;
  group?: string | null;
  homeTeam: { name: string; tla?: string };
  awayTeam: { name: string; tla?: string };
  score: { home: number | null; away: number | null };
  venue?: string | null;
}

const STAGE_LABEL: Record<string, string> = {
  GROUP_STAGE: "Grupos",
  LAST_16: "Oitavas",
  QUARTER_FINALS: "Quartas",
  SEMI_FINALS: "Semi",
  THIRD_PLACE: "3º Lugar",
  FINAL: "Final",
  PLAYOFFS: "Playoff",
};

const STATUS_LABEL: Record<string, string> = {
  SCHEDULED: "Agendado",
  TIMED: "Agendado",
  IN_PLAY: "AO VIVO",
  PAUSED: "Intervalo",
  FINISHED: "Encerrado",
  POSTPONED: "Adiado",
  SUSPENDED: "Suspenso",
  CANCELLED: "Cancelado",
};

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// FIFA TLA → ISO 3166-1 alpha-2 (para flagcdn.com)
const TLA_TO_ISO2: Record<string, string> = {
  BRA: "br", ARG: "ar", URU: "uy", PAR: "py", COL: "co", ECU: "ec", PER: "pe",
  CHI: "cl", VEN: "ve", BOL: "bo", USA: "us", MEX: "mx", CAN: "ca", CRC: "cr",
  PAN: "pa", HON: "hn", JAM: "jm", HAI: "ht", ESP: "es", POR: "pt", FRA: "fr",
  GER: "de", ITA: "it", ENG: "gb-eng", SCO: "gb-sct", WAL: "gb-wls", NIR: "gb-nir",
  IRL: "ie", NED: "nl", BEL: "be", SUI: "ch", AUT: "at", POL: "pl", CZE: "cz",
  SVK: "sk", HUN: "hu", ROU: "ro", BUL: "bg", GRE: "gr", CRO: "hr", SRB: "rs",
  SVN: "si", BIH: "ba", MKD: "mk", ALB: "al", UKR: "ua", RUS: "ru", TUR: "tr",
  DEN: "dk", SWE: "se", NOR: "no", FIN: "fi", ISL: "is", JPN: "jp", KOR: "kr",
  PRK: "kp", CHN: "cn", AUS: "au", NZL: "nz", IRN: "ir", IRQ: "iq", KSA: "sa",
  UAE: "ae", QAT: "qa", SYR: "sy", JOR: "jo", LBN: "lb", PLE: "ps", MAR: "ma",
  ALG: "dz", TUN: "tn", EGY: "eg", LBY: "ly", SEN: "sn", CIV: "ci", GHA: "gh",
  NGA: "ng", CMR: "cm", RSA: "za", KEN: "ke", UGA: "ug", ZIM: "zw", MLI: "ml",
  BFA: "bf", ANG: "ao", CPV: "cv", GUI: "gn", GAB: "ga", COD: "cd", CGO: "cg",
  ETH: "et", SUD: "sd", MAD: "mg", ZAM: "zm", IND: "in", IDN: "id", THA: "th",
  VIE: "vn", MAS: "my", SGP: "sg", PHI: "ph", UZB: "uz",
};

const TEAM_ACCENT: Record<string, string> = {
  BRA: "#facc15", ARG: "#60a5fa", FRA: "#3b82f6", GER: "#a3a3a3", ESP: "#ef4444",
  POR: "#16a34a", ENG: "#dc2626", NED: "#f97316", ITA: "#22c55e", BEL: "#eab308",
  CRO: "#ef4444", URU: "#38bdf8", COL: "#fde047", MEX: "#16a34a", USA: "#3b82f6",
  CAN: "#ef4444", MAR: "#dc2626", JPN: "#dc2626", KOR: "#3b82f6", AUS: "#facc15",
  SUI: "#ef4444", DEN: "#dc2626", SEN: "#16a34a", CIV: "#f97316", GHA: "#facc15",
  CMR: "#16a34a", RSA: "#16a34a", IRN: "#16a34a", SRB: "#dc2626", POL: "#dc2626",
};

function teamFlag(tla?: string) {
  if (!tla) return null;
  const iso = TLA_TO_ISO2[tla.toUpperCase()];
  if (!iso) return null;
  return `https://flagcdn.com/w80/${iso}.png`;
}

function teamColor(tla?: string) {
  if (!tla) return "#a855f7";
  return TEAM_ACCENT[tla.toUpperCase()] || "#a855f7";
}

function formatMatchDate(utc: string) {
  const d = new Date(utc);
  const dia = DIAS[d.getDay()];
  const data = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  const hora = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
  return { dia, data, hora };
}

export const CopaCalendarSlide = ({ isActive }: Props) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchMatches = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("worldcup-matches");
        if (cancelled) return;
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        setMatches(data?.matches || []);
        setError(null);
      } catch (e: any) {
        if (cancelled) return;
        console.error("Erro buscando jogos:", e);
        setError(e.message || "Erro ao carregar jogos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMatches();
    // Atualiza a cada 60s
    const id = setInterval(fetchMatches, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Seleciona próximos/em andamento (ordenados por data), no máximo 6
  const display = (() => {
    const now = Date.now();
    const live = matches.filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED");
    const upcoming = matches
      .filter((m) => new Date(m.utcDate).getTime() >= now - 2 * 60 * 60 * 1000 && !live.includes(m))
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
    const finished = matches
      .filter((m) => m.status === "FINISHED")
      .sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

    const combined = [...live, ...upcoming, ...finished];
    return combined.slice(0, 6);
  })();

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0f2e 0%, #0d0514 50%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 md:p-10 lg:p-14 gap-6 lg:gap-8">
        {/* Header */}
        <div className="text-center space-y-3 max-w-5xl">
          <div
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase",
              isActive && "fade-in"
            )}
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.5)",
              color: "#c084fc",
            }}
          >
            <Trophy className="w-4 h-4" />
            Copa do Mundo FIFA 2026
          </div>
          <h2
            className={cn(
              "font-display font-black text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight",
              isActive && "fade-in-up"
            )}
            style={{
              background:
                "linear-gradient(135deg, #c084fc 0%, #a855f7 40%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 50px rgba(168, 85, 247, 0.4)",
            }}
          >
            CALENDÁRIO AO VIVO
          </h2>
          <p className="text-white/85 font-display text-base md:text-xl">
            Jogos, horários e resultados em tempo real
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="text-white/70 font-display text-lg">Carregando jogos...</div>
        )}

        {!loading && error && (
          <div className="max-w-2xl text-center space-y-2 p-6 rounded-2xl border border-red-500/30 bg-red-500/10">
            <div className="text-red-300 font-display font-bold">Não foi possível carregar os jogos</div>
            <div className="text-white/70 text-sm">{error}</div>
            <div className="text-white/50 text-xs">
              O plano gratuito do football-data.org pode não incluir a Copa 2026.
            </div>
          </div>
        )}

        {!loading && !error && display.length === 0 && (
          <div className="text-white/70 font-display text-lg">
            Nenhum jogo disponível no momento.
          </div>
        )}

        {/* Games Grid */}
        {!loading && !error && display.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full",
              isActive && "fade-in-delayed"
            )}
          >
            {display.map((jogo, i) => {
              const { dia, data, hora } = formatMatchDate(jogo.utcDate);
              const faseLabel = STAGE_LABEL[jogo.stage] || jogo.stage?.replace(/_/g, " ") || "—";
              const isLive = jogo.status === "IN_PLAY" || jogo.status === "PAUSED";
              const isFinished = jogo.status === "FINISHED";
              const isFinal = jogo.stage === "FINAL";
              const hasScore = jogo.score.home !== null && jogo.score.away !== null;

              return (
                <div
                  key={jogo.id}
                  className="relative group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-60"
                    style={{
                      background: isFinal
                        ? "radial-gradient(circle, #fbbf24 0%, transparent 70%)"
                        : isLive
                        ? "radial-gradient(circle, #ef4444 0%, transparent 70%)"
                        : "radial-gradient(circle, #a855f7 0%, transparent 70%)",
                    }}
                  />

                  <div
                    className="relative rounded-2xl p-4 lg:p-5 transition-all duration-300 group-hover:scale-[1.02]"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: isLive
                        ? "1px solid rgba(239, 68, 68, 0.6)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      boxShadow: isLive ? "0 0 30px rgba(239,68,68,0.25)" : undefined,
                    }}
                  >
                    {/* Phase + status badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-display tracking-wider uppercase"
                        style={{
                          background: isFinal
                            ? "rgba(251, 191, 36, 0.2)"
                            : "rgba(168, 85, 247, 0.2)",
                          border: isFinal
                            ? "1px solid rgba(251, 191, 36, 0.5)"
                            : "1px solid rgba(168, 85, 247, 0.4)",
                          color: isFinal ? "#fbbf24" : "#c084fc",
                        }}
                      >
                        <Shield className="w-3 h-3" />
                        {faseLabel}
                        {jogo.group ? ` · ${jogo.group.replace("GROUP_", "G ")}` : ""}
                      </div>

                      {isLive && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-display tracking-wider uppercase animate-pulse"
                          style={{
                            background: "rgba(239, 68, 68, 0.25)",
                            border: "1px solid rgba(239, 68, 68, 0.6)",
                            color: "#fca5a5",
                          }}
                        >
                          <Radio className="w-3 h-3" />
                          AO VIVO
                        </div>
                      )}
                      {isFinished && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-display tracking-wider uppercase"
                          style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            color: "#d1d5db",
                          }}
                        >
                          Final
                        </div>
                      )}
                    </div>

                    {/* Teams + score */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-white font-display font-bold text-sm md:text-base truncate flex-1">
                        {jogo.homeTeam.name}
                      </span>
                      <span
                        className="text-sm font-display font-black px-3 py-0.5 rounded min-w-[60px] text-center"
                        style={{
                          background: hasScore
                            ? "rgba(168, 85, 247, 0.35)"
                            : "rgba(168, 85, 247, 0.2)",
                          color: hasScore ? "#ffffff" : "#c084fc",
                        }}
                      >
                        {hasScore ? `${jogo.score.home} - ${jogo.score.away}` : "VS"}
                      </span>
                      <span className="text-white font-display font-bold text-sm md:text-base truncate text-right flex-1">
                        {jogo.awayTeam.name}
                      </span>
                    </div>

                    {/* Info row */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-white/60 font-display">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        <span className="text-white/80">{data}</span>
                        <span>({dia})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span className="text-cyan-300">{hora}</span>
                      </div>
                      {jogo.venue && (
                        <div className="flex items-center gap-1 min-w-0">
                          <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                          <span className="truncate">{jogo.venue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className={cn(isActive && "fade-in-delayed")}>
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-display font-bold tracking-wider text-sm md:text-base uppercase"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
              color: "white",
              boxShadow:
                "0 0 40px rgba(168, 85, 247, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <Trophy className="w-4 h-4 fill-current" />
            Venha torcer com a gente
          </div>
        </div>
      </div>
    </div>
  );
};
