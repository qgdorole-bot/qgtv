import { Slide } from "./Slide";
import { cn } from "@/lib/utils";

interface GamificationShopSlideProps {
  isActive: boolean;
}

const cardTiers = [
  {
    rank: "Platina",
    emoji: "💎",
    cost: 9,
    cards: 2,
    gradient: "from-cyan-300 to-cyan-500",
    border: "border-cyan-400/50",
    text: "text-cyan-300",
    bg: "bg-cyan-500/10",
    glow: "shadow-cyan-500/20",
  },
  {
    rank: "Ouro",
    emoji: "🥇",
    cost: 5,
    cards: 2,
    gradient: "from-yellow-300 to-amber-500",
    border: "border-amber-400/50",
    text: "text-amber-300",
    bg: "bg-amber-500/10",
    glow: "shadow-amber-500/20",
  },
  {
    rank: "Prata",
    emoji: "🥈",
    cost: 3,
    cards: 2,
    gradient: "from-gray-200 to-gray-400",
    border: "border-gray-400/50",
    text: "text-gray-300",
    bg: "bg-gray-500/10",
    glow: "shadow-gray-500/20",
  },
  {
    rank: "Bronze",
    emoji: "🥉",
    cost: 1,
    cards: 2,
    gradient: "from-orange-300 to-orange-600",
    border: "border-orange-400/50",
    text: "text-orange-300",
    bg: "bg-orange-500/10",
    glow: "shadow-orange-500/20",
  },
];

export const GamificationShopSlide = ({ isActive }: GamificationShopSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        {/* Title */}
        <div className="flex items-center gap-4">
          <span className={cn("text-4xl md:text-5xl", isActive && "scale-in")}>🃏</span>
          <h2
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide",
              "text-primary text-glow-purple",
              isActive ? "fade-in-up" : "opacity-0"
            )}
          >
            Loja do QG
          </h2>
        </div>

        <p
          className={cn(
            "text-base md:text-lg text-muted-foreground max-w-2xl",
            isActive ? "fade-in-delayed" : "opacity-0"
          )}
        >
          Compre cartas exclusivas com suas QG Coins!
        </p>

        {/* Card tiers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
          {cardTiers.map((tier, index) => (
            <div
              key={tier.rank}
              className={cn(
                "relative flex flex-col items-center space-y-4 p-5 md:p-6 rounded-2xl",
                "border backdrop-blur-sm transition-all duration-500",
                tier.border,
                tier.bg,
                `hover:shadow-lg ${tier.glow}`,
                isActive ? "fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Rank emoji */}
              <span className="text-4xl md:text-5xl">{tier.emoji}</span>

              {/* Rank name */}
              <h3 className={cn("text-lg md:text-xl font-display font-bold tracking-wider", tier.text)}>
                {tier.rank}
              </h3>

              {/* Divider */}
              <div className={cn("w-12 h-0.5 rounded-full bg-gradient-to-r", tier.gradient)} />

              {/* Cost */}
              <div className="space-y-1">
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {tier.cost}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">QG Coins</p>
              </div>

              {/* Cards count */}
              <div className={cn("px-3 py-1 rounded-full text-xs font-semibold", tier.bg, tier.text)}>
                {tier.cards} {tier.cards === 1 ? "carta" : "cartas"}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className={cn(
            "text-xs md:text-sm text-muted-foreground italic",
            isActive ? "fade-in-delayed" : "opacity-0"
          )}
        >
          🏆 As cartas são escolhidas de acordo com os temas do semestre
        </p>
      </div>
    </Slide>
  );
};
