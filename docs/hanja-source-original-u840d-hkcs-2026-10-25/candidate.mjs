// Source-bound 萍 HKCS static12; untouched original guides are not direction/connection approved.
import assert from 'node:assert/strict'
import {renderProgressive as legacyRenderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export function renderProgressive(strokes,stroke,progress,prefix='reveal'){assert(stroke<7,'Independent original-P paint policy required from 萍 logical7 onward');return legacyRenderProgressive(strokes,stroke,progress,prefix)}
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[6,7,8,9],[10],[11],[12],[13],[14]])
const CURVES={"4:0":[26.92,58.44,42.94,63.760000000000005,50.06,77.44,7,8],"5:0":[14.46,90.36,30.48,95.68,37.6,109.36,7,8],"6:0":[38.49,152.68,34.93,148.88,16.240000000000002,145.84,0,7],"7:0":[33.15,179.28,40.27,158.76,34.04,147.36,7,8],"8:0":[46.5,123.04,33.15,154.95999999999998,39.38,183.84,7,8],"9:0":[37.6,147.36,45.61,133.68,66.08,85.03999999999999,12,7],"11:0":[92,82,84,104.8,66,126.08,0,7],"12:0":[138,82,158,96.44,165,118.48,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,15)
  // Existing compound source coordinates remain independent; no continuity approval.
  const segment=(polygons,direction,weight,independent=false)=>{
    const points=polygons.flat(),xs=points.map(p=>p.x/2),ys=points.map(p=>p.y/2)
    assert(points.every(p=>p.off===0))
    // Separate source polygons are filled independently. Normalize winding before
    // joining SVG subpaths so overlapping source decorations remain a union.
    const normalized=polygons.map(p=>{
      const area=p.reduce((n,v,i)=>{const next=p[(i+1)%p.length];return n+v.x*next.y-next.x*v.y},0)
      assert(area!==0)
      return area<0?[p[0],...p.slice(1).reverse()]:p
    })
    return {outline:normalized.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z').join(' '),bounds:[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)],direction,weight:Math.round(weight*1e6)/1e6,...(independent?{inkPaths:polygons.map(p=>p.map((v,i)=>`${i?'L':'M'}${v.x/2} ${v.y/2}`).join(' ')+' Z')}:{})}
  }
  return sourceGroups.map(indices=>indices.flatMap(index=>{
    assert.deepEqual(trace[index].flatMap(c=>c.polygons),proof.groups[index].polygons)
    return trace[index].flatMap((call,j)=>{
      const a=call.args
      const paint=(p,d,w)=>segment(p,d,w,index>=6&&index<=9)
      if(call.kind==='cdDrawCurve'){
        assert.deepEqual(a,CURVES[index+':'+j])
        return [{...paint(call.polygons,'curve',Math.hypot(a[4]-a[0],a[5]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} Q${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2}`,revealWidth:14}]
      }
      if(call.kind==='cdDrawBezier'){
        assert.deepEqual(a,BEZIERS[index+':'+j])
        return [{...paint(call.polygons,'curve',Math.hypot(a[6]-a[0],a[7]-a[1])/2),revealPath:`M${a[0]/2} ${a[1]/2} C${a[2]/2} ${a[3]/2} ${a[4]/2} ${a[5]/2} ${a[6]/2} ${a[7]/2}`,revealWidth:14}]
      }
      assert.equal(call.kind,'cdDrawLine')
      const[x1,y1,x2,y2]=a
      if(x1!==x2&&y1!==y2){assert.deepEqual(a,DIAGONALS[index+':'+j]);return [{...paint(call.polygons,'curve',Math.hypot(x2-x1,y2-y1)/2),revealPath:`M${x1/2} ${y1/2} L${x2/2} ${y2/2}`,revealWidth:14}]}
      assert(x1===x2||y1===y2,'Only exact cardinal original lines')
      return [paint(call.polygons,x1===x2?(y2>y1?'down':'up'):(x2>x1?'right':'left'),Math.hypot(x2-x1,y2-y1)/2)]
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m840d","sourceProofFile":"../hanja-actual-engine-capture-u840d-hkcs-2026-10-25/engine-whole-hkcs_m840d.json","sourceProofFileSha256":"f5c8184820c51cbfe0506959745703496eec6d7d271b29735d22bee2cec8a205","sourceCapsuleFile":"../hanja-source-alternative-u840d-hkcs-2026-10-25/sources.json","sourceCapsuleFileSha256":"9d5905b81c9a7184ef6777afb7f34c2ae5ebf5e1b48ffca8650b36906677c71c","sourceChecksFile":"../hanja-actual-engine-capture-u840d-hkcs-2026-10-25/capture.json","sourceChecksFileSha256":"8a2492a59e9a4be1eccab8ec2a8e5db1d6ac57074fcc38a51516428125ec2f96"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u840d-hkcs-2026-10-25/engine-whole-hkcs_m840d.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-source-preserving-direction-unapproved","glyph":"萍","catalogStrokes":12,"proposedPlaybackStrokes":12,"groups":[[0],[1],[2],[3],[4],[5],[6,7,8,9],[10],[11],[12],[13],[14]],"originalRows":15,"originalCalls":15,"originalP":31,"expectedPens":12,"expectedMasks":15,"sourceStaticMappingApproved":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourceDrawingRawEachOnce":true,"sourcePAndCallOrderWithinRawUnchanged":true,"individualGuideDirectionApproved":false,"composite7GuideOrderApproved":false,"composite7GuideConnectionApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u840d-2026-10-25/official-temporal-native-review.json","SHA256":"310857e12ff3075c11a1d2cd54a4f4be261407f4fe559b21331a5470895054d1","frames":36}],"staticReview":{"path":"docs/hanja-source-raw-compare-u840d-hkcs-whole-2026-10-25/native-group-review.json","SHA256":"9d6ee69531e79d02d3a87cd14cbcd1d576196c8e8ceabbc0a0a527e51bf793b2","logicalPens":12,"completedOriginalPOnly":true},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u840d-hkcs-whole-2026-10-25/native-whole-review.json","SHA256":"a1cefb1a8f0a934412d2ed3290dbffad770b237fbde7fe728746ae2bbd58294c","selectedProvider":"hkcs_m840d","freshWholeRuns":0},"limits":["The projection preserves each original guide in its authored order, including four raw guides within logical7; this is not direction/order/connection approval.","Original observation12 directions are reused; logical7 requires independent guide-boundary review before any runtime candidate.","No cap, bridge, guide reversal, source coordinate or width correction is implemented.","Original raw7 P1 self-intersects; joining separately normalized source P can cancel fill. Independent inkPaths are required for logical7 and joined outline is compatibility data only."],"footPaintMode":"each-original-P-independent-nonzero","footPaintPaths":[3,2,2,2],"joinedOutlineCompatibilityOnlyNotApprovedForFootPaint":true,"originalPolygonPaintingRestored":true,"sharedNormalizerChanged":false})
