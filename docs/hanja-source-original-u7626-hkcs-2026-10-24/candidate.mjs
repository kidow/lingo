// DRAFT original provider hkcs_m7626. Source raw17 groups map consecutively to dictionary15; exam catalog14 stays unchanged.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16]])
export const originalNonDrawingRawRows = deepFreeze([])
const CURVES = {"2:1":[48,98,48,161,15,187,1,7],"3:0":[14,54,27,64,31,86,7,8],"4:0":[13,128,24,120,45,104,0,7],"5:0":[101.4,61.85,90.9,65.825,74.1,69.8,0,7],"15:0":[158.1,131.81,116.1,176.33,51,185.87,22,7],"16:0":[84.6,131.81,111.9,169.97,174.9,179.51,7,0]}
const BEZIERS = {}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,17)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m7626","sourceProofFile":"../hanja-actual-engine-capture-u7626-hkcs-2026-10-24/engine-whole-u7626-hkcs.json","sourceProofFileSha256":"8fc24300a67ccd8ad2836ce31218aff2fe624751a641c11b37d674b79f761ff6","sourceCapsuleFile":"../hanja-actual-engine-capture-u7626-hkcs-2026-10-24/capture.json","sourceCapsuleFileSha256":"d705ed14d3f26d63e3016e1559ae40f4f686f702c806465adb1286fc77d20dbd","sourceChecksFile":"../hanja-official-media-compare-u7626-2026-10-24/official-temporal-native-review.json","sourceChecksFileSha256":"d1b316ceb84b65d364f9f6b5124496df7f518039a16c1444fa0dd8ba12f8b73e"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceProofFile,import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-authored-HK-dictionary15-mapping-catalog14-preserved","providerRoot":"hkcs_m7626","localArtifactTag":"u7626-hkcs","localArtifactTagIsProviderRoot":false,"catalogStrokes":14,"proposedDictionaryPlaybackStrokes":15,"catalogChanged":false,"countConflictResolved":false,"individualVariantApproved":false,"groups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16]],"originalNonDrawingRawRows":[],"originalAllRawRows":17,"originalDrawingRawRows":17,"originalCalls":18,"originalP":32,"expectedPens":15,"expectedMasks":18,"sourceRawEachOnce":true,"nonConsecutiveGrouping":false,"compoundJoins":[{"pen":10,"rawOneBased":[10,11],"literal":false,"previousEnd":[162.3,68.21000000000001],"nextStart":[162.3,66.62],"sourcePContactApproved":false,"sourceGuideUnchanged":true,"bridgeAdded":false},{"pen":14,"rawOneBased":[15,16],"literal":true,"joint":[158.1,131.81],"sourcePContactApproved":false}],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourceConnectorAdded":false,"wholeReview":{"path":"docs/hanja-source-raw-compare-u7626-hkcs-2026-10-24/native-whole-review.json","SHA256":"b607293a0b15161ad822e44e33b3dd81bea464463360ac55348c891545c671e2","macroCorrespondenceOnly":true},"officialReview":{"path":"docs/hanja-official-media-compare-u7626-2026-10-24/official-temporal-native-review.json","SHA256":"d1b316ceb84b65d364f9f6b5124496df7f518039a16c1444fa0dd8ba12f8b73e","acceptedScreens":45,"referenceOnlyContext":"u7626","allOriginalDictionary15DirectionsObserved":true,"providerIsNotExamAuthority":true},"pendingChecks":["Direct static15 original-P correspondence","Per-P source contact for firstV/H,10H/V and final branch/H14","Ordinary initial/boundary/terminal/residual native review","Individual catalog14/dictionary15 variant eligibility"],"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
