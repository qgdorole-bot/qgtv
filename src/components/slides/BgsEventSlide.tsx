import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Ticket, Gamepad2 } from "lucide-react";
import bgsImg from "@/assets/bgs-event.jpg";

interface Props {
  isActive: boolean;
}

export const BgsEventSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at top, #232149 0%, #14132b 60%, #05050d 100%)",
      }}
    >
      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl w-full items-center">
          {/* Image */}
          <div className={cn("relative", isActive && "fade-in")}>
            <div
              className="absolute -inset-4 rounded-2xl blur-2xl opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--brand-orange)) 0%, hsl(var(--brand-sky)) 100%)",
              }}
            />
            <img
              src={bgsImg}
              alt="Brasil Game Show — Distrito Anhembi"
              decoding="async"
              width={1024}
              height={1024}
              className="relative rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className={cn("space-y-5 md:space-y-6", isActive && "fade-in-up")}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase bg-brand-orange/15 border border-brand-orange/50 text-brand-orange">
              <Gamepad2 className="w-3.5 h-3.5" />
              Rolê Extra · Games
            </div>

            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight text-brand-orange">
              BGS 2026
            </h2>
            <p className="text-white/90 font-display text-lg md:text-2xl lg:text-3xl -mt-2">
              A maior feira de games das Américas
            </p>

            <div className="space-y-3 pt-2">
              <InfoRow icon={<Calendar className="w-5 h-5" />} text="Domingo · 11/10/2026" />
              <InfoRow icon={<Clock className="w-5 h-5" />} text="Feira aberta das 12:00 às 21:00" />
              <InfoRow
                icon={<MapPin className="w-5 h-5" />}
                text="Distrito Anhembi · Av. Olavo Fontoura, 1209 · Santana, SP"
              />
              <InfoRow icon={<Gamepad2 className="w-5 h-5" />} text="Vivência guiada + task social + acompanhamento" />
              <InfoRow icon={<Ticket className="w-5 h-5" />} text="R$ 442 com ingresso incluso · até 4x no cartão" />
            </div>

            <div className="mt-4 inline-flex items-center gap-3 px-7 py-4 rounded-full font-display font-bold tracking-wider text-base md:text-lg uppercase bg-brand-orange text-white shadow-[0_0_40px_hsl(var(--brand-orange)/0.6)]">
              <Ticket className="w-5 h-5" />
              Garanta sua vaga
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-3 text-white/85 font-display text-base md:text-lg">
    <span className="text-brand-sky">{icon}</span>
    <span>{text}</span>
  </div>
);
