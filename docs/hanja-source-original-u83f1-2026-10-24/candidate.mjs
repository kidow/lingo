// DRAFT 菱 dictionary11, unchanged catalog12; no production import or native approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11]])
const CURVES={"6:0":[76,99.2,62,125.6,17,136,0,7],"7:1":[119,110.8,119,120.8,129,120.8,1,4001],"8:0":[85,122.77600000000001,65,150.356,24,166.11599999999999,0,7],"10:0":[140,136.17200000000003,100,178.724,15,188.18,22,7],"11:0":[74,137.748,100,177.148,174,181.876,7,0]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,12)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u83f1","sourceProofFile":"../hanja-goal-glyphwiki-batch1121-2026-10-14/engine-whole-u83f1.json","sourceProofFileSha256":"730a2ec4643d370ac0341cfd1f65c1c58d9f110d7edb225cbad51cadf2b3359b","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1121-2026-10-14/sources.json","sourceCapsuleFileSha256":"e56afbfe16ab6d8ad9659c1b9b848c4891f8ef50fe380c2df8bd983e497f0ae6","sourceChecksFile":"../hanja-goal-glyphwiki-batch1121-2026-10-14/validation.json","sourceChecksFileSha256":"38c6b34d89c1ec4b6875566edc4b81519df420141e31cc1278c7e11135a9307a"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch1121-2026-10-14/engine-whole-u83f1.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-catalog12-dictionary11-original-P-source-only","catalogStrokes":12,"proposedPlaybackStrokes":11,"groups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11]],"originalRows":12,"originalCalls":14,"originalP":30,"expectedPens":11,"expectedMasks":14,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"countConflictResolved":false,"examBodyApproval":false,"individualVariantApproved":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"groupingBasis":"ROOT observed dictionary pen10 H-right then DL fold; original raw10 H endpoint equals original raw11 Q start exactly. Original raw8 remains its existing V/Q/H-UP single raw with three calls.","dictionaryReview":{"path":"docs/hanja-official-media-compare-u83f1-2026-10-24/official-temporal-native-review.json","SHA256":"c1891a1937a95aa86b76a56b31bc53a4cbe8dfaa93c386844fef80928e120275"},"wholeReview":{"path":"docs/hanja-source-raw-compare-u83f1-2026-10-24/native-whole-review.json","SHA256":"dd69b8de754b0c6914a281b55252c6d432f2dd099717ad22b388c46ce34a91b3"},"sourceFilledContact":{"path":"docs/hanja-source-raw-compare-u83f1-2026-10-24/source-filled-contact-facts.json","SHA256":"c91174fa7142e743c3b8d4fd280213569911a0e1ea9ad286cd3a1d349be064de"},"retainedConcerns":["raw6 H to raw7 DL primary-body white gap is connected only via original serif in filled source; raster continuity unapproved","original raw8 UP ending and final lower junction need direct static/temporal checks","no all-time connection or publisher-microtiming claim"]})
