import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {runInNewContext} from 'node:vm'
const repo=new URL('../../',import.meta.url)
const read=p=>readFileSync(new URL(p,repo))
const sha=v=>createHash('sha256').update(v).digest('hex')
const fixture=JSON.parse(readFileSync(new URL('fixtures-draft.json',import.meta.url)))['u83f0']
assert.equal(sha(readFileSync(new URL('fixtures-draft.json',import.meta.url))),'80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485')
for(const [p,h] of Object.entries(fixture.inputSHA256)) assert.equal(sha(read(p)),h,p)
const local=JSON.parse(read('docs/hanja-component-capture-u83f0-2026-10-27/engine-whole-lingo-u83f0-components-v1.json')), parent=JSON.parse(read('docs/hanja-actual-engine-capture-u83f0-var-001-2026-10-27/engine-whole-u83f0-var-001.json'))
const source=read(fixture.restoration.compilerPath).toString()
const body=source.slice(source.indexOf('function originalPrimitiveMask(call){'),source.indexOf('export function compileProgressive'))
assert.equal(sha(body),fixture.restoration.functionSHA256)
const compile=runInNewContext('('+body.trim()+')',{assert})
const groups=[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10,11],[12],[13]]
assert.deepEqual(fixture.sourceGroups,groups)
assert.deepEqual(groups.flat().sort((a,b)=>a-b),Array.from({length:14},(_,i)=>i))
const raw=local.trace.map(t=>t.map(call=>compile(call)))
const strokes=groups.map(g=>g.flatMap(i=>raw[i]))
assert.equal(JSON.stringify(strokes),JSON.stringify(fixture.strokes))
assert.equal(sha(JSON.stringify(strokes)),fixture.compiledSHA256)
assert.deepEqual(fixture.fullProof,{...local,sourceRoot:fixture.identity.root,sourceProofFile:fixture.identity.file,sourceProofFileSHA256:fixture.identity.fileSHA256})
assert.equal(sha(read('docs/hanja-component-capture-u83f0-2026-10-27/engine-whole-lingo-u83f0-components-v1.json')),fixture.identity.fileSHA256)
assert.equal(strokes.length,12);assert.equal(strokes.flat().length,16)
const polygonCount=local.trace.flat().reduce((s,c)=>s+c.polygons.length,0)
assert.equal(polygonCount,34)
assert.equal(strokes.flat().reduce((s,m)=>s+(m.outline.match(/M/g)||[]).length,0),polygonCount)
for(const [li,pi] of [[10,9],[11,10]]) {
 assert.deepEqual(local.groups[li],parent.groups[pi]);assert.deepEqual(local.trace[li],parent.trace[pi])
 assert.equal(JSON.stringify(raw[li]),JSON.stringify(parent.trace[pi].map(call=>compile(call))))
}
assert.equal(strokes[9][0].direction,'down')
assert.equal(strokes[9][1].revealPath,'M60.035 89.3125 Q68.28999999999999 86.3725 74.32249999999999 83.4325')
assert.equal(strokes[9][1].revealWidth,14)
assert.equal(fixture.provenance.locallyAuthoredRoot,true)
for(const k of ['directionApproved','sourceClockApproved','contactGeometryApproved','animationApproved','nativeApproval','runtimeApplied']) assert.equal(fixture[k],false,k)
assert.equal(fixture.provenance.originalPublicRootClaim,false);assert.equal(fixture.dyadicInputBinding.pointStartPolicyAdopted,false)
console.log(JSON.stringify({result:'PASS-draft-bindings-only',logical:12,raw:14,masks:16,polygons:34,compiledSHA256:fixture.compiledSHA256,dyadicInputReusable:true,engine:0,mathReexecuted:false,nativeApproval:false,runtimeApplied:false}))
