import { cn } from "@/lib/utils";

import luana from "@/assets/terapeutas-musicos/luana.jpg";
import bahia from "@/assets/terapeutas-musicos/bahia.jpg";
import dani from "@/assets/terapeutas-musicos/dani.jpg";
import joao from "@/assets/terapeutas-musicos/joao.jpg";
import jhon from "@/assets/terapeutas-musicos/jhon.jpg";
import renan from "@/assets/terapeutas-musicos/renan.jpg";
import jose from "@/assets/terapeutas-musicos/jose.jpg";
import juliana from "@/assets/terapeutas-musicos/juliana.jpg";

const artistas = [
  { name: "Luana", role: "Vocal principal", image: luana },
  { name: "Bahia", role: "Rock & guitarra", image: bahia },
  { name: "Dani", role: "Diva pop", image: dani },
  { name: "João", role: "Guitarra & voz", image: joao },
  { name: "Jhon", role: "Soul & R&B", image: jhon },
  { name: "Renan", role: "Frontman", image: renan },
  { name: "José", role: "Piano & voz", image: jose },
  { name: "Juliana", role: "Voz e alma", image: juliana },
];

interface TerapeutasMusicosSlideProps {
  isActive: boolean;
}

export const TerapeutasMusicosSlide = ({ isActive }: TerapeutasMusicosSlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-dark-gradient",
        "transition-opacity duration-1000 ease-in-out",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(var(--brand-orange))" }}
      />
      <div
        className="absolute -bottom-44 -right-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(var(--brand-sky))" }}
      />

      {/* Header */}
      <div className={cn("relative z-10 text-center mb-4", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-1">
          Banda do QG
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-wide text-brand-orange">
          Nosso Time no Palco
        </h2>
      </div>

      {/* Cards */}
      <div className="relative z-10 w-full px-6 md:px-10">
        <div className="grid grid-cols-4 gap-x-5 gap-y-4 md:gap-x-7 md:gap-y-5">
          {artistas.map((a, index) => (
            <div
              key={a.name}
              className={cn("flex flex-col items-center", isActive && "animate-card-in")}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-[26vh] md:h-[30vh] items-center justify-center">
                <img
                  src={a.image}
                  alt={`Carta musical de ${a.name}`}
                  className="max-h-full w-auto object-contain rounded-xl shadow-2xl shadow-brand-orange/25 ring-2 ring-brand-orange/40"
                  loading="lazy"
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
