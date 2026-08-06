import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BookOpen, Clapperboard, Tv, Swords, Flame, Star } from "lucide-react";

interface GeekContentSlideProps {
  isActive: boolean;
}

type GeekContent = {
  title: string;
  category: string;
  icon: typeof BookOpen;
  tone: "orange" | "sky";
  facts: string[];
  highlight: string;
};

const CONTENTS: GeekContent[] = [
  {
    title: "Dragon Ball",
    category: "Anime · Mangá",
    icon: Flame,
    tone: "orange",
    highlight: "Mais de 260 milhões de mangás vendidos no mundo",
    facts: [
      "Criado por Akira Toriyama em 1984, com 42 volumes de mangá",
      "Z adaptou a saga adulta: Saiyajins, Freeza, Cell e Majin Boo",
      "Daima (2024) é a série mais recente da franquia",
      "Ordem para maratonar: Dragon Ball → Z → Super → Daima",
    ],
  },
  {
    title: "Clássicos do Mangá",
    category: "Leitura obrigatória",
    icon: BookOpen,
    tone: "sky",
    highlight: "One Piece passou de 500 milhões de cópias impressas",
    facts: [
      "One Piece · Eiichiro Oda — em publicação desde 1997",
      "Naruto · 72 volumes — ninjas, amizade e superação",
      "Berserk · dark fantasy, arte considerada a melhor do meio",
      "Chainsaw Man e Jujutsu Kaisen — a nova geração shonen",
    ],
  },
  {
    title: "Filmes Geeks",
    category: "Cinema · Franquias",
    icon: Clapperboard,
    tone: "orange",
    highlight: "Do MCU a Star Wars: universos que marcaram gerações",
    facts: [
      "Marvel: 30+ filmes conectados desde Homem de Ferro (2008)",
      "Star Wars: 9 filmes da saga Skywalker + spin-offs",
      "O Senhor dos Anéis: 17 Oscars somando a trilogia",
      "Animes no cinema: Suzume, Your Name e Demon Slayer",
    ],
  },
  {
    title: "Séries & Games",
    category: "Cultura pop",
    icon: Tv,
    tone: "sky",
    highlight: "Adaptações de games viraram fenômeno na TV",
    facts: [
      "Arcane · League of Legends, animação premiada",
      "The Last of Us e Fallout — games que viraram séries",
      "Stranger Things: nostalgia dos anos 80 e RPG de mesa",
      "Cyberpunk Edgerunners — 10 episódios que viraram cult",
    ],
  },
  {
    title: "RPG & Card Games",
    category: "Mesa · Estratégia",
    icon: Swords,
    tone: "orange",
    highlight: "O QG tem mesa aberta pra quem quer aprender",
    facts: [
      "D&D 5ª edição: o RPG mais jogado do planeta",
      "Magic: The Gathering — 30 anos de metagame",
      "Pokémon TCG e Yu-Gi-Oh! seguem fortes nos torneios",
      "Board games modernos: Catan, Wingspan, Dixit",
    ],
  },
];

const TONES = {
  orange: {
    ring: "ring-brand-orange/50",
    glow: "hsl(var(--brand-orange) / 0.35)",
    text: "text-brand-orange",
    chip: "bg-brand-orange/15 text-brand-orange border-brand-orange/40",
    bullet: "bg-brand-orange",
  },
  sky: {
    ring: "ring-brand-sky/50",
    glow: "hsl(var(--brand-sky) / 0.3)",
    text: "text-brand-sky",
    chip: "bg-brand-sky/15 text-brand-sky border-brand-sky/40",
    bullet: "bg-brand-sky",
  },
} as const;

export const GeekContentSlide = ({ isActive }: GeekContentSlideProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % CONTENTS.length);
    }, 4500);
    return () => clearInterval(id);
  }, [isActive]);

  const item = CONTENTS[index];
  const tone = TONES[item.tone];
  const Icon = item.icon;

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
        className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(var(--brand-orange))" }}
      />
      <div
        className="absolute -bottom-48 -right-32 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
        style={{ background: "hsl(var(--brand-sky))" }}
      />

      {/* Header */}
      <div className={cn("relative z-10 text-center mb-8", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.4em] text-brand-sky/80 text-base md:text-xl uppercase mb-3">
          Universo Geek
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-wide text-brand-orange">
          Conteúdos Geeks
        </h2>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[1500px] px-8">
        <div
          key={item.title}
          className={cn(
            "rounded-3xl p-8 md:p-12 backdrop-blur-sm ring-1 bg-white/[0.05] transition-all duration-500 fade-in-up",
            tone.ring
          )}
          style={{ boxShadow: `0 0 60px ${tone.glow}` }}
        >
          <div className="flex items-center gap-6 mb-7">
            <div
              className={cn(
                "shrink-0 flex items-center justify-center rounded-2xl h-20 w-20 md:h-24 md:w-24 border",
                tone.chip
              )}
            >
              <Icon className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <div className="min-w-0">
              <p className={cn("font-display tracking-widest uppercase text-base md:text-xl", tone.text)}>
                {item.category}
              </p>
              <h3 className="font-display font-black text-4xl md:text-6xl text-brand-cream leading-tight">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            {item.facts.map((fact) => (
              <div key={fact} className="flex items-start gap-4">
                <span className={cn("mt-3 h-3 w-3 rounded-full shrink-0", tone.bullet)} />
                <p className="text-xl md:text-3xl text-brand-cream/85 leading-snug">{fact}</p>
              </div>
            ))}
          </div>

          <div className={cn("mt-8 flex items-center gap-4 rounded-2xl border px-6 py-4", tone.chip)}>
            <Star className="h-7 w-7 md:h-8 md:w-8 shrink-0" />
            <p className="text-lg md:text-2xl font-semibold">{item.highlight}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="relative z-10 mt-8 flex items-center gap-3">
        {CONTENTS.map((c, i) => (
          <span
            key={c.title}
            className={cn(
              "h-2.5 rounded-full transition-all duration-500",
              i === index ? "w-12 bg-brand-orange" : "w-2.5 bg-brand-cream/25"
            )}
          />
        ))}
      </div>
    </div>
  );
};
