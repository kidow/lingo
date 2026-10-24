import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync}from'node:fs'
import {createHash}from'node:crypto'
import {makeReviewedU9f08TerminalSourceContext as context,reviewedU9f08TerminalPolicy as policy,sampleReviewedU9f08TerminalFrame as frame,REVIEWED_U9F08_TERMINAL_SOURCE as SOURCE} from './hanja-stroke-original-terminal-u9f08.ts'
const file=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(file(p).toString()),sha=(b:Buffer|string)=>createHash('sha256').update(b).digest('hex')
test('鼈17m3 exact source body/right bulb and four-vertex up terminal preserve allP and atomic direct completion',()=>{
 const f=json(SOURCE.fixture).u9f08,proof=json(SOURCE.proofFile)
 assert.equal(sha(file(SOURCE.fixture)),SOURCE.fixtureSHA256);assert.equal(sha(file(SOURCE.proofFile)),SOURCE.proofSHA256)
 assert.equal(sha(file(SOURCE.contextModule)),SOURCE.contextModuleSHA256)
 const c=context(f.fullProof,f.identity,f.strokes);assert.ok(c);const p=policy(c,16,2);assert.ok(p)
 const paths=f.strokes[16][2].outline.match(/M[^M]+/g).map((s:string)=>s.trim())
 assert.equal(paths.length,3);assert.equal(p.bodyPath,paths.slice(0,2).join(' '));assert.equal(p.tailPath,paths[2])
 assert.equal(p.segment.weight,41.035);assert.equal('revealPath'in p.segment,false);assert.deepEqual(p.predecessor,f.strokes[16][1])
 assert.equal(p.predecessor.revealPath,'M43.08 84.4625 Q43.08 89.4625 48.08 89.4625')
 assert.equal(p.phaseShare,871/1041);assert.equal(p.phaseShareExact,'871/1041');assert.equal(proof.originalTerminalFourVertices.length,4)
 assert.equal(proof.body.slabs.length,3);assert.equal(proof.tail.slabs.length,1)
 for(const x of[0,1e-6,.03,p.phaseShare-1e-8,p.phaseShare,p.phaseShare+1e-8,.9999,1]){
  const v=frame(p,p.segment,x,1);assert.equal(v.progress,x);assert.equal(v.originalPDirect,x===1);assert.equal(v.originalSourceFull,x===1);assert.equal(v.completionDirectOriginalOutlineRequired,true);assert.equal(v.UARead,false)
  for(const rect of[v.bodyClip,v.tailClip])for(const n of Object.values(rect))assert.ok(Number.isFinite(n))
  assert.ok(v.bodyClip.width>=0&&v.tailClip.height>=0)
 }
 const zero=frame(p,p.segment,0,0);assert.equal(zero.visible,false);assert.equal(zero.bodyClip.width,0);assert.equal(zero.tailClip.height,0)
 const share=frame(p,p.segment,p.phaseShare,1);assert.equal(share.bodyProgress,1);assert.equal(share.tailProgress,0);assert.equal(share.bodyClip.x,p.bodyLeft);assert.equal(share.bodyClip.width,p.bodyRight-p.bodyLeft)
 const full=frame(p,p.segment,1,1);assert.equal(full.tailProgress,1);assert.equal(full.tailClip.y,p.tailTop)
 for(const x of[-1,NaN,Infinity,1.1])assert.throws(()=>frame(p,p.segment,x,1))
 for(const prev of[0,.9999,NaN])assert.throws(()=>frame(p,p.segment,.1,prev))
 assert.throws(()=>frame({...p},p.segment,.1,1));assert.throws(()=>frame(p,{...p.segment,weight:42},.1,1))
 assert.equal(policy({id:'u9f08-original-one-right-up-terminal'},16,2),null);assert.equal(policy(c,3,2),null)
 const changed=structuredClone(f.strokes);changed[16][2].outline+=' ';assert.equal(context(f.fullProof,f.identity,changed),null)
 assert.equal(SOURCE.nativeApproval,false)
})
