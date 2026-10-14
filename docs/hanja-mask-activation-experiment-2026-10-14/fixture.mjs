// Public fixed source geometry only. Original857 documents/compiler are read-only dependencies.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { compileSourceWhole } from '../hanja-goal-glyphwiki-batch857-2026-10-13/progressive-native-boundary-compiler.mjs'
const sha=bytes=>createHash('sha256').update(bytes).digest('hex')
export function loadFixture() {
  const contract=JSON.parse(readFileSync(new URL('./contract.json',import.meta.url)))
  for(const [file,pin]of Object.entries(contract.sourcePins))assert.equal(sha(readFileSync(new URL(contract.sourceDirectory+file,import.meta.url))),pin,file)
  const registry=contract.registryRevalidation
  if(registry){
    assert.equal(registry.file,'lib/hanja-strokes.ts','Only the explicitly revalidated registry reference may change')
    assert.equal(registry.originalSHA256,contract.runtimeReferencePins[registry.file],'Original registry pin must remain preserved')
    assert.equal(registry.actualRuntimeAbsent,true,'The isolated target must remain unapplied')
    assert.equal(registry.nativeApproval,false,'Registry revalidation does not grant native approval')
  }
  for(const [file,pin]of Object.entries(contract.runtimeReferencePins))assert.equal(sha(readFileSync(new URL('../../'+file,import.meta.url))),file===registry?.file?registry.currentSHA256:pin,file)
  const raw=JSON.parse(readFileSync(new URL(contract.sourceDirectory+contract.sourceIdentity.sourceProofFile,import.meta.url)))
  const header=JSON.parse(readFileSync(new URL(contract.sourceDirectory+'engine-proof.json',import.meta.url)))
  const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...raw}
  const before=JSON.stringify(proof),strokes=compileSourceWhole(contract.sourceIdentity.sourceRoot,proof.trace,proof,contract.sourceIdentity)
  assert.equal(JSON.stringify(proof),before)
  assert.equal(sha(JSON.stringify(strokes)),contract.compiledSHA256)
  assert.equal(strokes.length,17);assert.equal(strokes.flat().length,20)
  const metadata=JSON.parse(readFileSync(new URL(contract.sourceDirectory+'metadata.json',import.meta.url)))
  return {strokes,contract,dictionary:metadata.dictionary,sourceInputImmutable:true,nativeApproval:false,runtimeApplied:false}
}
