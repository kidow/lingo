// DRAFT 薩 authored T whole projection for direct source-parts comparison only. Original8Q,13V+Q and2/4slants remain unchanged and unapproved.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[13],[12],[14],[15],[17],[16],[18]])
const CURVES = {"5:0":[64.8,70.44,58.5,85.77000000000001,42.3,105.47999999999999,22,7],"6:0":[42.3,104.75,65.7,123,61.212364674445155,138.92487257887868,7,0],"6:1":[61.212364674445155,138.92487257887868,58.5,148.55,48.5,148.55,2,514],"8:0":[116.7984,59.2053,129.9192,65.4906,133.0432,74.02065,7,8],"10:0":[154.34320000000002,79.30584999999999,130.2742,97.90625,95.37415000000001,108.27955,0,7],"11:0":[101.39140000000002,82.3463,130.67534999999998,91.82535,150.73284999999998,105.77565000000001,7,8],"12:1":[81.98,131.76,81.98,171.18,66.36,188.7,1,7],"14:0":[107.54,122.27,104.7,144.9,89.08,164.61,0,7]}
const BEZIERS = {}
const DIAGONALS = {"1:0":[62,13.57,68,58.96,0,200],"3:0":[138,13.57,132,58.96,0,300]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u85a9-t","sourceProofFile":"../hanja-actual-engine-capture-u85a9-t-2026-10-24/engine-whole-u85a9-t.json","sourceProofFileSha256":"5c1a246213dd02dc03098c05502907ed92ea9fd2d5e27d332d18f18f42e5ea29","sourceCapsuleFile":"../hanja-actual-engine-capture-u85a9-t-2026-10-24/capture.json","sourceCapsuleFileSha256":"da9fd42b73ffc4db1a0a07bd02ef248b96566c117423b53c503ab540c28ff1b2","sourceChecksFile":"../hanja-actual-engine-capture-u85a9-t-2026-10-24/capture.json","sourceChecksFileSha256":"da9fd42b73ffc4db1a0a07bd02ef248b96566c117423b53c503ab540c28ff1b2"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u85a9-t-2026-10-24/engine-whole-u85a9-t.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original18-for-direct-static-parts-comparison-only","groups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[13],[12],[14],[15],[17],[16],[18]],"sourceRawEachOnce":true,"originalRows":19,"originalCalls":21,"originalP":41,"expectedPens":18,"expectedMasks":21,"exactConsecutiveJoinZeroBased":[4,5],"reorderedRawZeroBased":[{"officialPens":[12,13],"sourceRows":[13,12],"basis":"ROOT direct official12 horizontal then13 long down-left"},{"officialPens":[16,17],"sourceRows":[17,16],"basis":"ROOT direct official16 horizontal then17 vertical"}],"unresolvedSourceParts":[{"pen":8,"official":"short vertical down, ROOT .05 upper half/.1 full","original":"raw8 single Q M116.7984,59.2053 Q129.9192,65.4906 133.0432,74.02065 (source coordinates), down-right","status":"Direct source/reference directional-shape correspondence not established; preserve Q unchanged, no guide rotation or synthesized V."},{"pen":13,"official":"long down-left","original":"raw12 begins original V then Q down-left in same raw;2calls","status":"Initial V and complete long-down-left correspondence needs static/per-stroke direct comparison; no deletion."},{"pens":[2,4],"official":"vertical down","original":"raw1 and3 cardinal-looking but originally slanted lines with x deltas +6/-6; original fields preserved","status":"Original shapes must be directly compared, no forced cardinal replacement."}],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"forcedVerticalForStroke8":false,"originalRaw12InitialVDeleted":false,"wholeReview":{"path":"docs/hanja-source-raw-compare-u85a9-t-2026-10-24/native-whole-review.json","SHA256":"43abb13ce9d0e8df2d11d4e7120b5af9fc7391e1302498cad8a1122054ac3158","macroCorrespondenceOnly":true},"officialReview":{"path":"docs/hanja-official-media-compare-u85a9-2026-10-24/official-temporal-native-review.json","SHA256":"2ddcbc876ae9bf8395fee8c8a8fb6e253db8db7d955e5bcd018c20cc1693a833","acceptedScreens":56,"standard54":true,"extraStroke8Screens":2},"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
