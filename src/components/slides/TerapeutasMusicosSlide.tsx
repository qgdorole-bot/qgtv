import { cn } from "@/lib/utils";
import luana from "@/assets/christmas/team/luana.jpg";
import bahia from "@/assets/christmas/team/bahia.jpg";
import dani from "@/assets/christmas/team/dani.jpg";
import joao from "@/assets/christmas/team/joao.jpg";
import vinicius from "@/assets/christmas/team/vinicius.jpg";
import renan from "@/assets/christmas/team/renan.jpg";
import jose from "@/assets/christmas/team/jose.jpg";
import juliana from "@/assets/christmas/team/juliana.jpg";
import isadora from "@/assets/christmas/team/isadora.jpg";
import giovanna from "@/assets/christmas/team/giovanna.jpg";

const equipe = [
  { name: "Luana", image: luana }, { name: "Bahia", image: bahia },
  { name: "Dani", image: dani }, { name: "João", image: joao },
  { name: "Vinicius", image: vinicius }, { name: "Renan", image: renan },
  { name: "José", image: jose }, { name: "Juliana", image: juliana },
  { name: "Isadora", image: isadora }, { name: "Giovanna", image: giovanna },
];

export const TerapeutasMusicosSlide = ({ isActive }: { isActive: boolean }) => (
  <section className={cn("absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-dark-gradient transition-opacity duration-1000", isActive ? "opacity-100 z-10" : "opacity-0 z-0")}>
    <header className="relative z-10 text-center mb-4 px-5">
      <p className="font-display text-brand-sky text-base md:text-xl mb-1">Especial Natal · Temporada 2/2026</p>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-brand-orange">Nosso Time no Natal</h2>
    </header>
    <div className="relative z-10 w-full px-6 md:px-10 grid grid-cols-5 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5">
      {equipe.map((pessoa) => (
        <div key={pessoa.name} className="min-w-0 flex flex-col items-center">
          <div className="flex h-[26vh] md:h-[30vh] max-w-full items-center justify-center">
            <img src={pessoa.image} alt={`Carta natalina de ${pessoa.name}`} width={896} height={1200} decoding="async" className="max-h-full max-w-full w-auto object-contain rounded-lg ring-1 ring-brand-orange/40" />
          </div>
          <p className="mt-2 text-center font-display font-bold text-brand-cream text-sm md:text-2xl break-words max-w-full">{pessoa.name}</p>
        </div>
      ))}
    </div>
  </section>
);