import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Career from './components/Career'
import Works from './components/Works'
import { useLang } from './i18n'

const TITLES = {
  '/': '김부희 | Frontend Developer',
  '/career': 'Career | 김부희',
  '/works': 'Works | 김부희',
}

const pathOf = () => (TITLES[window.location.pathname] ? window.location.pathname : '/')

// 페이지 : 메인(/, 메인 화면과 자기소개를 이어 스크롤), 커리어(/career), 작업물(/works)
export default function App() {
  const [path, setPath] = useState(pathOf)
  const { lang } = useLang()
  const name = lang === 'en' ? 'Buhee Kim' : '김부희'
  // 페이지가 바뀐 뒤 화면을 그리고 나서 옮겨 갈 자리(구역 id, 없으면 맨 위)
  const pendingHash = useRef(undefined)

  // 같은 페이지 안이면 부드럽게 스크롤, 다른 페이지면 주소를 바꾸고 그린 뒤 바로 그 자리로 감
  const navigate = useCallback(
    (to, hash) => {
      const url = hash ? `${to}#${hash}` : to
      if (to === path) {
        window.history.replaceState(null, '', url)
        const el = hash && document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      window.history.pushState(null, '', url)
      pendingHash.current = hash ?? null
      setPath(to)
    },
    [path],
  )

  useLayoutEffect(() => {
    document.title = TITLES[path]
    if (pendingHash.current === undefined) return
    const el = pendingHash.current && document.getElementById(pendingHash.current)
    pendingHash.current = undefined
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [path])

  // 브라우저 뒤로 가기, 앞으로 가기
  useEffect(() => {
    const onPop = () => setPath(pathOf())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <>
      <Header path={path} navigate={navigate} />
      <main>
        {path === '/career' && <Career />}
        {path === '/works' && <Works />}
        {path === '/' && (
          <>
            <Hero />
            <About />
          </>
        )}
      </main>
      {/* 작업물 페이지는 휠을 카드 넘기기에 써서 아래로 못 내려가므로 푸터를 뺌 */}
      {path !== '/works' && (
        <footer className="bg-ink text-mist/70">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
            <span className="text-base font-semibold text-mist">{name}</span>
            <span>© 2026 {name}. All rights reserved.</span>
          </div>
        </footer>
      )}
    </>
  )
}
