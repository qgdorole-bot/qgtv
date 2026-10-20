import { cn } from "@/lib/utils";
import { MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  isActive: boolean;
}

type Role = { nome: string; local: string; hora: string };
type Dia = { dia: string; data: string; iso: string; roles: Role[] };
const CORES = ["#E8431F", "#5BC0EB", "#F5A524"];
const CACHE = "qg-roles-semana";
const REFRESH_MS = 3 * 60 * 60 * 1000; // confere a escala a cada 3h

const hojeSP = () => new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);

const useEscala = () => {
  const [dias, setDias] = useState<Dia[]>(() => {
    try { return JSON.parse(localStorage.getItem(CACHE) || "[]"); } catch { return []; }
  });
  useEffect(() => {
    let alive = true;
    const load = async () => {
      const { data, error } = await supabase.functions.invoke("escala-semana", { method: "GET" });
      if (!alive || error || !Array.isArray(data?.dias)) return;
      setDias(data.dias);
      localStorage.setItem(CACHE, JSON.stringify(data.dias));
    };
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => { alive = false; clearInterval(t); };
  }, []);
  const hoje = hojeSP();
  return dias.filter((d) => d.iso >= hoje).slice(0, 3);
};

export const RolesSemanaSlide = ({ isActive }: Props) => {
  const dias = useEscala();
  return (
  <div
    className={cn(
      "absolute inset-0 overflow-hidden transition-opacity duration-1000",
      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
    )}
    style={{ background: "radial-gradient(ellipse at top, #2e2c5e 0%, #232149 55%, #12112a 100%)" }}
  >
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 md:p-10 gap-5">
      <div className={cn("text-center", isActive && "fade-in-up")}>
        <p className="font-display tracking-[0.35em] uppercase text-sm md:text-lg" style={{ color: "#5BC0EB" }}>
          Escala da semana
        </p>
        <h2 className="font-display font-black text-5xl md:text-6xl leading-none" style={{ color: "#E8431F" }}>
          Rolês da Semana
        </h2>
      </div>

      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl", isActive && "fade-in")}>
        {dias.length === 0 && (
          <p className="col-span-full text-center font-display text-3xl" style={{ color: "#F5EFE0" }}>Novos rolês chegando em breve!</p>
        )}
        {dias.map((d, i) => (
          <div
            key={d.dia}
            className="rounded-3xl p-5 md:p-6"
            style={{ background: "rgba(255,255,255,0.06)", border: `3px solid ${CORES[i % 3]}` }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-display font-black text-3xl md:text-5xl" style={{ color: CORES[i % 3] }}>{d.dia}</h3>
              <span className="font-display text-xl md:text-3xl" style={{ color: "#F5EFE0" }}>{d.data}</span>
            </div>
            <div className="space-y-3">
              {d.roles.map((r, j) => (
                <div key={j} className="rounded-2xl px-5 py-3" style={{ background: "rgba(0,0,0,0.25)" }}>
                  <p className="font-display font-bold text-2xl md:text-3xl" style={{ color: "#F5EFE0" }}>{r.nome}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-lg md:text-2xl mt-1" style={{ color: "#cfe9f7" }}>
                    <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{r.local}</span>
                    {r.hora && <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{r.hora}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
