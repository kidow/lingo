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
  'action.json': '6f10ad90d21e',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '3b54bae67a55',
  'city.json': 'a28a71c80a11',
  'clothes.json': '215fac81522a',
  'everyday.json': '6cd145b8d1e4',
  'family.json': 'c0fbb0761694',
  'food.json': '2ed9545dc360',
  'home.json': 'ce7007b57951',
  'idea.json': '2f2f34ba933a',
  'job.json': '7d7c975b6afc',
  'nature.json': 'c4275bf9b09b',
  'number.json': 'ef09d519ade6',
  'office.json': '6959602b7b7d',
  'quality.json': '6f3daf64ca13',
  'scene.json': '83b3d6c45004',
  'school.json': '13ca86a521d9',
  'sport.json': 'b81febf38937',
  'time.json': 'dafe857c7190',
  'transport.json': 'bd4ab22f4dc8',
  'travel.json': '54f09e588cf0',
}
