// Draft17 source-preserving projection only. Actual original-engine22raw23calls38P; no historical four-key body/trace splice. Full directions/static17 not yet observed.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[3],[2],[10],[11,12],[14],[13],[15],[16,17],[18],[19,20],[21],[4],[5],[6,7],[8,9]])
const CURVES={"4:0":[27,56.01000000000001,46,63.3,58,76.25999999999999,7,8],"5:0":[16,85.17,35,91.65,49,104.61,7,8],"8:0":[16,183.99,35,175.08,55,163.74,0,7],"17:1":[175.6,157.40120000000002,175.6,167.40120000000002,165.6,167.40120000000002,1,114]}
const BEZIERS={"9:0":[53,162.12,68,178.32,84,185.61,179,182.37,7,0]}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,22)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u8596-ue0100","sourceProofFile":"../hanja-actual-engine-capture-u8596-ue0100-2026-10-24/engine-whole-u8596-ue0100.json","sourceProofFileSha256":"38c7fea359004b8b9b8f36bb4e811f0f5d078c97e932ff08751cf5fe24fcb52b","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch446-2026-10-09/whole-engine-proofs.json","sourceCapsuleFileSha256":"c4edd19f7b59a4de05afea7d5b37848774aed91ab4796f86f3fc06756d11cca6","sourceChecksFile":"../hanja-actual-engine-capture-u8596-ue0100-2026-10-24/capture.json","sourceChecksFileSha256":"f71c4ee3ec79ebb0356cf302cab80d9860def78c71b0f3075852d5821c7c3595"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u8596-ue0100-2026-10-24/engine-whole-u8596-ue0100.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft17-mapping-from-historical-diagnostic-order-awaiting-new-ROOT-directions-and-static17","groups":[[0],[1],[3],[2],[10],[11,12],[14],[13],[15],[16,17],[18],[19,20],[21],[4],[5],[6,7],[8,9]],"sourceRawEachOnce":true,"originalRows":22,"originalCalls":23,"originalP":38,"expectedPens":17,"expectedMasks":23,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all17DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u8596-2026-10-24/metadata.json","SHA256":"52a0a497b217fc35ebeb02912126c3b2707c6f63d3e8dc72f0133e857c41c799","preparedOnly":true,"observedTemporalScreens":0},"wholeEvidence":{"path":"docs/hanja-source-raw-compare-u8596-ue0100-2026-10-24/native-whole-review.json","SHA256":"b52fa25884e64b664d35410e8bdc86903ad7a641b83a220ecd52927fc20c2f5a","historicalPanel":200,"displayPixels":390,"newScreens":0,"partialDomesticPensObserved":[1,2,3,4,7,8,16,17]},"newActualEngineCapture":{"path":"docs/hanja-actual-engine-capture-u8596-ue0100-2026-10-24/capture.json","SHA256":"f71c4ee3ec79ebb0356cf302cab80d9860def78c71b0f3075852d5821c7c3595","actualMakeGlyphCalls":1,"newFull5GroupsTraceSameCall":true,"oldBodyTraceSynthesis":false},"originalFinalGuideGap":{"rawZeroBased":[8,9],"originalEnd":[55,163.74],"originalStart":[53,162.12],"sourceUnits":2.5737909783041824},"reorderedRawOneBased":[1,2,4,3,11,12,13,15,14,16,17,18,19,20,21,22,5,6,7,8,9,10],"sourceContactApproved":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
