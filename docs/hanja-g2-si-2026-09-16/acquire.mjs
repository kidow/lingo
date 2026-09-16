/** Read-only acquisition: source artwork stays in RAM; only licensed medians are emitted. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { parseCandidates, MAKE_ME_A_HANZI_SOURCE } from '../../scripts/hanja-stroke-audit.ts'
import { svgMetadata } from '../hanja-g2-inventory-2026-09-15/dictionary-audit.mjs'
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
export async function acquire() {
  const pin = MAKE_ME_A_HANZI_SOURCE
  const response = await fetch(pin.url, { signal: AbortSignal.timeout(45000) })
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  const candidates = parseCandidates(bytes, pin)
  const entries = []
  for (const [glyph, expected, dictionaryCount] of [['飼',13,13]]) {
    const candidate = candidates.find(c => c.character === glyph)
    assert.equal(candidate.medians.length, expected)
    const detailUrl = 'http://www.e-hanja.kr/e-hanja/dic/contents/jajun_contentA.asp'
    const d = await fetch(detailUrl, { method: 'POST', body: new URLSearchParams({
      qry: '', snd: '', hanja: glyph, pageNo: '', keyfield: '', keyword: glyph, hanjaGrade: '', backUrl: '',
    }), signal: AbortSignal.timeout(20000) })
    assert.equal(d.status, 200)
    const db = Buffer.from(await d.arrayBuffer()), dt = db.toString('utf8')
    const iframe = [...dt.matchAll(/<iframe\b[^>]*>/g)].map(m => m[0]).find(t => /id=["']svgAni["']/.test(t))
    const url = new URL(iframe.match(/src=["']([^"']+)/)[1], detailUrl).href
    const s = await fetch(url, { signal: AbortSignal.timeout(20000) })
    assert.equal(s.status, 200)
    const sb = Buffer.from(await s.arrayBuffer()), svg = svgMetadata(sb.toString('utf8'))
    assert.equal(svg.title, glyph)
    assert.equal(svg.animated, dictionaryCount)
    assert.ok(svg.timingSequenceValid && svg.clipCoverageValid)
    const displayedStrokes = Number(dt.match(/title=["']\s*(\d+)획 열람\s*["']/)?.[1])
    assert.equal(displayedStrokes, dictionaryCount)
    entries.push({ glyph, strokes: expected, catalogStrokes: 14, dictionaryStrokes: dictionaryCount, corpus: 'MM',
      medians: candidate.medians, originalMediansSha256: hash(JSON.stringify(candidate.medians)), paths: normalizeMedians(candidate.medians),
      dictionary: { url, bytes: sb.length, sha256: hash(sb) },
      detail: { url: detailUrl, bytes: db.length, sha256: hash(db), status: d.status, displayedStrokes },
      svg: { ...svg, status: s.status } })
  }
  return { schemaVersion: 1, date: '2026-09-16', purpose: 'Unapproved licensed candidate; fourteen-stroke variant boundaries require review.',
    sources: { MM: { ...pin, bytes: bytes.length } }, entries, characters: 1, strokes: 13, catalogStrokes: 14, dictionaryStrokes: 13,
    proprietaryAssetsSaved: 0, runtimeApprovalsAdded: 0 }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) console.log(JSON.stringify(await acquire()))
