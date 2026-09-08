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
  'action.json': '1fd313fe1b18',
  'articles.json': 'da39a3ee5e6b',
  'body.json': '37289655d6c9',
  'city.json': 'a5c34ebc3a8e',
  'clothes.json': '7b21bd37fcb1',
  'everyday.json': '7e67556049d3',
  'family.json': '87877324a55e',
  'food.json': '9281febc860b',
  'home.json': '143450aa9df0',
  'idea.json': 'a71ffd5b2818',
  'job.json': '39301d989b0b',
  'nature.json': 'b7f97fe71ab4',
  'number.json': 'd146f387eb93',
  'office.json': '4e4e25686fb7',
  'quality.json': '512a8e0774b7',
  'scene.json': 'de931504d939',
  'school.json': 'cb161f7c9e44',
  'sport.json': '71bd2825e16c',
  'time.json': '98206ce1ec66',
  'transport.json': '36eeabf961a6',
  'travel.json': '2e71f940014b',
}
