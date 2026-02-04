import { Slide } from "./Slide";

interface Character {
  letter: string;
  color: string;
  bgColor: string;
}

interface CharactersSlideProps {
  isActive: boolean;
  title?: string;
}

const characters: Character[] = [
  { letter: "J", color: "text-cyan-400", bgColor: "bg-cyan-400/20 border-cyan-400/50" },
  { letter: "R", color: "text-pink-500", bgColor: "bg-pink-500/20 border-pink-500/50" },
  { letter: "C", color: "text-pink-400", bgColor: "bg-pink-400/20 border-pink-400/50" },
  { letter: "H", color: "text-pink-500", bgColor: "bg-pink-500/20 border-pink-500/50" },
  { letter: "U", color: "text-pink-400", bgColor: "bg-pink-400/20 border-pink-400/50" },
  { letter: "V", color: "text-yellow-400", bgColor: "bg-yellow-400/20 border-yellow-400/50" },
  { letter: "V", color: "text-purple-500", bgColor: "bg-purple-500/20 border-purple-500/50" },
  { letter: "B", color: "text-pink-500", bgColor: "bg-pink-500/20 border-pink-500/50" },
];

export const CharactersSlide = ({ 
  isActive, 
  title = "Os Personagens"
}: CharactersSlideProps) => {
  return (
    <Slide isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-12">
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-wide text-accent text-glow-yellow ${isActive ? 'fade-in-up' : ''}`}>
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
          {characters.map((char, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl border-2 ${char.bgColor} backdrop-blur-sm ${isActive ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={`text-2xl md:text-3xl lg:text-4xl font-display font-bold ${char.color}`}>
                {char.letter}
              </span>
            </div>
          ))}
        </div>
        <p className={`text-lg md:text-xl text-muted-foreground font-light ${isActive ? 'fade-in-delayed' : ''}`}>
          Cada robô traz uma perspectiva única para a aventura
        </p>
      </div>
    </Slide>
  );
};
