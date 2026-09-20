/** Read-only: line up the pinned dictionary reveal of the four unreviewed grade 2 characters against the
 *  licensed candidates, stroke by stroke, and report where the two disagree.
 *  The dictionary SVG is parsed in memory only; nothing proprietary is written. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE } from '../../scripts/hanja-stroke-audit.ts'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const GLYPHS = ['飼', '祐', '庾', '禎']
const catalog = new Map(read('content/hanja/characters/g2.json').characters.map(c => [c.glyph, c.strokes]))
const inventory = read('docs/hanja-g2-inventory-2026-09-15/dictionary-inventory.json')
const di = Object.fromEntries(inventory.fields.map((f, i) => [f, i]))
const dictionaryRows = new Map(inventory.rows.map(r => [r[di.glyph], r]))

const download = async source => {
  const response = await fetch(source.url, { signal: AbortSignal.timeout(180000) })
  return parseCandidates(new Uint8Array(await response.arrayBuffer()), source)
}
const corpora = { MM: await download(MAKE_ME_A_HANZI_SOURCE), Ja: await download(JAPANESE_CANDIDATE_SOURCE), Ko: await download(CANDIDATE_SOURCE) }

const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]))
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

const angle = (a, b) => {
  const norm = Math.hypot(...a) * Math.hypot(...b) || 1
  return Math.round(Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / norm))) * 180 / Math.PI)
}
const vector = s => [s.end[0] - s.start[0], s.end[1] - s.start[1]]
const distance = (a, b) => Math.hypot(a.start[0] - b.start[0], a.start[1] - b.start[1]) + Math.hypot(a.end[0] - b.end[0], a.end[1] - b.end[1])

const findings = []
for (const glyph of GLYPHS) {
  const row = dictionaryRows.get(glyph)
  const url = row[di.svgUrl], sha = row[di.svgSha256]
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  const raw = Buffer.from(await response.arrayBuffer())
  assert.equal(createHash('sha256').update(raw).digest('hex'), sha, glyph + ' dictionary bytes changed')
  const text = raw.toString('utf8')
  const [, tx, flipY] = /scale\(1,-1\) translate\((-?\d+), -(\d+)\)/.exec(text).map(Number)
  const to = ([x, y]) => [+((x + tx) / 1024 * 100).toFixed(1), +((flipY - y) / 1024 * 100).toFixed(1)]
  const dictionary = [...text.matchAll(/<path\b[^>]*>/g)].map(p => attributes(p[0])).filter(p => p['clip-path'])
    .map(p => ({ d: p.d, delay: Number(p.style.match(/--d:\s*(\d+)ms/)[1]) }))
    .sort((a, b) => a.delay - b.delay)
    .map(stroke => { const { start, end } = endpoints(stroke.d); return { start: to(start), end: to(end) } })

  const candidates = Object.entries(corpora)
    .map(([name, list]) => [name, list.find(entry => entry.character === glyph)])
    .filter(([, entry]) => entry)
    .map(([name, entry]) => [name, entry.medians.map(m => ({
      start: [+(m[0][0] / 10).toFixed(1), +((900 - m[0][1]) / 10).toFixed(1)],
      end: [+(m.at(-1)[0] / 10).toFixed(1), +((900 - m.at(-1)[1]) / 10).toFixed(1)],
    }))])

  const record = { glyph, catalogStrokes: catalog.get(glyph), dictionaryStrokes: dictionary.length, candidates: {} }
  for (const [name, strokes] of candidates) {
    // Walk both sequences together; when the counts differ, the extra dictionary stroke is the split we are looking for.
    const pairs = []
    let i = 0, j = 0
    while (i < dictionary.length && j < strokes.length) {
      const direct = distance(dictionary[i], strokes[j])
      const skipped = i + 1 < dictionary.length ? distance(dictionary[i + 1], strokes[j]) : Infinity
      if (dictionary.length > strokes.length && skipped + 4 < direct) { pairs.push({ dictionaryStroke: i + 1, candidateStroke: null }); i += 1; continue }
      pairs.push({ dictionaryStroke: i + 1, candidateStroke: j + 1, angle: angle(vector(dictionary[i]), vector(strokes[j])) })
      i += 1; j += 1
    }
    const matched = pairs.filter(p => p.candidateStroke)
    // Two neighbouring strokes over the threshold usually mean the pair is simply written in the other order.
    const swaps = []
    for (let k = 0; k + 1 < matched.length; k++) {
      if (matched[k].angle <= 60 || matched[k + 1].angle <= 60) continue
      const a = angle(vector(dictionary[matched[k].dictionaryStroke - 1]), vector(strokes[matched[k + 1].candidateStroke - 1]))
      const b = angle(vector(dictionary[matched[k + 1].dictionaryStroke - 1]), vector(strokes[matched[k].candidateStroke - 1]))
      if (a <= 60 && b <= 60) swaps.push({ candidateStrokes: [matched[k].candidateStroke, matched[k + 1].candidateStroke], anglesAfterSwap: [a, b] })
    }
    record.candidates[name] = {
      resolvedByNeighbourSwap: swaps,
      strokes: strokes.length,
      unmatchedDictionaryStrokes: pairs.filter(p => !p.candidateStroke).map(p => p.dictionaryStroke),
      worstAngle: Math.max(...matched.map(p => p.angle)),
      overSixtyDegrees: matched.filter(p => p.angle > 60).map(p => `${p.dictionaryStroke}:${p.angle}°`),
      pairs,
    }
  }
  findings.push(record)
  await new Promise(resolve => setTimeout(resolve, 150))
}

console.log(JSON.stringify({
  schemaVersion: 1, date: '2026-09-20',
  purpose: 'Stroke-level comparison of the four unreviewed grade 2 characters against the pinned licensed corpora. Diagnosis only; nothing is approved here.',
  corpora: { MM: MAKE_ME_A_HANZI_SOURCE.url, Ja: JAPANESE_CANDIDATE_SOURCE.url, Ko: CANDIDATE_SOURCE.url },
  proprietaryAssetsSaved: 0, findings,
}, null, 2))
