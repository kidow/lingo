// Exact original 纚 full5. Provisional 25-pen grouping preserves all 31raw/34calls/68P and original QQ gaps. Historical whole correspondence only; no new grouping or runtime approval.
import assert from 'node:assert/strict'
export { renderProgressive } from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups = deepFreeze([[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21,22],[23],[24],[25],[26],[27,28],[29],[30]])
const CURVES = {"0:0":[46.2,16,36.4,37,24.5,56,0,7],"1:0":[9.8,45,26.6,56,33.6,76,7,8],"2:0":[66.5,39,46.9,76,23.8,110,0,7],"3:0":[11.2,113,40.6,109,66.5,101,0,7],"4:0":[51.8,78,65.1,91,70.7,114,7,8],"6:0":[26.6,127,23.8,155,9.8,180,0,7],"7:0":[52.5,122,65.1,136,70,161,7,8],"20:1":[86.4,129.645,86.4,164.82,72.75,189.945,1,7],"28:0":[88.35,181.905,106.55,177.885,137.1,168.84,0,7],"29:0":[173.5,140.7,161.8,149.745,145.55,155.775,0,7],"30:1":[142.3,169.895,142.3,179.895,152.3,179.895,1,1]}
const BEZIERS = {}
const DIAGONALS = {}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,31)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u7e9a","sourceProofFile":"../hanja-goal-glyphwiki-batch551-2026-10-11/engine-whole-u7e9a.json","sourceProofFileSha256":"3c498660b43880fd42727bc88b3415aab486d5e48ef910dc18a3f47cbf4c2c6e","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch551-2026-10-11/sources.json","sourceCapsuleFileSha256":"2435de2814eee19e90e264cddfba064d54e36c81df580eb526adc6ff9fd40dc7","sourceChecksFile":"../hanja-goal-glyphwiki-batch551-2026-10-11/validation.json","sourceChecksFileSha256":"8fce093c845263d632c8f3cc569ef1bed5eed40d90f5bcfac6d52de8975926d4"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-goal-glyphwiki-batch551-2026-10-11/engine-whole-u7e9a.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"provisional-original25-recipe-official25-directions-and-static-groups-unreviewed","groups":[[0,1],[2,3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15,16],[17],[18],[19],[20],[21,22],[23],[24],[25],[26],[27,28],[29],[30]],"sourceRawEachOnce":true,"originalRows":31,"originalCalls":34,"originalP":68,"expectedPens":25,"expectedMasks":34,"sourceGeometryChanged":false,"sourceGuideReversed":false,"originalQQGapsPreserved":[{"rawOneBased":[1,2],"delta":[-14.7,-11]},{"rawOneBased":[3,4],"originalEnd":[23.8,110],"originalStart":[11.2,113]},{"rawOneBased":[28,29],"originalEnd":[104.6,176.88],"originalStart":[88.35,181.905]}],"provisionalPairsOneBased":[[1,2],[3,4],[11,12],[16,17],[22,23],[28,29]],"historicalReview":{"path":"docs/hanja-goal-glyphwiki-batch551-2026-10-11/progressive-review.json","SHA256":"a3b16715e651b6feeb0fb00dd4ef3c3fd0e5603f5ca5778149ce9219fe1b46f2"},"historicalWholeNativeCompatible":true,"historicalSelectedRoot":"u7e9a","historical9FramesApproved":0,"historical28Versus25HoldPreserved":true,"oldOther24DirectionsUnreviewed":true,"newOfficialConfig":{"path":"docs/hanja-official-media-compare-u7e9a-2026-10-24/config.json","SHA256":"b3954e1f0904de3389c4e4b03331b0fe4cefbaa6cc67120b542d4b49a3381576"},"newDirectionsReviewed":0,"newSourceStaticMappingApproved":false,"newInitialContactApproved":false,"sourceConnectorAdded":false,"newCapsReuseApproved":false,"nativeApproval":false,"runtimeApplied":false})
