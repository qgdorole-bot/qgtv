import { Slide } from "./Slide";
import qgMainImage from "@/assets/qg-role-main-optimized.jpg";

interface ClosingSlideProps {
  isActive: boolean;
}

export const ClosingSlide = ({ isActive }: ClosingSlideProps) => {
  return (
    <Slide isActive={isActive} showGrid={false}>
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <img 
          src={qgMainImage} 
          alt="QG do Rolê" 
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          className={`w-48 md:w-64 lg:w-80 object-contain ${isActive ? 'scale-in' : ''}`}
        />
        <div className={`space-y-4 ${isActive ? 'fade-in-up' : ''}`}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-primary text-glow-purple">Realizamos sonhos</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light">
            ensinando habilidades pra lidar com o mundo
          </p>
        </div>
        <div className={`mt-6 p-4 md:p-6 rounded-2xl cyber-border-purple ${isActive ? 'fade-in-delayed' : ''}`}>
          <p className="text-lg md:text-xl font-display font-medium bg-cyber-gradient bg-clip-text text-transparent">
            #QGdoRolê #IA #Temporada1
          </p>
        </div>
      </div>
    </Slide>
  );
};