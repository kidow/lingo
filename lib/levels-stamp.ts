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
  'body.json': '2cffb75e70eb',
  'city.json': 'a4b992334c28',
  'clothes.json': '803575e5756e',
  'everyday.json': 'e889731b1e78',
  'family.json': '291c9709afda',
  'food.json': 'e8c3d284ae76',
  'home.json': '80a0922fded2',
  'idea.json': '81873c423177',
  'job.json': 'ba680f327690',
  'nature.json': '7c0ceeec0ab2',
  'number.json': '30ba2d8d1d47',
  'office.json': 'f83f6c5abb60',
  'quality.json': '621154ae49a0',
  'scene.json': 'c8ba25307fca',
  'school.json': '1d2b3b6b22d5',
  'sport.json': '6c47bab1fbe1',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '73df310aa8bd',
}
