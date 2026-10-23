// Exact original 闥 whole; domestic mapping remains provisional; preserve every original P and guide, including old HOLD gaps.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1,2],[3],[4],[5],[6,7],[8],[9],[16],[17],[18],[19],[20],[21],[23],[24],[22],[10],[11],[12,13],[14,15]])
const CURVES = {"7:1":[171,171,171,181,161,181,1,14],"10:0":[49.495000000000005,75.39,62.510000000000005,80.7,70.72999999999999,90.14,7,8],"11:0":[41.96,96.63,54.975,101.35,64.565,110.78999999999999,7,8],"14:0":[41.96,168.61,54.975,162.12,68.675,153.86,0,7],"19:0":[92.6226,98.577,101.62349999999999,105.47999999999999,104.62379999999999,115.56899999999999,7,8],"20:0":[137.62709999999998,100.701,131.6265,109.72800000000001,125.62589999999999,117.69300000000001,0,7]}
const BEZIERS = {"15:0":[67.305,152.68,77.58,164.48000000000002,88.53999999999999,169.79000000000002,153.615,167.43,7,0]}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u95e5","sourceProofFile":"../hanja-goal-glyphwiki-batch502-2026-10-10/engine-whole-u95e5.json","sourceProofFileSha256":"5938703e815f431ed2eba11c34b17fcaae2784ef16759dda94862c1f2ab26711","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch502-2026-10-10/sources.json","sourceCapsuleFileSha256":"be6c3f49cd5fadee150183acd989794441b0296c074e514d675e99a0b4a2898a","sourceChecksFile":"../hanja-goal-glyphwiki-batch502-2026-10-10/metadata.json","sourceChecksFileSha256":"492208084688e7b44bb1e0b21138bc75d22c0dde4e2990299c3e343f47d04361"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch502-2026-10-10/engine-whole-u95e5.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
