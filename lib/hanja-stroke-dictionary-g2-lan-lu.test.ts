import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_LAN_LU_STROKES, loadG2LanLuDictionaryBundle } from './hanja-stroke-dictionary-g2-lan-lu.ts'
import { buildG2LanLuDictionaryBundle, G2_LAN_LU_DICTIONARY_PROOF_PINS, validateG2LanLuDictionaryProofs, validateG2LanLuDictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-lan-lu.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-lan-lu-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; dictionaryStrokes: number; medians: number[][][]; paths: string[] }[]
}).entries
const points = (p: string) => [...p.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distanceTo = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((b, i) => {
  const a = path[i], dx = b[0]-a[0], dy = b[1]-a[1]
  const t = Math.max(0, Math.min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)))
  return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)
}))
const entries = HANJA_DICTIONARY_G2_LAN_LU_STROKES
const lan = entries[0], lu = entries[1]

test('藍 and 蘆 play 18/20 strokes while retaining the true 17/19-stage dictionary provenance', () => {
  validateG2LanLuDictionaryBundle()
  assert.deepEqual(entries.map(e => [e.glyph,e.paths.length]), [['藍',18],['蘆',20]])
  for (const entry of entries) {
    const original = originals.find(e => e.glyph === entry.glyph)!
    assert.deepEqual(hanjaStrokeData({ glyph: entry.glyph, strokes: original.strokes }), entry)
    assert.equal(hanjaStrokeData({ glyph: entry.glyph, strokes: original.dictionaryStrokes }), null)
    assert.equal(entry.sourceReference.dictionaryDirectionStrokes.split(',').length, original.dictionaryStrokes)
    assert.equal(entry.sourceReference.orderUrl, 'https://www.hanja.re.kr/kccpt/exam/otherData.do')
    assert.deepEqual(dictionaryGeometry(entry.glyph, original.medians).paths, entry.paths)
    validateDictionaryReview(entry, original.strokes)
  }
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')).characters
    .filter((c: { glyph: string }) => originals.some(o => o.glyph === c.glyph))
  const candidates = originals.map(o => ({ character:o.glyph,medians:o.medians,strokes:o.paths }))
  const audit = auditStrokes(catalog, [], entries, [], candidates)
  assert.equal(audit.verificationSources.dictionary, 2)
  assert.equal(audit.verificationSources.eomunhoe, 0)
  assert.throws(() => auditStrokes(catalog, [], entries, candidates, []), /geometry mismatch/)
  assert.equal(new Set(HANJA_STROKES.map(e => e.glyph)).size, HANJA_STROKES.length)
})

test('separate grass crosses and six corrected paths preserve the reviewed boundaries and forms', () => {
  assert.deepEqual(lan.sourceStrokeIndices.slice(0,4), [2,1,4,3])
  assert.deepEqual(lu.sourceStrokeIndices.slice(0,4), [2,1,null,3])
  for (const entry of entries) {
    const original = originals.find(o => o.glyph === entry.glyph)!
    let changed = 0
    entry.sourceStrokeIndices.forEach((source, i) => {
      if (source === null) changed++
      else assert.equal(entry.paths[i], original.paths[source-1])
    })
    assert.equal(changed, 3)
    const left = points(entry.paths[0]), right = points(entry.paths[2])
    assert.ok(right[0][0]-left.at(-1)![0] > 5, 'Keep a visible gap between the two crosses')
    for (const n of [0,2]) assert.ok(points(entry.paths[n]).at(-1)![0] > points(entry.paths[n])[0][0])
    for (const n of [1,3]) assert.ok(points(entry.paths[n]).at(-1)![1] > points(entry.paths[n])[0][1])
    const swapped = { ...entry, paths:[...entry.paths] }
    ;[swapped.paths[0],swapped.paths[1]] = [swapped.paths[1],swapped.paths[0]]
    assert.throws(() => validateDictionaryReview(swapped, original.strokes), /published entry/)
  }
  const bar = points(lan.paths[12])
  assert.ok(bar.at(-1)![0]-bar[0][0] > 20)
  assert.ok(Math.abs(bar.at(-1)![1]-bar[0][1]) < 2, '藍 has a horizontal rather than a descending dot')
  assert.deepEqual(points(lan.paths[6]).at(-1), points(lan.paths[7]).at(-1))
  for (const [entry,turn,bottom] of [[lan,15,18],[lu,17,20]] as const) {
    const p = points(entry.paths[turn-1]), end = p.at(-1)!
    assert.ok(Math.max(...p.map(q => q[0]))-end[0] < 4, 'Do not restore a curled-left terminal')
    assert.ok(distanceTo(end,points(entry.paths[bottom-1])) < 0.15, 'Close the right side onto the lower bar')
  }
  const middle = points(lu.paths[12])
  assert.ok(distanceTo(middle[0], points(lu.paths[10])) < 1.5)
  assert.ok(distanceTo(middle.at(-1)!, points(lu.paths[11])) < 1.5)
  const reverted = { ...lan, paths:originals[0].paths }
  assert.throws(() => validateDictionaryReview(reverted, 18), /published entry/)
})

test('proofs bind the official recommendation, whole dictionary playback and explicit two-glyph allowlist', () => {
  for (const file of Object.keys(G2_LAN_LU_DICTIONARY_PROOF_PINS))
    assert.throws(() => validateG2LanLuDictionaryProofs(p => read(p)+(p===file?' ':'')), /proof mismatch/)
  const source = JSON.parse(read(dir+'source-checks.json'))
  for (const e of source.entries) {
    const n = e.svg.animated
    assert.deepEqual(e.strokes.map((s:{xmlIndex:number})=>s.xmlIndex), [n-2,n-1,n,...Array.from({length:n-3},(_,i)=>i+1)])
  }
  const basis = JSON.parse(read(dir+'count-basis.json'))
  assert.match(basis.officialGrass.paragraph, /4획/)
  assert.equal(basis.officialGrass.sourceRow, 7)
  for (const e of basis.entries) {
    assert.equal(e.wholeCanonicalStageSourceFound, false)
    assert.deepEqual(e.runtimeToDictionaryStroke.slice(0,4), [1,2,1,3])
  }
  const malformed = structuredClone(buildG2LanLuDictionaryBundle())
  malformed.characters[0].paths = ['M0 0 L101 10', ...malformed.characters[0].paths.slice(1)]
  assert.throws(() => loadG2LanLuDictionaryBundle(malformed), /entry mismatch/)
  const unknown = structuredClone(buildG2LanLuDictionaryBundle())
  unknown.characters[0].glyph = '葛'
  assert.throws(() => loadG2LanLuDictionaryBundle(unknown), /entry mismatch/)
  assert.throws(() => validateG2LanLuDictionaryBundle([]), /published bundle/)
})
