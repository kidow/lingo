'use client'

import { Play, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * 디버그 목록의 재생 버튼. 개발 화면 전용이다.
 *
 * 앱의 SayButton을 쓰지 않는다. 그쪽은 파일 존재를 스스로 확인하려고 단어마다
 * preload='metadata' 요청을 하나씩 내는데, 여기서는 서버가 이미 fs로 다 훑어
 * 알려줬다. 목록이 수백 줄이 되어도 열기만 해서는 요청이 나가지 않는다.
 *
 * 한 번에 하나만 울린다. 앞엣것을 멈추고 다음을 눌러야 연속으로 검수할 수 있다.
 *
 * **파일이 없으면 눌리지 않는다.** 서버가 이미 fs로 훑어 알고 있는데도 버튼을
 * 열어 두면, 눌렀을 때 브라우저가 `NotSupportedError`("지원되는 소스가 없음")를
 * 던진다 — 없는 파일을 재생하려 한 것뿐인데 오류 화면이 뜬다.
 */
let current: HTMLAudioElement | null = null

export function DebugPlay({ src, missing = false }: { src: string; missing?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      if (current === audioRef.current) current = null
    }
  }, [])

  const toggle = () => {
    if (missing) return
    const audio = (audioRef.current ??= new Audio(src))
    audio.onended = () => setPlaying(false)

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    if (current && current !== audio) current.pause()
    current = audio
    audio.currentTime = 0
    void audio.play().then(() => setPlaying(true))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={missing}
      aria-label={missing ? '발음 없음' : playing ? '정지' : '재생'}
      className="grid size-7 place-items-center rounded-pill border border-line bg-surface transition active:scale-95 disabled:cursor-default disabled:text-sub/40 disabled:active:scale-100"
    >
      {playing ? (
        <Square className="size-3.5 fill-current" strokeWidth={0} />
      ) : (
        <Play className="size-3.5 fill-current" strokeWidth={0} />
      )}
    </button>
  )
}
