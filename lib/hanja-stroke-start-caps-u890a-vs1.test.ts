import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU890aVS1Context,reviewedU890aVS1Policy,commitReviewedU890aVS1Caps,REVIEWED_U890A_VS1_SOURCE,REVIEWED_U890A_VS1_PROOFS,REVIEWED_U890A_VS1_INPUT_SHA256} from './hanja-stroke-start-caps-u890a-vs1.ts'
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-original-u890a-vs1-2026-10-24/fixtures.json',import.meta.url),'utf8')).u890aVS1,strokes=fixture.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex')
const targets=[[1,0],[3,0],[4,0],[5,0],[6,0],[8,0],[10,0]] as const,context=reviewedU890aVS1Context(strokes),policies=targets.map(([p,m])=>{const q=reviewedU890aVS1Policy(context,p,m);assert(q);return q})
test('褊 own whole guard and new certificate fingerprints FIRST',()=>{
 assert(context);assert.equal(sha(JSON.stringify(strokes)),REVIEWED_U890A_VS1_SOURCE.geometrySHA256)
 for(const[p,h]of Object.entries(REVIEWED_U890A_VS1_INPUT_SHA256))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h)
 for(let i=0;i<targets.length;i++){const[p,m]=targets[i],q=policies[i],c=REVIEWED_U890A_VS1_PROOFS[i];assert.equal(sha(JSON.stringify(strokes[p][m])),c.maskSHA256);assert.equal(q.segment.revealPath,c.guide);assert(c.initialSufficientConditions);assert.equal(c.PIntersectionConnectivityNotProved,true)}
 assert.equal(reviewedU890aVS1Policy(context,0,1),null);assert.equal(reviewedU890aVS1Policy(context,23,1),null)
 let n=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const k of Object.keys(strokes[p][m])){const a=clone(strokes),s=a[p][m] as any;if(k==='bounds')s.bounds[0]+=.01;else if(typeof s[k]==='number')s[k]+=.01;else s[k]+=' ';assert.equal(reviewedU890aVS1Context(a),null);n++}
 let reads=0;const a=clone(strokes);Object.defineProperty(a[0][0],'weight',{enumerable:true,get(){reads++;return 1}});assert.equal(reviewedU890aVS1Context(a),null);assert.equal(reads,0);assert.equal(reviewedU890aVS1Policy({...context!},0,0),null)
 console.log(JSON.stringify({materialNegative:n,targets:7,oldMathRerun:0,nativeApproval:false}))
})
function fake(index:number){
 const policy=policies[index];
 const id='u890a-vs1-test-'+index,events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u890a-vs1-progress':'0.5','data-u890a-vs1-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u890a-vs1-measurement':'true',id:id+'-u890a-vs1-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u890a-vs1-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u890a-vs1-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u890a-vs1-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}

const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU890aVS1Caps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u890a-vs1-progress']=String(p);return dispatch(x,p)}
function runDOM(index:number){
 for(const p of[1e-6,.03,.5]){const x=fake(index),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=fake(index),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(index);assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u890a-vs1-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=fake(index);if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=fake(index);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=fake(index);invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=fake(index);changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u890a-vs1-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=fake(index);assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=fake(index);assert.equal(commitReviewedU890aVS1Caps({...impostor.policy},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,targetIndex:index,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
}
test('褊 seven original MQ MLL starts DOM canonical lifecycle FIRST',()=>{for(let i=0;i<targets.length;i++)runDOM(i)})

test('褊 port preserves the four stored first-leg length guards',()=>{for(const i of[0,4,5,6]){const x=fake(i),f=x.policy.certificate.firstLegLength!.split('/').map(Number);x.setLength(f[0]/(f[1]??1));assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);const y=fake(i);assert.equal(commit(y,.03).status,'visible')}})
