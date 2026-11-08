import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
  }[size];

  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

