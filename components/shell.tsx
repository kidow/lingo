'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Feed } from './feed'
import { Header } from './header'
import type { Entry } from '@/lib/entries'
import {
  emptyProgress,
  loadProgress,
  masteredCount,
  masteryLabel,
  type Progress,
} from '@/lib/progress'
import { loadDeck, loadTrack, saveDeck, saveTrack } from '@/lib/settings'
import { DEFAULT_DECK, entriesForDeck, type DeckId } from '@/lib/deck'
import { DEFAULT_TRACK, trackOf, type TrackId } from '@/lib/track'

/**
 * 헤더 + 피드. 트랙 선택이 사는 곳이다. (spec.md §3)
 *
 * 서버는 어느 트랙을 볼지 모른다 — 설정이 localStorage에 있기 때문이다.
 * 그래서 **전 트랙의 출제 목록을 다 받아 두고** 클라이언트가 하나를 고른다.
 * 콘텐츠는 어차피 빌드 시점에 번들에 들어가 있어 추가 비용이 없다. (§8)
 *
 * 트랙이 바뀌면 Feed를 통째로 새로 만든다(`key`). 진도도 카드도 트랙별로
 * 갈라져 있으므로 이어붙이지 않고 처음부터 굴리는 편이 정확하다.
 *
 * 헤더의 숙련도도 여기서 산다. 진도는 Feed 안에 있고 헤더는 그 형제라
 * 둘의 공통 조상이 여기뿐이다. (spec.md §3)
 */
export function Shell({ entries }: { entries: Record<TrackId, Entry[]> }) {
  const [track, setTrack] = useState<TrackId>(DEFAULT_TRACK)
  const [deck, setDeck] = useState<DeckId>(DEFAULT_DECK)
  const [progress, setProgress] = useState<Progress>(emptyProgress)

  // 설정은 마운트 후에 읽는다. 서버가 그리는 첫 화면은 기본 트랙이다
  useEffect(() => {
    setTrack(loadTrack())
    setDeck(loadDeck())
  }, [])

  // 트랙이 바뀌면 여기서 바로 읽는다. Feed가 알려 주기를 기다리면 한 프레임
  // 동안 이전 트랙의 숙련도가 헤더에 남는다
  useEffect(() => setProgress(loadProgress(track)), [track])

  const change = useCallback((next: TrackId) => {
    setTrack(next)
    saveTrack(next)
  }, [])

  const changeDeck = useCallback((next: DeckId) => {
    setDeck(next)
    saveDeck(next)
  }, [])

  // 분모는 그 트랙에서 **출제 가능한** 개념 수다. TOEIC은 TSL 필터를 한 겹 더
  // 거치므로 다른 트랙보다 작다 (lib/entries.ts)
  const slugs = useMemo(
    () => entries[track].map((entry) => entry.concept.slug),
    [entries, track],
  )
  const mastery = masteryLabel(masteredCount(progress, slugs), slugs.length)

  /**
   * 덱은 걸러 보는 창이다. 진도는 트랙 하나로 두므로 숙련도 분모는 위 그대로다.
   *
   * 표현이 하나도 없는 트랙에서는 탭을 세우지 않는다 — 눌러도 빈 피드가 되는
   * 자리를 남겨 둘 이유가 없다 (lib/deck.ts)
   */
  const hasPhrases = useMemo(
    () => entries[track].some((entry) => entry.concept.category === 'scene'),
    [entries, track],
  )
  // 표현이 없는 트랙에서는 저장된 값이 phrase여도 단어로 본다. 탭이 안 서는데
  // 거르기만 남으면 빈 피드가 된다 — TOEIC에서 실제로 그랬다
  const shownDeck = hasPhrases ? deck : DEFAULT_DECK
  const shown = useMemo(() => entriesForDeck(shownDeck, entries[track]), [shownDeck, entries, track])

  return (
    <div className="feed-root flex h-dvh flex-col">
      <Header
        track={track}
        onChange={change}
        mastery={mastery}
        deck={hasPhrases ? shownDeck : undefined}
        onDeck={hasPhrases ? changeDeck : undefined}
      />
      <Feed
        key={`${track}-${shownDeck}`}
        entries={shown}
        track={track}
        lang={trackOf(track).language}
        onProgress={setProgress}
      />
    </div>
  )
}
