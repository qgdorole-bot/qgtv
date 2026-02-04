import { Slide } from "./Slide";

interface MissionSlideProps {
  isActive: boolean;
}

export const MissionSlide = ({ isActive }: MissionSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className={`p-5 rounded-2xl cyber-border-purple ${isActive ? 'scale-in' : ''}`}>
          <span className="text-4xl md:text-5xl">⚙️</span>
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-primary text-glow-purple ${isActive ? 'fade-in-up' : ''}`}>
          Missão
        </h2>
        <p className={`text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed max-w-4xl text-balance ${isActive ? 'fade-in-delayed' : ''}`}>
          Ensinar habilidades para a vida, transformando conhecimento psicológico em experiências reais que impulsionam sonhos e conquistas.
        </p>
      </div>
    </Slide>
  );
};
