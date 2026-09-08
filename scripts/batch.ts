/**
 * 개념을 넣은 **직후에 늘 함께 도는 넷**을 한 번에 돌린다. (spec.md §7)
 *
 *   node scripts/batch.ts private-room bring-slippers meals-included …
 *
 *   1. pnpm props --in   배치 안에서 겹치는 소품을 찍는다
 *   2. pnpm romanize     ja·zh·ru 예문의 로마자를 채운다
 *   3. pnpm ipa          발음기호를 채운다
 *   4. pnpm check        전부 검증한다
 *
 * 순서에 뜻이 있다. 소품 겹침은 **그림을 뽑기 전에** 알아야 고칠 수 있고,
 * 로마자와 발음기호는 채우기 전에 `check`를 돌리면 경고가 백 줄 넘게 나와
 * 진짜 문제를 덮는다. 그래서 채운 다음에 검사한다.
 *
 * **`pnpm dup`은 여기 없다.** 그건 개념을 쓰기 전에 도는 것이고 이건 쓴 뒤에
 * 도는 것이라, 묶으면 둘 중 하나는 늘 헛돈다.
 *
 * 회차마다 이 넷을 손으로 이어 쳤고, 로마자를 잊어 `check`가 경고 이백 줄을
 * 뿜은 적이 있다. 순서를 아는 자리를 스크립트에 두면 잊을 데가 없다.
 */
import { spawnSync } from 'node:child_process'

const slugs = process.argv.slice(2)
if (slugs.length === 0) {
  console.log('배치에 넣은 slug를 적으세요')
  console.log('  node scripts/batch.ts private-room bring-slippers …')
  process.exit(1)
}

/** 넷 중 하나라도 실패하면 거기서 멈춘다 — 다음 단계가 앞 단계를 전제한다 */
function run(label: string, args: string[]) {
  console.log(`\n── ${label}`)
  const { status } = spawnSync('node', args, { stdio: 'inherit' })
  if (status !== 0) {
    console.log(`\n${label}에서 멈췄습니다`)
    process.exit(status ?? 1)
  }
}

run('소품 겹침', ['scripts/props.ts', '--in', ...slugs])
run('로마자', ['scripts/romanize.ts'])
run('발음기호', ['scripts/ipa.ts'])
run('검증', ['scripts/check.ts'])
console.log('\n넷 다 지났습니다 — 이제 pnpm genimg으로 그림을 뽑습니다\n')
