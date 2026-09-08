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
  'action.json': 'd2ed20702595',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'c1ccda5eba33',
  'city.json': 'fc3d7756c8bd',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '6410046f7067',
  'family.json': 'a7101c863433',
  'food.json': '68a0d12a6bc7',
  'home.json': '3f8137dd3d26',
  'idea.json': 'de547340bf07',
  'job.json': '166fa36d9113',
  'nature.json': 'efd1b28c56ba',
  'number.json': '4ffdc27a655d',
  'office.json': 'e7afc1ddd5d4',
  'quality.json': 'e6526b381308',
  'scene.json': '031f4f8c4398',
  'school.json': '86638e798eaa',
  'sport.json': 'b2f07de51949',
  'time.json': '98206ce1ec66',
  'transport.json': '36eeabf961a6',
  'travel.json': '9c763d5a302b',
}
