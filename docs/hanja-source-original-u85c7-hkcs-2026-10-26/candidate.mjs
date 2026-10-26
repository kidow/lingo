// Source-bound 藇: static-approved18 grouping only; original temporal and runtime approval pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[10],[11],[12],[13],[4],[5],[6,7],[8],[15,16],[17],[18],[20],[21],[22]])
const CURVES={"10:0":[70,56.125,54,62.565,36,68.2,0,7],"21:0":[77,155.945,53,172.85,14,185.73,0,7],"22:0":[120,155.945,152,161.57999999999998,178,181.705,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,23)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m85c7","sourceProofFile":"../hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/engine-whole-hkcs_m85c7.json","sourceProofFileSha256":"fec68385651daa6711291f6e1d441333377c01cf1e8baeb2fe3480bb9ab10749","sourceCapsuleFile":"../hanja-source-alternative-u85c7-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"cae48a831179493986a2aa64127c80be2d29b7d6c3d28a750714b3bbe67767f9","sourceChecksFile":"../hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"15ee3e6dd8951dfc0df4c9c080699b6a924b88b78357a426665e36a1c22f2694"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u85c7-hkcs-2026-10-26/engine-whole-hkcs_m85c7.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-source-raw-compare-u85c7-hkcs-individual-2026-10-26/static-mapping.json","5b387e911ba9c761b107a57b9cb7ccc1d50fb6dfc0fc6b2187a66a0eb01b36b7"],["../hanja-source-raw-compare-u85c7-hkcs-individual-2026-10-26/native-static-review.json","c3f37a8b402b7d887ec6f28147870a12aefc2f75e20765dd0e9497f95c5c7157"],["./verify-paint-and-compound-contacts.py","adc303410f6ceca8a45726881358ae62e620a871882cb53986bb51dbde84ac5d"],["./paint-and-compound-contacts-proof.json","145b66073163a60abd737344d6204a92a5b34eafa37bc954034fbd31a8f5eebe"]])
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 for(const[f,p]of EVIDENCE)assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p,'Exact original/static/paint/Q evidence required')
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"SOURCE-ONLY-STATIC18-TEMPORAL-PENDING","catalogStrokes":18,"proposedPlaybackStrokes":18,"groups":[[0],[1],[2],[3],[10],[11],[12],[13],[4],[5],[6,7],[8],[15,16],[17],[18],[20],[21],[22]],"originalRows":23,"originalCalls":20,"originalP":37,"expectedMasks":20,"nonDrawingRawRowsPreserved":[10,15,20],"sourceGeometryChanged":false,"sourceArgsChanged":false,"sourceGuideReversed":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceStaticMappingApproved":true,"originalTemporalApproved":false,"initialContactApproved":false,"allFramesApproved":false,"nativeApproval":false,"runtimeApplied":false,"productionImportAllowed":false})

