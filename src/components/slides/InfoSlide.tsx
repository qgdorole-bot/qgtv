import { Slide } from "./Slide";
import { Zap } from "lucide-react";

interface InfoSlideProps {
  isActive: boolean;
  title?: string;
  description?: string;
  highlightColor?: "pink" | "cyan" | "yellow";
}

export const InfoSlide = ({ 
  isActive, 
  title = "Sobre o Projeto",
  description = "Uma jornada épica pelo mundo da Inteligência Artificial, onde tecnologia e criatividade se encontram.",
  highlightColor = "pink"
}: InfoSlideProps) => {
  const glowClass = highlightColor === "pink" ? "text-glow-pink" : 
                    highlightColor === "cyan" ? "text-glow-cyan" : "text-glow-yellow";
  
  const colorClass = highlightColor === "pink" ? "text-primary" : 
                     highlightColor === "cyan" ? "text-secondary" : "text-accent";

  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className={`p-5 rounded-2xl cyber-border ${isActive ? 'scale-in' : ''}`}>
          <Zap className={`w-10 h-10 md:w-14 md:h-14 ${colorClass}`} strokeWidth={1.5} />
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide ${colorClass} ${glowClass} ${isActive ? 'fade-in-up' : ''}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light leading-relaxed max-w-4xl text-balance ${isActive ? 'fade-in-delayed' : ''}`}>
          {description}
        </p>
      </div>
    </Slide>
  );
};
