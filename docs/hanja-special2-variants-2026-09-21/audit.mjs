/** Read-only source/count/direction triage. Never saves dictionary geometry or approves playback. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseCandidates } from '../../scripts/hanja-stroke-audit.ts'
import { svgMetadata } from '../hanja-special2-inventory-2026-09-18/dictionary-audit.mjs'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]))
const base = 'http://www.e-hanja.kr/e-hanja/dic/contents/'

// Endpoint vectors are a screening signal only. They cannot establish the direction of a hook,
// the shape along a curve, correspondence between strokes, or a legitimate Korean variant.
export function endpoints(path) {
  const tokens = path.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g) ?? []
  let index = 0, command = '', x = 0, y = 0, first = null, subpath = null
  while (index < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[index])) command = tokens[index++]
    const upper = command.toUpperCase(), relative = command !== upper
    assert.ok('MLHVCSQTZ'.includes(upper) && upper, 'Unsupported path command: ' + command)
    if (upper === 'Z') {
      assert.ok(subpath)
      ;[x, y] = subpath
      command = ''
      continue
    }
    const count = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2 }[upper]
    const values = tokens.slice(index, index + count).map(Number)
    assert.equal(values.length, count)
    assert.ok(values.every(Number.isFinite), 'Malformed path arguments')
    index += count
    if (upper === 'H') x = values[0] + (relative ? x : 0)
    else if (upper === 'V') y = values[0] + (relative ? y : 0)
    else {
      x = values.at(-2) + (relative ? x : 0)
      y = values.at(-1) + (relative ? y : 0)
    }
    first ??= [x, y]
    if (upper === 'M') {
      subpath = [x, y]
      command = relative ? 'l' : 'L'
    }
  }
  assert.ok(first)
  return { start: first, end: [x, y] }
}

export function angle(a, b) {
  const denominator = Math.hypot(...a) * Math.hypot(...b)
  if (!denominator) return null
  return Math.round(Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / denominator))) * 180 / Math.PI)
}

async function receive(url, options = {}) {
  const response = await fetch(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(45000) })
  const bytes = Buffer.from(await response.arrayBuffer())
  assert.equal(response.status, 200, url + ': HTTP ' + response.status)
  return { bytes: bytes.length, sha256: hash(bytes), text: bytes.toString('utf8') }
}

export async function audit() {
  const blocked = read('docs/hanja-special2-queue-2026-09-20/blocked.json')
  const selected = blocked.groups.dictionaryCountDiffers
  assert.equal(selected.length, 35)
  const catalog = new Map(read('content/hanja/characters/special-2.json').characters.map(c => [c.glyph, c]))
  const previous = read('docs/hanja-special2-inventory-2026-09-18/dictionary-inventory.json')
  const old = new Map(previous.rows.map(row => {
    const record = Object.fromEntries(previous.fields.map((field, i) => [field, row[i]]))
    return [record.glyph, record]
  }))
  const corpora = {}
  for (const [id, pin] of Object.entries(blocked.corpora)) {
    const response = await fetch(pin.url, { signal: AbortSignal.timeout(180000) })
    assert.equal(response.status, 200)
    const entries = parseCandidates(new Uint8Array(await response.arrayBuffer()), pin)
    corpora[id] = new Map(entries.filter(entry => selected.some(c => c.glyph === entry.character)).map(entry => [entry.character, entry]))
  }
  const stylesheetUrl = 'http://img.e-hanja.kr/hanjaSvg/aniSVG/libs/opmGna.svg.ani.min.css'
  const css = await receive(stylesheetUrl)
  assert.match(css.text, /animation:framesRadical var\(--t\) linear forwards var\(--d\)/)
  assert.match(css.text, /animation:framesNormal var\(--t\) linear forwards var\(--d\)/)
  const records = []
  for (const item of selected) {
    const { glyph } = item
    assert.equal(catalog.get(glyph)?.strokes, item.catalogStrokes)
    const record = { ...item, matchingCandidates: [], dictionary: null, error: null }
    try {
      const detail = await receive(base + 'jajun_contentA.asp', { method: 'POST', body: new URLSearchParams({
        qry: '', snd: '', hanja: glyph, pageNo: '', keyfield: '', keyword: glyph, hanjaGrade: '', backUrl: '',
      }) })
      const displayed = Number(detail.text.match(/title=["']\s*(\d+)획 열람\s*["']/)?.[1])
      assert.equal(displayed, item.dictionaryStrokes, glyph + ': dictionary count changed')
      const iframe = [...detail.text.matchAll(/<iframe\b[^>]*>/g)].map(m => attributes(m[0])).find(a => a.id === 'svgAni')
      assert.ok(iframe?.src)
      const url = new URL(iframe.src, base)
      assert.equal(url.origin, 'http://img.e-hanja.kr')
      assert.match(url.pathname, /^\/hanjaSvg\/aniSVG\/[A-F\d]+\/[A-F\d]+\.svg$/)
      const svg = await receive(url.href)
      const metadata = svgMetadata(svg.text)
      assert.equal(metadata.title, glyph)
      assert.equal(metadata.outlines, displayed)
      assert.equal(metadata.animated, displayed)
      assert.ok(metadata.timingSequenceValid && metadata.clipCoverageValid)
      assert.match(svg.text, /scale\(1,-1\)/, 'Unexpected source direction transform')
      record.dictionary = { url: url.href, bytes: svg.bytes, sha256: svg.sha256,
        unchangedSinceInventory: svg.sha256 === old.get(glyph).svgSha256,
        detailBytes: detail.bytes, detailSha256: detail.sha256, ...metadata }
      const strokes = [...svg.text.matchAll(/<path\b[^>]*>/g)].map(m => attributes(m[0]))
        .filter(p => p['clip-path']).map(p => ({ path: p.d, delay: Number(p.style.match(/--d:\s*(\d+(?:\.\d+)?)ms/)[1]) }))
        .sort((a, b) => a.delay - b.delay)
      const vectors = strokes.map(p => { const s = endpoints(p.path); return [s.end[0] - s.start[0], s.start[1] - s.end[1]] })
      for (const [id, corpus] of Object.entries(corpora)) {
        const candidate = corpus.get(glyph)
        assert.equal(candidate?.medians.length, item.corpora[id], glyph + ': pinned corpus count drift ' + id)
        if (!candidate || candidate.medians.length !== displayed) continue
        assert.equal(candidate.strokes.length, displayed)
        assert.ok(candidate.medians.every(m => m.length >= 2 && m.every(p => p.length === 2 && p.every(Number.isFinite))))
        const candidateVectors = candidate.medians.map(m => [m.at(-1)[0] - m[0][0], m[0][1] - m.at(-1)[1]])
        const angles = vectors.map((v, i) => angle(v, candidateVectors[i]))
        const possibleNeighbourSwaps = []
        for (let i = 0; i + 1 < angles.length; i++) {
          if (angles[i] === null || angles[i + 1] === null || angles[i] <= 60 || angles[i + 1] <= 60) continue
          const crossed = [angle(vectors[i], candidateVectors[i + 1]), angle(vectors[i + 1], candidateVectors[i])]
          if (crossed.every(a => a !== null && a <= 60)) possibleNeighbourSwaps.push({ strokes: [i + 1, i + 2], crossedAngles: crossed })
        }
        record.matchingCandidates.push({ corpus: id, strokes: displayed,
          candidateSha256: hash(JSON.stringify(candidate)), angles,
          overSixty: angles.flatMap((a, i) => a === null || a > 60 ? [i + 1] : []), possibleNeighbourSwaps })
      }
    } catch (error) { record.error = error.message }
    records.push(record)
  }
  return { schemaVersion: 1, capturedAt: new Date().toISOString(),
    purpose: 'Special grade II count-conflict triage; no visual approval or runtime promotion.',
    corpora: blocked.corpora, stylesheet: { url: stylesheetUrl, bytes: css.bytes, sha256: css.sha256 },
    proprietaryAssetsSaved: 0, runtimeApprovalsAdded: 0, records }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await audit()))
