// Draft16 source-preserving projection only. Existing actual full5; original ninth V/H gap retained.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18]])
const CURVES={"0:0":[58.72,17.2,52,23.8,43.36,29.8,0,7],"6:0":[90.4,80.2,64.47999999999999,86.8,32.8,91,0,7],"7:1":[32.8,100.8,32.8,110.8,42.8,110.8,1,3001],"11:1":[149.92,47.2,140.32,98.2,84.64,120.4,1,7],"12:1":[144.16,103.2,144.16,113.2,154.16,113.2,1,3001]}
const BEZIERS={}
const DIAGONALS={"11:0":[153.76,26.8,149.92,47.2,32,1]}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,19)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u66c1-ue0102","sourceProofFile":"../hanja-goal-glyphwiki-batch483-2026-10-10/engine-whole-u66c1-ue0102.json","sourceProofFileSha256":"922fb9aec974db3e0a06eaf886940b1019e7d19737556ef0c9e7b957d5c87f58","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch483-2026-10-10/sources.json","sourceCapsuleFileSha256":"23a4684f120dac878cf563e9dd5dec80bbe5f0f10f932baaadadfc2a40850592","sourceChecksFile":"../hanja-goal-glyphwiki-batch483-2026-10-10/validation.json","sourceChecksFileSha256":"68aa2c2422f30db308b28fbcbc0633357079ac534147a7ba92a0fc27b18b1110"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch483-2026-10-10/engine-whole-u66c1-ue0102.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
export const sourceProposal=deepFreeze({"status":"draft16-original-order-awaiting-full-official-directions-and-static16","groups":[[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14,15],[16],[17],[18]],"sourceRawEachOnce":true,"originalRows":19,"originalCalls":24,"originalP":43,"expectedPens":16,"expectedMasks":24,"sourceGeometryChanged":false,"sourceGuideReversed":false,"priorSourceHoldPreserved":true,"sourceStaticCorrespondence":{"required":true,"all16DirectBrowserApproved":false},"officialEvidence":{"path":"docs/hanja-official-media-compare-u66c1-2026-10-24/metadata.json","SHA256":"b96bae37ce6d57f452bf473a5439e239de723ff3f8f944abc55c90ae7898f803","preparedOnly":true,"observedTemporalScreens":0},"wholeEvidence":{"path":"docs/hanja-source-raw-compare-u66c1-ue0102-2026-10-24/native-whole-review.json","SHA256":"8d54000c2b20b91a69bf0ca57e277e4f0c51ff7bc59d910697b938e791c2305f","freshScreens":2,"displayPixels":520,"macroOnly":true},"originalNinthGuideGap":{"rawZeroBased":[9,10],"originalEnd":[114.4,65.2],"originalStart":[94.24,65.2],"sourceUnits":20.16},"sourceContactApproved":false,"initialContactApproved":false,"nativeApproval":false,"runtimeApplied":false})
