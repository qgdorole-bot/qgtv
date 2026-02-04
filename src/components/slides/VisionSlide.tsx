import { Slide } from "./Slide";

interface VisionSlideProps {
  isActive: boolean;
}

export const VisionSlide = ({ isActive }: VisionSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className={`p-5 rounded-2xl cyber-border-purple ${isActive ? 'scale-in' : ''}`}>
          <span className="text-4xl md:text-5xl">🌍</span>
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-primary text-glow-purple ${isActive ? 'fade-in-up' : ''}`}>
          Visão
        </h2>
        <p className={`text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl text-balance ${isActive ? 'fade-in-delayed' : ''}`}>
          Ser referência global em tornar a psicologia acessível, funcional e eficaz.
        </p>
      </div>
    </Slide>
  );
};
