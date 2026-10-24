// Exact separately acquired public 迲-k full5. Reuse prior static9 mapping; preserve12raw/12calls/26P and old historical missing-source HOLD.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[6],[7],[8],[9,10],[11],[0],[1],[2,3],[4,5]])
const CURVES = {"0:0":[27,21,46,30,58,46,7,8],"1:0":[16,57,35,65,49,81,7,8],"4:0":[16,179,35,168,55,154,0,7],"9:0":[118.41,89.005,109.44,117.395,96.33,144.95,0,7],"10:0":[74.94,147.455,111.50999999999999,144.115,165.32999999999998,137.435,0,7],"11:0":[139.8,102.365,161.19,123.24,173.61,155.805,7,8]}
const BEZIERS = {"5:0":[53,152,68,172,84,181,179,177,7,0]}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,12)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u8ff2-k","sourceProofFile":"../hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u8ff2-k.json","sourceProofFileSha256":"6029caec2b9d761d8912f289895aa7f23e3f5062c4c7703bd398846a57509cc3","sourceCapsuleFile":"../hanja-public-glyphwiki-source-closure-u8ff2-u7e86-u7c69-2026-10-22.json","sourceCapsuleFileSha256":"4393a7d5320483766e3985e73ef61fadc1c6f1666ee0ea1ec59fa9e03b8b8cc1","sourceChecksFile":"../hanja-public-glyphwiki-engine-capture-2026-10-22/validation.json","sourceChecksFileSha256":"79d53612693416dcf52979b2f09ac09bd95c46d847f07f1ba9b950f1657eeb23"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-public-glyphwiki-engine-capture-2026-10-22/engine-whole-u8ff2-k.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"exact-public-source-static-correspondence-preserved-six-official-directions-pending","groups":[[6],[7],[8],[9,10],[11],[0],[1],[2,3],[4,5]],"sourceRawEachOnce":true,"originalRows":12,"originalCalls":12,"originalP":26,"expectedPens":9,"joinsOneBased":[[10,11],[3,4],[5,6]],"nonconsecutiveJoins":[],"reorderedRawOneBased":[7,8,9,10,11,12,1,2,3,4,5,6],"sourceGeometryChanged":false,"sourceGuideReversed":false,"historicalMissingFixedSourceHoldPreserved":true,"newPublicClosureIsSeparateFromHistoricalArchive":true,"sourceStaticCorrespondence":{"path":"docs/hanja-source-native-raw-correspondence-u8ff2-k-2026-10-22.json","SHA256":"12feeef68d4e90dcc32d5fc8f77f95da2163c77c083c9624953f14ebf0779ec0","reusedScreens":21,"newScreens":0},"compoundOfficialEvidence":{"path":"docs/hanja-official-media-compare-u8ff2-2026-10-22/native-review.json","SHA256":"1c1e7a14572a3b3d4748a1fd683612846f50e06e500ff96cdab538399b1dabab","pens":[4,8,9],"reusedScreens":11},"staticMappingApproved":true,"allOfficialDirectionsObserved":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})

