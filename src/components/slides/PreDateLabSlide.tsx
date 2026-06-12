import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Eye,
  Sparkles,
  Handshake,
  CheckCircle2,
} from "lucide-react";

interface Props {
  isActive: boolean;
}

const SKILLS = [
  { icon: MessageCircle, label: "Como puxar assunto" },
  { icon: Eye, label: "Como demonstrar interesse" },
  { icon: Sparkles, label: "Como lidar com insegurança" },
  { icon: Heart, label: "Como flertar sem parecer forçado" },
  { icon: Handshake, label: "Como se conectar melhor" },
];

export const PreDateLabSlide = ({ isActive }: Props) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at center, #2a0610 0%, #150208 55%, #000000 100%)",
      }}
    >
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-red-500/25 fill-red-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${14 + Math.random() * 22}px`,
              height: `${14 + Math.random() * 22}px`,
              animation: `floatHeart ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 md:p-10 lg:p-14 gap-5 lg:gap-7">
        {/* Header */}
        <div className="text-center space-y-3 max-w-5xl">
          <div
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-display tracking-[0.3em] uppercase",
              isActive && "fade-in"
            )}
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              color: "#fca5a5",
            }}
          >
            <Heart className="w-4 h-4 fill-current" />
            Dia dos Namorados · QG do Rolê
          </div>
          <h2
            className={cn(
              "font-display font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight",
              isActive && "fade-in-up"
            )}
            style={{
              background:
                "linear-gradient(135deg, #fca5a5 0%, #ef4444 45%, #b91c1c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 50px rgba(239, 68, 68, 0.4)",
            }}
          >
            PRÉ-DATE LAB
          </h2>
          <p className="text-white/85 font-display text-base md:text-xl max-w-3xl mx-auto">
            Um laboratório prático pra treinar{" "}
            <span className="text-red-300 font-bold">habilidades sociais</span>{" "}
            para dates reais
          </p>
        </div>

        {/* Two columns: skills + event info */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 max-w-6xl w-full",
            isActive && "fade-in-delayed"
          )}
        >
          {/* Skills */}
          <div
            className="rounded-2xl p-5 md:p-6 space-y-3"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            <div className="font-display font-bold text-red-300 uppercase tracking-[0.2em] text-xs md:text-sm">
              O que você vai treinar
            </div>
            {SKILLS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-3 text-white/90 font-display text-sm md:text-base"
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#ef4444,#b91c1c)",
                      boxShadow: "0 0 18px rgba(239,68,68,0.45)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Event info */}
          <div
            className="rounded-2xl p-5 md:p-6 flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px dashed rgba(239, 68, 68, 0.5)",
            }}
          >
            <div className="font-display font-bold text-red-300 uppercase tracking-[0.2em] text-xs md:text-sm">
              Detalhes do encontro
            </div>

            <InfoLine
              icon={<Calendar className="w-5 h-5" />}
              label="Data"
              value="Sexta-feira · 12/06"
            />
            <InfoLine
              icon={<Clock className="w-5 h-5" />}
              label="Horário"
              value="19:30"
            />
            <InfoLine
              icon={<Users className="w-5 h-5" />}
              label="Vagas"
              value="Apenas 8 selecionadas"
              highlight
            />
            <InfoLine
              icon={<Clock className="w-5 h-5" />}
              label="Duração"
              value="1h30"
            />
            <InfoLine
              icon={<DollarSign className="w-5 h-5" />}
              label="Investimento"
              value="R$ 96 · Pix ou cartão"
            />
            <div className="flex items-start gap-2 text-white/75 font-display text-xs md:text-sm pt-1">
              <CheckCircle2 className="w-4 h-4 text-red-300 mt-0.5 shrink-0" />
              <span>
                Dinâmicas, situações práticas e feedback com psicólogos do QG
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={cn(isActive && "fade-in-delayed")}>
          <div
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-display font-bold tracking-wider text-sm md:text-base uppercase"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
              color: "white",
              boxShadow:
                "0 0 40px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <Heart className="w-4 h-4 fill-current" />
            Vagas limitadas · Garanta a sua
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatHeart {
          0%, 100% { transform: translateY(0) rotate(-5deg); opacity: 0.25; }
          50% { transform: translateY(-30px) rotate(8deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

const InfoLine = ({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-red-400">{icon}</span>
    <div className="flex flex-col">
      <span className="text-white/55 font-display text-[10px] md:text-xs uppercase tracking-[0.2em]">
        {label}
      </span>
      <span
        className={cn(
          "font-display font-bold",
          highlight ? "text-red-300 text-base md:text-lg" : "text-white text-sm md:text-base"
        )}
      >
        {value}
      </span>
    </div>
  </div>
);
