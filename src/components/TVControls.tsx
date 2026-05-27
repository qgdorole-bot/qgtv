import { Pause, Play, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";

interface TVControlsProps {
  isPaused: boolean;
  isFullscreen: boolean;
  onTogglePause: () => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onToggleFullscreen: () => void;
}

export const TVControls = ({
  isPaused,
  isFullscreen,
  onTogglePause,
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
}: TVControlsProps) => {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-full backdrop-blur-md opacity-30 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300"
      style={{
        background: "rgba(10, 10, 25, 0.75)",
        border: "1px solid rgba(168, 85, 247, 0.4)",
        boxShadow: "0 0 30px rgba(168, 85, 247, 0.25)",
      }}
    >
      <TVButton onClick={onPrevSlide} label="Anterior">
        <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" />
      </TVButton>
      <TVButton onClick={onTogglePause} label={isPaused ? "Reproduzir" : "Pausar"} primary>
        {isPaused ? <Play className="h-8 w-8 md:h-9 md:w-9" /> : <Pause className="h-8 w-8 md:h-9 md:w-9" />}
      </TVButton>
      <TVButton onClick={onNextSlide} label="Próximo">
        <ChevronRight className="h-7 w-7 md:h-8 md:w-8" />
      </TVButton>
      <div className="w-px h-8 bg-primary/30 mx-1" />
      <TVButton onClick={onToggleFullscreen} label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}>
        {isFullscreen ? <Minimize className="h-6 w-6 md:h-7 md:w-7" /> : <Maximize className="h-6 w-6 md:h-7 md:w-7" />}
      </TVButton>
    </div>
  );
};

const TVButton = ({
  onClick,
  children,
  label,
  primary,
}: {
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  primary?: boolean;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/60 active:scale-95 ${
      primary
        ? "h-16 w-16 md:h-20 md:w-20 text-white"
        : "h-14 w-14 md:h-16 md:w-16 text-white/90 hover:text-white"
    }`}
    style={
      primary
        ? {
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))",
            boxShadow: "0 0 25px hsl(var(--primary) / 0.6)",
          }
        : {
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
          }
    }
  >
    {children}
  </button>
);
