/**
 * **같은 글로 쓴 개념을 찾는다.** 프롬프트를 낱말로 쪼개 겹침(Jaccard)을 잰다.
 *
 * `scripts/echoes.ts`가 쓰던 셈을 그대로 옮겨 왔다. `scripts/queue.ts`가 회차를
 * 낼 때 같은 그물을 걸면서 둘이 나눠 쓴다 — 두 벌이면 문턱을 한쪽만 고쳐 놓고
 * 딴 판정이 나온다.
 *
 * **이것은 `twins` 예보가 아니다.** 글이 같아도 그림은 멀 수 있다. 이 그물이
 * 짚는 것은 **개념이 겹치는 자리**다.
 */

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

export type EchoRow = { slug: string; meaning: string; file: string; prompt: string; drawn: boolean }
export type EchoPair<T> = { j: number; a: T; b: T }

export function words(prompt: string): Set<string> {
  return new Set(
    (prompt.toLowerCase().match(/[a-z]+/g) ?? []).filter((w) => w.length > 2 && !STOP.has(w)),
  )
}

/**
 * 겹침이 `min` 이상인 쌍. 후보는 **드문 낱말을 셋 이상 같이 쓴 쌍**으로 좁힌다 —
 * 흔한 낱말로만 된 쌍은 안 걸린다.
 */
export function echoPairs<T extends EchoRow>(rows: T[], min: number): EchoPair<T>[] {
  const sets = rows.map((r) => words(r.prompt))
  const df = new Map<string, number>()
  for (const set of sets) for (const w of set) df.set(w, (df.get(w) ?? 0) + 1)

  const idx = new Map<string, number[]>()
  sets.forEach((set, i) => {
    for (const w of set) {
      if ((df.get(w) ?? 0) > COMMON) continue
      const list = idx.get(w)
      if (list) list.push(i)
      else idx.set(w, [i])
    }
  })

  const shared = new Map<string, number>()
  for (const list of idx.values()) {
    if (list.length < 2 || list.length > COMMON) continue
    for (let x = 0; x < list.length; x += 1)
      for (let y = x + 1; y < list.length; y += 1)
        shared.set(`${list[x]}:${list[y]}`, (shared.get(`${list[x]}:${list[y]}`) ?? 0) + 1)
  }

  const hits: EchoPair<T>[] = []
  for (const [key, n] of shared) {
    if (n < SHARED) continue
    const [x, y] = key.split(':').map(Number)
    let inter = 0
    for (const w of sets[x]) if (sets[y].has(w)) inter += 1
    const j = inter / (sets[x].size + sets[y].size - inter)
    if (j >= min) hits.push({ j, a: rows[x], b: rows[y] })
  }
  return hits.sort((p, q) => q.j - p.j)
}
