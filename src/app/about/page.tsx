import { philosophy, skillGroups } from "@/data/skills";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About | 김부희",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <FadeIn>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          About Me
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          자기소개
        </h1>
      </FadeIn>

      <FadeIn
        delay={0.1}
        className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        <p>
          안녕하세요, 프론트엔드 개발자 김부희입니다. 인테리어 디자인을 전공하며
          공간과 사용자 동선을 고민했던 시간이, 지금은 화면 위의 레이아웃과
          사용자 경험을 고민하는 태도로 이어지고 있습니다.
        </p>
        <p>
          2017년 공공기관 도서관 시스템 개발로 커리어를 시작해 교육, 커머스,
          모빌리티, 블록체인 게임 스튜디오에 이르기까지 다양한 도메인의 서비스를
          만들어왔습니다. JSP·jQuery 시절부터 React, Vue.js, TypeScript까지
          프론트엔드 생태계의 변화를 현장에서 직접 겪으며 유연하게
          적응해왔습니다.
        </p>
        {/* <p>
          사용자에게 명확한 인터페이스를 전달하는 것과, 팀원 누구나 이해할 수
          있는 코드를 남기는 것을 가장 중요한 가치로 삼고 일하고 있습니다.
        </p> */}
      </FadeIn>

      <FadeIn delay={0.15} className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
          코딩 철학
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {philosophy.map((item, i) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-base font-bold leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
          기술 스택
        </h2>
        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
