// DRAFT 斃 base dictionary17, unchanged catalog18; original body3 only.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[1],[2],[3],[4,5],[0,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[19],[18]])
const CURVES={"1:0":[44,22.45,34,35.84,12,47.17,0,7],"2:0":[75,21.935000000000002,94,29.145,105,40.99,7,8],"5:1":[99,89.185,99,99.185,89,99.185,1,514],"7:0":[48,57.985,45,73.435,35,86.31,0,7],"8:0":[71,56.44,82,67.77000000000001,85,82.19,7,8],"9:0":[141.2,14.21,131.6,40.475,109.2,58.5,0,7],"11:0":[165.2,39.445,155.6,89.4,94,103.82,2,7],"12:0":[123.6,44.595,132.4,84.25,181.2,98.67,7,0],"14:0":[57,113.5,48,145.5,17,160,132,7],"16:0":[91,134.5,79,178,14,187,22,7],"17:0":[38,144.5,57,150.5,66,160,7,8],"18:1":[114,171,114,181,124,181,1,1],"19:0":[171,134.5,145,141.5,114,148,0,7]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,20)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u6583","sourceProofFile":"../hanja-goal-glyphwiki-batch983-2026-10-13/engine-whole-u6583.json","sourceProofFileSha256":"d14c80336eabbc950ea68b677cf90737bc19c47876b5d3b96947d33714caabfd","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch983-2026-10-13/sources.json","sourceCapsuleFileSha256":"13d188aa50ea4dc5374a34a5ab667be1b592c4eb5b9a4b551a045583f7f52ddb","sourceChecksFile":"../hanja-goal-glyphwiki-batch983-2026-10-13/validation.json","sourceChecksFileSha256":"78c7aa53990eaea18132e41408da998ebd4edf741931c3a06c48395876a7e931"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch983-2026-10-13/engine-whole-u6583.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original stored body3 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-catalog18-dictionary17-original-base-body3","catalogStrokes":18,"proposedPlaybackStrokes":17,"sourceProofKind":"selected-body3-only","originalStoredFields":["groups","trace","defaults"],"full5Claimed":false,"engineHeaderAdded":false,"groups":[[1],[2],[3],[4,5],[0,6],[7],[8],[9],[10],[11],[12],[13],[14],[15,16],[17],[19],[18]],"originalRows":20,"originalCalls":23,"originalP":47,"expectedPens":17,"expectedMasks":23,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"countConflictResolved":false,"examBodyApproval":false,"individualVariantApproved":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u6583-2026-10-25/official-temporal-native-review.json","SHA256":"160ee5a4c3e91e71924c400e2a9dc62e405a19f3379fa6d3a6b237f4f68ab935"},"wholeReview":{"path":"docs/hanja-source-raw-compare-u6583-2026-10-25/native-whole-review.json","SHA256":"0162f537867dd2f1bd7666731efa5160efb12b37099cf23951d95affc017eb92"},"groupingBasis":"ROOT51 direction frames select logical1 original raw2DL,logical2 raw3DR. Central V uses original raw1 then raw7 as logical5 with exact common endpoint, rather than numeric graph ordering. Logical4 raw5H+raw6V/Q andlogical14 raw16H+raw17DL are exact consecutive authored joins. Original raw20 shallowDL precedes original raw19 V/Q/H source as logical16/17.","retainedConcerns":["catalog18/private17 boundary conflict unresolved; variant unapproved","logical17 original source guide has V/Q/H only; endkind5 original P contains UP form. No synthetic UP guide is added. Completion timing pending.","logical4 hook/5 centralV split/14 H-to-DL contacts and all progressive masks require direct validation","missing historical engine header is capture format, not asserted missing geometry; source identity remains original body3"]})
