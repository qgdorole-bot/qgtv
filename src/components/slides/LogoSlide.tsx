import { Slide } from "./Slide";

interface LogoSlideProps {
  isActive: boolean;
  companyName?: string;
  tagline?: string;
  logoUrl?: string;
}

export const LogoSlide = ({ 
  isActive, 
  companyName = "Sua Empresa", 
  tagline = "Inovação e Excelência",
  logoUrl
}: LogoSlideProps) => {
  return (
    <Slide variant="dark" isActive={isActive}>
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={companyName} 
            className={`h-32 md:h-40 lg:h-48 object-contain ${isActive ? 'scale-in' : ''}`}
          />
        ) : (
          <div className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight ${isActive ? 'scale-in' : ''}`}>
            {companyName.charAt(0)}
          </div>
        )}
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight ${isActive ? 'fade-in-up' : ''}`}>
          {companyName}
        </h1>
        <p className={`text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light tracking-wide ${isActive ? 'fade-in-delayed' : ''}`}>
          {tagline}
        </p>
      </div>
    </Slide>
  );
};
