import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Gamepad2, Sparkles, Swords, Ticket, Bot, Popcorn } from "lucide-react";

interface GeekEventsSlideProps {
  isActive: boolean;
}

type GeekEvent = {
  name: string;
  when: string;
  place: string;
  tag: string;
  icon: typeof Gamepad2;
  tone: "orange" | "sky";
};

const EVENTS: GeekEvent[] = [
  {
    name: "CCXP",
    when: "Dezembro",
    place: "São Paulo Expo",
    tag: "Quadrinhos · Séries · Cinema",
    icon: Ticket,
    tone: "orange",
  },
  {
    name: "Brasil Game Show",
    when: "Outubro",
    place: "Expo Center Norte",
    tag: "Games · eSports",
    icon: Gamepad2,
    tone: "sky",
  },
  {
    name: "Anime Friends",
    when: "Julho",
    place: "Distrito Anhembi",
    tag: "Anime · Cosplay · K-Pop",
    icon: Sparkles,
    tone: "orange",
  },
  {
    name: "Anime Dreams",
    when: "Fevereiro",
    place: "Distrito Anhembi",
    tag: "Anime · Cultura Pop",
    icon: Bot,
    tone: "sky",
  },
  {
    name: "Card Games & Cosplay",
    when: "O ano todo",
    place: "Bairro da Liberdade",
    tag: "Torneios · Trocas de cartas",
    icon: Swords,
    tone: "orange",
  },
  {
    name: "Sessões Geek no Cinema",
    when: "Rolês do QG",
    place: "Shoppings de SP",
    tag: "Estreias · Maratonas",
    icon: Popcorn,
    tone: "sky",
  },
];

const TONES = {
  orange: {
    ring: "ring-brand-orange/50",
    glow: "hsl(var(--brand-orange) / 0.35)",
    text: "text-brand-orange",
    chip: "bg-brand-orange/15 text-brand-orange border-brand-orange/40",
  },
  sky: {
    ring: "ring-brand-sky/50",
    glow: "hsl(var(--brand-sky) / 0.3)",
    text: "text-brand-sky",
    chip: "bg-brand-sky/15 text-brand-sky border-brand-sky/40",
  },
} as const;

export const GeekEventsSlide = ({ isActive }: GeekEventsSlideProps) => {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setHighlight(0);
      return;
    }
    const id = window.setInterval(() => {
      setHighlight((h) => (h + 1) % EVENTS.length);
    }, 2000);
    return () => clearInterval(id);
  }, [isActive]);

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-dark-gradient",
        "transition-opacity duration-1000 ease-in-out",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute -top-40 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(var(--brand-orange))" }}
      />
      <div
        className="absolute -bottom-48 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(var(--brand-sky))" }}
      />

      {/* Header */}
      <div className={cn("relative z-10 text-center mb-8", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-3">
          Agenda da cidade
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-wide text-brand-orange text-glow-purple">
          Eventos Geeks em SP
        </h2>
      </div>

      {/* Grid */}
      <div className="relative z-10 w-full max-w-[1600px] px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {EVENTS.map((ev, i) => {
            const tone = TONES[ev.tone];
            const Icon = ev.icon;
            const active = highlight === i;
            return (
              <div
                key={ev.name}
                className={cn(
                  "relative rounded-2xl p-5 md:p-7 backdrop-blur-sm ring-1 transition-all duration-500",
                  tone.ring,
                  active ? "scale-[1.04] bg-white/[0.07]" : "bg-white/[0.03]"
                )}
                style={{ boxShadow: active ? `0 0 45px ${tone.glow}` : "none" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "shrink-0 flex items-center justify-center rounded-xl h-14 w-14 md:h-16 md:w-16 border",
                      tone.chip
                    )}
                  >
                    <Icon className="h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-xl md:text-3xl text-brand-cream leading-tight">
                      {ev.name}
                    </h3>
                    <p className={cn("mt-1 font-semibold text-base md:text-xl", tone.text)}>
                      {ev.when} · {ev.place}
                    </p>
                    <p className="mt-2 text-sm md:text-lg text-brand-cream/60">{ev.tag}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-8 text-sm md:text-lg text-brand-cream/50 tracking-wide">
        Confira as datas oficiais no site de cada evento · Quer ir junto? Fala com o QG
      </p>
    </div>
  );
};
