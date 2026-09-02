'use client'

import { AudioLines } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
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
 * 퀴즈 카드에서는 답한 직후 **한 번 저절로 울린다**(`autoPlay`). 정답이든 오답이든
 * 판정 직후가 소리를 붙일 자리다 — 맞았으면 확인이고 틀렸으면 교정이다. 답하기
 * 전에 울리지 않으므로 정답이 새지 않는다.
 *
 * **누를 때마다 속도가 번갈아 바뀐다.** 홀수 번째는 1.0배, 짝수 번째는 0.8배다.
 * 저절로 울린 것도 한 번으로 센다. 그래서 듣고 나서 누르면 0.8배가 나온다 —
 * "다시"가 곧 "천천히"가 된다.
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
  src,
  enabled = true,
  autoPlay = false,
}: {
  slug: string
  lang: Language
  label: string
  /**
   * 재생할 파일. 안 주면 그 낱말의 발음(`audioPath`)이다.
   *
   * 예문 소리는 이름이 문장 해시라 부모만 안다 (lib/entries.ts). 버튼이 경로를
   * 짓는 대신 받아 쓰게 두면 낱말과 예문이 같은 버튼을 나눠 쓴다.
   */
  src?: string
  enabled?: boolean
  /** 마운트 직후 한 번 저절로 재생한다. 퀴즈 판정 직후에 쓴다 */
  autoPlay?: boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  /** 누른 횟수. 홀짝으로 속도가 갈린다 */
  const taps = useRef(0)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)
  /**
   * 저절로 울리려다 브라우저에 막혔는가.
   *
   * iOS 사파리는 사용자가 건드리지 않은 소리를 막는다. 넘기는 손짓은 제스처지만
   * 재생은 그 손짓의 호출 스택 밖(렌더 뒤 효과)에서 일어나므로 막힌다 —
   * 듣기 카드에서는 화면에 아무 소리도 안 나는 셈이다.
   *
   * 지시문을 쓰지 않는다는 원칙(§5) 때문에 "눌러서 들으세요"를 띄울 수 없다.
   * 대신 **버튼이 기다리는 모양이 된다** — 강조 테두리에 맥박. 눌러야 한다는
   * 것을 글자 없이 말한다.
   */
  const [blocked, setBlocked] = useState(false)

  const play = useCallback((audio: HTMLAudioElement | null = audioRef.current) => {
    if (!audio) return

    taps.current += 1
    // 음높이는 유지한다. 이게 없으면 느린 재생에서 목소리가 굵어져
    // 발음 참조로 쓸 수 없다. 기본값이 true지만 명시한다
    audio.preservesPitch = true
    audio.playbackRate = taps.current % 2 === 1 ? 1 : SLOW_RATE

    setPlaying(true)
    audio.currentTime = 0
    // 실패해도 버튼을 죽이지 않는다. 재생이 막히거나(자동재생 정책) 중단되는
    // 것은(NotAllowedError · AbortError) 파일 문제가 아니다. 파일이 없다는
    // 판정은 아래 'error' 이벤트 하나가 맡는다 — 그게 유일한 근거다
    audio
      .play()
      .then(() => setBlocked(false))
      .catch((error: unknown) => {
        setPlaying(false)
        if ((error as { name?: string })?.name === 'NotAllowedError') setBlocked(true)
      })
  }, [])

  useEffect(() => {
    // 파일이 없으면 조용히 비활성. 발음이 아직 없는 개념은 정상이다.
    //
    // preload='none'이면 요청이 안 나가서 error도 안 뜬다 — 파일이 없어도
    // 버튼이 활성으로 보이다가 누른 뒤에야 실패한다. metadata는 헤더만
    // 받아오므로 없는 파일을 미리 걸러낸다. 있으면 재생도 빨라진다.
    const audio = new Audio(src ?? audioPath(slug, lang))
    audio.preload = 'metadata'
    audio.addEventListener('error', () => setAvailable(false))
    audio.addEventListener('ended', () => setPlaying(false))
    audioRef.current = audio

    // 자동 재생은 **이 오디오에** 건다. 이 효과 밖에 두면 정리 함수의 pause()가
    // 방금 시작한 재생을 끊어버린다 — 개발 모드의 이중 실행에서 실제로 그랬고,
    // 첫 오디오는 중단되고 두 번째 오디오는 이미 울렸다고 판단해 건너뛰어
    // 아무 소리도 나지 않았다. 오디오와 그 재생의 수명을 같이 둔다.
    taps.current = 0
    if (autoPlay) play(audio)

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [slug, lang, src, autoPlay, play])

  const disabled = !enabled || !available

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={`${label} 발음 듣기`}
      onClick={() => play()}
      // 발음 파일이 없어도 사라지지 않는다. 자리가 비면 옆 글자가 밀리므로
      // 테두리와 배경은 그대로 두고 아이콘만 흐려진다. (brand-spec.md)
      className={`
        grid size-11 shrink-0 place-items-center rounded-pill
        border border-line bg-surface
        transition active:scale-95
        disabled:cursor-default disabled:active:scale-100
        ${blocked ? 'motion-safe:animate-pulse' : ''}
        ${playing || blocked ? 'border-accent text-accent' : disabled ? 'text-sub/45' : 'text-ink'}
      `}
    >
      <AudioLines className="size-5" strokeWidth={1.8} aria-hidden />
    </button>
  )
}
