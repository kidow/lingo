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
  'action.json': '6db8a25c31d8',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '3b54bae67a55',
  'city.json': '4058260bb6f7',
  'clothes.json': 'ee5ae553eb2b',
  'everyday.json': '3ccaf3e02f7e',
  'family.json': 'c0fbb0761694',
  'food.json': 'f1f5dff91a61',
  'home.json': 'ce7007b57951',
  'idea.json': '70f45b495baa',
  'job.json': '902a368a700a',
  'nature.json': '4591ced738c5',
  'number.json': 'ef09d519ade6',
  'office.json': '3d18800b2a98',
  'quality.json': 'f25e1c28a51a',
  'scene.json': '83b3d6c45004',
  'school.json': 'a43bc78eb5de',
  'sport.json': 'b81febf38937',
  'time.json': 'dafe857c7190',
  'transport.json': 'bd4ab22f4dc8',
  'travel.json': '54f09e588cf0',
}
