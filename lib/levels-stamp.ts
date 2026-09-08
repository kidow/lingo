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
  'action.json': '9c45fcd619c6',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'f1f68048b0b4',
  'city.json': 'a5c34ebc3a8e',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': 'c5c8cfe536ad',
  'family.json': '69fba9a1912a',
  'food.json': '9281febc860b',
  'home.json': '3f8137dd3d26',
  'idea.json': 'a71ffd5b2818',
  'job.json': '166fa36d9113',
  'nature.json': 'cf8e3f09405a',
  'number.json': '4ffdc27a655d',
  'office.json': 'e7afc1ddd5d4',
  'quality.json': 'e1b26a17456d',
  'scene.json': '537c5c43b033',
  'school.json': '86638e798eaa',
  'sport.json': 'b2f07de51949',
  'time.json': '98206ce1ec66',
  'transport.json': '36eeabf961a6',
  'travel.json': '9c763d5a302b',
}
