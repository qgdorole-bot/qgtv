import { Slide } from "./Slide";
import { cn } from "@/lib/utils";

interface GamificationRanksSlideProps {
  isActive: boolean;
}

const ranks = [
  {
    rank: "Bronze",
    emoji: "🥉",
    time: "1 mês",
    meetings: "2 encontros",
    tasks: 2,
    level: 4,
    color: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
  },
  {
    rank: "Prata",
    emoji: "🥈",
    time: "6 meses",
    meetings: "12 encontros",
    tasks: 10,
    level: 24,
    color: "text-gray-300",
    border: "border-gray-400/30",
    bg: "bg-gray-500/5",
  },
  {
    rank: "Ouro",
    emoji: "🥇",
    time: "18 meses",
    meetings: "36 encontros",
    tasks: 45,
    level: 72,
    color: "text-amber-300",
    border: "border-amber-400/30",
    bg: "bg-amber-500/5",
  },
  {
    rank: "Platina",
    emoji: "💎",
    time: "36 meses",
    meetings: "72 encontros",
    tasks: 72,
    level: 144,
    color: "text-cyan-300",
    border: "border-cyan-400/30",
    bg: "bg-cyan-500/5",
  },
  {
    rank: "Diamante",
    emoji: "✨",
    time: "48 meses",
    meetings: "96 encontros",
    tasks: 96,
    level: 192,
    color: "text-purple-300",
    border: "border-purple-400/30",
    bg: "bg-purple-500/5",
  },
];

const summaryItems = [
  { label: "Presença", value: "Level", icon: "📈" },
  { label: "Task", value: "QG Coin", icon: "🪙" },
  { label: "QG Coin", value: "Cartas", icon: "🃏" },
  { label: "Level + Super Task", value: "Nova Patente", icon: "🏅" },
];

export const GamificationRanksSlide = ({ isActive }: GamificationRanksSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Title */}
        <div className="flex items-center gap-4">
          <span className={cn("text-3xl md:text-4xl", isActive && "scale-in")}>🏆</span>
          <h2
            className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-display font-bold tracking-wide",
              "text-primary text-glow-purple",
              isActive ? "fade-in-up" : "opacity-0"
            )}
          >
            Patentes & Super Tasks
          </h2>
        </div>

        {/* Ranks table */}
        <div
          className={cn(
            "w-full max-w-5xl rounded-2xl overflow-hidden cyber-border-purple",
            isActive ? "fade-in-up" : "opacity-0"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          {/* Table header */}
          <div className="grid grid-cols-5 gap-px bg-primary/10 text-xs md:text-sm font-display font-semibold tracking-wider uppercase text-muted-foreground">
            <div className="bg-card/80 p-2.5 md:p-3 text-center">Patente</div>
            <div className="bg-card/80 p-2.5 md:p-3 text-center">Tempo</div>
            <div className="bg-card/80 p-2.5 md:p-3 text-center">Tasks</div>
            <div className="bg-card/80 p-2.5 md:p-3 text-center">Nível</div>
            <div className="bg-card/80 p-2.5 md:p-3 text-center">Encontros</div>
          </div>

          {/* Table rows */}
          {ranks.map((rank, index) => (
            <div
              key={rank.rank}
              className={cn(
                "grid grid-cols-5 gap-px text-sm md:text-base",
                rank.bg,
                isActive ? "fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className={cn("bg-card/60 p-2.5 md:p-3 text-center font-display font-bold flex items-center justify-center gap-1.5", rank.color)}>
                <span>{rank.emoji}</span>
                <span className="hidden md:inline">{rank.rank}</span>
              </div>
              <div className="bg-card/60 p-2.5 md:p-3 text-center text-foreground/80 text-xs md:text-sm">
                {rank.time}
              </div>
              <div className="bg-card/60 p-2.5 md:p-3 text-center text-foreground/80 font-semibold">
                {rank.tasks}
              </div>
              <div className={cn("bg-card/60 p-2.5 md:p-3 text-center font-display font-bold", rank.color)}>
                Lv.{rank.level}
              </div>
              <div className="bg-card/60 p-2.5 md:p-3 text-center text-foreground/80 text-xs md:text-sm">
                {rank.meetings}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 md:gap-4",
            isActive ? "fade-in-delayed" : "opacity-0"
          )}
        >
          {summaryItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/50 text-xs md:text-sm"
            >
              <span>{item.icon}</span>
              <span className="text-muted-foreground">{item.label}</span>
              <span className="text-primary font-display font-bold">=</span>
              <span className="text-foreground font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
