// Exact original full5 髧; source14 logical draft preserves16raw/19calls/41P, QQ6 gap and historical final14 UP-trajectory HOLD.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15]])
const CURVES = {"5:0":[48,75.325,44,86.075,34,103.275,132,7],"6:0":[21,106.5,44,102.2,88,90.375,0,7],"7:0":[75,79.625,92,87.15,100,101.125,7,8],"8:0":[168,17.275,148,35.55,112,46.3,0,7],"9:0":[176,46.3,154,65.65,116,75.325,0,7],"10:0":[184,74.25,160,95.75,116,108.65,0,7],"11:0":[43,118.12,45,131.56,29,137.8,7,8],"13:0":[171,125.32,165,131.07999999999998,150,141.16,22,7],"14:1":[99,134.92000000000002,99,172.84,18,187.24,1,7],"15:1":[110,170.51999999999998,110,180.51999999999998,120,180.51999999999998,1,1]}
const BEZIERS = {}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,16)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u9ae7","sourceProofFile":"../hanja-goal-glyphwiki-batch508-2026-10-10/engine-whole-u9ae7.json","sourceProofFileSha256":"b6be7529ec6be632a7df3860b5e90adc6eb8b170cabd9948216785e00af42ca8","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch508-2026-10-10/sources.json","sourceCapsuleFileSha256":"6e9b40bebd74fa44b4bed62701892393ecf456381efb2f59c05b2dadfece698f","sourceChecksFile":"../hanja-goal-glyphwiki-batch508-2026-10-10/validation.json","sourceChecksFileSha256":"75852728e4500c44e18b1210dde60eec2153cb23dd91568a208583950c891dfd"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch508-2026-10-10/engine-whole-u9ae7.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"original14-logical-draft-from-existing-full5-fresh-directions-and-static-pending","groups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[11],[12,13],[14],[15]],"sourceRawEachOnce":true,"originalRows":16,"originalCalls":19,"originalP":41,"expectedPens":14,"expectedMasks":19,"sourceGeometryChanged":false,"sourceGuideReversed":false,"oldWholeReview":{"path":"docs/hanja-goal-glyphwiki-batch508-2026-10-10/whole-review.json","SHA256":"631cbf60a460618fd79d64a63629592ddc91211320981f841b04ca1ecc8950e9","geometryReviewPassed":false,"directionReviewPassed":false,"orderReviewPassed":false},"originalQQGap":{"pen":6,"rawZeroBased":[5,6],"end":[34,103.275],"start":[21,106.5],"delta":[-13,3.2249999999999943],"preserved":true},"sourceExactHQJoin":{"pen":12,"rawZeroBased":[12,13],"endpoint":[171,125.32],"originalLiteralEquality":true},"historicalFinal14UPTrajectoryHOLDPreserved":true,"originalFinal14PContainsUpPolygon":true,"originalUpPolygonDoesNotProveTrajectoryOrTiming":true,"newOfficialDirectionsReviewed":0,"newStaticMappingApproved":false,"newInitialContactApproved":false,"sourceConnectorAdded":false,"nativeApproval":false,"runtimeApplied":false})
