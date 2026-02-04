import { Slide } from "./Slide";
import qgMainImage from "@/assets/qg-role-main-purple.png";

interface HeroSlideProps {
  isActive: boolean;
}

export const HeroSlide = ({ isActive }: HeroSlideProps) => {
  return (
    <Slide isActive={isActive} showGrid={false} className="!bg-[#6B4BA3]">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <img 
          src={qgMainImage} 
          alt="QG do Rolê - Temporada 1/2026" 
          width={896}
          height={896}
          fetchPriority="high"
          decoding="async"
          className={`w-full max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain animate-float ${isActive ? 'scale-in' : ''}`}
        />
      </div>
    </Slide>
  );
};