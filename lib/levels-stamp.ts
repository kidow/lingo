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
  'action.json': '0c3a7c3e2b6a',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'e2a7e36873b6',
  'city.json': 'a8969d7ff590',
  'clothes.json': '4283a6af4f47',
  'everyday.json': '64be6837a32d',
  'family.json': 'c0fbb0761694',
  'food.json': '6bcac5df0d8c',
  'home.json': 'b81e24d2cfbd',
  'idea.json': 'a80c61be8c84',
  'job.json': 'f677f3ae31a6',
  'nature.json': 'da8eee183a8b',
  'number.json': 'ef09d519ade6',
  'office.json': '79d9b4bc9a3b',
  'quality.json': '1cd61c1629fe',
  'scene.json': '83b3d6c45004',
  'school.json': '2b75a38893f5',
  'sport.json': 'addd2479ff9a',
  'time.json': '0e0674f4dee8',
  'transport.json': 'bd4ab22f4dc8',
  'travel.json': '5f4cb8de3610',
}
