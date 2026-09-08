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
  'action.json': '86b30d798fd2',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '47465960063f',
  'city.json': 'e7c98b47957b',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '7e67556049d3',
  'family.json': '87877324a55e',
  'food.json': '9281febc860b',
  'home.json': '3bd25eb250fe',
  'idea.json': '99ff88f568af',
  'job.json': '1e5f5e63ed6e',
  'nature.json': '1956a84f1617',
  'number.json': 'd146f387eb93',
  'office.json': '4ad4185102f7',
  'quality.json': 'ee96a0a6873e',
  'scene.json': '8be6faa35830',
  'school.json': '8305e93bb5d6',
  'sport.json': '71bd2825e16c',
  'time.json': '7acf6d150829',
  'transport.json': '36eeabf961a6',
  'travel.json': '30116c4cbb79',
}
