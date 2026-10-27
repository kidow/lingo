import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const root=new URL('../../',import.meta.url),read=p=>readFileSync(new URL(p,root)),sha=v=>createHash('sha256').update(v).digest('hex')
const fixtureBytes=readFileSync(new URL('fixtures-draft.json',import.meta.url)),fixture=JSON.parse(fixtureBytes),f=fixture.u8587
assert.equal(sha(fixtureBytes),'da117bf26e5d70e342e5ab5ae44767e002d663f80da72c7b123b1a1522707fd5')
assert.deepEqual(Object.keys(fixture),['u8587'])
for(const [path,pin]of Object.entries(f.inputSHA256))assert.equal(sha(read(path)),pin,path)
const originalPath='docs/hanja-component-capture-u8587-2026-10-27/engine-whole-lingo-u8587-components-v1.json',original=JSON.parse(read(originalPath))
assert.equal(sha(read(originalPath)),'fd502e9f6caeb2eef26c2f9596319f1fa703b0cd072d73d2738c8e08c5a71202')
assert.deepEqual(f.identity,{root:'lingo-u8587-components-v1',file:'engine-whole-lingo-u8587-components-v1.json',fileSHA256:sha(read(originalPath))})
assert.deepEqual(f.fullProof,{...original,sourceRoot:f.identity.root,sourceProofFile:f.identity.file,sourceProofFileSHA256:f.identity.fileSHA256})
assert.equal(sha(JSON.stringify(f.fullProof)),'637144a10ea5697a147e831030251285b047eba8ebdf4d9bb5a00342f0b1d7d6')
const compiler=read(f.restoration.compilerPath).toString(),body=compiler.slice(compiler.indexOf('function originalPrimitiveMask(call){'),compiler.indexOf('export function compileProgressive'))
assert.equal(sha(compiler),f.restoration.compilerSHA256);assert.equal(sha(body),'108f4a3a422b3d1039020ef5618956829cbcbab38b31b3cc778e94c98c4ef10b')
// Verify pinned once-produced results. Do not re-execute the compiler or engine.
assert.equal(f.restoration.successfulCompilerPasses,1);assert.equal(f.restoration.originalPrimitiveMaskCalls,22);assert.equal(f.restoration.actualVMContexts,1);assert.equal(f.restoration.compilerModuleEvaluated,false)
const groups=[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13,14],[15],[16],[17],[18]]
assert.deepEqual(f.sourceGroups,groups);assert.deepEqual([...groups.flat()].sort((a,b)=>a-b),Array.from({length:19},(_,i)=>i))
assert.equal(sha(JSON.stringify(f.strokes)),'3700d16a0661f86803707df324e76d2305f2b8e180baa38e6dbc1fefa860f67a');assert.equal(f.compiledSHA256,sha(JSON.stringify(f.strokes)))
assert.equal(f.strokes.length,17);assert.equal(f.strokes.flat().length,22);assert.equal(original.trace.length,19);assert.equal(original.trace.flat().length,22)
assert.deepEqual(f.strokes.map(p=>p.length),[1,1,1,1,1,1,1,1,2,1,1,2,4,1,1,1,1])
assert.equal(original.trace.flat().reduce((n,c)=>n+c.polygons.length,0),45);assert.equal(f.strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),45)
for(let logical=0;logical<groups.length;logical++){
 let offset=0
 for(const raw of groups[logical]){
  const binding=f.restoration.rawBindings[raw],calls=original.trace[raw],segments=f.strokes[logical].slice(offset,offset+calls.length)
  assert.equal(binding.rawOneBased,raw+1);assert.equal(binding.callCount,calls.length);assert.equal(binding.originalTraceSHA256,sha(JSON.stringify(calls)));assert.equal(binding.compiledSegmentsSHA256,sha(JSON.stringify(segments)));offset+=calls.length
 }
 assert.equal(offset,f.strokes[logical].length)
}
let at=0
for(const raw of groups[12])for(let callIndex=0;callIndex<original.trace[raw].length;callIndex++){
 const call=original.trace[raw][callIndex],fact=f.source13.publicGuideFacts[at],segment=f.strokes[12][at++]
 assert.equal(fact.localRawOneBased,raw+1);assert.equal(fact.callOneBased,callIndex+1);assert.equal(fact.kind,call.kind);assert.deepEqual(fact.args,call.args)
 assert.deepEqual(fact.normalizedStart,call.args.slice(0,2).map(v=>v/2));assert.deepEqual(fact.normalizedControl,call.kind==='cdDrawCurve'?call.args.slice(2,4).map(v=>v/2):null);assert.deepEqual(fact.normalizedEnd,(call.kind==='cdDrawCurve'?call.args.slice(4,6):call.args.slice(2,4)).map(v=>v/2))
 assert.equal(fact.compiledDirection,segment.direction);assert.equal(fact.revealPath,segment.revealPath??null);assert.equal(fact.revealWidth,segment.revealWidth??null);assert.equal(fact.weight,segment.weight)
}
assert.equal(at,4);assert.equal(f.source13.roundedHookCompatibilityPending,true);assert.equal(f.source13.originalSourceMicroClockEquivalent,false)
assert.equal(f.provenance.locallyAuthoredRoot,true);assert.equal(f.provenance.mixedParts,true);assert.equal(f.provenance.originalPublicRootClaim,false);assert.equal(f.provenance.originalWhole,false)
assert.equal(f.membership.body13ConditionalReuseExact,true);assert.equal(f.membership.staticMembershipApproved,false);assert.equal(f.membership.source13TerminalCompatibilityApproved,false)
for(const key of ['temporalGroupingApproved','directionApproved','sourceClockApproved','contactGeometryApproved','animationApproved','nativeApproval','runtimeApplied'])assert.equal(f[key],false,key)
console.log(JSON.stringify({status:'PASS-source-preserving-draft-bindings-only',logical:17,raw:19,masks:22,polygons:45,compiledSHA256:f.compiledSHA256,primitiveCompilerRunsByVerifier:0,engine:0,source13CompatibilityApproved:false,nativeApproval:false,runtimeApplied:false}))
