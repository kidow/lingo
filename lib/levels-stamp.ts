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
  'action.json': '4437e8dfd4e8',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '9c22bc6c7f6d',
  'city.json': '521b156adfbf',
  'clothes.json': '803575e5756e',
  'everyday.json': '30065eb1bb9a',
  'family.json': 'ebbc800d2e34',
  'food.json': '70e30c256ab1',
  'home.json': 'eb67a987a698',
  'idea.json': '417c16807807',
  'job.json': '2d495d2c97ef',
  'nature.json': '5f78a8cbcae5',
  'number.json': '4f522b757375',
  'office.json': '4b603cbe453b',
  'quality.json': '893ddb178e7d',
  'scene.json': 'c8ba25307fca',
  'school.json': '69f76aa98c5f',
  'sport.json': 'fa44de9de918',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '04fdc5c63b67',
}
