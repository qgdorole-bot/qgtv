import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BookOpen, Clapperboard, Tv, Swords, Flame, Star } from "lucide-react";
import imgDragonBall from "@/assets/geek/dragonball.jpg";
import imgManga from "@/assets/geek/manga.jpg";
import imgFilmes from "@/assets/geek/filmes.jpg";
import imgGames from "@/assets/geek/games.jpg";
import imgRpg from "@/assets/geek/rpg.jpg";

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
  image: string;
};

const CONTENTS: GeekContent[] = [
  {
    title: "Dragon Ball",
    image: imgDragonBall,
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
    image: imgManga,
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
    image: imgFilmes,
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
    image: imgGames,
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
    image: imgRpg,
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
    ring: "ring-brand-orange/40",
    glow: "hsl(var(--brand-orange) / 0.28)",
    text: "text-brand-orange",
    chip: "bg-brand-orange/10 text-brand-orange border-brand-orange/35",
    bullet: "bg-brand-orange",
    line: "from-brand-orange/70 via-brand-orange/10 to-transparent",
  },
  sky: {
    ring: "ring-brand-sky/40",
    glow: "hsl(var(--brand-sky) / 0.25)",
    text: "text-brand-sky",
    chip: "bg-brand-sky/10 text-brand-sky border-brand-sky/35",
    bullet: "bg-brand-sky",
    line: "from-brand-sky/70 via-brand-sky/10 to-transparent",
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
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute -top-48 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-[0.18] transition-all duration-1000"
        style={{ background: `hsl(var(--brand-${item.tone === "orange" ? "orange" : "sky"}))` }}
      />
      <div
        className="absolute -bottom-56 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-[0.14]"
        style={{ background: "hsl(var(--brand-navy))" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

      {/* Header */}
      <div className={cn("relative z-10 text-center mb-7", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.5em] text-brand-sky/70 text-sm md:text-lg uppercase mb-2">
          Universo Geek
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-wide text-brand-orange">
          Conteúdos Geeks
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[1480px] px-8">
        <div
          key={item.title}
          className={cn(
            "relative overflow-hidden rounded-[2rem] ring-1 backdrop-blur-md transition-all duration-500 fade-in-up",
            "bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent",
            tone.ring
          )}
          style={{ boxShadow: `0 24px 80px -20px ${tone.glow}` }}
        >
          {/* Accent bar */}
          <div className={cn("absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b", tone.line)} />
          {/* Ghost index number */}
          <span className="pointer-events-none absolute -right-4 -top-10 font-display font-black text-[12rem] leading-none text-brand-cream/[0.04] select-none">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="p-8 md:p-11 pl-10 md:pl-14">
            <div className="flex items-center gap-6 mb-8">
              <div
                className={cn(
                  "shrink-0 flex items-center justify-center rounded-2xl h-20 w-20 md:h-24 md:w-24 border",
                  tone.chip
                )}
              >
                <Icon className="h-10 w-10 md:h-12 md:w-12" />
              </div>
              <div className="min-w-0">
                <p className={cn("font-display tracking-[0.3em] uppercase text-sm md:text-lg mb-1", tone.text)}>
                  {item.category}
                </p>
                <h3 className="font-display font-black text-4xl md:text-6xl text-brand-cream leading-none">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {item.facts.map((fact, i) => (
                <div
                  key={fact}
                  className="flex items-start gap-4 rounded-2xl border border-brand-cream/10 bg-brand-cream/[0.04] px-5 py-4 fade-in-up"
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className={cn("mt-2.5 h-2.5 w-2.5 rounded-full shrink-0", tone.bullet)} />
                  <p className="text-lg md:text-2xl text-brand-cream/85 leading-snug">{fact}</p>
                </div>
              ))}
            </div>

            <div className={cn("mt-7 flex items-center gap-4 rounded-2xl border px-6 py-4", tone.chip)}>
              <Star className="h-7 w-7 md:h-8 md:w-8 shrink-0" />
              <p className="text-base md:text-2xl font-semibold">{item.highlight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="relative z-10 mt-7 flex items-center gap-3">
        {CONTENTS.map((c, i) => (
          <span
            key={c.title}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              i === index ? "w-14 bg-brand-orange shadow-[0_0_16px_hsl(var(--brand-orange)/0.7)]" : "w-2 bg-brand-cream/20"
            )}
          />
        ))}
      </div>
    </div>
  );
};
