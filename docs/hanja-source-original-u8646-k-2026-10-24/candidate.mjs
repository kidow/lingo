// Exact captured 虆-k full5. Provisional25 grouping preserves30raw/30calls/48P, original QQ gaps and old pen20-nine-frame HOLD; no contact or runtime approval.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[3],[2],[4],[5,6],[8],[7],[9],[10],[11,12],[14],[13],[15],[16],[17,18],[20],[19],[21],[22,23],[24,25],[26],[27],[28],[29]])
const CURVES = {"22:0":[98,125.5536,86,133.92000000000002,70,142.28640000000001,0,7],"23:0":[44,133.92000000000002,70,140.49360000000001,82,151.848,7,8],"24:0":[137,132.72480000000002,118,144.07920000000001,88,157.824,0,7],"25:0":[21,160.2144,76,159.0192,164,155.4336,0,7],"26:0":[139,143.4816,164,151.848,175,163.8,7,8],"28:0":[68,166.19039999999998,53,176.9472,24,185.91119999999998,0,7],"29:0":[125,163.2024,152,171.5688,166,183.5208,7,8]}
const BEZIERS = {}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u8646-k","sourceProofFile":"../hanja-goal-glyphwiki-batch548-2026-10-11/engine-whole-u8646-k.json","sourceProofFileSha256":"486234a872334f2fbef3508136ee0dc2f1558574200daaf97e8816df0df8b26b","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch548-2026-10-11/sources.json","sourceCapsuleFileSha256":"857bb452aac701c4cb95118af566ae235a6fed579d663bc1aedf5db4d760db55","sourceChecksFile":"../hanja-goal-glyphwiki-batch548-2026-10-11/validation.json","sourceChecksFileSha256":"9be5b7cb0f897ac40dbe24089e6c54fd70f62039dd57971e7bb46e592f790391"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch548-2026-10-11/engine-whole-u8646-k.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"original25-recipe-reordered-from-official75-static25-unreviewed","groups":[[0],[1],[3],[2],[4],[5,6],[8],[7],[9],[10],[11,12],[14],[13],[15],[16],[17,18],[20],[19],[21],[22,23],[24,25],[26],[27],[28],[29]],"sourceRawEachOnce":true,"originalRows":30,"originalCalls":30,"originalP":48,"expectedPens":25,"expectedMasks":30,"sourceGeometryChanged":false,"sourceGuideReversed":false,"historicalReview":{"path":"docs/hanja-goal-glyphwiki-batch548-2026-10-11/progressive-review.json","SHA256":"61b74c717bc11fef37d5a85b17f94e3cb5dcfcf3aff219c0b66b5971ab2d5df1"},"historicalSelectedRoot":"u8646-k","historicalReviewSaysWholeCompatible":true,"historicalPen20NormalFrames":9,"historicalApprovedFrames":0,"historical27Versus25HoldPreserved":true,"oldOther24DirectionsUnreviewed":true,"provisionalQQPairsZeroBased":[[22,23],[24,25]],"originalQQGapsPreserved":true,"newDirectionsReviewed":25,"newStatic25MappingApproved":false,"newInitialContactApproved":false,"sourceConnectorAdded":false,"newCapsReuseApproved":false,"nativeApproval":false,"runtimeApplied":false,"officialScreens":75,"officialReview":{"path":"docs/hanja-official-media-compare-u8646-2026-10-24/official-temporal-native-review.json","SHA256":"ce9ad5104728c89b611a0c68fe74627fdf9c833b3242be223187237d528b7a0a"},"sourceOrderAdjustment":{"swappedLogicalPairs":[[3,4],[7,8],[12,13],[17,18]],"reason":"ROOT complete official25 directions75 fresh screens","originalRawPArgsGuidesUnchanged":true,"staticMappingUnapproved":true}})
