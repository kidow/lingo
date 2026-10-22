import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex'),clone=x=>JSON.parse(JSON.stringify(x));
export const BASE='docs/hanja-source-cache-u568c-2026-10-23/fixture.json';
export const BASE_SHA='fd3319d9ac2f941e9ef51a5a505c6d3e72b90788c92f9493ae1dc69ac6423d55';
export const FULL='docs/hanja-source-raw-compare-u568c-2026-10-23/engine-whole-u568c.json';
export const FULL_SHA='0fb793d710713d24757c82f0ba9494beb5d025d43ceb10ede0a0dfd7ecc6535d';
let calls=0;
const path=P=>'M'+P.map(p=>p.join(' ')).join(' L')+' Z';
const bounds=P=>[Math.min(...P.map(p=>p[0])),Math.min(...P.map(p=>p[1])),Math.max(...P.map(p=>p[0])),Math.max(...P.map(p=>p[1]))];
const exact=n=>{const s=String(n),[a,b='']=s.split('.'),v=BigInt(a+b)*10000n/(10n**BigInt(b.length));assert.equal(v*(10n**BigInt(b.length)),BigInt(a+b)*10000n);return v};
const area2=P=>P.reduce((v,p,i)=>{const q=P[(i+1)%P.length];return v+exact(p[0])*exact(q[1])-exact(q[0])*exact(p[1])},0n);
const dist2=(p,a,b)=>{const P=p.map(exact),A=a.map(exact),B=b.map(exact),dx=B[0]-A[0],dy=B[1]-A[1],px=P[0]-A[0],py=P[1]-A[1],l=dx*dx+dy*dy,t=px*dx+py*dy;if(t<=0n)return[px*px+py*py,100000000n];if(t>=l){const x=P[0]-B[0],y=P[1]-B[1];return[x*x+y*y,100000000n]}const c=px*dy-py*dx;return[c*c,l*100000000n]};
const covered=(P,a,b)=>{for(const p of P){const[n,d]=dist2(p,a,b);assert(n<=49n*d,'Original body vertex outside source capsule')}};
export function deriveOnce(){
 assert.equal(calls++,0,'One cached correction only');
 const bytes=fs.readFileSync(BASE),proofBytes=fs.readFileSync(FULL);assert.equal(sha(bytes),BASE_SHA);assert.equal(sha(proofBytes),FULL_SHA);
 const old=JSON.parse(bytes),proof=JSON.parse(proofBytes),strokes=clone(old.strokes),before=strokes[1][0];
 assert.equal(old.geometrySHA256,'aa124ad522573bf1e5ba90f904ffcf2796af551fb294d070c6d19779b53661c8');
 assert.equal(strokes.length,17);assert.equal(strokes.flat().length,19);
 const raw=proof.trace[2][0];assert.equal(raw.kind,'cdDrawLine');assert.deepEqual(raw.args,[52.8612,43.72,52.8612,132.28,22,23]);
 const quad=raw.polygons[0].map(p=>[p.x/2,p.y/2]),[A,B,C,D]=quad;assert.deepEqual(quad,[[29.4,21.85],[29.4,70.1],[23.4,73.1],[23.4,21.85]]);
 const E=[C[0],B[1]],rectangle=[A,B,E,D],triangle=[B,C,E];assert.equal(area2(rectangle)+area2(triangle),area2(quad));assert(area2(rectangle)>0n&&area2(triangle)>0n);
 assert.equal(E[0],C[0]);assert(E[1]>D[1]&&E[1]<C[1]); // E lies on original CD; original B.y horizontal cut.
 const all=[...proof.trace[1][0].polygons,...raw.polygons].map(P=>P.map(p=>[p.x/2,p.y/2]));
 assert.equal(before.outline,all.map(path).join(' '));assert.equal(before.revealPath,'M10.1094 21.86 L26.4306 21.86 L26.4306 66.14');assert.equal(before.revealWidth,14);assert.equal(before.weight,60.6012);
 const bodyPolys=[all[0],rectangle,all[2]],body={...before,outline:bodyPolys.map(path).join(' '),bounds:bounds(bodyPolys.flat())},tail={outline:path(triangle),bounds:bounds(triangle),direction:'down',weight:C[1]-B[1]};assert.equal(tail.weight,3);
 const q0=[10.1094,21.86],join=[26.4306,21.86],end=[26.4306,66.14];
 covered(bodyPolys[0],q0,join);covered(rectangle,join,end);covered(bodyPolys[2],join,join); // Disc is contained in the right-angle miter stroke.
 strokes[1]=[body,tail];for(let i=0;i<17;i++)if(i!==1)assert.deepEqual(strokes[i],old.strokes[i]);
 assert.equal(strokes.flat().length,20);assert.equal(strokes.flat().reduce((n,s)=>n+(s.outline.match(/M/g)||[]).length,0),40);
 return {...old,schema:'hanja-source-down-terminal-candidate/v1',strokes,geometrySHA256:sha(JSON.stringify(strokes)),maskFieldSHA256:strokes.map(p=>p.map(s=>sha(JSON.stringify(s)))),baseline:{fixture:BASE,sha256:BASE_SHA,geometrySHA256:old.geometrySHA256,preparation:old.preparation},preparation:{cachedCorrectionOperations:1,sourceProjection:0,engineRuns:0,compilerRuns:0},sourcePreservation:{original39PolygonsExactlyOnce:false,original39PolygonsUnionPreserved:true,originalPolygonCount:39,emittedFragments:40,oneOriginalQuadPartitioned:true,other38OriginalPolygonsUnchanged:true,other16PensUnchanged:true,originalContourUnchanged:true,newExternalInk:false,bodyGuideWidthWeightPreserved:true,newTailWeight:3,additionalTailClock:true,officialMicroTimingApproved:false,pen12VAndRiseIndependent:true,pen9OriginalLEFT414PartitionPreserved:true},terminalCorrection:{pen:2,mask:1,raw:3,terminalFlags:[22,23],originalQuad:quad,cutPoint:E,cutRule:'original C.x on CD at original B.y',bodyRectangle:rectangle,tailTriangle:triangle,bodyBounds:body.bounds,tailBounds:tail.bounds,bodyWeight:body.weight,tailWeight:tail.weight,boundary:body.weight/(body.weight+tail.weight),bodyContainedInFullRoundCapsulesExact:true,sourceSetUnionExact:true,nativeApproval:false},nativeApproval:false,actualAppUI:false,runtimeApplied:false};
}
export const correctionCallCount=()=>calls;
