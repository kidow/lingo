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
  'action.json': '8285e659b87e',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'bf9414d842ae',
  'city.json': 'd8ca30218f41',
  'clothes.json': '4283a6af4f47',
  'everyday.json': '15a4f16dff1d',
  'family.json': '9c434efe6c1d',
  'food.json': '6bcac5df0d8c',
  'home.json': 'b81e24d2cfbd',
  'idea.json': 'a912bec5255a',
  'job.json': 'd03b38fff92e',
  'nature.json': '9e8e98415103',
  'number.json': 'ef09d519ade6',
  'office.json': '9a8bfc1bc84d',
  'quality.json': '083080626d2c',
  'scene.json': '83b3d6c45004',
  'school.json': 'bd8cb13e9fdb',
  'sport.json': '00e1539183a9',
  'time.json': '19368ded125b',
  'transport.json': '927d21ebbe16',
  'travel.json': '9a204e42ccbd',
}
