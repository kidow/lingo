import assert from 'node:assert/strict'
import test from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {reviewedU7cbbFootContext,reviewedU7cbbFootPolicy,measureReviewedU7cbbFootFrame,REVIEWED_U7CBB_FOOT_SOURCE as SOURCE} from './hanja-stroke-source-foot-u7cbb.ts'
const sha=(s:string)=>createHash('sha256').update(s).digest('hex'),read=(p:string)=>readFileSync(new URL('../'+p,import.meta.url),'utf8')
const strokes=JSON.parse(read(SOURCE.sourceCacheFile)).u7cbb.strokes,context=reviewedU7cbbFootContext(strokes),policies=[reviewedU7cbbFootPolicy(context,11,1)]
const code=read('lib/hanja-stroke-source-foot-u7cbb.ts'),data=JSON.parse(code.match(/^const FEET=(.*)$/m)![1])[0],proof=JSON.parse(read('docs/hanja-u7cbb-foot-root-prefix-proof-2026-10-23/proof.json'))
function setup(index=0){
 const policy=policies[index]!,writes:string[]=[],doc:any={},view:any={document:doc,getComputedStyle:(n:any)=>({transform:n.css.transform??'none',getPropertyValue:(k:string)=>n.css[k]??''})};doc.defaultView=view
 const node=(name:string,parent:any,attrs:Record<string,string>={})=>({localName:name,parentElement:parent,ownerDocument:doc,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:null as any,attrs:{...attrs},css:{} as any,getAttribute(k:string){return Object.hasOwn(this.attrs,k)?this.attrs[k]:null},setAttribute(k:string,v:string){this.attrs[k]=String(v);writes.push(name+':'+k+':'+v);(this as any).onSet?.(k,String(v))},removeAttribute(k:string){delete this.attrs[k]},get id(){return this.attrs.id??''}})
 const b=policy.segment.bounds,svg=node('svg',null),g=node('g',svg,{'data-stroke-start-gate':policy.id,'data-stroke-reveal-progress':'0'}),defs=node('defs',g),mask=node('mask',defs,{id:'test-u7cbb-foot-foot-x-mask',maskUnits:'userSpaceOnUse'}),clip=node('clipPath',defs,{id:'test-u7cbb-foot-body-clip',clipPathUnits:'userSpaceOnUse'}),ink=node('path',g,{id:'test-u7cbb-foot-ink','data-owner':'test','data-u7cbb-foot-ink':'true',d:policy.segment.outline,mask:'url(#test-u7cbb-foot-foot-x-mask)'}),foot=node('path',mask,{id:'test-u7cbb-foot-foot','data-u7cbb-foot-foot':'true',fill:'white','fill-rule':'nonzero',stroke:'none'}),body=node('path',mask,{id:'test-u7cbb-foot-body','data-u7cbb-foot-body':'true',d:policy.segment.outline,fill:'white','fill-rule':'nonzero',stroke:'none','clip-path':'url(#test-u7cbb-foot-body-clip)'}),rect=node('rect',clip,{id:'test-u7cbb-foot-rect',x:String(b[0]),y:String(b[1]),height:String(b[3]-b[1]),width:'0'}),measurement:any=node('path',defs,{id:'test-u7cbb-foot-measure','data-u7cbb-foot-measurement':'true',d:policy.segment.revealPath!})
 for(const n of[g,defs,mask,clip,ink,foot,body,rect,measurement])n.ownerSVGElement=svg
 let lengths=0,points=0;const q=policy.segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);measurement.getTotalLength=()=>{lengths++;return 40};measurement.getPointAtLength=(d:number)=>{points++;const t=d/40;return{x:(1-t)**2*q[0]+2*t*(1-t)*q[2]+t*t*q[4],y:(1-t)**2*q[1]+2*t*(1-t)*q[3]+t*t*q[5]}}
 return{policy,nodes:{ink,foot,body,rect,measurement},svg,g,defs,mask,clip,writes,counts:()=>({lengths,points})}
}
test('粻 root4 changed schedule frame tail only',()=>{
 assert.equal(data.order[0].triangle,4);assert.deepEqual(data.order[0].seed,[['55','1'],['339','4']])
 assert.equal(sha(JSON.stringify(data.triangles)),'d7a708ae167061b15e2575fb7f42acdd8b4c54d06aa2fea4ed808b06935e229d')
 assert.equal(sha(JSON.stringify(data.sourceUnionBoundary)),'ffe93eb0bf84b7ed3155409fc38eec90a6053d7a5d11ca8ad233412ff334b4f8')
 assert.deepEqual(data.phaseShareExact,['945455271','1759053041']);assert.deepEqual(data.cutX,['115','2'])
 assert.equal(SOURCE.newFootRootTriangleIndex,4);assert.equal(SOURCE.newFootRootOpenDiskRadius,.5);assert.equal(SOURCE.newRootPrefixMathExecutions,1)
 assert.equal(proof.newFootModuleSHA256,sha(code));assert.equal(SOURCE.footGeometrySHA256,proof.newFootGeometrySHA256)
 assert.deepEqual(data.order.map((x:any)=>x.triangle),[4,3,5,2,6,0,1,7,8,9,10,11])
 const sampled:number[]=[]
 for(const p of[0,1e-6,.01,.03,.1,.5,.95,1]){
  const x=setup();x.g.attrs['data-stroke-reveal-progress']=String(p);const frame=measureReviewedU7cbbFootFrame(x.policy,p,x.nodes.measurement as any)
  if(p===0){assert.equal(frame.footPathD,'');continue}
  const first=frame.footPathD.split('Z')[0],v=first.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)!.map(Number),vertices=[[v[0],v[1]],[v[2],v[3]],[v[4],v[5]]]
  assert.equal(vertices.length,3);const cross=(a:number[],b:number[],c:number[])=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
  const turns=vertices.map((a,i)=>cross(a,vertices[(i+1)%3],[55,84.75]));assert(turns.every(n=>n>=-1e-9)||turns.every(n=>n<=1e-9))
  if(p===.01)assert(vertices.every(([x,y])=>x>=51.5&&x<=57.5&&y>=51.5&&y<=85.5),'new .01 root reveal lies inside actual completed original V')
  sampled.push(p)
 }
 assert.equal(sampled.length,7)
 console.log(JSON.stringify({changedRootPrefixFrames:8,originalTriangulationAndUnionPinned:true,originalPhaseShareAndCutUnchanged:true,point01RootInsideActualPriorV:true,newMathReexecuted:0,oldSourceDOMTestsReexecuted:0,nativeApproval:false}))
})
