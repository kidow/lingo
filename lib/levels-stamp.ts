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
  'action.json': 'c5f9d45ffdb2',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '492bbcc54658',
  'city.json': 'f56b89d6679d',
  'clothes.json': '803575e5756e',
  'everyday.json': 'e889731b1e78',
  'family.json': '291c9709afda',
  'food.json': 'e8c3d284ae76',
  'home.json': '80a0922fded2',
  'idea.json': 'f923ea6c241a',
  'job.json': 'd98839720d1d',
  'nature.json': '7c0ceeec0ab2',
  'number.json': '30ba2d8d1d47',
  'office.json': '2d7e1e10582b',
  'quality.json': '862c1516d1fa',
  'scene.json': 'c8ba25307fca',
  'school.json': 'acb85772ba94',
  'sport.json': '5571282310f8',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '73df310aa8bd',
}
