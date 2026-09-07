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
  'action.json': '426a860d9fe5',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '47db108256d7',
  'city.json': '1a560d698f20',
  'clothes.json': '257aa2576112',
  'everyday.json': '232f57373984',
  'family.json': '4c2e0154a630',
  'food.json': '0a14e85dda49',
  'home.json': '00dfe2fc65b7',
  'idea.json': '7a795d60fdfc',
  'job.json': '05395ddcf1dc',
  'nature.json': 'fac96d5bbd54',
  'number.json': '6ff873ff08c1',
  'office.json': '632b7725b1c7',
  'quality.json': '3f52553470a5',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '6bc72daa97c4',
  'sport.json': '658e8e75e307',
  'time.json': 'bade8e50bf89',
  'transport.json': 'a0ce33c759f5',
  'travel.json': '8d2c7fb596e4',
}
