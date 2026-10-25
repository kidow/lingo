// DRAFT 灝 HKCS original30 ->24 logical groups; original CSS and static evidence bound, reveal policies unapproved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3,4,5],[6],[7,8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23,24],[25],[26],[27],[28],[29]])
const CURVES={"0:0":[22.205,19,33.894999999999996,28,40.575,44,7,8],"1:0":[13.855,62,25.545,70,30.555,86,7,8],"2:0":[33.06,141,29.72,136,13.02,132,0,7],"3:0":[27.215,177,31.39,150,28.885,135,7,8],"4:0":[38.07,104,29.72,146,31.39,184,7,8],"5:0":[31.39,136,37.235,117,51.43,44,12,7],"17:1":[85.58494999999999,171,85.58494999999999,181,78.08494999999999,181,2001,14],"18:0":[70.21465,143,63.9268,162,51.3511,178,0,7],"19:0":[96.0647,140,107.2431,151,112.8323,168,7,8],"21:0":[155.39499999999998,30,152.726,43,146.05349999999999,58,132,7],"28:0":[144.719,157,134.043,174,112.02375,186,0,7],"29:0":[156.72949999999997,154,174.078,164,184.754,182,7,8]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,30)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m705d","sourceProofFile":"../hanja-actual-engine-capture-u705d-hkcs-m-2026-10-26/engine-whole-hkcs_m705d.json","sourceProofFileSha256":"dc3df9f8e327a0b221fc7e71db05301905f15cc6ad919d98a5ed2da04e72a74b","sourceCapsuleFile":"../hanja-source-alternative-u705d-hkcs-m-2026-10-25/sources.json","sourceCapsuleFileSha256":"054dad6c016983f9e4855b11885891f8ba4543ef13547ace82d3b32810154e9f","sourceChecksFile":"../hanja-actual-engine-capture-u705d-hkcs-m-2026-10-26/capture.json","sourceChecksFileSha256":"89ac91bf83486cf9f2f143a3d3eda4fcea6f90e8f73806ac23bc5728f6611eee"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u705d-hkcs-m-2026-10-26/engine-whole-hkcs_m705d.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original30-static-approved-for24-logical-review","catalogStrokes":24,"proposedPlaybackStrokes":24,"groups":[[0],[1],[2,3,4,5],[6],[7,8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20],[21],[22],[23,24],[25],[26],[27],[28],[29]],"originalRows":30,"originalCalls":31,"originalP":51,"expectedPens":24,"expectedMasks":31,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":false,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u705d-2026-10-26/temporal-native-review.json","SHA256":"32c7f77e0c36e0363ee2ecad760cff58d8ff36eefec7ceada819def1a839a447","freshOriginalFrames":72,"reusedOriginalFrames":0},"staticReview":{"path":"docs/hanja-source-raw-compare-u705d-hkcs-whole-2026-10-26/native-group-review.json","SHA256":"1d0dcf2ffc3d1fafaec89fe6d5f99643c126d072dfb47f94ca9199a057dad84a","approvedRows":24},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u705d-hkcs-whole-2026-10-26/native-whole-m-review.json","SHA256":"6a554223e461d9ff5834371138e4b427506e1fbe863e43992d2075cd4d663747","selectedRepresentative":"hkcs_m705d","freshWholeRuns":0},"groupingBasis":"ROOT 정적24쌍이 원본30행의 채움 대응을 확인했고 새 원문24×3 CSS 시점이 원문 순서·방향만 확인했다. 원raw와 내부31호출 순서를 보존하여 水3의 raw3~6, 꺾임5/11/19의 두 직선, 세로갈고리13의 원래 두 호출을 각각 같은 논리획 안에 둔다. 새 보정·시간정책·모든 raw 가이드 방향 승인은 별도다.","retainedConcerns":["원문3은 왼발 주변에서 위오른쪽으로 길게 성장하며 아래 벌브는 완료에서 전부 붉다. 이72시점은 발/몸통/상승의 하위3phase 순서를 확정하지 않았고 다른 글자의 물수변 정책을 전이하지 않는다.","원raw18의 V선+곡선 갈고리는 전환·초기 분리 여부를 새 원P와 완료 priorV로 검증해야 한다.","독립7곡선의 초기 조각·전체Q 포함·원P 머리 조건과 합획경계 접촉은 아직 미검토다."],"directOriginalDirectionFrames":72,"oldCumulativeUsedAsDirectionApproval":false,"freshOriginalDirectionFrames":72,"reusedOriginalDirectionFrames":0,"all24OriginalDirectionsDirectlyObserved":true,"water3SubphaseDirectionsApproved":false,"sourcePrimitiveGuideDirectionsApproved":false})
