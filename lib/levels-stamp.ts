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
  'city.json': 'c426d77d9d66',
  'clothes.json': '3f2a4f832301',
  'everyday.json': 'dd487c2e18fc',
  'family.json': 'b2b3a65ec086',
  'food.json': '1e8bc6c94dea',
  'home.json': '171a8d9aeb96',
  'idea.json': '52637996eea9',
  'job.json': '3e91cedd42a6',
  'nature.json': '7c17001e4049',
  'number.json': '1a5125e6aff5',
  'office.json': '1f198446898c',
  'quality.json': '1af60a5f4a13',
  'scene.json': 'c8ba25307fca',
  'school.json': '28e5f7c57618',
  'sport.json': 'a47ac8a8b65b',
  'time.json': '365c0dae001e',
  'transport.json': '4d011d7feea7',
  'travel.json': 'b837ed8a2837',
}
