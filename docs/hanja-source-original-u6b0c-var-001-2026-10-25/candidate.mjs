// DRAFT 欌 original25raw to observed22logical hypothesis; old wrong logical14 HOLD preserved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[15],[16],[17,18],[19],[20],[14,21],[22],[23],[24]])
const CURVES={"2:0":[36.25,61,30,110,13.125,148,132,7],"3:0":[39.375,86,51.25,94,58.125,109,7,8],"11:0":[75.01,127.344,75.72,165.35825,61.519999999999996,180.4205,32,7],"12:1":[91.34,140.97175000000001,91.34,178.26875,70.75,188.31024999999997,3001,7],"22:0":[152.4,55.6,152.4,177.2,182.93,182.9,0,15],"23:0":[176.54000000000002,93.6,165.18,167.7,131.1,187.65,0,7],"24:0":[155.24,48,165.18,53.7,169.44,63.2,7,8]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u6b0c-var-001","sourceProofFile":"../hanja-actual-engine-capture-u6b0c-var-001-2026-10-25/engine-whole-u6b0c-var-001.json","sourceProofFileSha256":"e0b47d747f02bbe3c2f3ee6323eb3ce83751358467cb3710707022e65458c88b","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch829-2026-10-13/sources.json","sourceCapsuleFileSha256":"52d7da4adc7e7681c1720ee5144500def02314ce86218dfe4b087b2a48525e26","sourceChecksFile":"../hanja-actual-engine-capture-u6b0c-var-001-2026-10-25/capture.json","sourceChecksFileSha256":"77244793256658ffc71307e9ace2a62260daea149ba3449af0fe7bc6776c1ead"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u6b0c-var-001-2026-10-25/engine-whole-u6b0c-var-001.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original-var00122-source-groups-after-private66-direction-review","catalogStrokes":22,"proposedPlaybackStrokes":22,"groups":[[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[15],[16],[17,18],[19],[20],[14,21],[22],[23],[24]],"originalRows":25,"originalCalls":26,"originalP":46,"expectedPens":22,"expectedMasks":26,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":true,"sourceTimingEquivalent":false,"examBodyApproval":false,"sourceStaticMappingApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"groupingBasis":"ROOT private66 original frames identify logical19 as outer-left V then bottomH. Original raw14 V and raw21 H have the exact common original endpoint(105.53999999999999,164.85), so the earlier wrongly placed source14 [14,21] hypothesis moves to logical19. Original inner raw15H/raw16V/raw17+18HV/raw19H/raw20V now map14..18. Original compounds8+9=logical9 and17+18=logical16 preserve endpoints/call order; originalraw12V+DLtwo calls staylogical12. This is a source-only proposal pending whole/static native comparison.","dictionaryReview":{"path":"docs/hanja-official-media-compare-u6b0c-2026-10-25/official-temporal-native-review.json","SHA256":"3d466d13e1d15562a50522b4fabb4cea005a5ff7e2b550942a8bc18ef2e91bde"},"historicalWholeEvidence":{"path":"docs/hanja-goal-glyphwiki-batch829-2026-10-13/review.json","SHA256":"aca433f7a8e59755d9518bd3300c0520cbc9c79079aa1bb20f1af7fe795cee87","scope":"Historical macro-compatible whole var001 only; old candidate14 mapping HOLD is retained, not silently rewritten."},"actualCapture":{"path":"docs/hanja-actual-engine-capture-u6b0c-var-001-2026-10-25/capture.json","SHA256":"77244793256658ffc71307e9ace2a62260daea149ba3449af0fe7bc6776c1ead","bodyMatchesExistingSource":true},"oldPen14WrongMappingHoldPreserved":true,"logical19SourceFacts":{"verticalRawZeroBased":14,"horizontalRawZeroBased":21,"sourceEndpoint":[105.53999999999999,164.85],"centerlineJoinExact":true,"originalSourceStopFlags":[4012,13,2,200],"filledPixelAndAllTimeContactApproved":false},"retainedConcerns":["Source20 original Q ends down-right while original terminal15 supplies upward-hook filledP. No synthetic UP guide or timing is added; original terminalP visibility needs actual review.","Original raw14 nonconsecutive raw21 grouping is allowed as a new logical19 hypothesis only by direct private19 V/H observation and exact sourcejoin; static matching still pending.","Line stop decoration/initial curve caps/compound transition and raster connectivity are not approved."]})
