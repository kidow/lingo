// Source-bound 讒 HKCS original24; original full5 and every source P/Q preserved; runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[5],[6,7],[8],[9],[10,11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22,23],[24],[25,26],[27],[28],[29],[30]])
const CURVES={"9:0":[116,17,107,33,78,54,0,7],"11:0":[144,28,141,31,130,42,22,7],"18:0":[78,100,96,98,132,92,0,7],"19:0":[175,73,163,77,142,82,0,7],"20:1":[140,88,140,98,150,98,1,3001],"21:0":[117,101,102,126,77,140,0,7],"23:0":[146,112,140,120,131,128,22,7],"28:0":[134,128,128,174,72,187,132,7],"29:1":[138,171,138,181,148,181,1,1],"30:0":[150,156,160,160,166,170,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,31)
  for(const index of [4]){assert.deepEqual(trace[index],[]);assert.deepEqual(proof.groups[index].polygons,[]);assert.deepEqual(proof.groups[index].raw,[0,...Array(10).fill(null)])}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m8b92","sourceProofFile":"../hanja-actual-engine-capture-u8b92-hkcs-2026-10-26/engine-whole-hkcs_m8b92.json","sourceProofFileSha256":"4ebc488e6effd4d7ea1e7866ab84f0070bad147a4e5282c1cb188e2cf7683cdb","sourceCapsuleFile":"../hanja-source-alternative-u8b92-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"afe61564814ceb1be31b91dc9ca74673bd192d0fd327d649a854f9b8b5205094","sourceChecksFile":"../hanja-actual-engine-capture-u8b92-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"ad2392e22369ead8fe52681ce75a527c5ad661ee8417bdc46691b8ffafcd3954"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u8b92-hkcs-2026-10-26/engine-whole-hkcs_m8b92.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-official-media-compare-u8b92-2026-10-26/official-temporal-native-review.json","799b712c0274b6c97a88096f177fa6fccb842a067b2c22aae4f1cafd2881b448"],["../hanja-source-raw-compare-u8b92-hkcs-individual-2026-10-26/native-static-boundaries.json","5b47ec39ac187eff16bc048485e7a6ce925af540ee17e9a68156bae4582e5979"],["../hanja-source-raw-compare-u8b92-hkcs-individual-2026-10-26/static-mapping.json","099783e83a7eafa28c29e1594d7595028a44b1595018c3370cb67c1693bf4a9a"],["../hanja-source-raw-compare-u8b92-hkcs-whole-2026-10-26/native-whole-review.json","6732516133f7263109dcaa429678c6733699a4bf24a62d16a4651d4e7625fc5e"],["../hanja-source-original-u8b92-hkcs-2026-10-26/paint-equivalence-proof.json","eb4c1fb28fcf2581e6031f097824235423cd763587774b8e791e80488b71092b"],["../hanja-source-original-u8b92-hkcs-2026-10-26/verify-paint-equivalence.py","95d53e8a2b93c73de16e8071cf3371cb691099cee1d9e996121b848fc2b7f92e"],["../hanja-source-original-u8b92-hkcs-2026-10-26/source-Q-directions.json","3814db7cae7400041a3a4a2731460f12b3517deb97a96b2574c34debdc043aef"]])
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

export const sourceProposal=deepFreeze({"status":"DRAFT-original-HK24-source-preserving-for-actual-review","catalogStrokes":24,"proposedPlaybackStrokes":24,"groups":[[0],[1],[2],[3],[5],[6,7],[8],[9],[10,11],[12],[13,14],[15],[16],[17,18],[19],[20],[21],[22,23],[24],[25,26],[27],[28],[29],[30]],"originalRows":31,"originalDrawingRaws":30,"originalCalls":34,"originalP":63,"expectedPens":24,"expectedMasks":34,"sourceDrawingRawEachOnce":true,"nonDrawingRawRowsPreserved":[4],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceStaticMappingApproved":true,"sourceBroadQDirectionCorrespondenceChecked":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u8b92-2026-10-26/official-temporal-native-review.json","SHA256":"799b712c0274b6c97a88096f177fa6fccb842a067b2c22aae4f1cafd2881b448","frames":72}],"staticReview":{"path":"docs/hanja-source-raw-compare-u8b92-hkcs-individual-2026-10-26/native-static-boundaries.json","SHA256":"5b47ec39ac187eff16bc048485e7a6ce925af540ee17e9a68156bae4582e5979","logicalPens":24,"completedOriginalPOnly":true,"scenes":39},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u8b92-hkcs-whole-2026-10-26/native-whole-review.json","SHA256":"6732516133f7263109dcaa429678c6733699a4bf24a62d16a4651d4e7625fc5e","selectedProvider":"hkcs_m8b92","freshWholeRuns":0},"paintEquivalence":{"path":"docs/hanja-source-original-u8b92-hkcs-2026-10-26/paint-equivalence-proof.json","SHA256":"eb4c1fb28fcf2581e6031f097824235423cd763587774b8e791e80488b71092b","all34CallsEquivalent":true},"QDirectionReview":{"path":"docs/hanja-source-original-u8b92-hkcs-2026-10-26/source-Q-directions.json","SHA256":"3814db7cae7400041a3a4a2731460f12b3517deb97a96b2574c34debdc043aef"},"groupingBasis":"ROOT original72 directions and static39 scenes directly bind all24 pens to unchanged30 drawing raws. Six original folds have4 exact Q seams and2 noncoincident Q seams with direct static-boundary and positive-P contact evidence. Literal0 raw5 remains in full5 with empty trace/P.","retainedConcerns":["Initial curve fragments, compound transitions and completion await actual renderer review.","Original noncoincident Q gaps raw14→15 and18→19 are preserved; no connector is fabricated.","Pens16/23 retain original endflag5 up-hook P, not an invented up-hook Q; actual phase review pending.","Original31raw/34call/63P retained, metadata raw5 not assigned to ink."],"directOriginalDirectionFrames":72,"all24OriginalDirectionsDirectlyObserved":true,"oldDirectionArrayUsedAsApproval":false})
