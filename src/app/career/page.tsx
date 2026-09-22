import { careerTimeline, education } from "@/data/career";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

export const metadata = {
  title: "Career | 김부희",
};

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <FadeIn>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Career
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          커리어
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          2017년부터 지금까지, 공공기관부터 스타트업까지 다양한 환경에서 쌓아온
          경력입니다.
        </p>
      </FadeIn>

      <div className="relative mt-16">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]" />

        <div className="space-y-8">
          {careerTimeline.map((item, i) => (
            <FadeIn key={`${item.company}-${item.period}`} delay={i * 0.06}>
              <div className="relative pl-10 sm:pl-14">
                <span
                  className={
                    "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background text-xs font-bold sm:h-10 sm:w-10 " +
                    (item.ongoing
                      ? "border-accent text-accent"
                      : "border-primary text-primary")
                  }
                >
                  {careerTimeline.length - i}
                </span>

                <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                      {item.company}
                      {item.ongoing && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                          </span>
                          재직중
                        </span>
                      )}
                      {item.note && (
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {item.note}
                        </span>
                      )}
                    </h2>
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mb-4 text-sm font-semibold text-primary">
                    {item.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* <FadeIn delay={0.3} className="mt-20">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <GraduationCap className="h-6 w-6 text-primary" />
          학력
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="flex flex-col justify-between gap-1 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-semibold">{edu.school}</p>
                <p className="text-sm text-muted-foreground">{edu.major}</p>
              </div>
              <span className="text-sm text-muted-foreground">{edu.period}</span>
            </div>
          ))}
        </div>
      </FadeIn> */}
    </div>
  );
}
