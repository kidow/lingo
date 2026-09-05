/**
 * 등급이 콘텐츠를 따라왔는지 재는 지문. (spec.md §7)
 *
 * `pnpm levels`는 시험 목록을 조회해 낱말에 등급을 붙인다. 콘텐츠를 넣고 이걸
 * 안 돌리면 새 낱말에는 등급이 없다 — 카드에서 레벨 줄이 빠지고, 레벨별로
 * 고르는 학습자에게는 그 낱말이 아예 없는 것과 같다.
 *
 * 그런데 **조용히 어긋난다.** 등급이 없는 낱말은 원래도 많아서(목록에 없으면
 * 비운다) 비어 있는 것만 보고는 빠뜨린 것인지 원래 없는 것인지 알 수 없다.
 * 실제로 추상 축 아홉 배치 내내 levels를 빼먹었고, 160개가 등급 없이 들어간
 * 뒤에야 coverage 숫자가 안 오르는 것을 보고 알았다.
 *
 * 그래서 levels가 마지막으로 본 낱말의 지문을 적어 둔다. 표기가 바뀌거나
 * 개념이 늘면 지문이 달라지고, `pnpm check`가 그걸 보고 경고한다.
 *
 * 지문은 등급이 붙을 수 있는 여섯 언어의 **표기**만 본다. 예문이나 그림이
 * 바뀌었다고 등급을 다시 조회할 이유는 없다.
 *
 * `lib/audio-have.ts`와 같은 꼴이다 — 만들어서 커밋하고, 검사가 실물과
 * 대조한다. 캐시(.cache/)에 두면 새로 받은 사람에게는 늘 어긋난 것으로
 * 보이므로 레포에 넣는다.
 */
import { createHash } from 'node:crypto'
import type { Concept } from '../lib/types.ts'

/** 등급 목록이 있는 언어. 스페인어는 쓸 만한 공개 목록이 없어 빠진다 */
const GRADED = ['ja', 'zh', 'de', 'fr', 'en', 'ru'] as const

/** 그 파일의 낱말 표기를 한 줄로 줄인 값 */
export function fingerprint(concepts: Concept[]): string {
  const rows: string[] = []
  for (const concept of concepts)
    for (const lang of GRADED) {
      const word = concept.words?.[lang]
      if (word?.term) rows.push(`${concept.slug}\t${lang}\t${word.term}`)
    }
  // 개념 순서가 바뀌어도 같은 지문이 나오게 한다 — 순서는 등급과 무관하다
  rows.sort()
  return createHash('sha1').update(rows.join('\n')).digest('hex').slice(0, 12)
}

/** 커밋되는 목록 파일의 본문 */
export function stampSource(stamp: Record<string, string>): string {
  const rows = Object.keys(stamp)
    .sort()
    .map((file) => `  '${file}': '${stamp[file]}',`)
    .join('\n')
  return `/**
 * \`pnpm levels\`가 마지막으로 등급을 붙인 낱말의 지문. **생성물이다.**
 *
 *   pnpm levels        다시 만든다
 *
 * 낡으면 \`pnpm check\`가 경고한다 — 콘텐츠를 넣고 levels를 안 돌리면 새 낱말이
 * 등급 없이 남는데, 등급 없는 낱말은 원래도 많아 눈으로는 못 가린다.
 * 무엇을 재는지는 scripts/levels-stamp.ts에 적었다.
 */
export const LEVELS_STAMP: Readonly<Record<string, string>> = {
${rows}
}
`
}
