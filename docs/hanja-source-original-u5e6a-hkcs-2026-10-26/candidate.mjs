// Source-bound 幪 HKCS original17; exact per-glyph original-order mapping, unchanged source P/Q; runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[1],[2,3],[0],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18]])
const CURVES={"3:1":[65.9,126,65.9,136,57.150000000000006,136,1001,614],"8:0":[89,48,89,64,77,77,7,8],"10:0":[176,58,175,64,166,74,22,7],"13:0":[130,96,114,116,80,128,132,7],"14:0":[119,112,145,147,135.5713746626659,171.65948165148916,7,0],"14:1":[135.5713746626659,171.65948165148916,132,181,122,181,2,214],"15:0":[128,122,110,139,79,153,32,7],"16:0":[135,138,115,162,79,174,32,7],"17:0":[174,110,166,122,148,136,0,7],"18:0":[134,96,148,147,181,170,7,0]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,19)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m5e6a","sourceProofFile":"../hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/engine-whole-hkcs_m5e6a.json","sourceProofFileSha256":"e8831644fbe62a6af83581d45c4024cf2c324732b731ada72372309ef62ccb11","sourceCapsuleFile":"../hanja-source-alternative-u5e6a-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"47c4f8b2cde48170e8daf50dc220f616b61a2327b062d76491b8498069f25be8","sourceChecksFile":"../hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"1891922869a639a68e31dfd9d2721c6e802d9619bdc05b5473c5492de5e4ffe8"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u5e6a-hkcs-2026-10-26/engine-whole-hkcs_m5e6a.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-official-media-compare-u5e6a-2026-10-26/official-temporal-native-review.json","3eead4ca3970c63cc587be3a6ced1e9840dd3c2621674dee22cf69ad4e899e2a"],["../hanja-source-raw-compare-u5e6a-hkcs-individual-2026-10-26/native-static-review.json","a727e402295aedf1fb12e8f0bf20b688f7a52abc44349f212e6320644e6f9ea4"],["../hanja-source-raw-compare-u5e6a-hkcs-individual-2026-10-26/static-mapping.json","92119f5cf96eea1014dae141ccd6521a5951b0046ae9974d87ba6cb5d25b5322"],["../hanja-source-raw-compare-u5e6a-hkcs-whole-2026-10-26/native-whole-review.json","da41a95b94e55b9a57b95f0a9729307acee8aaf1ef3ae517bfbe6e87b31b4837"],["../hanja-source-original-u5e6a-hkcs-2026-10-26/paint-and-contact-conditions-proof.json","c3d052d3725ae13230cd6ab6449b5b5d36375c2c40a2d7eda103c06701446fa7"],["../hanja-source-original-u5e6a-hkcs-2026-10-26/verify-paint-and-contact-conditions.py","f364db8ae9ece3cad6f566fb0a1359a23317fa0dd2fea13c5d5e68771de60c38"],["../hanja-source-original-u5e6a-hkcs-2026-10-26/source-Q-directions.json","c5dd82b44ef161df2d826732ef21e713c12f86e69aacf92ede447983859ef6bd"]])
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 for(const[f,p]of EVIDENCE)assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p,'Exact original/static/paint/Q evidence required')
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-HKCS17-source-preserving-for-actual-review","catalogStrokes":17,"proposedPlaybackStrokes":17,"groups":[[1],[2,3],[0],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18]],"originalRows":19,"originalCalls":21,"originalP":38,"expectedPens":17,"expectedMasks":21,"sourceDrawingRawEachOnce":true,"nonDrawingRawRowsPreserved":[],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"authoredRawArrayOrderUnchanged":true,"logicalPlaybackExplicitRawOrder":[2,3,4,1,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u5e6a-2026-10-26/official-temporal-native-review.json","SHA256":"3eead4ca3970c63cc587be3a6ced1e9840dd3c2621674dee22cf69ad4e899e2a","frames":51}],"staticReview":{"path":"docs/hanja-source-raw-compare-u5e6a-hkcs-individual-2026-10-26/native-static-review.json","SHA256":"a727e402295aedf1fb12e8f0bf20b688f7a52abc44349f212e6320644e6f9ea4","logicalPens":17},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u5e6a-hkcs-whole-2026-10-26/native-whole-review.json","SHA256":"da41a95b94e55b9a57b95f0a9729307acee8aaf1ef3ae517bfbe6e87b31b4837","freshWholeRuns":0},"groupingBasis":"ROOT static23 and original51 identify raw2 then raw3+4 then raw1 as original pens1..3. Raw10+11 is original9. Every source raw preserved exactly once; directions and group order derive from this glyph only.","retainedConcerns":[{"pen":2,"raw":4,"detail":"Original body/hook source polygons share zero-area exact boundary edges. Visible fine seam remains: no P gap, no proven AA cause; actual independent paint/swept contact must be reviewed."},{"pen":13,"raw":15,"detail":"Original broad DR curve then left/up hook observed; exact two Q calls preserved without joining. Local hook microclock is not approved."}],"directOriginalDirectionFrames":51,"all17OriginalDirectionsDirectlyObserved":true,"originalClockIdentityApproved":false})
