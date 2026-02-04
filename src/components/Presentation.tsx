import { useSlideshow } from "@/hooks/useSlideshow";
import { LogoSlide } from "./slides/LogoSlide";
import { MissionSlide } from "./slides/MissionSlide";
import { ValuesSlide } from "./slides/ValuesSlide";
import { TeamSlide } from "./slides/TeamSlide";
import { SlideProgress } from "./SlideProgress";
import { PresentationControls } from "./PresentationControls";

const SLIDE_DURATION = 8000; // 8 seconds per slide

export const Presentation = () => {
  const slides = [
    { id: "logo", component: LogoSlide },
    { id: "mission", component: MissionSlide },
    { id: "values", component: ValuesSlide },
    { id: "team", component: TeamSlide },
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
    <div className="relative w-full h-screen overflow-hidden hide-scrollbar cursor-none hover:cursor-auto">
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
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 text-sm font-light z-20 animate-fade-out pointer-events-none">
        Pressione F para tela cheia • Espaço para avançar • P para pausar
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
