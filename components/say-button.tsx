'use client'

import { useEffect, useRef, useState } from 'react'
import { audioPath } from '@/lib/content'
import type { Language } from '@/lib/types'

/**
 * 발음 버튼. (spec.md §3, brand-spec.md)
 *
 * 이미지 우측 하단에 항상 같은 자리. 카드 종류가 바뀌어도 흔들리지 않는다.
 * 자동 재생하지 않는다.
 *
 * 퀴즈 카드에서는 `enabled=false`로 시작한다. 정답이 읽기라서, 답하기 전에
 * 누르면 정답이 그대로 들리기 때문이다. 답한 뒤에 켜진다.
 */
export function SayButton({
  slug,
  lang,
  label,
  enabled = true,
}: {
  slug: string
  lang: Language
  label: string
  enabled?: boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    // 파일이 없으면 조용히 비활성. 발음이 아직 없는 개념은 정상이다
    const audio = new Audio(audioPath(slug, lang))
    audio.preload = 'none'
    audio.addEventListener('error', () => setAvailable(false))
    audio.addEventListener('ended', () => setPlaying(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [slug, lang])

  const disabled = !enabled || !available

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={`${label} 발음 듣기`}
      onClick={() => {
        const audio = audioRef.current
        if (!audio) return
        setPlaying(true)
        audio.currentTime = 0
        audio.play().catch(() => {
          setAvailable(false)
          setPlaying(false)
        })
      }}
      // 비활성이어도 사라지지 않는다. 버튼 자리가 흔들리면 안 되므로
      // 테두리와 배경은 그대로 두고 아이콘만 흐려진다. (brand-spec.md)
      className={`
        absolute right-2.5 bottom-2.5 grid size-11 place-items-center rounded-pill
        border border-line bg-surface/90 backdrop-blur-sm
        transition active:scale-95
        disabled:cursor-default disabled:active:scale-100
        ${playing ? 'border-accent text-accent' : disabled ? 'text-sub/45' : 'text-ink'}
      `}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
        <path d="M16 9.2a4 4 0 0 1 0 5.6" />
        <path d="M18.6 6.6a7.6 7.6 0 0 1 0 10.8" />
      </svg>
    </button>
  )
}
