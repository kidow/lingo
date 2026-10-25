// DRAFT 塚 catalog13/dictionary12 actual-full5 source only; no runtime approval.
import assert from 'node:assert/strict'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
export const sourceGroups=deepFreeze([[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12]])
const CURVES={"2:0":[15.525,157,39.74,148,76.48,129,0,7],"3:0":[83,20,86,41,76,54,7,8],"5:0":[176,29,170,43,162,55,22,7],"7:0":[129,64,112,91,72,112,132,7],"8:0":[110,85,149,131,126.75148914734883,172.2009460234281,7,0],"8:1":[126.75148914734883,172.2009460234281,122,181,112,181,2,14],"9:0":[124,106,101,130,66,147,32,7],"10:0":[133,135,108,159,61,175,32,7],"11:0":[172,86,160,100,148,112,0,7],"12:0":[135,64,144,140,182,168,7,0]}
const BEZIERS={}
const DIAGONALS={}
function compileOriginal(trace, proof) {
  assert.equal(trace.length,13)
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
export const selectedProofIdentity=deepFreeze({"sourceRoot":"u585a","sourceProofFile":"../hanja-source-raw-compare-u585a-2026-10-23/engine-whole-u585a.json","sourceProofFileSha256":"fdf45aacddbdad306a866d02be19cb7fa5148bcab857a503db368ed3224f0c2f","sourceCapsuleFile":"../hanja-goal-glyphwiki-batch927-2026-10-13/sources.json","sourceCapsuleFileSha256":"02c5a30ad8979ed453d1a28005ad257c29ad7003c88c07c19501ad706462f612","sourceChecksFile":"../hanja-source-raw-compare-u585a-base-groups-2026-10-25/native-group-review.json","sourceChecksFileSha256":"2d02251ceda5831a2d2d2a2695d176a6a3173d4ca7e46f87e86ae79a91de0d3a"})
const pinned=deepFreeze(JSON.parse(readFileSync(new URL("../hanja-source-raw-compare-u585a-2026-10-23/engine-whole-u585a.json",import.meta.url))))
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3)
 assert(sameJSON(identity,selectedProofIdentity),'Exact seven-field source identity required')
 assert(sameJSON(proof,pinned)&&sameJSON(trace,pinned.trace),'Exact original full5 and trace required')
 for(const[f,p]of[[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceCapsuleFile,identity.sourceCapsuleFileSha256],[identity.sourceChecksFile,identity.sourceChecksFileSha256]])assert.equal(createHash('sha256').update(readFileSync(new URL(f,import.meta.url))).digest('hex'),p)
 return compileOriginal(trace,proof)
}
export const nativeApproved=false
export const runtimeApplied=false

export const sourceProposal=deepFreeze({"status":"DRAFT-catalog13-dictionary12-original-base-source-only","catalogStrokes":13,"proposedPlaybackStrokes":12,"groups":[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12]],"originalRows":13,"originalCalls":14,"originalP":26,"expectedPens":12,"expectedMasks":14,"sourceRawEachOnce":true,"sourceGeometryChanged":false,"sourceGuideReversed":false,"sourceArgsChanged":false,"sourceRowsDeleted":false,"sourcePAndCallOrderWithinRawUnchanged":true,"sourceTimingEquivalent":false,"countConflictResolved":false,"examBodyApproval":false,"individualVariantApproved":false,"sourceStaticMappingApproved":true,"sourceCurvePathsApproved":false,"initialContactApproved":false,"allFramesApproved":false,"productionImportAllowed":false,"nativeApproval":false,"runtimeApplied":false,"dictionaryReview":{"path":"docs/hanja-official-media-compare-u585a-2026-10-23/native-review.json","SHA256":"854593026200a534e36851ee085a868e448de54b18cd8d7a8ae6105edbbcbf55","scope":"Existing36 original direction observations; original stroke11 prose is corrected by the separate supplement"},"dictionary11Correction":{"path":"docs/hanja-official-media-compare-u585a-2026-10-25/native-stroke11-review.json","SHA256":"dd9455d83ec2fb1752de271104f3ef632de1522470541a4c4ed86c45d367cff0","direction":"short down-left; former H attribution was wrong"},"staticReview":{"path":"docs/hanja-source-raw-compare-u585a-base-groups-2026-10-25/native-group-review.json","SHA256":"2d02251ceda5831a2d2d2a2695d176a6a3173d4ca7e46f87e86ae79a91de0d3a"},"historicalWholeReuse":{"path":"docs/hanja-source-raw-compare-u585a-2026-10-23/native-review.json","SHA256":"119df5c5cad54bdad21da57b51332e678a630c84bdcf946f9dfa106e628d4feb","scope":"Existing base whole1 compatible only; not a source-Q or timing approval"},"groupingBasis":"Static12 correspondence plus original-media12 macro directions, with logical5 holding original raw5 H then raw6 DL and logical8 retaining both original raw9 curve calls. All thirteen raw rows assigned once; no P/args/within-row call permutation.","retainedConcerns":["catalog13/dictionary12 remains a variant; catalog is not corrected","Initial visibility, prior contact, Q7 completion and actual component frames are not yet approved","Historical source float reproduction HOLD remains preserved; original stored full5 is consumed without an engine replay"]})
