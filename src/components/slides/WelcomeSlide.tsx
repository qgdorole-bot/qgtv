import { cn } from "@/lib/utils";
import logoHorizontal from "@/assets/brand/logo-horizontal.png";
import welcome from "@/assets/christmas/welcome.jpg";

export const WelcomeSlide = ({ isActive }: { isActive: boolean }) => (
  <section className={cn("absolute inset-0 overflow-hidden bg-brand-navy text-foreground transition-opacity duration-1000", isActive ? "opacity-100 z-10" : "opacity-0 z-0")}>
    <img src={welcome} alt="Árvore de Natal na sala do QG" width={1536} height={1024} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <div className="relative h-full flex flex-col justify-center items-start gap-6 px-8 md:px-16 lg:px-24 w-full md:w-2/3">
      <img src={logoHorizontal} alt="QG do Rolê" className="w-64 md:w-96 max-w-full object-contain" />
      <p className="font-display text-brand-sky text-xl md:text-3xl">Bem-vindo à sala do QG</p>
      <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-brand-orange leading-tight">Natal no QG</h1>
      <p className="font-display text-brand-cream text-lg md:text-2xl max-w-lg">Que venham os encontros, as amizades e os bons rolês!</p>
    </div>
  </section>
);