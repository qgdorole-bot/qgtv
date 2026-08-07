import { cn } from "@/lib/utils";


import taylorSwift from "@/assets/cards-t2/taylor-swift.jpg";
import paramore from "@/assets/cards-t2/paramore.jpg";
import sabrinaCarpenter from "@/assets/cards-t2/sabrina-carpenter.jpg";
import theWeeknd from "@/assets/cards-t2/the-weeknd.jpg";
import bts from "@/assets/cards-t2/bts.jpg";
import deftones from "@/assets/cards-t2/deftones.jpg";
import arianaGrande from "@/assets/cards-t2/ariana-grande.jpg";
import slipknot from "@/assets/cards-t2/slipknot.jpg";
import radiohead from "@/assets/cards-t2/radiohead.jpg";
import oliviaRodrigo from "@/assets/cards-t2/olivia-rodrigo.jpg";

const cards = [
  { name: "Taylor Swift", image: taylorSwift },
  { name: "Sabrina Carpenter", image: sabrinaCarpenter },
  { name: "Ariana Grande", image: arianaGrande },
  { name: "Olivia Rodrigo", image: oliviaRodrigo },
  { name: "BTS", image: bts },
  { name: "The Weeknd", image: theWeeknd },
  { name: "Paramore", image: paramore },
  { name: "Deftones", image: deftones },
  { name: "Slipknot", image: slipknot },
  { name: "Radiohead", image: radiohead },
];

interface CardsSlideProps {
  isActive: boolean;
}

export const CardsSlide = ({ isActive }: CardsSlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden",
        "transition-opacity duration-1000 ease-in-out",
        "bg-dark-gradient",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Header */}
      <div className={cn("z-10 text-center mb-4", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-1">
          Temporada 2/2026
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-wide text-brand-orange">
          Cartas da Temporada
        </h2>
        <p className="mt-1 font-display font-bold uppercase tracking-[0.3em] text-white/90 text-lg md:text-2xl">
          Temporada Musical
        </p>
      </div>


      {/* All cards — 5 per row, 2 rows */}
      <div className="relative z-10 w-full px-6 md:px-10">
        <div className="grid grid-cols-5 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5">
          {cards.map((card, index) => (
            <div
              key={card.name}
              className={cn("flex flex-col items-center", isActive && "animate-card-in")}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex h-[26vh] md:h-[30vh] items-center justify-center">
                <img
                  src={card.image}
                  alt={`Carta ${card.name}`}
                  className="max-h-full w-auto object-contain rounded-xl shadow-2xl shadow-primary/30 ring-2 ring-primary/40"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-center font-display font-bold uppercase tracking-widest text-white/90 text-base md:text-xl">
                {card.name}
              </p>
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
