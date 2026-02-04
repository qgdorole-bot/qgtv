import { cn } from "@/lib/utils";
import qgMainImage from "@/assets/qg-role-main.png";

interface HeroSlideProps {
  isActive: boolean;
}

export const HeroSlide = ({ isActive }: HeroSlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden",
        "transition-opacity duration-1000 ease-in-out",
        "bg-background", // Pure black background matching the image
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      {/* Image centered with uniform black background */}
      <img 
        src={qgMainImage} 
        alt="QG do Rolê - Temporada 1/2026" 
        fetchPriority="high"
        decoding="async"
        className={cn(
          "max-w-full max-h-full object-contain",
          isActive && "animate-float"
        )}
      />
    </div>
  );
};