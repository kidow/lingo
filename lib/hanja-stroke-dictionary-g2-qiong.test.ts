import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData } from './hanja-strokes.ts'
import { HANJA_DICTIONARY_G2_QIONG_STROKES, loadG2QiongDictionaryBundle } from './hanja-stroke-dictionary-g2-qiong.ts'
import { buildG2QiongDictionaryBundle, G2_QIONG_DICTIONARY_PROOF_PINS, validateG2QiongDictionaryProofs, validateG2QiongDictionaryBundle } from '../scripts/hanja-stroke-dictionary-g2-qiong.ts'
import { dictionaryGeometry, validateDictionaryReview } from '../scripts/hanja-stroke-dictionary.ts'
import { auditStrokes } from '../scripts/hanja-stroke-audit.ts'

const read = (p: string) => readFileSync(new URL('../' + p, import.meta.url), 'utf8')
const dir = 'docs/hanja-g2-qiong-2026-09-16/'
const originals = (JSON.parse(read(dir + 'originals.json')) as {
  entries: { glyph: string; strokes: number; dictionaryStrokes: number; medians: number[][][]; paths: string[] }[]
}).entries
const points = (p: string) => [...p.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(m => [+m[1], +m[2]])
const distanceTo = (p: number[], path: number[][]) => Math.min(...path.slice(1).map((b, i) => {
  const a = path[i], dx = b[0]-a[0], dy = b[1]-a[1]
  const t = Math.max(0, Math.min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)))
  return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)
}))

const entry = HANJA_DICTIONARY_G2_QIONG_STROKES[0]
test('瓊 uses 19 strokes with explicit whole-source provenance and only 15 common dictionary stages', () => {
  validateG2QiongDictionaryBundle()
  assert.equal(entry.glyph, '瓊')
  assert.equal(entry.paths.length, 19)
  assert.deepEqual(hanjaStrokeData({glyph:'瓊',strokes:19}),entry)
  assert.equal(hanjaStrokeData({glyph:'瓊',strokes:18}),null)
  assert.equal(entry.sourceReference.dictionaryDirectionStrokes, Array.from({length:15},(_,i)=>i+1).join(','))
  assert.equal(entry.sourceReference.orderUrl,'https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=29898&la=0')
  assert.deepEqual(dictionaryGeometry('瓊',originals[0].medians).paths,entry.paths)
  validateDictionaryReview(entry,19)
  const catalog = JSON.parse(read('content/hanja/characters/g2.json')).characters.filter((c:{glyph:string})=>c.glyph==='瓊')
  const candidates = originals.map(o=>({character:o.glyph,medians:o.medians,strokes:o.paths}))
  const audit = auditStrokes(catalog,[],[entry],[],candidates)
  assert.equal(audit.verificationSources.dictionary,1)
  assert.equal(audit.verificationSources.eomunhoe,0)
  assert.equal(new Set(HANJA_STROKES.map(e=>e.glyph)).size,HANJA_STROKES.length)
})
test('目 internal bars close onto the right edge and final 攵 retains four separate directed strokes', () => {
  for (let i=0;i<19;i++) {
    if ([12,13].includes(i)) {
      assert.equal(entry.sourceStrokeIndices[i],null)
      assert.ok(distanceTo(points(entry.paths[i]).at(-1)!,points(entry.paths[11]))<0.15)
      assert.ok(points(entry.paths[i]).at(-1)![0]>points(entry.paths[i])[0][0])
      assert.ok(distanceTo(points(originals[0].paths[i]).at(-1)!,points(entry.paths[11]))>5)
    } else assert.equal(entry.paths[i],originals[0].paths[i])
  }
  for (const n of [15,17]) {
    const p=points(entry.paths[n]); assert.ok(p.at(-1)![0]<p[0][0]); assert.ok(p.at(-1)![1]>p[0][1])
  }
  for (const n of [16,18]) assert.ok(points(entry.paths[n]).at(-1)![0]>points(entry.paths[n])[0][0])
  assert.throws(()=>validateDictionaryReview({...entry,paths:originals[0].paths},19),/published entry/)
  const swapped={...entry,paths:[...entry.paths]}
  ;[swapped.paths[16],swapped.paths[17]]=[swapped.paths[17],swapped.paths[16]]
  assert.throws(()=>validateDictionaryReview(swapped,19),/published entry/)
})
test('proofs bind Korean form rulings, the MOE whole sequence and an exact one-character allowlist', () => {
  for (const file of Object.keys(G2_QIONG_DICTIONARY_PROOF_PINS))
    assert.throws(()=>validateG2QiongDictionaryProofs(p=>read(p)+(p===file?' ':'')),/proof mismatch/)
  const basis=JSON.parse(read(dir+'count-basis.json'))
  assert.deepEqual(basis.officialRulings.map((r:{id:number})=>r.id),[7946,10717])
  assert.equal(basis.wholeFormSource.strokes,19)
  assert.equal(basis.automaticRadicalApproval,false)
  assert.deepEqual(basis.runtimeToDictionaryStroke.slice(15),[null,null,null,null])
  const unknown=structuredClone(buildG2QiongDictionaryBundle())
  unknown.characters[0].glyph='飼'
  assert.throws(()=>loadG2QiongDictionaryBundle(unknown),/entry mismatch/)
  const malformed=structuredClone(buildG2QiongDictionaryBundle())
  malformed.characters[0].paths=['M0 0 L101 10',...malformed.characters[0].paths.slice(1)]
  assert.throws(()=>loadG2QiongDictionaryBundle(malformed),/entry mismatch/)
  assert.throws(()=>validateG2QiongDictionaryBundle([]),/published bundle/)
})
