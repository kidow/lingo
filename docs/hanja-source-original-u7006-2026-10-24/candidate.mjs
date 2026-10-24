// Draft18 original-P projection only. Selected four-record base closure; original water gap retained.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20]])
const CURVES={"0:0":[25.785,20,44.16,27,52.245,41,7,8],"1:0":[11.82,66,31.665,73,39.015,87,7,8],"2:0":[13.29,133,39.015,142,36.075,184,7,8],"3:0":[32.4,150,35.34,138,66.21000000000001,67,32,7],"10:0":[117.36,63,110.16,77,90,85,132,7],"11:1":[136.07999999999998,68,136.07999999999998,78,146.07999999999998,78,1,5001],"19:0":[113.03999999999999,164.4,97.92,175.11,64.8,185.82,0,7],"20:0":[133.2,164.4,166.32,171.285,180,183.525,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,21)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7006","sourceProofFile":"../hanja-remaining-seven-sources-2026-10-17/engine-whole-u7006.json","sourceProofFileSha256":"1310a035ab490a9e05b961c9b49442dc10e0064bf656b4500924badb4895d616","sourceCapsuleFile":"../hanja-remaining-seven-sources-2026-10-17/u7006-sources.json","sourceCapsuleFileSha256":"29fd326dd70ecfc3847886cf661545c5ea6b75436b3dc1c20b3fcae2a947cd28","sourceChecksFile":"../hanja-remaining-seven-sources-2026-10-17/source-checks.json","sourceChecksFileSha256":"b1f8f691f84df20be4439a5c241734f9225cd2292db4c2948b840488d087fc72"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-remaining-seven-sources-2026-10-17/engine-whole-u7006.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft18-official-order-source-P-gap-route-awaiting-static18-and-actual-contact","groups":[[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20]],"sourceRawEachOnce":true,"originalRows":21,"originalCalls":23,"originalP":38,"expectedPens":18,"expectedMasks":23,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all18DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u7006-2026-10-24/official-temporal-native-review.json","SHA256":"b9eaa43621e0e74015e964c7f1a69ec3fd26b3a75071c1cdfb23c81ae7b04721","preparedOnly":false,"observedTemporalScreens":54,"macroOrderDirectionsOnly":true},"selectedSourceClosure":{"records":["u7006","u6c35-01","u27da0","u8c9d-04"],"missing":[],"baseRoot":"u7006","usesHistoricalPrimaryRoot":false,"containerOtherRootMissingNames":["u27da0-j"]},"historicalEndpointOnlyLowerBound":{"minimum":19,"notSourcePImpossibilityProof":true,"record":"docs/hanja-remaining-source-prep-u7006-2026-10-18/source-readiness.json","SHA256":"8453208b37c6b80f6597bbc9d2c058010ed7355acd49734a059a307c4ef20867"},"originalWaterGuideGap":{"rawZeroBased":[2,3],"originalEnd":[36.075,184],"originalStart":[32.4,150],"sourceUnits":34.19803539678851,"endpointContinuityClaim":false,"possibleFilledPOverlapRouteOnly":true},"sourceContactApproved":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
