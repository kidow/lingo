'use client'

import { useCallback, useEffect, useState } from 'react'
import { Feed } from './feed'
import { Header } from './header'
import type { Entry } from '@/lib/entries'
import { DEFAULT_LANGUAGE } from '@/lib/lang'
import { loadLanguage, saveLanguage } from '@/lib/settings'
import type { Language } from '@/lib/types'

/**
 * 헤더 + 피드. 언어 선택이 사는 곳이다. (spec.md §3)
 *
 * 서버는 어느 언어를 볼지 모른다 — 설정이 localStorage에 있기 때문이다.
 * 그래서 **전 언어의 출제 목록을 다 받아 두고** 클라이언트가 하나를 고른다.
 * 콘텐츠는 어차피 빌드 시점에 번들에 들어가 있어 추가 비용이 없다. (§8)
 *
 * 언어가 바뀌면 Feed를 통째로 새로 만든다(`key`). 진도도 카드도 언어별로
 * 갈라져 있으므로 이어붙이지 않고 처음부터 굴리는 편이 정확하다.
 */
export function Shell({ entries }: { entries: Record<Language, Entry[]> }) {
  const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE)

  // 설정은 마운트 후에 읽는다. 서버가 그리는 첫 화면은 기본 언어다
  useEffect(() => setLang(loadLanguage()), [])

  const change = useCallback((next: Language) => {
    setLang(next)
    saveLanguage(next)
  }, [])

  return (
    <div className="feed-root flex h-dvh flex-col">
      <Header lang={lang} onChange={change} />
      <Feed key={lang} entries={entries[lang]} lang={lang} />
    </div>
  )
}
