'use client'

import { useState, type ReactNode } from 'react'

/**
 * 점검 화면의 표들을 갈아 끼운다 — 단어·상식·의심 문항. (spec.md §7)
 *
 * 셋은 세는 단위가 다르다. 단어 표는 개념 × 트랙이 한 줄, 상식 표는 노트
 * 하나가 한 줄, 의심 문항 표는 문항 하나가 한 줄이다. 한 화면에 겹쳐 놓으면
 * 어느 숫자가 무엇의 숫자인지 흐려져서 자리를 나눈다 — 피드의 덱 탭과 같은
 * 이유다 (lib/deck.ts).
 *
 * **숨기지 않고 갈아 끼운다.** 개념 표는 보이는 줄만 그리느라 스크롤러의
 * 실제 높이를 재는데(components/debug-table.tsx), CSS로 숨기면 그 높이가
 * 0이 되어 아무 줄도 안 그려진다. 떼었다 붙이면 붙는 순간 다시 잰다.
 */
export function DebugTabs({
  words,
  trivia,
  suspects,
}: {
  words: ReactNode
  trivia: ReactNode
  suspects: ReactNode
}) {
  const [tab, setTab] = useState<'words' | 'trivia' | 'suspects'>('words')

  return (
    <>
      <div className="mb-3 flex shrink-0 items-center gap-2 text-[15px]">
        {(
          [
            ['words', '단어'],
            ['trivia', '상식'],
            ['suspects', '의심 문항'],
          ] as const
        ).map(([id, label], i) => (
          <span key={id} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-line">|</span>}
            <button
              type="button"
              aria-pressed={tab === id}
              onClick={() => setTab(id)}
              className={`rounded-ctrl transition ${tab === id ? 'font-bold' : 'text-sub'}`}
            >
              {label}
            </button>
          </span>
        ))}
      </div>

      {tab === 'words' ? words : tab === 'trivia' ? trivia : suspects}
    </>
  )
}
