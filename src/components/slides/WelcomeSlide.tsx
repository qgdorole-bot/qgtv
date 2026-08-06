import { cn } from "@/lib/utils";
import { Slide } from "./Slide";
import logoHorizontal from "@/assets/brand/logo-horizontal.png";

interface WelcomeSlideProps {
  isActive: boolean;
}

export const WelcomeSlide = ({ isActive }: WelcomeSlideProps) => {
  return (
    <Slide isActive={isActive} showGrid showScanlines>
      <div className="flex flex-col items-center justify-center text-center gap-8">
        <img
          src={logoHorizontal}
          alt="QG do Rolê"
          className={cn(
            "w-[22rem] md:w-[30rem] lg:w-[36rem] object-contain drop-shadow-[0_0_45px_hsl(var(--brand-orange)/0.45)]",
            isActive && "scale-in"
          )}
        />

        <div
          className={cn(
            "text-brand-sky font-display text-xl md:text-2xl tracking-[0.4em] uppercase",
            isActive && "fade-in"
          )}
        >
          Bem-vindo
        </div>

        <h1
          className={cn(
            "font-display font-black text-5xl md:text-7xl lg:text-8xl leading-tight text-balance",
            "bg-gradient-to-r from-brand-orange-light via-brand-orange to-brand-sky bg-clip-text text-transparent",
            "text-glow-purple",
            isActive && "fade-in-up"
          )}
        >
          À SALA DO QG
        </h1>


        <div
          className={cn(
            "h-[2px] w-40 bg-gradient-to-r from-transparent via-primary to-transparent",
            isActive && "fade-in-delayed"
          )}
        />

        <p
          className={cn(
            "text-white/80 font-display tracking-widest text-base md:text-xl uppercase",
            isActive && "fade-in-delayed"
          )}
        >
          Aqui é o seu espaço · Aqui é o seu rolê
        </p>
      </div>
    </Slide>
  );
};
