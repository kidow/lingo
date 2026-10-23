// Exact original 灉 whole; preserve every original P and guide, including old HOLD gaps.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0],[1],[2,3],[4,5],[6,7],[8,9],[10],[11,12],[13],[14,15],[18],[16],[17],[19],[20],[21],[22],[24],[25],[23],[26]])
const CURVES = {"0:0":[22.995,20,39.12,27,46.215,41,7,8],"1:0":[10.74,66,28.155,73,34.605000000000004,87,7,8],"2:0":[12.03,133,34.605000000000004,142,32.025,184,7,8],"3:0":[28.8,150,31.38,138,58.47,67,32,7],"4:0":[71.65987200000001,17.28,66.51781199999999,28.8,56.9193,40.64,0,7],"5:0":[56.9193,40.64,68.574636,49.28,73.373892,65.28,7,8],"6:0":[88.800072,17.28,83.31520800000001,28.8,73.031088,40.64,0,7],"7:0":[73.031088,40.64,85.71483599999999,49.28,90.171288,65.28,7,8],"8:0":[105.597468,17.28,100.455408,28.8,89.828484,40.64,0,7],"9:0":[89.828484,40.64,102.51223200000001,49.28,106.283076,65.28,7,8],"17:1":[58.330584,167.92,58.330584,177.92,68.330584,177.92,1,1],"19:0":[138.7566,17,127.78560000000002,59,109.5006,87,0,7],"21:0":[167.2812,20,161.43,36,151.92180000000002,58,0,7]}
const BEZIERS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,27)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7049","sourceProofFile":"../hanja-goal-glyphwiki-batch745-2026-10-12/engine-proof.json","sourceProofFileSha256":"39a8f010eeae63eac2530ed90c3b26267c9df5ea811b38ccd85b5e8cffa15228","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch745-2026-10-12/sources.json","sourceCapsuleFileSha256":"39085767f758659bdf11a86d370af89bbeb97f5a5c112e2659fbf404484b6838","sourceChecksFile":"../hanja-goal-glyphwiki-batch745-2026-10-12/metadata.json","sourceChecksFileSha256":"ee93051e895c8c0b597b4c5114df78c002820ba3bbe8852cb3684545931ae095"})
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
