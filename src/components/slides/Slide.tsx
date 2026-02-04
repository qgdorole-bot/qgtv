import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  showGrid?: boolean;
}

export const Slide = ({ children, className, isActive = true, showGrid = true }: SlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center p-8 md:p-16 lg:p-24",
        "transition-opacity duration-1000 ease-in-out",
        "bg-dark-gradient text-white",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0",
        className
      )}
    >
      {showGrid && <div className="absolute inset-0 grid-pattern opacity-30" />}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
      <div className={cn("relative w-full max-w-6xl mx-auto z-10", isActive && "fade-in")}>
        {children}
      </div>
    </div>
  );
};
