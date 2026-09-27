'use client'

import { useMemo, useState } from 'react'
import { HANJA_CHARACTERS as characters } from '@/lib/hanja-corpus'
import { examSourcesFor, localDay } from '@/lib/exam-sources'
import { HANJA_LADDER, hanjaEntries, masteredHanjaCount } from '@/lib/hanja'
import { loadProgress, masteryLabel } from '@/lib/progress'
import type { TrackId } from '@/lib/track'
import { Feed } from '../feed'
import { Header } from '../header'
import { HanjaSearch } from './search'

// 이 모듈은 트랙을 고른 뒤에만 로드한다. 외국어 코퍼스·음성은 요구하지 않는다.
const entries = hanjaEntries(characters)

export function HanjaShell({ onChange }: { onChange: (track: TrackId) => void }) {
  const [progress, setProgress] = useState(() => loadProgress('hanja'))
  // 한국어문회 기출이 찾기 시트의 급수 목록 위에 선다 (lib/exam-sources.ts)
  const examSources = useMemo(() => examSourcesFor('hanja', localDay()), [])
  return (
    <div className="feed-root flex h-dvh flex-col" lang="ko">
      <Header
        track="hanja"
        onChange={onChange}
        mastery={masteryLabel(masteredHanjaCount(progress, characters), characters.length)}
      />
      <Feed entries={entries} track="hanja" ladder={HANJA_LADDER} ordered onProgress={setProgress} />
      <HanjaSearch characters={characters} examSources={examSources} />
    </div>
  )
}
