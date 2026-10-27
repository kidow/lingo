import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {runInNewContext} from 'node:vm'
const repo=new URL('../../',import.meta.url),read=p=>readFileSync(new URL(p,repo)),sha=v=>createHash('sha256').update(v).digest('hex')
const f=JSON.parse(readFileSync(new URL('fixtures-draft.json',import.meta.url))).u7aea
assert.equal(sha(readFileSync(new URL('fixtures-draft.json',import.meta.url))),'9b6539a02fcad5e919ba79b193463f1e26556d434098f0154df0cb8a54a2c91e')
for(const [p,h]of Object.entries(f.inputSHA256))assert.equal(sha(read(p)),h)
const source=read(f.restoration.compilerPath).toString(),body=source.slice(source.indexOf('function originalPrimitiveMask(call){'),source.indexOf('export function compileProgressive'))
assert.equal(sha(body),f.restoration.functionSHA256)
const compile=runInNewContext('('+body.trim()+')',{assert}),original=JSON.parse(read('docs/hanja-component-capture-u7aea-2026-10-27/engine-whole-lingo-u7aea-no-extra-v1.json'))
const groups=[[1],[2],[3,4],[5],[6],[0,7],[8,9],[10],[11],[12],[13],[14],[15]]
assert.deepEqual(f.sourceGroups,groups);assert.deepEqual([...groups.flat()].sort((a,b)=>a-b),Array.from({length:16},(_,i)=>i))
const raw=original.trace.map(t=>t.map(compile)),strokes=groups.map(g=>g.flatMap(i=>raw[i]))
assert.equal(JSON.stringify(strokes),JSON.stringify(f.strokes));assert.equal(sha(JSON.stringify(strokes)),f.compiledSHA256)
assert.equal(strokes.length,13);assert.equal(strokes.flat().length,16);assert.equal(strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0),27)
assert.deepEqual(f.fullProof,{...original,sourceRoot:f.identity.root,sourceProofFile:f.identity.file,sourceProofFileSHA256:f.identity.fileSHA256})
assert.equal(f.provenance.locallyAuthoredRoot,true);assert.equal(f.provenance.originalPublicRootClaim,false)
for(const k of ['temporalGroupingApproved','directionApproved','contactGeometryApproved','animationApproved','nativeApproval','runtimeApplied'])assert.equal(f[k],false)
console.log(JSON.stringify({result:'PASS-local13-source-preserving-draft-only',logical:13,raw:16,masks:16,polygons:27,compiledSHA256:f.compiledSHA256,engine:0,nativeApproval:false,runtimeApplied:false}))
