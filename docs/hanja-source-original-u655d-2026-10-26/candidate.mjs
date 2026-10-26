// Source-bound 敝: original full5 and separate exact body3; static11/temporal11 reviewed, reveal/runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[1],[2],[3],[4,5],[0,6],[7],[8],[9],[10],[11],[12]])
const CURVES={"1:0":[44,30,34,56,12,78,0,7],"2:0":[75,29,94,43,105,66,7,8],"5:1":[99,169,99,179,89,179,1,514],"7:0":[48,99,45,129,35,154,0,7],"8:0":[71,96,82,118,85,146,7,8],"9:0":[141.2,14,131.6,65,109.2,100,0,7],"11:0":[165.2,63,155.6,160,94,188,2,7],"12:0":[123.6,73,132.4,150,181.2,178,7,0]}
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
    if(index===5){
      const [line,curve]=trace[index];assert.equal(trace[index].length,2);assert.equal(line.kind,'cdDrawLine');assert.equal(curve.kind,'cdDrawCurve');assert.deepEqual(line.args,[99,79,99,169,22,1]);assert.deepEqual(curve.args,CURVES['5:1']);assert.deepEqual(line.args.slice(2,4),curve.args.slice(0,2));
      const a=line.args,b=curve.args,round=(n)=>Math.round(n*1e6)/1e6
      const weight=round(round(Math.hypot(a[2]-a[0],a[3]-a[1])/2)+round(Math.hypot(b[4]-b[0],b[5]-b[1])/2))
      return [{...segment([...line.polygons,...curve.polygons],'curve',weight),revealPath:`M${a[0]/2} ${a[1]/2} L${a[2]/2} ${a[3]/2} Q${b[2]/2} ${b[3]/2} ${b[4]/2} ${b[5]/2}`,revealWidth:14}]
    }
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u655d","sourceProofFile":"../hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json","sourceProofFileSha256":"a1e4d41afd749d9af493f30fcaf7eccb685b911aead2f38349104d6bbfb0fb87","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch984-2026-10-13/sources.json","sourceCapsuleFileSha256":"9c41dc687373f9efe6866099dbc27310ccff04e7ccf37a26900aac2883eaa7e8","sourceChecksFile":"../hanja-goal-glyphwiki-batch984-2026-10-13/strict-native-server-preflight.json","sourceChecksFileSha256":"3c667bcfcdbb763b85f546b8882c43ef9c9090c46fe1087f95efb3ca6c69b9dc"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch984-2026-10-13/engine-proof.json",import.meta.url))))
const body=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-goal-glyphwiki-batch984-2026-10-13/engine-whole-u655d.json","aec1600890713b18fd739998c8b2451eaf267e664039ab6db60b6124c39a94af"],["../hanja-goal-glyphwiki-batch984-2026-10-13/strict-native-server-preflight.json","3c667bcfcdbb763b85f546b8882c43ef9c9090c46fe1087f95efb3ca6c69b9dc"],["../hanja-goal-glyphwiki-batch984-2026-10-13/source-preservation-audit.json","95c47c685d1ba4864010906d057b572b5e50f09c3dc078bbb39b15f412db31b2"],["../hanja-goal-glyphwiki-batch984-2026-10-13/verify-source.mjs","207aaa8b572d374a9ee574cff62df9e0a7e3b7dc8cc0afc32dca1bdbddac1644"],["../hanja-source-raw-compare-u655d-base-individual-2026-10-26/native-static-review.json","c3a1a6a714c2c4f2f079bb7d2e916916bc998d9a67f2a254bb19790b2c05df4c"],["../hanja-official-media-compare-u655d-2026-10-26/official-temporal-native-review.json","d3f5da76ce38c35dce33f79920cc6e7554901e61b8472564f0eb249b1b3d4fe5"],["../../content/hanja/stroke-count-corrections.json","939c3b8fe3648ec11526c31b57bd2b7020fb996b0d2f303a843f9b5e82a25611"],["./verify-paint-and-compound-contacts.py","7c1c301c468cd4d3a8336a08c00892d585f42015b70fedacd76c62b43504a837"],["./paint-and-compound-contacts-proof.json","022c19f1da086aed3288505ce7cabfbee05f1ec12ece98d04eb1157ee961ab4c"]])
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 assert.deepEqual(Object.keys(body).sort(),['defaults','groups','trace']);for(const k of ['groups','trace','defaults'])assert(sameJSON(proof[k],body[k]),'Original full5/body3 projection exact')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 for(const[f,p]of EVIDENCE)assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p,'Exact original/static/paint/Q evidence required')
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"SOURCE-ONLY-STATIC11-TEMPORAL11-INITIAL-PENDING","catalogStrokes":11,"proposedPlaybackStrokes":11,"groups":[[1],[2],[3],[4,5],[0,6],[7],[8],[9],[10],[11],[12]],"originalRows":13,"originalCalls":14,"originalP":28,"expectedMasks":13,"nonDrawingRawRowsPreserved":[],"sourceGeometryChanged":false,"sourceArgsChanged":false,"sourceGuideReversed":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceStaticMappingApproved":true,"originalTemporalApproved":true,"initialContactApproved":false,"allFramesApproved":false,"nativeApproval":false,"runtimeApplied":false,"productionImportAllowed":false,"sourceStrokes":12,"sourceWeightRecomputed":true,"sourceWeightRule":"Rounded per-call endpoint chord/2; same-raw line+curve mask sums rounded call weights; no source-authored weight field","authorClockEquivalentToOriginal":false,"body3ProjectionExact":true,"wholeEngineProofAlreadyPreserved":true,"vendorReplayReused":true,"newEngineRuns":0,"raw6SingleMask":{"rawCalls":2,"mask":1,"syntax":"MLQ","source200ExactJoin":[99,169],"calculatedWeight":52.071068},"nonConsecutiveLogical5Raw":[1,7]})
