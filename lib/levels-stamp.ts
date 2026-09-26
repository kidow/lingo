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
  'action.json': '9e78310a28bd',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'b2ce1c68f1da',
  'city.json': 'a07fd11c318d',
  'clothes.json': '94179b8bc211',
  'everyday.json': '487960ff33e3',
  'family.json': '29d284f402c8',
  'food.json': 'd45820effb72',
  'home.json': '1b9c63fa1260',
  'idea.json': '7644c23548ea',
  'job.json': '08879e86bc9e',
  'kana.json': 'da39a3ee5e6b',
  'nature.json': 'f3db9dba43cc',
  'number.json': 'd3e9e3bfc52b',
  'office.json': '4bf8edbaa815',
  'quality.json': 'e1b59249b3d4',
  'scene.json': '21de2730b70a',
  'school.json': 'd29914084a0d',
  'sport.json': '121f739af3c9',
  'time.json': '2a8d04f632a0',
  'transport.json': '5111c077abad',
  'travel.json': 'b9e51628b6e1',
}
