import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import starwarsImg from "@/assets/starwars-event.jpg";

interface Props {
  isActive: boolean;
}

export const StarWarsEventSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, #0a0a1a 0%, #000000 70%)",
      }}
    >
      {/* Starfield */}
      <div className="absolute inset-0 opacity-70">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2.5 + 0.5}px`,
              height: `${Math.random() * 2.5 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl w-full items-center">
          {/* Image */}
          <div
            className={cn(
              "relative",
              isActive && "fade-in"
            )}
          >
            <div
              className="absolute -inset-4 rounded-2xl blur-2xl opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #ef4444 100%)",
              }}
            />
            <img
              src={starwarsImg}
              alt="Star Wars Mandalorian e Grogu"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className={cn("space-y-5 md:space-y-6", isActive && "fade-in-up")}>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                color: "#fca5a5",
              }}
            >
              Rolê Extra · Cinema
            </div>

            <h2
              className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #fde047 0%, #f59e0b 50%, #ef4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(245, 158, 11, 0.3)",
              }}
            >
              STAR WARS
            </h2>
            <p className="text-white/90 font-display text-lg md:text-2xl lg:text-3xl -mt-2">
              O Mandaloriano e Grogu
            </p>

            <div className="space-y-3 pt-2">
              <InfoRow icon={<Calendar className="w-5 h-5" />} text="Domingo · 31/05/2026" />
              <InfoRow icon={<Clock className="w-5 h-5" />} text="15:10 às 18:10" />
              <InfoRow icon={<MapPin className="w-5 h-5" />} text="Shopping Frei Caneca · Consolação" />
            </div>

            <div
              className="mt-4 inline-flex items-center gap-3 px-7 py-4 rounded-full font-display font-bold tracking-wider text-base md:text-lg uppercase"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white",
                boxShadow: "0 0 40px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Ticket className="w-5 h-5" />
              Garanta sua vaga
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-white/85 font-display text-base md:text-lg">
    <span className="text-yellow-400">{icon}</span>
    <span>{text}</span>
  </div>
);
