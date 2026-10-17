import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from '../hanja-goal-glyphwiki-batch859-2026-10-13/progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch859-2026-10-13/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({sourceRoot:'u7a67',sourceProofFile:'../hanja-goal-glyphwiki-batch859-2026-10-13/engine-whole-u7a67.json',sourceProofFileSha256:'78a4c3e4fc2e34c40105ddae4e43c916f7aa18e7dbe279a6e22166420707261e',sourceHeaderFile:'../hanja-goal-glyphwiki-batch859-2026-10-13/engine-proof.json',sourceHeaderFileSha256:'55cc0974d2e301a1c0dbf8ea600a0c06a65bdd91c2167c88e5277a5fa85ce871'})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const originalSourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12],[13,14],[15],[16],[17],[18],[19],[20]].map(g=>Object.freeze(g)))
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[10],[11],[12],[7,8],[9],[13],[14,15],[16],[17],[19],[20],[18]].map(g=>Object.freeze(g)))
const ORIGINAL_SHA='f7dea97fe3bf3063d62f6610a519394c8c367592634217244cf4ee1a4b1e3001'
function pins(){const p=JSON.parse(read('boundary-source-preparation.json'));for(const[f,h]of Object.entries({...p.originalPins,...p.sharedRendererBytePins,...p.newFilesSHA256}))assert.equal(sha(read(f)),h,f);assert.deepEqual(p.identity,selectedProofIdentity);assert.deepEqual(p.sourceGroups,sourceGroups);assert.deepEqual(p.originalSourceGroups,originalSourceGroups)}
function primitive(call){
  const points=call.polygons.flat();assert(points.length>0&&points.every(p=>p.off===0))
  const polygons=call.polygons.map(p=>{const area=p.reduce((n,v,i)=>{const w=p[(i+1)%p.length];return n+v.x*w.y-w.x*v.y},0);assert.notEqual(area,0);return area<0?[p[0],...p.slice(1).reverse()]:p})
  const a=call.args,curve=call.kind==='cdDrawCurve';assert(curve||call.kind==='cdDrawLine')
  const end=curve?a.slice(4,6):a.slice(2,4),direction=curve?'curve':a[0]===a[2]?(a[3]>a[1]?'down':'up'):a[1]===a[3]?(a[2]>a[0]?'right':'left'):'curve'
  const out={outline:polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...points.map(p=>p.x/2)),Math.min(...points.map(p=>p.y/2)),Math.max(...points.map(p=>p.x/2)),Math.max(...points.map(p=>p.y/2))],direction,weight:Math.round(Math.hypot(end[0]-a[0],end[1]-a[1])/2*1e6)/1e6}
  if(curve)return {...out,revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}
  return direction==='curve'?{...out,revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2}`,revealWidth:14}:out
}
export function compileProgressive(trace,proof,identity){
  assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity);pins()
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(read(identity.sourceProofFile)),identity.sourceProofFileSha256);assert.equal(sha(read(identity.sourceHeaderFile)),identity.sourceHeaderFileSha256)
  const body=JSON.parse(read(identity.sourceProofFile)),header=JSON.parse(read(identity.sourceHeaderFile));assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);assert.deepEqual(Object.keys(header).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(Object.keys(header.engineHashes).length,8)
  assert.deepEqual(proof,{engineRevision:header.engineRevision,engineHashes:header.engineHashes,...body});assert.equal(sha(JSON.stringify(proof)),'ae2f7e2a5ddfd195d26339df606b65b056d2a27614dbbf18ab82ef6ba7865b0a');assert.deepEqual(trace,proof.trace)
  const before=JSON.stringify(proof);assert.deepEqual(original.sourceGroups,originalSourceGroups);assert.equal(original.sourceRoot,sourceRoot)
  const baseline=original.compileProgressive(trace,proof);assert.equal(sha(JSON.stringify(baseline)),ORIGINAL_SHA);assert.equal(baseline.length,19);assert.equal(baseline.flat().length,20)
  assert.equal(trace[13].length,1);assert.equal(trace[13][0].kind,'cdDrawCurve');assert.equal(trace[14].length,1);assert.equal(trace[14][0].kind,'cdDrawLine');assert.equal(trace[15].length,1);assert.equal(trace[15][0].kind,'cdDrawCurve')
  const q=primitive(trace[13][0]),v=primitive(trace[14][0]);assert.equal(q.outline+' '+v.outline,baseline[12][0].outline);assert.equal(v.direction,'down');assert.equal(v.revealPath,undefined);assert.deepEqual(v.bounds,[72.25,26.85,77.75,47.3]);assert.equal(v.weight,15.725)
  assert.equal(baseline[13].length,1);assert.equal(baseline[13][0].revealPath,'M69.11500000000001 49.1 Q77.1075 46.325 85.1 42.625');assert.equal(baseline[13][0].revealWidth,14);assert.equal(baseline[13][0].weight,17.246619)
  const out=[...baseline.slice(0,7),baseline[9],baseline[10],baseline[11],baseline[7],baseline[8],[q],[v,...baseline[13]],baseline[14],baseline[15],baseline[17],baseline[18],baseline[16]]
  for(const[n,old]of [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,9],[8,10],[9,11],[10,7],[11,8],[14,14],[15,15],[16,17],[17,18],[18,16]])assert.strictEqual(out[n],baseline[old])
  assert.strictEqual(out[13][1],baseline[13][0]);assert.equal(sha(JSON.stringify(baseline)),ORIGINAL_SHA);assert.equal(JSON.stringify(proof),before);assert.deepEqual(sourceGroups.flat().slice().sort((a,b)=>a-b),Array.from({length:21},(_,i)=>i));assert.equal(out.length,19);assert.equal(out.flat().length,21)
  return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
