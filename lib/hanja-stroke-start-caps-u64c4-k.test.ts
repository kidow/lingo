import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import{makeReviewedU64C4KSourceContext,reviewedU64C4KPolicy,REVIEWED_U64C4K_SOURCE,REVIEWED_U64C4K_PROOFS}from'./hanja-stroke-start-caps-u64c4-k.ts'
const root=new URL('../',import.meta.url),read=(p:string)=>readFileSync(new URL(p,root)),sha=(b:Uint8Array|string)=>createHash('sha256').update(b).digest('hex'),clone=<T>(x:T):T=>JSON.parse(JSON.stringify(x))
const f=JSON.parse(read(REVIEWED_U64C4K_SOURCE.sourceCacheFile).toString())['u64c4-k'],started=performance.now()
assert.equal(sha(read(REVIEWED_U64C4K_SOURCE.sourceCacheFile)),REVIEWED_U64C4K_SOURCE.sourceCacheSHA256);assert.equal(sha(read(REVIEWED_U64C4K_SOURCE.actualFull5SourceFile)),REVIEWED_U64C4K_SOURCE.actualFull5SourceSHA256);assert.equal(sha(JSON.stringify(f.strokes)),REVIEWED_U64C4K_SOURCE.geometrySHA256)
const context=makeReviewedU64C4KSourceContext(f.fullProof,f.identity,f.strokes);assert(context);assert.deepEqual(REVIEWED_U64C4K_PROOFS.map(x=>[x.pen,x.mask,x.T,x.K]),[[6,2,'1','1/20'],[7,2,'1/2','1/20'],[15,3,'1','1/10']])
for(const c of REVIEWED_U64C4K_PROOFS){const s=f.strokes[c.pen-1][c.mask-1];assert.equal(sha(JSON.stringify(s)),c.maskSHA256);assert.equal(s.revealPath,c.guide);assert.equal(s.revealWidth,14);assert(reviewedU64C4KPolicy(context,c.pen-1,c.mask-1));assert.equal(c.PIntersectionConnectivityNotProved,true);assert.equal(c.notFullSweepProof,true)}
assert.equal(reviewedU64C4KPolicy(context,1,1),null);assert.equal(reviewedU64C4KPolicy(context,8,1),null);assert.equal(reviewedU64C4KPolicy(null,5,1),null)
let negative=0;for(const mutate of[(x:any)=>x.identity.sourceRoot+='-wrong',(x:any)=>x.proof.groups[0].raw[0]++,(x:any)=>x.strokes[5][1].revealWidth=15,(x:any)=>x.strokes[6][1].outline+=' ']){const x={proof:clone(f.fullProof),identity:clone(f.identity),strokes:clone(f.strokes)};mutate(x);assert.equal(makeReviewedU64C4KSourceContext(x.proof,x.identity,x.strokes),null);negative++}
console.log(JSON.stringify({ownCaps3BindingFIRST:true,negative,mathReplay:0,engine:0,projection:0,nativeApproval:false,runtimeApplied:false,durationMs:performance.now()-started}))
