// Source-only cached terminal23 partition. Does not project or run the original engine.
import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const sha=b=>createHash('sha256').update(b).digest('hex'),digest=v=>sha(JSON.stringify(v)),read=p=>readFileSync(new URL(p,import.meta.url)),json=p=>JSON.parse(read(p))
const BASE='../hanja-source-independent-qq-three-u785c-source-experiment-2026-10-23/fixtures.json'
const BASE_SHA='06e18a0306703657b660e64ec62ef90bc5218dd519027af203abb85c99e247e4'
const PROPOSAL_SHA='91478b3e2ebebfe69e451e139a2db905bc410cdcfcdc5162bd99a30c3149fb9f'
const path=P=>{const area=P.reduce((n,v,i)=>{const next=P[(i+1)%P.length];return n+v.x*next.y-next.x*v.y},0),q=area<0?[P[0],...P.slice(1).reverse()]:P;return q.map((v,i)=>(i?'L':'M')+v.x/2+' '+v.y/2).join(' ')+' Z'}
const bounds=P=>[Math.min(...P.map(p=>p.x/2)),Math.min(...P.map(p=>p.y/2)),Math.max(...P.map(p=>p.x/2)),Math.max(...P.map(p=>p.y/2))]
let correctionRuns=0
export function captureCorrection(){
 assert.equal(correctionRuns,0);assert.equal(sha(read(BASE)),BASE_SHA);assert.equal(sha(read('./proposal.json')),PROPOSAL_SHA)
 const f=json(BASE).u785c,proposal=json('./proposal.json'),proof=f.fullProof
 assert.equal(digest(f.strokes),'b61153344f7cbd511a362e092f7996c18bd760da85ffad1821f67667435f234a')
 assert.equal(digest(proof),'95a75bc82dfba9c855fec3c0982c1397c154cec33f3ce77696434458f5057d4d')
 const h=proof.trace[3][0],v=proof.trace[4][0];assert.deepEqual(h.args,[33.695,87,65.02,87,2,2]);assert.deepEqual(v.args,[65.02,87,65.02,155,22,23])
 const q=v.polygons[0];assert.deepEqual(q,[{x:71,y:87,off:0},{x:71,y:163,off:0},{x:59,y:169,off:0},{x:59,y:87,off:0}])
 const poly=rows=>rows.map(([x,y])=>({x:Number(x),y:Number(y),off:0})),rect=poly(proposal.sourceFacts.bodyRectangle),tri=poly(proposal.sourceFacts.downTriangle)
 assert.deepEqual(proposal.sourceFacts.originalQuad,q.map(p=>[String(p.x),String(p.y)]))
 const old=f.strokes,before=old[3][0],sourcePolygons=[...h.polygons,...v.polygons];assert.equal(old[3].length,1);assert.equal(before.outline,sourcePolygons.map(path).join(' '))
 assert.equal(before.revealPath,'M16.8475 43.5 L32.51 43.5 L32.51 77.5');assert.equal(before.revealWidth,14);assert.equal(before.weight,49.6625)
 const bodyPolygons=[...h.polygons,rect,v.polygons[1]],body={...before,outline:bodyPolygons.map(path).join(' '),bounds:bounds(bodyPolygons.flat())},tail={outline:path(tri),bounds:bounds(tri),direction:'down',weight:3}
 const strokes=structuredClone(old);strokes[3]=[body,tail]
 for(let i=0;i<12;i++)if(i!==3)assert.deepEqual(strokes[i],old[i])
 const fragments=s=>s.flat().flatMap(m=>m.outline.match(/M[^M]+/g).map(s=>s.trim())).sort(),expected=fragments(old),at=expected.indexOf(path(q));assert(at>=0);expected.splice(at,1);expected.push(path(rect),path(tri));assert.deepEqual(fragments(strokes),expected.sort())
 assert.equal(strokes.flat().length,16);assert.equal(fragments(strokes).length,31)
 correctionRuns++
 return{fullProof:proof,baselineStrokes:structuredClone(old),baselineGeometrySHA256:digest(old),strokes,geometrySHA256:digest(strokes),sourcePreservation:{originalSourcePolygons:30,displayPartitionFragments:31,original30PolygonsExactlyOnce:false,original30PolygonsUnionPreserved:true,originalGuideWidthBodyWeightUnchanged:true,newConnector:0,newEngine:0,newSourceProjection:0,terminal23CachedCorrectionOperations:1,newInnerTailWeight:3,bodyShareNumerator:3973,bodyShareDenominator:4213,originalClockIdentityApproved:false},proofReference:{file:'proposal.json',sha256:PROPOSAL_SHA},nativeApproval:false,runtimeApplied:false}
}
export function correctionOperationCount(){return correctionRuns}
