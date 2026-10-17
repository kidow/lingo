import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch958.json' with {type:'json'}
import {loadGlyphWikiBatch958Strokes,HANJA_DICTIONARY_GLYPHWIKI_BATCH958_STROKES} from './hanja-stroke-dictionary-glyphwiki-batch958.ts'
import {compileSourceWhole,compileProgressive,sourceGroups,sourceOrderPermutation,wholeSourceIdentities} from '../docs/hanja-goal-glyphwiki-batch958-2026-10-13/progressive-order-candidate.mjs'

const base = new URL('../docs/hanja-goal-glyphwiki-batch958-2026-10-13/',import.meta.url)
const read = (file:string) => readFileSync(new URL(file,base))
const object = (file:string) => JSON.parse(read(file).toString())
const hash = (value:string|Buffer) => createHash('sha256').update(value).digest('hex')

test('蘀 direct literal preserves twenty complete VS2 pens',() => {
  const entry = loadGlyphWikiBatch958Strokes(reviewed)[0]
  assert.deepEqual(HANJA_DICTIONARY_GLYPHWIKI_BATCH958_STROKES,reviewed)
  assert.equal(entry.glyph,'蘀')
  assert.equal(entry.paths.length,20)
  assert.equal(entry.outlines!.flat().length,21)
  assert.equal(entry.outlines!.flat().flatMap(mask => mask.outline.match(/M[^Z]+Z/g) || []).length,41)
  assert.deepEqual(entry.sourceStrokeIndices,sourceGroups.map(group => group[0] + 1))
  assert.deepEqual(sourceOrderPermutation,[1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
  assert(entry.geometryLicense.revision.includes('exact whole u8600-ue0102'))
})

test('蘀 exact full8 proof and mandatory file identity reproduce all original masks',() => {
  const preparation = object('source-order-combined-preparation.json')
  for (const [file,pin] of Object.entries(preparation.originalInputBytePins)) assert.equal(hash(read(file)),pin)
  const root = 'u8600-ue0102'
  const identity = wholeSourceIdentities[root]
  const header = object('engine-proof.json')
  const selected = object(identity.file)
  const proof = {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected,sourceRoot:root,sourceProofFile:identity.file,sourceProofFileSHA256:identity.fileSHA256}
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','sourceProofFile','sourceProofFileSHA256','sourceRoot','trace'])
  assert.deepEqual(Object.keys(identity).sort(),['file','fileSHA256','root'])
  assert.equal(hash(JSON.stringify(proof)),preparation.fullProofSHA256)
  assert.deepEqual(compileSourceWhole(root,proof.trace,proof,identity),reviewed[0].outlines)
  assert.throws(() => Reflect.apply(compileSourceWhole,null,[root,proof.trace,proof]))
  assert.throws(() => Reflect.apply(compileProgressive,null,[proof.trace,proof]))
  assert.throws(() => compileSourceWhole('u8600',proof.trace,proof,identity))
  const wrongCase = {...identity,fileSha256:identity.fileSHA256}
  assert.throws(() => compileSourceWhole(root,proof.trace,proof,wrongCase))
})

test('蘀 changed domestic order, mask or review attribution is rejected',() => {
  const mutations = [
    (entry:typeof reviewed[number]) => {entry.sourceStrokeIndices[2] = 999},
    (entry:typeof reviewed[number]) => {entry.outlines[0][0].weight += 1},
    (entry:typeof reviewed[number]) => {entry.geometryLicense.revision = 'unselected connected grass source'},
    (entry:typeof reviewed[number]) => {entry.sourceReference.directionReviewSha256 = '0'.repeat(64)},
  ]
  for (const mutate of mutations) {
    const copy = structuredClone(reviewed)
    mutate(copy[0])
    assert.throws(() => loadGlyphWikiBatch958Strokes(copy),/reviewed data mismatch/)
  }
})
