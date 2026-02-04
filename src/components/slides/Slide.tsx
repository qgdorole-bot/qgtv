import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideProps {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  isActive?: boolean;
}

export const Slide = ({ children, variant = "light", className, isActive = true }: SlideProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center p-8 md:p-16 lg:p-24",
        "transition-opacity duration-1000 ease-in-out",
        variant === "light" ? "slide-gradient-light text-foreground" : "slide-gradient-dark text-primary-foreground",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0",
        className
      )}
    >
      <div className={cn("w-full max-w-6xl mx-auto", isActive && "fade-in")}>
        {children}
      </div>
    </div>
  );
};
