import { createContext, useContext, useEffect, useState } from 'react'

// 화면 언어(ko, en), 고른 언어는 이 브라우저에 기억해 둠
const LangContext = createContext({ lang: 'ko', setLang: () => {} })

const readSaved = () => {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'ko'
  } catch {
    return 'ko'
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(readSaved)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // 저장이 막힌 브라우저면 이번 방문 동안만 유지
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangContext)
