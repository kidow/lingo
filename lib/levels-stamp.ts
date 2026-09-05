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
  'body.json': 'd9f362001d7d',
  'city.json': '57983ea1c57b',
  'clothes.json': '803575e5756e',
  'everyday.json': 'e889731b1e78',
  'family.json': '291c9709afda',
  'food.json': '80c5a4502abd',
  'home.json': 'eb67a987a698',
  'idea.json': 'f923ea6c241a',
  'job.json': 'd98839720d1d',
  'nature.json': '85771e32394f',
  'number.json': '30ba2d8d1d47',
  'office.json': '83f21f15724c',
  'quality.json': '862c1516d1fa',
  'scene.json': 'c8ba25307fca',
  'school.json': '81766d9c726a',
  'sport.json': 'be8cd1045529',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '73df310aa8bd',
}
