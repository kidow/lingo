import assert from'node:assert/strict';
import{readFileSync}from'node:fs';import{createHash}from'node:crypto';import{fileURLToPath}from'node:url';import path from'node:path';
import{assertFixedGeometry,assertTarget,targetMask,growingState,measureBrowserFrame,browserMetrics,renderOriginal,renderGrowingCaps,renderWhole,targetCoverageResidual}from'./render.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)),repo=path.resolve(here,'../..');
const sha=x=>createHash('sha256').update(x).digest('hex'),digest=x=>sha(JSON.stringify(x));
const config=JSON.parse(readFileSync(path.join(here,'config.json'))),t=config.targets.u75b7;
for(const[file,hash]of Object.entries(t.inputSHA256))assert.equal(sha(readFileSync(path.join(repo,file))),hash);
const fixtureBytes=readFileSync(path.resolve(here,config.sourceFixture));assert.equal(sha(fixtureBytes),config.fixtureSHA256);
const fixture=JSON.parse(fixtureBytes),strokes=fixture.originalOrderBaseline,s=strokes[6][1];assert.equal(digest(strokes),config.fixedStrokesSHA256);
assert.equal(digest(s),config.targetMaskSHA256);assert.equal(strokes.length,10);assert.equal(strokes.flat().length,13);
const proof=JSON.parse(readFileSync(path.join(repo,'docs/hanja-goal-glyphwiki-batch838-2026-10-13/engine-whole-u75b7.json')));assert.equal(digest(proof),config.sourceFull5CanonicalSHA256);assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.deepEqual(targetMask(),s);assertFixedGeometry(strokes);
let negatives=0;const deny=fn=>{assert.throws(fn);negatives++},copy=x=>JSON.parse(JSON.stringify(x));
for(let pi=0;pi<strokes.length;pi++)for(let mi=0;mi<strokes[pi].length;mi++){let v=copy(strokes);v[pi][mi].weight+=.001;deny(()=>assertFixedGeometry(v))}
for(const key of Object.keys(s)){let v=copy(s);v[key]=key==='bounds'?[0,0,1,1]:key==='revealWidth'?13:key==='weight'?1: String(v[key])+' ';deny(()=>assertTarget(v))}
let extra=copy(strokes);extra.push([]);deny(()=>assertFixedGeometry(extra));extra=copy(strokes);extra[6].reverse();deny(()=>assertFixedGeometry(extra));
const g0=growingState(s,0,36,[32.34,83.725]);assert.equal(g0.d,0);assert.equal(g0.rho,0);for(const p of[.000001,.1,.19444444444444445,.5,.95]){const g=growingState(s,p,36,[32.34+32.04*p,83.725-10.4625*p]);assert.equal(g.d,p*36);assert.equal(g.rho,Math.min(7,p*36))}
for(const p of[-.1,1.1,NaN])deny(()=>growingState(s,p,36,[0,0]));for(const L of[0,6,NaN,Infinity])deny(()=>growingState(s,.1,L,[0,0]));for(const point of[[1],[NaN,2],[1,Infinity]])deny(()=>growingState(s,.1,36,point));
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;const rat=(n,d=1n)=>{if(d<0n){n=-n;d=-d}const g=gcd(n,d);return[n/g,d/g]};
const dec=s=>{const neg=s[0]==='-';if(neg)s=s.slice(1);const[a,b='']=s.split('.');return rat(BigInt((neg?'-':'')+a+b),10n**BigInt(b.length))};
const add=(a,b)=>rat(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),sub=(a,b)=>add(a,[-b[0],b[1]]),mul=(a,b)=>rat(a[0]*b[0],a[1]*b[1]),sq=a=>mul(a,a),gt=(a,b)=>a[0]*b[1]>b[0]*a[1],str=a=>a[0]+'/'+a[1];
const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(s.revealPath);assert.ok(match);
const q=match.slice(1).map(dec),P0=q.slice(0,2),P1=q.slice(2,4),P2=q.slice(4,6),two=rat(2n),quarter=rat(1n,4n);
const A=P1.map((x,i)=>sub(x,P0[i])),B=P2.map((x,i)=>add(sub(x,mul(two,P1[i])),P0[i]));
assert.deepEqual(A.map(str),config.certificate.A);assert.deepEqual(B.map(str),config.certificate.B);
const cross=sub(mul(A[0],B[1]),mul(A[1],B[0]));assert.equal(str([-cross[0],cross[1]]),config.certificate.crossAbs);assert.ok(gt(rat(36n),[-cross[0],cross[1]]));assert.ok(gt(A[0],rat(14n)));assert.ok(gt(B[0],rat(0n)));
const chord=A.map((x,i)=>add(mul(mul(two,x),quarter),mul(B[i],sq(quarter))));const chord2=add(sq(chord[0]),sq(chord[1]));assert.equal(str(chord2),config.certificate.chordSquaredAtQuarter);assert.ok(gt(chord2,rat(49n)));
assert.ok(gt(rat(1n,150n),rat(36n,2n*14n**3n)));const rk=rat(7n,150n),cosLower=sub(rat(1n),mul(sq(rk),rat(1n,2n)));assert.equal(str(cosLower),config.certificate.cosLower);assert.ok(gt(cosLower,rk));
const area=d=>14*d+2*Math.PI*d*d;assert.equal(area(0),0);assert.ok(area(.000001)<.000015);
let mockCalls=0;const mock=(mask,p)=>{assert.deepEqual(mask,s);mockCalls++;return growingState(mask,p,36,[32.34+32.04*p,83.725-10.4625*p])};
const total=strokes[6].reduce((a,m)=>a+m.weight,0),b=strokes[6][0].weight/total;
const zero=renderGrowingCaps(strokes,7,0,'zero',mock);assert.equal(mockCalls,0);assert.ok(!zero.includes('zero-7-1'));
const partial=renderGrowingCaps(strokes,7,(strokes[6][0].weight+s.weight*.1)/total,'part',mock);assert.equal(mockCalls,1);assert.ok(partial.includes('stroke-linecap="butt"'));assert.ok(partial.includes('stroke-linejoin="miter"'));assert.equal((partial.match(/<circle /g)||[]).length,2);
const complete=renderGrowingCaps(strokes,7,1,'done',mock);assert.equal(mockCalls,1);assert.ok(complete.includes('mask="url(#done-7-1)"'));assert.ok(complete.includes('stroke-linecap="round"'));assert.ok(!complete.includes('stroke-dasharray'));
const prefix=renderGrowingCaps(strokes,8,.5,'prefix',mock),whole=renderWhole(strokes,'whole');assert.ok(prefix.includes('mask="url(#prefix-prefix-7-1)"'));assert.ok(whole.includes('mask="url(#whole-7-1)"'));assert.equal(mockCalls,1);
for(let pen=1;pen<=6;pen++)for(const p of[0,.000001,.5,.9999,1])assert.equal(renderGrowingCaps(strokes,pen,p,'same',mock),renderOriginal(strokes,pen,p,'same'));
for(let pen=8;pen<=10;pen++)for(const p of[0,.000001,.5,.9999,1]){const ordinary=renderOriginal(strokes,pen,p,'same'),fresh=renderGrowingCaps(strokes,pen,p,'same',mock);const oldTarget='<path d="'+s.outline+'"/>';const targetPrefix=renderGrowingCaps(strokes,7,1,'same',mock);const start=targetPrefix.indexOf('<defs><mask id="same-7-1"'),end=targetPrefix.indexOf('</g></svg>');const exactFull=targetPrefix.slice(start,end).replaceAll('same-7-1','same-prefix-7-1');assert.equal(fresh,ordinary.replace(oldTarget,exactFull))}
const residual=targetCoverageResidual(s,'residual');assert.ok(residual.includes('stroke="black"'));assert.ok(residual.includes('stroke-linecap="round"'));assert.ok(residual.includes('fill="#e23"'));
let measuredLengths=0,measuredPoints=[],connectionNegatives=0,measurementPath,measurementSVG,pointHook=null,lengthHook=null;
const attrs={},svgAttrs={};globalThis.document={body:{appendChild(svg){assert.equal(svg,measurementSVG);svg.isConnected=true;measurementPath.isConnected=true}},createElementNS(ns,name){assert.equal(ns,'http://www.w3.org/2000/svg');if(name==='svg'){measurementSVG={isConnected:false,style:{},setAttribute(k,v){svgAttrs[k]=v},getAttribute(k){return svgAttrs[k]??null},hasAttribute(k){return Object.hasOwn(svgAttrs,k)},appendChild(path){measurementPath=path;path.parentNode=this;path.ownerSVGElement=this}};return measurementSVG}assert.equal(name,'path');return{isConnected:false,ownerSVGElement:null,parentNode:null,setAttribute(k,v){attrs[k]=v},getAttribute(k){return attrs[k]??null},hasAttribute(k){return Object.hasOwn(attrs,k)},getTotalLength(){measuredLengths++;if(lengthHook)lengthHook();return 36},getPointAtLength(d){measuredPoints.push(d);if(pointHook)return pointHook(d);return{x:32.34+32.04*d/36,y:83.725-10.4625*d/36}}}}};
for(const p of[.25,.75,0]){const frame=measureBrowserFrame(s,p);assert.equal(frame.p,p);assert.equal(frame.d,p*36);assert.equal(frame.rho,Math.min(7,p*36))}
assert.equal(measuredLengths,3);assert.deepEqual(measuredPoints,[9,27,0]);assert.deepEqual(attrs,{d:s.revealPath});assert.equal(measurementPath.ownerSVGElement,measurementSVG);assert.equal(measurementSVG.isConnected,true);assert.ok(measurementSVG.style.cssText.includes('left:-10000px'));assert.equal(svgAttrs['data-growing-measurement'],'offscreen-only');assert.equal(browserMetrics().p,0);
const denyConnection=fn=>{assert.throws(fn);connectionNegatives++};
for(const p of[-.1,1.1,NaN])denyConnection(()=>measureBrowserFrame(s,p));
measurementPath.isConnected=false;denyConnection(()=>measureBrowserFrame(s,.2));measurementPath.isConnected=true;
measurementSVG.isConnected=false;denyConnection(()=>measureBrowserFrame(s,.2));measurementSVG.isConnected=true;
measurementPath.ownerSVGElement={};denyConnection(()=>measureBrowserFrame(s,.2));measurementPath.ownerSVGElement=measurementSVG;
measurementPath.parentNode={};denyConnection(()=>measureBrowserFrame(s,.2));measurementPath.parentNode=measurementSVG;
attrs.pathLength='1';denyConnection(()=>measureBrowserFrame(s,.2));delete attrs.pathLength;
attrs.transform='translate(1)';denyConnection(()=>measureBrowserFrame(s,.2));delete attrs.transform;
svgAttrs.transform='scale(2)';denyConnection(()=>measureBrowserFrame(s,.2));delete svgAttrs.transform;
const savedD=attrs.d;attrs.d+=' ';denyConnection(()=>measureBrowserFrame(s,.2));attrs.d=savedD;
pointHook=d=>{attrs.pathLength='1';return{x:32,y:83}};denyConnection(()=>measureBrowserFrame(s,.2));pointHook=null;delete attrs.pathLength;
lengthHook=()=>{measurementPath.ownerSVGElement={}};denyConnection(()=>measureBrowserFrame(s,.2));lengthHook=null;measurementPath.ownerSVGElement=measurementSVG;
pointHook=d=>({x:NaN,y:0});denyConnection(()=>measureBrowserFrame(s,.2));pointHook=null;
pointHook=d=>({x:32.341,y:83.725});denyConnection(()=>measureBrowserFrame(s,0));pointHook=null;
pointHook=d=>({x:32.34,y:83.725});const exactStart=measureBrowserFrame(s,0);assert.deepEqual(exactStart.point,[32.34,83.725]);pointHook=null;delete globalThis.document;
deny(()=>renderGrowingCaps(strokes,0,.1));deny(()=>renderGrowingCaps(strokes,7,NaN));deny(()=>renderGrowingCaps(strokes,7,.9,'bad',()=>({...growingState(s,.1,36,[0,0])})));
const server=readFileSync(path.join(here,'serve.py'),'utf8'),render=readFileSync(path.join(here,'render.mjs'),'utf8');assert.ok(server.includes("CONFIG_SHA='"+sha(readFileSync(path.join(here,'config.json')))+"'"));assert.ok(server.includes("RENDER_SHA='"+sha(render)+"'"));assert.ok(server.includes("('127.0.0.1',args.port)"));assert.ok(!/subprocess|importlib|child_process/.test(server));assert.ok(server.includes('width:520px;height:520px'));assert.ok(server.includes('.small svg{width:220px;height:220px}'));for(const control of['coverage','rho','fine','coarse','boundary','play'])assert.ok(server.includes('id="'+control+'"'));assert.ok(server.includes('const frame=t=>'));assert.ok(server.includes('/8000'));
console.log(JSON.stringify({focusedPositive:1,negativeChecks:negatives,pins:Object.keys(t.inputSHA256).length,ownRationalCertificate:true,unchangedOtherMasks:true,zeroAndFullContract:true,pointMockCalls:measuredPoints.length,connectionNegatives,mockIsNotBrowserEvidence:true,geometryCompiles:0,engineRuns:0,HTTPRequests:0,serverStarted:false,nativeApproval:false}));
