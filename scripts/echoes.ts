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
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = 'content'
const OUT_DIR = join('public', 'concepts')

const args = process.argv.slice(2)
const all = args.includes('--all')
const minAt = args.indexOf('--min')
const MIN = minAt >= 0 ? Number(args[minAt + 1]) : 0.33

/** 어느 그림에나 나오는 말은 겹쳐도 뜻이 없다. */
const STOP = new Set(
  ('one a an the of on in at to with and or its it is are from side front above below seen no ' +
    'letters people facial features person figure plain small large long short round flat set ' +
    'lying standing left right two three four five same other each')
    .split(' '),
)

/** 이보다 흔한 낱말은 후보를 고를 때 안 쓴다 — 벽·쟁반은 아무 데나 나온다. */
const COMMON = 60
/** 드문 낱말을 이만큼 같이 써야 후보가 된다. */
const SHARED = 3

type Row = { slug: string; meaning: string; file: string; prompt: string; drawn: boolean; t: Set<string> }

const rows: Row[] = []
for (const name of readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json')).sort()) {
  const file = name.slice(0, -5)
  const data = JSON.parse(readFileSync(join(CONTENT_DIR, name), 'utf8'))
  for (const c of data.concepts ?? []) {
    const prompt: string = c.image_prompt ?? ''
    if (!prompt) continue
    const t = new Set(
      (prompt.toLowerCase().match(/[a-z]+/g) ?? []).filter((w) => w.length > 2 && !STOP.has(w)),
    )
    rows.push({
      slug: c.slug,
      meaning: c.meaning_ko ?? '',
      file,
      prompt,
      drawn: existsSync(join(OUT_DIR, `${c.slug}.webp`)),
      t,
    })
  }
}

const df = new Map<string, number>()
for (const r of rows) for (const w of r.t) df.set(w, (df.get(w) ?? 0) + 1)

const idx = new Map<string, number[]>()
rows.forEach((r, i) => {
  for (const w of r.t) {
    if ((df.get(w) ?? 0) > COMMON) continue
    const lst = idx.get(w)
    if (lst) lst.push(i)
    else idx.set(w, [i])
  }
})

const shared = new Map<string, number>()
for (const lst of idx.values()) {
  if (lst.length < 2 || lst.length > COMMON) continue
  for (let x = 0; x < lst.length; x += 1)
    for (let y = x + 1; y < lst.length; y += 1)
      shared.set(`${lst[x]}:${lst[y]}`, (shared.get(`${lst[x]}:${lst[y]}`) ?? 0) + 1)
}

const hits: { j: number; a: Row; b: Row }[] = []
for (const [key, n] of shared) {
  if (n < SHARED) continue
  const [x, y] = key.split(':').map(Number)
  const a = rows[x]
  const b = rows[y]
  if (!all && a.drawn && b.drawn) continue
  let inter = 0
  for (const w of a.t) if (b.t.has(w)) inter += 1
  const j = inter / (a.t.size + b.t.size - inter)
  if (j >= MIN) hits.push({ j, a, b })
}
hits.sort((p, q) => q.j - p.j)

const label = (r: Row) => `${r.slug}(${r.meaning})${r.drawn ? '' : ' ·안그림'}`
for (const { j, a, b } of hits)
  console.log(`  ${j.toFixed(2)}${a.file === b.file ? ' ' : '※'} ${label(a)} ↔ ${label(b)}`)

const cross = hits.filter(({ a, b }) => a.file !== b.file).length
console.log(
  `\n같은 글로 쓴 개념 ${hits.length}쌍 (겹침 ${MIN} 이상` +
    `${all ? '' : ' · 아직 안 그린 것만 — 다 보려면 --all'}) · 그 가운데 ※ 파일을 건너뛴 것 ${cross}쌍`,
)
console.log('  그림이 아니라 개념이 겹치는 자리입니다 — 한쪽을 다른 장면으로 옮기세요')
