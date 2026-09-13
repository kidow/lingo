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
  'action.json': '282a4df0077a',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '3b54bae67a55',
  'city.json': '7d5cb3ffacd5',
  'clothes.json': '757f4e99129a',
  'everyday.json': 'd26a42313bf3',
  'family.json': '6bff8d19b4c6',
  'food.json': 'd88a611d5034',
  'home.json': 'f94958c6f0b5',
  'idea.json': '278c38188675',
  'job.json': '07a13800b03a',
  'nature.json': '11e2b28ef469',
  'number.json': 'ef09d519ade6',
  'office.json': 'ca4780bbc3b4',
  'quality.json': '18196a6e82e3',
  'scene.json': '83b3d6c45004',
  'school.json': '72b59f4280cc',
  'sport.json': 'e3c645f37ccd',
  'time.json': 'ff42463d179f',
  'transport.json': 'b4f82e6d70cd',
  'travel.json': 'd80ece4ca1c6',
}
