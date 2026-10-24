// DRAFT 擄 corrected16 original K full5 for direct source-parts review only; original19raw24calls46P retained, production import prohibited.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4],[6,7],[5],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18]])
const CURVES = {"1:1":[42.5,171,42.5,181,32.5,181,1,314],"2:0":[16.25,122,44.375,107,70,91,0,7],"5:1":[79.5,111,79.5,163,63.4,185,1,7],"7:0":[178.2,46,173.3,56,166.3,68,22,7],"9:1":[118,75,118,85,128,85,1,3001],"17:0":[167.7875,152.8,167.20999999999995,173.2,162.37921231398045,176.25504359590167,22,0],"17:1":[162.37921231398045,176.25504359590167,153.9275,181.6,143.9275,181.6,2,14],"18:0":[135.4475,136.6,127.3625,176.8,83.4725,185.8,0,7]}
const BEZIERS = {}
const DIAGONALS = {"8:0":[86.5,72,162.1,63,0,0]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u64c4-k","sourceProofFile":"../hanja-actual-engine-capture-u64c4-k-2026-10-24/engine-whole-u64c4-k.json","sourceProofFileSha256":"a3563f77d80bf7e4ba1754fc244abd28d05589bfcbaa429c36d6110c2f16e792","sourceCapsuleFile":"../hanja-actual-engine-capture-u64c4-k-2026-10-24/capture.json","sourceCapsuleFileSha256":"a32f76ce92c9d41de1120b4c2c629d7c963e9f72e06dca71a25d74fabeaa8876","sourceChecksFile":"../hanja-actual-engine-capture-u64c4-k-2026-10-24/capture.json","sourceChecksFileSha256":"a32f76ce92c9d41de1120b4c2c629d7c963e9f72e06dca71a25d74fabeaa8876"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u64c4-k-2026-10-24/engine-whole-u64c4-k.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original16-for-direct-static-parts-comparison-only","groups":[[0],[1],[2],[3],[4],[6,7],[5],[8],[9],[10],[11,12],[13],[14],[15],[16,17],[18]],"sourceRawEachOnce":true,"originalRows":19,"originalCalls":24,"originalP":46,"expectedPens":16,"expectedMasks":24,"originalConsecutiveJoinsZeroBased":[[6,7],[11,12],[16,17]],"reorderedRawGroup":{"officialPens":[6,7],"originalGroups":[[6,7],[5]],"basis":"ROOT official stroke6 H→shortDL hook precedes stroke7 longV→DL outer"},"middleOrder":{"officialPens":[12,13],"originalRows":[13,14],"basis":"ROOT12 middle horizontal before13 central vertical; no reorder needed"},"oldNumeric15NonConsecutiveJoinUsed":false,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"originalMetadataStrokes":15,"originalWorksheetStrokes":15,"resolvedLearningStrokes":16,"sourceStrokes":15,"strokeCountCorrection":"eomunhoe-8928-u64c4","wholeReview":{"path":"docs/hanja-source-raw-compare-u64c4-k-2026-10-24/native-whole-review.json","SHA256":"5e0431845ac43381a68f79c825c299237f9e707a1fdf0743aaba39a6f7854956","macroCorrespondenceOnly":true},"officialReview":{"path":"docs/hanja-official-media-compare-u64c4-2026-10-24/official-temporal-native-review.json","SHA256":"cc178c24b87d53c8333301f570eb77f9ec1bdce197eed38d03383e6c0ba843c6","acceptedScreens":48},"pendingChecks":["Per-pen static original-P correspondence","Terminal hook and upward-end source boundary/clock","田 and 力 source contacts","Ordinary playback initial risks"],"allOfficialDirectionsObserved":true,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
