import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {compileProgressive,selectedProofIdentity,sourceGroups,nativeApproved,runtimeApplied,sourceProposal,renderProgressive} from './candidate.mjs'
const f=JSON.parse(readFileSync(new URL('./fixtures.json',import.meta.url))).hkcs_m840d
const clone=x=>JSON.parse(JSON.stringify(x))
const digest=x=>createHash('sha256').update(x).digest('hex')
test('萍 retains untouched full5, all15raw and12static groups without direction approval',()=>{
 assert.deepEqual(f.identity,selectedProofIdentity)
 assert.equal(digest(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))),f.identity.sourceProofFileSha256)
 assert.deepEqual(f.fullProof,JSON.parse(readFileSync(new URL(f.identity.sourceProofFile,import.meta.url))))
 assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:15},(_,i)=>i))
 assert.equal(f.strokes.length,12);assert.equal(f.strokes.flat().length,15);assert.equal(f.strokes[6].length,4)
 assert.equal(digest(JSON.stringify(f.strokes)),'b2de4a5e668e6ca9f88a63429c7fc09eb37f55ea9175b0ed6f3744e9722e86ae')
 const legacy=clone(f.strokes);for(const row of legacy)for(const segment of row)delete segment.inkPaths
 assert.equal(digest(JSON.stringify(legacy)),'8429d1f323f06bb62d9012115ca61dab045f4aab736da09e1f9f43d7ea6bbb53')
 assert.deepEqual(f.strokes[6].map(s=>s.inkPaths.length),[3,2,2,2])
 const originalP=f.fullProof.groups.slice(6,10).flatMap(g=>g.polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z'))
 assert.deepEqual(f.strokes[6].flatMap(s=>s.inkPaths),originalP)
 assert(f.strokes.every((row,i)=>i===6||row.every(s=>!Object.hasOwn(s,'inkPaths'))))
 assert.equal(sourceProposal.footPaintMode,'each-original-P-independent-nonzero')
 assert.equal(sourceProposal.joinedOutlineCompatibilityOnlyNotApprovedForFootPaint,true)
 assert.equal(sourceProposal.individualGuideDirectionApproved,false);assert.equal(sourceProposal.composite7GuideConnectionApproved,false);assert.equal(sourceProposal.composite7GuideOrderApproved,false)
 assert.equal(nativeApproved,false);assert.equal(runtimeApplied,false)
})
test('萍 exact source gate rejects changed identity, guide, P, rows and reflective inputs before projection',()=>{
 const cases=[]
 const identity=clone(f.identity);identity.sourceRoot='u840d-k';cases.push([f.fullProof.trace,f.fullProof,identity])
 const polygon=clone(f.fullProof);polygon.groups[6].polygons[0][0].x+=0.1;cases.push([polygon.trace,polygon,f.identity])
 const trace=clone(f.fullProof);trace.trace[6][0].args[0]+=0.1;cases.push([trace.trace,trace,f.identity])
 const shortened=clone(f.fullProof);shortened.groups.splice(6,1);shortened.trace.splice(6,1);cases.push([shortened.trace,shortened,f.identity])
 const extra=clone(f.fullProof);extra.unreviewed=true;cases.push([extra.trace,extra,f.identity])
 const prototype=clone(f.fullProof);Object.setPrototypeOf(prototype,{});cases.push([prototype.trace,prototype,f.identity])
 let getterCalls=0;const accessor=clone(f.fullProof);Object.defineProperty(accessor,'defaults',{enumerable:true,get(){getterCalls++;return f.fullProof.defaults}});cases.push([accessor.trace,accessor,f.identity])
 for(const args of cases)assert.throws(()=>compileProgressive(...args))
 assert.equal(getterCalls,0)
})
test('萍 legacy joined paint refuses logical7 and later prefixes',()=>{
 for(const stroke of [7,8,12])assert.throws(()=>renderProgressive(f.strokes,stroke,1),/Independent original-P paint policy required/)
})
