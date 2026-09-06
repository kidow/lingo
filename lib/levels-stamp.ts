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
  'body.json': '27d9e633358c',
  'city.json': '5703d71c4308',
  'clothes.json': 'ef1dd88762b9',
  'everyday.json': '76feeb375ab8',
  'family.json': '62b347d045f1',
  'food.json': 'b676af4c4ef2',
  'home.json': '26917666a558',
  'idea.json': '57d5a3bcd2a8',
  'job.json': 'c1230bd26a30',
  'nature.json': '63e680f581a1',
  'number.json': '1a5125e6aff5',
  'office.json': '07f529fe0f5f',
  'quality.json': 'fce1b139e108',
  'scene.json': 'c8ba25307fca',
  'school.json': '35cd040d3a19',
  'sport.json': 'fb11673f274b',
  'time.json': '19ff60b20003',
  'transport.json': 'cee9bb1c1286',
  'travel.json': 'b0aa002508a3',
}
