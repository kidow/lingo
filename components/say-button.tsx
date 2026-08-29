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
 *
 * **누를 때마다 속도가 번갈아 바뀐다.** 홀수 번째는 1.0배, 짝수 번째는 0.8배다.
 * 한 번 듣고 못 알아들었을 때 다시 누르는 행동이 그대로 "천천히 다시"가 된다 —
 * 안내 문구도 새 버튼도 필요 없다. (spec.md §3)
 *
 * 파일 자체는 항상 1.0배로 만든다(AUDIO.md). 느린 소리를 구워 두면 그게 원본이
 * 되어 정상 속도를 영영 못 내고, 속도를 바꿀 때마다 전체 재생성을 해야 한다.
 */
/** 짝수 번째 탭의 재생 속도. 0.7 아래로는 말이 늘어져 오히려 안 들린다 */
const SLOW_RATE = 0.8

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
  /** 누른 횟수. 홀짝으로 속도가 갈린다 */
  const taps = useRef(0)
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
    taps.current = 0
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

        taps.current += 1
        // 음높이는 유지한다. 이게 없으면 느린 재생에서 목소리가 굵어져
        // 발음 참조로 쓸 수 없다. 기본값이 true지만 명시한다
        audio.preservesPitch = true
        audio.playbackRate = taps.current % 2 === 1 ? 1 : SLOW_RATE

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
