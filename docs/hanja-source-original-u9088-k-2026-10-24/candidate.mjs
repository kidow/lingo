// Exact original aggregate full5 邈-k. Preserve 21raw/24calls/47P and historical gap5 HOLD; fresh whole and direction review pending.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[6],[8],[7],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[0],[1],[2,3],[4,5]])
const CURVES = {"0:0":[27,23,40,32,47,47,7,8],"1:0":[19,61,33,68,42,82,7,8],"4:0":[18,179,34,166,46,153,0,7],"5:0":[46,148,47,186,182,177,7,0],"6:0":[101.25127499999999,16.75,81.055025,36,54.7999,46.5,0,7],"7:0":[79.439325,33.375,91.15315000000001,40.375,94.788475,55.25,7,8],"8:0":[66.513725,46.5,77.4197,55.25,79.439325,68.375,7,8],"9:0":[113.36902500000001,45.625,84.69035,81.5,53.99205,98.125,0,7],"10:0":[90.3453,65.75,115.38865000000001,110.375,100.63615345589282,150.8545040408957,7,0],"10:1":[100.63615345589282,150.8545040408957,97.21202500000001,160.25,87.21202500000001,160.25,2,14],"11:0":[99.63557499999999,87.625,83.07464999999998,110.375,57.22345,124.375,32,7],"12:0":[105.290525,114.75,87.51782499999999,138.375,53.99205,153.25,32,7],"13:0":[153.6445,15.875,147.9971,29,140.93785,41.25,0,7],"19:0":[142.34969999999998,92.875,136.70229999999998,154.125,104.935675,166.375,0,7],"20:1":[156.4682,145.875,156.4682,155.875,166.4682,155.875,1,1]}
const BEZIERS = {}
const DIAGONALS = {}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u9088-k","sourceProofFile":"../hanja-goal-glyphwiki-batch356-2026-10-05/whole-engine-inventory.json","sourceProofFileSha256":"aeb40303dee9ef8b75e50fb903c22f7ef736be150816ce3fb86805d2ab637c35","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch356-2026-10-05/whole-source-inventory.json","sourceCapsuleFileSha256":"817557d77001bc120d574c37f19604bd825d313105c832b932f0792d1e8dfb80","sourceChecksFile":"../hanja-goal-glyphwiki-batch356-2026-10-05/validation.json","sourceChecksFileSha256":"896ea4cc26e9987ebeb4dd2e00576667c3e65009b42e14d497ce96ee038714d9"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch356-2026-10-05/whole-engine-inventory.json",import.meta.url)))["u9088-k"])
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"original18-draft-pending-fresh-whole-and-all-official-directions","groups":[[6],[8],[7],[9],[10],[11],[12],[13],[14],[15,16],[17],[18],[19],[20],[0],[1],[2,3],[4,5]],"sourceRawEachOnce":true,"originalRows":21,"originalCalls":24,"originalP":47,"expectedPens":18,"expectedMasks":24,"sourceGeometryChanged":false,"sourceGuideReversed":false,"historicalReview":{"path":"docs/hanja-goal-glyphwiki-batch356-2026-10-05/deferred-review.json","SHA256":"fe4397ad6eebac761ad5d3f637fcc3925a742a46c001f9cecf81d19049d7f8de","nativeCommit":"40e8d8d36c4802cb37d016cf39054a01902c1404"},"historicalWholeVariantsInspected":5,"historicalDomesticStaticReviewed":18,"historicalFullFormOrderPassed":false,"historicalGap5HoldPreserved":true,"originalQQGap":{"rawZeroBased":[4,5],"end":[46,153],"start":[46,148],"sourceUnits":5},"newWholeMacroApproved":false,"newDirectionsReviewed":0,"newStaticMappingApproved":false,"newInitialContactApproved":false,"sourceConnectorAdded":false,"nativeApproval":false,"runtimeApplied":false})
