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
  'action.json': '97b41e862378',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'cdf16c8ed0ba',
  'city.json': '921f78c0103f',
  'clothes.json': '26604d5de5e4',
  'everyday.json': 'cad0363846ce',
  'family.json': 'a7f1bc9f97e2',
  'food.json': '03f224813116',
  'home.json': '0430e7dcac21',
  'idea.json': '7837e21b99be',
  'job.json': 'd0deb81999ec',
  'nature.json': '1fd632337b1c',
  'number.json': '3381f386f92c',
  'office.json': 'b10a19828d0b',
  'quality.json': '35924e199808',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '6005156df9d7',
  'sport.json': 'abacf313a00b',
  'time.json': '365c0dae001e',
  'transport.json': 'cbe70e319466',
  'travel.json': 'c96e54207c24',
}
