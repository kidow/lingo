'use client'

import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useId } from 'react'
import { EXAM_KIND_LABEL, EXAM_SOURCES_CHECKED, type ExamSource } from '@/lib/exam-sources'

/**
 * 찾기 시트 빈 화면의 「기출·모의고사」. (spec.md §3, lib/exam-sources.ts)
 *
 * **참고 글 위에 선다.** 빈 칸은 「지금 트랙에서 펴 볼 것」의 자리이고, 시험
 * 준비하는 사람에게 제일 먼저 필요한 것이 문제다. 헤더 덱 탭에 다섯째로 세우는
 * 안은 버렸다 — JLPT는 탭이 이미 넷이라 375px를 넘는다. 찾기가 헤더를 떠난
 * 것과 같은 이유다.
 *
 * **누르면 바로 나가지 않는다.** 시트 안에서 범위·형식·비용·로그인을 먼저
 * 보여 주고 「사이트 열기」로 나간다. 로그인 벽이나 교재 보유 같은 조건은
 * 나가기 전에 알아야 헛걸음을 안 한다.
 *
 * 무료·유료는 배지로 가르지 않는다. 비용 칸이 이미 「회당 US$8.99」,
 * 「교재 부록」이라고 말하고, 배지가 둘이면 375px에서 이름이 잘린다.
 */
export function ExamSourceSection({
  sources,
  onOpen,
}: {
  sources: ExamSource[]
  onOpen: (source: ExamSource) => void
}) {
  const heading = useId()
  if (sources.length === 0) return null
  return (
    <section aria-labelledby={heading}>
      <h3 id={heading} className="px-1 pb-2 text-[13px] font-semibold text-sub">
        기출·모의고사
      </h3>
      <ul className="flex flex-col gap-2">
        {sources.map((source) => (
          <li key={source.id}>
            <button
              type="button"
              onClick={() => onOpen(source)}
              className="flex w-full items-center gap-3 rounded-ctrl border border-line bg-surface px-4 py-3 text-left transition active:scale-[.985]"
            >
              <span className="min-w-0 flex-1">
                <span className="flex min-w-0 items-center gap-1.5">
                  <KindBadge source={source} />
                  <span className="truncate text-[15px] font-semibold">{source.name}</span>
                </span>
                <span className="mt-0.5 block truncate text-[13px] text-sub">{meta(source)}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-sub" strokeWidth={2.5} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** 운영 주체 · 비용 · 벽. 목록 둘째 줄이다 */
function meta(source: ExamSource) {
  return [source.operator, source.cost, source.login].filter(Boolean).join(' · ')
}

/**
 * 무엇인지를 한 단어로. **「공식 기출」은 실제로 출제된 문항에만 붙는다**
 * (lib/exam-sources.ts) — 모의·예시를 기출이라 부르지 않는다
 */
function KindBadge({ source }: { source: ExamSource }) {
  const tone =
    source.kind === 'past'
      ? 'bg-ok-soft text-ok'
      : source.kind === 'mock'
        ? 'bg-pick text-accent'
        : 'bg-bg text-sub'
  return (
    <span className={`shrink-0 rounded-pill px-1.5 py-px text-[11px] font-semibold ${tone}`}>
      {EXAM_KIND_LABEL[source.kind]}
    </span>
  )
}

/**
 * 한 곳을 펼친 자리. 찾기 시트의 `Preview`와 같은 골격이다 — 위에 돌아가는
 * 줄, 아래는 굴러가는 본문 (components/search-sheet.tsx)
 */
export function ExamSourceDetail({
  source,
  back,
  onBack,
}: {
  source: ExamSource
  /** 돌아갈 자리의 이름 */
  back: string
  onBack: () => void
}) {
  const rows: [string, string][] = [
    ['운영', source.operator],
    ['범위', source.scope],
    ['형식', source.format],
    ['비용', source.cost],
    ...(source.login ? ([['들어가기', source.login]] as [string, string][]) : []),
    ...(source.until ? ([['마감', `${source.until}까지`]] as [string, string][]) : []),
    ['확인', EXAM_SOURCES_CHECKED],
  ]
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
        <KindBadge source={source} />
        <h3 className="mt-2 text-[17px] font-bold tracking-tight">{source.name}</h3>

        <dl className="mt-3 flex flex-col">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-3 border-t border-line py-2.5">
              <dt className="w-16 shrink-0 text-[13px] text-sub">{label}</dt>
              <dd className="min-w-0 flex-1 text-[14px] leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        {source.note && <p className="mt-3 text-sm leading-relaxed text-sub">{source.note}</p>}

        {/*
          새 창으로 연다. 앱으로 설치한 사람도 돌아올 자리를 잃지 않는다 —
          iOS 홈 화면 앱에서는 앱 안 브라우저로 뜨고 닫으면 이 시트로 돌아온다
        */}
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-12 items-center justify-center gap-1.5 rounded-ctrl bg-accent text-[15px] font-semibold text-accent-fg transition active:scale-[.985]"
        >
          사이트 열기
          <ExternalLink className="size-4" strokeWidth={2.5} aria-hidden />
        </a>
        {/*
          기관 사이트들이 링크 조건으로 「출처를 밝히고 제휴를 암시하지 말 것」을
          건다(Cervantes · FEI · JLPT). 문제를 우리가 싣지 않는다는 것도 여기서 말한다
        */}
        <p className="mt-3 text-xs leading-relaxed text-sub">
          {source.operator}의 사이트로 나갑니다. Lingo는 이곳과 제휴하지 않았고, 문제는 그 사이트에서 풉니다.
        </p>
      </div>
    </div>
  )
}
