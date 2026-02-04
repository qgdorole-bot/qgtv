import { forwardRef } from "react";
import logoWatermark from "@/assets/logo-qg-watermark.png";

export const CornerLogo = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="absolute top-6 left-6 z-30">
      <img 
        src={logoWatermark} 
        alt="QG do Rolê" 
        className="w-20 h-auto md:w-24 lg:w-28 object-contain opacity-20"
      />
    </div>
  );
});

CornerLogo.displayName = "CornerLogo";
