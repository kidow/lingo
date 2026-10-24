import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync}from'node:fs'
import {createHash}from'node:crypto'
import {makeReviewedU9f08CompoundSourceContext as context,reviewedU9f08CompoundContext as cached,reviewedU9f08CompoundPolicy as policy,commitReviewedU9f08CompoundCaps as commit,measureReviewedU9f08CompoundFrame as measure,REVIEWED_U9F08_COMPOUND_SOURCE as SOURCE,REVIEWED_U9F08_COMPOUND_PROOFS as PROOFS} from './hanja-stroke-compound-caps-u9f08.ts'
const file=(p:string)=>readFileSync(new URL('../'+p,import.meta.url)),json=(p:string)=>JSON.parse(file(p).toString()),sha=(b:Buffer|string)=>createHash('sha256').update(b).digest('hex')
test('鼈 short Q2 strictly binds new quarter guides and completed previous V',()=>{
 const f=json(SOURCE.sourceCacheFile).u9f08
 assert.equal(sha(file(SOURCE.sourceCacheFile)),SOURCE.sourceCacheSHA256)
 assert.equal(sha(file(SOURCE.proofFile)),SOURCE.proofSHA256)
 assert.equal(sha(file(SOURCE.sourceContextModule)),SOURCE.sourceContextModuleSHA256)
 assert.equal(sha(JSON.stringify(f.strokes)),SOURCE.geometrySHA256)
 const c=context(f.fullProof,f.identity,f.strokes);assert.ok(c);assert.equal(c,cached(f.strokes))
 assert.equal(policy({id:'u9f08-eight-initial-guides'},3,2),null)
 const nodes={measurement:null,guide:null,startCap:null,endCap:null,ink:null}
 for(const[pen,mask]of SOURCE.targets){
  const p=policy(c,pen-1,mask-1);assert.ok(p)
  assert.deepEqual(p.segment,f.strokes[pen-1][mask-1]);assert.deepEqual(p.previousSegment,f.strokes[pen-1][mask-2])
  assert.equal(p.certificate.initialArcMax,1);assert.equal(p.requiresCompletedExactPreviousMask,true)
  assert.equal(commit(p,p.segment,0,'bie-short',nodes,1).status,'empty')
  assert.equal(commit(p,p.segment,1,'bie-short',nodes,1).status,'complete')
  for(const prev of[0,.9999,NaN])assert.equal(commit(p,p.segment,1,'bie-short',nodes,prev).status,'hidden')
  assert.equal(commit({...p},p.segment,1,'bie-short',nodes,1).status,'hidden')
  assert.equal(commit(p,{...p.segment,revealWidth:15},1,'bie-short',nodes,1).status,'hidden')
  assert.throws(()=>measure(p,p.segment,.03,null,1))
  assert.throws(()=>measure(p,p.segment,.03,null,.9999))
 }
 assert.equal(policy(c,16,2),null);assert.equal(policy(c,0,0),null)
 const changed=structuredClone(f.strokes);changed[3][2].weight++;assert.equal(cached(changed),null)
 let reads=0;const bad=structuredClone(f.strokes);Object.defineProperty(bad[3][2],'outline',{enumerable:true,get(){reads++;return f.strokes[3][2].outline}});assert.equal(cached(bad),null);assert.equal(reads,0)
 for(const p of PROOFS){assert.equal(p.initialArcMax,1);assert.equal(p.arc1To7NativeRequired,true);assert.equal(p.fullPInUnionOfOriginalGuideEndpointRadius7Disks,true);assert.equal(p.growingPIntersectionAllProgressProved,false)}
 assert.equal(SOURCE.nativeApproval,false)
})

test('鼈 compound partial DOM uses one namespace and rejects mismatched previous-frame binding',()=>{
 const f=json(SOURCE.sourceCacheFile).u9f08,c=context(f.fullProof,f.identity,f.strokes);assert.ok(c)
 for(const[pen,maskNumber]of SOURCE.targets){
  const p=policy(c,pen-1,maskNumber-1);assert.ok(p)
  const document:any={}
  document.defaultView={document,getComputedStyle:()=>({transform:'none',getPropertyValue:()=> 'none'})}
  const owner:any={ownerDocument:document,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,parentElement:null,getAttribute:()=>null}
  const node=(name:string,parent:any,attributes:Record<string,string>={})=>{const attrs=new Map(Object.entries(attributes));return{localName:name,parentElement:parent,ownerDocument:document,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,getAttribute:(k:string)=>attrs.get(k)??null,setAttribute:(k:string,v:string)=>attrs.set(k,String(v)),removeAttribute:(k:string)=>attrs.delete(k)}}
  const clip='bie-compound-'+pen,g=node('g',owner,{'data-stroke-start-gate':p.id,'data-u9f08-compound-progress':'.03','data-u9f08-compound-clip':clip}),defs=node('defs',g),mask=node('mask',defs,{id:clip+'-u9f08-compound-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'})
  g.setAttribute('data-u9f08-compound-progress',String(.03))
  const common={'data-growing-owner':clip}
  const measureNode:any=node('path',defs,{...common,id:clip+'-u9f08-compound-measure','data-u9f08-compound-measurement':'true',d:p.segment.revealPath!})
  let reads=0;measureNode.getTotalLength=()=>{reads++;return 8.2};measureNode.getPointAtLength=()=>({x:pen===4?48:43.08,y:pen===4?35.2:84.6625})
  const guide=node('path',mask,{...common,id:clip+'-u9f08-compound-guide',d:p.segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'})
  const startCap=node('circle',mask,common),endCap=node('circle',mask,common),ink=node('path',g,{...common,d:p.segment.outline,mask:'url(#'+clip+'-u9f08-compound-growing)'})
  const nodes={measurement:measureNode,guide,startCap,endCap,ink} as any
  assert.equal(commit(p,p.segment,.03,clip,nodes,1).status,'visible')
  assert.equal(ink.getAttribute('visibility'),'visible');assert.equal(startCap.getAttribute('r'),String(.03*8.2));assert.equal(reads,1)
  assert.equal(commit(p,p.segment,.03,clip,nodes,.9999).status,'hidden');assert.equal(reads,1)
  measureNode.setAttribute('data-u9f08-compound-measurement','false')
  assert.equal(commit(p,p.segment,.03,clip,nodes,1).status,'hidden');assert.equal(reads,1)
 }
})
