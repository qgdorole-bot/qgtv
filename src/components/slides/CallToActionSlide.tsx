import { Slide } from "./Slide";
import { Calendar, MapPin, Clock } from "lucide-react";

interface CallToActionSlideProps {
  isActive: boolean;
}

export const CallToActionSlide = ({ isActive }: CallToActionSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <h2 className={`text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-wide ${isActive ? 'fade-in-up' : ''}`}>
          <span className="text-primary text-glow-pink">Temporada 1</span>
          <span className="text-white mx-4">/</span>
          <span className="text-secondary text-glow-cyan">2026</span>
        </h2>
        
        <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isActive ? 'fade-in-delayed' : ''}`}>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-6 h-6 text-primary" />
            <span className="text-lg md:text-xl">Em breve</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-6 h-6 text-secondary" />
            <span className="text-lg md:text-xl">Acompanhe</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-6 h-6 text-accent" />
            <span className="text-lg md:text-xl">QG do Rolê</span>
          </div>
        </div>

        <div className={`mt-8 p-6 rounded-2xl cyber-border ${isActive ? 'scale-in' : ''}`} style={{ animationDelay: '0.5s' }}>
          <p className="text-2xl md:text-3xl font-display font-bold bg-cyber-gradient bg-clip-text text-transparent animate-pulse-glow">
            #QGdoRolê #IA #S12026
          </p>
        </div>
      </div>
    </Slide>
  );
};
