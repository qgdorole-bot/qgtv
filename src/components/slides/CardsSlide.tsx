import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import card001 from "@/assets/cards/001_jarvis.png";
import card002 from "@/assets/cards/002_r2d2.png";
import card003 from "@/assets/cards/003_c3po.png";
import card004 from "@/assets/cards/004_hal9000.png";
import card005 from "@/assets/cards/005_ultron.png";
import card006 from "@/assets/cards/006_baymax.png";
import card007 from "@/assets/cards/007_walle.png";
import card008 from "@/assets/cards/008_vision.png";

const cards = [
  { id: "001", name: "J.A.R.V.I.S.", image: card001 },
  { id: "002", name: "R2-D2", image: card002 },
  { id: "003", name: "C-3PO", image: card003 },
  { id: "004", name: "HAL 9000", image: card004 },
  { id: "005", name: "Ultron", image: card005 },
  { id: "006", name: "Baymax", image: card006 },
  { id: "007", name: "WALL-E", image: card007 },
  { id: "008", name: "Vision", image: card008 },
];

interface CardsSlideProps {
  isActive: boolean;
}

export const CardsSlide = ({ isActive }: CardsSlideProps) => {
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setVisibleCards(0);
      return;
    }

    // Stagger card animations
    const timers: number[] = [];
    cards.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setVisibleCards((prev) => Math.max(prev, index + 1));
      }, 200 + index * 150);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden",
        "transition-opacity duration-1000 ease-in-out",
        "bg-dark-gradient",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Title */}
      <h2
        className={cn(
          "text-2xl md:text-4xl lg:text-5xl font-display font-bold tracking-wide",
          "text-primary text-glow-purple mb-6 md:mb-8 z-10",
          isActive ? "fade-in-up" : "opacity-0"
        )}
      >
        Cartas da Temporada
      </h2>

      {/* Cards grid */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 lg:gap-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={cn(
                "transition-all duration-500 ease-out",
                "rounded-lg overflow-hidden shadow-lg hover:shadow-primary/30",
                "hover:scale-105 hover:z-20",
                index < visibleCards
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
