import { Slide } from "./Slide";
import qgMainImage from "@/assets/qg-role-main-purple.png";

interface HeroSlideProps {
  isActive: boolean;
}

export const HeroSlide = ({ isActive }: HeroSlideProps) => {
  return (
    <Slide isActive={isActive} showGrid={false}>
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
        <div className={`flex items-center gap-4 ${isActive ? 'fade-in-delayed' : ''}`}>
          <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="text-primary text-lg md:text-xl font-display tracking-widest">IA</span>
          <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </Slide>
  );
};