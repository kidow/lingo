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
  'action.json': '126a3db5786e',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '99b88e4fe594',
  'city.json': '25755e7568fb',
  'clothes.json': 'f38f99daf019',
  'everyday.json': '6410046f7067',
  'family.json': 'a7101c863433',
  'food.json': '5f7dda771bc1',
  'home.json': '701eff807d66',
  'idea.json': 'b1e7d66272ae',
  'job.json': '166fa36d9113',
  'nature.json': 'f830858568f3',
  'number.json': '4ffdc27a655d',
  'office.json': 'fda439a8db4a',
  'quality.json': 'c0035e11d7e3',
  'scene.json': 'c58665812694',
  'school.json': '86638e798eaa',
  'sport.json': '66c38dda162e',
  'time.json': '9841307a40fe',
  'transport.json': '9ecee59a7c60',
  'travel.json': 'd5e2a54fee21',
}
