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
  'action.json': '46460f80bc64',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '8c4207a4d8fc',
  'city.json': '0722a13f7328',
  'clothes.json': 'f38f99daf019',
  'everyday.json': '86a4ca83a934',
  'family.json': 'e6937cc00958',
  'food.json': '6d2817c14100',
  'home.json': 'fbdf09020cd5',
  'idea.json': 'f9dc48925c0d',
  'job.json': 'ef63404a69f5',
  'nature.json': '703f79f92036',
  'number.json': '17f4cdb1d08f',
  'office.json': 'bfeb3b308664',
  'quality.json': '41c55f99c593',
  'scene.json': '91de5dcc8fb7',
  'school.json': 'dcc3b709447e',
  'sport.json': 'f18f78aac045',
  'time.json': '9841307a40fe',
  'transport.json': 'bcad50a1a93d',
  'travel.json': 'ce88e4bfbc88',
}
