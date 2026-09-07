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
  'action.json': 'cd4913ae2fab',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '31e4317b4dd3',
  'city.json': '35d9c0f94992',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '232f57373984',
  'family.json': '4c2e0154a630',
  'food.json': '2c16ea8dac92',
  'home.json': '395a2a4677ac',
  'idea.json': '6a0a681c0b44',
  'job.json': '023b5558daf0',
  'nature.json': 'b907342f9421',
  'number.json': '1fa1ab078d82',
  'office.json': '7a3ab69bc2f0',
  'quality.json': '3f52553470a5',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '86692945e1e7',
  'sport.json': 'b33cc16d66f7',
  'time.json': '99063a0159a2',
  'transport.json': 'a0ce33c759f5',
  'travel.json': '70f1d3e0c4fb',
}
