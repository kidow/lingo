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
  'action.json': 'b15e8a3359ff',
  'articles.json': 'da39a3ee5e6b',
  'body.json': 'e7dbfdeab794',
  'city.json': '2053d954b0b6',
  'clothes.json': '44ea8301887c',
  'everyday.json': '8afe2ec6684f',
  'family.json': '3635027c6019',
  'food.json': 'cc5a8ada8734',
  'home.json': '3ee99097ec2d',
  'idea.json': '3cfa1ac8f28a',
  'job.json': '92757bfd0afb',
  'kana.json': 'da39a3ee5e6b',
  'nature.json': 'ecf95b443634',
  'number.json': '8ec84f5576e6',
  'office.json': '2cb06ff4a91e',
  'quality.json': '8f7f1555df35',
  'scene.json': '0493b7beb0f6',
  'school.json': '737c3f4466f3',
  'sport.json': '1f38fb96bdc3',
  'time.json': 'd29600b71629',
  'transport.json': '37f30cb27704',
  'travel.json': 'd3e7d3dd85dd',
}
