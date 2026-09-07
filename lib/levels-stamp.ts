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
  'action.json': 'fe4415f437e9',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '30fa86a12ce5',
  'city.json': '29a6ee6f3269',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '232f57373984',
  'family.json': '4c2e0154a630',
  'food.json': '23f8a196ac6a',
  'home.json': '3bd25eb250fe',
  'idea.json': '99ff88f568af',
  'job.json': '1e5f5e63ed6e',
  'nature.json': 'caef2b53a99e',
  'number.json': '68c674a9ce17',
  'office.json': 'fd4a82f83ccd',
  'quality.json': 'a021a2e4575d',
  'scene.json': '66833abf8a07',
  'school.json': '369db92f84c2',
  'sport.json': 'e476a8bef660',
  'time.json': '99063a0159a2',
  'transport.json': '36eeabf961a6',
  'travel.json': '7d5b2c150dae',
}
