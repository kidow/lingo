// 爨 catalog29/private30 VS0 body3; static-only mapping approved, clocks unapproved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[8],[9],[10],[11],[0],[1,2],[3],[4],[5,6],[7],[12,13],[14],[15],[16],[17,18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31],[32],[33]])
const CURVES={"8:0":[60,19.39,50,23.115,32,27.585,0,7],"16:0":[24,66.325,25,84.205,16,92.4,7,8],"18:0":[178,73.03,174,78.99,162,91.655,22,7],"21:0":[62,92,50,110,22,123,132,7],"22:0":[63,98,77,102,86,111,7,8],"25:0":[133,92,124,109,100,123,132,7],"26:0":[134,96,154,104,166,116,7,8],"28:0":[99,111,69,147,11,164,0,7],"29:0":[119,129,148,151,179,157,7,0],"30:0":[74,141,73,159,59,167,7,8],"31:0":[137,147,130,158,118,169,0,7],"32:0":[103,136,102,181,26,188,0,7],"33:0":[94,164,140,174,164,185,7,8]}
const BEZIERS={}
const DIAGONALS={"9:0":[32,27.585,34,73.03,12,32],"13:0":[168,23.86,166,73.03,22,32]}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,34)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7228-ue0100","sourceProofFile":"../hanja-goal-glyphwiki-batch906-2026-10-13/engine-whole-u7228-ue0100.json","sourceProofFileSha256":"549ca8a55811c992150da6ff4aa09e1b6e287e6c0e921ac373b3688bad3d7194","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch906-2026-10-13/sources.json","sourceCapsuleFileSha256":"cc3ebe631c0e0e12d95abd9c22131aa2800f8179e88b9125a3781fd062370b59","sourceChecksFile":"../hanja-goal-glyphwiki-batch906-2026-10-13/validation.json","sourceChecksFileSha256":"a9acfdec9656edada937623084c4b09b9769da4614d2c16c3800d7ed9be8e65b"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch906-2026-10-13/engine-whole-u7228-ue0100.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original stored body3 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"DRAFT-catalog29-private30-original-VS0-body3-static-approved","catalogStrokes":29,"proposedPlaybackStrokes":30,"sourceProofKind":"selected-body3-only","originalStoredFields":["groups","trace","defaults"],"full5Claimed":false,"engineHeaderAdded":false,"groups":[[8],[9],[10],[11],[0],[1,2],[3],[4],[5,6],[7],[12,13],[14],[15],[16],[17,18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31],[32],[33]],"originalRows":34,"originalCalls":34,"originalP":60,"expectedPens":30,"expectedMasks":34,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"individualVariantApproved":false,"countConflictResolved":false,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u7228-2026-10-25/official-temporal-native-review.json","SHA256":"48886725eb1b0ec46bc66f508922f4081d119046ba2bce4f47a00d983d87329d","freshOriginalFrames":90},"staticReview":{"path":"docs/hanja-source-raw-compare-u7228-vs0-2026-10-25/native-group-review.json","SHA256":"58642b75b97e8af0e4fe008e9de3eae09b58da934cc9606a9f7ddab5dc387a17","approvedRows":30},"wholeReviewReuse":{"path":"docs/hanja-goal-glyphwiki-batch906-2026-10-13/review.json","SHA256":"b1a3cec48c17a21dcca02df8c8120a0ce41477a6153ebd673dc61452fb07f908","compatibleRoots":["u7228-ue0100","u7228-ue0101","u7228-ue0104","u7228-ue0105","u7228-ufe00"],"selectedRepresentative":"u7228-ue0100","selectedBodySHA256":"549ca8a55811c992150da6ff4aa09e1b6e287e6c0e921ac373b3688bad3d7194","wholeViewsReplayed":0},"exactJoinedRawZeroBased":[[1,2],[5,6],[12,13],[17,18]],"groupingBasis":"ROOT90 original30 directions and ROOT five220px static screens approve30 rows. Left-upper raw8DL and raw9V are separate logical1/2 despite exact endpoint. Inner mouth raw4V and raw7H remain separate across actual raw5/6. Four H/V or H/Q joins retain original endpoints and within-raw call order.","retainedConcerns":["Four exact centerline joins do not establish P-prefix contact or any progressive mask condition.","Cardinal decorations, independent curve caps, H/Q turn15 and completion residuals remain native-unapproved.","Source restart raw20V→raw21Q and raw24V→raw25Q each[-1,-32] belongs to different logical pens; no artificial connector.","Catalogue29 remains fixed. Individual private30 playback variant is not runtime-approved."]})
