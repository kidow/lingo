import assert from 'node:assert/strict'
import {test} from 'node:test'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import {reviewedU84ebContext,reviewedU84ebPolicy,makeReviewedU84ebSourceContext,commitReviewedU84ebCaps,REVIEWED_U84EB_SOURCE,REVIEWED_U84EB_PROOFS,REVIEWED_U84EB_INPUT_SHA256} from './hanja-stroke-start-caps-u84eb.ts'
const fixture=JSON.parse(readFileSync(new URL('../'+REVIEWED_U84EB_SOURCE.sourceFixture,import.meta.url),'utf8')),strokes=fixture.strokes as HanjaOutlineStrokes,clone=<T,>(x:T):T=>JSON.parse(JSON.stringify(x)),sha=(v:string|Buffer)=>createHash('sha256').update(v).digest('hex')
const targets=[[5,1],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[14,0],[14,1]] as const,context=reviewedU84ebContext(strokes),policies=targets.map(([p,m])=>{const q=reviewedU84ebPolicy(context,p,m);assert(q);return q})
// 이미 통과한 MQ8/MQQ1/MC1 정확산술은 재실행하지 않는다. 이 꼬리는 새 LEFT7 전체문맥만 결박한다.
test('蓫 terminal7 whole-context/certificate binding new tail FIRST',()=>{
 assert(context);assert.equal(sha(JSON.stringify(strokes)),REVIEWED_U84EB_SOURCE.geometrySHA256);
 assert.deepEqual([strokes.length,strokes.flat().length,strokes.flat().reduce((n,m)=>n+(m.outline.match(/M/g)||[]).length,0)],[15,19,35]);
 for(const[p,h]of Object.entries(REVIEWED_U84EB_INPUT_SHA256))assert.equal(sha(readFileSync(new URL('../'+p,import.meta.url))),h,p);
 const full=JSON.parse(readFileSync(new URL('../'+REVIEWED_U84EB_SOURCE.full5File,import.meta.url),'utf8'));
 assert.deepEqual(Object.keys(full).sort(),['defaults','engineHashes','engineRevision','groups','trace']);
 assert.equal(makeReviewedU84ebSourceContext(full,REVIEWED_U84EB_SOURCE.sourceIdentity,strokes),context);
 const bad=clone(full);bad.trace[0][0].args[0]++;assert.equal(makeReviewedU84ebSourceContext(bad,REVIEWED_U84EB_SOURCE.sourceIdentity,strokes),null);
 assert.equal(makeReviewedU84ebSourceContext({groups:full.groups,trace:full.trace,defaults:full.defaults},REVIEWED_U84EB_SOURCE.sourceIdentity,strokes),null);
 assert.equal(makeReviewedU84ebSourceContext(full,{...REVIEWED_U84EB_SOURCE.sourceIdentity,file:'other'},strokes),null);
 const old=JSON.parse(readFileSync(new URL('../docs/hanja-source-cache-vs0-u84eb-2026-10-23/fixture.json',import.meta.url),'utf8'));
 assert.equal(reviewedU84ebContext(old.strokes),null);assert.equal(reviewedU84ebPolicy(context,6,1),null);
 for(let i=0;i<strokes.length;i++)if(i!==6)assert.deepEqual(strokes[i],old.strokes[i]);
 const before=old.strokes[6][0],body=strokes[6][0],tail=strokes[6][1];
 for(const key of Object.keys(body))if(key!=='outline')assert.deepEqual((body as any)[key],before[key]);
 assert.equal((body.outline.match(/M/g)||[]).length,3);assert.equal(tail.outline,fixture.partition.terminalOriginalP);assert.equal(tail.direction,'left');assert.equal(tail.weight,10);assert.equal(tail.revealPath,undefined);
 for(let i=0;i<targets.length;i++){
  const[pen,mask]=targets[i],p=REVIEWED_U84EB_PROOFS[i],policy=policies[i],s=strokes[pen][mask];
  assert.equal(p.maskSHA256,sha(JSON.stringify(s)));assert.equal(p.guide,s.revealPath);assert.equal(p.width,14);assert.equal(p.weight,s.weight);assert.equal(policy.certificate.syntax,p.syntax);
  assert(p.initialSufficientConditions&&p.previousMaskContactNotProved&&p.fullSweepNotProved);assert.equal(p.arithmeticRecomputedAfterTerminalPartition,false);
  if(p.syntax==='MQQ'){assert.equal(p.pen,7);assert.equal(p.initialKind,'first-quadratic-of-two');assert(p.firstQIsNotFullGuide&&p.secondQPreserved);assert.notEqual(p.arithmeticOriginalMaskSHA256,p.maskSHA256)}
  else if(p.syntax==='MC'){assert.equal(p.pen,15);assert.equal(p.mask,2);assert.equal(p.initialKind,'single-cubic');assert.equal(p.T,'1/4');assert.equal(p.K,'1/12');assert.equal(p.lambdaBernstein.length,5);assert.equal(p.curvatureNumeratorBernstein.length,3)}
  else{assert.equal(p.initialKind,'single-quadratic');assert.equal(p.arithmeticOriginalMaskSHA256,p.maskSHA256)}
  assert(Object.isFrozen(policy)&&Object.isFrozen(policy.certificate.storedBounds));
 }
 assert.equal(policies.length,10);assert.deepEqual(REVIEWED_U84EB_SOURCE.syntaxScopes,{MQ:8,MQQFirstQ:1,MC:1});
 let negatives=0;for(let i=0;i<strokes.length;i++)for(let j=0;j<strokes[i].length;j++)for(const key of Object.keys(strokes[i][j])){
  const q=clone(strokes),m=q[i][j] as any;if(key==='bounds')m.bounds[0]+=.01;else if(typeof m[key]==='number')m[key]+=.01;else m[key]+=' ';
  assert.equal(reviewedU84ebContext(q),null);negatives++;
 }
 let getters=0;const accessor=clone(strokes);Object.defineProperty(accessor[0][0],'weight',{get(){getters++;return 1},enumerable:true});assert.equal(reviewedU84ebContext(accessor),null);assert.equal(getters,0);
 assert.equal(reviewedU84ebPolicy({...context!},5,1),null);assert.equal(REVIEWED_U84EB_SOURCE.newNativeRecoveryApproved,false);
 console.log(JSON.stringify({newWholeContextTail:true,targets:10,unchangedOtherPens:14,negative:negatives,getters,mathRerun:0,sourceProjection:0,engine:0}));
})
function fake(index:number){
 const policy=policies[index];
 const id='u84eb-test-'+index,events:string[]=[],doc:any={defaultView:null},view={document:doc,getComputedStyle:(n:any)=>({transform:n.cssTransform,getPropertyValue:(k:string)=>k==='translate'?n.cssTranslate:'none'})};doc.defaultView=view;let owner:any=null
 const node=(name:string,attrs:Record<string,string>={})=>({localName:name,namespaceURI:'http://www.w3.org/2000/svg',isConnected:true,ownerSVGElement:owner,ownerDocument:doc,parentElement:null as any,cssTransform:'none',cssTranslate:'none',attrs:{...attrs},writeHook:null as null|((k:string,v:string)=>void),getAttribute(k:string){return this.attrs[k]??null},setAttribute(k:string,v:string){this.attrs[k]=v;events.push(name+':'+k+'='+v);this.writeHook?.(k,v)},removeAttribute(k:string){delete this.attrs[k]}})
 const svg=node('svg');owner=svg;const group=node('g'),target=node('g',{'data-stroke-start-gate':policy!.id,'data-u84eb-progress':'0.5','data-u84eb-clip':id}),defs=node('defs');group.parentElement=svg;target.parentElement=group;defs.parentElement=target
 const segment=policy!.segment,q0=segment.revealPath!.match(/-?\d+(?:\.\d+)?/g)!.slice(0,2).map(Number);let length=100,reads=0,points=0,lengthHook:(()=>void)|null=null,pointHook:((d:number)=>{x:number;y:number})|null=null
 const measurement=Object.assign(node('path',{'data-growing-owner':id,'data-u84eb-measurement':'true',id:id+'-u84eb-measure',d:segment.revealPath!}),{getTotalLength(){reads++;events.push('UA:length');lengthHook?.();return length},getPointAtLength(d:number){points++;events.push('UA:point');return pointHook?pointHook(d):{x:q0[0]+d/10,y:q0[1]}}});measurement.parentElement=defs
 const mask=node('mask',{id:id+'-u84eb-growing',maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'100',height:'100'});mask.parentElement=defs
 const guide=node('path',{'data-growing-owner':id,id:id+'-u84eb-guide',d:segment.revealPath!,pathLength:'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter'}),startCap=node('circle',{'data-growing-owner':id,r:'0'}),endCap=node('circle',{'data-growing-owner':id,r:'0'}),ink=node('path',{'data-growing-owner':id,d:segment.outline,mask:'url(#'+id+'-u84eb-growing)',visibility:'hidden'});guide.parentElement=mask;startCap.parentElement=mask;endCap.parentElement=mask;ink.parentElement=target
 const completed=node('path',{d:segment.outline,visibility:'visible'});completed.parentElement=target
 return{policy,id,segment,q0,svg,group,target,measurement,mask,guide,startCap,endCap,ink,completed,nodes:{measurement,guide,startCap,endCap,ink},events,counts:()=>[reads,points],setLength:(n:number)=>{length=n},onLength:(f:()=>void)=>{lengthHook=f},onPoint:(f:(d:number)=>{x:number;y:number})=>{pointHook=f}}
}

const dispatch=(x:ReturnType<typeof fake>,p:number,s=x.segment)=>commitReviewedU84ebCaps(x.policy,s,p,x.id,x.nodes as any),commit=(x:ReturnType<typeof fake>,p:number)=>{x.target.attrs['data-u84eb-progress']=String(p);return dispatch(x,p)}
function runDOM(index:number){
 for(const p of[1e-6,.03,.5]){const x=fake(index),r=commit(x,p);assert.equal(r.status,'visible');assert(r.frame);assert.deepEqual(x.counts(),[1,1]);assert.equal(r.frame.d,p*100);assert.equal(r.frame.rho,Math.min(7,p*100));assert.equal(x.ink.getAttribute('data-growing-distance'),String(r.frame.d));assert.equal(x.startCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.endCap.getAttribute('r'),String(r.frame.rho));assert.equal(x.events.at(-1),'path:visibility=visible');r.cleanup();assert.equal(x.ink.getAttribute('visibility'),'hidden');assert.equal(x.guide.getAttribute('stroke-dasharray'),'0 2');assert.equal(x.startCap.getAttribute('r'),'0');for(const k of['progress','length','distance','radius','end-x','end-y'])assert.equal(x.ink.getAttribute('data-growing-'+k),null)}
 for(const p of[0,1]){const x=fake(index),r=commit(x,p);assert.equal(r.status,p===0?'empty':'complete');assert.deepEqual(x.counts(),[0,0]);r.cleanup();assert.equal(x.completed.getAttribute('visibility'),'visible')}
 let negatives=0;for(const p of[NaN,Infinity,-.1,1.1]){const x=fake(index);assert.equal(commit(x,p).status,'hidden');negatives++}
 const mutations=[(x:ReturnType<typeof fake>)=>{x.measurement.attrs.d+=' '},(x:ReturnType<typeof fake>)=>{x.measurement.attrs.pathLength='1'},(x:ReturnType<typeof fake>)=>{x.target.attrs['data-u84eb-progress']='.4'},(x:ReturnType<typeof fake>)=>{x.group.attrs.transform='translate(1)'},(x:ReturnType<typeof fake>)=>{x.svg.cssTransform='matrix(1,0,0,1,0,0)'},(x:ReturnType<typeof fake>)=>{x.group.cssTranslate='1px'},(x:ReturnType<typeof fake>)=>{x.measurement.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.measurement.ownerDocument={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.ownerSVGElement={} as any},(x:ReturnType<typeof fake>)=>{x.measurement.isConnected=false},(x:ReturnType<typeof fake>)=>{x.startCap.attrs.transform='translate(10)'},(x:ReturnType<typeof fake>)=>{x.endCap.parentElement=x.group},(x:ReturnType<typeof fake>)=>{x.ink.cssTransform='matrix(1,0,0,1,5,0)'}]
 for(const mutate of mutations)for(const when of['before','length','point']){const x=fake(index);if(when==='before')mutate(x);else if(when==='length')x.onLength(()=>mutate(x));else x.onPoint(d=>{mutate(x);return{x:x.q0[0]+d/10,y:x.q0[1]}});assert.equal((when==='before'?dispatch(x,.5):commit(x,.5)).status,'hidden');assert.equal(x.ink.getAttribute('visibility'),'hidden');negatives++}
 for(const L of[NaN,Infinity,-1,0,7]){const x=fake(index);x.setLength(L);assert.equal(commit(x,.5).status,'hidden');assert.deepEqual(x.counts(),[1,0]);negatives++}
 const invalid=fake(index);invalid.onPoint(()=>({x:NaN,y:0}));assert.equal(commit(invalid,.5).status,'hidden');negatives++
 const changed=fake(index);changed.guide.writeHook=k=>{if(k==='stroke-dasharray'&&changed.counts()[1])changed.target.attrs['data-u84eb-progress']='.25'};assert.equal(commit(changed,.5).status,'hidden');negatives++
 const wrong=fake(index);assert.equal(dispatch(wrong,.5,{...wrong.segment,weight:1}).status,'hidden');assert.deepEqual(wrong.counts(),[0,0]);negatives++
 const impostor=fake(index);assert.equal(commitReviewedU84ebCaps({...impostor.policy},impostor.segment,.5,impostor.id,impostor.nodes as any).status,'hidden');negatives++
 console.log(JSON.stringify({DOMFirst:true,targetIndex:index,visibleSamples:3,emptyCompleteSamples:2,negative:negatives,canonicalSetRemove:true,visibilityLast:true,SSR:0,nativeApproval:false}))
}
test('蓫 own ten syntax-specific starts DOM canonical lifecycle FIRST',()=>{for(let i=0;i<targets.length;i++)runDOM(i)})

