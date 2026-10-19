import React,{createElement as e,Fragment,useEffect}from'react';import{hydrateRoot,createRoot}from'react-dom/client';import{StrokeOutlines}from'/app/component.mjs';import{STROKE_DURATION as D,STROKE_GAP as G}from'@/lib/hanja-strokes';
const{strokes,pens,expectedTargets,boundaries,thresholds}=await fetch('/fixture.json').then(r=>r.json()),errors=[],roots=[];let clock={current:[]},ready=false,pen=18,last=1,generation=0,mode='idle',frameNumber=0,reporting=false;
const originalConsoleError=console.error;console.error=(...args)=>{errors.push(args.map(String).join(' '));originalConsoleError.apply(console,args)};
const attributes=node=>node?Object.fromEntries([...node.attributes].map(a=>[a.name,a.value])):null;
function targetsIn(host){return expectedTargets.map(expected=>{
 const t=host?.querySelector('[data-stroke-start-gate="'+expected.id+'"]'),guide=t?.querySelector('path[id$="-growing-guide"]'),ink=t?.querySelector(':scope > path[d]'),caps=[...t?.querySelectorAll('mask circle')??[]],p=Number(t?.getAttribute('data-stroke-reveal-progress')),full=ink?.getAttribute('data-growing-full-round')==='true',L=guide?.getTotalLength();
 let coherent=null;
 if(guide&&ink&&!full&&ink.getAttribute('visibility')==='visible'){
  const ip=Number(ink.getAttribute('data-growing-progress')),dl=Number(ink.getAttribute('data-growing-length')),d=Number(ink.getAttribute('data-growing-distance')),rho=Number(ink.getAttribute('data-growing-radius')),point=guide.getPointAtLength(d),q=guide.getPointAtLength(0),owner=ink.getAttribute('data-growing-owner');
  coherent={sameProgress:ip===p&&Number.parseFloat(guide.getAttribute('stroke-dasharray'))===p,lengthMatches:Math.abs(L-dl)<1e-9,distanceMatches:Math.abs(d-ip*dl)<1e-9,radiusMatches:Math.abs(rho-Math.min(7,d))<1e-9,capsRadiusMatches:caps.every(c=>Number(c.getAttribute('r'))===rho),startMatches:Math.abs(Number(caps[0]?.getAttribute('cx'))-q.x)<1e-4&&Math.abs(Number(caps[0]?.getAttribute('cy'))-q.y)<1e-4,endMatches:Math.abs(Number(caps[1]?.getAttribute('cx'))-point.x)<1e-7&&Math.abs(Number(caps[1]?.getAttribute('cy'))-point.y)<1e-7,ownerMatches:[guide,...caps].every(n=>n.getAttribute('data-growing-owner')===owner),maskMatches:ink.getAttribute('mask')==='url(#'+owner+'-growing)',visibility:ink.getAttribute('visibility')};
 }
 return{...expected,exists:!!t,attributes:attributes(t),guide:attributes(guide),localProgress:p,inkPresent:!!ink,inkMasked:ink?ink.hasAttribute('mask'):null,inkMask:ink?.getAttribute('mask'),inkVisible:ink?ink.getAttribute('visibility')!=='hidden':false,ink:attributes(ink),fullRound:full,caps:caps.map(attributes),sameFrame:coherent,browserGuideLength:L}
})}
function report(){const status={hydrationReady:ready,hydrationErrors:[...errors],frame:++frameNumber,snapshotAt:performance.now(),mode,pen,progress:last,clockTime:clock.current[0]?.currentTime??null,clockPlayState:clock.current[0]?.playState??null,targets:targetsIn(document.getElementById('root')),coarse:[...document.querySelectorAll('#coarse > div')].map(div=>({sample:div.dataset.sample,targets:targetsIn(div)})),actualAppUI:false};document.getElementById('status').textContent=JSON.stringify(status,null,2);window.harnessStatus=status}
function reportLoop(){report();requestAnimationFrame(reportLoop)}
function Probe(){useEffect(()=>{ready=true;setup();if(!reporting){reporting=true;requestAnimationFrame(reportLoop)}},[]);return null}
const svg=(phase='idle',count=0,c=clock,size=520)=>e('svg',{width:size,height:size,viewBox:'0 0 100 100','aria-label':'癙 actual StrokeOutlines'},e(StrokeOutlines,{strokes,clock:c,phase,count,manual:false}));const view=(phase='idle',count=0)=>e(Fragment,null,svg(phase,count),e(Probe));
const root=hydrateRoot(document.getElementById('root'),view(),{identifierPrefix:'hc-',onRecoverableError:error=>{errors.push(String(error));report()}});
function show(p){if(!ready)return;generation++;mode='sample';last=p;clock={current:[{currentTime:(pen-1)*(D+G)+p*D,playState:'running',pending:false}]};root.render(view('playing',pen))}
function select(p,value=.75){pen=p;show(value)}
function whole(){generation++;mode='whole';last=1;clock={current:[]};root.render(view('done',pens))}
function prefix(n){select(n,.75);mode='prefix'+n}
function play(){if(!ready)return;const run=++generation;mode='natural8sec';last=0;clock={current:[{currentTime:(pen-1)*(D+G),playState:'running',pending:false}]};root.render(view('playing',pen));const activeClock=clock,start=performance.now();report();function frame(t){if(run!==generation)return;const p=Math.min(1,(t-start)/8000);last=p;activeClock.current[0].currentTime=(pen-1)*(D+G)+p*D;if(p<1)requestAnimationFrame(frame);else{mode='natural-complete';requestAnimationFrame(()=>{activeClock.current[0].playState='paused';report()})}}requestAnimationFrame(frame)}
function coarse(){for(const r of roots)r.unmount();roots.length=0;const host=document.getElementById('coarse');host.replaceChildren();for(const p of[0,.125,.25,.375,.5,.625,.75,.875,1]){const div=document.createElement('div');div.dataset.sample=String(p);host.append(div);const c={current:[{currentTime:(pen-1)*(D+G)+p*D,playState:'running',pending:false}]},r=createRoot(div);roots.push(r);r.render(e('div',null,p*100+'%',svg('playing',pen,c,220)));requestAnimationFrame(()=>requestAnimationFrame(()=>{c.current[0].playState='paused'}))}}
function localToPen(target,mask,local){const a=strokes[target-1],total=a.reduce((n,m)=>n+m.weight,0),before=a.slice(0,mask-1).reduce((n,m)=>n+m.weight,0);return(before+local*a[mask-1].weight)/total}
function sampleLocal(target,local){const spec=expectedTargets.find(v=>v.pen===target);if(!spec)throw Error('Exact reviewed Q target required');select(target,localToPen(target,spec.mask,local));mode='local-Q-'+target}
function threshold(target,label){const spec=thresholds.growingTargets.find(v=>v.pen===target),id=expectedTargets.find(v=>v.pen===target)?.id,node=document.querySelector('#root [data-stroke-start-gate="'+id+'"] path[id$="-growing-guide"]');if(!spec||!node)throw Error('Committed Q guide unavailable');const L=node.getTotalLength(),delta=label==='before'?-1e-10:label==='after'?1e-10:0;select(spec.pen,localToPen(spec.pen,spec.mask,spec.r/L+delta));mode='pen'+target+'-rho=r-'+label}
function setup(){if(document.getElementById('controls').childNodes.length)return;
 const buttons=[['whole18',whole],['prefix13',()=>prefix(13)],['prefix16',()=>prefix(16)],...Array.from({length:pens},(_,i)=>['pen'+(i+1),()=>select(i+1)]),
 ...[[0,'0'],[1e-6,'epsilon'],[.75,'75'],[.95,'95'],[.9999,'99.99'],[.99999999,'99.999999'],[1,'100']].map(([p,label])=>[label,()=>show(p)]),
 ...Object.entries(boundaries).flatMap(([target,bs])=>bs.flatMap((b,i)=>[['before',b-1e-10],['at',b],['after',b+1e-10]].map(([label,p])=>['pen'+target+'-boundary'+(i+1)+'-'+label,()=>select(Number(target),p)]))),
 ...expectedTargets.flatMap(spec=>['before','at','after'].map(label=>['pen'+spec.pen+'-rho=r-'+label,()=>threshold(spec.pen,label)])),
 ...expectedTargets.flatMap(spec=>[[0,'0'],[1e-6,'epsilon'],[.95,'95'],[.9999,'99.99'],[.99999999,'99.999999'],[1,'100']].map(([p,label])=>['pen'+spec.pen+'-local-'+label,()=>sampleLocal(spec.pen,p)])),
 ['play8sec',play],['coarse9',coarse]];
 for(const[label,fn]of buttons){const btn=document.createElement('button');btn.textContent=label;btn.onclick=fn;document.getElementById('controls').append(btn)}
}
document.getElementById('copy-status').onclick=()=>navigator.clipboard.writeText(document.getElementById('status').textContent);
window.harness={show,select,whole,prefix,play,coarse,threshold,localToPen,sampleLocal};
