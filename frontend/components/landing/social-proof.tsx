const companies = [
  { name: "Vercel", id: "vercel" },
  { name: "GitHub", id: "github" },
  { name: "Linear", id: "linear" },
  { name: "Stripe", id: "stripe" },
  { name: "Figma", id: "figma" },
];

export function SocialProof() {
  return (
    <section className="border-t border-zinc-200 py-12 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
          Used by engineers at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
          {companies.map((c) => (
            <img
              key={c.id}
              src={`https://cdn.simpleicons.org/${c.id}/gray`}
              alt={c.name}
              className="h-6 opacity-30 grayscale transition-all duration-200 hover:opacity-60 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
