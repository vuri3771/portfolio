import { useEffect, useRef } from 'react'

// 휠, 스와이프, 방향키로 target(카드 번호, 실수) 을 움직이고, 멈추면 가장 가까운 카드에 딱 맞춰 섬
// limit 은 최대 번호를 돌려주는 함수, 주면 0 ~ 최대 안에 가두고 안 주면 끝없이 돎
export function useStepInput(stageRef, target, limit) {
  const limitRef = useRef(limit)
  limitRef.current = limit

  useEffect(() => {
    const stage = stageRef.current
    const set = (v) => {
      const max = limitRef.current?.()
      target.current = max === undefined ? v : Math.min(max, Math.max(0, v))
    }
    let snapTimer
    const snapSoon = () => {
      clearTimeout(snapTimer)
      snapTimer = setTimeout(() => set(Math.round(target.current)), 140)
    }

    const onWheel = (e) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      // 휠 한 칸(약 100)에 카드 한 장 조금 못 되게
      set(target.current + Math.max(-1, Math.min(1, delta / 120)))
      snapSoon()
    }

    let touch = null
    const onTouchStart = (e) => {
      const t = e.touches[0]
      touch = { x: t.clientX, y: t.clientY, from: target.current }
    }
    const onTouchMove = (e) => {
      if (!touch) return
      const t = e.touches[0]
      const dx = touch.x - t.clientX
      const dy = touch.y - t.clientY
      // 가로든 세로든 더 크게 민 쪽으로, 60px 에 카드 한 장
      set(touch.from + (Math.abs(dx) > Math.abs(dy) ? dx : dy) / 60)
    }
    const onTouchEnd = () => {
      touch = null
      set(Math.round(target.current))
    }

    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') set(Math.round(target.current) + 1)
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') set(Math.round(target.current) - 1)
      else return
      e.preventDefault()
    }

    stage.addEventListener('wheel', onWheel, { passive: false })
    stage.addEventListener('touchstart', onTouchStart, { passive: true })
    stage.addEventListener('touchmove', onTouchMove, { passive: true })
    stage.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(snapTimer)
      stage.removeEventListener('wheel', onWheel)
      stage.removeEventListener('touchstart', onTouchStart)
      stage.removeEventListener('touchmove', onTouchMove)
      stage.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [stageRef, target])
}
