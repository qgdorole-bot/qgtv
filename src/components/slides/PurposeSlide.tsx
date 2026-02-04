import { Slide } from "./Slide";

interface PurposeSlideProps {
  isActive: boolean;
}

export const PurposeSlide = ({ isActive }: PurposeSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <div className={`p-5 rounded-2xl cyber-border-purple ${isActive ? 'scale-in' : ''}`}>
          <span className="text-4xl md:text-5xl">💜</span>
        </div>
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-primary text-glow-purple ${isActive ? 'fade-in-up' : ''}`}>
          Propósito
        </h2>
        <p className={`text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed max-w-4xl text-balance ${isActive ? 'fade-in-delayed' : ''}`}>
          Realizamos sonhos ensinando habilidades pra lidar com o mundo.
        </p>
      </div>
    </Slide>
  );
};
