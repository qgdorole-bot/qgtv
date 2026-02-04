import { Slide } from "./Slide";
import { Heart, Lightbulb, Shield, Users } from "lucide-react";

interface Value {
  icon: "heart" | "lightbulb" | "shield" | "users";
  title: string;
  description: string;
}

interface ValuesSlideProps {
  isActive: boolean;
  title?: string;
  values?: Value[];
}

const iconMap = {
  heart: Heart,
  lightbulb: Lightbulb,
  shield: Shield,
  users: Users,
};

const defaultValues: Value[] = [
  { icon: "lightbulb", title: "Inovação", description: "Buscamos sempre novas soluções" },
  { icon: "heart", title: "Paixão", description: "Amamos o que fazemos" },
  { icon: "shield", title: "Integridade", description: "Ética em todas as ações" },
  { icon: "users", title: "Colaboração", description: "Juntos somos mais fortes" },
];

export const ValuesSlide = ({ 
  isActive, 
  title = "Nossos Valores",
  values = defaultValues
}: ValuesSlideProps) => {
  return (
    <Slide variant="dark" isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-12">
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight ${isActive ? 'fade-in-up' : ''}`}>
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon];
            return (
              <div 
                key={value.title}
                className={`flex flex-col items-center space-y-4 ${isActive ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-medium">{value.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground font-light">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
};
