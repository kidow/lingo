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
  'action.json': 'beaae71cefde',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'ca2a12ae3b79',
  'city.json': '54a62c97b7c7',
  'clothes.json': '257aa2576112',
  'everyday.json': 'f557c84afcfa',
  'family.json': 'ed5bc02d7876',
  'food.json': '97efca01a1d3',
  'home.json': 'f1ad49fbe28e',
  'idea.json': 'd3997ee5c879',
  'job.json': '23eaf63f428a',
  'nature.json': '759ea862aff4',
  'number.json': '6ff873ff08c1',
  'office.json': 'a35911a7778e',
  'quality.json': '3f52553470a5',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '755d29b0e106',
  'sport.json': 'f45b1772b903',
  'time.json': 'bade8e50bf89',
  'transport.json': 'afc4c1c2ca96',
  'travel.json': 'd0ae1b38f647',
}
