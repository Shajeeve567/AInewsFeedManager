import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "block w-full rounded-[var(--radius-input)] border px-3 py-2 text-sm placeholder:text-zinc-400",
          "border-zinc-300 bg-white text-zinc-900",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
