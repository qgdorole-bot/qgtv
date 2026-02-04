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

export const PresentationControls = ({
  isPaused,
  isFullscreen,
  onTogglePause,
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
}: PresentationControlsProps) => {
  return (
    <div className="absolute top-6 right-6 flex items-center gap-2 z-20 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevSlide}
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onTogglePause}
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
      >
        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNextSlide}
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleFullscreen}
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </Button>
    </div>
  );
};
