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
  'action.json': '43146fb1101a',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'e917bd14d2b8',
  'city.json': '4111e7d21211',
  'clothes.json': '26604d5de5e4',
  'everyday.json': 'ae81abc83e9e',
  'family.json': 'a7f1bc9f97e2',
  'food.json': '03f224813116',
  'home.json': 'c5ad608e8575',
  'idea.json': 'e33622a11b12',
  'job.json': '67018d46f0ab',
  'nature.json': 'a50445441905',
  'number.json': 'dc6fe345d55e',
  'office.json': '0c5d13d4b468',
  'quality.json': '2272578976ac',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '2236b21da539',
  'sport.json': 'abacf313a00b',
  'time.json': '365c0dae001e',
  'transport.json': '7fda68264f83',
  'travel.json': '47462478b1ba',
}
