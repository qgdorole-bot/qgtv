import { cn } from "@/lib/utils";
import { MapPin, Clock } from "lucide-react";

interface Props {
  isActive: boolean;
}

const dias = [
  {
    dia: "Sexta",
    data: "23/10",
    cor: "#E8431F",
    roles: [
      { nome: "Adulto 1", local: "Rolê na Augusta", hora: "19h30" },
      { nome: "Infanto 4", local: "Rolê do grupo", hora: "" },
    ],
  },
  {
    dia: "Sábado",
    data: "24/10",
    cor: "#5BC0EB",
    roles: [
      { nome: "Infantil", local: "Shopping Cidade SP · Nova Hi Happy", hora: "10h30" },
      { nome: "Jovem 2", local: "Rolê na Paulista", hora: "14h" },
      { nome: "Jovem 3.1", local: "Paulista ou Fan Hour Games", hora: "14h" },
      { nome: "RPG 2", local: "Aventura de RPG", hora: "15h30" },
    ],
  },
];

export const RolesSemanaSlide = ({ isActive }: Props) => (
  <div
    className={cn(
      "absolute inset-0 overflow-hidden transition-opacity duration-1000",
      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
    )}
    style={{ background: "radial-gradient(ellipse at top, #2e2c5e 0%, #232149 55%, #12112a 100%)" }}
  >
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-8 md:p-14 gap-8">
      <div className={cn("text-center", isActive && "fade-in-up")}>
        <p className="font-display tracking-[0.35em] uppercase text-sm md:text-lg" style={{ color: "#5BC0EB" }}>
          Escala da semana
        </p>
        <h2 className="font-display font-black text-5xl md:text-7xl leading-none" style={{ color: "#E8431F" }}>
          Rolês da Semana
        </h2>
      </div>

      <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl", isActive && "fade-in")}>
        {dias.map((d) => (
          <div
            key={d.dia}
            className="rounded-3xl p-6 md:p-8"
            style={{ background: "rgba(255,255,255,0.06)", border: `3px solid ${d.cor}` }}
          >
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="font-display font-black text-3xl md:text-5xl" style={{ color: d.cor }}>{d.dia}</h3>
              <span className="font-display text-xl md:text-3xl" style={{ color: "#F5EFE0" }}>{d.data}</span>
            </div>
            <div className="space-y-4">
              {d.roles.map((r) => (
                <div key={r.nome} className="rounded-2xl px-5 py-4" style={{ background: "rgba(0,0,0,0.25)" }}>
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
