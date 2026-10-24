// Exact original 縭 full5; official-order17 hypothesis pending static mapping. Preserve21raw/22calls/48P and original fold gaps; old pen1 HOLD is not lifted.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12,14],[13],[15],[16,17],[18],[19],[20]])
const CURVES = {"0:0":[50.18,16,39.96,37,27.55,56,0,7],"1:0":[12.22,45,29.74,56,37.04,76,7,8],"2:0":[71.35,39,50.91,76,26.82,110,0,7],"3:0":[13.68,113,44.34,109,71.35,101,0,7],"4:0":[56.02,78,69.89,91,75.73,114,7,8],"6:0":[29.74,127,26.82,155,12.22,180,0,7],"7:0":[56.75,122,69.89,136,75,161,7,8],"10:0":[153.6361,49.0518,136.7705,77.3262,104.62045,93.0342,0,7],"11:0":[106.72865,56.1204,132.02705,67.116,156.27134999999998,89.8926,7,8],"17:1":[174.04500000000002,171.9986,174.04500000000002,181.9986,164.04500000000002,181.9986,1,214],"18:0":[132.135,106.1208,122.61,133.47210000000004,111.18,155.5296,0,7],"19:0":[103.56,157.2942,128.96,152.8827,156.9,150.2358,0,7],"20:0":[141.66,129.94289999999998,152.45499999999998,144.05970000000002,157.535,159.0588,7,8]}
const BEZIERS = {}
const DIAGONALS = {}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7e2d","sourceProofFile":"../hanja-goal-glyphwiki-batch553-2026-10-11/engine-whole-u7e2d.json","sourceProofFileSha256":"33c6544a106e4895d16226e405478e88f5f60031e29efe306ee85fe6cefe3f99","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch553-2026-10-11/sources.json","sourceCapsuleFileSha256":"ed4cd30a5af126b10ece9e9ceda540772b3f97cdfaa3af581f41887bd90b989f","sourceChecksFile":"../hanja-goal-glyphwiki-batch553-2026-10-11/metadata.json","sourceChecksFileSha256":"b5a2944f3bd20b800aed56aed6bc7db68e222af92fc11bebc886b205d6e01fc4"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch553-2026-10-11/engine-whole-u7e2d.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"official-order-supported-static-mapping-pending","groups":[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10],[11],[12,14],[13],[15],[16,17],[18],[19],[20]],"sourceRawEachOnce":true,"originalRows":21,"originalCalls":22,"originalP":48,"expectedPens":17,"joinsOneBased":[[1,2],[3,4],[13,15],[17,18]],"nonconsecutiveJoins":[[13,15]],"originalGaps":[{"pen":1,"priorEndpoint":[27.55,56],"nextStart":[12.22,45],"delta":[-15.33,-11],"unchanged":true},{"pen":2,"priorEndpoint":[26.82,110],"nextStart":[13.68,113],"delta":[-13.14,3],"unchanged":true}],"reorderedRawOneBased":[13,15,14],"sourceGeometryChanged":false,"sourceGuideReversed":false,"oldNineteenCandidateVersusSeventeenHoldPreserved":true,"oldPenOneDisconnectedHoldPreserved":true,"officialLogical11Observed":"vertical down then horizontal right in one official stroke","officialFinal17Observed":true,"staticMappingApproved":false,"nativeApproval":false,"runtimeApplied":false})

