'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { CardImage, CardSheet, Feed, FeedCard } from './feed'
import { Header } from './header'
import { loadCorpus, type Corpus } from '@/lib/corpus'
import { entriesForTrack } from '@/lib/entries'
import {
  emptyProgress,
  loadProgress,
  masteredCount,
  masteryLabel,
  TRIVIA_LADDER,
  WORD_LADDER,
  type Progress,
} from '@/lib/progress'
import { loadDeck, loadTrack, saveDeck, saveTrack } from '@/lib/settings'
import { DEFAULT_DECK, entriesForDeck, type DeckId } from '@/lib/deck'
import { DEFAULT_TRACK, trackOf, type TrackId } from '@/lib/track'

/**
 * 헤더 + 피드. 트랙 선택이 사는 곳이다. (spec.md §3)
 *
 * 서버는 어느 트랙을 볼지 모른다 — 설정이 localStorage에 있기 때문이다.
 * 그래서 **읽을 것을 여기서 받아 온다.** 지금 트랙의 언어 한 벌이다
 * (lib/corpus.ts). 일곱을 다 싣던 시절에는 청크 하나가 11.5MB였고 그중
 * 70%가 보지도 않는 언어의 예문이었다. (§8)
 *
 * 서버가 트랙 일곱 벌을 prop으로 넘기던 시절도 있었다. 이 파일이
 * `'use client'`라 그 배열이 RSC 페이로드로 HTML에 직렬화돼 index.html이
 * 17.9MB였다. 서버만 아는 사실은 그림 파일이 있느냐 없느냐뿐이라 그것만
 * 받는다 (app/page.tsx).
 *
 * 트랙이 바뀌면 Feed를 통째로 새로 만든다(`key`). 진도도 카드도 트랙별로
 * 갈라져 있으므로 이어붙이지 않고 처음부터 굴리는 편이 정확하다.
 *
 * 헤더의 숙련도도 여기서 산다. 진도는 Feed 안에 있고 헤더는 그 형제라
 * 둘의 공통 조상이 여기뿐이다. (spec.md §3)
 */
export function Shell({
  undrawn,
}: {
  /** 그림이 아직 없어 피드에서 빼는 개념. 지금 열일곱이다 (app/page.tsx) */
  undrawn: string[]
}) {
  const [track, setTrack] = useState<TrackId>(DEFAULT_TRACK)
  const [deck, setDeck] = useState<DeckId>(DEFAULT_DECK)
  const [progress, setProgress] = useState<Progress>(emptyProgress)
  /**
   * 저장된 설정을 읽었는가.
   *
   * 읽기 전에는 **아무 트랙도 그리지 않는다.** 서버는 어느 트랙인지 모르므로
   * 첫 화면이 늘 기본 트랙(JLPT)인데, 마운트 직후 저장된 트랙으로 갈아 끼우면
   * HSK를 보던 사람에게 일본어 카드가 한 번 번쩍인다 — 트랙만 바뀌는 게
   * 아니라 카드와 그림과 숙련도가 통째로 갈린다.
   *
   * 서버와 클라이언트의 첫 그림이 똑같이 뼈대라 어긋남도 없다.
   */
  const [ready, setReady] = useState(false)
  /**
   * 지금 언어의 콘텐츠. 받기 전에는 `null`이라 뼈대가 선다.
   *
   * 트랙이 아니라 **언어**가 단위다 — HSK와 TOCFL은 같은 파일을 쓰고, 한 번
   * 받은 것은 다시 받지 않는다 (lib/corpus.ts).
   */
  const [corpus, setCorpus] = useState<Corpus | null>(null)
  /**
   * 못 받았는가. **빈 것과 가른다** — 콘텐츠가 아직 없는 것과 지금 못 받은
   * 것은 사용자가 할 일이 다르다 (lib/corpus.ts).
   */
  const [failed, setFailed] = useState(false)
  /** 다시 시도를 세는 값. 바뀌면 아래 효과가 다시 돈다 */
  const [attempt, setAttempt] = useState(0)

  // 설정은 마운트 후에 읽는다. localStorage는 서버에 없다
  useEffect(() => {
    setTrack(loadTrack())
    setDeck(loadDeck())
    setReady(true)
  }, [])

  // 트랙이 바뀌면 여기서 바로 읽는다. Feed가 알려 주기를 기다리면 한 프레임
  // 동안 이전 트랙의 숙련도가 헤더에 남는다
  useEffect(() => setProgress(loadProgress(track)), [track])

  /**
   * 언어가 바뀌면 새로 받는다. 받는 동안에는 **뼈대로 되돌린다** — 옛 언어의
   * 카드를 남겨 두면 헤더는 새 트랙인데 카드는 이전 언어인 화면이 된다.
   *
   * **설정을 읽기 전에는 아무것도 받지 않는다.** `track`의 첫 값은 저장된
   * 것이 아니라 기본 트랙이라, 그대로 두면 HSK를 보던 사람이 일본어 한 벌을
   * 받아 버리고 나서 중국어를 또 받았다 — 1.5~2.4MB가 통째로 버려진다.
   */
  const language = trackOf(track).language
  useEffect(() => {
    if (!ready) return
    let alive = true
    setCorpus(null)
    setFailed(false)
    void loadCorpus(language).then((next) => {
      if (!alive) return
      if (next) setCorpus(next)
      else setFailed(true)
    })
    return () => {
      alive = false
    }
  }, [ready, language, attempt])

  const change = useCallback((next: TrackId) => {
    setTrack(next)
    saveTrack(next)
  }, [])

  const changeDeck = useCallback((next: DeckId) => {
    setDeck(next)
    saveDeck(next)
  }, [])

  /**
   * 상식과 참고 글은 언어의 것이라 트랙이 아니라 **언어로** 갈린다
   * (lib/trivia.ts). 파일이 이미 언어별로 갈려 있어 여기서 거르지 않는다 —
   * 아직 안 쓴 언어는 빈 배열이고, 그러면 탭이 서지 않는다.
   */
  const trivia = corpus?.trivia ?? []
  const articles = corpus?.articles ?? []

  /**
   * 이 트랙에서 출제할 수 있는 것. 규칙은 lib/entries.ts가 갖는다.
   *
   * **그림이 있는 개념만 남긴다.** 단어 목록은 로드맵이라 그림보다 앞서
   * 쌓이는데(§7), 그림 없는 카드가 피드에 섞이면 학습이 아니라 빈칸 넘기기가
   * 된다. 어느 것이 비었는지는 서버가 빌드 때 fs로 보고 알려 준다.
   */
  const hidden = useMemo(() => new Set(undrawn), [undrawn])
  const trackEntries = useMemo(
    () =>
      corpus
        ? entriesForTrack(track, corpus.concepts).filter(
            (entry) => !hidden.has(entry.concept.slug),
          )
        : [],
    [track, corpus, hidden],
  )

  /**
   * 덱은 걸러 보는 창이다. 표현이 하나도 없는 트랙에서는 탭을 세우지 않는다 —
   * 눌러도 빈 피드가 되는 자리를 남겨 둘 이유가 없다 (lib/deck.ts)
   */
  const hasPhrases = useMemo(
    () => trackEntries.some((entry) => entry.concept.category === 'scene'),
    [trackEntries],
  )
  // 표현도 상식도 없는 트랙에서는 저장된 값이 무엇이든 단어로 본다. 탭이 안 서는데
  // 거르기만 남으면 빈 피드가 된다 — TOEIC에서 실제로 그랬다
  const decks = useMemo(
    () =>
      (['word', hasPhrases && 'phrase', trivia.length > 0 && 'trivia'] as const).filter(
        Boolean,
      ) as DeckId[],
    [hasPhrases, trivia.length],
  )
  const shownDeck = decks.includes(deck) ? deck : DEFAULT_DECK

  const shown = useMemo(
    () => (shownDeck === 'trivia' ? trivia : entriesForDeck(shownDeck, trackEntries)),
    [shownDeck, trackEntries, trivia],
  )

  /**
   * 숙련도의 분모.
   *
   * 낱말과 상식을 **한 줄에 합치지 않는다.** 세는 단위가 달라서 합치면 그 숫자가
   * 무엇의 비율인지 흐려지고, 낱말을 하나도 안 늘려도 상식을 풀어 퍼센트가
   * 오른다 (lib/deck.ts). 그래서 지금 보고 있는 쪽의 비율만 말한다.
   *
   * 낱말 쪽 분모는 표현까지 포함한 트랙 전체다 — 단어·표현은 진도를 나누지
   * 않기 때문이다. TOEIC은 TSL 필터를 한 겹 더 거치므로 다른 트랙보다 작다.
   */
  const keys = useMemo(
    () =>
      shownDeck === 'trivia'
        ? trivia.map((item) => item.key)
        : trackEntries.map((entry) => entry.key),
    [shownDeck, trivia, trackEntries],
  )
  const ladder = shownDeck === 'trivia' ? TRIVIA_LADDER : WORD_LADDER
  const mastery = masteryLabel(masteredCount(progress, keys, ladder), keys.length)

  if (!ready || (!corpus && !failed)) return <Skeleton />

  return (
    <div className="feed-root flex h-dvh flex-col">
      <Header
        track={track}
        onChange={change}
        mastery={mastery}
        decks={decks}
        deck={shownDeck}
        articles={articles}
        onDeck={changeDeck}
      />
      {/*
        헤더는 그대로 둔다. 트랙 드롭다운이 살아 있어야 한 언어를 못 받았을 때
        다른 트랙으로 옮겨 갈 수 있다 — 여기서 화면을 통째로 갈아 끼우면
        새로고침 말고는 길이 없다
      */}
      {failed ? (
        <Retry onRetry={() => setAttempt((n) => n + 1)} />
      ) : (
        <Feed
          key={`${track}-${shownDeck}`}
          entries={shown}
          track={track}
          lang={trackOf(track).language}
          ladder={ladder}
          ordered={shownDeck === 'trivia'}
          onProgress={setProgress}
        />
      )}
    </div>
  )
}

/**
 * 콘텐츠를 못 받았을 때 피드 자리에 서는 한 장.
 *
 * **"그림이 준비된 단어가 아직 없어요"와 갈라야 한다.** 그 말은 콘텐츠가 아직
 * 없다는 뜻이라 기다리라는 안내가 되는데, 여기서 필요한 것은 다시 시도하는
 * 일이다 (lib/corpus.ts).
 *
 * 카드와 **같은 골격**이다 — 넓은 화면 안내가 그런 것과 같은 이유로, 이
 * 제품에 있는 것은 카드뿐이다 (components/desktop-notice.tsx).
 *
 * 왜 못 받았는지는 말하지 않는다. 연결이 끊겼는지 파일이 없는지 브라우저는
 * 구별해 주지 않고, 어느 쪽이든 사용자가 할 일은 같다.
 */
function Retry({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="min-h-0 flex-1">
      <FeedCard>
        <CardImage />
        <CardSheet>
          <p className="text-lg font-semibold">단어를 불러오지 못했어요</p>
          <p className="-mt-2 text-sm text-sub">연결을 확인하고 다시 시도해 주세요</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-md grid h-11 place-items-center rounded-ctrl border border-line bg-surface px-5 text-[15px] font-semibold transition active:scale-[.985]"
          >
            다시 시도
          </button>
        </CardSheet>
      </FeedCard>
    </main>
  )
}

/**
 * 설정을 읽기 전에 세우는 뼈대. (spec.md §3)
 *
 * 첫 카드를 흉내 내지 않는다 — 글자 자리를 정확히 맞춰 봐야 다음 순간 다른
 * 낱말이 들어오고, 그 어긋남이 오히려 눈에 띈다. 헤더 한 줄과 그림 자리와
 * 시트 세 줄, 화면이 어떻게 나뉘는지까지만 말한다.
 *
 * 진짜 요소들과 같은 상자를 쓴다(`FeedCard`·`CardImage`·`CardSheet`). 뼈대가
 * 따로 치수를 들고 있으면 카드 높이를 고칠 때마다 여기가 조용히 어긋난다.
 *
 * 뼈대 자체는 읽히지 않는다. 글자 자리를 흉내 낸 회색 막대를 읽어 봐야
 * 소용이 없다.
 *
 * **다만 기다리는 중이라는 것은 말한다.** 예전에는 설정을 읽는 한 프레임이라
 * 알릴 것도 없었는데, 이제 이 자리에 콘텐츠를 받는 시간이 낀다
 * (lib/corpus.ts) — 느린 회선에서 스크린리더 사용자가 **아무것도 없는
 * 페이지**를 만나게 된다.
 */
/** 뼈대 조각 하나. 숨 쉬듯 흐려졌다 진해진다 — 멈춘 회색 덩어리는 고장으로 보인다 */
const BAR = 'bg-line motion-safe:animate-pulse'

function Skeleton() {
  return (
    <>
      <span role="status" className="sr-only">
        불러오는 중
      </span>
      <div className="feed-root flex h-dvh flex-col" aria-hidden>
        <header className="flex h-14 shrink-0 items-center border-b border-line px-5">
          {/* 트랙 이름 자리. 국기와 화살표까지 합친 너비다 */}
          <div className={`h-5 w-24 rounded-pill ${BAR}`} />
          {/* 덱 탭과 찾기가 서는 자리 (components/header.tsx) */}
          <div className={`ml-auto h-4 w-28 rounded-pill ${BAR}`} />
        </header>

        {/* 피드의 스크롤 상자와 같은 자리를 잡는다. 카드가 h-full이라 이게 없으면
            헤더 높이만큼 아래로 흘러넘친다 (components/feed.tsx) */}
        <main className="min-h-0 flex-1">
          <FeedCard>
            {/* 그림 자리는 비워 둔다. bg-img-bg가 이미 그 자리의 색이다 */}
            <CardImage />
            <CardSheet>
              <div className={`h-9 w-2/5 rounded-ctrl ${BAR}`} />
              <div className={`h-4 w-1/4 rounded-pill ${BAR}`} />
              <div className={`h-5 w-1/3 rounded-pill ${BAR}`} />
            </CardSheet>
          </FeedCard>
        </main>
      </div>
    </>
  )
}
