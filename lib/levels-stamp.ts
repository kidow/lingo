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
  'body.json': '2fe4e4b445be',
  'city.json': '927a73627842',
  'clothes.json': '02a153101a61',
  'everyday.json': 'f57dceff0d6a',
  'family.json': '29d284f402c8',
  'food.json': 'c6e0b69337cf',
  'home.json': '99f518fbffda',
  'idea.json': '7644c23548ea',
  'job.json': '25ae28e74e50',
  'kana.json': 'da39a3ee5e6b',
  'nature.json': 'f3db9dba43cc',
  'number.json': 'd3e9e3bfc52b',
  'office.json': '5a42855bdcd6',
  'quality.json': '4432ffaf066f',
  'scene.json': '21de2730b70a',
  'school.json': '1d2090862edc',
  'sport.json': '9c4d51de4a61',
  'time.json': '2a8d04f632a0',
  'transport.json': '29eb8c27b14a',
  'travel.json': 'b9e51628b6e1',
}
