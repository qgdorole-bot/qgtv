import { Slide } from "./Slide";
import { cn } from "@/lib/utils";
import { ShoppingBag, Trophy, Layers } from "lucide-react";

interface Props {
  isActive: boolean;
}

const tiers = [
  { rank: "Bronze", emoji: "🥉", cost: 1, color: "text-orange-300", border: "border-orange-400/50", bg: "bg-orange-500/10" },
  { rank: "Prata", emoji: "🥈", cost: 3, color: "text-gray-300", border: "border-gray-400/50", bg: "bg-gray-500/10" },
  { rank: "Ouro", emoji: "🥇", cost: 5, color: "text-amber-300", border: "border-amber-400/50", bg: "bg-amber-500/10" },
  { rank: "Platina", emoji: "💎", cost: 9, color: "text-cyan-300", border: "border-cyan-400/50", bg: "bg-cyan-500/10" },
  { rank: "Diamante", emoji: "✨", cost: 15, color: "text-purple-300", border: "border-purple-400/50", bg: "bg-purple-500/10" },
];

const pillars = [
  {
    icon: Layers,
    emoji: "🃏",
    title: "Cartas",
    desc: "Colecione cartas exclusivas dos temas do semestre",
  },
  {
    icon: Trophy,
    emoji: "🏅",
    title: "Patentes",
    desc: "Suba de Bronze a Diamante completando tasks e encontros",
  },
  {
    icon: ShoppingBag,
    emoji: "🛒",
    title: "Loja do QG",
    desc: "Troque suas QG Coins por cartas de patentes diferentes",
  },
];

export const GamificationOverviewSlide = ({ isActive }: Props) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-10">
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

        <p
          className={cn(
            "text-base md:text-lg text-muted-foreground max-w-2xl",
            isActive ? "fade-in-delayed" : "opacity-0"
          )}
        >
          Complete tasks · ganhe QG Coins · compre cartas · suba de patente
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={cn(
                  "flex flex-col items-center space-y-3 p-5 md:p-6 rounded-2xl",
                  "cyber-border-purple backdrop-blur-sm",
                  isActive ? "fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="text-3xl">{p.emoji}</span>
                <div className="p-3 rounded-xl border border-primary/30 bg-background/50 text-primary">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-base md:text-lg font-display font-semibold tracking-wide text-foreground">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground font-light leading-snug">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tiers strip */}
        <div className="w-full max-w-5xl space-y-3">
          <p className={cn("text-xs md:text-sm text-muted-foreground uppercase tracking-[0.3em]", isActive ? "fade-in-delayed" : "opacity-0")}>
            Cartas por Patente · Custo em QG Coins
          </p>
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {tiers.map((t, i) => (
              <div
                key={t.rank}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 md:p-4 rounded-xl border backdrop-blur-sm",
                  t.border,
                  t.bg,
                  isActive ? "fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: `${0.4 + i * 0.08}s` }}
              >
                <span className="text-2xl md:text-3xl">{t.emoji}</span>
                <h4 className={cn("text-xs md:text-sm font-display font-bold tracking-wider", t.color)}>
                  {t.rank}
                </h4>
                <div className="text-lg md:text-2xl font-display font-bold text-foreground">
                  {t.cost}
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                  QG Coins
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};
