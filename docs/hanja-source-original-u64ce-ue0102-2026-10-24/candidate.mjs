// Exact original historical 擎 closure; new direct engine full5 from one actual draw. Preserve 19raw/21calls/39P and historical 6/17 terminal HOLD.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[4],[5],[7],[6],[8],[9,10],[11],[12,13],[14],[15],[16],[17],[18],[0],[1],[2],[3]])
const CURVES = {"0:0":[149,110.68,118,116.77,31,121.845,0,7],"3:1":[100,171.73,100,181.73,90,181.73,1,14],"8:0":[50,39.17,40,55.755,13,68.595,0,7],"10:0":[96,48.8,97,89.995,89.46378933154818,96.7147878460362,22,0],"10:1":[89.46378933154818,96.7147878460362,82,103.37,72,103.37,2,14],"15:0":[139.07,13.49,129.11,40.775,105.87,59.5,0,7],"17:0":[163.97,39.705,154.01,91.6,90.1,106.58,2,7],"18:0":[120.81,45.055,129.94,86.25,180.57,101.23,7,0]}
const BEZIERS = {}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,19)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u64ce-ue0102","sourceProofFile":"../hanja-actual-engine-capture-u64ce-ue0102-2026-10-24/engine-whole-u64ce-ue0102.json","sourceProofFileSha256":"de3fe498cfec0349fbe651dd711cf9968734b9b016e5611ac236d459f325f088","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch337-2026-10-05/historical-sources.json","sourceCapsuleFileSha256":"b1148174c0c954c409c1ed1830fa278e2a3ba5c4748cd599e605ae40933976ee","sourceChecksFile":"../hanja-actual-engine-capture-u64ce-ue0102-2026-10-24/capture.json","sourceChecksFileSha256":"11cfb0288ebf506f245bb1ae4c5382f1a763f20f2ca91148b9ded38f943aa99c"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u64ce-ue0102-2026-10-24/engine-whole-u64ce-ue0102.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"new-actual-engine-capture-original-historical-native17-reused-no-runtime","groups":[[4],[5],[7],[6],[8],[9,10],[11],[12,13],[14],[15],[16],[17],[18],[0],[1],[2],[3]],"sourceRawEachOnce":true,"originalRows":19,"originalCalls":21,"originalP":39,"expectedPens":17,"expectedMasks":21,"sourceGeometryChanged":false,"sourceGuideReversed":false,"legacyBodyAndTraceUnchanged":true,"legacyOnlineProvenanceUnknownPreserved":true,"newDirectEngineCapture":{"path":"docs/hanja-actual-engine-capture-u64ce-ue0102-2026-10-24/capture.json","SHA256":"11cfb0288ebf506f245bb1ae4c5382f1a763f20f2ca91148b9ded38f943aa99c"},"sourceStaticCorrespondence":{"path":"docs/hanja-goal-glyphwiki-batch337-2026-10-05/findings.json","SHA256":"08d42f2b98f3a2df134868ba2841c6eaf3f282dc7f62a9f28509c9ef30a86f2b","historicalNativePanel":"259","logicalPens":17,"directionsCumulativeAndWholeReviewed":true,"newScreens":0},"originalTerminalHold":{"pens":[6,17],"nativePanel":"260","finiteFrames":18,"preserved":true},"allOfficialDirectionsObservedHistorically":true,"newFiniteNativeApproval":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
