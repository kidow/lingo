// Draft24 original-source projection; mixed provenance explicit, official72 macro directions only.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[23],[24],[20],[21,22],[19],[25],[26],[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[16],[15],[17],[18],[11,12],[13],[14]])
const CURVES={"0:0":[130,14,124,44,106,57,0,7],"2:0":[162,37,146,72,104,84,0,7],"3:0":[123,39,142,69,180,82,7,0],"10:1":[86.16,168.925,86.16,178.925,96.16,178.925,1,2001],"16:0":[73.29,121.425,57.45,125.45,36.66,127.75,0,7],"22:1":[96,70,96,80,86,80,1,514],"23:0":[44,19,35,31,13,42,0,7],"24:0":[74,18,93,23,105,34,7,8],"25:0":[48,47,47,63,38,76,0,7],"26:0":[73,44,81,52,82,68,7,8]}
const BEZIERS={}
const DIAGONALS={}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u9f08","sourceProofFile":"../hanja-actual-engine-capture-u9f08-2026-10-24/engine-whole-u9f08.json","sourceProofFileSha256":"8709710f1c22ce9ac8b8977b3b7692c560e8bd882be593612372816425f7de86","sourceCapsuleFile":"../hanja-actual-engine-capture-u9f08-2026-10-24/capture.json","sourceCapsuleFileSha256":"546a4cf5d66be4971c451422b761d51a9bd176cf614ea48dfb4123be73474c8d","sourceChecksFile":"../hanja-official-media-compare-u9f08-2026-10-24/official-temporal-native-review.json","sourceChecksFileSha256":"99a15e76cc7d2739a271538250617c64ad080efb0ea58db2161be092544e88ca"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u9f08-2026-10-24/engine-whole-u9f08.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),"Exact seven-field source identity required")
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),"Exact original full5 and trace required")
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash("sha256").update(readFileSync(new URL(f,import.meta.url))).digest("hex"),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft24-official-order-original-P-awaiting-static24-and-actual-contact","groups":[[23],[24],[20],[21,22],[19],[25],[26],[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[10],[16],[15],[17],[18],[11,12],[13],[14]],"sourceRawEachOnce":true,"originalRows":27,"originalCalls":30,"originalP":54,"expectedPens":24,"expectedMasks":30,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all24DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u9f08-2026-10-24/official-temporal-native-review.json","SHA256":"99a15e76cc7d2739a271538250617c64ad080efb0ea58db2161be092544e88ca","observedTemporalScreens":72,"macroOrderDirectionsOnly":true},"selectedSourceClosure":{"records":["u9f08","u9efd-itaiji-001@2","cdp-88cb-var-011@2","u2ffb-u2ffb-u200ca-cdp-8c78-u2ffa-u4e5a-u4e28@2","u5f50-g@6","u2b739-jv","u2b739-jr"],"missing":[],"root":"u9f08","mixedProvenance":true,"historicalArchiveRecordCount":5,"fixedPublicSupplementCount":2,"historicalArchiveRestoration":false},"originalSourceTerminal":{"logicalPen":17,"sourceRawOneBased":11,"sourceCalls":[{"kind":"cdDrawLine","args":[86.16,90.375,86.16,168.925,32,1]},{"kind":"cdDrawCurve","args":[86.16,168.925,86.16,178.925,96.16,178.925,1,2001]},{"kind":"cdDrawLine","args":[96.16,178.925,178.23,178.925,2006,5]}],"retained":true,"sourceClockApproved":false},"officialWhole":{"path":"docs/hanja-source-raw-compare-u9f08-2026-10-24/native-whole-review.json","SHA256":"9d64e413107c4d7862a1ec328a02fec9d2024dd88edbdad3e7e45df3d252eec0","macroOnly":true},"groupingBasis":"ROOT-observed official24 directions and original exact consecutive joins; not numeric graph minimum","sourceContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
