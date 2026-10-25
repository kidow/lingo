// DRAFT 乷 catalog8/dictionary8 original G actual-full5 source only; no runtime approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3],[4],[5],[6],[7],[8,9]])
const CURVES={"0:0":[31.05,16.3,53.15,20.82,61.65,28.165,7,8],"1:0":[13.2,43.42,35.3,47.375,44.65,55.285,7,8],"2:0":[14.9,80.145,48.9,85.23,45.5,108.96,7,8],"3:0":[40.4,89.75,44.65,83.535,76.1,37.77,32,7],"5:0":[108.285,34.379999999999995,98.34,58.675,75.135,74.495,0,7],"6:0":[152.485,33.25,176.795,46.81,180.11,58.11,7,8],"7:0":[165.745,59.24,149.17,94.27,54.14,110.655,0,7],"9:1":[66.48970772345847,156.24283948747248,12,181.36,72,181.36,1,1]}
const BEZIERS={}
const DIAGONALS={"9:0":[138,123.28,66.48970772345847,156.24283948747248,22,1]}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,10)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u4e77-g","sourceProofFile":"../hanja-actual-engine-capture-u4e77-g-2026-10-25/engine-whole-u4e77-g.json","sourceProofFileSha256":"75e6dca0ef2e25a455d91f688f5db083dbc715c88b12cfe58bcf0bdf2df56496","sourceCapsuleFile":"../hanja-source-alternative-u4e77-g-2026-10-25/sources.json","sourceCapsuleFileSha256":"1d267f7e99985e0e9c577e28f525d98c84dd3a5368bc218f6e99913ddff2c3ad","sourceChecksFile":"../hanja-source-raw-compare-u4e77-g-whole-2026-10-25/native-group-review.json","sourceChecksFileSha256":"5acb78ece14cdbede30d205ae91bfb6a62d5c7ca3b4556274a0254b29685e1ce"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u4e77-g-2026-10-25/engine-whole-u4e77-g.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-catalog8-dictionary8-original-G-source-only","catalogStrokes":8,"proposedPlaybackStrokes":8,"catalogDictionaryCountsEqual":true,"variantRequired":false,"groups":[[0],[1],[2,3],[4],[5],[6],[7],[8,9]],"originalRows":10,"originalCalls":12,"originalP":25,"expectedPens":8,"expectedMasks":12,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"sourceStaticMappingApproved":true,"sourceCurvePathsApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u4e77-2026-10-25/native-original-review.json","SHA256":"ee59932ba03b3f69877013c386aa019b2bf37e68c79c7ae68a030e2f1fc632e2","scope":"ROOT original CSS24, eight strokes at .1/.5/.75; original8 static history reused"},"staticReview":{"path":"docs/hanja-source-raw-compare-u4e77-g-whole-2026-10-25/native-group-review.json","SHA256":"5acb78ece14cdbede30d205ae91bfb6a62d5c7ca3b4556274a0254b29685e1ce","scope":"ROOT static8 only; timing and contact remain unapproved"},"wholeReview":{"path":"docs/hanja-source-raw-compare-u4e77-g-whole-2026-10-25/native-whole-review.json","SHA256":"48b90722c6e2c9f664bc3fa22c2694d045db0faa6d8e548f3072615f6c475695","scope":"New G whole1 PASS; not inherited from held HK/J"},"groupingBasis":"ROOT static8 and original CSS24: logical3 retains original raw3 then raw4, logical8 retains raw9 H then all three original raw10 calls in their original order. All ten raw rows once.","retainedConcerns":["logical3 first P/body and following long UR source contact requires exact independent review","logical8 H→diagonal ML→Q turn→H/end decoration has four original masks; no new connector or trimmed hook","logical7 raw8 original Q is already monotone DL; no reversal policy is added","Initial visibility, prior contact, Q7/ML7 completion and actual renderer frames are pending","Previous base/HK/J source holds remain preserved; only this G source passed whole/static review"]})
