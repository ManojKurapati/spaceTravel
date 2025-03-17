import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassmorphismProps {
  children: ReactNode;
  className?: string;
  neonBorder?: boolean;
}

export const Glassmorphism = ({
  children,
  className,
  neonBorder = false,
}: GlassmorphismProps) => {
  return (
    <div
      className={cn(
        "glassmorphism",
        neonBorder && "neo-border",
        className
      )}
    >
      {children}
    </div>
  );
};

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

export const HolographicCard = ({
  children,
  className,
}: HolographicCardProps) => {
  return (
    <div
      className={cn(
        "holographic-card glassmorphism",
        className
      )}
    >
      {children}
    </div>
  );
};
