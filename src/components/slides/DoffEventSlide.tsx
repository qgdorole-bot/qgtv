import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Ticket, Dice5 } from "lucide-react";
import doffImg from "@/assets/doff-event.jpg";

interface Props {
  isActive: boolean;
}

export const DoffEventSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at top, #2a1055 0%, #180a30 60%, #000000 100%)",
      }}
    >
      {/* Floating dice-like sparks */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-md"
            style={{
              width: `${8 + Math.random() * 14}px`,
              height: `${8 + Math.random() * 14}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ["#f59e0b", "#a855f7", "#ec4899", "#22d3ee"][i % 4],
              boxShadow: "0 0 20px currentColor",
              animation: `floatDice ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl w-full items-center">
          {/* Image */}
          <div className={cn("relative", isActive && "fade-in")}>
            <div
              className="absolute -inset-4 rounded-2xl blur-2xl opacity-70"
              style={{
                background:
                  "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)",
              }}
            />
            <img
              src={doffImg}
              alt="QG no DOFF - Diversão Offline"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className={cn("space-y-5 md:space-y-6", isActive && "fade-in-up")}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase"
              style={{
                background: "rgba(168, 85, 247, 0.15)",
                border: "1px solid rgba(168, 85, 247, 0.5)",
                color: "#e9d5ff",
              }}
            >
              <Dice5 className="w-3.5 h-3.5" />
              Rolê Extra · Board Games
            </div>

            <h2
              className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #fde047 0%, #ec4899 50%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(168, 85, 247, 0.4)",
              }}
            >
              QG NO DOFF
            </h2>
            <p className="text-white/90 font-display text-lg md:text-2xl lg:text-3xl -mt-2">
              O maior evento de board games da América Latina
            </p>

            <div className="space-y-3 pt-2">
              <InfoRow icon={<Calendar className="w-5 h-5" />} text="Domingo · 12/07/2026" />
              <InfoRow icon={<Clock className="w-5 h-5" />} text="12h30 às 17h" />
              <InfoRow icon={<MapPin className="w-5 h-5" />} text="Expo Center Norte · Vila Guilherme" />
              <InfoRow icon={<Ticket className="w-5 h-5" />} text="R$ 235,00 (até 3x no cartão)" />
            </div>

            <div
              className="mt-4 inline-flex items-center gap-3 px-7 py-4 rounded-full font-display font-bold tracking-wider text-base md:text-lg uppercase"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "white",
                boxShadow:
                  "0 0 40px rgba(168, 85, 247, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Dice5 className="w-5 h-5" />
              Garanta sua vaga
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatDice {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
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
