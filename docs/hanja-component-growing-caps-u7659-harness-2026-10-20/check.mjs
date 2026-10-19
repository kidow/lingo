import assert from 'node:assert/strict';import{readFileSync}from'node:fs';import{resources,constantsSource}from'./serve.mjs';import * as reference from '../hanja-renderer-growing-caps-u7659-three-q-experiment-2026-10-20/render.mjs';
const R=resources(),C=JSON.parse(readFileSync(new URL('./config.json',import.meta.url))),F=R.fixture,A=R.appGate;assert.equal(R.registryExecuted,false);assert.equal(R.geometrySHA256,C.geometrySHA256);assert.equal(F.strokes.length,18);assert.equal(F.strokes.flat().length,21);assert.equal(R.SSRControlledIntermediateStateSeeding,true);
const subtree=(html,id)=>{const start=html.indexOf('<g data-stroke-start-gate="'+id+'"');assert(start>=0,id);return html.slice(start,html.indexOf('</g>',start)+4)};
for(let i=0;i<C.expectedTargets.length;i++){
 const t=C.expectedTargets[i],s=F.strokes[t.pen-1][t.mask-1],full=subtree(R.ssr,t.id),mid=subtree(R.ssrControlledCases[t.pen+'-mid'],t.id);
 assert(full.includes('data-stroke-reveal-policy="'+t.policy+'"'));assert(full.includes('data-growing-full-round="true"'));assert(full.includes('stroke-dasharray="1 2"'));assert(full.includes('d="'+s.outline+'" mask="url(#'));
 assert(mid.includes('visibility="hidden"'));assert(mid.includes('d="'+s.revealPath+'"'));assert(!mid.includes('data-growing-full-round="true"'));
 assert.equal((R.ssrControlledCases[t.pen+'-mid'].match(/data-growing-full-round="true"/g)||[]).length,i);
}
for(const p of['/app/component.mjs','/app/outline.mjs','/app/gate.mjs','/app/timing.mjs','/v/react.mjs','/v/client.mjs','/v/jsx-runtime.mjs','/v/scheduler.mjs','/v/react-dom.mjs','/browser.mjs','/fixture.json','/'])assert(R.routes.has(p));
const browser=R.routes.get('/browser.mjs');for(const text of['requestAnimationFrame(reportLoop)','sameFrame:coherent','snapshotAt:performance.now()','prefix13','prefix16','whole18','getTotalLength()','rho=r','localToPen','sampleLocal','lengthMatches','startMatches','endMatches','maskMatches','ownerMatches'])assert(browser.includes(text),text);
assert(R.routes.get('/v/react.mjs').includes('useLayoutEffect'));assert(R.routes.get('/').includes('max-height:220px'));assert(R.routes.get('/').includes('<details>'));assert(!R.routes.get('/app/timing.mjs').includes('hanjaStrokeData'));
const before=JSON.stringify(F.strokes),context=A.reviewedQuadraticCapsContext(F.strokes);assert(context);assert.equal(A.reviewedHanjaRevealContext(F.strokes),null);let paritySamples=0,negative=0;
const reject=fn=>{assert.throws(fn);negative++};
function nodes(body,id='probe'){
 const owner={},calls=[],reads={length:0,point:0},L=40,tokens=body.revealPath.split(' '),n=[tokens[0].slice(1),tokens[1],tokens[2].slice(1),tokens[3],tokens[4],tokens[5]].map(Number);
 const make=attrs=>({isConnected:true,ownerSVGElement:owner,attrs:{...attrs},getAttribute(k){return this.attrs[k]??null},setAttribute(k,v){this.attrs[k]=v;calls.push([k,v])},removeAttribute(k){delete this.attrs[k]}});
 const guide=make({'d':body.revealPath,'pathLength':'1','stroke-width':'14','stroke-linecap':'butt','stroke-linejoin':'miter','data-growing-owner':id,'id':id+'-growing-guide'});
 guide.getTotalLength=()=>{reads.length++;return L};guide.getPointAtLength=d=>{reads.point++;const t=d/L;return{x:(1-t)**2*n[0]+2*(1-t)*t*n[2]+t*t*n[4],y:(1-t)**2*n[1]+2*(1-t)*t*n[3]+t*t*n[5]}};
 return{guide,startCap:make({'data-growing-owner':id}),endCap:make({'data-growing-owner':id}),ink:make({'data-growing-owner':id,mask:'url(#'+id+'-growing)'}),calls,reads,L};
}
for(const target of C.expectedTargets){
 const s=F.strokes[target.pen-1][target.mask-1],policy=A.reviewedQuadraticCapsPolicy(context,target.pen-1,target.mask-1);assert.equal(policy.id,target.id);assert.equal(policy.kind,target.policy);assert.equal(policy.certificate.exactDecimalRational,true);assert.equal(policy.certificate.notRasterProof,true);
 // Mock-UA contract samples use the same supplied original-path endpoint in app and standalone. These do not claim actual browser arc-length measurements.
 for(const p of[0,1e-10,.03,7/40,.625,.95,.9999,.99999999,1]){
  const n=nodes(s),frame=A.measureReviewedQuadraticCapsFrame(policy,s,p,n.guide),ref=target.pen===18?reference.growingCapsState(s,p,n.L,frame.point):reference.addedQState(s,p,n.L,frame.point);
  assert.equal(frame.d,ref.d);assert.equal(frame.rho,ref.rho);assert.deepEqual(frame.q0,ref.q0);assert.deepEqual(frame.point,ref.point);assert.equal(n.reads.length,1);assert.equal(n.reads.point,1);paritySamples++;
 }
 const n=nodes(s),committed=A.commitReviewedQuadraticCaps(policy,s,.03,'probe',n);assert.equal(committed.status,'visible');assert.equal(n.reads.length,1);assert.equal(n.reads.point,1);assert.deepEqual(n.calls.at(-1),['visibility','visible']);assert.equal(n.ink.getAttribute('data-growing-progress'),'0.03');assert.equal(n.startCap.getAttribute('r'),n.endCap.getAttribute('r'));committed.cleanup();assert.equal(n.ink.getAttribute('visibility'),'hidden');assert.equal(n.startCap.getAttribute('r'),'0');
 for(const p of[0,1]){const z=nodes(s);assert.equal(A.commitReviewedQuadraticCaps(policy,s,p,'probe',z).status,p===0?'empty':'complete');assert.deepEqual(z.reads,{length:0,point:0})}
 for(const p of[-1,NaN,Infinity,1.01])reject(()=>A.measureReviewedQuadraticCapsFrame(policy,s,p,nodes(s).guide));
 reject(()=>A.measureReviewedQuadraticCapsFrame({...policy},s,.03,nodes(s).guide));reject(()=>A.measureReviewedQuadraticCapsFrame(policy,{...s,revealWidth:15},.03,nodes(s).guide));
 for(const bad of['d','stroke-width','stroke-linecap']){const n=nodes(s);n.guide.attrs[bad]='wrong';reject(()=>A.measureReviewedQuadraticCapsFrame(policy,s,.03,n.guide))}
 for(const bad of['owner','mask','connection','UA-owner-change']){const n=nodes(s);if(bad==='owner')n.endCap.ownerSVGElement={};if(bad==='mask')n.ink.attrs.mask='wrong';if(bad==='connection')n.guide.isConnected=false;if(bad==='UA-owner-change')n.guide.getPointAtLength=()=>{n.ink.attrs['data-growing-owner']='foreign';return{x:1,y:2}};assert.equal(A.commitReviewedQuadraticCaps(policy,s,.03,'probe',n).status,'hidden');assert.equal(n.ink.getAttribute('visibility'),'hidden');assert.equal(n.startCap.getAttribute('r'),'0');negative++}
 assert.equal(A.reviewedQuadraticCapsPolicy({...context},target.pen-1,target.mask-1),null);negative++;
}
for(const text of['',C.constantLines.slice(1).join('\n'),C.constantLines.join('\n').replace('1.5','2')])reject(()=>constantsSource(text));
const changed=structuredClone(F.strokes);changed[0][0].weight++;assert.equal(A.reviewedQuadraticCapsContext(changed),null);negative++;assert.equal(JSON.stringify(F.strokes),before);
console.log(JSON.stringify({passed:true,resourcesExecutions:1,SSRActualComponent:true,SSRRenderCount:4,controlledIntermediateSSRStateSeeded:true,actualHydrationExecuted:false,actualAppPolicyParitySamples:paritySamples,negative,exactThreeTargetDOMAttributes:true,allSourceFieldsUnchanged:true,layoutEffectVendorExport:true,frameStatusIncludesEveryTarget:true,registryExecuted:false,sourceGeometryExecutions:0,sourceCompilerCalls:0,engineRuns:0,HTTP:0,server:0,UI:0,actualAppUI:false,routes:R.routes.size,sourceHashes:R.sourceHashes}));
