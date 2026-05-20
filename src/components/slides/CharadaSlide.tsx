import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Lightbulb, Brain } from "lucide-react";

const charadas = [
  { q: "O que é, o que é: não custa nada, mas vale muito e abre portas em qualquer lugar?", a: "Um sorriso sincero" },
  { q: "O que é, o que é: tem duas e serve mais para escutar do que para falar?", a: "As orelhas — escute o dobro do que fala" },
  { q: "Dica social: qual é a forma mais simples de fazer alguém se sentir importante?", a: "Lembrar e usar o nome da pessoa" },
  { q: "O que é, o que é: quanto mais você dá, mais recebe de volta?", a: "Atenção genuína" },
  { q: "Dica social: o que dizer quando você não souber o que dizer numa conversa?", a: "Faça uma pergunta sobre a outra pessoa" },
  { q: "O que é, o que é: um gesto pequeno que pode mudar o dia de alguém?", a: "Um elogio sincero" },
  { q: "Dica social: qual o segredo para uma boa conversa?", a: "Ouvir com curiosidade, não esperar sua vez de falar" },
  { q: "O que é, o que é: fala sem usar palavras e revela mais do que a boca?", a: "A linguagem corporal" },
  { q: "Dica social: como demonstrar interesse de verdade em alguém?", a: "Faça contato visual e repita o que a pessoa disse com suas palavras" },
  { q: "O que é, o que é: três palavrinhas mágicas que resolvem muitos conflitos?", a: "\"Me desculpe\", \"obrigado\" e \"por favor\"" },
  { q: "Dica social: o que fazer antes de responder algo difícil?", a: "Respirar fundo e contar até 5" },
  { q: "O que é, o que é: invisível, mas se sente; silencioso, mas grita?", a: "A empatia" },
  { q: "Dica social: como começar uma conversa com alguém novo?", a: "Comente algo do ambiente em que vocês estão" },
  { q: "O que é, o que é: você usa todo dia, mas esquece de oferecer aos outros?", a: "Paciência" },
  { q: "Dica social: qual é o melhor jeito de dar uma opinião difícil?", a: "Comece falando de você (\"eu sinto…\") em vez de acusar (\"você sempre…\")" },
  { q: "O que é, o que é: cresce quando dividido e diminui quando guardado?", a: "O afeto" },
  { q: "Dica social: como sair de uma conversa sem ser grosseiro?", a: "Agradeça, diga que precisa ir e marque um próximo encontro" },
  { q: "O que é, o que é: dois ouvidos e uma boca — qual a lição?", a: "Escutar duas vezes mais do que falar" },
  { q: "Dica social: qual o segredo para manter amizades?", a: "Pequenos contatos frequentes valem mais que grandes encontros raros" },
  { q: "O que é, o que é: faz a diferença num \"oi\" e num \"tchau\"?", a: "Olhar nos olhos e sorrir" },
  { q: "Dica social: o que fazer quando alguém compartilhar um problema com você?", a: "Primeiro acolha, depois pergunte se quer conselho ou só ser ouvido" },
  { q: "O que é, o que é: silencioso, mas é a base de toda boa relação?", a: "O respeito" },
  { q: "Dica social: como se sentir mais confortável em um grupo novo?", a: "Foque em conhecer uma pessoa por vez, não o grupo todo" },
  { q: "O que é, o que é: a melhor resposta para um elogio recebido?", a: "Um simples \"obrigado\" — sem se diminuir" },
  { q: "Dica social: qual hábito transforma qualquer conversa em algo memorável?", a: "Demonstrar curiosidade real pela história do outro" },
  { q: "O que é, o que é: pode ser dito sem palavras e ainda assim ser entendido?", a: "Um abraço" },
  { q: "Dica social: o que fazer quando errar com alguém?", a: "Reconhecer, pedir desculpa de verdade e mudar a atitude" },
  { q: "O que é, o que é: quando você presta de verdade, vira presente?", a: "Atenção" },
  { q: "Dica social: como lidar com silêncios numa conversa?", a: "Relaxe — silêncios curtos são naturais e mostram conforto" },
  { q: "O que é, o que é: o melhor jeito de ser interessante?", a: "Ser interessado pelos outros" },
  { q: "Dica social: qual o melhor presente que você pode dar a alguém?", a: "Seu tempo e sua presença sem celular na mão" },
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
