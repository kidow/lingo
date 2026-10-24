// DRAFT authored HK 薩 source18; original full5 and all source geometry unchanged. Official56 directions reused only; static/contact/playback unapproved.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]])
const CURVES = {"5:0":[66.32,61.980000000000004,60.65,78.465,46.07,99.66,22,7],"6:0":[46.07,98.875,67.13,118.5,62.671105230196645,140.10637280429404,7,0],"6:1":[62.671105230196645,140.10637280429404,60.65,149.9,50.65,149.9,2,614],"10:0":[158,76.11,139.8,87.1,101.3,102.8,0,7],"11:0":[102,77.68,139.1,87.1,160.8,101.22999999999999,7,8],"13:1":[85.2,131.06,85.2,167.95499999999998,69.8,184.44,1,7],"14:0":[113.47999999999999,118.0447,106.424,142.13635,92.312,158.9275,0,7]}
const BEZIERS = {}
const DIAGONALS = {}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m85a9","sourceProofFile":"../hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/engine-whole-u85a9-hkcs.json","sourceProofFileSha256":"5d170f317debfacc063795bbcd23b7b3b5c84703b2415decd8ca9c8535a41267","sourceCapsuleFile":"../hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/capture.json","sourceCapsuleFileSha256":"ab6f45a9c05f357e08c5ffd410053eecf51185a2c1ca73bf6742d3174cd305ef","sourceChecksFile":"../hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/capture.json","sourceChecksFileSha256":"ab6f45a9c05f357e08c5ffd410053eecf51185a2c1ca73bf6742d3174cd305ef"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u85a9-hkcs-2026-10-24/engine-whole-u85a9-hkcs.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original18-for-direct-static-parts-comparison-only","groups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18]],"sourceRawEachOnce":true,"originalRows":19,"originalCalls":21,"originalP":41,"expectedPens":18,"expectedMasks":21,"exactConsecutiveJoinZeroBased":[4,5],"reorderedRawZeroBased":[],"unresolvedSourceParts":[{"pen":13,"original":"raw13 begins original V then Q down-left, two calls retained","status":"Official long-down-left direction is reused; initial V, source static shape and contact require direct review."},{"pens":[5,6],"original":"raw4+5 H-to-DL followed by separate raw6 Q+Q; original endpoints and filled P unchanged","status":"Original source contact and temporal transition not approved."},{"pens":[8,10,11],"original":"raw8 exact short V; opposing raw10/11 Q retained","status":"Official shortV/upper separation/lower contact observations reused as reference only; candidate-specific boundaries not approved."}],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"forcedVerticalForStroke8":false,"originalRaw13InitialVDeleted":false,"wholeReview":{"path":"docs/hanja-source-raw-compare-u85a9-hkcs-2026-10-24/native-whole-review.json","SHA256":"7dd45a2d15adcbed3a2559cdf5cfdf2abea8aa82481ff13d6b9dd78a2aad97f1","macroCorrespondenceOnly":true},"officialReview":{"path":"docs/hanja-official-media-compare-u85a9-2026-10-24/official-temporal-native-review.json","SHA256":"2ddcbc876ae9bf8395fee8c8a8fb6e253db8db7d955e5bcd018c20cc1693a833","acceptedScreens":56,"standard54":true,"extraStroke8Screens":2,"reusedUnchangedDirectionsOnly":true,"SVG_SHA256":"ce5ae49d148227a666b10b5ceb34852d8bee65fb8602fd9c33be94d9b4e97a65","CSS_SHA256":"5c427b5157bb10b0f03e2b42207c55cb2149098044c3a254cd6d0a8d22f8af18","newOfficialReplays":0},"oldK_T_var002HoldsIndependent":true,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false})
