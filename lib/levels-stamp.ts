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
  'action.json': 'cbdead5bcca8',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '2a47fb7b9e9f',
  'city.json': 'd9f5ea69f4ae',
  'clothes.json': 'f38f99daf019',
  'everyday.json': '6410046f7067',
  'family.json': 'a7101c863433',
  'food.json': '20f221027d4d',
  'home.json': '701eff807d66',
  'idea.json': 'de547340bf07',
  'job.json': '166fa36d9113',
  'nature.json': 'efd1b28c56ba',
  'number.json': '4ffdc27a655d',
  'office.json': '05d96ab8170f',
  'quality.json': 'e6526b381308',
  'scene.json': '6443d57aa52e',
  'school.json': '86638e798eaa',
  'sport.json': 'b2f07de51949',
  'time.json': 'bbed28ed6252',
  'transport.json': '9ecee59a7c60',
  'travel.json': 'd5e2a54fee21',
}
