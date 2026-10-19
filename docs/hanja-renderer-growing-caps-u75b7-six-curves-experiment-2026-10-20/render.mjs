// 疷 고정 원 Q7m2만 표시한다. source geometry/compiler/engine을 호출하지 않는다.
const FIXED_STROKES=[[{"outline":"M58 7 L58 20.5 L52 20.5 L52 6 Z M58 7 L59.5 8 L57 9.5 Z","bounds":[52,6,59.5,20.5],"direction":"down","weight":13}],[{"outline":"M24 18.5 L93 18.5 L93 20.5 L24 20.5 Z M93 18.5 L81 19.5 L87 13.5 Z","bounds":[24,13.5,93,20.5],"direction":"right","weight":69}],[{"outline":"M27 18.5 L27 49 L21 49 L21 15.5 Z M21 49 L27 49 L25.8 50.8 L24 52 L22.2 50.8 Z M27 49 L26.65 55.25 L26 61.15 L24.95 66.7 L23.6 71.85 L21.85 76.6 L19.75 80.95 L17.3 84.9 L14.45 88.35 L11.3 91.35 L7.75 93.85 L7.2 93.1 L9.95 90 L12.35 86.7 L14.5 83.15 L16.35 79.3 L17.85 75.1 L19.1 70.6 L20 65.75 L20.65 60.5 L20.95 54.95 L21 49 Z","bounds":[7.2,15.5,27,93.85],"direction":"curve","weight":76.96051,"revealPath":"M24 19.5 L24 49 Q24 80.5 7.5 93.5","revealWidth":14}],[{"outline":"M7.65 26.9 L9 27.75 L10.4 28.6 L11.75 29.6 L13 30.75 L14.15 32.05 L15.2 33.5 L16.15 35.05 L17.05 36.7 L17.85 38.45 L18.55 40.3 L12.7 41.7 L12.45 40.05 L12.15 38.45 L11.8 36.95 L11.35 35.45 L10.85 34.05 L10.25 32.7 L9.6 31.35 L8.9 30.05 L8.1 28.75 L7.1 27.65 Z M18.55 40.3 L18.15 42.55 L16.3 43.95 L14.05 43.55 L12.7 41.7 Z","bounds":[7.1,26.9,18.55,43.95],"direction":"curve","weight":17.923448,"revealPath":"M7 27 Q13.5 32 16 42.5","revealWidth":14}],[{"outline":"M6.35 61 L7.7 60.6 L9.15 60.15 L10.7 59.6 L12.3 58.95 L13.95 58.25 L15.65 57.45 L17.45 56.6 L19.3 55.7 L21.25 54.75 L23.2 53.6 L23.75 54.35 L22.15 55.95 L20.6 57.55 L19.05 59 L17.55 60.35 L16 61.6 L14.5 62.8 L13 63.85 L11.5 64.85 L10 65.75 L8.55 66.55 Z M8.55 66.55 L5.4 61.4 L6.35 61 Z M8.55 66.55 L10.8 64.05 L10.05 67.6 Z","bounds":[5.4,53.6,23.75,67.6],"direction":"curve","weight":19.293781,"revealPath":"M7 64 Q14.5 61 23.5 54","revealWidth":14}],[{"outline":"M79.6 34 L76 35.05 L72.3 36 L68.6 36.85 L64.8 37.65 L61 38.35 L57.15 38.95 L53.3 39.4 L49.35 39.75 L45.4 39.95 L41.35 39.95 L41.25 39.1 L45.1 38.1 L48.95 37.1 L52.7 36.2 L56.4 35.2 L60.1 34.2 L63.7 33.15 L67.25 32.05 L70.8 30.85 L74.25 29.6 L77.65 28.35 Z M77.2 28.5 L82.5 33 L79.6 34 Z M82.5 33 L82.6 34.55 L79.2 33.1 Z","bounds":[41.25,28.35,82.6,39.95],"direction":"curve","weight":38.749395,"revealPath":"M79.14 31.025 Q61.14 37.225 41.34 39.55","revealWidth":14}],[{"outline":"M44.3 38.55 L44.3 82 L38.3 82 L38.3 35.55 Z","bounds":[38.3,35.55,44.3,82],"direction":"down","weight":41.4625},{"outline":"M32.1 80.65 L34.8 80.1 L37.65 79.5 L40.6 78.85 L43.65 78.1 L46.8 77.3 L50.05 76.45 L53.4 75.55 L56.85 74.6 L60.45 73.7 L64.2 72.8 L64.5 73.65 L61.15 75.5 L57.8 77.15 L54.5 78.65 L51.3 80.05 L48.15 81.35 L45.05 82.55 L42.05 83.65 L39.15 84.65 L36.3 85.6 L33.5 86.5 Z M33.5 86.5 L31.1 80.9 L32.1 80.65 Z M33.5 86.5 L36.05 84.3 L34.85 87.7 Z","bounds":[31.1,72.8,64.5,87.7],"direction":"curve","weight":33.704977,"revealPath":"M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625","revealWidth":14}],[{"outline":"M41.3 55.95 L91.35 55.95 L91.35 57.95 L41.3 57.95 Z M91.35 55.95 L79.35 56.95 L85.35 50.95 Z","bounds":[41.3,50.95,91.35,57.95],"direction":"right","weight":50.04}],[{"outline":"M66.3 35.25 L66.5 43.25 L67.1 50.55 L68.2 57.1 L69.75 62.95 L71.75 68.1 L74.25 72.55 L77.25 76.35 L80.8 79.6 L85 82.25 L89.85 84.35 L87.85 90 L82.15 87.55 L77.15 84.35 L72.85 80.45 L69.25 75.85 L66.3 70.65 L64.05 64.8 L62.3 58.35 L61.15 51.25 L60.5 43.6 L60.3 35.25 Z","bounds":[60.3,35.25,89.85,90],"direction":"curve","weight":57.875031,"revealPath":"M63.3 35.2875 C63.3 63.575 70.14 80.625 88.86 87.2125","revealWidth":14},{"outline":"M89.85 84.35 L91.5 85.9 L91.65 88.2 L90.1 89.85 L87.85 90 Z","bounds":[87.85,84.35,91.65,90],"direction":"right","weight":3.8},{"outline":"M88.85 84.7 L85.85 84.7 L88.85 71.7 L89.85 71.7 Z","bounds":[85.85,71.7,89.85,84.7],"direction":"up","weight":13}],[{"outline":"M34.85 90.05 L77.3 90.05 L77.3 92.05 L34.85 92.05 Z M77.3 90.05 L65.3 91.05 L71.3 85.05 Z","bounds":[34.85,85.05,77.3,92.05],"direction":"right","weight":42.48}]];
const FIXED_MASK={"outline":"M32.1 80.65 L34.8 80.1 L37.65 79.5 L40.6 78.85 L43.65 78.1 L46.8 77.3 L50.05 76.45 L53.4 75.55 L56.85 74.6 L60.45 73.7 L64.2 72.8 L64.5 73.65 L61.15 75.5 L57.8 77.15 L54.5 78.65 L51.3 80.05 L48.15 81.35 L45.05 82.55 L42.05 83.65 L39.15 84.65 L36.3 85.6 L33.5 86.5 Z M33.5 86.5 L31.1 80.9 L32.1 80.65 Z M33.5 86.5 L36.05 84.3 L34.85 87.7 Z","bounds":[31.1,72.8,64.5,87.7],"direction":"curve","weight":33.704977,"revealPath":"M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625","revealWidth":14};
const FIXED_PATH="M32.34 83.725 Q46.379999999999995 80.2375 64.38 73.2625";
const Q0=[32.34,83.725];
const NS='http://www.w3.org/2000/svg';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const ensure=(x,m)=>{if(!x)throw new Error(m)};
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'only exact 疷 10p13m26');return true}
export function targetMask(){return JSON.parse(JSON.stringify(FIXED_MASK))}
export function assertTarget(s){ensure(same(s,FIXED_MASK),'only exact Q7m2 mask');return true}
export function growingState(s,p,L,point){assertTarget(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'local p');ensure(Number.isFinite(L)&&L>=7,'browser length');const d=p*L;ensure(Array.isArray(point)&&point.length===2&&point.every(Number.isFinite),'same frame endpoint');return{p,L,d,r:7,rho:Math.min(7,d),start:[...Q0],point:[...point]}}
let guideNode=null,lastFrame=null;
function assertConnectedGuide(){ensure(guideNode&&guideNode.svg.isConnected&&guideNode.path.isConnected&&guideNode.path.ownerSVGElement===guideNode.svg&&guideNode.path.parentNode===guideNode.svg,'same connected owner SVG/path');ensure(guideNode.path.getAttribute('d')===FIXED_PATH&&!guideNode.path.hasAttribute('pathLength')&&!guideNode.path.hasAttribute('transform')&&!guideNode.svg.hasAttribute('transform'),'same untransformed original guide without pathLength')}
export function measureBrowserFrame(s,p){assertTarget(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'finite requested local p');ensure(typeof document!=='undefined'&&document.body,'connected browser measurement required');if(!guideNode){const svg=document.createElementNS(NS,'svg'),path=document.createElementNS(NS,'path');svg.setAttribute('width','1');svg.setAttribute('height','1');svg.setAttribute('aria-hidden','true');svg.setAttribute('data-growing-measurement','offscreen-only');svg.style.cssText='position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none';path.setAttribute('d',FIXED_PATH);svg.appendChild(path);document.body.appendChild(svg);guideNode={svg,path}}assertConnectedGuide();const L=guideNode.path.getTotalLength();ensure(Number.isFinite(L)&&L>=7,'finite browser length');const point=guideNode.path.getPointAtLength(Math.min(p*L,L));assertConnectedGuide();ensure(Number.isFinite(point.x)&&Number.isFinite(point.y),'finite measured endpoint');if(p===0)ensure(Math.hypot(point.x-Q0[0],point.y-Q0[1])<1e-4,'UA start must match exact original M within float tolerance');lastFrame=growingState(s,p,L,[point.x,point.y]);return lastFrame}
export function browserMetrics(){return lastFrame?JSON.parse(JSON.stringify(lastFrame)):null}
function fullRound(s,id){return '<defs><mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="round" stroke-linejoin="miter"/></mask></defs><path d="'+s.outline+'" mask="url(#'+id+')"/>'}
function growingTarget(s,p,id,frameProvider){assertTarget(s);if(p===0)return '';if(p===1)return fullRound(s,id);const g=frameProvider(s,p);const checked=growingState(s,p,g.L,g.point);ensure(same(g,checked),'frame synchronized with local p');return '<defs><mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="butt" stroke-linejoin="miter" pathLength="1" stroke-dasharray="'+p+' 2" stroke-dashoffset="0"/><circle cx="'+Q0[0]+'" cy="'+Q0[1]+'" r="'+g.rho+'" fill="white"/><circle cx="'+g.point[0]+'" cy="'+g.point[1]+'" r="'+g.rho+'" fill="white"/></mask></defs><path d="'+s.outline+'" mask="url(#'+id+')"/>'}
export function renderOriginal(strokes, stroke, progress, prefix = 'reveal') {
  const all = strokes.map(s => s.map(p => `<path d="${p.outline}"/>`).join(''))
  const current = strokes[stroke-1]
  const weight = current.reduce((n,s) => n+s.weight,0)
  let elapsed = Math.max(0,Math.min(1,progress))*weight
  const pieces = current.map((s,i) => {
    const p = Math.max(0,Math.min(1,elapsed/s.weight)); elapsed -= s.weight
    if (p === 0) return ''
    if (p === 1) return `<path d="${s.outline}"/>`
    const id = `${prefix}-${stroke}-${i}`
    const [x,y,right,bottom] = s.bounds, width=right-x,height=bottom-y
    if (s.direction === 'curve') return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2" stroke-dashoffset="0"/></mask></defs><path d="${s.outline}" mask="url(#${id})"/>`
    const horizontal = s.direction === 'right' || s.direction === 'left'
    const rx = s.direction === 'left' ? right-width*p : x
    const ry = s.direction === 'up' ? bottom-height*p : y
    return `<defs><clipPath id="${id}"><rect x="${rx}" y="${ry}" width="${horizontal?width*p:width}" height="${horizontal?height:height*p}"/></clipPath></defs><path d="${s.outline}" clip-path="url(#${id})"/>`
  }).join('')
  return `<svg viewBox="0 0 100 100"><g fill="#222">${all.slice(0,stroke-1).join('')}${pieces}</g></svg>`
}
export function renderGrowingCaps(strokes, stroke, progress, prefix = 'growing', frameProvider = measureBrowserFrame) {
  assertFixedGeometry(strokes); ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=10,'pen range'); ensure(Number.isFinite(progress)&&progress>=0&&progress<=1,'global p'); ensure(typeof frameProvider==='function','frame provider');
  const all = strokes.map((s,si) => s.map((m,mi) => si===6&&mi===1?fullRound(m,prefix+'-prefix-7-1'):`<path d="${m.outline}"/>`).join(''))
  const current = strokes[stroke-1]
  const weight = current.reduce((n,s) => n+s.weight,0)
  let elapsed = Math.max(0,Math.min(1,progress))*weight
  const pieces = current.map((s,i) => {
    const p = Math.max(0,Math.min(1,elapsed/s.weight)); elapsed -= s.weight
    if (stroke===7 && i===1) return growingTarget(s,progress===1?1:p,prefix+'-7-1',frameProvider)
    if (p === 0) return ''
    if (p === 1) return `<path d="${s.outline}"/>`
    const id = `${prefix}-${stroke}-${i}`
    const [x,y,right,bottom] = s.bounds, width=right-x,height=bottom-y
    if (s.direction === 'curve') return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2" stroke-dashoffset="0"/></mask></defs><path d="${s.outline}" mask="url(#${id})"/>`
    const horizontal = s.direction === 'right' || s.direction === 'left'
    const rx = s.direction === 'left' ? right-width*p : x
    const ry = s.direction === 'up' ? bottom-height*p : y
    return `<defs><clipPath id="${id}"><rect x="${rx}" y="${ry}" width="${horizontal?width*p:width}" height="${horizontal?height:height*p}"/></clipPath></defs><path d="${s.outline}" clip-path="url(#${id})"/>`
  }).join('')
  return `<svg viewBox="0 0 100 100"><g fill="#222">${all.slice(0,stroke-1).join('')}${pieces}</g></svg>`
}
export function renderWhole(strokes,prefix='whole'){assertFixedGeometry(strokes);return '<svg viewBox="0 0 100 100"><g fill="#222">'+strokes.map((pen,pi)=>pen.map((s,mi)=>pi===6&&mi===1?fullRound(s,prefix+'-7-1'):'<path d="'+s.outline+'"/>').join('')).join('')+'</g></svg>'}
export function targetCoverageResidual(s,prefix='coverage'){assertTarget(s);return '<svg viewBox="0 0 100 100"><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/></mask></defs><path d="'+s.outline+'" fill="#e23" mask="url(#'+prefix+')"/></svg>'}


// New isolated six-mask policy. The complete Q7 module above is an immutable byte prefix.
const SIX_SPECS = Object.freeze([
 {pen:3,mask:1,kind:'MLQ',path:'M24 19.5 L24 49 Q24 80.5 7.5 93.5'},
 {pen:4,mask:1,kind:'Q',path:'M7 27 Q13.5 32 16 42.5',t:[1n,2n],norm:8n,cross:56n,K:[11n,200n]},
 {pen:5,mask:1,kind:'Q',path:'M7 64 Q14.5 61 23.5 54',t:[1n,2n],norm:8n,cross:26n,K:[13n,500n]},
 {pen:6,mask:1,kind:'Q',path:'M79.14 31.025 Q61.14 37.225 41.34 39.55',t:[1n,4n],norm:19n,cross:81n,K:[3n,500n]},
 {pen:7,mask:2,kind:'Q7',path:FIXED_PATH},
 {pen:9,mask:1,kind:'C',path:'M63.3 35.2875 C63.3 63.575 70.14 80.625 88.86 87.2125'},
].map(s=>Object.freeze(s)));
const SIX_MASKS = SIX_SPECS.map(s=>{const m=JSON.parse(JSON.stringify(FIXED_STROKES[s.pen-1][s.mask-1]));Object.freeze(m.bounds);return Object.freeze(m)});
Object.freeze(SIX_MASKS);
const sixCertificates=new Map(),sixGuides=new Map(),sixFrames=new Map();
const freezeSixValue=value=>{if(value&&typeof value==='object'){for(const nested of Object.values(value))freezeSixValue(nested);Object.freeze(value)}return value};
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const R=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);ensure(d!==0n,'nonzero rational denominator');if(d<0n){n=-n;d=-d}const g=gcd(n,d);return[n/g,d/g]};
const D=v=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))};
const plus=(a,b)=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a,b)=>plus(a,[-b[0],b[1]]),times=(a,b)=>R(a[0]*b[0],a[1]*b[1]),square=a=>times(a,a),greater=(a,b)=>a[0]*b[1]>b[0]*a[1],absR=a=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=a=>a[0]+'/'+a[1],dotR=(a,b)=>plus(times(a[0],b[0]),times(a[1],b[1]));
function sixSpec(s){const i=SIX_MASKS.findIndex(m=>same(m,s));ensure(i>=0,'only six exact source masks');const spec=SIX_SPECS[i];ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','fixed source guide/width/direction');return spec}
export function sixTargetMask(pen){ensure(arguments.length===1,'one explicit target pen');const spec=SIX_SPECS.find(s=>s.pen===pen);ensure(spec,'explicit six-target pen');return JSON.parse(JSON.stringify(SIX_MASKS[SIX_SPECS.indexOf(spec)]))}
function sourceNumbers(spec){
 const num='(-?\\d+(?:\\.\\d+)?)', patterns={Q:'^M'+num+' '+num+' Q'+num+' '+num+' '+num+' '+num+'$',Q7:'^M'+num+' '+num+' Q'+num+' '+num+' '+num+' '+num+'$',MLQ:'^M'+num+' '+num+' L'+num+' '+num+' Q'+num+' '+num+' '+num+' '+num+'$',C:'^M'+num+' '+num+' C'+num+' '+num+' '+num+' '+num+' '+num+' '+num+'$'};
 const match=new RegExp(patterns[spec.kind]).exec(spec.path);ensure(match,'exact canonical M/L/Q/C arity');return match.slice(1).map(D)
}
export function sixInitialCertificate(s){
 const spec=sixSpec(s);if(sixCertificates.has(spec.pen))return sixCertificates.get(spec.pen);
 const n=sourceNumbers(spec),points=Array.from({length:n.length/2},(_,i)=>n.slice(i*2,i*2+2)),[P0,P1,P2,P3]=points;
 let result;
 if(spec.kind==='MLQ'){
  const v=P1.map((x,i)=>minus(x,P0[i])),q=P2.map((x,i)=>minus(x,P1[i]));
  ensure(rString(v[0])==='0/1'&&rString(v[1])==='59/2'&&greater(v[1],R(7)),'exact original initial L29.5');
  ensure(rString(q[0])==='0/1'&&greater(q[1],R(0)),'original L/Q positive vertical tangent');
  result={kind:'initial-line',firstL:'59/2',curvatureUpper:'0/1',rKUpper:'0/1',initialArcMax:7}
 }else if(spec.kind==='Q7'){
  // Previously verified Q7 certificate and implementation are retained; do not widen or recompute them.
  assertTarget(s);result={kind:'preserved-Q7',tUpper:'1/4',curvatureUpper:'1/150',rKUpper:'7/150',initialArcMax:7,existingCertificatePreserved:true}
 }else if(spec.kind==='Q'){
  const A=P1.map((v,i)=>minus(v,P0[i])),B=P0.map((v,i)=>plus(minus(v,times(R(2),P1[i])),P2[i])),t=R(...spec.t),lo=R(spec.norm),cross=absR(minus(times(A[0],B[1]),times(A[1],B[0]))),K=R(...spec.K),kr=times(R(7),K);
  const chord=A.map((v,i)=>plus(times(times(R(2),v),t),times(B[i],square(t)))),chord2=dotR(chord,chord),speed2=dotR(A,A),AB=dotR(A,B);
  ensure(greater(AB,R(0))&&greater(speed2,square(lo)),'fixed quadratic speed norm increasing and strict lower bound');
  ensure(greater(R(spec.cross),cross)&&greater(times(times(R(2),times(square(lo),lo)),K),R(spec.cross)),'exact quadratic curvature upper bound');
  ensure(greater(chord2,R(49)),'arc7 occurs before fixed t');
  const cosLower=minus(R(1),times(R(1,2),square(kr)));ensure(greater(cosLower,kr),'initial normal-strip cosine lower bound');
  result={kind:'source-specific-Q',A:A.map(rString),B:B.map(rString),crossAbs:rString(cross),speedSquaredAtZero:rString(speed2),speedDot:rString(AB),halfSpeedLower:rString(lo),tUpper:rString(t),chordSquared:rString(chord2),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower),initialArcMax:7}
 }else{
  const v0=P1.map((v,i)=>minus(v,P0[i])),v1=P2.map((v,i)=>minus(v,P1[i])),v2=P3.map((v,i)=>minus(v,P2[i])),dv0=v1.map((v,i)=>minus(v,v0[i])),dv1=v2.map((v,i)=>minus(v,v1[i])),T=R(1,8),u=minus(R(1),T);
  ensure(greater(v0[1],v1[1])&&greater(v1[1],v2[1])&&greater(v2[1],R(0)),'exact decreasing positive cubic derivative Bernstein y controls');
  const ymin=times(R(3),plus(plus(times(square(u),v0[1]),times(times(times(R(2),u),T),v1[1])),times(square(T),v2[1])));
  const a=dotR(dv0,dv0),b=dotR(dv1,dv1),M2=times(R(36),greater(a,b)?a:b);
  const chord=P0.map((_,i)=>minus(plus(plus(times(times(square(u),u),P0[i]),times(times(times(R(3),square(u)),T),P1[i])),plus(times(times(times(R(3),u),square(T)),P2[i]),times(times(square(T),T),P3[i]))),P0[i])),chord2=dotR(chord,chord),K=R(1,50),kr=R(7,50);
  ensure(rString(ymin)==='39153/512'&&rString(M2)==='360861561/40000'&&rString(chord2)==='8536867781/83886080','exact original C9 rational bounds');
  ensure(greater(chord2,R(49))&&greater(times(square(K),square(square(ymin))),M2),'C9 arc7 and curvature bound');
  const cosLower=minus(R(1),times(R(1,2),square(kr)));ensure(greater(cosLower,kr),'C9 initial normal-strip cosine lower bound');
  result={kind:'fixed-C-only',tUpper:'1/8',derivativeYLower:rString(ymin),secondDerivativeNormSquaredUpper:rString(M2),chordSquared:rString(chord2),curvatureUpper:'1/50',rKUpper:'7/50',cosLower:rString(cosLower),initialArcMax:7}
 }
 const frozen=freezeSixValue({...result,exactDecimalRational:true,notPolygonConnectivityProof:true,notUAPixelProof:true,notFullSweepProof:true});sixCertificates.set(spec.pen,frozen);return frozen
}
function sixSource(s){const spec=sixSpec(s),n=sourceNumbers(spec);sixInitialCertificate(s);return{spec,start:[Number(n[0][0])/Number(n[0][1]),Number(n[1][0])/Number(n[1][1])],r:7,path:spec.path}}
export function sixGrowingState(s,p,L,point){
 const source=sixSource(s);if(source.spec.pen===7)return growingState(s,p,L,point);
 ensure(Number.isFinite(p)&&p>=0&&p<=1,'finite exact local p');ensure(Number.isFinite(L)&&L>=7,'finite original UA length');ensure(Array.isArray(point)&&point.length===2&&point.every(Number.isFinite),'finite same-frame endpoint');const d=Math.min(p*L,L);return{p,L,d,r:7,rho:Math.min(7,d),start:[...source.start],point:[...point]}
}
function assertSixGuide(g,source){
 ensure(g&&g.svg.isConnected&&g.path.isConnected&&document.body===g.body&&g.svg.parentNode===g.body&&g.path.ownerSVGElement===g.svg&&g.path.parentNode===g.svg,'same connected original path/owner/parent');
 ensure(g.path.getAttribute('d')===source.path&&!g.path.hasAttribute('pathLength')&&!g.path.hasAttribute('transform')&&!g.svg.hasAttribute('transform'),'same original guide without pathLength/transforms');
 ensure(typeof getComputedStyle==='function'&&getComputedStyle(g.path).transform==='none'&&getComputedStyle(g.svg).transform==='none','untransformed path and SVG computed styles')
}
export function measureSixBrowserFrame(s,p){
 const source=sixSource(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'finite requested local p');ensure(typeof document!=='undefined'&&document.body,'connected browser measurement required');
 let g=sixGuides.get(source.spec.pen);
 if(!g){const svg=document.createElementNS(NS,'svg'),path=document.createElementNS(NS,'path');svg.setAttribute('width','1');svg.setAttribute('height','1');svg.setAttribute('aria-hidden','true');svg.setAttribute('data-growing-measurement','six-fixed-source-only');svg.style.cssText='position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none;transform:none';path.setAttribute('d',source.path);svg.appendChild(path);document.body.appendChild(svg);g={svg,path,body:document.body};sixGuides.set(source.spec.pen,g)}
 assertSixGuide(g,source);const L=g.path.getTotalLength();assertSixGuide(g,source);ensure(Number.isFinite(L)&&L>=7,'finite UA original guide length');const point=g.path.getPointAtLength(Math.min(p*L,L));assertSixGuide(g,source);ensure(Number.isFinite(point.x)&&Number.isFinite(point.y),'finite UA original endpoint');
 if(p===0)ensure(Math.hypot(point.x-source.start[0],point.y-source.start[1])<1e-4,'original M float tolerance1e-4');
 const frame=sixGrowingState(s,p,L,[point.x,point.y]);sixFrames.set(source.spec.pen,frame);return frame
}
export function sixBrowserMetrics(){return JSON.parse(JSON.stringify([...sixFrames].map(([pen,frame])=>({pen,...frame}))))}
function sixTarget(s,p,id,provider){
 const source=sixSource(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'exact local p0..1');
 if(source.spec.pen===7)return growingTarget(s,p,id,provider);
 if(p===0)return '';if(p===1)return fullRound(s,id);
 const frame=provider(s,p),checked=sixGrowingState(s,p,frame.L,frame.point);ensure(same(frame,checked),'same-frame source/p/length/endpoint');
 return '<defs><mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="butt" stroke-linejoin="miter" pathLength="1" stroke-dasharray="'+p+' 2" stroke-dashoffset="0"/><circle cx="'+frame.start[0]+'" cy="'+frame.start[1]+'" r="'+frame.rho+'" fill="white"/><circle cx="'+frame.point[0]+'" cy="'+frame.point[1]+'" r="'+frame.rho+'" fill="white"/></mask></defs><path d="'+s.outline+'" mask="url(#'+id+')"/>'
}
function isSix(si,mi){return SIX_SPECS.some(s=>s.pen===si+1&&s.mask===mi+1)}
export function renderSixGrowingCaps(strokes, stroke, progress, prefix = 'growing', frameProvider = measureSixBrowserFrame) {
  assertFixedGeometry(strokes); ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=10,'pen range'); ensure(Number.isFinite(progress)&&progress>=0&&progress<=1,'global p'); ensure(typeof frameProvider==='function','frame provider');
  const all = strokes.map((s,si) => s.map((m,mi) => isSix(si,mi)?fullRound(m,prefix+'-prefix-'+(si+1)+'-'+mi):`<path d="${m.outline}"/>`).join(''))
  const current = strokes[stroke-1]
  const weight = current.reduce((n,s) => n+s.weight,0)
  let elapsed = Math.max(0,Math.min(1,progress))*weight
  const pieces = current.map((s,i) => {
    const p = Math.max(0,Math.min(1,elapsed/s.weight)); elapsed -= s.weight
    if (isSix(stroke-1,i)) return sixTarget(s,progress===1?1:p,prefix+'-'+stroke+'-'+i,frameProvider)
    if (p === 0) return ''
    if (p === 1) return `<path d="${s.outline}"/>`
    const id = `${prefix}-${stroke}-${i}`
    const [x,y,right,bottom] = s.bounds, width=right-x,height=bottom-y
    if (s.direction === 'curve') return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2" stroke-dashoffset="0"/></mask></defs><path d="${s.outline}" mask="url(#${id})"/>`
    const horizontal = s.direction === 'right' || s.direction === 'left'
    const rx = s.direction === 'left' ? right-width*p : x
    const ry = s.direction === 'up' ? bottom-height*p : y
    return `<defs><clipPath id="${id}"><rect x="${rx}" y="${ry}" width="${horizontal?width*p:width}" height="${horizontal?height:height*p}"/></clipPath></defs><path d="${s.outline}" clip-path="url(#${id})"/>`
  }).join('')
  return `<svg viewBox="0 0 100 100"><g fill="#222">${all.slice(0,stroke-1).join('')}${pieces}</g></svg>`
}
export function renderSixWhole(strokes,prefix='whole-six'){assertFixedGeometry(strokes);return '<svg viewBox="0 0 100 100"><g fill="#222">'+strokes.map((pen,pi)=>pen.map((s,mi)=>isSix(pi,mi)?fullRound(s,prefix+'-'+(pi+1)+'-'+mi):'<path d="'+s.outline+'"/>').join('')).join('')+'</g></svg>'}
export function sixCoverageResidual(s,prefix='coverage-six'){sixSpec(s);return '<svg viewBox="0 0 100 100"><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/></mask></defs><path d="'+s.outline+'" fill="#e23" mask="url(#'+prefix+')"/></svg>'}
