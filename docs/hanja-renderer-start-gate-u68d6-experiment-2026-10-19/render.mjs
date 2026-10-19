// Isolated renderer experiment only. Fixed source geometry is never regenerated.
const FIXED_TARGET={"outline":"M39.55 87.95 L43.05 86.95 L46.5 85.85 L50.05 84.7 L53.6 83.55 L57.15 82.35 L60.8 81.1 L64.45 79.85 L68.1 78.55 L71.9 77.3 L75.7 76.05 L76.1 76.9 L72.65 79 L69.2 81 L65.75 82.85 L62.25 84.6 L58.75 86.3 L55.3 87.9 L51.8 89.4 L48.35 90.9 L44.9 92.3 L41.5 93.65 Z M41.5 93.65 L38.6 88.3 L39.55 87.95 Z M41.5 93.65 L43.85 91.25 L42.9 94.75 Z","bounds":[38.6,76.05,76.1,94.75],"direction":"curve","weight":38.666704,"revealPath":"M40.08 91 Q57.735 85 75.925 76.5","revealWidth":14};
const ensure=(v,m)=>{if(!v)throw Error(m)};
export function targetMask(){return JSON.parse(JSON.stringify(FIXED_TARGET))}
export function sourceStart(s){
 ensure(JSON.stringify(s)===JSON.stringify(FIXED_TARGET),'exact fixed mask required');
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
 ensure(strokes.length===12&&Number.isInteger(stroke)&&stroke>=1&&stroke<=12,'fixed pen range');ensure(JSON.stringify(strokes[9][1])===JSON.stringify(FIXED_TARGET),'target geometry changed');ensure(Number.isFinite(progress),'finite progress');ensure(/^[a-zA-Z][\w-]*$/.test(prefix),'safe SVG prefix');
 const p=Math.max(0,Math.min(1,progress));let body='';
 for(let pen=0;pen<stroke;pen++){const masks=strokes[pen];let elapsed=(pen<stroke-1?1:p)*masks.reduce((s,m)=>s+m.weight,0);masks.forEach((s,i)=>{const local=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const id=prefix+'-'+(pen+1)+'-'+i;body+=pen===9&&i===1?sweptTarget(s,local,id,lengthProvider):ordinary(s,local,id)})}
 return '<svg viewBox="0 0 100 100" data-renderer="start-gate-experiment"><g fill="#222">'+body+'</g></svg>';
}
export function targetCoverageResidual(s,prefix='residual'){
 sourceStart(s);ensure(/^[a-zA-Z][\w-]*$/.test(prefix),'safe SVG prefix');return `<svg viewBox="0 0 100 100" data-coverage="P-minus-full-round-sweep"><defs><mask id="${prefix}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="${s.revealPath}" fill="none" stroke="black" stroke-width="${s.revealWidth}" stroke-linecap="round" pathLength="1" stroke-dasharray="1 2"/></mask></defs><path d="${s.outline}" fill="#d22" mask="url(#${prefix})"/></svg>`;
}
export const nativeApproval=false,runtimeApplied=false;
