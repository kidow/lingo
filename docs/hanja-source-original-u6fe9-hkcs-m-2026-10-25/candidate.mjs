// DRAFT 濩 HKCS original21 -> seventeen logical pens; static mapping approved, reveal policies unapproved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3,4,5],[6],[7],[9],[8],[10],[11],[12],[13],[14],[15],[16],[17],[18,19],[20]])
const CURVES={"0:0":[26.92,19,42.94,26,50.06,44,7,8],"1:0":[14.46,61,30.48,68,37.6,86,7,8],"2:0":[38.49,143,34.93,138,16.240000000000002,134,0,7],"3:0":[33.15,178,40.27,151,34.04,136,7,8],"4:0":[46.5,104,33.15,146,39.38,184,7,8],"5:0":[37.6,136,45.61,118,66.08,54,12,7],"10:0":[93.92,48,83.52,72,57.519999999999996,92,0,7],"12:0":[131.36,48,127.19999999999999,58,120.96000000000001,65,0,7],"19:0":[159.44,136,125.12,174,58.56,184,22,7],"20:0":[89.76,136,116.8,170,177.12,178,7,0]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,21)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m6fe9","sourceProofFile":"../hanja-actual-engine-capture-u6fe9-hkcs-m-2026-10-25/engine-whole-hkcs_m6fe9.json","sourceProofFileSha256":"fe2644ffc692b3eb4133fb4f9a9a26bd1d6f92da46eea97488991ab4fe4b7456","sourceCapsuleFile":"../hanja-source-alternative-u6fe9-hkcs-m-2026-10-25/sources.json","sourceCapsuleFileSha256":"a21b42270f9025c02a7d5569388cc72d3c9e06bc34316f7c722410a0df7cfd6b","sourceChecksFile":"../hanja-actual-engine-capture-u6fe9-hkcs-m-2026-10-25/capture.json","sourceChecksFileSha256":"f34aed464c752caa314fd8e13804cba0004c41ead858d90008209a07ca11ccac"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u6fe9-hkcs-m-2026-10-25/engine-whole-hkcs_m6fe9.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original21-static-approved-for-seventeen-logical-review","catalogStrokes":17,"proposedPlaybackStrokes":17,"groups":[[0],[1],[2,3,4,5],[6],[7],[9],[8],[10],[11],[12],[13],[14],[15],[16],[17],[18,19],[20]],"originalRows":21,"originalCalls":21,"originalP":41,"expectedPens":17,"expectedMasks":21,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":true,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u6fe9-2026-10-25/remaining16-temporal-native-review.json","SHA256":"f6c1cc3c8100e7519295a7a52a53923a6b2d3cb06d5965d89125b53f9eb35b9d","freshOriginalFrames":48,"reusedOriginalFrames":3,"reusedReviewPath":"docs/hanja-official-media-compare-u6fe9-2026-10-25/water3-temporal-native-review.json","reusedReviewSHA256":"5fcd5d4b69d57b6535cf65d5bcb63e022d3385374b60fd03b0310e77964c43a2"},"staticReview":{"path":"docs/hanja-source-raw-compare-u6fe9-hkcs-whole-2026-10-25/native-group-review.json","SHA256":"04380a4b6b03578e5b162be76e3191e377f422bd47bf10996345b089a0f061df","approvedRows":17},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u6fe9-hkcs-whole-2026-10-25/native-whole-m-review.json","SHA256":"da361c10470a46996a57c79b7e519564c88de444bcc3b1bad7562b69796a7a9b","selectedRepresentative":"hkcs_m6fe9","freshWholeRuns":0},"groupingBasis":"ROOT 원문 나머지16획의 새48시점과 원문3의 기존3시점이 방향·순서를 확인했다. ROOT 정적17쌍이 원raw21의 채움 대응을 확인했다. 草 H/V 순서만 원문에 맞춰 raw9/10을 교환하고, 水3 raw3~6 및 又16 raw19+20을 원P 그대로 묶는다. 이 투영은 원래 Q·인수·P·가이드 및 raw 내부 호출 순서를 보존하며 실제 표시 정책을 승인하지 않는다.","retainedConcerns":["水3 네 원raw의 가이드 방향·차례는 원문 H→V→UR와 그대로 같지 않다. 별도 source-bound foot/body/rising 표시 조건을 증명해야 한다.","독립 曲線의 초기 조각·원P 머리와 又16 H→DL 전환의 실제 접촉은 새 원P로 판정해야 한다.","다른 글자와 leaf가 같더라도 원P·폭·좌표·주변 조건이 다르면 기존 보정을 이전하지 않는다."],"directOriginalDirectionFrames":51,"oldCumulativeUsedAsDirectionApproval":false,"freshOriginalDirectionFrames":48,"reusedOriginalDirectionFrames":3,"all17OriginalDirectionsDirectlyObserved":true,"sourcePrimitiveGuideDirectionsApproved":false})
