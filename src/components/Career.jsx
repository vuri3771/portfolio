import { Block, Reveal } from './Section'
import { useLang } from '../i18n'

// 최신순, short 는 단기 계약, en 은 영문 화면에서 쓰는 회사 이름과 맡은 일
const CAREER = [
  { company: '시소이드', en: ['Seesoid', 'New web development and maintenance'], period: '2024. 10. 14 ~ 2026. 06. 30', work: '신규 웹 개발 및 유지보수', roles: ['디자인', '퍼블리싱', '프론트엔드'] },
  { company: 'LG CNS', en: ['LG CNS', 'Digital textbooks for K-12'], short: true, period: '2024. 07. 21 ~ 2024. 08. 31', work: '초중고 디지털 교과서 제작', roles: ['프론트엔드'] },
  { company: '에픽리그', en: ['Epic League', 'New app development and maintenance'], short: true, period: '2024. 04. 24 ~ 2024. 07. 24', work: '신규 앱 개발 및 유지보수', roles: ['디자인', '퍼블리싱', '프론트엔드'] },
  { company: '알루랩', en: ['Alulab', 'New website development'], period: '2024. 01. 31 ~ 2024. 02. 14', work: '신규 웹 사이트 개발', roles: ['디자인', '퍼블리싱', '프론트엔드'] },
  { company: '한국장학재단', en: ['Korea Student Aid Foundation', 'New app development'], short: true, period: '2023. 10. 14 ~ 2024. 05. 01', work: '신규 앱 개발', roles: ['디자인', '퍼블리싱', '프론트엔드'] },
  { company: '현대모터스', en: ['Hyundai Motors', 'New app development and maintenance'], short: true, period: '2023. 11. 04 ~ 2023. 11. 20', work: '신규 앱 개발 및 유지보수', roles: ['프론트엔드'] },
  { company: 'PayIn', en: ['PayIn', 'New app development and maintenance'], short: true, period: '2023. 10. 09 ~ 2023. 11. 09', work: '신규 앱 개발 및 유지보수', roles: ['디자인', '퍼블리싱', '프론트엔드'] },
  { company: '린시(한국지점)', en: ['Linxi (Korea Branch)', 'New app development and maintenance'], period: '2022. 11. 01 ~ 2023. 12. 18', work: '신규 앱 개발 및 유지보수', roles: ['디자인', '퍼블리싱', '프론트엔드'] },
  { company: '손스소프트', en: ['Sons Soft', 'Education sites, CMS, LMS'], period: '2020. 12. 01 ~ 2022. 10. 01', work: '교육 사이트, CMS, LMS', roles: ['디자인', '퍼블리싱', '백엔드', '프론트엔드'] },
  { company: '웨일소프트', en: ['Whalesoft', 'Large-scale public institution websites'], period: '2017. 06. 01 ~ 2020. 12. 01', work: '공공기관 사이트 개설 (대규모 웹 사이트)', roles: ['디자인', '퍼블리싱', '백엔드', '프론트엔드'] },
]

const ROLES_EN = { 디자인: 'Design', 퍼블리싱: 'Publishing', 프론트엔드: 'Frontend', 백엔드: 'Backend' }

const TEXT = {
  ko: { title: '커리어', description: '2017년부터 지금까지, 공공기관부터 스타트업까지 다양한 환경에서 쌓아온 경력입니다.', short: '단기' },
  en: { title: 'Experience', description: 'From 2017 to today, across public institutions and startups alike.', short: 'Short-term' },
}

// 커리어 페이지 : 회사별 기간, 맡은 일, 역할
export default function Career() {
  const { lang } = useLang()
  const en = lang === 'en'
  const t = TEXT[lang]
  return (
    <section id="career" className="min-h-svh bg-mist text-ink">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-28 md:px-10 md:pt-36 md:pb-36">
        <Block
          eyebrow="Career"
          title={t.title}
          description={t.description}
        >
          <ol>
            {CAREER.map((item, i) => (
              <Reveal
                as="li"
                key={item.company}
                className="grid gap-x-6 gap-y-3 border-b border-ink/10 py-7 first:pt-0 md:grid-cols-[3rem_1fr_auto]"
              >
                <span className="hidden text-sm font-medium text-moss/70 tabular-nums md:block md:pt-1.5">
                  {String(CAREER.length - i).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="flex items-center gap-2.5 text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
                    {en ? item.en[0] : item.company}
                    {item.short && (
                      <span className="rounded-full border border-ink/20 px-2 py-0.5 text-[11px] font-medium tracking-normal text-ink/55">
                        {t.short}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink/75 sm:text-base">{en ? item.en[1] : item.work}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.roles.map((role) => (
                      <li key={role} className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-xs text-ink/65">
                        {en ? ROLES_EN[role] : role}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="order-first text-[13px] text-ink/50 sm:text-sm tabular-nums md:order-none md:pt-2 md:text-right">
                  {item.period}
                </span>
              </Reveal>
            ))}
          </ol>
        </Block>
      </div>
    </section>
  )
}
