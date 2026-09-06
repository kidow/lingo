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
  'body.json': 'a68d878cefc7',
  'city.json': 'd2a917d68bdd',
  'clothes.json': '26604d5de5e4',
  'everyday.json': '46c20376a380',
  'family.json': '0f3ba7ba3751',
  'food.json': '2280d8e22765',
  'home.json': 'fb3cb113f830',
  'idea.json': '29b5a7742636',
  'job.json': 'caf46ac36cf8',
  'nature.json': '972dee0598e0',
  'number.json': '48f105dcd7ac',
  'office.json': 'bc7371c14115',
  'quality.json': '6c96c9dcab4c',
  'scene.json': '4433a82da6b3',
  'school.json': 'ec62d41816fe',
  'sport.json': 'a47ac8a8b65b',
  'time.json': '365c0dae001e',
  'transport.json': '4d011d7feea7',
  'travel.json': 'a45aaab8024e',
}
