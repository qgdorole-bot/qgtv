import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import taylorSwift from "@/assets/cards-t2/taylor-swift.jpg.asset.json";
import paramore from "@/assets/cards-t2/paramore.jpg.asset.json";
import sabrinaCarpenter from "@/assets/cards-t2/sabrina-carpenter.jpg.asset.json";
import theWeeknd from "@/assets/cards-t2/the-weeknd.jpg.asset.json";
import bts from "@/assets/cards-t2/bts.jpg.asset.json";
import deftones from "@/assets/cards-t2/deftones.jpg.asset.json";
import arianaGrande from "@/assets/cards-t2/ariana-grande.jpg.asset.json";
import slipknot from "@/assets/cards-t2/slipknot.jpg.asset.json";
import radiohead from "@/assets/cards-t2/radiohead.jpg.asset.json";
import oliviaRodrigo from "@/assets/cards-t2/olivia-rodrigo.jpg.asset.json";

const cards = [
  { name: "Taylor Swift", image: taylorSwift.url },
  { name: "Sabrina Carpenter", image: sabrinaCarpenter.url },
  { name: "Ariana Grande", image: arianaGrande.url },
  { name: "Olivia Rodrigo", image: oliviaRodrigo.url },
  { name: "BTS", image: bts.url },
  { name: "The Weeknd", image: theWeeknd.url },
  { name: "Paramore", image: paramore.url },
  { name: "Deftones", image: deftones.url },
  { name: "Slipknot", image: slipknot.url },
  { name: "Radiohead", image: radiohead.url },
];

const PER_PAGE = 5;
const PAGES = Math.ceil(cards.length / PER_PAGE);
const PAGE_MS = 4500;

interface CardsSlideProps {
  isActive: boolean;
}

export const CardsSlide = ({ isActive }: CardsSlideProps) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPage(0);
      return;
    }
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % PAGES);
    }, PAGE_MS);
    return () => clearInterval(id);
  }, [isActive]);

  const visible = cards.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

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
      <div className={cn("z-10 text-center mb-6", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.4em] text-primary/70 text-lg md:text-2xl uppercase mb-2">
          2ª Temporada · 2º Semestre
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-wide text-primary text-glow-purple">
          Cartas da Temporada
        </h2>
      </div>

      {/* Cards row */}
      <div className="relative z-10 w-full px-8 md:px-12">
        <div key={page} className="flex items-center justify-center gap-5 md:gap-7">
          {visible.map((card, index) => (
            <div
              key={card.name}
              className="flex-1 max-w-[19%] animate-card-in"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl ring-2 ring-primary/40 shadow-primary/30">
                <img
                  src={card.image}
                  alt={`Carta ${card.name}`}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-center font-display font-bold uppercase tracking-widest text-white/90 text-lg md:text-2xl">
                {card.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Page dots */}
      <div className="z-10 mt-7 flex gap-3">
        {Array.from({ length: PAGES }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 rounded-full transition-all duration-500",
              i === page ? "w-12 bg-primary shadow-[0_0_16px_hsl(var(--primary))]" : "w-2.5 bg-white/20"
            )}
          />
        ))}
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
