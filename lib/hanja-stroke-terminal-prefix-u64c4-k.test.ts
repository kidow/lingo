import assert from'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{makeReviewedU64C4KTerminalPrefixSourceContext as context,reviewedU64C4KTerminalPrefixContext as accessor,reviewedU64C4KTerminalPrefixPolicy as policy,sampleReviewedU64C4KTerminalPrefixFrame as sample,REVIEWED_U64C4K_TERMINAL_PREFIX_SOURCE as SOURCE}from'./hanja-stroke-terminal-prefix-u64c4-k.ts'
const root=new URL('../',import.meta.url),read=(p:string)=>readFileSync(new URL(p,root)),sha=(x:string)=>createHash('sha256').update(x).digest('hex'),clone=<T>(x:T):T=>JSON.parse(JSON.stringify(x)),f=JSON.parse(read(SOURCE.fixture).toString())['u64c4-k'],cert=JSON.parse(read(SOURCE.proof).toString()),started=performance.now()
const ctx=context(f.fullProof,f.identity,f.strokes);assert(ctx);assert.equal(accessor(f.strokes),ctx);const foreign=clone(f.strokes);foreign[14][2].outline+=' ';assert.equal(accessor(foreign),null)
const p=policy(ctx,14,2);assert(p);const s=f.strokes[14][2];assert.equal(sha(JSON.stringify(s)),cert.sourceSegmentSHA256);assert.equal(sha(JSON.stringify(f.strokes[14][1])),cert.sourcePredecessorSHA256);assert.equal(p.bodyPath+' '+p.tailPath,s.outline);assert.equal(p.phaseShare,27/52);assert.equal(p.bodyAxis,'x-negative');assert.equal(p.tailAxis,'x-negative')
let frames=0,negative=0
for(const t of[0,1e-6,.03,p.phaseShare-1e-10,p.phaseShare,p.phaseShare+1e-10,.9999,1]){
 const q=sample(p,s,t,t?1:0);assert.equal(q.UARead,false);assert.equal(q.originalPDirect,false);assert.equal(q.paintOriginalPOnce,true);assert.equal(q.unionMaskRequiredAtCompletion,true)
 for(const v of[...Object.values(q.bodyClip),...Object.values(q.tailClip),q.bodyProgress,q.tailProgress])assert(Number.isFinite(v))
 if(!t){assert.equal(q.visible,false);assert.equal(q.bodyClip.width,0);assert.equal(q.tailClip.width,0)}
 if(t===p.phaseShare){assert.equal(q.bodyProgress,1);assert.equal(q.tailProgress,0)}
 if(t===1){assert.equal(q.originalSourceFull,true);assert.equal(q.bodyClip.x,71.95);assert.equal(q.tailClip.x,61.95);assert.equal(q.tailClip.width,10);assert.equal(q.bodyClip.height,8.25)}
 frames++
}
for(const t of[NaN,-.1,1.1,Infinity]){assert.throws(()=>sample(p,s,t,1));negative++}
for(const t of[NaN,-.1,1.1,.9999]){assert.throws(()=>sample(p,s,.5,t));negative++}
assert.throws(()=>sample({...p},s,.5,1));negative++;const bad=clone(s);bad.revealWidth++;assert.throws(()=>sample(p,bad,.5,1));negative++
assert.equal(policy(null,14,2),null);assert.equal(policy(ctx,14,1),null);const id=clone(f.identity);id.sourceRoot+='x';assert.equal(context(f.fullProof,id,f.strokes),null);negative++
console.log(JSON.stringify({terminal15NewBindingFIRST:true,frames,negative,mathReplay:0,engine:0,sourceProjection:0,nativeApproval:false,runtimeApplied:false,durationMs:performance.now()-started}))
