// 奫 K original source15: static mapping approved; catalog14, playback/runtime approval pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[17],[12,13],[10,11],[14],[15],[16]])
const CURVES={"1:0":[100,14.2,83,50.6,14,75.8,0,7],"2:0":[112,33.8,140,57.6,180,71.6,7,0],"3:0":[25.575,78,46.2,82.55,55.275,91.65,7,8],"4:0":[9.9,107.9,32.175,112.45,40.425,121.55,7,8],"5:0":[11.55,151.45,40.425,157.3,37.125,184.6,7,8],"6:0":[33,162.5,36.3,154.7,70.95,108.55,32,7],"7:1":[81.465,145.58375,81.465,177.905,57.915,186.7775,1,7]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,18)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u596b-k","sourceProofFile":"../hanja-goal-glyphwiki-batch794-2026-10-13/engine-whole-u596b-k.json","sourceProofFileSha256":"79e34e202be30dcb3365c899e220b0d9ad2f67633e5931ffd4d984530e500da7","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch794-2026-10-13/sources.json","sourceCapsuleFileSha256":"158d1aefbbd5f559e16e5954a9ac6fc3d0e96b43d894d3f136e3898209a513c9","sourceChecksFile":"../hanja-goal-glyphwiki-batch794-2026-10-13/validation.json","sourceChecksFileSha256":"3490ad51f98f2c0ed707641ab81fe1ac8941871cc5c70bb9deccef8a5ed992bf"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch794-2026-10-13/engine-whole-u596b-k.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"SOURCE-STATIC-APPROVED-catalog14-private15-playback-pending","catalogStrokes":14,"proposedPlaybackStrokes":15,"groups":[[0],[1],[2],[3],[4],[5,6],[7],[8],[9],[17],[12,13],[10,11],[14],[15],[16]],"originalRows":18,"originalCalls":19,"originalP":32,"expectedPens":15,"expectedMasks":19,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"countConflictResolved":false,"examBodyApproval":false,"individualVariantApproved":false,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"groupingBasis":"ROOT static15 confirms1..9/11 and fresh correction10/12..15: pen10 is original raw18 middle longH; pen12 is raw11 V then raw12 H with exact original endpoint; pen13/raw15 V,14/raw16 H,15/raw17 outerV. Original raw6/7 waterguide gap remains separate masks in logicalpen6; no connector/geometry change.","dictionaryReview":{"path":"docs/hanja-official-media-compare-u596b-2026-10-25/source6-temporal-native-review.json","SHA256":"758ed4005760f761d2ab3168eca2a3916d2d0d05f098c19c342773d64ae4c9f3"},"reusedAll15DirectionReview":{"path":"docs/hanja-goal-glyphwiki-batch274-2026-10-04/review.json","SHA256":"f7d36d886374a30ec42380b825c118c5701c97a2461e4553ce54a3e94d71a43f"},"wholeReview":{"path":"docs/hanja-goal-glyphwiki-batch794-2026-10-13/review.json","SHA256":"50a66f080a7bdf630a3379ae06b99bcf27261cd9cb9941518ae93caa281b70c2"},"staticReview":{"path":"docs/hanja-source-raw-compare-u596b-k-2026-10-25/native-group-review.json","SHA256":"25e6393e30d8e97c04981ebb26548a15d78111d2ab60b7a390ccee353a23b6d9"},"retainedConcerns":["Catalog14/private15 remain distinct; individual playback variant registration not approved","Water6 original Q endpoint(37.125,184.6) and next Q start(33,162.5) gap retained; sourceP contact/newdisplayclock unproved","Exact guide endpoint of12 V→H is not fullfilledP/native transition approval","Initialcaps,compound boundaries,terminalstates and all15 playback pending; oldwrongmapping/HOLDscreens preserved"]})
