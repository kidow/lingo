// DRAFT 庾 VS2 dictionary12, unchanged catalog11; no production import or native approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[12],[8,7],[9],[6],[10],[11]])
const CURVES={"2:1":[34,102,34,161,9,189,1,7],"3:0":[97.01,54.07,84.13,62.37,61.59,68.18,0,7],"10:1":[113.915,106.36,113.915,167.78,47.905,185.21,1,7],"11:0":[115.525,98.06,117.94,169.44,172.68,179.4,7,0]}
const BEZIERS={}
const DIAGONALS={}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u5ebe-ue0102","sourceProofFile":"../hanja-goal-glyphwiki-batch776-2026-10-13/engine-whole-u5ebe-ue0102.json","sourceProofFileSha256":"38329a01b786dbbfe3cf6a199cebf8352ebd6838dbcdd7583679ff0d8638faec","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch776-2026-10-13/sources.json","sourceCapsuleFileSha256":"0335ccf6dffce388f9c76d947ca5880297db70af5f7e28ed024557f59dabcb50","sourceChecksFile":"../hanja-goal-glyphwiki-batch776-2026-10-13/validation.json","sourceChecksFileSha256":"8cb33e592ae641333b9833d63709be3ab9eea8dce446c1571165c6192008dc4c"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch776-2026-10-13/engine-whole-u5ebe-ue0102.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-catalog11-dictionary12-original-VS2-source-only","catalogStrokes":11,"proposedPlaybackStrokes":12,"groups":[[0],[1],[2],[3],[4],[5],[12],[8,7],[9],[6],[10],[11]],"originalRows":13,"originalCalls":15,"originalP":26,"expectedPens":12,"expectedMasks":15,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"countConflictResolved":false,"examBodyApproval":false,"individualVariantApproved":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u5ebe-2026-10-24/official-temporal-native-review.json","SHA256":"7f07f6b1c86d1f972dd0a07d97c7cc6220a2abee774c37134079596ce44a3b4b"},"historicalWholeReuse":{"path":"docs/hanja-goal-glyphwiki-batch776-2026-10-13/review.json","SHA256":"8fa4fda86980ad0d6ae4df7263e01a46d140f1e878d97c8d05a34383508e991a","selectedRootListedCompatible":true,"scope":"Existing whole macro compatibility only; no new whole observation, mapping or fine boundary approval."},"groupingBasis":"Direct ROOT dictionary12 directions. Move original left-bottom raw13 to logical7. Logical8 uses original raw9 topH then raw8 rightV with identical endpoint/start. Move original right-bottom raw7 to logical10. All original rows once, including original within-raw calls unchanged.","retainedConcerns":["catalog11/dictionary12 unresolved; individual variant not approved","logical8 original V ending kind23 must be compared directly to official no-hook ending; no forced hook removal","new static12 and temporal/contact/raster validation pending","base/J/K/VS0/VS1 have one full bottom horizontal and are not substituted for VS2"]})
