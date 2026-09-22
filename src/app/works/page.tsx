import { FadeIn } from "@/components/fade-in";
import { WorksGrid } from "@/components/works-grid";

export const metadata = {
  title: "Works | 김부희",
};

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <FadeIn>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Works
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          프로젝트
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          공공기관 도서관 시스템부터 블록체인 게임 스튜디오, 핀테크 앱까지 —
          <br />
          현재까지 참여한 프로젝트 입니다.
        </p>
      </FadeIn>

      <div className="mt-14">
        <WorksGrid />
      </div>
    </div>
  );
}
