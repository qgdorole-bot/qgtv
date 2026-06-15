import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Ticket, Popcorn } from "lucide-react";
import toystoryImg from "@/assets/toystory-event.jpg";

interface Props {
  isActive: boolean;
}

export const ToyStoryEventSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at top, #1e3a8a 0%, #0c1a3a 60%, #000000 100%)",
      }}
    >
      {/* Floating clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white blur-2xl"
            style={{
              width: `${80 + Math.random() * 140}px`,
              height: `${40 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `drift ${14 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
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
                  "linear-gradient(135deg, #facc15 0%, #ef4444 50%, #3b82f6 100%)",
              }}
            />
            <img
              src={toystoryImg}
              alt="Toy Story 5 - Cinema"
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
                background: "rgba(250, 204, 21, 0.15)",
                border: "1px solid rgba(250, 204, 21, 0.5)",
                color: "#fde68a",
              }}
            >
              <Popcorn className="w-3.5 h-3.5" />
              Rolê Extra · Cinema
            </div>

            <h2
              className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #facc15 0%, #f59e0b 40%, #ef4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 40px rgba(245, 158, 11, 0.4)",
              }}
            >
              TOY STORY 5
            </h2>
            <p className="text-white/90 font-display text-lg md:text-2xl lg:text-3xl -mt-2">
              Ao infinito e além — no cinema!
            </p>

            <div className="space-y-3 pt-2">
              <InfoRow icon={<Calendar className="w-5 h-5" />} text="Domingo · 21/06/2026" />
              <InfoRow icon={<Clock className="w-5 h-5" />} text="12:30 às 15:30" />
              <InfoRow icon={<MapPin className="w-5 h-5" />} text="Shopping Cidade São Paulo · Av. Paulista, 1230" />
              <InfoRow icon={<Popcorn className="w-5 h-5" />} text="Leve dinheiro para pipoca (opcional)" />
            </div>

            <div
              className="mt-4 inline-flex items-center gap-3 px-7 py-4 rounded-full font-display font-bold tracking-wider text-base md:text-lg uppercase"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                color: "white",
                boxShadow:
                  "0 0 40px rgba(245, 158, 11, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <Ticket className="w-5 h-5" />
              Garanta sua vaga
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(30px) translateY(-20px); }
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
