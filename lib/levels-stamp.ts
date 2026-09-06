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
  'action.json': 'db029d373f21',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '74ec44d9535a',
  'city.json': 'efc00974c2d0',
  'clothes.json': '26604d5de5e4',
  'everyday.json': '0b22c96c93f3',
  'family.json': '402200aed1d5',
  'food.json': 'd8812838cbe4',
  'home.json': '12a4807504d7',
  'idea.json': 'b7f4b1ba2672',
  'job.json': 'f00bf35e66f7',
  'nature.json': '72a2868c8ae6',
  'number.json': '8ea108f0cbea',
  'office.json': '5e42ad942f82',
  'quality.json': 'a9e9504919ef',
  'scene.json': '4433a82da6b3',
  'school.json': '75a401dd03eb',
  'sport.json': 'e8e1b87d1708',
  'time.json': '365c0dae001e',
  'transport.json': '7fda68264f83',
  'travel.json': '47462478b1ba',
}
