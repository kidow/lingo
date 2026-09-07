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
  'action.json': 'cab62c18f819',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '9f898af887bd',
  'city.json': '41133b09c543',
  'clothes.json': '26604d5de5e4',
  'everyday.json': '071f694419c4',
  'family.json': '8220eb203e2b',
  'food.json': 'cb7cd67f464b',
  'home.json': 'f1ad49fbe28e',
  'idea.json': 'c2af5490b04b',
  'job.json': '83075d5bca1c',
  'nature.json': 'd9f9e922f4b2',
  'number.json': '3381f386f92c',
  'office.json': 'e77797707321',
  'quality.json': 'ff537c699943',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '5a4bd264ca21',
  'sport.json': 'f45b1772b903',
  'time.json': 'bade8e50bf89',
  'transport.json': '176d1de235c7',
  'travel.json': 'b57fb5e9d039',
}
