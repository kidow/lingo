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
  'body.json': '83495d4f919b',
  'city.json': '9266da16bd64',
  'clothes.json': '803575e5756e',
  'everyday.json': 'e889731b1e78',
  'family.json': '291c9709afda',
  'food.json': 'e8c3d284ae76',
  'home.json': '421becd6f6ce',
  'idea.json': 'c12c38fac8aa',
  'job.json': 'ba680f327690',
  'nature.json': '7c0ceeec0ab2',
  'number.json': '30ba2d8d1d47',
  'office.json': 'ca4c2421e942',
  'quality.json': 'fce1b139e108',
  'scene.json': 'c8ba25307fca',
  'school.json': '95674aab9505',
  'sport.json': 'b1b4ddb077ea',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '73df310aa8bd',
}
