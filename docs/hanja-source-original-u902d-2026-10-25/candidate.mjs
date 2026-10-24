// DRAFT 逭 base original12, gap retained; no production import or native approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[6],[7],[8,9],[10],[11,12],[13],[14,15],[16],[0],[1],[2,3],[4,5]])
const CURVES={"0:0":[27,21,46,30,58,46,7,8],"1:0":[16,57,35,65,49,81,7,8],"4:0":[16,179,35,168,55,154,0,7],"7:0":[80.615,27.725250000000003,81.28,53.1373125,70.64,61.3790625,7,8],"9:0":[177.04000000000002,38.0274375,173.05,46.2691875,163.74,60.0054375,22,7]}
const BEZIERS={"5:0":[53,152,68,172,84,181,179,177,7,0]}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,17)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u902d","sourceProofFile":"../hanja-goal-glyphwiki-batch1035-2026-10-13/engine-whole-u902d.json","sourceProofFileSha256":"c56b9afad6c730d87e65ccb4e65068eafef3f3e8d5e2530c209877c71f8e00e2","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1035-2026-10-13/sources.json","sourceCapsuleFileSha256":"7cbd857454ee44c4f4d066bbf697d6e1c43544b94ed6dc264fb8f8b884938168","sourceChecksFile":"../hanja-goal-glyphwiki-batch1035-2026-10-13/native-hold.json","sourceChecksFileSha256":"878ac81ce427d7c41103f35e9f53d32e1f41455effff9f5c9ad85668c5180d38"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch1035-2026-10-13/engine-whole-u902d.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-base12-original-parts-static-only","catalogStrokes":12,"proposedPlaybackStrokes":12,"groups":[[6],[7],[8,9],[10],[11,12],[13],[14,15],[16],[0],[1],[2,3],[4,5]],"originalRows":17,"originalCalls":17,"originalP":28,"expectedPens":12,"expectedMasks":17,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u902d-2026-10-25/native-first11-supplemental-review.json","SHA256":"e58d38a64d3d6978b721ac1f9611451ce60ba27d18880f9eca01b7193e0b264d"},{"path":"docs/hanja-official-media-compare-u902d-2026-10-25/native-stroke12-supplemental-review.json","SHA256":"d32d59fc59f04d2533ba510ee75ef3605c9c591f1aa77da7b35e8a0e594d0e9c"}],"wholeReviewReuse":{"path":"docs/hanja-goal-glyphwiki-batch1035-2026-10-13/native-hold.json","SHA256":"878ac81ce427d7c41103f35e9f53d32e1f41455effff9f5c9ad85668c5180d38","field":"nativeReview.wholeVariants: base compatible=true; old source hold remains historical","freshWholeRuns":0},"groupingBasis":"ROOT original38 fixed-frame observations bind body raw6..16, two dots raw0/1, H/V raw2/3 and Q/Bezier raw4/5. Every raw and call is preserved exactly once. Only original paired guide endpoints 8/9,11/12,14/15,2/3 are equal.","retainedConcerns":["Logical12 original guide gap [-2,-2] remains; filled-P proper crossings do not approve a display clock.","Nonconsecutive raw10 terminal equals raw16 start but logical4 and8 remain independent.","Original initial caps, contact timing and source boundaries are unapproved.","No wrong one-dot VS2 recipe or geometry is reused; source checks file is prior inventory/HOLD, not approval."]})
