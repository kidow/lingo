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
  'action.json': '92a9424c928a',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '5a584b2359cc',
  'city.json': '4f2bec917fd7',
  'clothes.json': 'f38f99daf019',
  'everyday.json': 'bc997f79fc9b',
  'family.json': 'a7101c863433',
  'food.json': 'f2fcff34dc82',
  'home.json': '0d88cc261da3',
  'idea.json': '657c2bcab403',
  'job.json': '135157cb80bf',
  'nature.json': 'e3a4c2bae0d4',
  'number.json': '4ffdc27a655d',
  'office.json': '0647b700ff8e',
  'quality.json': '287294519d1c',
  'scene.json': 'cd0578dce172',
  'school.json': '4f01281eb786',
  'sport.json': 'e326022b1fbb',
  'time.json': '9841307a40fe',
  'transport.json': '03d487e95b5d',
  'travel.json': 'd1df1c0650c2',
}
