import { useState, useEffect, useCallback, useRef } from "react";

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
  const timerRef = useRef<number | null>(null);

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

  // Clear any existing timer
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start timer
  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = window.setInterval(nextSlide, intervalMs);
  }, [clearTimer, nextSlide, intervalMs]);

  // Auto-advance slides with visibility handling
  useEffect(() => {
    if (isPaused) {
      clearTimer();
      return;
    }

    startTimer();

    // Handle tab visibility changes to prevent freezing
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimer();
      } else if (!isPaused) {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPaused, startTimer, clearTimer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        // Setas / espaço / Page Down / Channel Up / Media Next (controles de TV)
        case "ArrowRight":
        case "ArrowDown":
        case " ":
        case "PageDown":
        case "MediaTrackNext":
        case "MediaNextTrack":
        case "ChannelUp":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "MediaTrackPrevious":
        case "MediaPreviousTrack":
        case "ChannelDown":
          e.preventDefault();
          prevSlide();
          break;
        case "Enter":
        case "MediaPlayPause":
        case "MediaPause":
        case "MediaPlay":
        case "p":
        case "P":
          e.preventDefault();
          togglePause();
          break;
        case "f":
        case "F":
        case "F11":
          e.preventDefault();
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
