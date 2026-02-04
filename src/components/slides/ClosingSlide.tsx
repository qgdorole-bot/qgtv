import { Slide } from "./Slide";
import groupSessionImage from "@/assets/group-session.jpg";
import qrcodeApp from "@/assets/qrcode-app.png";
import { Instagram } from "lucide-react";

interface ClosingSlideProps {
  isActive: boolean;
}

export const ClosingSlide = ({ isActive }: ClosingSlideProps) => {
  return (
    <Slide isActive={isActive} showGrid={false}>
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        {/* Header */}
        <div className={`space-y-3 ${isActive ? 'fade-in-up' : ''}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold">
            <span className="text-primary text-glow-purple">Realizamos sonhos</span>
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground font-light">
            ensinando habilidades pra lidar com o mundo
          </p>
        </div>

        {/* Content Row */}
        <div className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-5xl ${isActive ? 'fade-in-delayed' : ''}`}>
          {/* Group Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
            <img 
              src={groupSessionImage} 
              alt="Grupos treinando habilidades sociais" 
              className="w-72 md:w-96 h-48 md:h-64 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-3 left-0 right-0 text-white text-sm md:text-base font-medium">
              Treinando habilidades sociais
            </p>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-primary/20">
              <img 
                src={qrcodeApp} 
                alt="QR Code - App QG do Rolê" 
                className="w-36 h-36 md:w-44 md:h-44 object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              Baixe o App
            </p>
          </div>
        </div>

        {/* Instagram */}
        <div className={`flex items-center gap-4 ${isActive ? 'fade-in-delayed' : ''}`}>
          <Instagram className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          <span className="text-2xl md:text-3xl font-display font-bold bg-cyber-gradient bg-clip-text text-transparent">
            @qgdorole
          </span>
        </div>
      </div>
    </Slide>
  );
};