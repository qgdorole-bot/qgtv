import { cn } from "@/lib/utils";
import { Clock, MapPin, Sparkles, Star } from "lucide-react";
import neymarImg from "@/assets/neymar-figurinha.png";

interface Props {
  isActive: boolean;
}

export const FigurinhasSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, #0f2a1a 0%, #051005 50%, #000000 100%)",
      }}
    >
      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-emerald-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${16 + Math.random() * 20}px`,
              height: `${16 + Math.random() * 20}px`,
              animation: `floatParticle ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-5xl w-full text-center space-y-8">
          {/* Kicker */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm md:text-base font-display tracking-[0.3em] uppercase mx-auto",
              isActive && "fade-in"
            )}
            style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.5)",
              color: "#6ee7b7",
            }}
          >
            <Sparkles className="w-4 h-4" />
            Novidade do QG
          </div>

          {/* Title */}
          <h2
            className={cn(
              "font-display font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight",
              isActive && "fade-in-up"
            )}
            style={{
              background:
                "linear-gradient(135deg, #34d399 0%, #10b981 40%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 50px rgba(16, 185, 129, 0.4)",
            }}
          >
            TROCA DE FIGURINHAS
          </h2>

          {/* Subtitle */}
          <p
            className={cn(
              "text-white/90 font-display text-xl md:text-3xl lg:text-4xl -mt-2",
              isActive && "fade-in-up"
            )}
          >
            Complete seu álbum e troque com a galera
          </p>

          {/* Info rows */}
          <div className={cn("space-y-5 pt-6 flex flex-col items-center", isActive && "fade-in-delayed")}>
            <InfoRow
              icon={<MapPin className="w-6 h-6" />}
              text="Sala do QG"
            />
            <div className="flex flex-col gap-3 items-center">
              <InfoRow
                icon={<Clock className="w-6 h-6" />}
                text="Quinta-feira · 13:00"
              />
              <InfoRow
                icon={<Clock className="w-6 h-6" />}
                text="Sexta-feira · 16:00"
              />
              <InfoRow
                icon={<Clock className="w-6 h-6" />}
                text="Sábado · 13:00"
              />
            </div>
          </div>

          {/* CTA */}
          <div className={cn("pt-6", isActive && "fade-in-delayed")}>
            <div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold tracking-wider text-base md:text-lg uppercase"
              style={{
                background:
                  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                boxShadow:
                  "0 0 40px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Star className="w-5 h-5 fill-current" />
              Troque e complete seu álbum
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-25px) rotate(15deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-white/85 font-display text-lg md:text-xl">
    <span className="text-emerald-400">{icon}</span>
    <span>{text}</span>
  </div>
);
