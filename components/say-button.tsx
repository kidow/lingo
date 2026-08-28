'use client'

import { AudioLines } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { audioPath } from '@/lib/content'
import type { Language } from '@/lib/types'

/**
 * 발음 버튼. (spec.md §3, brand-spec.md)
 *
 * **정답 텍스트 오른쪽에 선다.** 소개 카드는 읽기 옆, 퀴즈 카드는 답한 뒤
 * 드러나는 Reveal 줄 옆이다. 자동 재생하지 않는다.
 *
 * 퀴즈 카드에서 답하기 전에는 이 버튼이 **아예 없다.** 정답이 읽기라서
 * 답 전에 누르면 정답이 그대로 들리는데, 그 잠금을 disabled 속성이 아니라
 * 렌더 여부로 건다 — 없는 버튼은 뚫리지 않는다.
 *
 * 위치는 이 컴포넌트가 정하지 않는다. 부모가 놓는 자리에 선다.
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
    // 파일이 없으면 조용히 비활성. 발음이 아직 없는 개념은 정상이다.
    //
    // preload='none'이면 요청이 안 나가서 error도 안 뜬다 — 파일이 없어도
    // 버튼이 활성으로 보이다가 누른 뒤에야 실패한다. metadata는 헤더만
    // 받아오므로 없는 파일을 미리 걸러낸다. 있으면 재생도 빨라진다.
    const audio = new Audio(audioPath(slug, lang))
    audio.preload = 'metadata'
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
      // 발음 파일이 없어도 사라지지 않는다. 자리가 비면 옆 글자가 밀리므로
      // 테두리와 배경은 그대로 두고 아이콘만 흐려진다. (brand-spec.md)
      className={`
        grid size-11 shrink-0 place-items-center rounded-pill
        border border-line bg-surface
        transition active:scale-95
        disabled:cursor-default disabled:active:scale-100
        ${playing ? 'border-accent text-accent' : disabled ? 'text-sub/45' : 'text-ink'}
      `}
    >
      <AudioLines className="size-5" strokeWidth={1.8} aria-hidden />
    </button>
  )
}
