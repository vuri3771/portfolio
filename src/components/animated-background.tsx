export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.15]" />
    </div>
  );
}
