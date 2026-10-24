// Draft10 source-preserving mapping for ROOT static verification only. Original14raw14calls27P unchanged; historicalV/H andQ/MC gaps preserved.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[6],[7,8],[9],[10],[11,12],[13],[0],[1],[2,3],[4,5]])
const CURVES={"0:0":[27,21,46,30,58,46,7,8],"1:0":[16,57,35,65,49,81,7,8],"4:0":[16,179,35,168,55,154,0,7],"6:0":[110.7325,18.38235,100.705,48.8793,72.05499999999999,65.514,0,7],"8:0":[155.14,32.2446,135.08499999999998,80.30040000000001,62.027499999999996,97.39717499999999,22,7],"9:0":[105.71875,32.706675000000004,113.5975,76.6038,178.77625,91.852275,7,0]}
const BEZIERS={"5:0":[53,152,68,172,84,181,179,177,7,0]}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,14)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u9004","sourceProofFile":"../hanja-goal-glyphwiki-batch591-2026-10-11/engine-whole-u9004.json","sourceProofFileSha256":"257a1f8d261cbba41435b26f675cb6547069179b395630f93b77f461da7ac04c","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch591-2026-10-11/sources.json","sourceCapsuleFileSha256":"06c0379f0ca67a39a978649a0dd8396f0c5565ace200d1b20abc89986b0cc811","sourceChecksFile":"../hanja-goal-glyphwiki-batch591-2026-10-11/validation.json","sourceChecksFileSha256":"e1446184cb9504bc51757d4a2641037a2fe156b8e6818e01b43a93b45b97c8f6"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch591-2026-10-11/engine-whole-u9004.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft10-mapping-awaiting-ROOT-static-all10-no-native-approval","groups":[[6],[7,8],[9],[10],[11,12],[13],[0],[1],[2,3],[4,5]],"sourceRawEachOnce":true,"originalRows":14,"originalCalls":14,"originalP":27,"expectedPens":10,"expectedMasks":14,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all10DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u9004-2026-10-24/official-temporal-native-review.json","SHA256":"df67dfea26eacfc9892fab61c96ea38104a63bc056e572bc3ec939de8d6b0f69","combinedObservedScopes":30},"historicalWholeEvidence":{"path":"docs/hanja-source-raw-compare-u9004-2026-10-24/native-whole-review.json","SHA256":"13f7c7f172b0426b02d7247a3fc51091c8040b34fe2388585c3f4065f3bccbe6","reusedHistoricalPanel":597,"newScreens":0},"originalGuideGaps":{"pen5VtoH":[-25.5,0],"pen10QtoMC":[-2,-2]},"sourceReorderExplicit":true,"reorderedRawOneBased":[7,8,9,10,11,12,13,14,1,2,3,4,5,6],"sourceContactApproved":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
