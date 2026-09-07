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
  'action.json': '9bacc42a2e85',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '443c3a76e4ef',
  'city.json': 'e7c98b47957b',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '232f57373984',
  'family.json': '4c2e0154a630',
  'food.json': 'd6803ecc84e9',
  'home.json': '3bd25eb250fe',
  'idea.json': '99ff88f568af',
  'job.json': '1e5f5e63ed6e',
  'nature.json': '1956a84f1617',
  'number.json': '68c674a9ce17',
  'office.json': '4ad4185102f7',
  'quality.json': '9712d8b5363e',
  'scene.json': 'd8c188abec28',
  'school.json': 'd72c1e78fdab',
  'sport.json': '71bd2825e16c',
  'time.json': '99063a0159a2',
  'transport.json': '36eeabf961a6',
  'travel.json': '30116c4cbb79',
}
