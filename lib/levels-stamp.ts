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
  'action.json': 'beaae71cefde',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '9f898af887bd',
  'city.json': '4a88c4b430b8',
  'clothes.json': '26604d5de5e4',
  'everyday.json': 'ca9290abf59e',
  'family.json': 'c2ccd7cc97e4',
  'food.json': 'cb7cd67f464b',
  'home.json': 'f1ad49fbe28e',
  'idea.json': '75a67ab922cb',
  'job.json': '83075d5bca1c',
  'nature.json': '54b82bc67804',
  'number.json': '6ff873ff08c1',
  'office.json': '001f09f9d8e8',
  'quality.json': '3f52553470a5',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '04e734d17117',
  'sport.json': 'f45b1772b903',
  'time.json': 'bade8e50bf89',
  'transport.json': '176d1de235c7',
  'travel.json': '24ad358d958b',
}
