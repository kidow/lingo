import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch960.json' with {type:'json'}
import {loadGlyphWikiBatch960Strokes,HANJA_DICTIONARY_GLYPHWIKI_BATCH960_STROKES} from './hanja-stroke-dictionary-glyphwiki-batch960.ts'
import {compileSourceWhole,compileProgressive,sourceGroups,wholeSourceIdentities} from '../docs/hanja-goal-glyphwiki-batch960-2026-10-13/progressive.mjs'
const base=new URL('../docs/hanja-goal-glyphwiki-batch960-2026-10-13/',import.meta.url)
const read=(f:string)=>readFileSync(new URL(f,base)),obj=(f:string)=>JSON.parse(read(f).toString()),sha=(b:string|Uint8Array)=>createHash('sha256').update(b).digest('hex')
const audit=obj('native-server-source-audit.json'),review=obj('review.json'),header=obj('engine-proof.json'),selected=obj(audit.selectedProof)
const proof={engineRevision:header.engineRevision,engineHashes:header.engineHashes,...selected}
const outer={root:audit.selectedWhole,sourceProofFile:audit.selectedProof,sourceProofFileSHA256:audit.inputSHA256[audit.selectedProof],engineHeaderSHA256:audit.inputSHA256['engine-proof.json'],sourceFileSHA256:audit.inputSHA256['sources.json'],compilerFileSHA256:audit.inputSHA256['progressive.mjs']}
function compileStrict(trace:readonly unknown[],p:typeof proof,id:typeof outer) {
 assert.deepEqual(id,outer)
 assert.deepEqual(Object.keys(p).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(p)),review.callerContract.fullProofSHA256)
 const inner=wholeSourceIdentities.u50e4
 assert.deepEqual(inner,review.callerContract.innerFileIdentity)
 return compileSourceWhole('u50e4',trace,p,inner)
}

test('僤 reviewed source remains the original fourteen-pen base whole',()=>{
 for(const[f,digest]of Object.entries({...audit.inputSHA256,...review.additionalOriginalBytePins}))assert.equal(sha(read(f)),digest,f)
 assert.equal(Object.keys(audit.inputSHA256).length,13)
 const before=JSON.stringify(proof),out=compileStrict(proof.trace,proof,outer)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),review.compiledSHA256)
 assert.deepEqual(out,reviewed[0].outlines);assert.equal(out.length,14);assert.equal(out.flat().length,14)
 assert.equal(proof.groups.reduce((n:number,g:{polygons:unknown[]})=>n+g.polygons.length,0),24)
 assert.deepEqual(reviewed[0].paths,out.map(pen=>pen.map(m=>m.outline).join(' ')))
 assert.deepEqual(reviewed[0].sourceStrokeIndices,sourceGroups.map(g=>g[0]+1))
 assert.deepEqual(review.sourceOrderPermutation,Array.from({length:14},(_,i)=>i+1))
})
test('僤 nested full-five proof, outer-six and mandatory inner-three identity reject substitutions',()=>{
 assert.deepEqual(Object.keys(outer).sort(),['compilerFileSHA256','engineHeaderSHA256','root','sourceFileSHA256','sourceProofFile','sourceProofFileSHA256'])
 assert.deepEqual(Object.keys(wholeSourceIdentities.u50e4).sort(),['file','fileSHA256','root'])
 assert.throws(()=>compileStrict(proof.trace,proof,{...outer,root:'u50e4-ue0102'}))
 const extraProof={...proof,sourceRoot:'u50e4'};assert.throws(()=>compileStrict(proof.trace,extraProof,outer))
 assert.throws(()=>Reflect.apply(compileSourceWhole,null,['u50e4',proof.trace,proof]))
 assert.throws(()=>Reflect.apply(compileProgressive,null,[proof.trace,proof]))
 const badId={...wholeSourceIdentities.u50e4,fileSHA256:'0'.repeat(64)}
 assert.throws(()=>compileSourceWhole('u50e4',proof.trace,proof,badId))
 const extraId={...wholeSourceIdentities.u50e4,sourceRoot:'u50e4'}
 assert.throws(()=>compileSourceWhole('u50e4',proof.trace,proof,extraId))
})
test('僤 runtime record preserves geometry, attribution and root native approval',()=>{
 assert.deepEqual(loadGlyphWikiBatch960Strokes(reviewed),HANJA_DICTIONARY_GLYPHWIKI_BATCH960_STROKES)
 const e=reviewed[0],g=JSON.parse(readFileSync(new URL('../public/hanja-strokes/glyphwiki/u50e4.json',import.meta.url)).toString())
 assert.equal(g.root,'u50e4');assert.equal(e.geometrySource,sha(readFileSync(new URL('../public/hanja-strokes/glyphwiki/u50e4.json',import.meta.url))))
 assert.equal(e.geometryLicense.spdx,'LicenseRef-GlyphWiki');assert.equal(e.geometryLicense.editableSource,'/hanja-strokes/glyphwiki/u50e4.json')
 assert.match(e.geometryLicense.revision,/all11 family records;4 roots;0 historical dependencies/)
 assert.equal(e.sourceReference.dictionarySvgSha256,'9aeae7cf268eea014268cc1b5c0ca1d8b9bb12af8b968decc56b4f94c1cedcf7')
 for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'] as const)assert.equal(e.sourceReference[key],sha(read('review.json')))
 assert.equal(review.nativeApproval,true);assert.equal(review.progressiveFramesApproved,126)
 assert.deepEqual(review.curveFineChecks.map((c:{pen:number})=>c.pen),[1,3,4,6,7,9,10]);assert.deepEqual(review.maskBoundaryObservations,[])
 assert.deepEqual(review.actualReplayProgress,[{pen:10,observedPercent:3.5475,completedAX:100,completedScreenshot:true,passed:true}])
 for(const mutate of [(x:any)=>x[0].paths.reverse(),(x:any)=>x[0].outlines[0][0].width++,(x:any)=>x[0].geometryLicense.spdx='MIT',(x:any)=>x[0].sourceReference.orderReviewSha256='0'.repeat(64)]){const changed=structuredClone(reviewed);mutate(changed);assert.throws(()=>loadGlyphWikiBatch960Strokes(changed))}
})

