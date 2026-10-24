// DRAFT 葯 HKCS original13; original full5, source gaps and all P preserved; no actual approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4,5],[6,7],[8],[9],[10],[11],[12],[13,14],[15]])
const CURVES={"4:0":[56.13,56.24,44.86,70.775,31.175,84.545,0,7],"5:0":[14.27,76.89500000000001,33.59,84.545,41.64,99.08,7,8],"6:0":[79.475,72.305,56.935,99.08,30.37,124.325,0,7],"7:0":[15.88,125.09,49.69,122.03,79.475,117.44,0,7],"8:0":[62.57,100.61,77.865,109.79,84.305,127.385,7,8],"10:0":[33.59,138.095,30.37,161.04500000000002,14.27,180.935,0,7],"11:0":[63.375,134.26999999999998,77.865,145.745,83.5,165.635,7,8],"12:0":[118,56.24,107,95.255,86,118.97,0,7],"14:0":[172,85.31,173,168.695,161.67374440844355,175.1934391456555,22,0],"14:1":[161.67374440844355,175.1934391456555,153,180.17,143,180.17,2,14]}
const BEZIERS={}
const DIAGONALS={}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m846f","sourceProofFile":"../hanja-actual-engine-capture-u846f-hkcs-2026-10-25/engine-whole-hkcs_m846f.json","sourceProofFileSha256":"0aa5daf820225c29fe6ad0d31a8bec2be44c983b06cd7680f5f924f6e50ede21","sourceCapsuleFile":"../hanja-source-alternative-u846f-hkcs-2026-10-25/sources.json","sourceCapsuleFileSha256":"392d3bc9e1a281f61f5c826cfc4476200c441a29480cd9553f47632b4e1b6e4a","sourceChecksFile":"../hanja-actual-engine-capture-u846f-hkcs-2026-10-25/capture.json","sourceChecksFileSha256":"bf37bb95bf707e4118d4b34064ad191b2aa39d0aed7887c2f10d9e1ceb2eca8e"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u846f-hkcs-2026-10-25/engine-whole-hkcs_m846f.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-HKCS13-original-source-for-actual-review","catalogStrokes":13,"proposedPlaybackStrokes":13,"groups":[[0],[1],[2],[3],[4,5],[6,7],[8],[9],[10],[11],[12],[13,14],[15]],"originalRows":16,"originalCalls":17,"originalP":37,"expectedPens":13,"expectedMasks":17,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u846f-2026-10-25/native-supplemental-review.json","SHA256":"eef0034b2b2186a0b50af39d476ad0f07795448a755e07a959784e7282b57184","frames":18},{"path":"docs/hanja-official-media-compare-u846f-2026-10-25/native-stroke9-review.json","SHA256":"819428186ff911c81b87fdfd8acf322036f51a4e7f114a3b0bc2791906dca164","frames":3},{"path":"docs/hanja-official-media-compare-u846f-2026-10-25/native-remaining-six-review.json","SHA256":"d84071609be3b779c014b2a8ef91f7d4d103752b531dfcd4987388de72273d21","frames":18}],"staticReview":{"path":"docs/hanja-source-raw-compare-u846f-hkcs-whole-2026-10-25/native-group-review.json","SHA256":"0a48f52b6a559145bef3ce7480e1f84642e08cebea84a232d42b9550a30de691","logicalPens":13,"completedOriginalPOnly":true},"wholeReviewReuse":{"path":"docs/hanja-source-new-whole-review-2026-10-25/native-whole-review.json","SHA256":"d58502f7ab4b0c21e97107f31ee31bdf62c0c257ada2987e1248f8f1ef07d7c1","selectedProvider":"hkcs_m846f","freshWholeRuns":0},"groupingBasis":"ROOT original39 direct fixed-frame observations cover all13 logical strokes: grass H/V/H/V; first 糸 DL→DR; second DL→H; shortDR7, centralV8, independentDL9, DR10, DL11, H→V→left-hook12, internalH13. Static13 confirms every unchanged original P group. Original raw14 contains two Q calls retained within logical12.","retainedConcerns":["Logical5 raw4→5 and logical6 raw6→7 retain original noncoincident guide endpoints; static correspondence does not approve temporal transitions.","Logical8 raw9 is central V; logical9 raw10 is independent left DL. Old stroke8 detached detail is not reused.","Initial caps, original-P contact during display, guide-gap transitions and completion require actual playback review."],"directOriginalDirectionFrames":39,"all13OriginalDirectionsDirectlyObserved":true,"oldCumulativeUsedAsDirectionApproval":false})
