// DRAFT 楰 base private13, unchanged catalog12; static/runtime approval pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13]])
const CURVES={"2:0":[46.75,61,38,110,14.375,148,132,7],"3:0":[51.125,86,67.75,94,77.375,109,7,8],"4:0":[120.2,34,108.08,42,92.93,49,0,7],"12:1":[134.34,90,134.34,169,75.76,189,1,7],"13:0":[135.35,89,138.38,160,179.79,182,7,0]}
const BEZIERS={}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u6970","sourceProofFile":"../hanja-goal-glyphwiki-batch786-2026-10-13/engine-whole-u6970.json","sourceProofFileSha256":"2907c73d361c9529f96f18380699f3bb5c22ae2a4ee0a60ebf1c0faab676a2c7","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch786-2026-10-13/sources.json","sourceCapsuleFileSha256":"8d2bb588ca66eabfb62225031861aab23af98f224f5566b892d0f33eaae68a24","sourceChecksFile":"../hanja-goal-glyphwiki-batch786-2026-10-13/validation.json","sourceChecksFileSha256":"b4bda1843a9da340f718022670ac422dd9dfd2636f16dbea00ef4ade35eb8d5d"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch786-2026-10-13/engine-whole-u6970.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-catalog12-private13-original-base-source-only","catalogStrokes":12,"proposedPlaybackStrokes":13,"groups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13]],"originalRows":14,"originalCalls":15,"originalP":26,"expectedPens":13,"expectedMasks":15,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"countConflictResolved":false,"examBodyApproval":false,"individualVariantApproved":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"groupingBasis":"ROOT private39 original fixed frames: pen9 is right-top H then right-V down without hook. Original raw9 H endpoint and raw10 V start exactly equal (173.73,45). Original raw13 already contains central V and continuous DL curve, kept as one logicalpen12/two masks. All other original raw calls remain separate and ordered.","dictionaryReview":{"path":"docs/hanja-official-media-compare-u6970-2026-10-25/official-temporal-native-review.json","SHA256":"3e6b418900791733b5545142a82a26f4a1cbfd65fbf96cfa1d09c5c333939bad"},"wholeReview":{"path":"docs/hanja-source-raw-compare-u6970-2026-10-25/native-whole-review.json","SHA256":"f8ab91f19b0c8780fcf585c4c6dcb79b386f7686eceaa1a0ad323668ccfbc5ec"},"retainedConcerns":["Catalog12/private13 mismatch remains; eventual individual playback variant requires separate approval","Source line stop/serif13 and23, initial Q fragments and compound boundaries need actual component review","Old var001 continuous-bar HOLD preserved; no whole substitution or count-driven merge of independent left/right 臼 horizontals"]})
