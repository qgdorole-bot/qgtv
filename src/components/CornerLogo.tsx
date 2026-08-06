import { forwardRef } from "react";
import simboloLaranja from "@/assets/brand/simbolo-laranja.png";
import simboloAzul from "@/assets/brand/simbolo-azul.png";

const MARKS = [simboloLaranja, simboloAzul];

interface CornerLogoProps {
  variant?: number;
}

export const CornerLogo = forwardRef<HTMLDivElement, CornerLogoProps>(({ variant = 0 }, ref) => {
  const src = MARKS[Math.abs(variant) % MARKS.length];

  return (
    <div ref={ref} className="absolute top-6 left-6 z-30">
      <img
        src={src}
        alt="QG do Rolê"
        className="w-16 h-auto md:w-20 lg:w-24 object-contain opacity-30 transition-opacity duration-700"
      />
    </div>
  );
});

CornerLogo.displayName = "CornerLogo";
