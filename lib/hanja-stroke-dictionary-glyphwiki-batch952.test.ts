import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch952.json' with {type:'json'}
import {loadGlyphWikiBatch952Strokes,HANJA_DICTIONARY_GLYPHWIKI_BATCH952_STROKES} from './hanja-stroke-dictionary-glyphwiki-batch952.ts'
import {compileProgressive,sourceGroups,selectedProofIdentity,sourceOrderPermutation} from '../docs/hanja-goal-glyphwiki-batch952-2026-10-13/progressive-order-candidate.mjs'

const base = new URL('../docs/hanja-goal-glyphwiki-batch952-2026-10-13/',import.meta.url)
const read = (file:string) => readFileSync(new URL(file,base))
const object = (file:string) => JSON.parse(read(file).toString())
const hash = (value:string|Buffer) => createHash('sha256').update(value).digest('hex')

test('駸 direct literal preserves seventeen complete domestic pens',() => {
  const entry = loadGlyphWikiBatch952Strokes(reviewed)[0]
  assert.deepEqual(HANJA_DICTIONARY_GLYPHWIKI_BATCH952_STROKES,reviewed)
  assert.equal(entry.glyph,'駸')
  assert.equal(entry.paths.length,17)
  assert.equal(entry.outlines!.flat().length,18)
  assert.equal(entry.outlines!.flat().flatMap(mask => mask.outline.match(/M[^Z]+Z/g) || []).length,37)
  assert.deepEqual(entry.sourceStrokeIndices,sourceGroups.map(group => group[0] + 1))
  assert.deepEqual(sourceOrderPermutation,[1,2,4,5,3,6,7,8,9,10,11,12,13,14,15,16,17])
})

test('駸 mandatory exact identity and complete original proof reproduce reviewed masks',() => {
  const preparation = object('source-order-candidate-validation.json')
  for (const [file,pin] of Object.entries(preparation.originalBytePins)) assert.equal(hash(read(file)),pin)
  const header = object('engine-proof.json')
  const selected = object('engine-whole-u99f8.json')
  const proof = {engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(hash(JSON.stringify(proof)),preparation.identityContract.fullSelectedProofSHA256)
  assert.deepEqual(compileProgressive(proof.trace,proof,selectedProofIdentity),reviewed[0].outlines)
  const wrongIdentity = {...selectedProofIdentity,sourceProofFileSHA256:selectedProofIdentity.sourceProofFileSha256}
  assert.throws(() => compileProgressive(proof.trace,proof,wrongIdentity))
  const changed = structuredClone(proof)
  changed.defaults.kWidth += 1
  assert.throws(() => compileProgressive(changed.trace,changed,selectedProofIdentity))
})

test('駸 changed order, mask, license or review identity is rejected',() => {
  const mutations = [
    (entry:typeof reviewed[number]) => {entry.sourceStrokeIndices[2] = 999},
    (entry:typeof reviewed[number]) => {entry.outlines[0][0].weight += 1},
    (entry:typeof reviewed[number]) => {entry.geometryLicense.revision = 'unreviewed source'},
    (entry:typeof reviewed[number]) => {entry.sourceReference.directionReviewSha256 = '0'.repeat(64)},
  ]
  for (const mutate of mutations) {
    const copy = structuredClone(reviewed)
    mutate(copy[0])
    assert.throws(() => loadGlyphWikiBatch952Strokes(copy),/reviewed data mismatch/)
  }
})
