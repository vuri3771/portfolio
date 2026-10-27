import { Block, Reveal } from './Section'
import { useLang } from '../i18n'

const STACK = [
  ['Frontend', ['HTML', 'CSS', 'SCSS', 'JavaScript', 'TypeScript', 'React.js', 'Vue.js', 'Styled-components', 'Storybook', 'Webflow']],
  ['Backend & DB', ['Node.js / Express', 'JSP', 'Oracle', 'MySQL']],
  [['협업 도구', 'Collaboration'], ['Git', 'SVN', 'Figma']],
  [['디자인 도구', 'Design'], ['Figma', 'Photoshop', 'Illustrator']],
]

const TEXT = {
  ko: {
    titles: ['자기소개', '기술 스택'],
    intro: [
      '안녕하세요, 프론트엔드 개발자 김부희입니다. 인테리어 디자인을 전공하며 공간과 사용자 동선을 고민했던 시간이, 지금은 화면 위의 레이아웃과 사용자 경험을 고민하는 태도로 이어지고 있습니다.',
      '2017년 공공기관 도서관 시스템 개발로 커리어를 시작해 교육, 커머스, 모빌리티, 블록체인 게임 스튜디오에 이르기까지 다양한 도메인의 서비스를 만들어왔습니다. JSP·jQuery 시절부터 React, Vue.js, TypeScript까지 프론트엔드 생태계의 변화를 현장에서 직접 겪으며 유연하게 적응해왔습니다.',
    ],
  },
  en: {
    titles: ['Who I am', 'Tech Stack'],
    intro: [
      "Hi, I'm Buhee Kim, a frontend developer. I studied interior design, and the time I spent thinking about space and how people move through it now carries over into how I think about layout and user experience on screen.",
      'I started my career in 2017 building a library system for a public institution, and have since built services across education, commerce, mobility and a blockchain game studio. From the JSP and jQuery days to React, Vue.js and TypeScript, I have adapted to the changing frontend ecosystem firsthand.',
    ],
  },
}

// 자기소개 : 소개글, 기술 스택
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

        <Block eyebrow="Skills" title={t.titles[1]}>
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
