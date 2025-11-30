import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function CTAButton({
  variant = "primary",
  children,
  onClick,
  className,
}: CTAButtonProps) {
  const baseStyles = "rounded-full px-6 py-3 font-medium transition-all duration-300";
  
  if (variant === "primary") {
    return (
      <Button
        onClick={onClick}
        className={`${baseStyles} bg-eyrie-blue hover:bg-eyrie-blue/90 text-white shadow-lg hover:shadow-xl hover:scale-105 ${className}`}
      >
        {children}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    );
  }

  if (variant === "secondary") {
    return (
      <Button
        onClick={onClick}
        variant="outline"
        className={`${baseStyles} border-2 border-eyrie-blue text-eyrie-blue hover:bg-eyrie-blue hover:text-white ${className}`}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`${baseStyles} ${className}`}
    >
      {children}
    </Button>
  );
}


