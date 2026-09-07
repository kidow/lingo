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
  'action.json': '3c71a876f1d2',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '8d795b1b7a98',
  'city.json': '1f45f5d827b1',
  'clothes.json': '26604d5de5e4',
  'everyday.json': '1a93abe02239',
  'family.json': 'a247c4c5559e',
  'food.json': '5b56a9a70276',
  'home.json': '1bd3f5302d70',
  'idea.json': '7b0612645c0a',
  'job.json': 'd0deb81999ec',
  'nature.json': '9dd36582d783',
  'number.json': '3381f386f92c',
  'office.json': '31620246fbb5',
  'quality.json': 'bc3e6a6c4a10',
  'scene.json': '9bc7ab8b31cb',
  'school.json': 'd431508f25ee',
  'sport.json': '9fd28d36d192',
  'time.json': '365c0dae001e',
  'transport.json': '1ed5c15a335d',
  'travel.json': '7f9b53cdb6c7',
}
