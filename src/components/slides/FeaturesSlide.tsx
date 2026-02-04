import { Slide } from "./Slide";
import { Bot, Cpu, Sparkles, Rocket } from "lucide-react";

interface Feature {
  icon: "bot" | "cpu" | "sparkles" | "rocket";
  title: string;
  color: "pink" | "cyan" | "yellow" | "purple";
}

interface FeaturesSlideProps {
  isActive: boolean;
  title?: string;
  features?: Feature[];
}

const iconMap = {
  bot: Bot,
  cpu: Cpu,
  sparkles: Sparkles,
  rocket: Rocket,
};

const colorMap = {
  pink: "text-primary border-primary/50",
  cyan: "text-secondary border-secondary/50",
  yellow: "text-accent border-accent/50",
  purple: "text-purple-500 border-purple-500/50",
};

const defaultFeatures: Feature[] = [
  { icon: "bot", title: "Inteligência Artificial", color: "pink" },
  { icon: "cpu", title: "Tecnologia", color: "cyan" },
  { icon: "sparkles", title: "Criatividade", color: "yellow" },
  { icon: "rocket", title: "Inovação", color: "purple" },
];

export const FeaturesSlide = ({ 
  isActive, 
  title = "O Que Esperar",
  features = defaultFeatures
}: FeaturesSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-12">
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-secondary text-glow-cyan ${isActive ? 'fade-in-up' : ''}`}>
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full max-w-5xl">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            const colorClasses = colorMap[feature.color];
            return (
              <div 
                key={feature.title}
                className={`flex flex-col items-center space-y-4 p-6 rounded-2xl cyber-border backdrop-blur-sm ${isActive ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`p-4 rounded-xl border ${colorClasses} bg-black/50`}>
                  <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${colorClasses.split(' ')[0]}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-base md:text-lg font-display font-medium tracking-wide">{feature.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
};
