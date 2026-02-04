interface SlideProgressProps {
  currentSlide: number;
  totalSlides: number;
  duration: number;
  isPaused: boolean;
}

export const SlideProgress = ({ currentSlide, totalSlides, duration, isPaused }: SlideProgressProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className="w-12 md:w-16 h-1 rounded-full bg-white/10 overflow-hidden"
        >
          <div
            className={`h-full rounded-full ${
              index < currentSlide 
                ? 'w-full bg-gradient-to-r from-purple-400 to-primary' 
                : index === currentSlide 
                  ? `${isPaused ? '' : 'animate-progress'} bg-gradient-to-r from-purple-400 to-primary` 
                  : 'w-0'
            }`}
            style={{
              animationDuration: index === currentSlide ? `${duration}ms` : undefined,
              width: index < currentSlide ? '100%' : index === currentSlide && isPaused ? '50%' : undefined,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </div>
  );
};
