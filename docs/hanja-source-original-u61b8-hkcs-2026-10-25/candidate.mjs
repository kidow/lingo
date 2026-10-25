// Source-bound 憸 HKCS original16; original full5 and every source P/Q preserved; runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[1],[2],[0],[3],[4],[5],[7],[8,9],[10],[12],[13,14],[15],[17],[18],[19],[20]])
const CURVES={"1:0":[28.2,56,25.3,86,16.6,99,7,8],"2:0":[52.125,50,62.275,60,66.625,74,7,8],"3:0":[125.12,16,100.16,62,62.72,86,0,7],"4:0":[125.12,24,145.92,56,177.12,74,7,0],"17:0":[96,134,85.6,166,59.599999999999994,184,0,7],"18:0":[88.72,152,103.28,160,112.64,176,7,8],"19:0":[150.08,134,140.72,170,113.68,184,0,7],"20:0":[143.84,152,164.64,162,174,181,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,21)
  for(const index of [6,11,16]){assert.deepEqual(trace[index],[]);assert.deepEqual(proof.groups[index].polygons,[]);assert.deepEqual(proof.groups[index].raw,[0,...Array(10).fill(null)])}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m61b8","sourceProofFile":"../hanja-actual-engine-capture-u61b8-hkcs-2026-10-25/engine-whole-hkcs_m61b8.json","sourceProofFileSha256":"a46653481330aba2c9c2dbb40cb0bbdc385658590dcf6ea2274b8f4ce0bf02bd","sourceCapsuleFile":"../hanja-source-alternative-u61b8-hkcs-2026-10-25/sources.json","sourceCapsuleFileSha256":"3da8ea738e13bf574f093c330c8160ec04b578b97c662d788c69745c0699e277","sourceChecksFile":"../hanja-actual-engine-capture-u61b8-hkcs-2026-10-25/capture.json","sourceChecksFileSha256":"05358919c1066696c2dc4ed215d3ea7f0178e67b11cc03e2030acd55c3f3bec0"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u61b8-hkcs-2026-10-25/engine-whole-hkcs_m61b8.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-HKCS16-source-preserving-for-actual-review","catalogStrokes":16,"proposedPlaybackStrokes":16,"groups":[[1],[2],[0],[3],[4],[5],[7],[8,9],[10],[12],[13,14],[15],[17],[18],[19],[20]],"originalRows":21,"originalCalls":18,"originalP":33,"expectedPens":16,"expectedMasks":18,"sourceDrawingRawEachOnce":true,"nonDrawingRawRowsPreserved":[6,11,16],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u61b8-2026-10-25/native-temporal-review.json","SHA256":"b7244fad6c54054deacc8aa401b450b0c81206a63d477bdde6135cfd4d144e5b","frames":48}],"staticReview":{"path":"docs/hanja-source-raw-compare-u61b8-hkcs-whole-2026-10-25/native-group-review.json","SHA256":"dec15153ac3a50fce6117d2cbef56f6e4a2f5682b960f51d93ed6148a3758dd6","logicalPens":16,"completedOriginalPOnly":true},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u61b8-hkcs-whole-2026-10-25/native-whole-review.json","SHA256":"441f56d25c52242fc15820c32c3c18aa593d9d6c8fa7add02872fe31d998a81c","selectedProvider":"hkcs_m61b8","freshWholeRuns":0},"groupingBasis":"ROOT original48 directly observed all16 order and directions; static16 confirms original P groups, including two horizontal-to-downward bends. Original raw7/12/17 remain exact nondrawing metadata inside the full5 and are not assigned to logical ink.","retainedConcerns":["Initial caps, compound contact and completion are pending source-bound actual playback review.","Metadata raw7/12/17 must remain [0,null x10] with empty trace/P; no new strokes or relocated geometry."],"directOriginalDirectionFrames":48,"all16OriginalDirectionsDirectlyObserved":true,"oldCumulativeUsedAsDirectionApproval":false})

