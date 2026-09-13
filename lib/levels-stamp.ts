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
  'action.json': 'fe4067e27607',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'a0762a739742',
  'city.json': 'efce6afe0afb',
  'clothes.json': '757f4e99129a',
  'everyday.json': 'a09463f07412',
  'family.json': '6bff8d19b4c6',
  'food.json': '42752054c8c6',
  'home.json': '676425f8b199',
  'idea.json': 'f68a7698b9f5',
  'job.json': '5e3328dbb92b',
  'nature.json': '93efd99f35c3',
  'number.json': '479e9fd8ec58',
  'office.json': '0a34e535f43f',
  'quality.json': '8727f7f11144',
  'scene.json': '83b3d6c45004',
  'school.json': '2620c7788838',
  'sport.json': '1093027ce638',
  'time.json': '698cf443c77f',
  'transport.json': 'b4f82e6d70cd',
  'travel.json': 'a7dbc0b69faf',
}
