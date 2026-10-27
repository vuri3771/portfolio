import { useEffect, useRef } from 'react'

// 구름 조각 설정, 위치와 크기는 무대 기준 %
// depth : back = 먼 산 바로 앞, mid = 중간 숲과 앞 숲 사이, front = 맨 앞
// 조각마다 흔들림 폭, 속도, 시작점(seed)을 다르게 줘서 서로 다른 방향으로 떠돌게 함
// 하늘 위 흰 구름은 배경과 섞여 안 보이므로, 진하게 보이는 건 숲 위를 지나는 mid, front 조각
const CLOUDS = [
  { depth: 'back', left: -15, top: -8, width: 115, flipX: true, opacity: 0.75, ampX: 10, ampY: 5, speed: 0.16, seed: 1.3 },
  { depth: 'back', left: 35, top: 8, width: 85, flipY: true, opacity: 0.65, ampX: 12, ampY: 6, speed: 0.13, seed: 4.1 },
  { depth: 'mid', left: -25, top: 24, width: 90, opacity: 0.7, ampX: 12, ampY: 6, speed: 0.19, seed: 2.7 },
  { depth: 'mid', left: 45, top: 32, width: 75, flipX: true, flipY: true, opacity: 0.65, ampX: 14, ampY: 7, speed: 0.15, seed: 6.2 },
  { depth: 'front', left: -30, top: -20, width: 120, opacity: 0.6, ampX: 14, ampY: 6, speed: 0.12, seed: 3.6 },
  { depth: 'front', left: 30, top: 44, width: 95, flipX: true, opacity: 0.6, ampX: 12, ampY: 6, speed: 0.17, seed: 5.4 },
  { depth: 'front', left: -40, top: 52, width: 80, flipY: true, opacity: 0.5, ampX: 10, ampY: 5, speed: 0.14, seed: 8.8 },
]

// 스크롤 끝까지 내렸을 때 층별로 움직이는 양(조각 크기 기준 %)
// 앞 층일수록 많이 움직여서 깊이감이 남, x 는 조각이 놓인 쪽(왼쪽/오른쪽) 바깥으로 벌어짐
const SCROLL_SHIFT = {
  back: { x: 12, y: -6, scale: 0.05 },
  mid: { x: 30, y: -14, scale: 0.12 },
  front: { x: 60, y: -28, scale: 0.25 },
}

// 가만히 있어도 구름이 흘러감(무대 기준 %/초), 먼 층일수록 느리게
// 중간 층만 반대(오른쪽 → 왼쪽)로 흘러 층끼리 엇갈리며 움직임이 눈에 띄게 함
// 화면 밖으로 다 빠지면 반대쪽 밖에서 다시 들어옴
const DRIFT = { back: 1.2, mid: -2.2, front: 3.2 }

// a ~ b 구간에서 0 → 1 로 부드럽게 바뀌는 값
function ramp(p, a, b) {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

const STATS = [
  ['7+', 'Years'],
  ['29+', 'Projects'],
  ['10', 'Companies'],
]

// 주기가 서로 나눠떨어지지 않는 사인파 셋을 섞은 값(-1 ~ 1), 같은 움직임이 반복되지 않음
function wave(t, seed) {
  return (
    Math.sin(t + seed) * 0.6 +
    Math.sin(t * 1.618 + seed * 2.3) * 0.3 +
    Math.sin(t * 2.718 + seed * 0.7) * 0.1
  )
}

function CloudPatch({ cloud, patchRef }) {
  const flip = `scale(${cloud.flipX ? -1 : 1}, ${cloud.flipY ? -1 : 1})`
  return (
    <div
      ref={patchRef}
      className="pointer-events-none absolute aspect-[1448/1086] will-change-transform"
      style={{
        left: `${cloud.left}%`,
        top: `${cloud.top}%`,
        width: `${cloud.width}%`,
        opacity: cloud.opacity,
        // 사각 테두리가 안 보이게 가장자리를 부드럽게 지움
        maskImage: 'radial-gradient(ellipse at center, #000 40%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, #000 40%, transparent 72%)',
      }}
    >
      <img
        src="/hero/layer4.webp"
        alt=""
        draggable={false}
        className="h-full w-full select-none"
        style={{ transform: flip }}
      />
    </div>
  )
}

const Layer = ({ src }) => (
  <img
    src={src}
    alt=""
    draggable={false}
    className="pointer-events-none absolute inset-0 h-full w-full select-none"
  />
)

// 메인 화면 : 레이어 4장을 겹치고, 구름 조각들이 산과 숲 사이를 제각각 떠돎
// 1 먼 산과 구름 → 구름(back) → 2 중간 숲 → 구름(mid) → 3 앞 숲 → 구름(front)
// 섹션을 화면보다 길게 두고 화면은 고정(sticky), 스크롤하는 동안 구름이 층마다 다른 속도로 흩어짐
// 스크롤 순서 : 이름 → 이름이 흐려지며 슬로건 등장 → 아래가 안개로 덮이며 자기소개로 이어짐
export default function Hero() {
  const sectionRef = useRef(null)
  const patchRefs = useRef([])
  const skyRef = useRef(null)
  const nameRef = useRef(null)
  const sloganRef = useRef(null)
  const veilRef = useRef(null)
  const hintRef = useRef(null)
  const fogRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 섹션 안에서 얼마나 내려왔는지(0 ~ 1)
    const readProgress = () => {
      const el = sectionRef.current
      if (!el) return 0
      const range = el.offsetHeight - window.innerHeight
      if (range <= 0) return 0
      return Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range))
    }

    let frame
    let progress = readProgress()
    const start = performance.now()
    const tick = (now) => {
      const sec = reduced ? 0 : (now - start) / 1000
      // 스크롤 값을 바로 쓰지 않고 따라가게 해서 휠 한 칸에도 부드럽게 움직임
      const target = readProgress()
      progress += (target - progress) * (reduced ? 1 : 0.08)
      const p = progress

      CLOUDS.forEach((c, i) => {
        const el = patchRefs.current[i]
        if (!el) return
        const t = sec * c.speed
        const shift = SCROLL_SHIFT[c.depth]
        const dir = c.left + c.width / 2 < 50 ? -1 : 1
        // 흐름 : 조각 왼쪽 끝이 -width(왼쪽 밖) ~ 100(오른쪽 밖) 사이를 돌고, 조각 폭 기준 % 로 바꿈
        const span = 100 + c.width * 1.3
        const at = (((c.left + c.width * 1.3 + sec * DRIFT[c.depth]) % span) + span) % span - c.width * 1.3
        const flow = ((at - c.left) / c.width) * 100
        // x, y 를 서로 다른 seed 로 굴려서 좌우, 위아래, 대각선으로 방향이 계속 바뀜
        const x = flow + wave(t, c.seed) * c.ampX + dir * shift.x * p
        const y = wave(t * 0.8, c.seed + 10) * c.ampY + shift.y * p
        // 크기와 기울기가 천천히 부풀었다 가라앉아 구름이 피어오르는 것처럼 보임
        const s = 1 + wave(t * 0.6, c.seed + 20) * 0.12 + shift.scale * p
        const r = wave(t * 0.5, c.seed + 40) * 3
        const o = c.opacity * (0.8 + wave(t * 0.7, c.seed + 30) * 0.2)
        el.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${s}) rotate(${r}deg)`
        el.style.opacity = o
      })

      // 먼 산 레이어는 숨 쉬듯 아주 조금만 흔들림
      if (skyRef.current) {
        const t = sec * 0.04
        skyRef.current.style.transform = `translate3d(${wave(t, 0.5) * 0.8}%, ${wave(t, 7.7) * 0.4}%, 0) scale(1.03)`
      }

      // 이름은 위로 흐려지며 빠지고, 슬로건이 아래에서 올라옴
      const out = ramp(p, 0.15, 0.4)
      const inn = ramp(p, 0.35, 0.6)
      if (nameRef.current) {
        nameRef.current.style.opacity = 1 - out
        nameRef.current.style.transform = `translate3d(0, ${-40 * out}px, 0)`
        nameRef.current.style.filter = `blur(${8 * out}px)`
      }
      if (sloganRef.current) {
        sloganRef.current.style.opacity = inn
        sloganRef.current.style.transform = `translate3d(0, ${40 * (1 - inn)}px, 0)`
        sloganRef.current.style.filter = `blur(${8 * (1 - inn)}px)`
      }
      // 글자 뒤 안개는 이름에서 슬로건으로 넘어가는 사이에도 끊기지 않게 유지
      if (veilRef.current) veilRef.current.style.opacity = 0.55 + 0.25 * inn
      if (hintRef.current) hintRef.current.style.opacity = 1 - ramp(p, 0, 0.12)
      // 끝부분에서 아래쪽이 자기소개 배경색 안개로 덮임
      if (fogRef.current) fogRef.current.style.opacity = ramp(p, 0.7, 1)

      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const patches = (depth) =>
    CLOUDS.map((c, i) =>
      c.depth === depth ? (
        <CloudPatch key={i} cloud={c} patchRef={(el) => (patchRefs.current[i] = el)} />
      ) : null,
    )

  return (
    <section id="home" ref={sectionRef} className="relative h-[320svh] w-full">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-gradient-to-b from-[#c9d1cd] via-[#d6dcd8] to-[#b9c3bd]">
        <div className="hero-stage absolute bottom-0 left-1/2 -translate-x-1/2">
          <div ref={skyRef} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.03)' }}>
            <Layer src="/hero/layer1.webp" />
          </div>
          {patches('back')}
          <Layer src="/hero/layer2.webp" />
          {patches('mid')}
          <Layer src="/hero/layer3.webp" />
          {patches('front')}
        </div>

        {/* 글자 뒤에 깔리는 옅은 안개, 숲 위에서도 글자가 읽히게 함 */}
        <div
          ref={veilRef}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.55,
            background: 'radial-gradient(ellipse 62% 50% at 50% 50%, #e8ece9 0%, rgba(232,236,233,0.75) 55%, rgba(232,236,233,0) 100%)',
          }}
        />

        <div className="absolute inset-0 grid place-items-center px-6 text-center text-ink">
          <div ref={nameRef} className="[grid-area:1/1] will-change-transform">
            <p className="text-sm font-medium tracking-[0.25em] text-ink/60 uppercase md:text-base">Hello, I'm</p>
            <h1 className="mt-4 text-[clamp(36px,6vw,80px)] leading-none font-bold tracking-[-0.04em]">Buhee Kim</h1>
            <p className="mt-6 text-xs font-medium tracking-[0.35em] text-ink/55 uppercase md:text-sm">Frontend Developer</p>
          </div>

          <div ref={sloganRef} className="[grid-area:1/1] max-w-4xl opacity-0 will-change-transform">
            <h2 className="text-[clamp(26px,3.4vw,46px)] leading-[1.12] font-bold tracking-[-0.035em] text-balance">
              Design the big picture first,{' '}
              <br className="hidden sm:block" />
              finish every small detail.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed sm:mt-7 sm:text-[15px] text-ink/75 md:text-lg">
              Frontend developer with 7+ years of building interfaces, from public sector systems to a blockchain game studio.
            </p>
            <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-ink/15">
              {STATS.map(([value, label]) => (
                <div key={label} className="px-2">
                  <dt className="text-2xl font-bold tracking-tight md:text-3xl">{value}</dt>
                  <dd className="mt-1 text-xs text-ink/60 md:text-sm">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div ref={hintRef} className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-[11px] tracking-[0.3em] text-white/85 uppercase">
          Scroll
          <span className="scroll-line block h-10 w-px bg-white/70" />
        </div>

        <div
          ref={fogRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-b from-mist/0 via-mist/85 to-mist opacity-0"
        />

      </div>
    </section>
  )
}
