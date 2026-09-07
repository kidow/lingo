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
  'action.json': 'a76373b95748',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '345826701e54',
  'city.json': 'acbcf33887f8',
  'clothes.json': '26604d5de5e4',
  'everyday.json': 'ad44ad707ac8',
  'family.json': 'e6a2a19f5e83',
  'food.json': '03f224813116',
  'home.json': 'dcb3f9b57c9d',
  'idea.json': '9505e71c15a0',
  'job.json': 'd0deb81999ec',
  'nature.json': 'a47361de92b7',
  'number.json': '3381f386f92c',
  'office.json': '94edd5aa9233',
  'quality.json': '35924e199808',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '6005156df9d7',
  'sport.json': 'abacf313a00b',
  'time.json': '365c0dae001e',
  'transport.json': 'cbe70e319466',
  'travel.json': 'c96e54207c24',
}
