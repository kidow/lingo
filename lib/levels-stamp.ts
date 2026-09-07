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
  'action.json': '00f8bef289d3',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'cdf16c8ed0ba',
  'city.json': 'ff296eff0ad6',
  'clothes.json': '26604d5de5e4',
  'everyday.json': 'ae81abc83e9e',
  'family.json': 'a7f1bc9f97e2',
  'food.json': '03f224813116',
  'home.json': 'c5ad608e8575',
  'idea.json': '0ce69e21d19f',
  'job.json': '75e21e934813',
  'nature.json': '7ae0b9898446',
  'number.json': '3381f386f92c',
  'office.json': 'ddcf7dc8ca86',
  'quality.json': '2d417cd20be9',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '6005156df9d7',
  'sport.json': 'abacf313a00b',
  'time.json': '365c0dae001e',
  'transport.json': '7fda68264f83',
  'travel.json': '47462478b1ba',
}
