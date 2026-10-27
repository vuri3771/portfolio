import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'

// Home, About 은 메인 페이지 안의 구역, Career, Works 는 따로 된 페이지
const MENU = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/', hash: 'about' },
  { id: 'career', label: 'Career', to: '/career' },
  { id: 'works', label: 'Works', to: '/works' },
]
const SECTIONS = ['home', 'about']

// 상단 고정 메뉴 : 가운데 유리 물방울 같은 알약 안에 메뉴, 지금 보는 구역 뒤로 작은 물방울이 미끄러져 따라감
export default function Header({ path, navigate }) {
  const { lang, setLang } = useLang()
  const [section, setSection] = useState('home')
  const active = path === '/' ? section : path.slice(1)
  const [drop, setDrop] = useState(null)
  const linkRefs = useRef({})
  // 모바일 햄버거 메뉴 열림
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // 메뉴 밖을 누르거나 Esc 를 누르면 닫힘
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (path !== '/') return
    const update = () => {
      // 화면 위쪽 1/3 지점을 지난 마지막 구역을 지금 구역으로 봄
      const line = window.innerHeight / 3
      let current = 'home'
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setSection(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [path])

  // 물방울 위치는 지금 메뉴 글자 자리에 맞춤, 글꼴이 늦게 들어와 폭이 바뀌어도 다시 잼
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active]
      // 글자는 목록(ul) 기준 위치라 목록이 알약 안에서 떨어진 만큼 더함
      // 메뉴에 없는 페이지거나 알약 메뉴가 숨은 모바일이면 물방울을 숨김
      setDrop(el?.offsetParent ? { left: el.offsetParent.offsetLeft + el.offsetLeft, width: el.offsetWidth } : null)
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center px-5 sm:h-20 sm:px-6 md:px-10">
        <a
          href="/"
          aria-label="처음으로"
          className="relative z-10"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <img src="/LOGO.svg" alt="" className="h-8 w-8 sm:h-9 sm:w-9" />
        </a>

        {/* PC, 태블릿 : 가운데 알약 메뉴 */}
        <nav className="glass-drop absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full p-1 sm:block">
          {drop && (
            <span
              aria-hidden="true"
              className="glass-drop-active absolute top-1 bottom-1 rounded-full transition-[left,width] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
              style={{ left: drop.left, width: drop.width }}
            />
          )}
          <ul className="relative flex items-center">
            {MENU.map(({ id, label, to, hash }) => (
              <li key={id}>
                <a
                  ref={(el) => (linkRefs.current[id] = el)}
                  href={hash ? `${to}#${hash}` : to}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(to, hash)
                  }}
                  aria-current={active === id ? 'page' : undefined}
                  className={`block rounded-full px-5 py-2 text-sm font-medium transition-colors md:px-6 ${
                    active === id ? 'text-ink' : 'text-ink/55 hover:text-ink'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 ml-auto flex items-center gap-2">
          {/* 한국어, 영어 바꾸기 : 지금이 아닌 쪽 언어를 보여 줌 */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
            aria-label={lang === 'en' ? '한국어로 보기' : 'View in English'}
            className="glass-drop h-9 rounded-full px-3 text-xs font-semibold tracking-wide text-ink/75 transition-transform hover:text-ink active:scale-95 sm:h-10 sm:px-4 sm:text-[13px]"
          >
            {lang === 'en' ? 'KO' : 'EN'}
          </button>

          {/* 모바일 : 오른쪽 햄버거 물방울, 누르면 아래로 메뉴가 펼쳐짐 */}
          <div ref={menuRef} className="sm:hidden">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="glass-drop relative grid h-9 w-9 place-items-center rounded-full text-ink transition-transform active:scale-95"
            >
              <span
                className={`absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[3px]'}`}
              />
              <span
                className={`absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[3px]'}`}
              />
            </button>
            <nav
              id="mobile-menu"
              aria-label="메뉴"
              className={`glass-drop absolute top-12 right-0 w-36 origin-top-right rounded-[1.25rem] p-1 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
              }`}
            >
              <ul>
                {MENU.map(({ id, label, to, hash }) => (
                  <li key={id}>
                    <a
                      href={hash ? `${to}#${hash}` : to}
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen(false)
                        navigate(to, hash)
                      }}
                      aria-current={active === id ? 'page' : undefined}
                      className={`block rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                        active === id ? 'glass-drop-active text-ink' : 'text-ink/60 active:text-ink'
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
