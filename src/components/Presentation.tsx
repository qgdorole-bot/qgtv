import { useSlideshow } from "@/hooks/useSlideshow";
import { HeroSlide } from "./slides/HeroSlide";
import { PurposeSlide } from "./slides/PurposeSlide";
import { MissionSlide } from "./slides/MissionSlide";
import { VisionSlide } from "./slides/VisionSlide";
import { ValuesSlide } from "./slides/ValuesSlide";
import { ClosingSlide } from "./slides/ClosingSlide";
import { SlideProgress } from "./SlideProgress";
import { PresentationControls } from "./PresentationControls";

const SLIDE_DURATION = 8000; // 8 seconds per slide

export const Presentation = () => {
  const slides = [
    { id: "hero", component: HeroSlide },
    { id: "purpose", component: PurposeSlide },
    { id: "mission", component: MissionSlide },
    { id: "vision", component: VisionSlide },
    { id: "values", component: ValuesSlide },
    { id: "closing", component: ClosingSlide },
  ];

  const {
    currentSlide,
    isPaused,
    isFullscreen,
    nextSlide,
    prevSlide,
    togglePause,
    toggleFullscreen,
  } = useSlideshow({
    totalSlides: slides.length,
    intervalMs: SLIDE_DURATION,
    autoPlay: true,
  });

  return (
    <div className="relative w-full h-screen overflow-hidden hide-scrollbar cursor-none hover:cursor-auto bg-black">
      {/* Slides */}
      {slides.map((slide, index) => {
        const SlideComponent = slide.component;
        return (
          <SlideComponent
            key={slide.id}
            isActive={currentSlide === index}
          />
        );
      })}

      {/* Progress indicators */}
      <SlideProgress
        currentSlide={currentSlide}
        totalSlides={slides.length}
        duration={SLIDE_DURATION}
        isPaused={isPaused}
      />

      {/* Controls (visible on hover) */}
      <PresentationControls
        isPaused={isPaused}
        isFullscreen={isFullscreen}
        onTogglePause={togglePause}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Instructions overlay (fades out) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/30 text-sm font-light z-20 animate-fade-out pointer-events-none font-display tracking-wider">
        F = Tela cheia • Espaço = Avançar • P = Pausar
      </div>
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-out {
          animation: fadeOut 6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
