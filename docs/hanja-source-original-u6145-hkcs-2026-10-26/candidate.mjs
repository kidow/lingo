// Source-bound 慅 HKCS original13; explicit approved raw playback reordering, original P/Q preserved; runtime pending.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[1],[2],[0],[3,4],[5],[7],[6],[8],[9,10],[11],[12],[13],[14]])
const CURVES={"1:0":[27.475,54,26.75,86,16.6,102,7,8],"2:0":[52.125,53,63,68,65.9,84,7,8],"4:0":[159.44,28,132.4,85,65.84,102,22,7],"5:0":[88.72,28,119.92,82,172.96,94,7,0],"6:0":[112.64,34,123.03999999999999,40,129.28,52,7,8],"7:0":[76.24,48,87.68,55,93.92,71,7,8],"13:0":[66.88,178,120.96000000000001,174,167.76,166,0,7],"14:0":[145.92,147,169.84,161,178.16,184,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,15)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m6145","sourceProofFile":"../hanja-actual-engine-capture-u6145-hkcs-2026-10-26/engine-whole-hkcs_m6145.json","sourceProofFileSha256":"c8b7a251bcaec42235bb991bc993a24b47078c874f5bab528a706bf034bdb4a0","sourceCapsuleFile":"../hanja-source-alternative-u6145-hkcs-2026-10-26/sources.json","sourceCapsuleFileSha256":"b4186893d29d54793eafd24193db9c6687d46e37d6044b5b6656455a89eeefa8","sourceChecksFile":"../hanja-actual-engine-capture-u6145-hkcs-2026-10-26/capture.json","sourceChecksFileSha256":"beb6f44707c4251226ddbd76e9b5ed3d2bb54fc8bf879da3ffd68eb373d87aed"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u6145-hkcs-2026-10-26/engine-whole-hkcs_m6145.json",import.meta.url))))
const EVIDENCE=deepFreeze([["../hanja-official-media-compare-u6145-2026-10-26/official-temporal-native-review.json","d6385f55a2b5d558eecf95d184d9032d86b4cde5557f4fe917ea8501b2de27b8"],["../hanja-source-raw-compare-u6145-hkcs-individual-2026-10-26/native-static-review.json","39923b939a803e78d3235dc255df37b6f084d856ebfe5c77ebc35c7d3907f081"],["../hanja-source-raw-compare-u6145-hkcs-individual-2026-10-26/static-mapping.json","e314664f2d1aeca5590d6a717239811db814e90ae6e43ad61a0337412ee4202c"],["../hanja-source-raw-compare-u6145-hkcs-whole-2026-10-26/native-whole-review.json","6ccb063782f2e085452d22d88958b19ec6ccf285752a7619bb63413461890d5e"],["../hanja-source-original-u6145-hkcs-2026-10-26/paint-and-compound-contacts-proof.json","1721dbba5fc4fc5303abfee84a66083686c96155e08336442e45b5df492fbc8a"],["../hanja-source-original-u6145-hkcs-2026-10-26/verify-paint-and-compound-contacts.py","315d704afc6f81a6def936a49d407423677b5c3e759a053ee4a4768d5ac51450"],["../hanja-source-original-u6145-hkcs-2026-10-26/source-Q-directions.json","1cb1e2da61f7618699b371b720d048fa5cf32e4f9b1cdbe3d14f4df11146961c"]])
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

export const sourceProposal=deepFreeze({"status":"DRAFT-HKCS13-source-preserving-for-actual-review","catalogStrokes":13,"proposedPlaybackStrokes":13,"groups":[[1],[2],[0],[3,4],[5],[7],[6],[8],[9,10],[11],[12],[13],[14]],"originalRows":15,"originalCalls":15,"originalP":27,"expectedPens":13,"expectedMasks":15,"sourceDrawingRawEachOnce":true,"nonDrawingRawRowsPreserved":[],"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"authoredRawArrayOrderUnchanged":true,"logicalPlaybackExplicitApprovedRawReorder":[[1,2],[2,3],[3,1],[6,8],[7,7]],"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReviews":[{"path":"docs/hanja-official-media-compare-u6145-2026-10-26/official-temporal-native-review.json","SHA256":"d6385f55a2b5d558eecf95d184d9032d86b4cde5557f4fe917ea8501b2de27b8","freshFrames":36,"reusedDirectionLabels":[6],"pen6NewTriplets":0}],"staticReview":{"path":"docs/hanja-source-raw-compare-u6145-hkcs-individual-2026-10-26/native-static-review.json","SHA256":"39923b939a803e78d3235dc255df37b6f084d856ebfe5c77ebc35c7d3907f081","logicalPens":13},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u6145-hkcs-whole-2026-10-26/native-whole-review.json","SHA256":"6ccb063782f2e085452d22d88958b19ec6ccf285752a7619bb63413461890d5e","freshWholeRuns":0},"groupingBasis":"ROOT static22 and original36 plus previous explicit pen6 DR. Same raw P/Q arrays retained; playback order follows exact approved grouping. Compounds4 and9 have exact original Q endpoints and independently proved positive P overlap; moving mask contact still pending.","retainedConcerns":["Fixed-width normal strip may reveal future original P decoration before shrinking caps; not accepted from guide initial certificate","Complete compound P contact is not all-time prefix connection or native approval","Publisher broad directions do not establish author microclock identity"],"directOriginalDirectionFrames":36,"reusedExplicitDirectionLabels":1,"all13OriginalDirectionsRecorded":true,"all13DirectionsFreshTriplets":false})
