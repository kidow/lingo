/** RAM-only re-examination of the special grade II characters whose licensed candidate is exactly one
 *  stroke away from the catalog count. For each glyph the candidate strokes are assigned to the dictionary
 *  strokes (Hungarian assignment on centre, endpoint and size distance) under two hypotheses — the extra
 *  stroke is a stray stroke, or it is one half of a stroke the other side draws in one go — and the cheaper
 *  hypothesis wins; a merge must also pass shape rules (collinear bars laid end to end, union ≈ whole).
 *  Dictionary bytes are verified against the pinned hashes and never written anywhere; only stroke
 *  indices, shape words and the class are printed. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const originals = JSON.parse(readFileSync(new URL('originals.json', import.meta.url), 'utf8'))

const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]))
function flatten(d) {
  const tokens = d.match(/[MLCQZmlcqz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? []
  const out = []
  let x = 0, y = 0, cmd = '', args = []
  const bezier = (p0, p1, p2, p3) => {
    for (let t = 0.25; t <= 1.0001; t += 0.25) {
      const u = 1 - t
      out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]])
    }
  }
  const flush = () => {
    while (args.length) {
      const take = n => args.splice(0, n).map(Number)
      if (cmd === 'M') { const [a, b] = take(2); x = a; y = b; out.push([x, y]); cmd = 'L' }
      else if (cmd === 'L') { const [a, b] = take(2); x = a; y = b; out.push([x, y]) }
      else if (cmd === 'C') { const p = take(6); bezier([x, y], [p[0], p[1]], [p[2], p[3]], [p[4], p[5]]); x = p[4]; y = p[5] }
      else if (cmd === 'Q') { const p = take(4); bezier([x, y], [p[0], p[1]], [p[0], p[1]], [p[2], p[3]]); x = p[2]; y = p[3] }
      else args.length = 0
    }
  }
  for (const token of tokens) { if (/^[A-Za-z]$/.test(token)) { flush(); cmd = token.toUpperCase() } else args.push(token) }
  flush()
  return out
}
// map a whole glyph's strokes into a 0..100 box anchored at its own bounding box (both sides get the same frame)
// each axis is stretched on its own, so a narrow corpus glyph and a square dictionary glyph line up
const frame = strokes => {
  const all = strokes.flat(), b = bbox(all), w = (b[1] - b[0]) || 1, h = (b[3] - b[2]) || 1
  return strokes.map(s => s.map(([x, y]) => [(x - b[0]) / w * 100, (y - b[2]) / h * 100]))
}
const pathPoints = d => [...d.matchAll(/([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const bbox = pts => [Math.min(...pts.map(p => p[0])), Math.max(...pts.map(p => p[0])), Math.min(...pts.map(p => p[1])), Math.max(...pts.map(p => p[1]))]
const centre = b => [(b[0] + b[1]) / 2, (b[2] + b[3]) / 2]
const inside = (a, b, pad) => a[0] >= b[0] - pad && a[1] <= b[1] + pad && a[2] >= b[2] - pad && a[3] <= b[3] + pad
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1])
const shape = b => { const w = b[1] - b[0], h = b[3] - b[2]; return w < 8 && h < 8 ? 'dot' : w > 2 * h ? 'bar' : h > 2 * w ? 'vertical' : 'slant' }

async function dictStrokes(record) {
  const raw = Buffer.from(await (await fetch(record.dictionary.url, { signal: AbortSignal.timeout(20000) })).arrayBuffer())
  assert.equal(createHash('sha256').update(raw).digest('hex'), record.dictionary.sha256, record.glyph)
  const text = raw.toString('utf8')
  const flipY = Number(/scale\(1,-1\) translate\(-?\d+, -(\d+)\)/.exec(text)[1])
  const paths = [...text.matchAll(/<path\b[^>]*>/g)].map(m => attributes(m[0]))
  return paths.filter(p => p['clip-path'])
    .map(p => ({ d: p.d, delay: Number(p.style.match(/--d:\s*(\d+)ms/)[1]) })).sort((a, b) => a.delay - b.delay)
    .map(s => flatten(s.d).map(([x, y]) => [x / 10.24, (flipY - y) / 10.24]))
}

// does the union of two strokes (a matched one and the leftover) look like one stroke on the other side?
// returns a score (lower is closer) or null when it clearly does not
const unionScore = (matched, extra, whole) => {
  const U = [Math.min(matched[0], extra[0]), Math.max(matched[1], extra[1]), Math.min(matched[2], extra[2]), Math.max(matched[3], extra[3])]
  const size = b => (b[1] - b[0]) + (b[3] - b[2])
  const w = b => b[1] - b[0], h = b => b[3] - b[2]
  // the two dictionary strokes must each contribute: their boxes may touch but not sit on top of each other
  const ox = Math.max(0, Math.min(matched[1], extra[1]) - Math.max(matched[0], extra[0]))
  const oy = Math.max(0, Math.min(matched[3], extra[3]) - Math.max(matched[2], extra[2]))
  const overlap = ox * oy, smaller = Math.min(w(matched) * h(matched), w(extra) * h(extra)) || 1
  if (overlap > 0.5 * smaller) return null
  // the leftover must extend the matched stroke, else it is a stray stroke and nothing was split
  if (size(U) < 1.15 * size(matched)) return null
  // two bars (or two verticals) only split one stroke when they are collinear and laid end to end;
  // a parallel bar stacked beside another is a stroke of its own
  const sm = shape(matched), se = shape(extra)
  if (sm === se && (sm === 'bar' || sm === 'vertical')) {
    const minorGapPair = sm === 'bar' ? Math.abs(centre(matched)[1] - centre(extra)[1]) : Math.abs(centre(matched)[0] - centre(extra)[0])
    const along = sm === 'bar' ? ox : oy
    const shorter = sm === 'bar' ? Math.min(w(matched), w(extra)) : Math.min(h(matched), h(extra))
    if (minorGapPair > 6 || along > 0.3 * shorter) return null
  }
  const ratio = (a, b) => Math.max(a, b) / (Math.min(a, b) || 1)
  // compare along the whole stroke's long axis by ratio; the short axis only by absolute gap
  const longAxis = w(whole) >= h(whole)
  const stretch = longAxis ? ratio(w(U), w(whole)) : ratio(h(U), h(whole))
  const minorGap = longAxis ? Math.abs(h(U) - h(whole)) : Math.abs(w(U) - w(whole))
  const score = dist(centre(U), centre(whole)) + 0.5 * (Math.abs(w(U) - w(whole)) + Math.abs(h(U) - h(whole)))
  return score < 32 && stretch < 1.8 && minorGap < 14 ? score : null
}
// cost between a dictionary stroke and a candidate stroke: centre distance + endpoint distance + size gap
const cost = (a, b) => {
  const ba = bbox(a), bb = bbox(b)
  return dist(centre(ba), centre(bb)) + 0.5 * (dist(a[0], b[0]) + dist(a.at(-1), b.at(-1)))
    + 0.3 * (Math.abs((ba[1] - ba[0]) - (bb[1] - bb[0])) + Math.abs((ba[3] - ba[2]) - (bb[3] - bb[2])))
}
// optimal one-to-one assignment (Hungarian, potentials form) of two equal-length lists; returns { total, pairs }
function hungarian(a) {
  const n = a.length, m = a[0].length, INF = 1e18
  const u = new Array(n + 1).fill(0), v = new Array(m + 1).fill(0), p = new Array(m + 1).fill(0), way = new Array(m + 1).fill(0)
  for (let i = 1; i <= n; i++) {
    p[0] = i
    let j0 = 0
    const minv = new Array(m + 1).fill(INF), used = new Array(m + 1).fill(false)
    do {
      used[j0] = true
      const i0 = p[j0]
      let delta = INF, j1 = 0
      for (let j = 1; j <= m; j++) if (!used[j]) {
        const cur = a[i0 - 1][j - 1] - u[i0] - v[j]
        if (cur < minv[j]) { minv[j] = cur; way[j] = j0 }
        if (minv[j] < delta) { delta = minv[j]; j1 = j }
      }
      for (let j = 0; j <= m; j++) if (used[j]) { u[p[j]] += delta; v[j] -= delta } else minv[j] -= delta
      j0 = j1
    } while (p[j0] !== 0)
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1 } while (j0)
  }
  const pairs = []
  for (let j = 1; j <= m; j++) if (p[j]) pairs.push([p[j] - 1, j - 1])
  return { total: pairs.reduce((s, [i, j]) => s + a[i][j], 0), pairs }
}
const matrix = (rows, cols) => rows.map(r => cols.map(c => cost(c, r)))

/** Explain one extra stroke on the long side: either it is a stray stroke (best assignment with it left out)
 *  or it is one half of a stroke the short side draws in one go (best assignment after merging it with a partner).
 *  Both are scored by the total assignment cost; the merge must also pass the shape rules. */
function explain(short, long) {
  let bestLeave = { total: Infinity }
  for (let j = 0; j < long.length; j++) {
    const rest = long.filter((_, k) => k !== j)
    const h = hungarian(matrix(short, rest))
    if (h.total < bestLeave.total) bestLeave = { total: h.total, extra: j }
  }
  let bestMerge = { total: Infinity }
  for (let j = 0; j < long.length; j++) for (let k = j + 1; k < long.length; k++) {
    const merged = long.map((s, idx) => idx === j ? [...long[j], ...long[k]] : s).filter((_, idx) => idx !== k)
    const h = hungarian(matrix(short, merged))
    if (h.total >= bestMerge.total) continue
    const mergedIndex = j
    const pair = h.pairs.find(([, col]) => col === mergedIndex)
    const whole = short[pair[0]]
    if (unionScore(bbox(long[j]), bbox(long[k]), bbox(whole)) === null) continue
    bestMerge = { total: h.total, parts: [j, k], cover: pair[0] }
  }
  return bestMerge.total < bestLeave.total ? { cls: 'merge', ...bestMerge } : { cls: 'leave', ...bestLeave }
}

const results = []
for (const record of originals.entries) {
  {
    const glyph = record.glyph, corpusId = record.corpus
    const cand = frame(record.paths.map(pathPoints))
    const dict = frame(await dictStrokes(record))
    assert.equal(dict.length, record.strokes, glyph)
    if (dict.length === cand.length + 1) {
      const e = explain(cand, dict)
      results.push(e.cls === 'merge'
        ? { glyph, radical: record.radical, corpus: corpusId, side: 'dictionary has one more', cls: 'split',
            dictionaryParts: e.parts.map(i => i + 1), partShapes: e.parts.map(i => shape(bbox(dict[i]))), coveringCandidateStroke: e.cover + 1 }
        : { glyph, radical: record.radical, corpus: corpusId, side: 'dictionary has one more', cls: 'missing',
            extraDictionaryStroke: e.extra + 1, extraShape: shape(bbox(dict[e.extra])) })
    } else {
      const e = explain(dict, cand)
      results.push(e.cls === 'merge'
        ? { glyph, radical: record.radical, corpus: corpusId, side: 'candidate has one more', cls: 'merge',
            candidateParts: e.parts.map(i => i + 1), partShapes: e.parts.map(i => shape(bbox(cand[i]))), coveringDictionaryStroke: e.cover + 1 }
        : { glyph, radical: record.radical, corpus: corpusId, side: 'candidate has one more', cls: 'surplus',
            extraCandidateStroke: e.extra + 1, extraShape: shape(bbox(cand[e.extra])) })
    }
    await new Promise(r => setTimeout(r, 120))
  }
}
const tally = list => list.reduce((m, e) => ({ ...m, [e.cls]: (m[e.cls] ?? 0) + 1 }), {})
console.log(JSON.stringify({
  schemaVersion: 1, date: '2026-09-20',
  purpose: 'Why each one-stroke gap exists: a pen-lift split the licensed corpus does not make (split), a stroke the corpus does not draw at all (missing), or the reverse on the candidate side (merge, surplus).',
  method: 'Both sides are framed to their own bounding box per axis. Two hypotheses are scored by optimal assignment cost: leave one dictionary stroke out, or merge two dictionary strokes into one and assign. The cheaper wins; a merge also has to pass the shape rules (the union must approximate the covering candidate stroke, and two bars or two verticals must be collinear and laid end to end).',
  inputs: ['originals.json', 'the pinned dictionary SVGs, in RAM only'],
  proprietaryAssetsSaved: 0,
  summary: { characters: results.length, classes: tally(results),
    byRadical: Object.fromEntries([...new Set(results.map(e => e.radical))].map(r => [r, tally(results.filter(e => e.radical === r))])),
    grassSplitParts: tally(results.filter(e => e.radical === '艸' && e.cls === 'split').map(e => ({ cls: e.dictionaryParts.join('+') }))) },
  entries: results,
}, null, 2))
