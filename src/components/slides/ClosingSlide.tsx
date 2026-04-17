import { Slide } from "./Slide";
import groupSessionImage from "@/assets/group-session.jpg";
import qrcodeAppStore from "@/assets/qrcode-appstore.png";
import qrcodePlayStore from "@/assets/qrcode-playstore.png";
import { Instagram, Apple, Play } from "lucide-react";

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
        <div className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 w-full max-w-6xl ${isActive ? 'fade-in-delayed' : ''}`}>
          {/* Group Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 shrink-0">
            <img
              src={groupSessionImage}
              alt="Grupos treinando habilidades sociais"
              className="w-64 md:w-80 h-44 md:h-56 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-3 left-0 right-0 text-white text-sm md:text-base font-medium">
              Treinando habilidades sociais
            </p>
          </div>

          {/* QR Codes */}
          <div className="flex flex-col items-center space-y-3">
            <p className="text-base md:text-lg text-muted-foreground font-medium font-display tracking-wider uppercase">
              Baixe o App
            </p>
            <div className="flex items-center gap-5 md:gap-6">
              {/* App Store */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-2xl p-3 shadow-2xl shadow-primary/20">
                  <img
                    src={qrcodeAppStore}
                    alt="QR Code App Store - QG do Rolê"
                    className="w-28 h-28 md:w-36 md:h-36 object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-white/90">
                  <Apple className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-display tracking-wider">App Store</span>
                </div>
              </div>

              {/* Play Store */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-2xl p-3 shadow-2xl shadow-primary/20">
                  <img
                    src={qrcodePlayStore}
                    alt="QR Code Google Play - QG do Rolê"
                    className="w-28 h-28 md:w-36 md:h-36 object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-white/90">
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-display tracking-wider">Google Play</span>
                </div>
              </div>
            </div>
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
