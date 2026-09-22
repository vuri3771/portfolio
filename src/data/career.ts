export type CareerItem = {
  company: string;
  tags: string[];
  summary: string;
  period: string;
  ongoing?: boolean;
  note?: string;
};

// 본인 포트폴리오 사이트(experience 페이지) 원본 데이터 그대로 반영
export const careerTimeline: CareerItem[] = [
  {
    company: "시소이드",
    tags: ["디자인", "퍼블리싱", "프론트엔드"],
    summary: "신규 웹 개발 및 유지보수",
    period: "2024. 10. 14 ~ 2026. 06. 30",
    // ongoing: true,
  },
  {
    company: "LG CNS",
    tags: ["프론트엔드"],
    summary: "초중고 디지털 교과서 제작",
    period: "2024. 07. 21 ~ 2024. 08. 31",
    note: "단기",
  },
  {
    company: "에픽리그",
    tags: ["디자인", "퍼블리싱", "프론트엔드"],
    summary: "신규 앱 개발 및 유지보수",
    period: "2024. 04. 24 ~ 2024. 07. 24",
    note: "단기",
  },
  {
    company: "알루랩",
    tags: ["디자인", "퍼블리싱", "프론트엔드"],
    summary: "신규 웹 사이트 개발",
    period: "2024. 01. 31 ~ 2024. 02. 14",
  },
  {
    company: "한국장학재단",
    tags: ["디자인", "퍼블리싱", "프론트엔드"],
    summary: "신규 앱 개발",
    period: "2023. 10. 14 ~ 2024. 05. 01",
    note: "단기",
  },
  {
    company: "현대모터스",
    tags: ["프론트엔드"],
    summary: "신규 앱 개발 및 유지보수",
    period: "2023. 11. 04 ~ 2023. 11. 20",
    note: "단기",
  },
  {
    company: "PayIn",
    tags: ["디자인", "퍼블리싱", "프론트엔드"],
    summary: "신규 앱 개발 및 유지보수",
    period: "2023. 10. 09 ~ 2023. 11. 09",
    note: "단기",
  },
  {
    company: "린시(한국지점)",
    tags: ["디자인", "퍼블리싱", "프론트엔드"],
    summary: "신규 앱 개발 및 유지보수",
    period: "2022. 11. 01 ~ 2023. 12. 18",
  },
  {
    company: "손스소프트",
    tags: ["디자인", "퍼블리싱", "백엔드", "프론트엔드"],
    summary: "교육 사이트, CMS, LMS",
    period: "2020. 12. 01 ~ 2022. 10. 01",
  },
  {
    company: "웨일소프트",
    tags: ["디자인", "퍼블리싱", "백엔드", "프론트엔드"],
    summary: "공공기관 사이트 개설 (대규모 웹 사이트)",
    period: "2017. 06. 01 ~ 2020. 12. 01",
  },
];

export const education = [
  {
    period: "2009.03 — 2011.02",
    school: "영진전문대학교",
    major: "실내건축인테리어학과",
  },
  {
    period: "2006.03 — 2009.02",
    school: "신명고등학교",
    major: "졸업",
  },
];
