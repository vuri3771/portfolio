import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { WORKS } from '../data/works'
import { WORKS_EN } from '../data/works.en'
import { useLang } from '../i18n'
import { useStepInput } from '../hooks/useStepInput'

// 작업 캡처, 없으면 임시 테스트 이미지
const imageOf = (work, i) => work.image ?? `https://picsum.photos/seed/buhee-work-${i + 1}/640/480`

// 회사 목록, 처음 나온 순서대로 작업 수와 함께, en 은 영문 화면에서 보일 이름
const COMPANIES = WORKS.reduce((list, w, i) => {
  const found = list.find((c) => c.name === w.company)
  if (found) found.count += 1
  else list.push({ name: w.company, en: WORKS_EN[i].company, count: 1 })
  return list
}, [])

// 카드 기울기(도), 선택 카드는 덜 기울여 정면에 가깝게
const TILT = -42
const ACTIVE_TILT = -18
// 화면 크기로 카드 크기와 더미 간격을 정함
// 선택 카드는 가운데, 지난 카드는 왼쪽 아래 앞쪽, 다음 카드는 오른쪽 위 뒤쪽으로 비스듬히 쌓임
function stackLayout(w, h) {
  if (w < 768) {
    // 모바일 : 위는 시계(약 150px), 아래는 정보 글 칸, 카드는 그 사이 가운데
    // 정보 글은 시작 높이를 고정해 내용이 길어도 위로 밀려 올라가지 않고 아래로만 늘어남
    // 옆 더미는 화면 가장자리에 살짝 걸쳐 보이게 하고 위아래로 덜 벌려 글과 안 겹치게
    const card = Math.min(w * 0.52, 240)
    const infoTop = h - 300
    return {
      card,
      infoTop,
      centerY: ((150 + infoTop) / 2 / h) * 100,
      gap: { x: card * 0.92, y: card * 0.22, z: card * 0.5 },
      step: { x: card * 0.07, y: card * 0.03, z: card * 0.2 },
      // 이 칸 수를 넘어간 카드는 흐려지며 사라짐
      visible: 8,
    }
  }
  const card = Math.min(w * 0.22, h * 0.36, 340)
  return {
    card,
    // 무대 중심 높이(화면 %)
    centerY: 54,
    // 선택 카드와 첫 장 사이 벌어짐
    gap: { x: card * 1.2, y: card * 0.55, z: card * 0.5 },
    // 더미 안에서 한 장씩 밀리는 양
    step: { x: card * 0.085, y: card * 0.045, z: card * 0.2 },
    visible: 16,
  }
}

// 처음 들어오면 가운데 카드부터 보여 줘 양옆 더미가 고르게 보이게
const START = Math.floor((WORKS.length - 1) / 2)

const FILTERS = [{ name: null, label: 'all', en: 'all', count: WORKS.length }, ...COMPANIES.map((c) => ({ ...c, label: c.name }))]

const TEXT = {
  ko: { view: (title) => `${title} 보기`, site: '사이트 보기', filter: '회사별 보기', prev: '이전 프로젝트', next: '다음 프로젝트', close: '닫기', stack: '사용 기술' },
  en: { view: (title) => `View ${title}`, site: 'Visit site', filter: 'Filter by company', prev: 'Previous project', next: 'Next project', close: 'Close', stack: 'Stack' },
}

const pad = (n) => String(n).padStart(2, '0')

// 오늘 날짜와 초 단위 시계, 레퍼런스처럼 왼쪽 위에 둠
function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="text-xs leading-relaxed font-medium text-ink/70 tabular-nums md:text-sm">
      {now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      <br />
      {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
    </p>
  )
}

// 작업 상세 팝업 : 왼쪽 이미지, 오른쪽 정보, 모바일은 위아래로 나눔
// 바깥 누르기, Esc, 닫기 버튼으로 닫힘, 열린 채 방향키로 넘기면 내용도 따라 바뀜
function Detail({ work, shown, t, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-ink/35 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={shown.title}
        onClick={(e) => e.stopPropagation()}
        className="work-info relative grid max-h-full w-full max-w-5xl grid-rows-[auto_1fr] overflow-hidden rounded-2xl bg-mist shadow-[0_30px_80px_rgb(29_42_36/0.35)] md:grid-cols-[3fr_2fr] md:grid-rows-1"
      >
        <div className="aspect-[4/3] bg-ink/10 md:aspect-auto md:min-h-[26rem]">
          <img src={imageOf(work, work.index)} alt="" className="h-full w-full object-cover object-top" />
        </div>
        <div className="overflow-y-auto p-5 md:p-8">
          <p className="text-xs text-ink/55">{shown.company}</p>
          <h2 className="mt-1.5 pr-8 text-lg leading-tight font-bold tracking-tight md:text-2xl">{shown.title}</h2>
          <ul className="mt-4 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-ink/75 md:text-sm">
            {shown.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-[11px] font-semibold tracking-wide text-ink/45 uppercase">{t.stack}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {work.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-ink/15 px-2.5 py-1 text-[11px] text-ink/70 md:text-xs">
                {tag}
              </li>
            ))}
          </ul>
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              {t.site} ↗
            </a>
          )}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="glass-drop absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full text-sm text-ink md:top-4 md:right-4"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// 작업물 페이지 : 카드가 3D 공간에 비스듬히 쌓여 있고 선택 카드만 가운데로 떨어져 나옴
// 휠, 스와이프, 방향키, 카드 누르기로 넘기고, 오른쪽 회사 목록으로 거름
export default function Works() {
  const { lang } = useLang()
  const en = lang === 'en'
  const t = TEXT[lang]
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const target = useRef(START)
  const current = useRef(START)
  const [company, setCompany] = useState(null)
  const [active, setActive] = useState(START)
  const [layout, setLayout] = useState(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  // 걸러진 작업, 원래 번호(이미지 고정용)를 같이 들고 다님
  const list = useMemo(
    () => WORKS.map((w, i) => ({ ...w, index: i })).filter((w) => !company || w.company === company),
    [company],
  )
  const countRef = useRef(list.length)
  countRef.current = list.length

  useStepInput(stageRef, target, () => countRef.current - 1)

  useEffect(() => {
    const stage = stageRef.current
    const measure = () => setLayout(stackLayout(stage.clientWidth, stage.clientHeight))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  // 회사를 바꾸면 첫 장부터
  const pick = (name) => {
    setCompany(name)
    setOpen(false)
    target.current = 0
    current.current = 0
  }

  useEffect(() => {
    if (!layout) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const { gap, step, visible } = layout

    let frame
    let shown = -1
    const tick = () => {
      current.current += (target.current - current.current) * (reduced ? 1 : 0.1)
      const now = current.current

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const d = i - now
        const a = Math.abs(d)
        // 한 칸까지는 벌어짐만큼, 그 뒤로는 더미 간격만큼 밀림
        const near = Math.min(a, 1)
        const far = Math.max(0, a - 1)
        const sign = Math.sign(d)
        const x = sign * (near * gap.x + far * step.x)
        const y = -sign * (near * gap.y + far * step.y)
        // 다음 카드는 뒤로 깊이 쌓고, 지난 카드는 살짝만 앞으로 나와 너무 커지지 않게
        const z = d > 0 ? -(near * gap.z + far * step.z) : -near * gap.z * 0.6 + far * step.z * 0.2
        const tilt = ACTIVE_TILT + (TILT - ACTIVE_TILT) * near
        const fade = 1 - Math.min(1, Math.max(0, a - visible + 3) / 3)
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${tilt}deg)`
        el.style.opacity = String(fade)
        el.style.visibility = fade === 0 ? 'hidden' : 'visible'
      })

      const idx = Math.round(now)
      if (idx !== shown) {
        shown = idx
        setActive(idx)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [layout, list])

  const work = list[Math.min(active, list.length - 1)]
  // 영문 화면이면 회사, 제목, 한 일을 영문판으로 바꿔 끼움
  const shown = work && en ? { ...work, ...WORKS_EN[work.index] } : work
  const go = (i) => (target.current = Math.min(list.length - 1, Math.max(0, i)))

  return (
    <section id="works" className="relative bg-mist text-ink">
      <div ref={stageRef} className="relative h-svh w-full touch-none overflow-hidden">
        {/* 3D 무대, 카드는 모두 가운데를 기준으로 놓고 transform 으로 흩음 */}
        <div className="absolute inset-0 [perspective:1400px]">
          <div
            className="absolute left-1/2 [transform-style:preserve-3d]"
            style={{ top: `${layout?.centerY ?? 54}%` }}
          >
            {layout &&
              list.map((w, i) => (
                <button
                  key={w.index}
                  ref={(el) => (cardRefs.current[i] = el)}
                  type="button"
                  // 이미 가운데 온 카드를 한 번 더 누르면 상세 팝업
                  onClick={() => (i === active && Math.round(target.current) === i ? setOpen(true) : go(i))}
                  aria-label={t.view(en ? WORKS_EN[w.index].title : w.title)}
                  aria-current={i === active ? 'true' : undefined}
                  className="absolute top-0 left-0 overflow-hidden bg-ink/10 shadow-[0_10px_30px_rgb(29_42_36/0.18)] will-change-transform [backface-visibility:hidden] focus-visible:outline-2 focus-visible:outline-ink"
                  style={{ width: layout.card, height: layout.card * 0.75 }}
                >
                  <img
                    src={imageOf(w, w.index)}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* 왼쪽 위 : 시계 */}
        <div className="pointer-events-none absolute top-24 left-6 md:top-28 md:left-10">
          <Clock />
        </div>

        {/* 선택된 작업 정보 : 모바일은 정해진 높이에서 시작해 아래로 늘어남(카드가 비쳐 보이지 않게 안개색으로 덮음), PC 는 시계 아래 */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-mist/0 to-mist to-[3.5rem] px-6 pt-14 md:inset-x-auto md:top-46 md:bottom-auto md:left-10 md:w-80 md:bg-none md:p-0 lg:w-96"
          style={layout?.infoTop ? { top: layout.infoTop - 56 } : undefined}
        >
          {work && (
            <div key={`${company}-${work.index}`} className="work-info pointer-events-auto">
              <p className="text-xs text-ink/50 tabular-nums md:text-sm">
                {pad(Math.min(active, list.length - 1) + 1)} / {pad(list.length)}
                <span className="ml-3 text-ink/70">{shown.company}</span>
              </p>
              <h2 className="mt-2 text-lg leading-tight font-bold tracking-tight md:text-2xl lg:text-3xl">{shown.title}</h2>
              <ul className="mt-3 space-y-0.5 text-[13px] leading-relaxed text-ink/65 md:text-[15px] lg:text-base">
                {shown.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-ink/50 md:text-sm">{work.tags.join(', ')}</p>
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium underline md:text-[15px] lg:text-base decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  {t.site} ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* 오른쪽 : 회사별로 거르기, 숫자는 작업 수, 모바일은 자리가 없어 뺌 */}
        <nav aria-label={t.filter} className="absolute top-1/2 right-10 hidden -translate-y-1/2 text-right md:block">
          <ul className="space-y-1 text-[13px] lg:space-y-1.5 lg:text-[15px]">
            {FILTERS.map((c) => (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => pick(c.name)}
                  aria-pressed={company === c.name}
                  className={`transition-colors ${company === c.name ? 'font-bold text-ink' : 'text-ink/45 hover:text-ink'}`}
                >
                  {en ? c.en : c.label}
                  <sup className="ml-0.5 text-[9px] font-normal tabular-nums lg:text-[11px]">{c.count}</sup>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 오른쪽 아래 : 이전, 다음 */}
        <div className="absolute right-6 bottom-8 flex gap-2 md:right-10 md:bottom-10">
          <button
            type="button"
            onClick={() => go(Math.round(target.current) - 1)}
            aria-label={t.prev}
            className="glass-drop grid h-10 w-10 place-items-center rounded-full text-ink transition-transform active:scale-95"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(Math.round(target.current) + 1)}
            aria-label={t.next}
            className="glass-drop grid h-10 w-10 place-items-center rounded-full text-ink transition-transform active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      {open && work && <Detail work={work} shown={shown} t={t} onClose={close} />}
    </section>
  )
}
