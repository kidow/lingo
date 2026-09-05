'use client'

import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ArticleBody } from './article-body'
import { ConceptImage } from './concept-image'
import { SayButton } from './say-button'
import { loadSearchCorpus } from '@/lib/corpus'
import { bcp47, LANG_LABEL } from '@/lib/lang'
import { buildIndex, search, type Hit, type SearchIndex } from '@/lib/search'
import type { TriviaEntry } from '@/lib/trivia'
import type { Article, Concept, Language } from '@/lib/types'

/**
 * 찾아보는 자리 — 검색과 참고 글이 한 시트에 산다. (spec.md §3, §5)
 *
 * **빈 칸이 곧 참고 글 목록이다.** 둘을 따로 두었을 때 헤더에 아이콘이 둘
 * 나란히 섰는데, 참고 글은 트랙에 따라 서고 마는 반면 검색은 늘 서서 자리가
 * 들쭉날쭉했다. 게다가 검색창을 열면 아무것도 없는 화면이 먼저 나왔다 —
 * 마침 그 자리에 **지금 트랙에서 펴 볼 글**이 있다.
 *
 * **검색은 트랙을 안 가리고 참고 글은 가린다.** 어긋나 보이지만 하는 일이
 * 다르다 — 찾는 사람은 그것이 어느 덱에 있는지 모르는 채로 찾고(그래서 일곱
 * 언어를 다 뒤진다), 참고 글은 지금 공부하는 언어의 것을 펴 보는 자리다.
 * 그래서 `히라가나`라고 치면 트랙과 무관하게 그 글이 걸린다.
 *
 * **누르면 시트 안에서 펼친다.** 피드로 보내지 않는다 — 다음에 무엇이 나올지는
 * 엔진이 정하는 것이라(lib/engine.ts) 임의의 카드로 건너뛰는 길이 없고, 만들면
 * 그날의 복습 순서가 검색으로 흐트러진다. 여기서는 보기만 하고 나간다.
 *
 * 껍데기는 부르는 쪽이 씌운다 (components/search-drawer.tsx).
 */
/**
 * 색인은 앱이 사는 동안 한 벌만 만든다.
 *
 * 시트는 닫히면 통째로 사라져(vaul Portal) 열 때마다 다시 만들게 되는데,
 * 훑는 대상이 낡지 않으므로 한 번 만든 것을 붙들어 둔다.
 */
let cached: SearchIndex | null = null

/**
 * 훑을 것을 **시트를 열 때 받는다.** (lib/corpus.ts)
 *
 * 검색은 트랙을 안 가려서 일곱 언어가 다 필요한데, 그 한 벌을 번들에 구우면
 * 찾기를 한 번도 안 여는 사람까지 같이 문다. 예문이 빠진 판이라 전량이어도
 * 2.4MB고, 안 여는 사람에게는 0바이트다.
 *
 * 받는 동안에는 아무것도 그리지 않는다 — 자판이 이미 올라와 있고 목록 자리가
 * 잠깐 비는 것뿐이라, 여기에 뼈대를 세우면 오히려 깜빡임이 는다.
 */
function useIndex(): SearchIndex | null {
  const [index, setIndex] = useState<SearchIndex | null>(cached)

  useEffect(() => {
    if (cached) return
    let alive = true
    void loadSearchCorpus().then((corpus) => {
      // 못 받았으면 색인을 만들지 않는다. 빈 색인을 두면 「찾은 것이
      // 없습니다」가 뜨는데, 없는 것이 아니라 못 받은 것이다 (lib/corpus.ts)
      if (!corpus) return
      cached ??= buildIndex(corpus.concepts, corpus.trivia, corpus.articles)
      if (alive) setIndex(cached)
    })
    return () => {
      alive = false
    }
  }, [])

  return index
}

export function SearchSheet({
  trackArticles,
}: {
  /** 빈 칸일 때 세울 것 — 지금 트랙의 글만 */
  trackArticles: Article[]
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Hit | null>(null)

  const index = useIndex()
  const hits = useMemo(() => (index ? search(index, query) : []), [index, query])

  // 돌아가는 자리 이름이 갈린다 — 친 게 있으면 결과 목록이고, 비었으면 참고 글이다
  if (open)
    return <Preview hit={open} back={query ? '결과' : '목록'} onBack={() => setOpen(null)} />

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-lg pb-3">
        {/*
          높이를 **못 박는다.** 지우기는 글자를 쳐야 나타나는데 그 버튼이
          손가락 크기(44px)를 가지면 창이 첫 글자에서 튄다 — 패딩으로 높이를
          정하면 안에 무엇이 서느냐에 따라 창이 달라진다. 44px은 어차피
          누르는 자리의 최소 크기라 여기 그대로 쓴다 (brand-spec.md)
        */}
        <div className="flex h-11 items-center gap-2 rounded-ctrl border border-line bg-surface px-3">
          <Search className="size-4 shrink-0 text-sub" strokeWidth={2.5} aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="단어 · 뜻 · 상식"
            aria-label="검색"
            className="min-w-0 flex-1 bg-transparent text-[15px] placeholder:text-sub"
          />
          {/* 지우기는 값이 있을 때만 자리를 잡는다. 빈 칸에 ✕가 서 있으면 무엇을
              지우라는 것인지 알 수 없다 */}
          {query && (
            <button
              type="button"
              aria-label="지우기"
              onClick={() => setQuery('')}
              // 아이콘 16px에 패딩 4px이면 24px이라 손가락에 모자란다.
              // 창이 이미 44px이므로 그 높이를 그대로 채운다
              className="-mr-2 grid size-11 shrink-0 place-items-center rounded-ctrl text-sub transition active:scale-[.985]"
            >
              <X className="size-4" strokeWidth={2.5} aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* 시트가 화면 바닥에 붙으므로 카드 시트와 같은 안전영역이 필요하다 (components/feed.tsx) */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pb-[calc(var(--spacing-lg)+env(safe-area-inset-bottom))]">
        {/*
          빈 칸에는 지금 트랙의 참고 글을 세운다. 낱말 목록을 미리 깔지 않는
          이유는 3,756개가 스크롤로 쏟아지기 때문이고, 참고 글은 많아야 두어
          편이라 그대로 목록이 된다.

          글이 없는 트랙(TOEIC)에서는 안내 한 줄만 남는다 — 자리를 비우면
          검색창만 덩그러니 뜬다
        */}
        {!query &&
          (trackArticles.length > 0 ? (
            <>
              <h3 className="px-1 pb-2 text-[13px] font-semibold text-sub">참고 글</h3>
              <ul className="flex flex-col gap-2">
                {trackArticles.map((article) => (
                  <li key={article.id}>
                    <Row
                      hit={{ kind: 'article', key: article.id, article }}
                      onOpen={() => setOpen({ kind: 'article', key: article.id, article })}
                      showTag={false}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Hint>단어와 상식을 한 번에 찾습니다. 초성으로도 됩니다.</Hint>
          ))}

        {/*
          **두 글자를 넘겨야 「없음」을 띄운다.** 한 글자씩 칠 때마다 「결과
          없음」이 깜빡이면 아직 치는 중인 사람을 재촉하는 꼴이 된다.

          **색인이 있어야 말한다.** 훑을 것을 받는 동안에도 `hits`는 빈
          배열이라, 이 조건에 색인을 넣지 않으면 아직 받는 중인데 「없습니다」
          라고 말하게 된다 — 있는 것을 없다고 하는 셈이다 (`useIndex`)
        */}
        {index && query.length > 2 && hits.length === 0 && <Hint>찾은 것이 없습니다.</Hint>}

        {hits.length > 0 && (
          <ul className="flex flex-col gap-2">
            {hits.map((hit) => (
              <li key={`${hit.kind}:${hit.key}`}>
                <Row hit={hit} onOpen={() => setOpen(hit)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="px-1 py-6 text-center text-sm text-sub">{children}</p>
}

/** 목록 한 줄. 검색 결과와 참고 글이 같은 모양을 쓴다 */
function Row({ hit, onOpen, showTag = true }: { hit: Hit; onOpen: () => void; showTag?: boolean }) {
  const [title, sub, rawTag] = rowText(hit)
  // 참고 글 목록에서는 머리글이 이미 「참고 글」이라 줄마다 되풀이하지 않는다
  const tag = showTag ? rawTag : null
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 rounded-ctrl border border-line bg-surface px-4 py-3 text-left transition active:scale-[.985]"
    >
      <span className="min-w-0 flex-1">
        <span className="font-jp block truncate text-[15px] font-semibold">{title}</span>
        {/*
          낱말 결과에서만 아랫줄이 외국어다 — 윗줄은 한국어 뜻이고, 상식과
          참고 글은 두 줄 다 한국어라 붙일 것이 없다 (lib/search.ts)
        */}
        {sub && (
          <span
            lang={hit.kind === 'word' && hit.lang ? bcp47(hit.lang) : undefined}
            className="font-jp mt-0.5 block truncate text-[13px] text-sub"
          >
            {sub}
          </span>
        )}
      </span>
      {/* 어느 언어의 것인지가 없으면 같은 뜻의 일곱 줄이 구별되지 않는다 */}
      {tag && <span className="shrink-0 text-[11px] text-sub">{tag}</span>}
      <ChevronRight className="size-4 shrink-0 text-sub" strokeWidth={2.5} aria-hidden />
    </button>
  )
}

function rowText(hit: Hit): [title: string, sub: string | null, tag: string | null] {
  if (hit.kind === 'word')
    return [
      hit.concept.meaning_ko,
      hit.text ?? null,
      hit.lang ? LANG_LABEL[hit.lang] : null,
    ]
  if (hit.kind === 'trivia')
    return [hit.trivia.question, hit.trivia.answer, `상식 · ${LANG_LABEL[hit.lang]}`]
  return [hit.article.title, hit.article.summary, '참고 글']
}

/**
 * 고른 것을 펼친 자리.
 *
 * 낱말은 **일곱 언어를 다 보여준다.** 트랙을 가리지 않고 찾았으니 결과도
 * 가리지 않는 것이 앞뒤가 맞고, 한 그림에 일곱 언어가 붙어 있다는 구조가
 * 여기서 제일 잘 드러난다 (spec.md §1).
 */
function Preview({ hit, back, onBack }: { hit: Hit; back: string; onBack: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-lg pb-3">
        <button
          type="button"
          onClick={onBack}
          className="-my-2 -ml-1.5 flex items-center gap-0.5 rounded-ctrl py-3 pr-2 pl-1 text-sm text-sub transition active:scale-[.985]"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} aria-hidden />
          {back}
        </button>
      </div>

      {/* 시트가 화면 바닥에 붙으므로 카드 시트와 같은 안전영역이 필요하다 (components/feed.tsx) */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pb-[calc(var(--spacing-lg)+env(safe-area-inset-bottom))]">
        {hit.kind === 'word' && <WordPreview concept={hit.concept} />}
        {hit.kind === 'trivia' && <TriviaPreview trivia={hit.trivia} />}
        {hit.kind === 'article' && <ArticleBody article={hit.article} />}
      </div>
    </div>
  )
}

function WordPreview({ concept }: { concept: Concept }) {
  const words = Object.entries(concept.words) as [Language, Concept['words'][Language]][]
  return (
    <>
      {/*
        `ConceptImage`는 `fill`이라 **크기가 정해진 부모**가 있어야 한다. 없으면
        절대 위치가 시트 밖으로 새어 화면을 통째로 덮는다.

        카드와 달리 여기서는 그림이 주인공이 아니다 — 찾은 것이 맞는지 눈으로
        확인하는 표지라 배너 높이면 충분하고, 그래야 일곱 언어가 접히지 않는다
      */}
      <div className="relative h-40 overflow-hidden rounded-card border border-line bg-surface">
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} />
      </div>
      <h3 className="mt-4 text-[17px] font-bold tracking-tight">{concept.meaning_ko}</h3>

      <dl className="mt-3 flex flex-col">
        {words.map(([lang, word]) => (
          <div key={lang} className="flex items-center gap-3 border-t border-line py-2.5">
            <dt className="w-14 shrink-0 text-[13px] text-sub">{LANG_LABEL[lang]}</dt>
            <dd className="flex min-w-0 flex-1 items-center gap-2">
              <span className="min-w-0">
                {/*
                  일곱 줄이 각자 다른 언어다. 줄마다 태그가 달라야 스크린리더가
                  제 소리로 읽는다 (lib/lang.ts)
                */}
                <span lang={bcp47(lang)} className="font-jp text-[15px] font-semibold">
                  {word!.term}
                </span>
                {/*
                  읽기와 로마자는 언어마다 있고 없다. 있는 것만 잇는다 (lib/lang.ts).
                  읽기(かな)는 그 언어지만 로마자는 아니라 한 줄에 섞여 있어
                  태그를 못 붙인다 — 소개 카드의 `Aside`가 둘을 갈라 놓는 자리다
                */}
                {(word!.reading || word!.romanization) && (
                  <span className="font-jp ml-2 text-[13px] text-sub">
                    {[word!.reading, word!.romanization].filter(Boolean).join(' · ')}
                  </span>
                )}
              </span>
              {/*
                발음은 시험이 아니라 **언어**의 것이라 일곱 줄이 각자 자기 소리를
                갖는다(§1). 파일이 없는 자리도 버튼이 사라지지 않고 흐려지기만
                하므로 줄 끝이 들쭉날쭉해지지 않는다 (components/say-button.tsx)
              */}
              <span className="ml-auto shrink-0">
                <SayButton slug={concept.slug} lang={lang} label={word!.term} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function TriviaPreview({ trivia }: { trivia: TriviaEntry['trivia'] }) {
  return (
    <>
      <h3 className="font-jp text-[17px] leading-relaxed font-bold">{trivia.question}</h3>
      {/*
        보기를 다 깔지 않는다. 여기는 푸는 자리가 아니라 확인하는 자리라
        정답만 있으면 되고, 오답 셋을 나란히 두면 무엇이 맞는지 흐려진다
      */}
      <p className="font-jp mt-3 text-[15px] font-semibold text-ok">{trivia.answer}</p>
      <p className="font-jp mt-2 text-sm leading-relaxed text-sub">{trivia.note}</p>
    </>
  )
}
