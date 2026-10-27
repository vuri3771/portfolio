import { useEffect, useRef } from 'react'

// 화면에 들어오면 한 번만 떠오르게 함
export function Reveal({ as = 'div', delay = 0, className = '', children }) {
  const Tag = as
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-visible')
        io.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

// 왼쪽 칸은 작은 영문 표제와 큰 제목, 오른쪽 칸은 내용
export function Block({ eyebrow, title, description, children }) {
  return (
    <div className="grid gap-10 border-t border-ink/15 pt-12 md:grid-cols-12 md:gap-8 md:pt-16">
      <Reveal className="md:col-span-4">
        <p className="text-xs font-medium tracking-[0.3em] text-moss uppercase">{eyebrow}</p>
        <h2 className="mt-4 text-[26px] font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
        {description && <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink/65 sm:text-base">{description}</p>}
      </Reveal>
      <div className="md:col-span-8">{children}</div>
    </div>
  )
}
