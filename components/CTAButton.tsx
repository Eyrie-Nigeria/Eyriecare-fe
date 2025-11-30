"use client";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
};

export default function CTAButton({ children, onClick, variant = "primary" }: Props) {
  const base = "rounded-full h-12 px-5 inline-flex items-center justify-center font-medium transition";
  if (variant === "primary") {
    return (
      <button onClick={onClick} className={`${base} bg-eyrie-blue text-white hover:bg-eyrie-blue/90`}>
        {children}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${base} border border-gray-200 text-deep-navy bg-white hover:bg-gray-50`}>
      {children}
    </button>
  );
}
