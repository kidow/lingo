// Exact selected 灌 VS2 full5; direct official21 order draft only. Original guide gap and source P remain unchanged.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2,3],[4],[5],[7],[6],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18],[20],[21],[22],[19],[23]])
const CURVES = {"0:0":[27.025,20,46.4,27,54.925,41,7,8],"1:0":[12.3,66,33.225,73,40.975,87,7,8],"2:0":[13.85,133,40.975,142,37.875,184,7,8],"3:0":[34,150,37.1,138,69.65,67,32,7],"16:0":[100.8,96.38303400000001,90.6,120.10323599999998,69.52,142.94491200000002,0,7],"18:0":[139.56,99.01861199999999,132.76,109.56092400000001,126.64,117.46765800000001,0,7]}
const BEZIERS = {}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,24)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u704c-ue0102","sourceProofFile":"../hanja-actual-engine-capture-u704c-ue0102-2026-10-24/engine-whole-u704c-ue0102.json","sourceProofFileSha256":"ff2660d31e4bd92c37dd8fc15811eea2ee743f8ca4a5a8f082be55c9c22f45ba","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1069-2026-10-13/sources.json","sourceCapsuleFileSha256":"b941fd984114a84515f9c96746a98587ad9d0ffac9f534b906da0f677e49e628","sourceChecksFile":"../hanja-actual-engine-capture-u704c-ue0102-2026-10-24/capture.json","sourceChecksFileSha256":"bd31f207a9d77b6c05b0098ece6bdab27d7d5d8955905a3bffb8433ea925e1ce"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-actual-engine-capture-u704c-ue0102-2026-10-24/engine-whole-u704c-ue0102.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"original21-logical-draft-from-direct-official-directions-static-mapping-pending","groups":[[0],[1],[2,3],[4],[5],[7],[6],[8],[9,10],[11],[12],[13,14],[15],[16],[17],[18],[20],[21],[22],[19],[23]],"sourceRawEachOnce":true,"originalRows":24,"originalCalls":24,"originalP":41,"expectedPens":21,"expectedMasks":24,"sourceGeometryChanged":false,"sourceGuideReversed":false,"reorderedRawZeroBased":[{"officialPens":[6,7],"originalRows":[7,6],"reason":"ROOT direct official6H then7V"},{"officialPens":[17,18,19,20],"originalRows":[20,21,22,19],"reason":"ROOT direct official17..19H then20V"}],"waterCompound":{"pen":3,"rawZeroBased":[2,3],"originalGuideGap":34.22010556675709,"originalGuideContinuityClaimed":false,"originalFilledPPositiveOverlapCached":true,"newSourcePClockProved":false},"exactJoinsZeroBased":[[9,10],[13,14]],"historicalHOLD":{"path":"docs/hanja-source-original-u704c-ue0102-2026-10-24/hold.json","SHA256":"d5ce6e8e3b51788231de73dd0e8fc560204e332ad76b4b63ede6b7f4d905e21c"},"officialEvidence":{"path":"docs/hanja-official-media-compare-u704c-2026-10-24/official-temporal-native-review.json","SHA256":"f5ef0cfcbf949e1f189c8a32bb5630302d2135da5d1a27b2d5f1726cd9b16e01"},"wholeEvidence":{"path":"docs/hanja-source-raw-compare-u704c-ue0102-2026-10-24/native-whole-review.json","SHA256":"e6dfdf06afc827321fbea8f59c8fa69f69687efdf39efde4229fe78dfb754406"},"allOfficialDirectionsObserved":true,"newStaticMappingApproved":false,"newInitialContactApproved":false,"nativeApproval":false,"runtimeApplied":false,"base23RecipeTransposed":false})
