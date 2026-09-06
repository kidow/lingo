'use client'

import { useState } from 'react'
import data from '@/content/hanja/characters/g8.json'
import { HANJA_LADDER, hanjaEntries, masteredHanjaCount, type HanjaCharacter } from '@/lib/hanja'
import { loadProgress, masteryLabel } from '@/lib/progress'
import type { TrackId } from '@/lib/track'
import { Feed } from '../feed'
import { Header } from '../header'
import { HanjaSearch } from './search'

// 이 모듈은 트랙을 고른 뒤에만 로드한다. 외국어 코퍼스·음성은 요구하지 않는다.
const characters = data.characters as HanjaCharacter[]
const entries = hanjaEntries(characters)

export function HanjaShell({ onChange }: { onChange: (track: TrackId) => void }) {
  const [progress, setProgress] = useState(() => loadProgress('hanja'))
  return (
    <div className="feed-root flex h-dvh flex-col" lang="ko">
      <Header
        track="hanja"
        onChange={onChange}
        mastery={masteryLabel(masteredHanjaCount(progress, characters), characters.length)}
        search={<HanjaSearch characters={characters} />}
      />
      <Feed entries={entries} track="hanja" ladder={HANJA_LADDER} ordered onProgress={setProgress} />
    </div>
  )
}
