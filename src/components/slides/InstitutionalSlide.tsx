import { Slide } from "./Slide";
import { cn } from "@/lib/utils";
import { Zap, Sparkles, Eye, TrendingUp, Compass } from "lucide-react";

interface InstitutionalSlideProps {
  isActive: boolean;
}

const pillars = [
  {
    emoji: "💜",
    title: "Propósito",
    text: "Realizamos sonhos ensinando habilidades pra lidar com o mundo.",
    accent: "text-primary",
    border: "border-primary/40",
  },
  {
    emoji: "⚙️",
    title: "Missão",
    text: "Transformar conhecimento psicológico em experiências reais que impulsionam conquistas.",
    accent: "text-secondary",
    border: "border-secondary/40",
  },
  {
    emoji: "🌍",
    title: "Visão",
    text: "Ser referência global em tornar a psicologia acessível, funcional e eficaz.",
    accent: "text-accent",
    border: "border-accent/40",
  },
];

const values = [
  { icon: Zap, label: "Eficiência" },
  { icon: Sparkles, label: "Liberdade" },
  { icon: Eye, label: "Transparência" },
  { icon: TrendingUp, label: "Desenvolvimento" },
  { icon: Compass, label: "Vida Real" },
];

export const InstitutionalSlide = ({ isActive }: InstitutionalSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Title */}
        <h2
          className={cn(
            "text-2xl md:text-4xl lg:text-5xl font-display font-bold tracking-wide text-center",
            "text-primary text-glow-purple",
            isActive ? "fade-in-up" : "opacity-0"
          )}
        >
          Quem Somos
        </h2>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={cn(
                "flex flex-col items-center text-center space-y-3 p-5 md:p-6 rounded-2xl",
                "border backdrop-blur-sm bg-card/30",
                pillar.border,
                isActive ? "fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <span className="text-3xl md:text-4xl">{pillar.emoji}</span>
              <h3 className={cn("text-lg md:text-xl font-display font-bold tracking-wider", pillar.accent)}>
                {pillar.title}
              </h3>
              <p className="text-sm md:text-base text-foreground/80 font-light leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        {/* Values row */}
        <div
          className={cn(
            "flex flex-col items-center gap-3",
            isActive ? "fade-in-delayed" : "opacity-0"
          )}
        >
          <h3 className="text-sm md:text-base font-display font-semibold tracking-widest uppercase text-muted-foreground">
            🌱 Valores
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={value.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-card/50 text-xs md:text-sm"
                >
                  <IconComponent className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  <span className="text-foreground/90">{value.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Slide>
  );
};
