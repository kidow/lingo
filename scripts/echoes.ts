/**
 * **같은 글로 쓴 개념.** 프롬프트를 낱말로 쪼개 서로 얼마나 겹치는지 잰다.
 *
 * `pnpm twins`는 **그림이 있어야** 잰다. 아직 안 그린 개념끼리는 아무 그물도
 * 없어서, 둘이 거의 같은 문장으로 적혀 있어도 뽑고 나서야 안다. 2026-09-21에
 * 여섯 축의 몸통을 손으로 세어 백쉰일곱을 걸러 냈는데, 그 일을 회차마다
 * 손으로 할 수는 없다.
 *
 * **이것은 `twins` 예보가 아니다.** 글이 같아도 그림은 멀 수 있다 — 같은 날
 * `withdrawal`(인출)과 `withdraw-cash`(현금을 뽑고 싶습니다)는 프롬프트가
 * 1.00으로 같은데 그림은 구조 111로 멀었다. 이 그물이 짚는 것은 **개념이
 * 겹치는 자리**다. 그림을 어떻게 그리든 카드 둘이 같은 말을 한다.
 *
 * **파일을 건너뛰는 쌍을 본다.** 한 파일만 훑으면 `idea/it-cannot-be`
 * (될 수 없이)와 `quality/in-no-way`(도무지)처럼 파일이 다른 쌍은 안 걸린다.
 * 맞은편이 다른 파일이면 «※»를 붙인다.
 *
 * **아직 안 그린 것만 본다.** 이미 그린 쌍은 `twins`가 픽셀로 재므로 여기서
 * 다시 울 이유가 없다. `--all`로 다 볼 수 있다.
 *
 *   pnpm echoes            아직 안 그린 것이 낀 쌍
 *   pnpm echoes --all      이미 그린 쌍까지
 *   pnpm echoes --min 0.4  문턱을 올린다 (기본 0.33)
 *
 * **놓치는 자리가 있다.** 후보를 「드문 낱말을 셋 이상 같이 쓴 쌍」으로
 * 좁힌다. 흔한 낱말로만 된 쌍은 안 걸린다 — 위의 `key`·`keyhole` 쌍이 그렇다.
 * 이 그물이 0쌍이라고 해서 겹치는 개념이 없다는 뜻은 아니다.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { type EchoRow, echoPairs } from '../lib/echo.ts'

const CONTENT_DIR = 'content'
const OUT_DIR = join('public', 'concepts')

const args = process.argv.slice(2)
const all = args.includes('--all')
const minAt = args.indexOf('--min')
const MIN = minAt >= 0 ? Number(args[minAt + 1]) : 0.33

type Row = EchoRow

const rows: Row[] = []
for (const name of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const file = name.slice(0, -5)
  const data = JSON.parse(readFileSync(join(CONTENT_DIR, name), 'utf8'))
  for (const c of data.concepts ?? []) {
    const prompt: string = c.image_prompt ?? ''
    if (!prompt) continue
    rows.push({
      slug: c.slug,
      meaning: c.meaning_ko ?? '',
      file,
      prompt,
      drawn: existsSync(join(OUT_DIR, `${c.slug}.webp`)),
    })
  }
}

const hits = echoPairs(rows, MIN).filter(({ a, b }) => all || !a.drawn || !b.drawn)

const label = (r: Row) => `${r.slug}(${r.meaning})${r.drawn ? '' : ' ·안그림'}`
for (const { j, a, b } of hits)
  console.log(`  ${j.toFixed(2)}${a.file === b.file ? ' ' : '※'} ${label(a)} ↔ ${label(b)}`)

const cross = hits.filter(({ a, b }) => a.file !== b.file).length
console.log(
  `\n같은 글로 쓴 개념 ${hits.length}쌍 (겹침 ${MIN} 이상` +
    `${all ? '' : ' · 아직 안 그린 것만 — 다 보려면 --all'}) · 그 가운데 ※ 파일을 건너뛴 것 ${cross}쌍`,
)
console.log('  그림이 아니라 개념이 겹치는 자리입니다 — 한쪽을 다른 장면으로 옮기세요')
