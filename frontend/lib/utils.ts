export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function timeAgo(date: string | Date | null | undefined): string {
  if (!date) return "";
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function readingTime(text: string | null | undefined): string {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function truncate(text: string | null | undefined, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}
