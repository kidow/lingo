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
  'action.json': 'adb97d051c02',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '4ebecd68bbf6',
  'city.json': '5b5d6e25671f',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '232f57373984',
  'family.json': '4c2e0154a630',
  'food.json': '2c16ea8dac92',
  'home.json': '395a2a4677ac',
  'idea.json': '99ff88f568af',
  'job.json': '1e5f5e63ed6e',
  'nature.json': 'b1cb19e23c1f',
  'number.json': '1fa1ab078d82',
  'office.json': 'fd4a82f83ccd',
  'quality.json': '98f608d09cb7',
  'scene.json': '239cfe2260d5',
  'school.json': '86692945e1e7',
  'sport.json': 'd30e97d608ab',
  'time.json': '99063a0159a2',
  'transport.json': 'c69aed8d344d',
  'travel.json': '70f1d3e0c4fb',
}
