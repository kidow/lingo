// Isolated renderer experiment only. Fixed source geometry is never regenerated.
const FIXED_TARGETS=[{"pen":12,"mask":2,"raw":13,"value":{"outline":"M27.85 86.45 L30.3 85.8 L32.8 85.2 L35.35 84.55 L37.9 83.9 L40.45 83.25 L43.05 82.65 L45.7 82.05 L48.35 81.45 L51.05 80.95 L53.8 80.55 L54.1 81.4 L51.65 82.75 L49.2 84 L46.75 85.15 L44.25 86.25 L41.8 87.3 L39.35 88.3 L36.9 89.3 L34.5 90.3 L32.05 91.25 L29.65 92.15 Z M29.65 92.15 L26.9 86.75 L27.85 86.45 Z M29.65 92.15 L32.05 89.85 L31.05 93.3 Z","bounds":[26.9,80.55,54.1,93.3],"direction":"curve","weight":27.047008,"revealPath":"M28.295 89.495 Q40.935 85.445 53.97 80.99000000000001","revealWidth":14}},{"pen":15,"mask":2,"raw":15,"value":{"outline":"M49.1 86.9 L51.8 86.1 L54.55 85.3 L57.35 84.5 L60.15 83.75 L62.95 82.95 L65.8 82.2 L68.65 81.5 L71.55 80.8 L74.5 80.25 L77.5 79.75 L77.8 80.6 L75.1 82 L72.45 83.35 L69.75 84.6 L67.05 85.8 L64.35 87 L61.65 88.1 L59 89.25 L56.35 90.35 L53.7 91.45 L51.05 92.55 Z M51.05 92.55 L48.15 87.2 L49.1 86.9 Z M51.05 92.55 L53.4 90.15 L52.5 93.6 Z","bounds":[48.15,79.75,77.8,93.6],"direction":"curve","weight":29.681651,"revealPath":"M49.625 89.9 Q63.45 85.04 77.67 80.18","revealWidth":14}},{"pen":18,"mask":1,"raw":16,"value":{"outline":"M83.8 55.6 L83.75 61.95 L83.95 67.6 L84.4 72.6 L85.05 76.85 L85.95 80.4 L87 83.25 L88.15 85.3 L89.35 86.6 L90.5 87.35 L91.8 87.7 L91.15 93.65 L88.1 92.85 L85.4 91.15 L83.25 88.75 L81.55 85.75 L80.2 82.15 L79.2 78.05 L78.45 73.3 L78 68 L77.75 62.05 L77.8 55.5 Z M77.8 56 L77.8 54.3 L83.8 55.6 Z M83.8 55.6 L85.25 56.65 L82.75 58.1 Z M91.8 87.7 L93.8 88.8 L94.45 91 L93.35 93 L91.15 93.65 Z","bounds":[77.75,54.3,94.45,93.65],"direction":"curve","weight":37.201503,"revealPath":"M80.83 55.07 Q80.03999999999999 89.495 91.495 90.71","revealWidth":14}}];
const FIXED_STROKES=[[{"outline":"M58 7 L58 20.5 L52 20.5 L52 6 Z M58 7 L59.5 8 L57 9.5 Z","bounds":[52,6,59.5,20.5],"direction":"down","weight":13}],[{"outline":"M24 18.5 L93 18.5 L93 20.5 L24 20.5 Z M93 18.5 L81 19.5 L87 13.5 Z","bounds":[24,13.5,93,20.5],"direction":"right","weight":69}],[{"outline":"M26.75 18.5 L26.75 49 L21.25 49 L21.25 15.75 Z M21.25 49 L26.75 49 L25.65 50.65 L24 51.75 L22.35 50.65 Z M26.75 49 L26.4 55.25 L25.75 61.1 L24.75 66.65 L23.4 71.8 L21.65 76.55 L19.6 80.85 L17.15 84.8 L14.4 88.3 L11.2 91.3 L7.75 93.8 L7.2 93.15 L10 90.1 L12.45 86.75 L14.6 83.2 L16.45 79.35 L18.05 75.15 L19.3 70.65 L20.25 65.8 L20.85 60.55 L21.2 54.95 L21.25 49 Z","bounds":[7.2,15.75,26.75,93.8],"direction":"curve","weight":76.96051,"revealPath":"M24 19.5 L24 49 Q24 80.5 7.5 93.5","revealWidth":14}],[{"outline":"M7.65 26.9 L9 27.75 L10.4 28.6 L11.75 29.6 L13 30.75 L14.15 32.05 L15.2 33.5 L16.15 35.05 L17.05 36.7 L17.85 38.45 L18.55 40.3 L12.7 41.7 L12.45 40.05 L12.15 38.45 L11.8 36.95 L11.35 35.45 L10.85 34.05 L10.25 32.7 L9.6 31.35 L8.9 30.05 L8.1 28.75 L7.1 27.65 Z M18.55 40.3 L18.15 42.55 L16.3 43.95 L14.05 43.55 L12.7 41.7 Z","bounds":[7.1,26.9,18.55,43.95],"direction":"curve","weight":17.923448,"revealPath":"M7 27 Q13.5 32 16 42.5","revealWidth":14}],[{"outline":"M6.35 61 L7.7 60.6 L9.15 60.15 L10.7 59.6 L12.3 58.95 L13.95 58.25 L15.65 57.45 L17.45 56.6 L19.3 55.7 L21.25 54.75 L23.2 53.6 L23.75 54.35 L22.15 55.95 L20.6 57.55 L19.05 59 L17.55 60.35 L16 61.6 L14.5 62.8 L13 63.85 L11.5 64.85 L10 65.75 L8.55 66.55 Z M8.55 66.55 L5.4 61.4 L6.35 61 Z M8.55 66.55 L10.8 64.05 L10.05 67.6 Z","bounds":[5.4,53.6,23.75,67.6],"direction":"curve","weight":19.293781,"revealPath":"M7 64 Q14.5 61 23.5 54","revealWidth":14}],[{"outline":"M59.1 27.6 L56.9 28.4 L54.7 29.15 L52.45 29.85 L50.2 30.45 L47.9 31.05 L45.55 31.55 L43.2 32 L40.8 32.4 L38.35 32.65 L35.9 32.8 L35.65 31.95 L37.9 30.9 L40.1 29.9 L42.3 29 L44.45 28.05 L46.55 27.1 L48.65 26.15 L50.65 25.2 L52.7 24.2 L54.65 23.2 L56.6 22.15 Z M56.15 22.35 L60.95 26.75 L59.1 27.6 Z M60.95 26.75 L61 28.35 L57.9 27.05 Z","bounds":[35.65,22.15,61,32.8],"direction":"curve","weight":23.79366,"revealPath":"M58.315 24.695 Q47.65 29.555 35.8 32.39","revealWidth":14}],[{"outline":"M38.55 31.35 L38.55 52.4 L33.05 55.15 L33.05 28.6 Z","bounds":[33.05,28.6,38.55,55.15],"direction":"down","weight":19.035}],[{"outline":"M35.8 40.3 L57.1 40.3 L57.1 42.3 L35.8 42.3 Z M57.1 40.3 L47.1 41.3 L52.1 35.8 Z","bounds":[35.8,35.8,57.1,42.3],"direction":"right","weight":21.33}],[{"outline":"M62.65 30.95 L83.2 30.95 L83.2 32.95 L62.65 32.95 Z M86.2 31.95 L86.2 52.4 L80.2 55.4 L80.2 31.95 Z M80.2 30.95 L83.2 28.45 L88.7 32.95 L86.2 34.95 L80.2 31.95 Z","bounds":[62.65,28.45,88.7,55.4],"direction":"curve","weight":39.98,"revealPath":"M62.66 31.985 L83.2 31.985 L83.2 51.425","revealWidth":14}],[{"outline":"M64.2 40.3 L83.2 40.3 L83.2 42.3 L64.2 42.3 Z","bounds":[64.2,40.3,83.2,42.3],"direction":"right","weight":18.96}],[{"outline":"M35.8 50.4 L83.2 50.4 L83.2 52.4 L35.8 52.4 Z","bounds":[35.8,50.4,83.2,52.4],"direction":"right","weight":47.4}],[{"outline":"M39.95 55.95 L39.95 85.6 L33.95 85.6 L33.95 54.95 Z M39.95 55.95 L41.45 56.95 L38.95 58.45 Z","bounds":[33.95,54.95,41.45,85.6],"direction":"down","weight":29.16},{"outline":"M27.85 86.45 L30.3 85.8 L32.8 85.2 L35.35 84.55 L37.9 83.9 L40.45 83.25 L43.05 82.65 L45.7 82.05 L48.35 81.45 L51.05 80.95 L53.8 80.55 L54.1 81.4 L51.65 82.75 L49.2 84 L46.75 85.15 L44.25 86.25 L41.8 87.3 L39.35 88.3 L36.9 89.3 L34.5 90.3 L32.05 91.25 L29.65 92.15 Z M29.65 92.15 L26.9 86.75 L27.85 86.45 Z M29.65 92.15 L32.05 89.85 L31.05 93.3 Z","bounds":[26.9,80.55,54.1,93.3],"direction":"curve","weight":27.047008,"revealPath":"M28.295 89.495 Q40.935 85.445 53.97 80.99000000000001","revealWidth":14}],[{"outline":"M43.15 56.15 L44.3 56.75 L45.55 57.1 L46.7 57.55 L47.8 58.05 L48.9 58.6 L49.9 59.15 L50.9 59.75 L51.8 60.4 L52.7 61.05 L53.5 61.8 L48.65 65.35 L48.35 64.6 L48 63.8 L47.6 63 L47.1 62.2 L46.55 61.35 L45.9 60.45 L45.2 59.6 L44.45 58.65 L43.7 57.65 L42.7 56.9 Z M53.5 61.8 L54 64 L52.85 66 L50.65 66.5 L48.65 65.35 Z","bounds":[42.7,56.15,54,66.5],"direction":"curve","weight":12.735989,"revealPath":"M42.515 56.285 Q48.44 59.93 51.995000000000005 64.78999999999999","revealWidth":14}],[{"outline":"M42.75 65.9 L43.85 66.45 L45.1 66.9 L46.25 67.45 L47.4 68.1 L48.5 68.8 L49.6 69.55 L50.65 70.35 L51.7 71.25 L52.65 72.2 L53.65 73.2 L48.65 76.55 L48.15 75.45 L47.65 74.45 L47.1 73.4 L46.55 72.4 L45.9 71.4 L45.3 70.4 L44.6 69.4 L43.9 68.45 L43.15 67.45 L42.25 66.65 Z M53.65 73.2 L54.05 75.45 L52.8 77.35 L50.55 77.75 L48.65 76.55 Z","bounds":[42.25,65.9,54.05,77.75],"direction":"curve","weight":14.14324,"revealPath":"M42.120000000000005 66.005 Q47.65 69.65 51.995000000000005 76.13","revealWidth":14}],[{"outline":"M62.5 55.55 L62.5 86.85 L56.5 86.85 L56.5 54.55 Z M62.5 55.55 L64 56.55 L61.5 58.05 Z","bounds":[56.5,54.55,64,86.85],"direction":"down","weight":30.78},{"outline":"M49.1 86.9 L51.8 86.1 L54.55 85.3 L57.35 84.5 L60.15 83.75 L62.95 82.95 L65.8 82.2 L68.65 81.5 L71.55 80.8 L74.5 80.25 L77.5 79.75 L77.8 80.6 L75.1 82 L72.45 83.35 L69.75 84.6 L67.05 85.8 L64.35 87 L61.65 88.1 L59 89.25 L56.35 90.35 L53.7 91.45 L51.05 92.55 Z M51.05 92.55 L48.15 87.2 L49.1 86.9 Z M51.05 92.55 L53.4 90.15 L52.5 93.6 Z","bounds":[48.15,79.75,77.8,93.6],"direction":"curve","weight":29.681651,"revealPath":"M49.625 89.9 Q63.45 85.04 77.67 80.18","revealWidth":14}],[{"outline":"M64.85 56.1 L66.1 56.7 L67.4 57.1 L68.6 57.55 L69.8 58.05 L70.9 58.55 L71.95 59.15 L72.95 59.75 L73.9 60.4 L74.8 61.05 L75.65 61.8 L70.8 65.35 L70.5 64.6 L70.15 63.85 L69.7 63.05 L69.15 62.2 L68.6 61.35 L67.9 60.5 L67.15 59.6 L66.35 58.65 L65.5 57.7 L64.4 56.9 Z M75.65 61.8 L76.15 64 L75 66 L72.75 66.5 L70.8 65.35 Z","bounds":[64.4,56.1,76.15,66.5],"direction":"curve","weight":13.032676,"revealPath":"M64.24000000000001 56.285 Q70.56 59.93 74.11500000000001 64.78999999999999","revealWidth":14}],[{"outline":"M64.5 65.9 L65.6 66.45 L66.8 66.9 L68 67.45 L69.15 68.1 L70.25 68.8 L71.35 69.55 L72.4 70.35 L73.4 71.25 L74.4 72.2 L75.35 73.2 L70.35 76.55 L69.9 75.45 L69.4 74.45 L68.85 73.4 L68.25 72.4 L67.65 71.4 L67 70.4 L66.35 69.4 L65.6 68.45 L64.9 67.45 L64 66.65 Z M75.35 73.2 L75.75 75.45 L74.55 77.35 L72.3 77.75 L70.35 76.55 Z","bounds":[64,65.9,75.75,77.75],"direction":"curve","weight":14.14324,"revealPath":"M63.845 66.005 Q69.375 69.65 73.72 76.13","revealWidth":14}],[{"outline":"M83.8 55.6 L83.75 61.95 L83.95 67.6 L84.4 72.6 L85.05 76.85 L85.95 80.4 L87 83.25 L88.15 85.3 L89.35 86.6 L90.5 87.35 L91.8 87.7 L91.15 93.65 L88.1 92.85 L85.4 91.15 L83.25 88.75 L81.55 85.75 L80.2 82.15 L79.2 78.05 L78.45 73.3 L78 68 L77.75 62.05 L77.8 55.5 Z M77.8 56 L77.8 54.3 L83.8 55.6 Z M83.8 55.6 L85.25 56.65 L82.75 58.1 Z M91.8 87.7 L93.8 88.8 L94.45 91 L93.35 93 L91.15 93.65 Z","bounds":[77.75,54.3,94.45,93.65],"direction":"curve","weight":37.201503,"revealPath":"M80.83 55.07 Q80.03999999999999 89.495 91.495 90.71","revealWidth":14},{"outline":"M91.45 88.2 L88.45 88.2 L91.45 75.2 L92.45 75.2 Z","bounds":[88.45,75.2,92.45,88.2],"direction":"up","weight":12.5}]];
const ensure=(v,m)=>{if(!v)throw Error(m)};
export function targetMask(pen){ensure(arguments.length===1,'explicit target pen required');const t=FIXED_TARGETS.find(t=>t.pen===pen);ensure(t,'only fixed target12 or15 or18');return JSON.parse(JSON.stringify(t.value))}
export function sourceStart(s){
 ensure(FIXED_TARGETS.some(t=>JSON.stringify(s)===JSON.stringify(t.value)),'exact one of three fixed masks required');
 const match=/^M([-\d.]+) ([-\d.]+) Q([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)$/.exec(s.revealPath);
 ensure(match,'only fixed single Q guide');const [x,y,cx,cy,ex,ey]=match.slice(1).map(Number);const len=Math.hypot(cx-x,cy-y);ensure(len>0,'nondegenerate source tangent');
 return {q:[x,y],v:[(cx-x)/len,(cy-y)/len],control:[cx,cy],end:[ex,ey],r:s.revealWidth/2};
}
const measured=new Map();
export function browserGuideLength(s){
 sourceStart(s);ensure(typeof document!=='undefined','browser length provider required outside browser');
 if(!measured.has(s.revealPath)){const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',s.revealPath);const L=p.getTotalLength();ensure(Number.isFinite(L)&&L>0,'finite browser guide length');measured.set(s.revealPath,L)}
 return measured.get(s.revealPath);
}
export function gateState(s,p,L){
 const start=sourceStart(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'finite local progress0..1');ensure(Number.isFinite(L)&&L>0,'positive measured guide length');
 const tau=Math.min(1,s.revealWidth/L),fraction=Math.min(p/tau,1);return {...start,L,tau,fraction,h:-start.r+2*start.r*fraction,projectionMin:-start.r,projectionMax:start.r};
}
export function gateAllows(x,y,g){const dx=x-g.q[0],dy=y-g.q[1];return dx*dx+dy*dy>g.r*g.r || dx*g.v[0]+dy*g.v[1]<=g.h}
export function startDiscAreaBound(g){return Math.min(Math.PI*g.r*g.r,2*g.r*Math.max(0,g.h+g.r))}
function sweptTarget(s,p,id,lengthProvider){
 if(p<=0)return '';const g=gateState(s,p,lengthProvider(s));const [x,y]=g.q,[vx,vy]=g.v,nx=-vy,ny=vx;
 const corner=(u,t)=>[x+u*vx+t*nx,y+u*vy+t*ny];const corners=[corner(-g.r,-g.r),corner(g.h,-g.r),corner(g.h,g.r),corner(-g.r,g.r)];
 const polygon=corners.map(v=>v.join(',')).join(' ');
 const gate=p>=g.tau?'':`<clipPath id="${id}-disc"><circle cx="${x}" cy="${y}" r="${g.r}"/></clipPath><mask id="${id}-gate" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect x="0" y="0" width="100" height="100" fill="white"/><circle cx="${x}" cy="${y}" r="${g.r}" fill="black"/><g clip-path="url(#${id}-disc)"><polygon points="${polygon}" fill="white"/></g></mask>`;
 const sweep=`<defs><mask id="${id}-sweep" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2" stroke-dashoffset="0"/></mask>${gate}</defs><path d="${s.outline}" mask="url(#${id}-sweep)"/>`;
 return gate?`<g mask="url(#${id}-gate)">${sweep}</g>`:sweep;
}
function ordinary(s,p,id){
 if(p<=0)return '';if(p>=1)return `<path d="${s.outline}"/>`;
 if(s.direction==='curve')return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${s.revealPath}" fill="none" stroke="white" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="${p} 2" stroke-dashoffset="0"/></mask></defs><path d="${s.outline}" mask="url(#${id})"/>`;
 const [x,y,right,bottom]=s.bounds,w=right-x,h=bottom-y,horizontal=s.direction==='right'||s.direction==='left';return `<defs><clipPath id="${id}"><rect x="${s.direction==='left'?right-w*p:x}" y="${s.direction==='up'?bottom-h*p:y}" width="${horizontal?w*p:w}" height="${horizontal?h:h*p}"/></clipPath></defs><path d="${s.outline}" clip-path="url(#${id})"/>`;
}
export function renderStartGate(strokes,stroke,progress,prefix='gate',lengthProvider=browserGuideLength){
 ensure(Array.isArray(strokes)&&strokes.length===18&&Number.isInteger(stroke)&&stroke>=1&&stroke<=18,'fixed pen range');ensure(JSON.stringify(strokes)===JSON.stringify(FIXED_STROKES),'exact full original strokes required');for(const t of FIXED_TARGETS)ensure(JSON.stringify(strokes[t.pen-1][t.mask-1])===JSON.stringify(t.value),'target geometry changed');ensure(Number.isFinite(progress),'finite progress');ensure(/^[a-zA-Z][\w-]*$/.test(prefix),'safe SVG prefix');
 const p=Math.max(0,Math.min(1,progress));let body='';
 for(let pen=0;pen<stroke;pen++){const masks=strokes[pen];let elapsed=(pen<stroke-1?1:p)*masks.reduce((s,m)=>s+m.weight,0);masks.forEach((s,i)=>{const local=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const id=prefix+'-'+(pen+1)+'-'+i;body+=FIXED_TARGETS.some(t=>t.pen===pen+1&&t.mask===i+1)?sweptTarget(s,local,id,lengthProvider):ordinary(s,local,id)})}
 return '<svg viewBox="0 0 100 100" data-renderer="start-gate-experiment"><g fill="#222">'+body+'</g></svg>';
}
export function targetCoverageResidual(s,prefix='residual'){
 sourceStart(s);ensure(/^[a-zA-Z][\w-]*$/.test(prefix),'safe SVG prefix');return `<svg viewBox="0 0 100 100" data-coverage="P-minus-full-round-sweep"><defs><mask id="${prefix}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="${s.revealPath}" fill="none" stroke="black" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 2"/></mask></defs><path d="${s.outline}" fill="#d22" mask="url(#${prefix})"/></svg>`;
}
export const nativeApproval=false,runtimeApplied=false;


// Separate source-only policy. Everything above is the prior renderer byte for byte.
export function growingCapsSource(s){
 ensure(JSON.stringify(s)===JSON.stringify(targetMask(18)),'only exact u7659 pen18 mask1 Q-only body');
 const original='M80.83 55.07 Q80.03999999999999 89.495 91.495 90.71';
 ensure(s.revealPath===original&&s.revealWidth===14&&s.weight===37.201503,'exact original Q/body width and timing');
 const start=sourceStart(s);ensure(start.q[0]===80.83&&start.q[1]===55.07&&start.r===7,'exact Q start and radius');
 const A=[start.control[0]-start.q[0],start.control[1]-start.q[1]],B=[start.q[0]-2*start.control[0]+start.end[0],start.q[1]-2*start.control[1]+start.end[1]];
 const dyAtOneEighth=2*A[1]/8+B[1]/64,velocityYLower=A[1]+B[1]/8,cross=Math.abs(A[0]*B[1]-A[1]*B[0]);
 ensure(dyAtOneEighth>7&&velocityYLower>30&&cross<396&&B[1]<0,'fixed initial-arc certificate bounds changed');
 return{q0:[...start.q],r:start.r,A,B,initialParameterUpperBound:1/8,curvatureUpperBound:11/1500,initialOffsetRadius:7,guide:original};
}
export function growingCapsState(s,p,L,point){
 const source=growingCapsSource(s);
 ensure(Number.isFinite(p)&&p>=0&&p<=1,'finite local progress0..1');
 ensure(Number.isFinite(L)&&L>=source.r,'browser guide length must reach original radius');
 ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite original-guide display endpoint');
 const d=Math.min(p*L,L),rho=Math.min(source.r,d);
 return{...source,p,L,d,rho,point:{x:point.x,y:point.y},saturation:source.r/L};
}
let growingGuide=null,lastGrowingFrame=null;
function exactGrowingBrowserGuide(s){
 growingCapsSource(s);ensure(typeof document!=='undefined','connected browser guide measurement required');
 if(!growingGuide||!growingGuide.path.isConnected){
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
  svg.setAttribute('width','1');svg.setAttribute('height','1');svg.setAttribute('aria-hidden','true');svg.setAttribute('data-growing-measurement','offscreen-only');
  svg.style.cssText='position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none';
  path.setAttribute('d',s.revealPath);path.setAttribute('pathLength','1');svg.appendChild(path);document.body.appendChild(svg);
  const L=path.getTotalLength();ensure(Number.isFinite(L)&&L>=s.revealWidth/2,'finite browser guide length at least radius');growingGuide={svg,path,L};
 }
 ensure(growingGuide.path.isConnected&&growingGuide.path.getAttribute('d')===s.revealPath&&growingGuide.path.getAttribute('pathLength')==='1','exact connected measurement path changed');
 return growingGuide;
}
export function growingBrowserLength(s){return exactGrowingBrowserGuide(s).L}
export function measureGrowingBrowserFrame(s,p){
 const source=growingCapsSource(s);ensure(Number.isFinite(p)&&p>=0&&p<=1,'finite requested frame');
 const guide=exactGrowingBrowserGuide(s),d=Math.min(p*guide.L,guide.L),point=guide.path.getPointAtLength(d);
 ensure(Number.isFinite(point.x)&&Number.isFinite(point.y),'finite browser point required');
 if(p===0)ensure(Math.hypot(point.x-source.q0[0],point.y-source.q0[1])<1e-4,'UA start point differs from exact source M');
 const frame=growingCapsState(s,p,guide.L,point);lastGrowingFrame=frame;return frame;
}
export function growingBrowserMetrics(){return lastGrowingFrame?JSON.parse(JSON.stringify(lastGrowingFrame)):null}
function growingTarget(s,p,id,frameProvider){
 if(p<=0)return '';
 const measured=frameProvider(s,p);ensure(measured.p===p&&measured.guide===s.revealPath,'dash and endpoints must use the same frame and exact guide');
 const g=growingCapsState(s,p,measured.L,measured.point);
 // Keep the established full round mask byte-for-byte at completion and completed prefixes.
 if(p>=1)return sweptTarget(s,1,id,()=>g.L);
 const mask='<defs><mask id="'+id+'-growing" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">'+
  '<path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="butt" stroke-linejoin="miter" pathLength="1" stroke-dasharray="'+p+' 2" stroke-dashoffset="0"/>'+
  '<circle cx="'+g.q0[0]+'" cy="'+g.q0[1]+'" r="'+g.rho+'" fill="white"/>'+
  '<circle cx="'+g.point.x+'" cy="'+g.point.y+'" r="'+g.rho+'" fill="white"/></mask></defs>';
 return mask+'<path d="'+s.outline+'" mask="url(#'+id+'-growing)"/>';
}
export function renderGrowingCaps(strokes,stroke,progress,prefix='growing',lengthProvider=browserGuideLength,frameProvider=measureGrowingBrowserFrame){
 ensure(Array.isArray(strokes)&&strokes.length===18&&Number.isInteger(stroke)&&stroke>=1&&stroke<=18,'fixed pen range');
 ensure(JSON.stringify(strokes)===JSON.stringify(FIXED_STROKES),'exact full corrected strokes required');
 for(const t of FIXED_TARGETS)ensure(JSON.stringify(strokes[t.pen-1][t.mask-1])===JSON.stringify(t.value),'target geometry changed');
 ensure(Number.isFinite(progress),'finite progress');ensure(/^[a-zA-Z][\w-]*$/.test(prefix),'safe SVG prefix');
 const p=Math.max(0,Math.min(1,progress));let body='';
 for(let pen=0;pen<stroke;pen++){
  const masks=strokes[pen];let elapsed=(pen<stroke-1?1:p)*masks.reduce((sum,m)=>sum+m.weight,0);
  masks.forEach((s,i)=>{const local=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const id=prefix+'-'+(pen+1)+'-'+i;
   body+=pen===17&&i===0?growingTarget(s,local,id,frameProvider):FIXED_TARGETS.some(t=>t.pen===pen+1&&t.mask===i+1)?sweptTarget(s,local,id,lengthProvider):ordinary(s,local,id);
  });
 }
 return '<svg viewBox="0 0 100 100" data-renderer="start-gate-experiment"><g fill="#222">'+body+'</g></svg>';
}
export function growingFullCoverageResidual(s,prefix='growing-residual'){
 growingCapsSource(s);return targetCoverageResidual(s,prefix).replace('P-minus-full-round-sweep','P-minus-growing-full-round-mask');
}
