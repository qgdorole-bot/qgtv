import { cn } from "@/lib/utils";
import qgMainImage from "@/assets/qg-role-main-purple.png";

interface HeroSlideProps {
  isActive: boolean;
}

export const HeroSlide = ({ isActive }: HeroSlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "transition-opacity duration-1000 ease-in-out",
        "bg-[#3D1A73]",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      {/* Image fills entire screen */}
      <img 
        src={qgMainImage} 
        alt="QG do Rolê - Temporada 1/2026" 
        fetchPriority="high"
        decoding="async"
        className={cn(
          "w-full h-full object-contain",
          isActive && "animate-float"
        )}
      />
    </div>
  );
};