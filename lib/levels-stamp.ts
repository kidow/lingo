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
  'action.json': '9a50aa28b952',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '3c10402499d0',
  'city.json': '7512f0de3bed',
  'clothes.json': '94179b8bc211',
  'everyday.json': '4b6e4a7100b6',
  'family.json': 'def151a99143',
  'food.json': 'b0a26aa12878',
  'home.json': '47a32ef8eeca',
  'idea.json': '50dfd77c0210',
  'job.json': '905c9241b938',
  'kana.json': 'da39a3ee5e6b',
  'nature.json': '229971beb988',
  'number.json': 'd3e9e3bfc52b',
  'office.json': '4bf8edbaa815',
  'quality.json': 'e1b59249b3d4',
  'scene.json': '21de2730b70a',
  'school.json': '74b1095f1d53',
  'sport.json': '121f739af3c9',
  'time.json': '2a8d04f632a0',
  'transport.json': '5111c077abad',
  'travel.json': 'b9e51628b6e1',
}
