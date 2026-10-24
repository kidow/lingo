// Draft16 original-source projection; official48 macro directions only, original hook retained.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[4],[5],[1],[2,3],[0],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17]])
const CURVES={"3:1":[99,91,99,101,89,101,1,514],"4:0":[47,22,37,33,15,44,0,7],"5:0":[79,20,96,26,106,36,7,8],"6:0":[52,57,52,74,39,91,0,7],"7:0":[74,55,84,65,85,81,7,8],"8:0":[134,14,127,46,109,67,0,7],"10:0":[164,38,156,84,107,106,0,7],"11:0":[125,43,137,86,180,102,7,0]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u77a5","sourceProofFile":"../hanja-actual-engine-capture-u77a5-2026-10-24/engine-whole-u77a5.json","sourceProofFileSha256":"774030b77f6e8433e97fad37cd69a504dd461e52a2cfce6d1e4e749d640e6889","sourceCapsuleFile":"../hanja-actual-engine-capture-u77a5-2026-10-24/capture.json","sourceCapsuleFileSha256":"9305e5b1fc77d92649fade5df4be934f224890cf706b9596475093a1ac5170f7","sourceChecksFile":"../hanja-official-media-compare-u77a5-2026-10-24/official-temporal-native-review.json","sourceChecksFileSha256":"b7039d69d3783993f102978cef981b4d9c78c985a3349726fc9574fad915d4de"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u77a5-2026-10-24/engine-whole-u77a5.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),"Exact seven-field source identity required")
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),"Exact original full5 and trace required")
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash("sha256").update(readFileSync(new URL(f,import.meta.url))).digest("hex"),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft16-official-order-original-P-awaiting-static16-and-actual-contact","groups":[[4],[5],[1],[2,3],[0],[6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16],[17]],"sourceRawEachOnce":true,"originalRows":18,"originalCalls":19,"originalP":36,"expectedPens":16,"expectedMasks":19,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all16DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u77a5-2026-10-24/official-temporal-native-review.json","SHA256":"b7039d69d3783993f102978cef981b4d9c78c985a3349726fc9574fad915d4de","observedTemporalScreens":48,"macroOrderDirectionsOnly":true},"selectedSourceClosure":{"records":["u77a5","u76ee"],"missing":[],"root":"u77a5"},"originalSourceHook":{"logicalPen":4,"sourceRawOneBased":4,"sourceCallOneBased":2,"args":[99,91,99,101,89,101,1,514],"retained":true,"officialBottomLeftHookObserved":false,"sourceTerminalDirectionApproved":false},"sourceContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
