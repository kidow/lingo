// DRAFT 坧 HKCS original9 -> eight logical pens; static mapping approved, actual playback unapproved.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4],[5],[6,7],[8]])
const CURVES={"2:0":[15.35,157,41.16,148,78.54,129,0,7],"4:0":[120,34,104,110,68,150,132,7]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,9)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"hkcs_m5767","sourceProofFile":"../hanja-actual-engine-capture-u5767-hkcs-2026-10-25/engine-whole-hkcs_m5767.json","sourceProofFileSha256":"e2e69e4c25fd10809d6e159ee4a5c51dc60aec61c8fab27d3aaa6917116c476d","sourceCapsuleFile":"../hanja-source-alternative-u5767-hkcs-2026-10-25/sources.json","sourceCapsuleFileSha256":"54244853a4770e157f2d8c7d35bb96b6a3473da1e7af781bd0279e46a7555d18","sourceChecksFile":"../hanja-actual-engine-capture-u5767-hkcs-2026-10-25/capture.json","sourceChecksFileSha256":"e1bc64d331b52e52e323cd2fa737b34e024c5851d60458ff2c703bfa97ab39e5"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u5767-hkcs-2026-10-25/engine-whole-hkcs_m5767.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-original9-static-approved-for-eight-logical-review","catalogStrokes":8,"proposedPlaybackStrokes":8,"groups":[[0],[1],[2],[3],[4],[5],[6,7],[8]],"originalRows":9,"originalCalls":9,"originalP":15,"expectedPens":8,"expectedMasks":9,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceRawOrderChangedForProposedPlayback":false,"sourceStaticMappingApproved":true,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u5767-2026-10-25/native-original-review.json","SHA256":"be9123bb1242f2bc7e9a7c4806284f66470cc396cb23d4503a681d2eafecd5ca","freshOriginalFrames":24},"staticReview":{"path":"docs/hanja-source-raw-compare-u5767-hkcs-whole-2026-10-25/native-group-review.json","SHA256":"b86264e0851e4959eeecf88277619ecfda7567e4cb4981b2c2ff542c0ce6473d","approvedRows":8},"wholeReviewReuse":{"path":"docs/hanja-source-raw-compare-u5767-hkcs-whole-2026-10-25/native-whole-review.json","SHA256":"1b0f186731734f15e830d8aca85eb81db796682f53385a18230acc9d1e509558","selectedRepresentative":"hkcs_m5767","freshWholeRuns":0},"groupingBasis":"ROOT 원문24가 土 H/V/상승획, 石 H/DL, 口 왼V/윗H→오른V/아래H 순서와 방향을 확인했다. ROOT 정적8쌍이 원본1/2/3/4/5/6/(7+8)/9의 채움 자형 대응을 확인했다. raw7과8의 원래 H/V·P·순서를 그대로 한 논리7에 묶고, 새 선·좌표·가이드·역전은 만들지 않는다.","retainedConcerns":["논리3과5의 독립 Q 시작 부분은 source-bound 초기 표시 검사가 필요하다.","논리7의 원본 H→원본 V 전환은 실제 완료 H의 접촉과 표시 경계 검사가 필요하다.","원P 장식의 완료 잔여·모든 시점·원문 microtiming 동등성은 정적 대응으로 승인하지 않는다."],"directOriginalDirectionFrames":24,"all8OriginalDirectionsDirectlyObserved":true,"oldCumulativeUsedAsDirectionApproval":false})
