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
  'action.json': '43146fb1101a',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '74ec44d9535a',
  'city.json': 'e8691fe7b762',
  'clothes.json': '26604d5de5e4',
  'everyday.json': 'ae81abc83e9e',
  'family.json': '6c9e2d413b7c',
  'food.json': '03f224813116',
  'home.json': '3f3a1c0f5e7f',
  'idea.json': 'f6a19b733ad3',
  'job.json': 'c4ce1a2398a7',
  'nature.json': 'ba83f634d47f',
  'number.json': '47cb2539f41d',
  'office.json': 'd28a78be981e',
  'quality.json': 'a9e9504919ef',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '1837f1828ed6',
  'sport.json': 'abacf313a00b',
  'time.json': '365c0dae001e',
  'transport.json': '7fda68264f83',
  'travel.json': '47462478b1ba',
}
