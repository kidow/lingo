// Fresh direct full5 from exact closed original 萇-VS2 source; retain12logical/13raw/13calls/26P and old10m2 initial finite-nib HOLD.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[3],[2],[9],[8],[10],[11],[12],[4,5],[6],[7]])
const CURVES = {"5:0":[23,179.7,75,169.795,111,158.475,0,7],"6:0":[148,133.005,135,148.57,121,159.89,0,7],"7:0":[91,128.76,114,169.795,176,179.7,7,0]}
const BEZIERS = {}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,13)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u8407-ue0102","sourceProofFile":"../hanja-actual-engine-capture-u8407-ue0102-2026-10-24/engine-whole-u8407-ue0102.json","sourceProofFileSha256":"3f1c41b838f99ea1bf71c04141a7ec4b51bc775a6dc32a18fab70c162fef1af1","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch832-2026-10-13/sources.json","sourceCapsuleFileSha256":"18ce44687d3f08976bd751747e190747e26d480b201c6234664fff0bbc179849","sourceChecksFile":"../hanja-actual-engine-capture-u8407-ue0102-2026-10-24/capture.json","sourceChecksFileSha256":"c9308617fdada13bdabe6ec21fef2f4e486d7a2853876a69535ca112d2a14ea4"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u8407-ue0102-2026-10-24/engine-whole-u8407-ue0102.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"fresh-single-call-full5-original12-recipe-existing-static-only-all-directions-pending","groups":[[0],[1],[3],[2],[9],[8],[10],[11],[12],[4,5],[6],[7]],"sourceRawEachOnce":true,"originalRows":13,"originalCalls":13,"originalP":26,"expectedPens":12,"expectedMasks":13,"sourceGeometryChanged":false,"sourceGuideReversed":false,"oldStaticReview":{"path":"docs/hanja-source-native-raw-correspondence-u8407-vs2-2026-10-21/review.json","SHA256":"7254c4f2c9b1670f3364c7023c606a2afeb2c8b34c6171748e1db36c1d13a257","sourceWholeCompatible":true,"domestic12Raw13FilledShapeCorrespondenceOnly":true},"oldInitialNibHold":{"path":"docs/hanja-source-native-hold-u8407-vs2-q10-activation-2026-10-21/hold.json","SHA256":"aaa389f9f28ffc45fa402e6038f7a036c0e67c0f5a081a9cdcdf7bbb43f22099","pen":10,"mask":2,"confirmed":true,"positiveArea":true,"sourceGapUnchanged":true,"overruledByJev":false},"originalGap":{"rawZeroBased":[4,5],"end":[50,169.795],"start":[23,179.7],"sourceDelta":[-27,9.905000000000001],"sourceDistance":28.759503211981947},"newDirectionsReviewed":0,"newInitialContactApproved":false,"sourceConnectorAdded":false,"newCapsReuseApproved":false,"nativeApproval":false,"runtimeApplied":false})
