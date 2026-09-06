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
  'action.json': '3b2c7a8ea22d',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'e7b55590e3c2',
  'city.json': '695c4cd1df94',
  'clothes.json': '26604d5de5e4',
  'everyday.json': '0b22c96c93f3',
  'family.json': '60e2b76be387',
  'food.json': '2280d8e22765',
  'home.json': '307ebdd9e91e',
  'idea.json': 'b4eac33ee230',
  'job.json': 'f00bf35e66f7',
  'nature.json': '612f1eb405b1',
  'number.json': '79b467cd1660',
  'office.json': 'd42ef3fdce32',
  'quality.json': '6c96c9dcab4c',
  'scene.json': '4433a82da6b3',
  'school.json': '328187d69585',
  'sport.json': '8d7fb7a24323',
  'time.json': '365c0dae001e',
  'transport.json': 'ffc339295f72',
  'travel.json': 'a45aaab8024e',
}
