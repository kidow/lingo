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
  'body.json': 'f9a394d21d28',
  'city.json': 'd78d387ac057',
  'clothes.json': 'a205cb4ac2c4',
  'everyday.json': '76feeb375ab8',
  'family.json': '97095bbb03f0',
  'food.json': '82e4b48d4b3d',
  'home.json': 'fc011f2f7902',
  'idea.json': '10b75335d1c6',
  'job.json': 'c1230bd26a30',
  'nature.json': '4797c21a5f58',
  'number.json': '1a5125e6aff5',
  'office.json': '07f529fe0f5f',
  'quality.json': 'fce1b139e108',
  'scene.json': 'c8ba25307fca',
  'school.json': 'd3a0a8b0decb',
  'sport.json': 'fb11673f274b',
  'time.json': '19ff60b20003',
  'transport.json': '2f04dd86c643',
  'travel.json': '45be0f3ab89b',
}
