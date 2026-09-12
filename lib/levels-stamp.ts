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
  'action.json': '908d3e53efd4',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'e2a7e36873b6',
  'city.json': 'b073bbf944be',
  'clothes.json': 'db66fb073ca8',
  'everyday.json': '64be6837a32d',
  'family.json': 'c0fbb0761694',
  'food.json': '14f047f1eb7e',
  'home.json': 'ce7007b57951',
  'idea.json': '06ccbad2a506',
  'job.json': '18777a0963a2',
  'nature.json': '2fdeaf81d026',
  'number.json': 'ef09d519ade6',
  'office.json': '3d18800b2a98',
  'quality.json': '3387aa00dd56',
  'scene.json': '83b3d6c45004',
  'school.json': 'c1eaea1a14fb',
  'sport.json': 'fc02dc184e69',
  'time.json': 'dafe857c7190',
  'transport.json': 'bd4ab22f4dc8',
  'travel.json': '54f09e588cf0',
}
