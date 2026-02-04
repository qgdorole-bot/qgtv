import { Slide } from "./Slide";
import { Zap, Sparkles, Eye, TrendingUp, Compass } from "lucide-react";

interface ValuesSlideProps {
  isActive: boolean;
}

const values = [
  { 
    icon: Zap, 
    title: "Eficiência", 
    description: "Resultados objetivos no tempo certo",
    color: "text-primary border-primary/50"
  },
  { 
    icon: Sparkles, 
    title: "Liberdade", 
    description: "Inovação com foco em resultados",
    color: "text-purple-300 border-purple-300/50"
  },
  { 
    icon: Eye, 
    title: "Transparência", 
    description: "Falamos a verdade, sempre",
    color: "text-secondary border-secondary/50"
  },
  { 
    icon: TrendingUp, 
    title: "Desenvolvimento", 
    description: "Aprendemos e melhoramos continuamente",
    color: "text-purple-400 border-purple-400/50"
  },
  { 
    icon: Compass, 
    title: "Vida Real", 
    description: "Explorar o mundo",
    color: "text-violet-300 border-violet-300/50"
  },
];

export const ValuesSlide = ({ isActive }: ValuesSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className="flex items-center gap-3">
          <span className={`text-3xl md:text-4xl ${isActive ? 'scale-in' : ''}`}>🌱</span>
          <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-primary text-glow-purple ${isActive ? 'fade-in-up' : ''}`}>
            Valores
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-6xl">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div 
                key={value.title}
                className={`flex flex-col items-center space-y-3 p-4 md:p-5 rounded-2xl cyber-border-purple backdrop-blur-sm ${isActive ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 rounded-xl border ${value.color} bg-black/50`}>
                  <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${value.color.split(' ')[0]}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm md:text-base font-display font-semibold tracking-wide text-white">{value.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-light leading-snug">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
};
