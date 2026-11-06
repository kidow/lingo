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
  'action.json': 'cdbd7526a1c4',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'e7dbfdeab794',
  'city.json': '2053d954b0b6',
  'clothes.json': '94179b8bc211',
  'everyday.json': '8afe2ec6684f',
  'family.json': 'e9bf1535fb29',
  'food.json': 'c1dc25ab9eae',
  'home.json': '47a32ef8eeca',
  'idea.json': 'b3b43999fa5a',
  'job.json': '905c9241b938',
  'kana.json': 'da39a3ee5e6b',
  'nature.json': '181fa9ed92f5',
  'number.json': 'd3e9e3bfc52b',
  'office.json': '2cb06ff4a91e',
  'quality.json': 'e1b59249b3d4',
  'scene.json': '21de2730b70a',
  'school.json': '74b1095f1d53',
  'sport.json': '121f739af3c9',
  'time.json': '2a8d04f632a0',
  'transport.json': '5111c077abad',
  'travel.json': 'd3e7d3dd85dd',
}
