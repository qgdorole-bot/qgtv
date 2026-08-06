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
  const [index, setIndex] = useState(() => Math.floor(Math.random() * EVENTS.length));

  useEffect(() => {
    if (!isActive) return;
    // Sorteia um evento diferente sempre que o slide entra em cena
    setIndex((prev) => {
      const options = EVENTS.map((_, i) => i).filter((i) => i !== prev);
      return options[Math.floor(Math.random() * options.length)];
    });
  }, [isActive]);

  const ev = EVENTS[index];
  const tone = TONES[ev.tone];
  const Icon = ev.icon;

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
      <div className={cn("relative z-10 text-center mb-10", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-3">
          Agenda da cidade
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-wide text-brand-orange">
          Eventos Geeks em SP
        </h2>
      </div>

      {/* Evento em destaque */}
      <div className="relative z-10 w-full max-w-[1200px] px-8">
        <div
          key={ev.name}
          className={cn(
            "relative rounded-[2rem] p-10 md:p-14 backdrop-blur-md ring-1 bg-white/[0.06] fade-in-up",
            tone.ring
          )}
          style={{ boxShadow: `0 0 70px ${tone.glow}` }}
        >
          <div className="flex items-center gap-8">
            <div
              className={cn(
                "shrink-0 flex items-center justify-center rounded-3xl h-28 w-28 md:h-36 md:w-36 border",
                tone.chip
              )}
            >
              <Icon className="h-14 w-14 md:h-20 md:w-20" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-black text-5xl md:text-7xl text-brand-cream leading-none">
                {ev.name}
              </h3>
              <p className={cn("mt-4 font-bold text-2xl md:text-4xl", tone.text)}>
                {ev.when} · {ev.place}
              </p>
              <p className="mt-3 text-xl md:text-2xl text-brand-cream/70">{ev.tag}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-10 text-base md:text-xl text-brand-cream/50 tracking-wide">
        Confira as datas oficiais no site de cada evento · Quer ir junto? Fala com o QG
      </p>
    </div>
  );
};
