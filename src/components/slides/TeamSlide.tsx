import { Slide } from "./Slide";

interface TeamMember {
  name: string;
  role: string;
  imageUrl?: string;
}

interface TeamSlideProps {
  isActive: boolean;
  title?: string;
  teamMembers?: TeamMember[];
}

const defaultTeam: TeamMember[] = [
  { name: "Ana Silva", role: "CEO & Fundadora" },
  { name: "Carlos Santos", role: "Diretor de Tecnologia" },
  { name: "Maria Oliveira", role: "Diretora Comercial" },
  { name: "Pedro Costa", role: "Diretor de Operações" },
];

export const TeamSlide = ({ 
  isActive, 
  title = "Nossa Equipe",
  teamMembers = defaultTeam
}: TeamSlideProps) => {
  return (
    <Slide variant="light" isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-12">
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight ${isActive ? 'fade-in-up' : ''}`}>
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className={`flex flex-col items-center space-y-4 ${isActive ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {member.imageUrl ? (
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-3xl md:text-4xl font-semibold text-primary">
                  {member.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg md:text-xl font-medium">{member.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground font-light">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
