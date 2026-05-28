import { cn } from "@/lib/utils";
import { Clock, MapPin, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import luana from "@/assets/figurinhas/luana.jpeg";
import bahia from "@/assets/figurinhas/bahia.jpeg";
import dani from "@/assets/figurinhas/dani.jpeg";
import joao from "@/assets/figurinhas/joao.jpeg";
import jhon from "@/assets/figurinhas/jhon.jpeg";
import renan from "@/assets/figurinhas/renan.jpeg";
import jose from "@/assets/figurinhas/jose.jpeg";
import juliana from "@/assets/figurinhas/juliana.jpeg";

interface Props {
  isActive: boolean;
}

const FIGURINHAS = [
  { src: jose, name: "José" },
  { src: luana, name: "Luana" },
  { src: juliana, name: "Juliana" },
  { src: joao, name: "João" },
  { src: dani, name: "Dani" },
  { src: jhon, name: "Jhon" },
  { src: renan, name: "Renan" },
  { src: bahia, name: "Bahia" },
];

export const FigurinhasSlide = ({ isActive }: Props) => {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const id = window.setInterval(
      () => setHighlight((h) => (h + 1) % FIGURINHAS.length),
      1500
    );
    return () => clearInterval(id);
  }, [isActive]);

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
        {Array.from({ length: 20 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-emerald-400/30"
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

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 md:p-10 lg:p-14 gap-6 lg:gap-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-5xl">
          <div
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase",
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
          <h2
            className={cn(
              "font-display font-black text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight",
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
          <p className="text-white/85 font-display text-base md:text-xl">
            Complete seu álbum e troque com a galera
          </p>
        </div>

        {/* Figurinhas grid */}
        <div
          className={cn(
            "grid grid-cols-4 gap-3 md:gap-5 lg:gap-6 max-w-6xl w-full",
            isActive && "fade-in-delayed"
          )}
        >
          {FIGURINHAS.map((f, i) => {
            const active = i === highlight;
            return (
              <div
                key={f.name}
                className="relative transition-all duration-500"
                style={{
                  transform: active ? "scale(1.08) translateY(-6px)" : "scale(1)",
                  zIndex: active ? 5 : 1,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl blur-2xl transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, #10b981 0%, transparent 70%)",
                    opacity: active ? 0.8 : 0.25,
                  }}
                />
                <img
                  src={f.src}
                  alt={`Figurinha ${f.name}`}
                  loading="lazy"
                  className="relative w-full rounded-xl md:rounded-2xl"
                  style={{
                    filter: active
                      ? "drop-shadow(0 0 30px rgba(16,185,129,0.7)) drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
                      : "drop-shadow(0 6px 14px rgba(0,0,0,0.5))",
                    border: active
                      ? "2px solid rgba(110,231,183,0.9)"
                      : "2px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Info row */}
        <div
          className={cn(
            "flex flex-col items-center gap-3 max-w-4xl w-full",
            isActive && "fade-in-delayed"
          )}
        >
          <div
            className="flex items-center justify-center gap-2 px-5 py-2 rounded-full font-display text-sm md:text-base"
            style={{
              background: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.6)",
              color: "#6ee7b7",
            }}
          >
            <MapPin className="w-4 h-4" />
            <span className="font-bold tracking-wide">Sala do QG</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Qui", time: "13:00" },
              { label: "Sex", time: "16:00" },
              { label: "Sáb", time: "13:00" },
            ].map((slot) => (
              <div
                key={slot.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-display text-sm md:text-base"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-white/90 font-semibold">{slot.label}</span>
                <span className="text-emerald-300 font-bold">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={cn(isActive && "fade-in-delayed")}>
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-display font-bold tracking-wider text-sm md:text-base uppercase"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              boxShadow:
                "0 0 40px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <Star className="w-4 h-4 fill-current" />
            Troque e complete seu álbum
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

