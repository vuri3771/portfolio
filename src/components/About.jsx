import { Block, Reveal } from './Section'
import { useLang } from '../i18n'

const PHILOSOPHY_KO = [
  {
    title: '보이는 것 너머의 구조를 먼저 본다',
    body: '화면을 짤 때 레이아웃과 정보 위계부터 그리는 습관으로 이어집니다. 예쁜 코드보다 사용자가 자연스럽게 시선을 옮길 수 있는 구조를 먼저 설계합니다.',
  },
  {
    title: '오래된 코드와 새 코드 사이에서 실용을 택한다',
    body: "JSP·jQuery로 시작해 React·Vue·TypeScript까지, 스택이 바뀌는 현장을 여러 번 거치며 배운 것은 '유행'이 아니라 '지금 이 팀과 이 기한에 맞는 선택'이 최선을 다하고 있습니다.",
  },
  {
    title: '공공기관부터 스타트업까지, 사용자는 언제나 최우선이다',
    body: "공공 서비스부터 블록체인 게임 스튜디오처럼 빠르게 변하는 서비스 화면을 개발해왔습니다. 규모와 관계없이 '이 화면을 실제로 쓰는 사람이 헤매지 않는가'를 항상 마지막 기준으로 둡니다.",
  },
  {
    title: '완성보다 유지보수 가능한 코드를 남긴다',
    body: "여러 회사를 거치며 다른 사람이 짠 코드를 인수인계 받는 입장도, 넘겨주는 입장도 되어봤습니다. 그래서 컴포넌트를 나눌 때도, 이름을 지을 때도 '다음 사람이 30초 안에 이해할 수 있는가'를 스스로에게 묻습니다.",
  },
]

const PHILOSOPHY_EN = [
  {
    title: 'See the structure beyond what is visible',
    body: 'When I build a screen, I start by sketching the layout and the hierarchy of information. Before writing pretty code, I design a structure that lets people move their eyes naturally.',
  },
  {
    title: 'Choose what is practical between old code and new',
    body: 'From JSP and jQuery to React, Vue and TypeScript, I have worked through many stack changes. What I learned is that the best choice is not the trend, but the one that fits this team and this deadline.',
  },
  {
    title: 'From public institutions to startups, users come first',
    body: 'I have built screens for public services and for fast-moving products like a blockchain game studio. Whatever the scale, my final check is always whether the people actually using the screen can find their way.',
  },
  {
    title: 'Leave maintainable code, not just finished code',
    body: "Moving between companies, I have both inherited other people's code and handed mine over. So whether I split components or name things, I ask myself whether the next person could understand it in 30 seconds.",
  },
]

const STACK = [
  ['Frontend', ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React.js', 'Vue.js', 'Styled-components', 'Storybook', 'Webflow']],
  ['Backend & DB', ['Node.js / Express', 'JSP', 'Oracle', 'MySQL']],
  [['협업 도구', 'Collaboration'], ['Git', 'SVN', 'Figma']],
  [['디자인 도구', 'Design'], ['Figma', 'Photoshop', 'Illustrator']],
]

const TEXT = {
  ko: {
    titles: ['자기소개', '코딩 철학', '기술 스택'],
    intro: [
      '안녕하세요, 프론트엔드 개발자 김부희입니다. 인테리어 디자인을 전공하며 공간과 사용자 동선을 고민했던 시간이, 지금은 화면 위의 레이아웃과 사용자 경험을 고민하는 태도로 이어지고 있습니다.',
      '2017년 공공기관 도서관 시스템 개발로 커리어를 시작해 교육, 커머스, 모빌리티, 블록체인 게임 스튜디오에 이르기까지 다양한 도메인의 서비스를 만들어왔습니다. JSP·jQuery 시절부터 React, Vue.js, TypeScript까지 프론트엔드 생태계의 변화를 현장에서 직접 겪으며 유연하게 적응해왔습니다.',
    ],
    philosophy: PHILOSOPHY_KO,
  },
  en: {
    titles: ['Who I am', 'Coding Philosophy', 'Tech Stack'],
    intro: [
      "Hi, I'm Buhee Kim, a frontend developer. I studied interior design, and the time I spent thinking about space and how people move through it now carries over into how I think about layout and user experience on screen.",
      'I started my career in 2017 building a library system for a public institution, and have since built services across education, commerce, mobility and a blockchain game studio. From the JSP and jQuery days to React, Vue.js and TypeScript, I have adapted to the changing frontend ecosystem firsthand.',
    ],
    philosophy: PHILOSOPHY_EN,
  },
}

// 자기소개 : 소개글, 코딩 철학, 기술 스택
export default function About() {
  const { lang } = useLang()
  const t = TEXT[lang]
  return (
    <section id="about" className="bg-mist text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-28 px-6 pt-16 pb-28 md:gap-36 md:px-10 md:pt-24 md:pb-36">
        <Block eyebrow="About Me" title={t.titles[0]}>
          <div className="space-y-5 text-[15px] leading-[1.8] text-ink/85 sm:space-y-6 sm:text-[17px] sm:leading-[1.9] md:text-lg">
            {t.intro.map((text, i) => (
              <Reveal as="p" key={i} delay={i * 120}>
                {text}
              </Reveal>
            ))}
          </div>
        </Block>

        <Block eyebrow="Philosophy" title={t.titles[1]}>
          <ol>
            {t.philosophy.map((item, i) => (
              <Reveal
                as="li"
                key={i}
                className="grid gap-3 border-b border-ink/10 py-8 first:pt-0 md:grid-cols-[4rem_1fr] md:gap-6"
              >
                <span className="text-base font-medium text-moss/70 tabular-nums sm:text-lg">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg leading-snug font-bold tracking-tight sm:text-xl md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-ink/75 sm:text-base sm:leading-[1.85]">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Block>

        <Block eyebrow="Skills" title={t.titles[2]}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {STACK.map(([group, items], i) => {
              // 이름이 [한글, 영문] 쌍이면 언어에 맞춰 고름
              const name = Array.isArray(group) ? group[lang === 'en' ? 1 : 0] : group
              return (
                <Reveal key={i} delay={i * 80}>
                  <h3 className="border-b border-ink/15 pb-3 text-sm font-semibold">{name}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-ink/70 sm:text-[15px]">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </Block>
      </div>
    </section>
  )
}
