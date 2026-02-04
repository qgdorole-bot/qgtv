import { Slide } from "./Slide";
import { Target } from "lucide-react";

interface MissionSlideProps {
  isActive: boolean;
  title?: string;
  mission?: string;
}

export const MissionSlide = ({ 
  isActive, 
  title = "Nossa Missão",
  mission = "Transformar ideias em soluções inovadoras, entregando valor e excelência para nossos clientes e parceiros."
}: MissionSlideProps) => {
  return (
    <Slide variant="light" isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className={`p-6 rounded-full bg-primary/5 ${isActive ? 'scale-in' : ''}`}>
          <Target className="w-12 h-12 md:w-16 md:h-16 text-primary" strokeWidth={1.5} />
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight ${isActive ? 'fade-in-up' : ''}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light leading-relaxed max-w-4xl text-balance ${isActive ? 'fade-in-delayed' : ''}`}>
          {mission}
        </p>
      </div>
    </Slide>
  );
};
