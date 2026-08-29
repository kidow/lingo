'use client'

import { ChevronDown } from 'lucide-react'
import { LANGUAGE_LABEL, LANGUAGES } from '@/lib/lang'
import type { Language } from '@/lib/types'

/**
 * 화면 맨 위 고정 줄. 왼쪽에 학습 언어 하나뿐이다. (spec.md §3)
 *
 * 오랫동안 헤더를 두지 않았다. 화면이 하나뿐이라 이동할 곳이 없었기 때문이다.
 * 언어가 둘이 되면서 **고를 것**이 생겼고, 고를 것은 카드 안에 둘 수 없다 —
 * 카드는 넘기는 물건이라 설정이 섞이면 오터치가 난다.
 *
 * 그래서 헤더에는 언어만 있다. 탭도, 뒤로가기도, 메뉴도 없다.
 */
export function Header({
  lang,
  onChange,
}: {
  lang: Language
  onChange: (lang: Language) => void
}) {
  return (
    <header className="flex h-14 shrink-0 items-center border-b border-line px-5">
      {/*
        네이티브 select를 투명하게 덮어씌운다. 모바일에서는 OS 피커가 그대로
        뜨고 키보드 조작과 접근성도 브라우저가 준다 — 목록이 둘뿐인데 직접
        만들 이유가 없다.
      */}
      <label className="relative inline-flex items-center gap-1">
        <span className="text-lg font-bold tracking-tight">{LANGUAGE_LABEL[lang]}</span>
        <ChevronDown className="size-4 text-sub" strokeWidth={2.5} aria-hidden />
        <select
          value={lang}
          onChange={(event) => onChange(event.target.value as Language)}
          aria-label="학습 언어"
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {LANGUAGES.map((value) => (
            <option key={value} value={value}>
              {LANGUAGE_LABEL[value]}
            </option>
          ))}
        </select>
      </label>
    </header>
  )
}
