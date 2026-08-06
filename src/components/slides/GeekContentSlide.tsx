import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BookOpen, Clapperboard, Tv, Swords, Flame, Sparkles } from "lucide-react";
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
  image: string;
  curiosities: string[];
};

// Índice do dia (muda a cada 24h) — usado para variar a curiosidade exibida
const getDayIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};

const CONTENTS: GeekContent[] = [
  {
    title: "Dragon Ball",
    category: "Anime · Mangá",
    icon: Flame,
    tone: "orange",
    image: imgDragonBall,
    curiosities: [
      "Criado por Akira Toriyama em 1984, já vendeu mais de 260 milhões de mangás no mundo.",
      "Goku foi inspirado no Rei Macaco da lenda chinesa 'Jornada ao Oeste'.",
      "O grito do Kamehameha foi batizado por Toriyama a partir de um rei havaiano.",
      "O Super Saiyajin ficou loiro só porque era mais fácil de desenhar sem preencher o cabelo.",
      "Dragon Ball Z teve 291 episódios e é exibido em mais de 80 países.",
    ],
  },
  {
    title: "Clássicos do Mangá",
    category: "Leitura obrigatória",
    icon: BookOpen,
    tone: "sky",
    image: imgManga,
    curiosities: [
      "One Piece passou de 500 milhões de cópias impressas — o mangá mais vendido da história.",
      "Naruto foi recusado várias vezes antes de virar um dos maiores sucessos da Shonen Jump.",
      "Berserk é desenhado com um nível de detalhe que levava semanas por página.",
      "Astro Boy, de Osamu Tezuka, definiu o estilo de olhos grandes do mangá moderno.",
      "Mangás são lidos da direita para a esquerda — e isso é mantido nas edições brasileiras.",
    ],
  },
  {
    title: "Filmes Geeks",
    category: "Cinema · Franquias",
    icon: Clapperboard,
    tone: "orange",
    image: imgFilmes,
    curiosities: [
      "A trilogia O Senhor dos Anéis levou 17 Oscars, recorde para uma saga de fantasia.",
      "O som do sabre de luz veio de um projetor antigo somado a uma TV com interferência.",
      "Matrix popularizou o 'bullet time' usando mais de 100 câmeras em círculo.",
      "De Volta para o Futuro quase teve o DeLorean substituído por uma geladeira.",
      "Jurassic Park usou só 14 minutos de dinossauros em tela — e mudou os efeitos pra sempre.",
    ],
  },
  {
    title: "Séries & Games",
    category: "Cultura pop",
    icon: Tv,
    tone: "sky",
    image: imgGames,
    curiosities: [
      "Arcane, baseada em League of Legends, foi a primeira série de streaming a ganhar o Emmy de animação.",
      "Minecraft é o jogo mais vendido de todos os tempos, com mais de 300 milhões de cópias.",
      "The Last of Us virou uma das adaptações de game mais bem avaliadas da TV.",
      "Tetris foi criado em 1984 por um programador soviético nas horas vagas.",
      "Stranger Things reacendeu a febre de D&D entre adolescentes no mundo todo.",
    ],
  },
  {
    title: "RPG & Card Games",
    category: "Mesa · Estratégia",
    icon: Swords,
    tone: "orange",
    image: imgRpg,
    curiosities: [
      "D&D é o RPG mais jogado do planeta — e no QG tem mesa aberta pra quem quer aprender.",
      "Magic: The Gathering foi o primeiro card game colecionável moderno, lançado em 1993.",
      "O dado de 20 lados virou símbolo do RPG por equilibrar sorte e estratégia.",
      "Existem cartas de Pokémon avaliadas em mais de 5 milhões de dólares.",
      "Uma campanha de RPG pode durar anos — a mais longa registrada passa de 40 anos.",
    ],
  },
];

const TONES = {
  orange: {
    ring: "ring-brand-orange/40",
    glow: "hsl(var(--brand-orange) / 0.28)",
    text: "text-brand-orange",
    chip: "bg-brand-orange/10 text-brand-orange border-brand-orange/35",
    line: "from-brand-orange/70 via-brand-orange/10 to-transparent",
  },
  sky: {
    ring: "ring-brand-sky/40",
    glow: "hsl(var(--brand-sky) / 0.25)",
    text: "text-brand-sky",
    chip: "bg-brand-sky/10 text-brand-sky border-brand-sky/35",
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
    }, 9000);
    return () => clearInterval(id);
  }, [isActive]);

  const item = CONTENTS[index];
  const tone = TONES[item.tone];
  const Icon = item.icon;
  const day = getDayIndex();
  const curiosity = item.curiosities[(day + index) % item.curiosities.length];

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
      <div className={cn("relative z-10 text-center mb-8", isActive ? "fade-in-up" : "opacity-0")}>
        <p className="font-display tracking-[0.5em] text-brand-sky/70 text-sm md:text-lg uppercase mb-2">
          Universo Geek
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-wide text-brand-orange">
          Conteúdos Geeks
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[1400px] px-8">
        <div
          key={item.title}
          className={cn(
            "relative overflow-hidden rounded-[2rem] ring-1 backdrop-blur-md transition-all duration-500 fade-in-up",
            "bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent",
            tone.ring
          )}
          style={{ boxShadow: `0 24px 80px -20px ${tone.glow}` }}
        >
          <div className={cn("absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b", tone.line)} />

          <div className="grid lg:grid-cols-[480px_1fr] gap-10 p-8 md:p-12 pl-10 md:pl-16">
            {/* Illustration */}
            <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-brand-cream/10 min-h-[340px] hidden lg:block">
              <img
                src={item.image}
                alt={`Ilustração de ${item.title}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/10 to-transparent" />
              <div
                className={cn(
                  "absolute bottom-5 left-5 rounded-xl border px-4 py-2 font-display tracking-[0.2em] uppercase text-sm backdrop-blur-md",
                  tone.chip
                )}
              >
                {item.category}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-8">
                <div
                  className={cn(
                    "shrink-0 flex items-center justify-center rounded-2xl h-20 w-20 md:h-24 md:w-24 border",
                    tone.chip
                  )}
                >
                  <Icon className="h-10 w-10 md:h-12 md:w-12" />
                </div>
                <h3 className="font-display font-black text-4xl md:text-6xl text-brand-cream leading-none">
                  {item.title}
                </h3>
              </div>

              <div className={cn("flex items-start gap-5 rounded-2xl border px-7 py-7", tone.chip)}>
                <Sparkles className="h-8 w-8 md:h-10 md:w-10 shrink-0 mt-1" />
                <p className="text-2xl md:text-4xl font-semibold leading-snug text-brand-cream">
                  {curiosity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="relative z-10 mt-8 flex items-center gap-3">
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
