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

/**
 * 보기 상자의 높이. 열 수와 같은 기준(글자 수)을 쓴다.
 *
 * 1열은 보기 넷이 세로로 쌓이므로 상자 높이가 그대로 화면을 먹는다. 넷이
 * 다 크면 아래의 **모르겠어요가 접힌 자리로 밀려난다** — 모를 때 모른다고
 * 말할 자리가 사라지면 찍기가 늘고, 찍어서 맞힌 한 번이 다음 복습을 몇 주
 * 뒤로 민다 (§5). 그래서 1열일수록 상자를 낮춘다.
 *
 * 2열은 짧은 낱말이라 상자가 낮아도 눌리는 면적이 충분하다. 다만 손가락이
 * 닿는 최소 크기(44px)보다 작아지지 않게 둔다.
 */
export function optionBox(options: string[]): string {
  return optionColumns(options) === 1 ? 'min-h-[52px] py-2.5' : 'min-h-[60px] py-3'
}

/**
 * 빈칸 카드의 글자 줄. 낱말이 길면 한 줄에 안 들어간다.
 *
 * `convenient`는 열 글자인데 한 칸이 34px에 간격이 10px이라 440px을 먹는다 —
 * 폭 390px 화면에서 양끝이 잘려 나간다. 잘린 글자는 문제 자체가 안 보이는
 * 것이라 크기를 줄이고 **줄바꿈을 허용한다**. 두 줄이 되는 편이 잘리는 것보다
 * 언제나 낫다.
 *
 * 칸 너비를 함께 줄이는 이유는, 글자만 줄이면 빈칸 밑줄이 글자보다 훨씬 길어져
 * 어느 자리가 비었는지가 흐려지기 때문이다.
 */
export function blankRow(chars: string[]): { row: string; cell: string } {
  const n = chars.length
  if (n <= 8) return { row: 'gap-2.5', cell: 'min-w-[34px] text-[38px]' }
  if (n <= 12) return { row: 'gap-x-1.5 gap-y-2', cell: 'min-w-[24px] text-[30px]' }
  return { row: 'gap-x-1 gap-y-1.5', cell: 'min-w-[18px] text-[24px]' }
}
