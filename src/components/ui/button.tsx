import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex flex-row items-center justify-center font-sans font-medium rounded-xs transition-all duration-150 ease-out-expo disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent whitespace-nowrap shrink-0';

    const variants = {
      primary:
        'bg-text-pure text-void hover:bg-neutral-200 active:scale-[0.98] shadow-subtle',
      accent:
        'bg-brand-accent text-white hover:bg-brand-accent-hover active:scale-[0.98] shadow-accent-glow',
      secondary:
        'bg-surface-card border border-border-hairline text-text-primary hover:border-border-strong hover:bg-surface-elevated hover:text-white active:scale-[0.98]',
      outline:
        'bg-transparent border border-border-hairline text-text-secondary hover:border-border-strong hover:text-white active:scale-[0.98]',
      ghost:
        'bg-transparent text-text-secondary hover:text-white hover:bg-surface-card active:scale-[0.98]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-2 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
