// DRAFT authored 皁 J seven-source paths; whole/directions observed, static/runtime not approved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3],[4],[5],[6],[7]])
const CURVES={"0:0":[100.9,15.175,96.4,27.165,88.3,41.335,0,7]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,8)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7681-j","sourceProofFile":"../hanja-actual-engine-capture-u7681-j-2026-10-25/engine-whole-u7681-j.json","sourceProofFileSha256":"c64b3d87ec722d56007895449de12a797b4143e1276a92d5c3d3d57ab534ddb6","sourceCapsuleFile":"../hanja-source-alternative-u7681-j-2026-10-25/sources.json","sourceCapsuleFileSha256":"7ef420fc6d0941cf83ae316e8f386dc7a99920ea0aa4b442e5629ccb5f4f2285","sourceChecksFile":"../hanja-actual-engine-capture-u7681-j-2026-10-25/capture.json","sourceChecksFileSha256":"3db62dacefc4da601bf0eb29ab382a08ed1c5bbe8290767460c1b77a1389501a"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u7681-j-2026-10-25/engine-whole-u7681-j.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original-J-seven-logical-source-paths","catalogStrokes":7,"proposedPlaybackStrokes":7,"groups":[[0],[1],[2,3],[4],[5],[6],[7]],"originalRows":8,"originalCalls":8,"originalP":13,"expectedPens":7,"expectedMasks":8,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"groupingBasis":"ROOT original21frames: pen3 is H-right then right-V-down without hook. Original raw3 H ends exactly at original raw4 V start (152.2,41.335). Other seven original calls stay independent and original raw order remains unchanged.","dictionaryReview":{"path":"docs/hanja-official-media-compare-u7681-2026-10-25/official-temporal-native-review.json","SHA256":"6000fb72341fd2c647af4b0c01b36c3871a86b0ab08abd6c0189220a173972da"},"wholeReview":{"path":"docs/hanja-source-raw-compare-u7681-j-2026-10-25/native-whole-review.json","SHA256":"b0f08b9814e7e49fa1372af1fbfcddf5a4aca621c936f40231c539b560ad251d"},"sourceFilledSeparation":{"outerFinalVerticalRawOneBased":8,"whiteBottomHorizontalRawOneBased":6,"verticalOriginalPMinY":"104","horizontalOriginalPMaxY":"1011/10","gapSourceUnits":"29/10","gapNormalizedUnits":"29/20","strictlySeparated":true,"proofScope":"Exact coordinate extrema of unchanged original polygon sets; horizontal strip separation proves these two public filled sets disjoint. Does not infer stroke order, private pixel separation, or runtime timing. Old K contact HOLD is unchanged."}})
