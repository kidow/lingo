import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU90b0Context,reviewedU90b0Policy,measureReviewedU90b0Frame,commitReviewedU90b0Caps,REVIEWED_U90B0_SOURCE} from './hanja-stroke-start-gate-u90b0.ts'
// UA API는 mock이며 실제 browser/제품 UI 승인이 아니다. 저장된 고유 곡률 산술을 재계산하지 않는다.
const fixture=JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-qq-u90b0-source-experiment-2026-10-21/fixtures.json',import.meta.url),'utf8'))
const strokes=fixture.u90b0.strokes as HanjaOutlineStrokes,targets=[[0,0],[0,1]] as const
const context=reviewedU90b0Context(strokes),clone=()=>JSON.parse(JSON.stringify(strokes)) as HanjaOutlineStrokes
function selected(i:number){const[p,m]=targets[i],policy=reviewedU90b0Policy(context,p,m);assert(policy);return policy}
function fake(i:number){
 const policy=selected(i),segment=policy.segment,id='u90b0-test-'+i,L=100,events:string[]=[]
 const doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view
 let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg
 const group=node('g'),target=node('g',{'data-stroke-start-gate':policy.id,'data-u90b0-progress':'.5','data-u90b0-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number)
 let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u90b0-measurement':'true',id:id+'-u90b0-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u90b0-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u90b0-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u90b0-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 const nodes={measurement,guide,startCap,endCap,ink}
 return{policy,segment,id,L,q0,doc,view,node,svg,owner,group,target,defs,measurement,mask,guide,startCap,endCap,ink,completed,nodes,events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(fn:()=>void)=>{lengthHook=fn},onPoint:(fn:(d:number)=>{x:number;y:number})=>{pointHook=fn}}
}
function dispatch(x:ReturnType<typeof fake>,p:number,s=x.segment){return commitReviewedU90b0Caps(x.policy,s,p,x.id,x.nodes as any)}
function commit(x:ReturnType<typeof fake>,p:number,s=x.segment){x.target.attrs['data-u90b0-progress']=String(p);return dispatch(x,p,s)}


test('邰 exact source and two private frozen stored MQ certificates',()=>{
 assert(context);assert.equal(createHash('sha256').update(JSON.stringify(strokes)).digest('hex'),REVIEWED_U90B0_SOURCE.geometrySHA256)
 assert.equal(REVIEWED_U90B0_SOURCE.full5SHA256,'d137e247819ed2a62185f045fb97dc24f48632cfbb1d210f6cdb6ffe88d58e8d');assert.equal(REVIEWED_U90B0_SOURCE.actualComponentApproval,false);assert.equal(REVIEWED_U90B0_SOURCE.runtimeApplied,false)
 let n=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)if(reviewedU90b0Policy(context,p,m))n++;assert.equal(n,2)
 for(let i=0;i<targets.length;i++){const p=selected(i);assert(Object.isFrozen(p)&&Object.isFrozen(p.segment)&&Object.isFrozen(p.segment.bounds)&&Object.isFrozen(p.certificate.storedBounds));assert.deepEqual([p.certificate.T,p.certificate.K],[["1/3","1/100"],["1/4","1/100"]][i]);assert.equal(p.certificate.notPreviousMaskConnectivityProof,true);assert.equal(reviewedU90b0Policy({...context!},...targets[i]),null);assert.throws(()=>{(p.segment.bounds as number[])[0]++})}
})
test('邰 all material fields and JSON structure fail closed',()=>{
 let changed=0;for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)for(const key of Object.keys(strokes[p][m])){const x=clone(),s=x[p][m] as any;const before=JSON.stringify(s);if(key==='bounds')s.bounds[0]+=.01;else if(typeof s[key]==='number')s[key]+=.01;else s[key]+=' ';assert.notEqual(JSON.stringify(s),before);assert.equal(reviewedU90b0Context(x),null);changed++}assert.equal(changed,48)
 for(const level of['whole','pen','bounds']){const x=clone(),a=level==='whole'?x:level==='pen'?x[0]:x[0][0].bounds;delete(a as any)[0];assert.equal(reviewedU90b0Context(x),null);const proto=Object.create(Array.prototype);proto[0]=level==='whole'?strokes[0]:level==='pen'?strokes[0][0]:strokes[0][0].bounds[0];Object.setPrototypeOf(a,proto);assert.equal(reviewedU90b0Context(x),null)}
 for(const inherited of[true,false]){const x=clone(),s=x[0][0] as any,v=s.weight;delete s.weight;if(inherited)Object.setPrototypeOf(s,{weight:v});else Object.defineProperty(s,'weight',{value:v,enumerable:false});s.extra=v;assert.equal(reviewedU90b0Context(x),null)}
 for(const key of['extra',Symbol('extra')]){const x=clone();Object.defineProperty(x[0][0],key,{value:1,enumerable:false});assert.equal(reviewedU90b0Context(x),null)}
 let accessorReads=0;const a=clone();Object.defineProperty(a[0][0],'weight',{get(){accessorReads++;return strokes[0][0].weight},enumerable:true});assert.equal(reviewedU90b0Context(a),null);assert.equal(accessorReads,0)
 for(let i=0;i<targets.length;i++){const x=fake(i),s={...x.segment,weight:x.segment.weight+.01};assert.equal(commit(x,.5,s).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('邰 canonical distance six attributes and caps commit atomically then clean',()=>{
 for(let i=0;i<targets.length;i++){const x=fake(i),r=commit(x,.03);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,3);assert.equal(r.frame.rho,3);assert.equal(x.ink.getAttribute('data-growing-distance'),'3');assert.equal(x.ink.getAttribute('data-growing-radius'),'3');assert.equal(x.ink.getAttribute('data-growing-end-x'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('cx'),String(x.q0[0]));assert.equal(x.startCap.getAttribute('cy'),String(x.q0[1]));assert.equal(x.endCap.getAttribute('cx'),String(r.frame.point.x));assert.equal(x.startCap.getAttribute('r'),'3');assert.equal(x.endCap.getAttribute('r'),'3');assert(!Object.keys(x.ink.attrs).some(k=>k.includes('canstance')));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null);assert.equal(x.startCap.getAttribute('r'),'0');assert.equal(x.endCap.getAttribute('r'),'0')}
})
test('邰 empty and complete never measure; invalid progress and private impostors hide',()=>{
 for(let i=0;i<targets.length;i++){for(const p of[0,1]){const x=fake(i),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(i);assert.equal(commit(x,p).status,'hidden');assert.deepEqual(x.counts(),[0,0])}const x=fake(i);x.target.attrs['data-u90b0-progress']='0.5';assert.equal(commitReviewedU90b0Caps({...x.policy},x.segment,.5,x.id,x.nodes as any).status,'hidden');assert.deepEqual(x.counts(),[0,0])}
})
test('邰 coordinate parent owner transform frame mutations reject before between after reads',()=>{
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u90b0-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(let i=0;i<targets.length;i++)for(const mutate of mutations)for(const when of['before','length','point']){const x=fake(i);if(when==='before'){x.target.attrs['data-u90b0-progress']='0.5';mutate(x)}else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden')}
 for(let i=0;i<targets.length;i++){for(const L of[NaN,Infinity,-1,0,7]){const x=fake(i);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0])}const x=fake(i);x.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(x,.5).status,'hidden');const y=fake(i);y.guide.writeHook=k=>{if(k==='stroke-dasharray'&&y.counts()[1])y.target.attrs['data-u90b0-progress']='.25'};assert.equal(commit(y,.5).status,'hidden')}
})

test('邰 stored initial bounds and exact target-only policy scope',()=>{
 for(let p=0;p<strokes.length;p++)for(let m=0;m<strokes[p].length;m++)assert.equal(!!reviewedU90b0Policy(context,p,m),targets.some(([a,b])=>a===p&&b===m));
 for(let i=0;i<targets.length;i++){const c=selected(i).certificate.storedBounds.storedCertificate;for(const key of['lambda','chordSquaredMinus49','curvatureMargin','cosMinusRK']){const[n,d]=c[key].split('/').map(BigInt);assert(n>0n&&d>0n)}assert.equal(c.maskSHA256,createHash('sha256').update(JSON.stringify(selected(i).segment)).digest('hex'));assert.equal(c.PIntersectionConnectivityNotProved,true)}
 assert.equal(REVIEWED_U90B0_SOURCE.QQ1PreviousPConnectivityNotProved,true);assert.equal(REVIEWED_U90B0_SOURCE.storedExactArithmeticRuns,1);assert.equal(REVIEWED_U90B0_SOURCE.newGeometry,0);assert.equal(REVIEWED_U90B0_SOURCE.runtimeApplied,false);
})
