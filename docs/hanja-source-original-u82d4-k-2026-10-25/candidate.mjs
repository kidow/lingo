// DRAFT 苔 K9 original source; no production import or native approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[3],[2],[4,5],[6],[7],[8,9],[10]])
const CURVES={"4:0":[94,62.62,80,86.86,52,114.13,0,7],"5:0":[27,116.15,78,113.12,158,106.05,0,7],"6:0":[119,78.78,154,95.95,170,119.18,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,11)
  // Existing compound source coordinates remain independent; no continuity approval.
  const segment=(polygons,direction,weight)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    // Separate source polygons are filled independently. Normalize winding before
    // joining SVG subpaths so overlapping source decorations remain a union.
    const normalized=polygons.map(p=>{
      const area=p.reduce((n,v,i)=>{const next=p[(i+1)%p.length];return n+v.x*next.y-next.x*v.y},0)
      assert(area!==0)
      return area<0?[p[0],...p.slice(1).reverse()]:p
    })
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6}
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].flatMap((call,j)=>{
      const a=call.args
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        return [{...segment(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      if(call.kind==='cdDrawBezier'){
        assert.deepEqual(a,BEZIERS[index+':'+j])
        return [{...segment(call.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a
      if(x1!==x2&&y1!==y2){assert.deepEqual(a,DIAGONALS[index+':'+j]);return [{...segment(call.polygons,'curve',Math.hypot(x2-x1,y2-y1)/2),revealPath:`M${x1/2} ${y1/2} L${x2/2} ${y2/2}`,revealWidth:14}]}
      assert(x1===x2||y1===y2,'Only exact cardinal original lines')
      return [segment(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
    })
  }))
}

import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
function deepFreeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.freeze(x);for(const v of Object.values(x))deepFreeze(v)}return x}
function sameJSON(a,b) {
 if(Object.is(a,b))return true
 if(!b||typeof b!=='object'||!a||typeof a!=='object')return false
 if(Array.isArray(b)){
  if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false
  return b.every((value,index)=>{const d=Object.getOwnPropertyDescriptor(a,String(index));return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,value)})
 }
 if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b),expected=b
 return Reflect.ownKeys(a).length===keys.length&&keys.every(key=>{const d=Object.getOwnPropertyDescriptor(a,key);return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,expected[key])})
}
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u82d4-k","sourceProofFile":"../hanja-goal-glyphwiki-batch1125-2026-10-14/engine-whole-u82d4-k.json","sourceProofFileSha256":"c2924297dabbc70fb398317be731f5066372cff17dbf2f149df9f8865f54465b","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1125-2026-10-14/sources.json","sourceCapsuleFileSha256":"b906ee5650f69eac6b3ba01a817daf203b24fed208c4c870ac8f3dc4e35b58e5","sourceChecksFile":"../hanja-goal-glyphwiki-batch1125-2026-10-14/validation.json","sourceChecksFileSha256":"a7e75419d2aa5362910bf8e8086c6b73c99f4e908a5bc92e7519e6ec7aaeaed5"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch1125-2026-10-14/engine-whole-u82d4-k.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original-K9-source-only","catalogStrokes":9,"proposedPlaybackStrokes":9,"groups":[[0],[1],[3],[2],[4,5],[6],[7],[8,9],[10]],"originalRows":11,"originalCalls":11,"originalP":21,"expectedPens":9,"expectedMasks":11,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u82d4-2026-10-23/official-temporal-native-review.json","SHA256":"fa69c103ba927aa27a99c9ce00616372411634bf64c230c164c90e7977003843","scope":"Existing ROOT27 unchanged original direction frames; no replay"},"wholeReview":{"path":"docs/hanja-source-raw-compare-u82d4-k-2026-10-25/native-whole-review.json","SHA256":"0cbd7e7e48dd153ae673b67464a255a602206bdb37d2802a73f76b66e8da5ec5"},"sourceFilledContact":{"path":"docs/hanja-source-raw-compare-u82d4-k-2026-10-25/source-filled-contact-facts.json","SHA256":"cf8e38d28a4cc7e5b1a183816c2d019573c2f12597e74d8bf4aaaf5e1b6d5169"},"groupingBasis":"Direct original dictionary order1H2V3H4V requires raw1,2,4,3. Logical5 has authored raw5DL Q then raw6right Q as two independent masks, preserving nonliteral guide gap. Logical8 original口raw9H/raw10V share literal endpoint/start. Other raw rows each once.","retainedConcerns":["logical5 guide gap[-12.5,+1.01] preserved; positive filled-P contact does not prove guide/prefix continuity","logical5 two sourceQ remain separate masks, not one synthetic sourceP or path","logical8 original V endkind223 retained; fine no-hook correspondence pending static","all progressive frames and full original-Q coverage pending"]})
