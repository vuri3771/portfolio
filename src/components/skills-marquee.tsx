import { skillGroups } from "@/data/skills";

export function SkillsMarquee() {
  const all = skillGroups.flatMap((g) => g.items);
  const loop = [...all, ...all];

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-secondary/30 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((skill, i) => (
          <span key={`${skill}-${i}`} className="text-lg font-semibold text-muted-foreground/70 whitespace-nowrap">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
