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
  'everyday.json': '0b22c96c93f3',
  'family.json': 'ad059cecf78a',
  'food.json': 'f3e115810388',
  'home.json': '72daa0f21d26',
  'idea.json': 'c28b0b4bc8e0',
  'job.json': 'f00bf35e66f7',
  'nature.json': '72a2868c8ae6',
  'number.json': 'f4d80bd793f1',
  'office.json': 'd28a78be981e',
  'quality.json': 'a9e9504919ef',
  'scene.json': '4433a82da6b3',
  'school.json': '75a401dd03eb',
  'sport.json': '982553ca536b',
  'time.json': '365c0dae001e',
  'transport.json': '7fda68264f83',
  'travel.json': '47462478b1ba',
}
