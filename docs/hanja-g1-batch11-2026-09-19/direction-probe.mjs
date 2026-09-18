/**
 * Numeric direction cross-check to back the visual review. Read-only: each pinned dictionary SVG is
 * parsed in RAM and only per-stroke start/end vectors are printed. Nothing proprietary is saved.
 *
 *   node direction-probe.mjs            every glyph
 *   node direction-probe.mjs 稈 桿      chosen glyphs
 *
 * For each stroke, in dictionary playback order (CSS --d), the animated path's first and last points are
 * compared with the candidate centerline's first and last points. Both are reduced to a unit vector; an
 * angle over 60° is flagged. A flag is a prompt to look, not a verdict — the visual sheet decides.
 */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const originals = JSON.parse(readFileSync(new URL('originals.json', import.meta.url), 'utf8'))
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]))

/** First and last absolute points of an SVG path. Supports M L H V C S Q T Z in absolute or relative form. */
function endpoints(d) {
  const tokens = d.match(/[MLHVCSQTZmlhvcsqtz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? []
  let x = 0, y = 0, sx = 0, sy = 0, first = null, cmd = ''
  const args = []
  const flush = () => {
    while (args.length) {
      const rel = cmd === cmd.toLowerCase()
      const take = n => args.splice(0, n).map(Number)
      switch (cmd.toUpperCase()) {
        case 'M': { const [a, b] = take(2); x = rel ? x + a : a; y = rel ? y + b : b; sx = x; sy = y; cmd = rel ? 'l' : 'L'; break }
        case 'L': { const [a, b] = take(2); x = rel ? x + a : a; y = rel ? y + b : b; break }
        case 'H': { const [a] = take(1); x = rel ? x + a : a; break }
        case 'V': { const [a] = take(1); y = rel ? y + a : a; break }
        case 'C': { const p = take(6); x = rel ? x + p[4] : p[4]; y = rel ? y + p[5] : p[5]; break }
        case 'S': case 'Q': { const p = take(4); x = rel ? x + p[2] : p[2]; y = rel ? y + p[3] : p[3]; break }
        case 'T': { const [a, b] = take(2); x = rel ? x + a : a; y = rel ? y + b : b; break }
        default: args.length = 0
      }
      first ??= [x, y]
    }
  }
  for (const token of tokens) {
    if (/^[A-Za-z]$/.test(token)) { flush(); cmd = token; if (cmd.toUpperCase() === 'Z') { x = sx; y = sy } }
    else args.push(token)
  }
  flush()
  return { start: first, end: [x, y] }
}
const unit = ([ax, ay], [bx, by]) => { const dx = bx - ax, dy = by - ay, n = Math.hypot(dx, dy) || 1; return [dx / n, dy / n] }
const angle = (u, v) => Math.round(Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))) * 180 / Math.PI)

const wanted = process.argv.slice(2)
const report = []
for (const entry of originals.entries) {
  if (wanted.length && !wanted.includes(entry.glyph)) continue
  const pin = entry.dictionary
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(20000) })
  const raw = Buffer.from(await response.arrayBuffer())
  assert.equal(createHash('sha256').update(raw).digest('hex'), pin.sha256)
  const text = raw.toString('utf8')
  const flipY = Number(/scale\(1,-1\) translate\(-?\d+, -(\d+)\)/.exec(text)?.[1])
  assert.ok(flipY > 0)
  const paths = [...text.matchAll(/<path\b[^>]*>/g)].map(m => attributes(m[0]))
  const strokes = paths.filter(p => p['clip-path']).map(p => ({ d: p.d, delay: Number(p.style.match(/--d:\s*(\d+)ms/)[1]) }))
    .sort((a, b) => a.delay - b.delay)
  assert.equal(strokes.length, entry.strokes)
  const rows = strokes.map((stroke, i) => {
    const { start, end } = endpoints(stroke.d)
    // 사전 좌표는 y가 위로 자란다(scale(1,-1)). 후보와 같은 y-아래 방향으로 뒤집는다
    const source = unit([start[0], flipY - start[1]], [end[0], flipY - end[1]])
    const c = endpoints(entry.paths[i])
    const candidate = unit(c.start, c.end)
    const diff = angle(source, candidate)
    return { stroke: i + 1, source: source.map(n => +n.toFixed(2)), candidate: candidate.map(n => +n.toFixed(2)), angle: diff, flag: diff > 60 }
  })
  report.push({ glyph: entry.glyph, flagged: rows.filter(r => r.flag).map(r => r.stroke), rows })
  await new Promise(r => setTimeout(r, 150))
}
console.log(JSON.stringify(report))
