import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Trophy, Shield } from "lucide-react";

interface Props {
  isActive: boolean;
}

const JOGOS = [
  {
    data: "20/06",
    dia: "Sexta",
    hora: "19:00",
    timeA: "Brasil",
    timeB: "Argentina",
    local: "Maracanã",
    fase: "Oitavas",
  },
  {
    data: "21/06",
    dia: "Sábado",
    hora: "16:00",
    timeA: "Alemanha",
    timeB: "França",
    local: "Allianz Arena",
    fase: "Oitavas",
  },
  {
    data: "22/06",
    dia: "Domingo",
    hora: "13:00",
    timeA: "Espanha",
    timeB: "Portugal",
    local: "Santiago Bernabéu",
    fase: "Oitavas",
  },
  {
    data: "23/06",
    dia: "Segunda",
    hora: "16:00",
    timeA: "Inglaterra",
    timeB: "Holanda",
    local: "Wembley",
    fase: "Quartas",
  },
  {
    data: "24/06",
    dia: "Terça",
    hora: "20:00",
    timeA: "Brasil",
    timeB: "Espanha",
    local: "Maracanã",
    fase: "Quartas",
  },
  {
    data: "27/06",
    dia: "Sexta",
    hora: "16:00",
    timeA: "Finalista A",
    timeB: "Finalista B",
    local: "Lusail Stadium",
    fase: "Final",
  },
];

export const CopaCalendarSlide = ({ isActive }: Props) => {
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
      {/* Grid pattern overlay */}
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
            Copa do Mundo FIFA
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
            CALENDÁRIO DE JOGOS
          </h2>
          <p className="text-white/85 font-display text-base md:text-xl">
            Acompanhe todos os jogos da Copa no QG
          </p>
        </div>

        {/* Games Grid */}
        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full",
            isActive && "fade-in-delayed"
          )}
        >
          {JOGOS.map((jogo, i) => (
            <div
              key={i}
              className="relative group"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-60"
                style={{
                  background:
                    jogo.fase === "Final"
                      ? "radial-gradient(circle, #fbbf24 0%, transparent 70%)"
                      : "radial-gradient(circle, #a855f7 0%, transparent 70%)",
                }}
              />

              <div
                className="relative rounded-2xl p-4 lg:p-5 transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Phase badge */}
                <div
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-display tracking-wider uppercase mb-3"
                  style={{
                    background:
                      jogo.fase === "Final"
                        ? "rgba(251, 191, 36, 0.2)"
                        : jogo.fase === "Quartas"
                        ? "rgba(168, 85, 247, 0.2)"
                        : "rgba(6, 182, 212, 0.15)",
                    border:
                      jogo.fase === "Final"
                        ? "1px solid rgba(251, 191, 36, 0.5)"
                        : jogo.fase === "Quartas"
                        ? "1px solid rgba(168, 85, 247, 0.4)"
                        : "1px solid rgba(6, 182, 212, 0.3)",
                    color:
                      jogo.fase === "Final"
                        ? "#fbbf24"
                        : jogo.fase === "Quartas"
                        ? "#c084fc"
                        : "#67e8f9",
                  }}
                >
                  <Shield className="w-3 h-3" />
                  {jogo.fase}
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-white font-display font-bold text-sm md:text-base truncate">
                    {jogo.timeA}
                  </span>
                  <span
                    className="text-xs font-display font-black px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(168, 85, 247, 0.3)",
                      color: "#c084fc",
                    }}
                  >
                    VS
                  </span>
                  <span className="text-white font-display font-bold text-sm md:text-base truncate text-right">
                    {jogo.timeB}
                  </span>
                </div>

                {/* Info row */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-white/60 font-display">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    <span className="text-white/80">{jogo.data}</span>
                    <span>({jogo.dia})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-300">{jogo.hora}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    <span>{jogo.local}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={cn(isActive && "fade-in-delayed")}>
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-display font-bold tracking-wider text-sm md:text-base uppercase"
            style={{
              background:
                "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
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
