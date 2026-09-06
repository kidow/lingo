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
  'action.json': '3b2c7a8ea22d',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '2034e2feb65d',
  'city.json': '7b83c8eb55d6',
  'clothes.json': '3f2a4f832301',
  'everyday.json': '702d694f9d8b',
  'family.json': 'b2b3a65ec086',
  'food.json': '1e8bc6c94dea',
  'home.json': 'fc011f2f7902',
  'idea.json': 'cb1a474ebc9c',
  'job.json': 'c1230bd26a30',
  'nature.json': 'ed5fc31cc214',
  'number.json': '1a5125e6aff5',
  'office.json': 'bf24cfb3d798',
  'quality.json': 'fce1b139e108',
  'scene.json': 'c8ba25307fca',
  'school.json': 'd3a0a8b0decb',
  'sport.json': '00d460c24211',
  'time.json': '19ff60b20003',
  'transport.json': '4dab3b342cc9',
  'travel.json': '45be0f3ab89b',
}
