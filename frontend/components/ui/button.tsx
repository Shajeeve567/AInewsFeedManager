"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] shadow-sm",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-[0.98] dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
  ghost:
    "text-zinc-600 hover:bg-zinc-100 active:scale-[0.98] dark:text-zinc-400 dark:hover:bg-zinc-800",
  outline:
    "border border-zinc-300 text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
