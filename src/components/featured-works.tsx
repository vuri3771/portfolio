import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { works } from "@/data/works";
import { FadeIn } from "@/components/fade-in";

const featuredIds = ["cissoid-erp", "lg-cns-textbook", "epic-hub"];

export function FeaturedWorks() {
  const featured = featuredIds
    .map((id) => works.find((w) => w.id === id))
    .filter((w): w is (typeof works)[number] => Boolean(w));

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Selected Works</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">최근 작업 살펴보기</h2>
        </div>
        <Link
          href="/works"
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          전체 작업물 보기
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((work, i) => (
          <FadeIn key={work.id} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {work.company}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold leading-snug">{work.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{work.points[0]}</p>
              <div className="flex flex-wrap gap-1.5">
                {work.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
