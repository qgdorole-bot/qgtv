import { cn } from "@/lib/utils";

// Versão musical (padrão, usada fora da época de Halloween)
import luana from "@/assets/terapeutas-musicos/luana.jpg";
import bahia from "@/assets/terapeutas-musicos/bahia.jpg";
import dani from "@/assets/terapeutas-musicos/dani.jpg";
import joao from "@/assets/terapeutas-musicos/joao.jpg";
import vinicius from "@/assets/terapeutas-musicos/vinicius.jpg";
import renan from "@/assets/terapeutas-musicos/renan.jpg";
import jose from "@/assets/terapeutas-musicos/jose.jpg";
import juliana from "@/assets/terapeutas-musicos/juliana.jpg";
import isadora from "@/assets/terapeutas-musicos/isadora.jpg";
import estagiaria from "@/assets/terapeutas-musicos/estagiaria.jpg";

// Versão Halloween (exibida até 31/10)
import hLuana from "@/assets/terapeutas-halloween/luana.jpg";
import hBahia from "@/assets/terapeutas-halloween/bahia.jpg";
import hDani from "@/assets/terapeutas-halloween/dani.jpg";
import hJoao from "@/assets/terapeutas-halloween/joao.jpg";
import hVinicius from "@/assets/terapeutas-halloween/vinicius.jpg";
import hRenan from "@/assets/terapeutas-halloween/renan.jpg";
import hJose from "@/assets/terapeutas-halloween/jose.jpg";
import hJuliana from "@/assets/terapeutas-halloween/juliana.jpg";
import hIsadora from "@/assets/terapeutas-halloween/isadora.jpg";
import hEstagiaria from "@/assets/terapeutas-halloween/estagiaria.jpg";

const musicos = [
  { name: "Luana", role: "Vocal principal", image: luana },
  { name: "Bahia", role: "Rock & guitarra", image: bahia },
  { name: "Dani", role: "Diva pop", image: dani },
  { name: "João", role: "Guitarra & voz", image: joao },
  { name: "Vinicius", role: "Soul & R&B", image: vinicius },
  { name: "Renan", role: "Frontman", image: renan },
  { name: "José", role: "Piano & voz", image: jose },
  { name: "Juliana", role: "Voz e alma", image: juliana },
  { name: "Isadora", role: "Voz e microfone", image: isadora },
  { name: "Giovanna", role: "Vocalista de heavy metal", image: estagiaria },
];

const halloween = [
  { name: "Luana", role: "Bruxa do QG", image: hLuana },
  { name: "Bahia", role: "Lobisomem", image: hBahia },
  { name: "Dani", role: "Vampira", image: hDani },
  { name: "João", role: "Frankenstein", image: hJoao },
  { name: "Vinicius", role: "Múmia", image: hVinicius },
  { name: "Renan", role: "Esqueleto", image: hRenan },
  { name: "José", role: "Alquimista", image: hJose },
  { name: "Juliana", role: "Gata Preta", image: hJuliana },
  { name: "Isadora", role: "Banshee", image: hIsadora },
  { name: "Giovanna", role: "Rainha Demônio", image: hEstagiaria },
];

/** Halloween ativo até o fim do dia 31/10; depois volta para a Banda do QG */
const isHalloweenSeason = () => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return todayStr <= "2026-10-31";
};

interface TerapeutasMusicosSlideProps {
  isActive: boolean;
}

export const TerapeutasMusicosSlide = ({ isActive }: TerapeutasMusicosSlideProps) => {
  const halloweenMode = isHalloweenSeason();
  const artistas = halloweenMode ? halloween : musicos;

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden",
        halloweenMode ? "bg-black" : "bg-dark-gradient",
        "transition-opacity duration-1000 ease-in-out",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      {halloweenMode ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(35,33,73,0.9),rgba(0,0,0,1))]" />
          <div
            className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25"
            style={{ background: "hsl(var(--brand-orange))" }}
          />
          <div
            className="absolute -bottom-44 -right-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-15"
            style={{ background: "hsl(var(--brand-sky))" }}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div
            className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20"
            style={{ background: "hsl(var(--brand-orange))" }}
          />
          <div
            className="absolute -bottom-44 -right-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20"
            style={{ background: "hsl(var(--brand-sky))" }}
          />
        </>
      )}

      {/* Header */}
      <div className={cn("relative z-10 text-center mb-4", isActive ? "fade-in-up" : "opacity-0")}>
        {halloweenMode ? (
          <>
            <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-1">
              Especial Halloween · 31 de Outubro
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-wide text-brand-orange">
              Cartas Assombradas do QG
            </h2>
          </>
        ) : (
          <>
            <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-1">
              Temporada 2/2026 · Tema Musical
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-wide text-brand-orange">
              Nosso Time no Palco
            </h2>
          </>
        )}
      </div>

      {/* Cards */}
      <div className="relative z-10 w-full px-6 md:px-10">
        <div className="grid grid-cols-5 gap-x-5 gap-y-4 md:gap-x-7 md:gap-y-5">
          {artistas.map((a, index) => (
            <div
              key={a.name}
              className={cn("flex flex-col items-center", isActive && "animate-card-in")}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-[26vh] md:h-[30vh] items-center justify-center">
                <img
                  src={a.image}
                  alt={`Carta ${halloweenMode ? "de Halloween" : "musical"} de ${a.name}`}
                  className={cn(
                    "max-h-full w-auto object-contain rounded-xl shadow-2xl",
                    halloweenMode
                      ? "shadow-brand-orange/40 ring-2 ring-brand-orange/50"
                      : "shadow-brand-orange/25 ring-2 ring-brand-orange/40"
                  )}
                  decoding="async"
                />
              </div>
              <p className="mt-2 text-center font-display font-bold uppercase tracking-widest text-brand-cream text-lg md:text-2xl">
                {a.name}
              </p>
              <p className="text-center text-brand-sky/80 text-sm md:text-lg">{a.role}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-in {
          opacity: 0;
          animation: cardIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
