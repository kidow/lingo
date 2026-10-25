// Source-bound 蘉 HKCS original20; explicit original-order raw3/4 swap, unchanged source P/Q; runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[3],[2],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18],[19],[20,21],[22,23],[24]])
const CURVES={"10:0":[36,75.08575,37,90.0715,22,99.29350000000001,7,8],"12:0":[170,80.8495,166,86.036875,154,95.83525,22,7],"13:0":[62.82280000000001,89.69,48.9124,119.9,20.2222,148.4,0,7],"19:0":[76.7424,127.88,75.6752,138.71,63.93599999999999,144.98000000000002,7,8],"21:0":[168.5216,132.44,164.2528,136.43,156.7824,142.7,22,7],"23:0":[149.31199999999998,146.12,123.69919999999998,175.76,63.93599999999999,186.01999999999998,22,7],"24:0":[89.5488,146.12,115.16159999999999,175.19,168.5216,181.45999999999998,7,0]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,25)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m8609","sourceProofFile":"../hanja-actual-engine-capture-u8609-hkcs-2026-10-26/engine-whole-hkcs_m8609.json","sourceProofFileSha256":"3fe1b0adf00c88fe9bda882c583cb6bc1189fa13b4f377386fcceabe22ebf7f7","sourceCapsuleFile":"../hanja-source-alternative-u8609-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"85584d7c432b0be8bcac22becd1ce201cb7bcc20ff78e8f4d4687f7d621cb60d","sourceChecksFile":"../hanja-actual-engine-capture-u8609-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"53b648970f1494894563789762c0161c6aee0c84323404468c520fdd2d32dec0"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u8609-hkcs-2026-10-26/engine-whole-hkcs_m8609.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-official-media-compare-u8609-2026-10-26/official-temporal-native-review.json","bb4f89831aa69f3fafb883fe1c0be33369708f7240bda6082f05196441206040"],["../hanja-source-raw-compare-u8609-hkcs-individual-2026-10-26/native-static-review.json","c687fc061bae376265b89f4fd4aadc6413f0b274ec0ddef99543a53469e91a8c"],["../hanja-source-raw-compare-u8609-hkcs-individual-2026-10-26/static-mapping.json","707f8cb55175b6d36a7b093721b32b21e3e030f322faf0510fa1c6412066eb20"],["../hanja-source-raw-compare-u8609-hkcs-whole-2026-10-26/native-whole-review.json","0ac07ad75129df6bc2f03c745aa1a0f1caf9a4ca6bce7df38280439c541c1da3"],["../hanja-source-original-u8609-hkcs-2026-10-26/paint-equivalence-proof.json","844d5d6d9c6d7321daa3cd0c2a62ada60ac6784a396749788579e7de131889cb"],["../hanja-source-original-u8609-hkcs-2026-10-26/verify-paint-equivalence.py","cbd49fb1f7d2c76f133780fcaac5289b4b0777e11231be58fae10442e462230f"],["../hanja-source-original-u8609-hkcs-2026-10-26/source-Q-directions.json","3a915bba6d80fc91f990d1564384387400e214e6bfa38e85096966ce6de8e466"]])
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

export const sourceProposal=deepFreeze({"status":"DRAFT-HKCS20-source-preserving-for-actual-review","catalogStrokes":20,"proposedPlaybackStrokes":20,"groups":[[0],[1],[3],[2],[4],[5,6],[7],[8],[9],[10],[11,12],[13],[14],[15,16],[17],[18],[19],[20,21],[22,23],[24]],"originalRows":25,"originalCalls":25,"originalP":40,"expectedPens":20,"expectedMasks":25,"sourceDrawingRawEachOnce":true,"nonDrawingRawRowsPreserved":[],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"authoredRawArrayOrderUnchanged":true,"logicalPlaybackExplicitRaw3and4Swap":true,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u8609-2026-10-26/official-temporal-native-review.json","SHA256":"bb4f89831aa69f3fafb883fe1c0be33369708f7240bda6082f05196441206040","frames":60}],"staticReview":{"path":"docs/hanja-source-raw-compare-u8609-hkcs-individual-2026-10-26/native-static-review.json","SHA256":"c687fc061bae376265b89f4fd4aadc6413f0b274ec0ddef99543a53469e91a8c","logicalPens":20},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u8609-hkcs-whole-2026-10-26/native-whole-review.json","SHA256":"0ac07ad75129df6bc2f03c745aa1a0f1caf9a4ca6bce7df38280439c541c1da3","freshWholeRuns":0},"groupingBasis":"ROOT static38 and original60 require raw4 before raw3 for original pens3/4. Source raw/P/Q arrays remain unchanged; five original fold groups are statically matched.","retainedConcerns":[{"pen":10,"raw":11,"detail":"Q first control leg has dx+1/dy+14.98575 while overall endpoint is DL; original broad DL observation does not approve this early local rightward tangent."},{"pen":14,"raw":[16,17],"detail":"H-to-down Q seam is noncoincident by -0.285000000000005 y in normalized100; original P positive contact/static mapping passed, moving contact pending."}],"directOriginalDirectionFrames":60,"all20OriginalDirectionsDirectlyObserved":true})
