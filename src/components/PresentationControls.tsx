import { forwardRef } from "react";
import { Pause, Play, ChevronLeft, ChevronRight, Maximize, Minimize } from "lucide-react";
import { Button } from "./ui/button";

interface PresentationControlsProps {
  isPaused: boolean;
  isFullscreen: boolean;
  onTogglePause: () => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onToggleFullscreen: () => void;
}

export const PresentationControls = forwardRef<HTMLDivElement, PresentationControlsProps>(({
  isPaused,
  isFullscreen,
  onTogglePause,
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
}, ref) => {
  return (
    <div ref={ref} className="absolute top-6 right-6 flex items-center gap-2 z-20 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevSlide}
        className="bg-black/50 backdrop-blur-sm hover:bg-primary/20 text-white border border-primary/30"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onTogglePause}
        className="bg-black/50 backdrop-blur-sm hover:bg-primary/20 text-white border border-primary/30"
      >
        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNextSlide}
        className="bg-black/50 backdrop-blur-sm hover:bg-primary/20 text-white border border-primary/30"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleFullscreen}
        className="bg-black/50 backdrop-blur-sm hover:bg-primary/20 text-white border border-primary/30"
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </Button>
    </div>
  );
});

PresentationControls.displayName = "PresentationControls";
