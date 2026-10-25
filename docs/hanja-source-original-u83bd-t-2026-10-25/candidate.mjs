// 莽 catalog12/private11 original body3; static-only mapping approved, clocks unapproved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[7],[8],[9],[10],[4],[5],[6]])
const CURVES={"5:1":[72,138,71,176,20,188,1,7],"8:0":[100,52,96,103,14,129,0,7],"9:0":[109,80,131,109,177,119,7,0],"10:0":[138,53,154,61,161,72,7,8]}
const BEZIERS={}
const DIAGONALS={"1:0":[63.14,14.05,68.96,57.4,0,300],"3:0":[136.86,14.05,131.04,57.4,0,200]}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,11)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u83bd-t","sourceProofFile":"../hanja-goal-glyphwiki-batch1078-2026-10-13/engine-whole-u83bd-t.json","sourceProofFileSha256":"9d3fe3e6b58379783902568013a968e8f80edb3d99a69d907be81cf6fa4367d7","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1078-2026-10-13/sources.json","sourceCapsuleFileSha256":"170552ad7ba4e558962667ffc6fbcf0962c12496a9ab208a6e03d0845646a78a","sourceChecksFile":"../hanja-goal-glyphwiki-batch1078-2026-10-13/validation.json","sourceChecksFileSha256":"6cd60541d8484d0dea267189adbc87c24cf419a5ae2c4058d8ceeeb65265479e"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch1078-2026-10-13/engine-whole-u83bd-t.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original stored body3 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"DRAFT-catalog12-private11-original-T-body3-static-approved","catalogStrokes":12,"proposedPlaybackStrokes":11,"sourceProofKind":"selected-body3-only","originalStoredFields":["groups","trace","defaults"],"full5Claimed":false,"engineHeaderAdded":false,"groups":[[0],[1],[2],[3],[7],[8],[9],[10],[4],[5],[6]],"originalRows":11,"originalCalls":12,"originalP":25,"expectedPens":11,"expectedMasks":12,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"individualVariantApproved":false,"countConflictResolved":false,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u83bd-2026-10-25/native-original-review.json","SHA256":"14010c45284624f1971147709cb60ab90e497eca5740ad4d596d9ce0994bcec9","freshOriginalFrames":33},"staticReview":{"path":"docs/hanja-source-raw-compare-u83bd-t-whole-2026-10-25/native-group-review.json","SHA256":"a3dfd7cead151f9a48220055da52242e8c24ee8101d2028885341f3e5931b331","approvedRows":11},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u83bd-t-whole-2026-10-25/native-whole-review.json","SHA256":"5a39a88c2449ce3b2d01bb3b2a00eb87ec99abe4f96eef18c793b6f2b041ce2f","selectedRepresentative":"u83bd-t","selectedBodySHA256":"9d3fe3e6b58379783902568013a968e8f80edb3d99a69d907be81cf6fa4367d7","wholeViewsReplayed":0},"groupingBasis":"ROOT33 original eleven-stroke directions plus ROOT eleven220px static pairs approve raw order1/2/3/4/8/9/10/11/5/6/7. Source raw6 retains its original two draws as logical10 V-to-DL compound. No source argument, original filledP, original guide or within-raw call order changed.","retainedConcerns":["Five independent curve starts and one compound10m2 Q require source-bound initial and completion review.","Compound10 includes original V then original Q; source centerline continuity alone does not approve visible-P contact.","Six cardinal masks and original decorations are not whole-time or pixel-count certified.","Catalogue12 is unchanged; potential eleven-stroke dictionary playback variant is not registered."]})
