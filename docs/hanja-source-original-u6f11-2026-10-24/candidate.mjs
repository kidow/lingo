// Exact original 漑 full5; original17raw19calls34P preserved. Fourteen groups are a direction-supported hypothesis, not native mapping/contact approval.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2,3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]])
export const sourceProposal = deepFreeze({"schema":"hanja-source-mapping-hypothesis/v1","glyph":"漑","sourceRoot":"u6f11","groupsZeroBased":[[0],[1],[2,3],[4],[5,6],[7],[8],[9],[10],[11],[12],[13,14],[15],[16]],"originalRaw":17,"originalCalls":19,"originalP":34,"logicalPens":14,"logicalMasks":19,"evidence":{"official":{"path":"docs/hanja-official-media-compare-u6f11-2026-10-24/official-temporal-native-review.json","SHA256":"d1468b9fbe6166cb741b4929164003fa9b86e7bee0d052dd2064118f2ddfe8af","scope":"ROOT42 original-media observations and directions only"},"whole":{"path":"docs/hanja-source-raw-compare-u6f11-2026-10-24/native-static-review.json","SHA256":"fbbc41bc04a38f322b54f5b37215a5cca76eccbc478d80787d35cc054e097163","scope":"ROOT9 unique whole comparisons; base/k prioritized, no per-pen mapping approval"},"legacyHold":{"path":"docs/hanja-goal-glyphwiki-batch1120-2026-10-14/source-hold.json","SHA256":"983b3ecd68a44cad592699741b04d7b8911356d3ce5fc4b72554fdec4b96af6e","preserved":true}},"water3":{"originalRaw1Based":[3,4],"originalCalls":["downward Q","up-right Q"],"originalEndpointGapRaw":["-7/2","-34"],"originalSecondQStartRaw":[31,150],"startStrictInsidePriorBodyP":true,"startStrictInsideOwnP":false,"priorMarginSquaredRaw":"1572516/90025","priorQMiddleWitnessRaw":["1219/40","601/4"],"distanceSquaredToPriorQMiddleRaw":"541/1600","normalizedGuideWidth":14,"priorEndpointDiskNotAssumed":true,"actualCompletedPriorSourcePAndOriginalMidCurveMaskRequired":true,"initialInkConnectionNotYetProved":true,"fullPrefixConnectionNotProved":true},"contact12":{"originalRaw1Based":[14,15],"originalEndpointGapRaw":["-5733/400","0"],"priorVWholeAndHPositiveAreaIntersectionRaw":[127.5,99,139.5,103],"ordinaryLeftmostHClipMayStartDetached":true,"newSourceContactPolicyNotImplemented":true},"terminal14":{"originalRaw1Based":17,"originalCalls":["V down","Q down-right","H right"],"originalCallEndpointsExact":true,"originalUpPFromLastLineFlag5":[[182.7,171],[184.7,146],[182.7,146],[176.7,171]],"ordinaryRightClipMayOmitUp":true,"newTerminalPolicyNotImplemented":true},"scope":{"originalPGuideWidthWeightPreserved":true,"sourceQReversed":false,"newGuide":false,"originalRawEachOnce":true,"mappingNativeApproved":false,"sourceContactApproved":false,"productProgressiveApproved":false,"runtimeApplied":false}})
const CURVES = {"0:0":[24.7,20,42.2,27,49.9,41,7,8],"1:0":[11.4,66,30.3,73,37.3,87,7,8],"2:0":[12.8,133,37.3,142,34.5,184,7,8],"3:0":[31,150,33.8,138,63.2,67,32,7],"4:0":[92.3625,16,89.9125,28,85.0125,41,0,7],"15:0":[162.24,30,156.78,151,102.8625,187,132,7],"16:1":[154.73250000000002,167,154.73250000000002,177,164.73250000000002,177,1,1]}
const BEZIERS = {}
export let sourceProjectionCount=0
function compileOriginal(trace, proof) {
  sourceProjectionCount++
  assert.equal(trace.length,17)
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
      const[x1,y1,x2,y2]=a;assert(x1===x2||y1===y2,'Only exact cardinal original lines')
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u6f11","sourceProofFile":"../hanja-goal-glyphwiki-batch1120-2026-10-14/engine-whole-u6f11.json","sourceProofFileSha256":"7ff6c8fb904a1a2a18bba8d82fc15389e2613bbe9e136ca0c2beab762b8a0339","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1120-2026-10-14/sources.json","sourceCapsuleFileSha256":"cbf8ecd33b8bdbe6865b6febf1ac6c0d290968cdb2128f3150ebd9f3c5cd1ae7","sourceChecksFile":"../hanja-goal-glyphwiki-batch1120-2026-10-14/metadata.json","sourceChecksFileSha256":"8ec89b653a3119cb7c2def774858f8e78bfd6761555611153400e4c2e08eb75f"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL(selectedProofIdentity.sourceProofFile,import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
