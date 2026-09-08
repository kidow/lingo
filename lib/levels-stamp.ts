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
  'action.json': 'bd5a5b635ce9',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'd249462808e7',
  'city.json': '5c81fa603021',
  'clothes.json': 'f38f99daf019',
  'everyday.json': 'e8191eb811fe',
  'family.json': 'a7101c863433',
  'food.json': '700f64ef8ae8',
  'home.json': '96dfa01fb6f9',
  'idea.json': '657c2bcab403',
  'job.json': '4a1abb0220c0',
  'nature.json': 'dbb9a5761ba4',
  'number.json': '890cc6053d03',
  'office.json': 'a0d3e534a175',
  'quality.json': '644f3e01ffbc',
  'scene.json': '41bfa116fcfe',
  'school.json': '703638003b0c',
  'sport.json': 'e326022b1fbb',
  'time.json': '9841307a40fe',
  'transport.json': '03d487e95b5d',
  'travel.json': '79078c0e9263',
}
