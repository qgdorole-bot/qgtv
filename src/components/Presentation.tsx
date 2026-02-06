import { useSlideshow } from "@/hooks/useSlideshow";
import { HeroSlide } from "./slides/HeroSlide";
import { CardsSlide } from "./slides/CardsSlide";
import { GamificationIntroSlide } from "./slides/GamificationIntroSlide";
import { GamificationShopSlide } from "./slides/GamificationShopSlide";
import { GamificationRanksSlide } from "./slides/GamificationRanksSlide";
import { InstitutionalSlide } from "./slides/InstitutionalSlide";
import { ClosingSlide } from "./slides/ClosingSlide";
import { SlideProgress } from "./SlideProgress";
import { PresentationControls } from "./PresentationControls";
import { CornerLogo } from "./CornerLogo";

const SLIDE_DURATION = 8000; // 8 seconds per slide

export const Presentation = () => {
  const slides = [
    { id: "hero", component: HeroSlide, showWatermark: false },
    { id: "cards", component: CardsSlide, showWatermark: true },
    { id: "gamification-intro", component: GamificationIntroSlide, showWatermark: true },
    { id: "gamification-shop", component: GamificationShopSlide, showWatermark: true },
    { id: "gamification-ranks", component: GamificationRanksSlide, showWatermark: true },
    { id: "institutional", component: InstitutionalSlide, showWatermark: true },
    { id: "closing", component: ClosingSlide, showWatermark: true },
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

  const showWatermark = slides[currentSlide]?.showWatermark ?? false;

  return (
    <div className="relative w-full h-screen overflow-hidden hide-scrollbar cursor-none hover:cursor-auto bg-black">
      {/* Watermark Logo (hidden on hero slide) */}
      {showWatermark && <CornerLogo />}

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
