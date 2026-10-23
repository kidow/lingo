// Existing original-P compiler retained; four original 耭 compound gaps remain independent masks. No connector or guide edit.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[4],[5],[0],[2],[1],[3],[6,7],[8,9],[10],[11,12],[13,14],[15],[16],[17],[18],[19],[20],[21]])
const CURVES = {"1:0":[42.75,100,37.05,146,12.35,176,132,7],"3:0":[49.4,114,65.55,125,73.15,143,7,8],"4:0":[75.05,32,51.3,43,13.3,46,0,7],"6:0":[108,19,101,35,89,53,0,7],"7:0":[77,42,89,52,95,63,7,1],"8:0":[116,43,104,73,89,97,0,7],"9:0":[79,101,98,96,118,90,0,7],"10:0":[109,74,120,87,121,101,7,1],"11:0":[168,19,160,35,148,53,0,7],"12:0":[138,42,150,52,155,62,7,1],"13:0":[178,42,164,70,149,91,0,7],"14:0":[142,97,157,93,177,87,0,7],"15:0":[168,71,179,84,181,98,7,1],"17:0":[105,122,105,160,74,189,0,7],"18:0":[104,138,120,147,129,162,7,8],"20:0":[172,128,151,170,109,189,0,7],"21:0":[152,96,159,103,163,112,7,8]}
const BEZIERS = {"19:0":[130,19,129,132,154,179,181,180,0,15]}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,22)
  const gaps=[{"pen":7,"indices":[6,7],"end":[89,53],"start":[77,42]},{"pen":8,"indices":[8,9],"end":[89,97],"start":[79,101]},{"pen":10,"indices":[11,12],"end":[148,53],"start":[138,42]},{"pen":11,"indices":[13,14],"end":[149,91],"start":[142,97]}]
  for(const g of gaps){assert.deepEqual(trace[g.indices[0]].at(-1).args.slice(4,6),g.end);assert.deepEqual(trace[g.indices[1]][0].args.slice(0,2),g.start)}
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u802d-k","sourceProofFile":"./engine-proof.json","sourceProofFileSha256":"38eb6160a190212ed3906b85f3c5e57db143f5caa5d639525a19540be9c2e49f","sourceCapsuleFile":"./sources.json","sourceCapsuleFileSha256":"bd4f7b3d00e416616fcb053f5af8f44bb3ea5b939c88b0fec59742e1648a56ef","sourceChecksFile":"../hanja-goal-glyphwiki-batch352-2026-10-05/metadata.json","sourceChecksFileSha256":"7d7ebf2df0fc3b7bce364340521ec3b18b1b42733e6e51e7328934702182b064"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL('./engine-proof.json',import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false
