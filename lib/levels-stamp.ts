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
  'action.json': 'eb3f5577b598',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '3b54bae67a55',
  'city.json': '5f7372d2020f',
  'clothes.json': '215fac81522a',
  'everyday.json': 'cd640182fe7e',
  'family.json': 'c0fbb0761694',
  'food.json': '97161b5fa757',
  'home.json': '619911051eba',
  'idea.json': '6e1128b5ab1c',
  'job.json': 'a691452cf4e0',
  'nature.json': '1f0501ff3c24',
  'number.json': 'ef09d519ade6',
  'office.json': '89108d125682',
  'quality.json': '1b2298422dab',
  'scene.json': '83b3d6c45004',
  'school.json': '13ca86a521d9',
  'sport.json': 'e3c645f37ccd',
  'time.json': '1b0d3de954ee',
  'transport.json': '62e17bdcc4d4',
  'travel.json': 'db635dc7b84b',
}
