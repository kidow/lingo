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
  'action.json': '426a860d9fe5',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'c0fe2238a647',
  'city.json': '739a43ff5253',
  'clothes.json': '74c92ceea636',
  'everyday.json': '232f57373984',
  'family.json': '4c2e0154a630',
  'food.json': 'e49f24e00a2b',
  'home.json': '36c098be3683',
  'idea.json': '6a0a681c0b44',
  'job.json': '13daa4e3d71e',
  'nature.json': '469755c2c7e7',
  'number.json': '1fa1ab078d82',
  'office.json': 'bbb5ad28bc9d',
  'quality.json': '3f52553470a5',
  'scene.json': '9bc7ab8b31cb',
  'school.json': '6bc72daa97c4',
  'sport.json': 'c34075c5fef6',
  'time.json': '99063a0159a2',
  'transport.json': 'a0ce33c759f5',
  'travel.json': '938af619a3cc',
}
