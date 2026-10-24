// DRAFT 漌 original16raw to observed14logical; old order12/13 and water guide-gap HOLD preserved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[14],[13],[15]])
const CURVES={"0:0":[27.025,20,46.4,27,54.925,41,7,8],"1:0":[12.3,66,33.225,73,40.975,87,7,8],"2:0":[13.85,133,40.975,142,37.875,184,7,8],"3:0":[34,150,37.1,138,69.65,67,32,7]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u6f0c","sourceProofFile":"../hanja-goal-glyphwiki-batch481-2026-10-10/engine-proof.json","sourceProofFileSha256":"e944cc2432b0f858ab6fd2b4d29b9feed338e77bf46a6583f8305a5b8cc53d97","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch481-2026-10-10/sources.json","sourceCapsuleFileSha256":"75ef47abfcc2e4b6c76cd74945bb998c041116d65cc09a23245effd1402e46d6","sourceChecksFile":"../hanja-goal-glyphwiki-batch481-2026-10-10/validation.json","sourceChecksFileSha256":"a2229c9bb962d8fdd3e70b5a8cd1e18ac4d3e29fcc6b967e53c17b6ee0d69443"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch481-2026-10-10/engine-proof.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-base14-source-after-original42-directions-and-whole-review","catalogStrokes":14,"proposedPlaybackStrokes":14,"groups":[[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[14],[13],[15]],"originalRows":16,"originalCalls":16,"originalP":26,"expectedPens":14,"expectedMasks":16,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"groupingBasis":"ROOT original42 observations identify logical12 horizontal-right and13 central vertical-down. Originalraw14H precedesraw13V in proposed playback. Other oldgroups retained; logical3 usesraw2Q+raw3Q without guide joining; logical9 usesraw9H+raw10V original common endpoint.","dictionaryReview":{"path":"docs/hanja-official-media-compare-u6f0c-2026-10-25/official-temporal-native-review.json","SHA256":"c9a7f21ee46d3a4ab2d6eabc8d3ef7e558f0bc711067e73f5430d467990c97b1"},"wholeEvidence":{"path":"docs/hanja-source-raw-compare-u6f0c-2026-10-25/native-whole-review.json","SHA256":"afaefb786a2bacce62e64ef1069c46521571b6e416abce9d9520fc248ae8e769","scope":"Freshwhole static selection only, not trajectory/contact approval"},"historicalEvidence":{"path":"docs/hanja-goal-glyphwiki-batch481-2026-10-10/progressive-review.json","SHA256":"78539e64a8b9a10c1c11872018afd9d2153f355f5d7d337d1e31303a89393998","oldOrder12V13HRetainedAsHold":true},"water3":{"rawZeroBased":[2,3],"end":[37.875,184],"restart":[34,150],"originalGapPreserved":true,"syntheticBridge":false,"sourcePClockNotApproved":true},"retainedConcerns":["Source water3 curve endpoint/restart gap remains unchanged; source-filled-P display clock requires independent conditions and native review.","Old logical12/13 order mismatch is historical; new source grouping remains unapproved until static review.","Original line decorations, first caps, transition and completion masks require actual playback observations."]})
