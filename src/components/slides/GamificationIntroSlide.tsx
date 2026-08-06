import { Slide } from "./Slide";
import { cn } from "@/lib/utils";
import { Gamepad2, Coins, TrendingUp, ShoppingBag } from "lucide-react";

interface GamificationIntroSlideProps {
  isActive: boolean;
}

const steps = [
  {
    icon: Gamepad2,
    emoji: "1️⃣",
    title: "Complete Tasks",
    description: "Cada task completa te dá +2 QG Coins e +2 Levels",
    accent: "text-accent",
  },
  {
    icon: Coins,
    emoji: "2️⃣",
    title: "Ganhe QG Coins",
    description: "Use suas coins para comprar cartas exclusivas na Loja do QG",
    accent: "text-primary",
  },
  {
    icon: ShoppingBag,
    emoji: "3️⃣",
    title: "Compre Cartas",
    description: "Cartas organizadas por patentes e temas do semestre",
    accent: "text-secondary",
  },
  {
    icon: TrendingUp,
    emoji: "4️⃣",
    title: "Suba de Patente",
    description: "Level + Tasks desbloqueiam novas patentes no QG",
    accent: "text-brand-sky",
  },
];

export const GamificationIntroSlide = ({ isActive }: GamificationIntroSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        {/* Title */}
        <div className="flex items-center gap-4">
          <span className={cn("text-4xl md:text-5xl", isActive && "scale-in")}>🎮</span>
          <h2
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide",
              "text-primary text-glow-purple",
              isActive ? "fade-in-up" : "opacity-0"
            )}
          >
            Gamificação
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.title}
                className={cn(
                  "flex flex-col items-center space-y-3 p-4 md:p-6 rounded-2xl",
                  "cyber-border-purple backdrop-blur-sm",
                  "hover:scale-105 transition-transform duration-300",
                  isActive ? "fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="text-2xl">{step.emoji}</span>
                <div className={cn("p-3 rounded-xl border border-current/30 bg-background/50", step.accent)}>
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm md:text-base font-display font-semibold tracking-wide text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-light leading-snug">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom info */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-4 text-xs md:text-sm text-muted-foreground",
            isActive ? "fade-in-delayed" : "opacity-0"
          )}
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50">
            🚫 Limite: <strong className="text-accent">20 QG Coins</strong> / semestre
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50">
            🔄 Coins zeram a cada semestre
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/50">
            📈 Levels são permanentes
          </span>
        </div>
      </div>
    </Slide>
  );
};
