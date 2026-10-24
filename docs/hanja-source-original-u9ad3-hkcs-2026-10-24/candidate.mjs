// DRAFT original provider hkcs_m9ad3. Preserve all30 raw rows; raw19 type0 is independent non-drawing metadata.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1,2],[4],[3],[5],[6,7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[19],[20,21],[22],[23],[24],[25],[26,27],[28,29]])
export const originalNonDrawingRawRows = deepFreeze([18])
const CURVES = {"5:0":[22.08,68,22.75,87,16.72,98,7,8],"7:0":[79.03,77,77.02,84,71.66,94,22,7],"10:1":[67.64,172,67.64,182,57.64,182,1,514],"14:0":[140.24,18,131.21,60,109.28,84,0,7],"21:1":[171.2,148,171.2,158,161.2,158,1,414],"24:0":[88.64,21,100.25,28,107.345,46,7,8],"25:0":[82.19,57,93.8,64,100.89500000000001,82,7,8],"28:0":[78.32,179,89.93,168,102.185,154,0,7]}
const BEZIERS = {"29:0":[100.89500000000001,150,111.215,170,122.18,180,181.51999999999998,176,7,0]}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,30)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m9ad3","sourceProofFile":"../hanja-actual-engine-capture-u9ad3-hkcs-2026-10-24/engine-whole-u9ad3-hkcs.json","sourceProofFileSha256":"d3de8246042950a06f0479b278b3c23842a733849d1f890702ad6f82e8fdd644","sourceCapsuleFile":"../hanja-actual-engine-capture-u9ad3-hkcs-2026-10-24/capture.json","sourceCapsuleFileSha256":"3ddcd9d9ad156fa253186a5f2d3ac8c729d83121c8517fda7a13faf4a0da1792","sourceChecksFile":"../hanja-actual-engine-capture-u9ad3-hkcs-2026-10-24/capture.json","sourceChecksFileSha256":"3ddcd9d9ad156fa253186a5f2d3ac8c729d83121c8517fda7a13faf4a0da1792"})
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

export const sourceProposal=deepFreeze({"status":"DRAFT-original-HK23-for-direct-static-parts-comparison-only","providerRoot":"hkcs_m9ad3","localArtifactTag":"u9ad3-hkcs","localArtifactTagIsProviderRoot":false,"catalogStrokes":23,"groups":[[0],[1,2],[4],[3],[5],[6,7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[19],[20,21],[22],[23],[24],[25],[26,27],[28,29]],"originalNonDrawingRawRows":[18],"originalNonDrawingRawDetails":[{"rawZeroBased":18,"rawOneBased":19,"originalSourceKind":0,"raw":[0,null,null,null,null,null,null,null,null,null,null],"trace":[],"polygons":[],"meaningNotInferred":true}],"sourceDrawingRawEachOnce":true,"sourceDrawingAndNonDrawingPartitionEachOnce":true,"metadataAssignedToSpecificStroke":false,"originalAllRawRows":30,"originalDrawingRawRows":29,"originalCalls":31,"originalP":51,"expectedPens":23,"expectedMasks":31,"compoundJoins":[{"pen":2,"rawOneBased":[2,3],"literal":true,"joint":[67.64,24]},{"pen":6,"rawOneBased":[7,8],"literal":true,"joint":[79.03,77]},{"pen":8,"rawOneBased":[10,11],"literal":true,"joint":[67.64,100]},{"pen":17,"rawOneBased":[21,22],"literal":true,"joint":[171.2,94]},{"pen":22,"rawOneBased":[27,28],"literal":false,"previousEnd":[100.25,108],"nextStart":[98.96000000000001,108],"delta":[-1.289999999999992,0],"filledPContactApproved":false,"newGuideOrBridgeAllowed":false},{"pen":23,"rawOneBased":[29,30],"literal":false,"previousEnd":[102.185,154],"nextStart":[100.89500000000001,150],"delta":[-1.289999999999992,-4],"filledPContactApproved":false,"newGuideOrBridgeAllowed":false}],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourceConnectorAdded":false,"wholeReview":{"path":"docs/hanja-source-raw-compare-u9ad3-hkcs-2026-10-24/native-whole-review.json","SHA256":"4e6a601238015165657eabaa227c2a467a4ebd5c26dbfa2c77f32b02d8a9704c","macroCorrespondenceOnly":true},"officialReview":{"profiles":["docs/hanja-official-media-compare-u9ad3-2026-10-24/config.json","docs/hanja-official-media-compare-u9ad3-2026-10-24/config-remaining.json"],"acceptedScreens":0,"referenceOnlyContext":"u9ad3","allNewHKDirectionsObserved":false},"pendingChecks":["All23 original dictionary directions via prepared original-CSS profiles","Per-pen static original-P correspondence","Pen22/23 source-P contact and original separate trajectories","Ordinary replay initial/boundary/terminal residual risks"],"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
