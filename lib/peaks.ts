import type { Language } from './types.ts'

/**
 * 낱말 소리의 파형. (spec.md §5)
 *
 * 듣기 카드의 그림 자리에 깔린다. 값은 `public/peaks/<lang>.json`에 미리 적혀
 * 있다 — 낱말 하나가 0~9 마흔 자다 (`node scripts/audio.ts peaks`).
 *
 * **브라우저에서 소리를 해석하지 않는다.** mp3는 R2에 있어 `fetch`가 CORS를
 * 타고(재생은 안 탄다), 카드가 뜰 때마다 디코딩하면 첫 그림이 늦는다.
 *
 * **번들에 싣지도 않는다.** 언어 하나가 230KB라 일곱을 실으면 1.6MB가 모든
 * 방문자에게 간다. 듣기 카드를 처음 만난 사람만, 그 언어 것만 한 번 받는다.
 */
/** 파일에 적힌 막대 수. scripts/audio.ts의 PEAK_BARS와 같아야 한다 */
export const PEAK_BARS = 40

/**
 * 언어별로 한 번만 받는다. 실패한 약속도 그대로 담아 둔다 — 없는 파일을
 * 카드마다 다시 찾아가면 듣기 카드 한 장에 요청이 하나씩 붙는다.
 */
const loaded = new Map<Language, Promise<Record<string, string>>>()

export function loadPeaks(lang: Language): Promise<Record<string, string>> {
  const cached = loaded.get(lang)
  if (cached) return cached

  const pending = fetch(`/peaks/${lang}.json`)
    .then((res) => (res.ok ? (res.json() as Promise<Record<string, string>>) : {}))
    // 파형이 없어도 카드는 성립한다. 소리가 문제고 파형은 그 소리의 그림일
    // 뿐이라, 못 받으면 조용히 기본 모양으로 돌아간다 (components/cards.tsx)
    .catch(() => ({}))
  loaded.set(lang, pending)
  return pending
}

/**
 * 적힌 줄을 0~1 마흔 개로 편다. 글자가 모자라거나 남으면 버린다 — 반쯤
 * 그려진 파형은 그 낱말의 모양이 아니다.
 */
export function barsOf(row: string | undefined): number[] | null {
  if (!row || row.length !== PEAK_BARS) return null
  const bars: number[] = []
  for (const ch of row) {
    const value = Number(ch)
    if (!Number.isInteger(value)) return null
    bars.push(value / 9)
  }
  return bars
}
