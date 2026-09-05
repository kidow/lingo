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
  'body.json': '59fa93429db2',
  'city.json': '5f542ca0b813',
  'clothes.json': '803575e5756e',
  'everyday.json': 'e889731b1e78',
  'family.json': 'ebbc800d2e34',
  'food.json': '77e744a3e554',
  'home.json': 'eb67a987a698',
  'idea.json': 'e6aac9cc5ba1',
  'job.json': '351da5ab7e10',
  'nature.json': '85771e32394f',
  'number.json': 'b4509b91ca35',
  'office.json': '6756f34260d7',
  'quality.json': '1a7f733d7561',
  'scene.json': 'c8ba25307fca',
  'school.json': 'ef0f2b71906a',
  'sport.json': '9a5bb468a43f',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '04fdc5c63b67',
}
