/** Print licensed KanjiVG candidates. No dictionary graphics are persisted. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const revision = '422b5538595676da918c288a4230cb5e22a1ee7e'
const selected = [
  ['纛', '07e9b-Kaisho', 'c221701daedd43d3502cd520dd9f066e228648bf'],
  ['纛', '07e9b-KaishoVtLst', '73ed637cf6eec98a1c208a2ee1274559caa5491e'],
  ['纛', '07e9b', 'f75db5ce8f7f8a856bc345c750cd9b4af71a52f5'],
  ['蘿', '0863f-Kaisho', 'a946c2e05b1de8590259de309bc7f280a9be2cb6'],
  ['蘿', '0863f', 'daecb57e1251d7cdb0f8635da7e8172e0f3f9777'],
  ['藺', '085fa-Kaisho', '0243b0c19ce52f188353310e1430599eb795ff22'],
  ['藺', '085fa', '1084eb351c02b20d398026d327df73caaee0b046'],
]
const previous = JSON.parse(readFileSync(new URL('../hanja-special2-direction-review-2026-09-21/originals.json', import.meta.url)))
const entries = []
for (const [glyph, id, blobSha1] of selected) {
  const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/${revision}/kanji/${id}.svg`
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  const actualBlob = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex')
  assert.equal(actualBlob, blobSha1)
  const text = bytes.toString('utf8')
  assert.ok(text.includes('Attribution-Share Alike 3.0'))
  const strokes = [...text.matchAll(/<path\b[^>]*>/g)].map(([tag]) => {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]))
    const number = attrs.id?.match(/-s(\d+)$/)
    return number ? { index: Number(number[1]), type: attrs['kvg:type'], path: attrs.d } : null
  }).filter(Boolean)
  assert.deepEqual(strokes.map(s => s.index), Array.from({ length: strokes.length }, (_, i) => i + 1))
  assert.ok(strokes.every(s => s.path && s.type))
  const old = previous.entries.find(e => e.glyph === glyph)
  entries.push({ glyph, id, url, revision, blobSha1, bytes: bytes.length,
    svgSha256: createHash('sha256').update(bytes).digest('hex'), viewBox: '0 0 109 109',
    catalogStrokes: old.catalogStrokes, dictionaryStrokes: old.strokes, strokes,
    dictionary: old.dictionary, staticSvg: old.staticSvg, runtimeApproved: false })
}
console.log(JSON.stringify({ schemaVersion: 1, capturedOn: '2026-09-21',
  attribution: 'KanjiVG, Copyright Ulrich Apel; https://kanjivg.tagaini.net/',
  license: 'CC-BY-SA-3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  changes: 'Stroke path data extracted without changing geometry or order.',
  proprietaryAssetsSaved: 0, entries }))
