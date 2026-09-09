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
  'action.json': '770fd7b1ee7e',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'd825051045de',
  'city.json': 'e0e3822e8b87',
  'clothes.json': 'e845c50f845e',
  'everyday.json': 'ab979b05645c',
  'family.json': '0b0fe199e978',
  'food.json': '372fb6e00dfd',
  'home.json': '584a86814b6a',
  'idea.json': '9925b0751328',
  'job.json': '2ffd08191f40',
  'nature.json': 'a7849f38c558',
  'number.json': '72f168574e03',
  'office.json': '3baf3e9f3c62',
  'quality.json': 'af100739fe39',
  'scene.json': '5e740656e263',
  'school.json': '14e7f632001f',
  'sport.json': 'eaa9de967b73',
  'time.json': 'f42eab6cc54a',
  'transport.json': '526b1640f604',
  'travel.json': 'cd6c710b5e99',
}
