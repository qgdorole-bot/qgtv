import { cn } from "@/lib/utils";
import { Heart, Sparkles } from "lucide-react";
import qgDateLogo from "@/assets/qgdate-logo.jpeg";

interface Props {
  isActive: boolean;
}

export const QGDateSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at top, #4a1530 0%, #1a0510 60%, #000000 100%)",
      }}
    >
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animation: `floatUp ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              fill: "currentColor",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl w-full items-center">
          {/* Logo */}
          <div className={cn("relative flex justify-center", isActive && "fade-in")}>
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle, #ec4899 0%, transparent 70%)",
              }}
            />
            <img
              src={qgDateLogo}
              alt="QG Date"
              loading="lazy"
              width={600}
              height={600}
              className="relative w-full max-w-md rounded-3xl shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 40px rgba(236, 72, 153, 0.5))",
              }}
            />
          </div>

          {/* Content */}
          <div className={cn("space-y-5 md:space-y-6 text-center lg:text-left", isActive && "fade-in-up")}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase"
              style={{
                background: "rgba(236, 72, 153, 0.15)",
                border: "1px solid rgba(236, 72, 153, 0.5)",
                color: "#fbcfe8",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Dia dos Namorados
            </div>

            <h2
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #fda4af 0%, #ec4899 50%, #be185d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 50px rgba(236, 72, 153, 0.4)",
              }}
            >
              QG DATE
            </h2>

            <p className="text-white/90 font-display text-lg md:text-2xl lg:text-3xl italic">
              Um encontro especial
            </p>


            <p className="text-white/70 font-display text-base md:text-lg max-w-md mx-auto lg:mx-0">
              Vem viver um momento único com a gente. Conexão, afeto e muita
              diversão no rolê mais romântico da temporada.
            </p>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <div
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-display font-bold tracking-wider text-base md:text-lg uppercase"
                style={{
                  background:
                    "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                  color: "white",
                  boxShadow:
                    "0 0 40px rgba(236, 72, 153, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                <Heart className="w-5 h-5 fill-current" />
                Garanta sua vaga
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
