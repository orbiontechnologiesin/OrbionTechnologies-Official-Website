import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "petrol" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer";

  const variantStyles = {
    primary:
      "bg-copper text-pure-white hover:bg-copper-hover focus:ring-copper shadow-sm",
    petrol:
      "bg-petrol text-pure-white hover:bg-petrol-light focus:ring-petrol shadow-sm",
    secondary:
      "bg-pure-white text-graphite border border-graphite/15 hover:bg-limestone-light hover:border-graphite/30 focus:ring-petrol",
    outline:
      "bg-transparent text-graphite border border-graphite/20 hover:border-graphite hover:bg-pure-white/60 focus:ring-petrol",
    ghost:
      "bg-transparent text-graphite hover:text-petrol hover:bg-graphite/5 focus:ring-petrol",
  }[variant];

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 tracking-wide",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  }[size];

  const combinedClasses = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

