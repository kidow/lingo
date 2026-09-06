'use client'

import { ArrowLeft, Trash2, Undo2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { gradeLabel, hunEum, type HanjaCharacter } from '@/lib/hanja'
import { HANJA_FONT } from './card'

type Point = { x: number; y: number }
type Stroke = Point[]

/** 연습용 잉크만 보관한다. 그림 비교나 필순 판정으로 진도를 변경하지 않는다. */
export function WritingPractice({ character, onClose }: { character: HanjaCharacter; onClose: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const strokes = useRef<Stroke[]>([])
  const draft = useRef<Stroke | null>(null)
  const pointer = useRef<number | null>(null)
  const [count, setCount] = useState(0)
  const [reference, setReference] = useState(false)
  const close = useRef<HTMLButtonElement>(null)

  const redraw = useCallback(() => {
    const node = canvas.current
    const ctx = node?.getContext('2d')
    if (!node || !ctx) return
    const { width, height } = node.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    node.width = Math.round(width * dpr)
    node.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = ctx.fillStyle = '#1c1917'
    for (const stroke of [...strokes.current, ...(draft.current ? [draft.current] : [])]) {
      if (!stroke.length) continue
      ctx.beginPath()
      ctx.moveTo(stroke[0].x * width, stroke[0].y * height)
      if (stroke.length === 1) {
        ctx.arc(stroke[0].x * width, stroke[0].y * height, 2.5, 0, 2 * Math.PI)
        ctx.fill()
      } else {
        for (const p of stroke.slice(1)) ctx.lineTo(p.x * width, p.y * height)
        ctx.stroke()
      }
    }
  }, [])

  useEffect(() => {
    close.current?.focus({ preventScroll: true })
    const observer = new ResizeObserver(redraw)
    if (canvas.current) observer.observe(canvas.current)
    return () => observer.disconnect()
  }, [redraw])

  function point(event: PointerEvent<HTMLCanvasElement>): Point {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)) }
  }
  function cancel(event: PointerEvent<HTMLCanvasElement>) {
    if (pointer.current !== event.pointerId) return
    pointer.current = null
    draft.current = null
    redraw()
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto bg-surface px-5 pt-3 pb-5" onKeyDown={(event) => { if (event.key === 'Escape') onClose() }}>
      <div className="flex items-center gap-2">
        <button ref={close} type="button" aria-label="카드로 돌아가기" onClick={onClose} className="-ml-3 grid size-11 place-items-center rounded-ctrl"><ArrowLeft className="size-5" aria-hidden /></button>
        <span className="text-sm text-sub">쓰기 연습</span>
      </div>
      <h2 className="text-3xl font-semibold">{hunEum(character)}</h2>
      <p className="text-sm text-sub">{gradeLabel(character.readingGrade)}</p>
      <div className="relative mx-auto mt-2 aspect-square w-full max-w-[340px] shrink-0 overflow-hidden rounded-card border border-line bg-img-bg">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-line" />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-line" />
        {reference && <span style={HANJA_FONT} className="pointer-events-none absolute inset-0 grid place-items-center text-[clamp(140px,50vw,220px)] leading-none text-accent/20" aria-hidden>{character.glyph}</span>}
        <canvas
          ref={canvas}
          aria-label={`${hunEum(character)} 한자 쓰기 칸`}
          className="absolute inset-0 h-full w-full touch-none"
          onPointerDown={(event) => {
            if (pointer.current !== null || !event.isPrimary || event.button !== 0) return
            pointer.current = event.pointerId
            event.currentTarget.setPointerCapture(event.pointerId)
            draft.current = [point(event)]
            redraw()
          }}
          onPointerMove={(event) => {
            if (pointer.current !== event.pointerId || !draft.current) return
            draft.current.push(point(event))
            redraw()
          }}
          onPointerUp={(event) => {
            if (pointer.current !== event.pointerId || !draft.current) return
            draft.current.push(point(event))
            strokes.current.push(draft.current)
            draft.current = null
            pointer.current = null
            event.currentTarget.releasePointerCapture(event.pointerId)
            setCount(strokes.current.length)
            redraw()
          }}
          onPointerCancel={cancel}
          onLostPointerCapture={cancel}
        />
      </div>
      <div className="flex items-center gap-1">
        <button type="button" aria-label="한 획 취소" disabled={!count} className="grid size-11 place-items-center rounded-ctrl text-sub disabled:opacity-30" onClick={() => { strokes.current.pop(); setCount(strokes.current.length); redraw() }}><Undo2 className="size-5" aria-hidden /></button>
        <button type="button" aria-label="전체 지우기" disabled={!count} className="grid size-11 place-items-center rounded-ctrl text-sub disabled:opacity-30" onClick={() => { strokes.current = []; setCount(0); redraw() }}><Trash2 className="size-5" aria-hidden /></button>
        <span className="ml-auto text-sm text-sub tabular-nums">{count}획 입력</span>
      </div>
      <button type="button" aria-pressed={reference} onClick={() => setReference(!reference)} className="grid min-h-12 place-items-center rounded-ctrl bg-ink px-4 font-semibold text-surface">{reference ? '정답 숨기기' : '정답 보기'}</button>
    </div>
  )
}
