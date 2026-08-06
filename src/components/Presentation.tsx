import { useSlideshow } from "@/hooks/useSlideshow";
import { GeekContentSlide } from "./slides/GeekContentSlide";
import { WelcomeSlide } from "./slides/WelcomeSlide";
import { CardsSlide } from "./slides/CardsSlide";
import { GamificationOverviewSlide } from "./slides/GamificationOverviewSlide";
import { QGDateSlide } from "./slides/QGDateSlide";
import { StarWarsEventSlide } from "./slides/StarWarsEventSlide";
import { ToyStoryEventSlide } from "./slides/ToyStoryEventSlide";
import { DoffEventSlide } from "./slides/DoffEventSlide";
import { TerapeutasMusicosSlide } from "./slides/TerapeutasMusicosSlide";
import { GeekEventsSlide } from "./slides/GeekEventsSlide";
import { ClosingSlide } from "./slides/ClosingSlide";
import { SlideProgress } from "./SlideProgress";
import { PresentationControls } from "./PresentationControls";
import { CornerLogo } from "./CornerLogo";
import { TVControls } from "./TVControls";

const SLIDE_DURATION = 14000; // 14 seconds per slide (more time to read)

type SlideDef = {
  id: string;
  component: React.ComponentType<{ isActive: boolean }>;
  showWatermark: boolean;
  /** YYYY-MM-DD. Slide is hidden from rotation the day AFTER this date. */
  expiresAt?: string;
};

const ALL_SLIDES: SlideDef[] = [
  { id: "welcome", component: WelcomeSlide, showWatermark: true },
  { id: "geekcontent", component: GeekContentSlide, showWatermark: true },
  { id: "cards", component: CardsSlide, showWatermark: true },
  { id: "gamification", component: GamificationOverviewSlide, showWatermark: true },
  // Event slides (auto-hidden after their date)
  { id: "qgdate", component: QGDateSlide, showWatermark: true, expiresAt: "2026-06-12" },
  { id: "starwars", component: StarWarsEventSlide, showWatermark: true, expiresAt: "2026-05-31" },
  { id: "toystory", component: ToyStoryEventSlide, showWatermark: true, expiresAt: "2026-06-21" },
  { id: "doff", component: DoffEventSlide, showWatermark: true, expiresAt: "2026-07-12" },
  // Ongoing
  { id: "terapeutas-musicos", component: TerapeutasMusicosSlide, showWatermark: true },
  { id: "geekevents", component: GeekEventsSlide, showWatermark: true },
  { id: "closing", component: ClosingSlide, showWatermark: true },
];

const isExpired = (expiresAt?: string) => {
  if (!expiresAt) return false;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return expiresAt < todayStr;
};

export const Presentation = () => {
  const slides = ALL_SLIDES.filter((s) => !isExpired(s.expiresAt));

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
      {showWatermark && <CornerLogo variant={currentSlide} />}

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

      {/* TV-friendly large controls (always visible, optimized for remotes) */}
      <TVControls
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
