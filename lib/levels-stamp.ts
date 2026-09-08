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
  'action.json': '006012ef8949',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'ff269a13fa4b',
  'city.json': 'a5c34ebc3a8e',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '6fe95fc99719',
  'family.json': 'b5840d6a4acf',
  'food.json': '9281febc860b',
  'home.json': '143450aa9df0',
  'idea.json': 'a71ffd5b2818',
  'job.json': '166fa36d9113',
  'nature.json': 'd95334d1a209',
  'number.json': '4ffdc27a655d',
  'office.json': '4e4e25686fb7',
  'quality.json': '723efa02d0f7',
  'scene.json': '2ce389803303',
  'school.json': '0d3fdb5cbbf6',
  'sport.json': '71bd2825e16c',
  'time.json': '98206ce1ec66',
  'transport.json': '36eeabf961a6',
  'travel.json': '9c763d5a302b',
}
