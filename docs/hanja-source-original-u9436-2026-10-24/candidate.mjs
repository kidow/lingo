// Exact original 鐶 full5; official-order21 hypothesis pending per-pen static mapping. Original24raw/24calls/44P are preserved.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20,21],[22],[23]])
const CURVES = {"0:0":[53.15,15,39.95,58,12.725,92,0,7],"1:0":[52.325,27,72.95,38,81.2,54,7,8],"5:0":[20.15,120,33.35,134,35,154,7,8],"6:0":[77.075,119,71.3,135,62.225,151,0,7],"7:0":[16.85,177,50.675,169,83.675,157,0,7],"19:0":[139.39,117,111.175,146,77.735,162,0,7],"21:0":[94.455,181,118.49,172,146.705,158,0,7],"22:0":[183.28,129,168.65,140,151.93,148,0,7],"23:0":[138.345,119,147.75,158,181.19,177,7,0]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u9436","sourceProofFile":"../hanja-goal-glyphwiki-batch1023-2026-10-13/engine-proof.json","sourceProofFileSha256":"0092d199029b6b8a54336de1a02bacccdea6197f55c425fd3fe0d1954381e603","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch1023-2026-10-13/sources.json","sourceCapsuleFileSha256":"61fd44c9c114c7227a361fd88202cb4bd4f6425d51feae2effefb9b5cced28b1","sourceChecksFile":"../hanja-goal-glyphwiki-batch1023-2026-10-13/metadata.json","sourceChecksFileSha256":"95a206c04e8aefa8dd116f363167ee43b9fc6d64281adfe411e5f6bdd39cef8d"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch1023-2026-10-13/engine-proof.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"official-order-supported-static-mapping-pending","groups":[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15],[16,17],[18],[19],[20,21],[22],[23]],"sourceRawEachOnce":true,"originalRows":24,"originalCalls":24,"originalP":44,"expectedPens":21,"joinsOneBased":[[10,11],[17,18],[21,22]],"nonconsecutiveJoins":[],"originalGap19":{"fromRaw":21,"toRaw":22,"priorEndpoint":[110.13,170],"nextStart":[94.455,181],"delta":[-15.675,11],"unchanged":true},"sourceGeometryChanged":false,"sourceGuideReversed":false,"oldConsecutiveMinimum22HoldPreserved":true,"officialLogical19Observed":"vertical down then rising right in one official stroke","staticMappingApproved":false,"nativeApproval":false,"runtimeApplied":false})
