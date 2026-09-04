'use client'

import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ArticleBody } from './article-sheet'
import { ConceptImage } from './concept-image'
import { LANG_LABEL } from '@/lib/lang'
import { buildIndex, search, type Hit, type SearchIndex } from '@/lib/search'
import type { TriviaEntry } from '@/lib/trivia'
import type { Article, Concept, Language } from '@/lib/types'

/**
 * 전역 검색. (spec.md §3, §5)
 *
 * **트랙을 가리지 않는다.** JLPT를 보고 있어도 `커피`를 치면 일곱 언어가 다
 * 걸리고 상식·참고 글까지 함께 선다 — 찾는 사람은 그것이 어느 덱에 있는지
 * 모르는 채로 찾기 때문이다.
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
 * 접는 일이 6만 번이라 만드는 데 0.6초쯤 걸린다. 시트는 닫히면 통째로 사라져
 * (vaul Portal) 열 때마다 다시 만들게 되는데, 그러면 두 번째로 여는 사람이
 * 매번 그 0.6초를 다시 문다. 훑는 대상은 번들에 구워진 상수라(lib/content.ts)
 * 한 번 만든 것이 낡지 않는다.
 */
let cached: SearchIndex | null = null

function sharedIndex(concepts: Concept[], trivia: TriviaEntry[], articles: Article[]) {
  cached ??= buildIndex(concepts, trivia, articles)
  return cached
}

export function SearchSheet({
  concepts,
  trivia,
  articles,
}: {
  concepts: Concept[]
  trivia: TriviaEntry[]
  articles: Article[]
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Hit | null>(null)

  const index = useMemo(() => sharedIndex(concepts, trivia, articles), [concepts, trivia, articles])
  const hits = useMemo(() => search(index, query), [index, query])

  if (open) return <Preview hit={open} onBack={() => setOpen(null)} />

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-lg pb-3">
        <div className="flex items-center gap-2 rounded-ctrl border border-line bg-surface px-3 py-2.5">
          <Search className="size-4 shrink-0 text-sub" strokeWidth={2.5} aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="단어 · 뜻 · 상식"
            aria-label="검색"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-sub"
          />
          {/* 지우기는 값이 있을 때만 자리를 잡는다. 빈 칸에 ✕가 서 있으면 무엇을
              지우라는 것인지 알 수 없다 */}
          {query && (
            <button
              type="button"
              aria-label="지우기"
              onClick={() => setQuery('')}
              className="-mr-1 rounded-ctrl p-1 text-sub transition active:scale-[.985]"
            >
              <X className="size-4" strokeWidth={2.5} aria-hidden />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pb-lg">
        {/*
          아직 아무것도 안 친 자리에는 안내만 둔다. 결과 대신 목록을 미리
          깔면 3,756개가 스크롤로 쏟아진다
        */}
        {!query && <Hint>단어와 상식을 한 번에 찾습니다. 초성으로도 됩니다.</Hint>}

        {/*
          **두 글자를 넘겨야 「없음」을 띄운다.** 한 글자씩 칠 때마다 「결과
          없음」이 깜빡이면 아직 치는 중인 사람을 재촉하는 꼴이 된다
        */}
        {query.length > 2 && hits.length === 0 && <Hint>찾은 것이 없습니다.</Hint>}

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

/** 결과 한 줄. 참고 글 목록과 같은 모양이다 (components/article-sheet.tsx) */
function Row({ hit, onOpen }: { hit: Hit; onOpen: () => void }) {
  const [title, sub, tag] = rowText(hit)
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 rounded-ctrl border border-line bg-surface px-4 py-3 text-left transition active:scale-[.985]"
    >
      <span className="min-w-0 flex-1">
        <span className="font-jp block truncate text-[15px] font-semibold">{title}</span>
        {sub && <span className="font-jp mt-0.5 block truncate text-[13px] text-sub">{sub}</span>}
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
function Preview({ hit, onBack }: { hit: Hit; onBack: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-lg pb-3">
        <button
          type="button"
          onClick={onBack}
          className="-ml-1.5 flex items-center gap-0.5 rounded-ctrl py-1 pr-2 pl-1 text-sm text-sub transition active:scale-[.985]"
        >
          <ChevronLeft className="size-4" strokeWidth={2.5} aria-hidden />
          결과
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-lg pb-lg">
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
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        <ConceptImage slug={concept.slug} alt={concept.meaning_ko} />
      </div>
      <h3 className="mt-4 text-[17px] font-bold tracking-tight">{concept.meaning_ko}</h3>

      <dl className="mt-3 flex flex-col">
        {words.map(([lang, word]) => (
          <div key={lang} className="flex items-baseline gap-3 border-t border-line py-2.5">
            <dt className="w-14 shrink-0 text-[13px] text-sub">{LANG_LABEL[lang]}</dt>
            <dd className="min-w-0 flex-1">
              <span className="font-jp text-[15px] font-semibold">{word!.term}</span>
              {/* 읽기와 로마자는 언어마다 있고 없다. 있는 것만 잇는다 (lib/lang.ts) */}
              {(word!.reading || word!.romanization) && (
                <span className="font-jp ml-2 text-[13px] text-sub">
                  {[word!.reading, word!.romanization].filter(Boolean).join(' · ')}
                </span>
              )}
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
