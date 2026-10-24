// DRAFT existing fixed u8910 source grouped for dictionary13. Catalog14 and old blocked module remain unchanged.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12,13],[14],[15]])
export const originalNonDrawingRawRows = deepFreeze([])
const CURVES = {"2:0":[68.25,54,50.25,99,11.25,134,22,7],"4:0":[73.5,90,69,99,55.5,115,0,7],"5:0":[45.75,107,64.5,120,72.75,138,7,8],"11:0":[119.01,82,101.21,116,72.72999999999999,139,0,7],"13:0":[176.86,105,178.64,156,167.03788726380367,174.52495824230047,22,0],"13:1":[167.03788726380367,174.52495824230047,161.73,183,151.73,183,2,14],"14:0":[146.6,119,123.46,134,96.76,143,0,7],"15:1":[96.76,153,96.76,163,106.76,163,1,1]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u8910","sourceProofFile":"../hanja-goal-glyphwiki-batch1119-2026-10-14/engine-whole-u8910.json","sourceProofFileSha256":"85ddd6f69ddbfb17ed875a7bc31282f9a3f7fe37195e05517c1a6639ead30d48","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1119-2026-10-14/sources.json","sourceCapsuleFileSha256":"0908302beaad57284aa7bff938ef9a41412fed7a1c62a589cb28b10c0b92559a","sourceChecksFile":"../hanja-goal-glyphwiki-batch1119-2026-10-14/validation.json","sourceChecksFileSha256":"6c972d68b1e27001914f2890a4e58d8d466ead954b3da61ef7fdb0935c488f94"})
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

export const sourceProposal=deepFreeze({"status":"DRAFT-existing-base-source-dictionary13-catalog14-preserved","providerRoot":"u8910","catalogStrokes":14,"proposedDictionaryPlaybackStrokes":13,"catalogChanged":false,"countConflictResolved":false,"individualVariantApproved":false,"groups":[[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10],[11],[12,13],[14],[15]],"originalNonDrawingRawRows":[],"originalAllRawRows":16,"originalCalls":19,"originalP":36,"expectedPens":13,"expectedMasks":19,"sourceRawEachOnce":true,"nonConsecutiveGrouping":false,"compoundJoins":[{"pen":2,"rawOneBased":[2,3],"literal":true,"previousEnd":[68.25,54],"nextStart":[68.25,54],"sourcePContactApproved":false},{"pen":7,"rawOneBased":[8,9],"literal":true,"previousEnd":[164.4,26],"nextStart":[164.4,26],"sourcePContactApproved":false},{"pen":11,"rawOneBased":[13,14],"literal":true,"previousEnd":[176.86,105],"nextStart":[176.86,105],"sourcePContactApproved":false}],"originalIntrinsicMultiCallRawRows":[{"rawOneBased":14,"calls":2},{"rawOneBased":16,"calls":3}],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourceConnectorAdded":false,"oldBlockedModuleUnchanged":"docs/hanja-goal-glyphwiki-batch1119-2026-10-14/progressive.mjs","wholeReview":{"path":"docs/hanja-source-raw-compare-u8910-2026-10-24/native-whole-review.json","SHA256":"951dc1b71b5e4d67d5dcd554669b3c83743872ee910a91a83a3a0b1607daf1df","scope":"Only base whole and exact-markup ue0100/ue0102 compatible; other10labels rejected. Whole macro is not per-pen static/contact approval."},"officialReview":{"path":"docs/hanja-official-media-compare-u8910-2026-10-24/official-temporal-native-review.json","SHA256":"9c6816117caf9ea1d5b305b207193002fd8f6f514c713cb4dcb7cf63bd2a31e8","acceptedScreens":39,"referenceOnlyContext":"u8910","scope":"Private dictionary original13 fixed-CSS directions; not exam authority."},"pendingChecks":["Direct static13 original-P/source boundary correspondence","Original firstV/H,lower left hook andinner UP terminal P connectivity/coverage","Ordinary initial/boundary/terminal/residual native review","Individual catalog14/dictionary13 variant eligibility"],"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
