import { cn } from "@/lib/utils";
import qgHeroImage from "@/assets/qg-hero-s1-2026.png";

interface HeroSlideProps {
  isActive: boolean;
}

export const HeroSlide = ({ isActive }: HeroSlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden",
        "transition-opacity duration-1000 ease-in-out",
        "bg-hero",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <img 
        src={qgHeroImage} 
        alt="QG do Rolê - Temporada 1/2026" 
        fetchPriority="high"
        decoding="async"
        className={cn(
          "max-w-[85%] max-h-[85%] object-contain drop-shadow-2xl",
          isActive && "animate-float"
        )}
      />
    </div>
  );
};
