import assert from 'node:assert/strict'
import {test}from'node:test'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
import {reviewedU61f0Context,reviewedU61f0Policy,commitReviewedU61f0Caps,REVIEWED_U61F0_INPUT_SHA256,REVIEWED_U61F0_PROOFS,REVIEWED_U61F0_SOURCE}from './hanja-stroke-start-caps-u61f0.ts'
const clone=<T,>(v:T):T=>JSON.parse(JSON.stringify(v))
const strokes=JSON.parse(readFileSync(new URL('../docs/hanja-source-cached-order2-u61f0-2026-10-23/fixtures.json',import.meta.url),'utf8'))['u61f0-order2'].strokes
const context=reviewedU61f0Context(strokes);assert(context)
const targets=[[0,0],[1,0],[3,0],[4,1],[5,0],[6,0],[7,0],[8,0],[9,0],[13,0],[14,0],[15,0],[17,0]]
function selected(i:number){const p=reviewedU61f0Policy(context,targets[i][0],targets[i][1]);assert(p);return p}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u61f0-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u61f0-progress':'.5','data-u61f0-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u61f0-measurement':'true',id:id+'-u61f0-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u61f0-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u61f0-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u61f0-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,completed,nodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return commitReviewedU61f0Caps(x.policy,s,p,x.id,x.nodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u61f0-progress']=String(p);return dispatch(x,p,s)}
test('懰 new namespace and thirteen exact target bindings fail closed in finite DOM frames',()=>{
 let negatives=0
 for(let i=0;i<13;i++){
  const x=fake(i),guideBefore=x.segment.revealPath,outlineBefore=x.segment.outline,r=commit(x,.03)
  assert.equal(r.status,'visible');assert(r.frame);assert.equal(r.frame.d,3);assert.equal(r.frame.rho,3)
  assert.equal(x.startCap.attrs.r,'3');assert.equal(x.ink.attrs['data-growing-distance'],'3')
  assert.equal(x.segment.revealPath,guideBefore);assert.equal(x.segment.outline,outlineBefore)
  if(i===5){assert.equal(selected(i).certificate.syntax,'MLQQ');assert.equal((guideBefore!.match(/Q/g)||[]).length,2)}
  if(i===12){assert.equal(selected(i).certificate.syntax,'MLQ');assert(guideBefore!.endsWith('Q89.0025 91 84.0025 91'))}
  r.cleanup();assert.equal(x.ink.attrs.visibility,'hidden');assert.equal(x.startCap.attrs.r,'0')
  const changes=[
   (q:ReturnType<typeof fake>)=>{q.measurement.attrs.d+=' '},
   (q:ReturnType<typeof fake>)=>{q.target.attrs['data-stroke-start-gate']='u61f0-wrong'},
   (q:ReturnType<typeof fake>)=>{q.target.attrs['data-u61f0-progress']='0.04'},
   (q:ReturnType<typeof fake>)=>{q.guide.attrs['data-growing-owner']='foreign'},
   (q:ReturnType<typeof fake>)=>{q.mask.attrs.id+='-other'},
   (q:ReturnType<typeof fake>)=>{q.guide.namespaceURI='http://www.w3.org/1999/xhtml'},
   (q:ReturnType<typeof fake>)=>{q.group.cssTranslate='1px'},
   (q:ReturnType<typeof fake>)=>{q.ink.attrs.d+=' '},
   (q:ReturnType<typeof fake>)=>{q.endCap.parentElement=q.defs},
  ]
  for(const change of changes){const q=fake(i);q.target.attrs['data-u61f0-progress']='0.03';change(q);assert.equal(dispatch(q,.03).status,'hidden');assert.equal(q.startCap.attrs.r,'0');assert.equal(q.ink.attrs.visibility,'hidden');negatives++}
  const during=fake(i);during.onLength(()=>{during.measurement.attrs.d+=' '});assert.equal(commit(during,.03).status,'hidden');assert.equal(during.ink.attrs['data-growing-distance'],undefined);negatives++
  const duringPoint=fake(i);duringPoint.onPoint(()=>{duringPoint.ink.attrs.mask='url(#foreign)';return{x:1,y:2}});assert.equal(commit(duringPoint,.03).status,'hidden');negatives++
  const foreign=fake(i);assert.equal(commitReviewedU61f0Caps({...foreign.policy},foreign.segment,.03,foreign.id,foreign.nodes as any).status,'hidden');negatives++
  for(const p of[-1,NaN,Infinity,1.1]){const q=fake(i);assert.equal(commit(q,p).status,'hidden');negatives++}
  const z=fake(i);assert.equal(commit(z,0).status,'empty');assert.equal(commit(z,1).status,'complete');assert.deepEqual(z.counts(),[0,0])
 }
 console.log(JSON.stringify({targetBindings:13,negatives,oldMathReruns:0,realUA:false,nativeScreens:0,originalTailGuidesUnchanged:true}))
})
