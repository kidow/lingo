// DRAFT 巑 original22; body3 unchanged, all original row order preserved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1,2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18,19],[20],[21],[22],[23],[24]])
const CURVES={"4:0":[88.4,19.7,84.5,34.66,76.7,47.75,0,7],"8:0":[94.9,53.36,91,83.28,73.45,98.24,132,7],"10:0":[100.75,83.28,112.45,79.54,129.35,70.19,0,7],"11:0":[144.3,19.7,140.4,34.66,132.6,47.75,0,7],"15:0":[149.5,53.36,148.2,75.8,128.7,88.89,132,7],"16:1":[165.1,71.41,165.1,81.41,175.1,81.41,1,1001],"23:0":[118.3,163.6,104.65,175.64,74.75,187.68,0,7],"24:0":[136.5,163.6,166.4,171.34,178.75,185.1,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,25)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u5dd1","sourceProofFile":"../hanja-goal-glyphwiki-batch907-2026-10-13/engine-whole-u5dd1.json","sourceProofFileSha256":"0017937e30d3e71b7069b52ab4729607f91895845a55371ad2af50422e5be972","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch907-2026-10-13/sources.json","sourceCapsuleFileSha256":"c6812d8f9bba2863386190410b0f145a80570e25e6cc49908271fc94d79afb93","sourceChecksFile":"../hanja-goal-glyphwiki-batch907-2026-10-13/validation.json","sourceChecksFileSha256":"6c65ab201ae848fc532ba78fb7916bbdc81b35c1df2b266506b28eeafcdf5944"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch907-2026-10-13/engine-whole-u5dd1.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original stored body3 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original-body3-static22-only","catalogStrokes":22,"proposedPlaybackStrokes":22,"sourceProofKind":"selected-body3-only","originalStoredFields":["groups","trace","defaults"],"full5Claimed":false,"engineHeaderAdded":false,"groups":[[0],[1,2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18,19],[20],[21],[22],[23],[24]],"originalRows":25,"originalCalls":27,"originalP":50,"expectedPens":22,"expectedMasks":27,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u5dd1-2026-10-25/official-temporal-native-review.json","SHA256":"939ae7016b90d666247b1db07b8686d60a6206517076c1b7bf125fca2555506b"},"wholeReviewReuse":{"path":"docs/hanja-goal-glyphwiki-batch907-2026-10-13/review.json","SHA256":"3c3d98ab356255cf0c16bcf8dc0440c513ab4623c79a209c64b32805707676c7","wholeVariantsPreviouslyObserved":2,"roots":["u5dd1","u5dd1-ue0100"],"selectedBodySHA256":"0017937e30d3e71b7069b52ab4729607f91895845a55371ad2af50422e5be972","bothBodyFilesByteIdentical":true,"currentDictionarySHA256":"cc8dbdebcfab55f32feeb778d9ff80bec4f20e9fa6d5b98feb4dd2e3c69cf99a","wholeViewsReplayed":0,"scope":"Existing native whole macro only; not timing/contact approval"},"groupingBasis":"ROOT66 actual original directions place raw10V andraw11risingQ together as logical9 while retaining source guide gap. Exact raw2V+3H is logical2 andraw19H+20V is logical17. Raw18 left貝V remains standalone logical16 andraw23 bottomH remains standalone logical20. The former nonconsecutive raw18/23 closure proposal is not used. All rows appear once in original order.","retainedConcerns":["Logical9 literal sourceguide gap[-9.75,+3.74] remains between V and risingQ; no connector and no contact/clock approval","Logical15 original raw17 hasV/Q/H calls and authored UP endkind5; no synthetic UP guide; timing pending","Original consecutive-only minimum23 restriction preserved historically; new grouping uses direct original9 direction evidence rather than endpoint-only nonconsecutive closure"]})
