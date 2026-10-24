// DRAFT original provider hkcs_m84d1, not a fabricated u84d1-hkcs alias. All17raw retained; raw7 type0 disclosed separately from14 logical drawing groups.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4],[5],[7],[8,9],[10],[11],[12],[13,14],[15],[16]])
export const originalNonDrawingRawRows = deepFreeze([6])
const CURVES = {"12:0":[100,121.1,66,147.5,14,160.7,132,7],"14:0":[36,178.85,83,174.725,124,165.65,0,7],"15:0":[168,129.35,152,142.55,128,154.925,0,7],"16:0":[103,121.1,124,164.825,178,177.2,7,0]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m84d1","sourceProofFile":"../hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/engine-whole-u84d1-hkcs.json","sourceProofFileSha256":"ab7220e5d130e893e4e82462f8b60e4891d2e542278a3cec744f4d797c8d70ee","sourceCapsuleFile":"../hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/capture.json","sourceCapsuleFileSha256":"f45841941deac00fee286fe015ee36a5468dfc134500a9132102d7943888e202","sourceChecksFile":"../hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/capture.json","sourceChecksFileSha256":"f45841941deac00fee286fe015ee36a5468dfc134500a9132102d7943888e202"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u84d1-hkcs-2026-10-24/engine-whole-u84d1-hkcs.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original-HK14-for-direct-static-parts-comparison-only","providerRoot":"hkcs_m84d1","localArtifactTag":"u84d1-hkcs","localArtifactTagIsProviderRoot":false,"groups":[[0],[1],[2],[3],[4],[5],[7],[8,9],[10],[11],[12],[13,14],[15],[16]],"originalNonDrawingRawRows":[6],"originalNonDrawingRawDetails":[{"rawZeroBased":6,"rawOneBased":7,"originalSourceKind":0,"raw":[0,null,null,null,null,null,null,null,null,null,null],"trace":[],"polygons":[],"meaningNotInferred":true}],"sourceDrawingRawEachOnce":true,"sourceDrawingAndNonDrawingPartitionEachOnce":true,"metadataAssignedToSpecificStroke":false,"originalAllRawRows":17,"originalDrawingRawRows":16,"originalCalls":16,"originalP":29,"expectedPens":14,"expectedMasks":16,"originalLiteralEndpointJoin":{"pen":8,"rawZeroBased":[8,9],"point":[148,83.15]},"nonLiteralCompound":{"pen":12,"rawZeroBased":[13,14],"end":[66,177.2],"start":[36,178.85],"delta":[-30,1.65],"literalEndpointJoin":false,"originalGapPreserved":true,"sourcePConnectedFootNotProved":true,"newDisplayClockNotProved":true},"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourceConnectorAdded":false,"wholeReview":{"path":"docs/hanja-source-raw-compare-u84d1-hkcs-2026-10-24/native-whole-review.json","SHA256":"6cff40c2beccc4935356682e85af82653816f09b0533d37fb249bd835b3d87a0","macroCorrespondenceOnly":true},"officialReview":{"path":"docs/hanja-official-media-compare-u84d1-2026-10-24/official-temporal-native-review.json","SHA256":"cc69948a58bfe76f34e46ff70a122f0c0ab853dbd974e57b606692ff40a645c3","acceptedScreens":42,"referenceOnlyContext":"u84d1"},"pendingChecks":["Per-pen static original-P correspondence","Stroke12 original gap and source-P foot clock","Stroke14 source-P start/boundaries from observed below口 branch","Ordinary replay initial risks"],"allOfficialDirectionsObserved":true,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
