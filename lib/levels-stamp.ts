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
  'action.json': '3b2c7a8ea22d',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '039ae2447bf4',
  'city.json': '9a674f4c004d',
  'clothes.json': '6b7ffe8bbcb0',
  'everyday.json': '1774936fabfe',
  'family.json': '291c9709afda',
  'food.json': 'e8c3d284ae76',
  'home.json': 'b54f81a520f8',
  'idea.json': 'da540c9efc1a',
  'job.json': 'c1230bd26a30',
  'nature.json': 'e64ab35156c1',
  'number.json': '1a5125e6aff5',
  'office.json': 'edfe614980e7',
  'quality.json': 'fce1b139e108',
  'scene.json': 'c8ba25307fca',
  'school.json': '35cd040d3a19',
  'sport.json': '8727e11451ec',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '395cb391a2f9',
}
