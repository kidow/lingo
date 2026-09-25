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
  'action.json': '2ad81fe1ea62',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '2fe4e4b445be',
  'city.json': '927a73627842',
  'clothes.json': '02a153101a61',
  'everyday.json': '905e32a85341',
  'family.json': '29d284f402c8',
  'food.json': '758cd7dfa544',
  'home.json': '95881e9f65dd',
  'idea.json': '7644c23548ea',
  'job.json': '25ae28e74e50',
  'kana.json': 'da39a3ee5e6b',
  'nature.json': 'f3db9dba43cc',
  'number.json': 'd3e9e3bfc52b',
  'office.json': '7b8302edb55b',
  'quality.json': '83d89375f56b',
  'scene.json': '21de2730b70a',
  'school.json': '1d2090862edc',
  'sport.json': '9c4d51de4a61',
  'time.json': '2a8d04f632a0',
  'transport.json': '1d7b13fb3204',
  'travel.json': 'b9e51628b6e1',
}
