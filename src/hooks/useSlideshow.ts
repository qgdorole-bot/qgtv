import { useState, useEffect, useCallback } from "react";

interface UseSlideshowProps {
  totalSlides: number;
  intervalMs?: number;
  autoPlay?: boolean;
}

export const useSlideshow = ({ 
  totalSlides, 
  intervalMs = 8000, 
  autoPlay = true 
}: UseSlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextSlide, intervalMs);
    return () => clearInterval(timer);
  }, [isPaused, intervalMs, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          nextSlide();
          break;
        case "ArrowLeft":
          prevSlide();
          break;
        case "p":
          togglePause();
          break;
        case "f":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, togglePause, toggleFullscreen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return {
    currentSlide,
    isPaused,
    isFullscreen,
    nextSlide,
    prevSlide,
    goToSlide,
    togglePause,
    toggleFullscreen,
  };
};
