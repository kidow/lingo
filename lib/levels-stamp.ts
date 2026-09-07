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
  'body.json': 'b67f3ceaf7e3',
  'city.json': '241a61232c63',
  'clothes.json': '257aa2576112',
  'everyday.json': '232f57373984',
  'family.json': 'b8c9e827a39e',
  'food.json': '0a14e85dda49',
  'home.json': 'f1ad49fbe28e',
  'idea.json': '90611cbd46bb',
  'job.json': '23eaf63f428a',
  'nature.json': 'a334c5867255',
  'number.json': '6ff873ff08c1',
  'office.json': '50e77c55c204',
  'quality.json': '3f52553470a5',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '755d29b0e106',
  'sport.json': '607c829f763a',
  'time.json': 'bade8e50bf89',
  'transport.json': 'afc4c1c2ca96',
  'travel.json': '6cd1e7897c2b',
}
