// Source-bound 瑃: static13 and original temporal13 reviewed; actual reveal/runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13]])
const CURVES={"3:0":[13.72,155,42.14,146,74.48,131,0,7],"7:0":[129,13.74,123.64,101.94,70.71000000000001,140.16,0,7],"8:0":[145.07999999999998,88.22,159.82,118.6,181.93,132.32,7,0]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7443-g","sourceProofFile":"../hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json","sourceProofFileSha256":"709c291a306471e084acb00eb94191ecf6782033feef0989124b400e677c40c2","sourceCapsuleFile":"../hanja-source-alternative-u7443-g-2026-10-26/sources.json","sourceCapsuleFileSha256":"f3d3984cc8d32d7fb6092c203deabebe4db60ee4768f6d5d1df736aba3a92ae1","sourceChecksFile":"../hanja-actual-engine-capture-u7443-g-2026-10-26/capture.json","sourceChecksFileSha256":"27753f9d6e98323e8d3cb4f59c9f07b32659fc1d1baf3a58df697dab000a3350"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u7443-g-2026-10-26/engine-whole-u7443-g.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-source-raw-compare-u7443-g-individual-2026-10-26/native-static-review.json","aeb2d2455a5dae9942f6309507b7991155236839b64dd693fae5c30f21b4937d"],["../hanja-official-media-compare-u7443-2026-10-26/official-temporal-native-review.json","fb0774ca8d98d9218be267c0e515996b7aa7972f2c305a62ef3dabc2d4aebfc7"],["./verify-paint-and-compound-contacts.py","50248fc71dc66fd4a489894fa7f20dfbcb06cfa1afad5af66740394ce48d4362"],["./paint-and-compound-contacts-proof.json","dde246efff50a5c08d9548f655deb082db7a178ed37f042784304d1d5f2fb5b7"]])
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
export const sourceProposal=deepFreeze({"status":"SOURCE-ONLY-STATIC13-TEMPORAL13-INITIAL-PENDING","catalogStrokes":13,"proposedPlaybackStrokes":13,"groups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13]],"originalRows":14,"originalCalls":14,"originalP":25,"expectedMasks":14,"nonDrawingRawRowsPreserved":[],"sourceGeometryChanged":false,"sourceArgsChanged":false,"sourceGuideReversed":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceStaticMappingApproved":true,"originalTemporalApproved":true,"initialContactApproved":false,"allFramesApproved":false,"nativeApproval":false,"runtimeApplied":false,"productionImportAllowed":false})
