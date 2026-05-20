import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Lightbulb, Brain } from "lucide-react";

const charadas = [
  { q: "O que é, o que é: tem dentes, mas não morde?", a: "O pente" },
  { q: "O que é, o que é: quanto mais se tira, maior fica?", a: "O buraco" },
  { q: "O que é, o que é: cai em pé e corre deitado?", a: "A chuva" },
  { q: "O que é, o que é: tem cidades sem casas, rios sem água e florestas sem árvores?", a: "O mapa" },
  { q: "O que é, o que é: anda com os pés na cabeça?", a: "O piolho" },
  { q: "O que é, o que é: passa a vida toda andando, mas nunca sai do lugar?", a: "O relógio" },
  { q: "O que é, o que é: tem coroa, mas não é rei; tem espinhos, mas não é peixe?", a: "O abacaxi" },
  { q: "O que é, o que é: quanto mais quente, mais fresco fica?", a: "O pão" },
  { q: "O que é, o que é: tem boca, mas não fala; tem leito, mas não dorme?", a: "O rio" },
  { q: "O que é, o que é: sobe e desce sem se mexer?", a: "A escada" },
  { q: "O que é, o que é: nasce grande e morre pequeno?", a: "O lápis" },
  { q: "O que é, o que é: tem chave, mas não abre porta; tem espaço, mas não tem lugar?", a: "O teclado" },
  { q: "O que é, o que é: tem asa, mas não voa; tem bico, mas não bica?", a: "O bule" },
  { q: "O que é, o que é: dá voltas e voltas e fica sempre no mesmo lugar?", a: "O ventilador" },
  { q: "O que é, o que é: tem olho, mas não enxerga?", a: "A agulha" },
  { q: "O que é, o que é: tem perna, mas não anda?", a: "A mesa" },
  { q: "O que é, o que é: tem língua, mas não fala?", a: "O sapato" },
  { q: "O que é, o que é: anda sentado e dorme em pé?", a: "O cavalo" },
  { q: "O que é, o que é: quanto mais lava, mais suja fica?", a: "A água" },
  { q: "O que é, o que é: entra na água e não se molha?", a: "A sombra" },
  { q: "O que é, o que é: come pela barriga e bebe pelas costas?", a: "O ralador" },
  { q: "O que é, o que é: cheio de furos, mas segura água?", a: "A esponja" },
  { q: "O que é, o que é: tem cabeça, tem dente, mas não tem boca?", a: "O alho" },
  { q: "O que é, o que é: pequeno como uma noz, sobe ao morro sem ter pés?", a: "O caracol" },
  { q: "O que é, o que é: quando jovem fica em pé, quando velho anda curvada?", a: "A vela" },
  { q: "O que é, o que é: tem capa, mas não é super-herói; tem folhas, mas não é árvore?", a: "O livro" },
  { q: "O que é, o que é: voa sem asa, chora sem olhos, e onde passa escurece?", a: "A nuvem" },
  { q: "O que é, o que é: anda com a barriga para cima?", a: "O piolho" },
  { q: "O que é, o que é: tem pé, mas não tem perna?", a: "A montanha" },
  { q: "O que é, o que é: tem cinco dedos e não tem unha?", a: "A luva" },
  { q: "O que é, o que é: enche uma casa, mas não enche uma mão?", a: "O botão (da luz)" },
];

interface Props {
  isActive: boolean;
}

export const CharadaSlide = ({ isActive }: Props) => {
  // Pick by day-of-year so it changes daily
  const charada = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return charadas[day % charadas.length];
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        background:
          "radial-gradient(ellipse at top left, hsl(280 80% 25% / 1) 0%, hsl(260 60% 10%) 50%, #000 100%)",
      }}
    >
      {/* Animated glow blobs */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: "hsl(50 100% 60%)" }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: "hsl(280 80% 60%)" }}
      />

      {/* Floating lightbulbs */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <Lightbulb
            key={i}
            className="absolute text-yellow-300/15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animation: `floatGlow ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-5xl w-full text-center space-y-8 md:space-y-10">
          {/* Eyebrow */}
          <div className={cn(isActive && "fade-in")}>
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-display tracking-[0.4em] uppercase"
              style={{
                background: "rgba(250, 204, 21, 0.12)",
                border: "1px solid rgba(250, 204, 21, 0.5)",
                color: "#fde047",
              }}
            >
              <Brain className="w-4 h-4" />
              Charada do Dia
            </div>
          </div>

          {/* Question */}
          <div className={cn(isActive && "fade-in-up")}>
            <p
              className="font-display font-black text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-balance"
              style={{
                background:
                  "linear-gradient(135deg, #fef3c7 0%, #fde047 40%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 60px rgba(250, 204, 21, 0.4)",
              }}
            >
              "{charada.q}"
            </p>
          </div>

          {/* Divider */}
          <div
            className={cn(
              "h-[2px] w-40 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent",
              isActive && "fade-in-delayed"
            )}
          />

          {/* Answer reveal */}
          <div className={cn(isActive && "fade-in-delayed")}>
            <p className="text-yellow-200/70 font-display tracking-[0.3em] uppercase text-sm md:text-base mb-3">
              Resposta
            </p>
            <p
              className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-white"
              style={{
                textShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
              }}
            >
              {charada.a}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatGlow {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.15); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
};
