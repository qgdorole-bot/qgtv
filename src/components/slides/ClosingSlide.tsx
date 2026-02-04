import { Slide } from "./Slide";
import groupTrainingImage from "@/assets/group-therapy-training.jpg";
import { Instagram } from "lucide-react";

interface ClosingSlideProps {
  isActive: boolean;
}

export const ClosingSlide = ({ isActive }: ClosingSlideProps) => {
  return (
    <Slide isActive={isActive} showGrid={false}>
      <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
        {/* Header */}
        <div className={`space-y-2 ${isActive ? 'fade-in-up' : ''}`}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
            <span className="text-primary text-glow-purple">Realizamos sonhos</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground font-light">
            ensinando habilidades pra lidar com o mundo
          </p>
        </div>

        {/* Content Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl ${isActive ? 'fade-in-delayed' : ''}`}>
          {/* Group Training Image */}
          <div className="flex flex-col items-center space-y-3">
            <div className="rounded-xl overflow-hidden cyber-border-purple">
              <img 
                src={groupTrainingImage} 
                alt="Grupos e terapeutas treinando habilidades sociais" 
                className="w-full h-40 md:h-48 object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Grupos treinando habilidades sociais
            </p>
          </div>

          {/* QR Code for App */}
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-white rounded-xl p-4 cyber-border-purple">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-5 gap-1">
                    {/* QR Code visual placeholder */}
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-sm ${
                          [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i) 
                            ? 'bg-primary' 
                            : 'bg-primary/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Baixe nosso APP
            </p>
          </div>
        </div>

        {/* Instagram */}
        <div className={`flex items-center gap-3 p-4 md:p-6 rounded-2xl cyber-border-purple ${isActive ? 'fade-in-delayed' : ''}`}>
          <Instagram className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <p className="text-lg md:text-2xl font-display font-medium bg-cyber-gradient bg-clip-text text-transparent">
            @qgdorole
          </p>
        </div>

        {/* Hashtags */}
        <p className={`text-sm md:text-base text-muted-foreground ${isActive ? 'fade-in-delayed' : ''}`}>
          #QGdoRolê #IA #Temporada1
        </p>
      </div>
    </Slide>
  );
};