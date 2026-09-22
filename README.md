# 김부희 포트폴리오

Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui 스타일 컴포넌트 + Framer Motion + next-themes로 만든 프론트엔드 개발자 포트폴리오입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

배포는 Vercel에 그대로 올리면 됩니다 (`vercel` CLI 또는 GitHub 연동).

## 페이지 구성

- `/` — 메인 화면. 애니메이션 배경(blob), 타이틀 스태거 애니메이션, 롤 텍스트 순환, 스킬 마퀴, 대표 작업물 3개를 보여줍니다.
- `/about` — 자기소개 + 코딩 철학 4가지 + 기술 스택
- `/career` — 웨일소프트 → 손스소프트 → 린시 한국지점 → 시소이드로 이어지는 경력 타임라인 + 학력
- `/works` — 카테고리 필터가 가능한 작업물 10건 그리드 (이력서/스킬인벤토리 기준)

## 다크모드

`next-themes`로 구현되어 있으며 기본값은 다크모드입니다. 우측 상단 토글 버튼으로 전환할 수 있습니다.

## 콘텐츠 수정하기

실제 데이터는 아래 파일에서 관리합니다. 텍스트/프로젝트만 수정하면 화면에 바로 반영됩니다.

- `src/data/career.ts` — 경력 타임라인, 학력
- `src/data/works.ts` — 작업물 목록 (제목, 클라이언트, 기간, 스택, 설명, 카테고리)
- `src/data/skills.ts` — 기술 스택 그룹, 코딩 철학 4문단

## shadcn/ui 컴포넌트 추가하기

`src/components/ui`에 button/card/badge를 shadcn 컨벤션에 맞춰 직접 작성해두었습니다. 나중에 다른 컴포넌트가 필요하면 로컬 환경에서 아래처럼 shadcn CLI를 사용할 수 있습니다.

```bash
npx shadcn@latest add dialog
```

## 참고 사항

이 프로젝트는 이력서(`김부희_이력서.pdf`)와 스킬 인벤토리(`김부희_스킬인벤토리.pdf`)에 있는 실제 경력/프로젝트 정보를 기반으로 작성되었습니다. 회사명, 기간, 프로젝트명은 실제 이력 그대로이며, 프로젝트 설명 문구는 자연스러운 소개 문장으로 다듬었습니다. 실제 화면 캡처나 링크가 있다면 `src/data/works.ts`의 각 항목에 `image`나 `link` 필드를 추가해 카드에 노출시킬 수 있습니다.
