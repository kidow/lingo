/**
 * `pnpm levels`가 마지막으로 등급을 붙인 낱말의 지문. **생성물이다.**
 *
 *   pnpm levels        다시 만든다
 *
 * 낡으면 `pnpm check`가 경고한다 — 콘텐츠를 넣고 levels를 안 돌리면 새 낱말이
 * 등급 없이 남는데, 등급 없는 낱말은 원래도 많아 눈으로는 못 가린다.
 * 무엇을 재는지는 scripts/levels-stamp.ts에 적었다.
 */
export const LEVELS_STAMP: Readonly<Record<string, string>> = {
  'action.json': 'd312cb103449',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '3b54bae67a55',
  'city.json': 'a600dacfee07',
  'clothes.json': '757f4e99129a',
  'everyday.json': 'b5b34c71f5e1',
  'family.json': '4780f9e7b5b0',
  'food.json': 'd88a611d5034',
  'home.json': '619911051eba',
  'idea.json': '77fb5073019e',
  'job.json': '53807502875b',
  'nature.json': 'dc8a327db49b',
  'number.json': 'ef09d519ade6',
  'office.json': '0229c34b7790',
  'quality.json': '1b2298422dab',
  'scene.json': '83b3d6c45004',
  'school.json': '13ca86a521d9',
  'sport.json': 'e3c645f37ccd',
  'time.json': '1b0d3de954ee',
  'transport.json': 'b4f82e6d70cd',
  'travel.json': 'd80ece4ca1c6',
}
