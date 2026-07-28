import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <hr
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full border-t-0 bg-zinc-200 dark:bg-zinc-800"
          : "h-full w-px border-l-0 bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}
