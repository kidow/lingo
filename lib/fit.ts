/**
 * 정답 길이에 맞춘 글자 크기. (spec.md §5)
 *
 * 카드는 낱말 하나를 전제로 만들어졌다 — 정답이 42px, 보기가 22px, 보기는 2열이다.
 * `scene`(상황 표현)이 들어오면서 정답이 문장이 됐고, 같은 크기로는 넘친다.
 *
 * 분기를 카드 안에 흩지 않고 여기 모은다. 기준은 **글자 수**다. 품사가 아니라
 * 길이를 보는 이유는, 짧은 상황 표현(`すみません`)과 긴 명사(`ショッピングモール`)가
 * 실제로 섞여 있어서다. 카테고리로 나누면 둘 다 틀린 크기가 된다.
 */

/** 소개·빈칸 카드의 큰 정답 글자 */
export function answerSize(text: string): string {
  const n = [...text].length
  if (n <= 8) return 'text-[clamp(34px,10vw,42px)]'
  if (n <= 12) return 'text-[clamp(26px,7.5vw,32px)]'
  return 'text-[clamp(20px,5.5vw,24px)]'
}

/** 4지선다 보기 글자. 넷 중 가장 긴 것에 맞춘다 */
export function optionSize(options: string[]): string {
  const longest = Math.max(...options.map((o) => [...o].length))
  if (longest <= 6) return 'text-[22px]'
  if (longest <= 12) return 'text-[17px]'
  return 'text-[14px]'
}

/**
 * 보기를 2열로 둘까 1열로 둘까.
 *
 * 문장은 2열에 넣으면 서너 줄로 접혀 읽기 전에 지친다. 한 줄에 하나씩 쌓는다.
 */
export function optionColumns(options: string[]): 1 | 2 {
  return options.some((o) => [...o].length > 12) ? 1 : 2
}
