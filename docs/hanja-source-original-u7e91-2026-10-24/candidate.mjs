// Draft22 source-preserving mapping for ROOT static verification only. Original27raw30calls54P unchanged; historicalQQ gap HOLD preserved.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0,1],[2,3],[4],[5],[6],[7],[8],[9],[11,12],[10],[13],[14],[15],[16,17],[19],[18],[20],[21],[22,23],[24],[25],[26]])
const CURVES={"0:0":[45.59,16,36.980000000000004,37,26.525,56,0,7],"1:0":[13.61,45,28.37,56,34.519999999999996,76,7,8],"2:0":[63.425,39,46.205,76,25.91,110,0,7],"3:0":[14.84,113,40.67,109,63.425,101,0,7],"4:0":[50.51,78,62.195,91,67.11500000000001,114,7,8],"6:0":[28.37,127,25.91,155,13.61,180,0,7],"7:0":[51.125,122,62.195,136,66.5,161,7,8],"10:1":[82.8,111,82.8,163,67.16,185,1001,7],"12:0":[178.68,46,173.92000000000002,56,167.12,68,22,7],"14:1":[120.2,75,120.2,85,130.2,85,1,3001]}
const BEZIERS={}
const DIAGONALS={"13:0":[89.6,72,163.04000000000002,63,0,0]}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,27)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7e91","sourceProofFile":"../hanja-goal-glyphwiki-batch540-2026-10-11/engine-whole-u7e91.json","sourceProofFileSha256":"d7ab4a3612b89d69d79d529c44bbf4f5d78c72b5b3ac1e40a66a79309493c9de","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch540-2026-10-11/sources.json","sourceCapsuleFileSha256":"4d321b21b2a68b6082c6dfb4e23f43efd2a487812de00d48f8ddb6083177bb74","sourceChecksFile":"../hanja-goal-glyphwiki-batch540-2026-10-11/metadata.json","sourceChecksFileSha256":"5820631fa687cf1f40de4b7c130e9bb566d8e237f3b83edd26f0c384f948329c"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch540-2026-10-11/engine-whole-u7e91.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft22-mapping-awaiting-ROOT-static-all22-no-native-approval","groups":[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[11,12],[10],[13],[14],[15],[16,17],[19],[18],[20],[21],[22,23],[24],[25],[26]],"sourceRawEachOnce":true,"originalRows":27,"originalCalls":30,"originalP":54,"expectedPens":22,"expectedMasks":30,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all22DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u7e91-2026-10-24/official-temporal-native-review.json","SHA256":"37056056677c25c981ddd079309fc04217a7f828ab5693146098468e3dd06c3f","combinedObservedScopes":66},"reorderedRawOneBased":[1,2,3,4,5,6,7,8,9,10,12,13,11,14,15,16,17,18,20,19,21,22,23,24,25,26,27],"sourceContactApproved":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
