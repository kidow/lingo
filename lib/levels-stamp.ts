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
  'action.json': '46460f80bc64',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '4859ccc1815b',
  'city.json': 'b6c8699ff4ba',
  'clothes.json': 'f38f99daf019',
  'everyday.json': 'e8191eb811fe',
  'family.json': 'a7101c863433',
  'food.json': '700f64ef8ae8',
  'home.json': '96dfa01fb6f9',
  'idea.json': '1549f44d6808',
  'job.json': '4a1abb0220c0',
  'nature.json': '025267fd6f53',
  'number.json': '17f4cdb1d08f',
  'office.json': '53c4c37ef442',
  'quality.json': '41c55f99c593',
  'scene.json': '91de5dcc8fb7',
  'school.json': '8b60dbf13c09',
  'sport.json': '08afd7880163',
  'time.json': '9841307a40fe',
  'transport.json': 'e1428fce9084',
  'travel.json': '79078c0e9263',
}
