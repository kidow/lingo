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
  'body.json': '7f5e15bce95f',
  'city.json': '7f7f5e08fed1',
  'clothes.json': '4b6d05882dc7',
  'everyday.json': '0135b53e7b13',
  'family.json': '291c9709afda',
  'food.json': 'e8c3d284ae76',
  'home.json': '421becd6f6ce',
  'idea.json': 'c12c38fac8aa',
  'job.json': 'ce0025adf05e',
  'nature.json': 'e64ab35156c1',
  'number.json': '1a5125e6aff5',
  'office.json': 'a0e9a4a7d705',
  'quality.json': 'fce1b139e108',
  'scene.json': 'c8ba25307fca',
  'school.json': '35cd040d3a19',
  'sport.json': '8727e11451ec',
  'time.json': '19ff60b20003',
  'transport.json': 'b2535d9b6f1d',
  'travel.json': '73df310aa8bd',
}
