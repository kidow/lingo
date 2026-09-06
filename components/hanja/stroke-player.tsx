'use client'

import { Pause, Play, RotateCcw, StepForward } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { hanjaStrokeData, STROKE_DURATION, STROKE_GAP, strokeDuration, strokeNumberAt, type HanjaStrokeData } from '@/lib/hanja-strokes'
import type { HanjaCharacter } from '@/lib/hanja'

type PlaybackView = { diagram: ReactNode; controls: ReactNode; started: boolean; reset: () => void }
type Props = { character: HanjaCharacter; active?: boolean; autoPlay?: boolean; guide?: boolean; children: (view: PlaybackView) => ReactNode }

/** Unsupported characters have static SVG outlines but no playback affordance. */
export function StrokePlayback({ character, active = true, autoPlay = false, guide = true, children }: Props) {
  const data = hanjaStrokeData(character)
  return data
    ? <VerifiedPlayback key={character.id} data={data} active={active} autoPlay={autoPlay} guide={guide}>{children}</VerifiedPlayback>
    : children({ diagram: null, controls: null, started: false, reset: () => {} })
}

function VerifiedPlayback({ data, active, autoPlay, guide, children }: {
  data: HanjaStrokeData
  active: boolean
  autoPlay: boolean
  guide: boolean
  children: (view: PlaybackView) => ReactNode
}) {
  const paths = useRef<(SVGPathElement | null)[]>([])
  const animations = useRef<Animation[]>([])
  const frame = useRef<number | null>(null)
  const autoStarted = useRef(false)
  const [phase, setPhase] = useState<'idle' | 'playing' | 'paused' | 'done'>('idle')
  // Wait for the accessibility/API check before starting any automatic movement.
  const [manual, setManual] = useState<boolean | null>(null)
  const [count, setCount] = useState(0)
  const total = data.paths.length
  const started = phase !== 'idle'

  const stopFrame = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
  }, [])

  const cancel = useCallback(() => {
    stopFrame()
    for (const animation of animations.current) {
      animation.onfinish = null
      animation.cancel()
    }
    animations.current = []
  }, [stopFrame])

  const reset = useCallback(() => {
    cancel()
    setCount(0)
    setPhase('idle')
  }, [cancel])

  const pause = useCallback(() => {
    for (const animation of animations.current) animation.pause()
    stopFrame()
    setPhase((value) => value === 'playing' ? 'paused' : value)
  }, [stopFrame])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reset()
      setManual(media.matches || typeof Element.prototype.animate !== 'function')
    }
    update()
    media.addEventListener('change', update)
    const visibility = () => { if (document.hidden) pause() }
    document.addEventListener('visibilitychange', visibility)
    return () => {
      media.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', visibility)
      cancel()
    }
  }, [cancel, pause, reset])

  useEffect(() => { if (!active) pause() }, [active, pause])

  const watch = useCallback(() => {
    stopFrame()
    const tick = () => {
      const first = animations.current[0]
      if (!first) return
      setCount(strokeNumberAt(Number(first.currentTime ?? 0), total))
      if (first.playState === 'running' || first.pending) frame.current = requestAnimationFrame(tick)
    }
    tick()
  }, [stopFrame, total])

  const start = useCallback(() => {
    if (!active || document.hidden || manual === null) return
    cancel()
    setCount(1)
    if (manual) {
      setPhase(total === 1 ? 'done' : 'paused')
      return
    }
    const duration = strokeDuration(total)
    animations.current = paths.current.map((path, i) => {
      const begin = i * (STROKE_DURATION + STROKE_GAP) / duration
      const end = (i * (STROKE_DURATION + STROKE_GAP) + STROKE_DURATION) / duration
      return path!.animate([
        { strokeDashoffset: 1, offset: 0 },
        { strokeDashoffset: 1, offset: begin },
        { strokeDashoffset: 0, offset: end },
        { strokeDashoffset: 0, offset: 1 },
      ], { duration, easing: 'linear', fill: 'both' })
    })
    // All strokes share one clock; pauses and restarts never reorder them.
    const now = document.timeline.currentTime
    if (now !== null) for (const animation of animations.current) animation.startTime = now
    animations.current[0].onfinish = () => {
      stopFrame()
      setCount(total)
      setPhase('done')
    }
    setPhase('playing')
    watch()
  }, [active, cancel, manual, stopFrame, total, watch])

  useEffect(() => {
    if (!autoPlay || !active || manual !== false) return
    const startWhenVisible = () => {
      // A hidden/prefetched card waits. A paused or completed playback stays put.
      if (!document.hidden && !autoStarted.current) {
        autoStarted.current = true
        start()
      }
    }
    startWhenVisible()
    document.addEventListener('visibilitychange', startWhenVisible)
    return () => document.removeEventListener('visibilitychange', startWhenVisible)
  }, [active, autoPlay, manual, start])

  function toggle() {
    if (!active || document.hidden) return
    if (phase === 'idle' || phase === 'done') return start()
    if (manual) {
      const next = Math.min(total, count + 1)
      setCount(next)
      setPhase(next === total ? 'done' : 'paused')
    } else if (phase === 'playing') pause()
    else {
      animations.current.forEach((animation) => animation.play())
      setPhase('playing')
      watch()
    }
  }

  const label = manual ? (phase === 'done' ? '필순 처음부터 보기' : '다음 획 보기')
    : phase === 'playing' ? '필순 일시정지' : phase === 'paused' ? '필순 이어 재생' : '필순 재생'
  const Icon = manual ? StepForward : phase === 'playing' ? Pause : Play
  const diagram = (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={data.glyph}
      fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      {guide && started && <g opacity="0.12" aria-hidden>{data.paths.map((d, i) => <path key={i} d={d} />)}</g>}
      {data.paths.map((d, i) => <path key={i} ref={(node) => { paths.current[i] = node }} d={d}
        visibility={started && i >= count ? 'hidden' : undefined}
        pathLength="1" strokeDasharray="1" strokeDashoffset={manual && started && i >= count ? 1 : 0} />)}
    </svg>
  )
  const controls = (
    <div className="flex min-h-11 items-center justify-center gap-1 text-sub" role="group" aria-label={`${data.glyph} 필순 재생 조작`}>
      <button type="button" onClick={toggle} disabled={!active || manual === null} aria-label={label} title={label}
        className="grid size-11 place-items-center rounded-ctrl disabled:opacity-30"><Icon className="size-5" aria-hidden /></button>
      <span className="min-w-12 text-center text-sm tabular-nums" aria-live="polite" aria-atomic="true">{count} / {total}</span>
      <button type="button" onClick={start} disabled={!active || manual === null} aria-label="필순 다시 재생" title="필순 다시 재생"
        className="grid size-11 place-items-center rounded-ctrl disabled:opacity-30"><RotateCcw className="size-5" aria-hidden /></button>
    </div>
  )
  return children({ diagram, controls, started, reset })
}
