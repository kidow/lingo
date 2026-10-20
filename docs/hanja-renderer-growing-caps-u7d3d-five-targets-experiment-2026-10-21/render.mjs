export function renderProgressive(strokes, stroke, progress, prefix = 'reveal') {
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

const FIXED_STROKES=[[{"outline":"M28.2 9.75 L27 11.75 L25.8 13.65 L24.55 15.6 L23.25 17.5 L21.9 19.4 L20.55 21.25 L19.15 23.05 L17.65 24.85 L16.1 26.55 L14.45 28.25 L13.75 27.7 L14.65 25.6 L15.55 23.5 L16.45 21.4 L17.4 19.35 L18.35 17.3 L19.3 15.25 L20.2 13.2 L21.1 11.15 L21.95 9.15 L22.8 7.1 Z M22.6 7.55 L23.1 6.55 L28.2 9.75 Z M28.2 9.75 L29.1 11.35 L26.15 11.55 Z","bounds":[13.75,6.55,29.1,28.25],"direction":"curve","weight":23.133107,"revealPath":"M25.75 8 Q20.5 18.5 14.125 28","revealWidth":14},{"outline":"M6.9 22.35 L8.75 23.2 L10.55 24.1 L12.3 25.1 L13.9 26.25 L15.4 27.55 L16.8 28.9 L18.05 30.4 L19.25 32 L20.3 33.7 L21.25 35.5 L15.65 37.6 L15.2 36.05 L14.65 34.5 L14 33 L13.25 31.55 L12.4 30.1 L11.45 28.65 L10.35 27.25 L9.15 25.85 L7.9 24.4 L6.4 23.1 Z M21.25 35.5 L21.15 37.8 L19.5 39.4 L17.2 39.25 L15.65 37.6 Z","bounds":[6.4,22.35,21.25,39.4],"direction":"curve","weight":20.070189,"revealPath":"M6.25 22.5 Q15.25 28 19 38","revealWidth":14}],[{"outline":"M38.95 21.4 L36.75 24.95 L34.45 28.45 L32.15 31.95 L29.8 35.45 L27.35 38.85 L24.85 42.25 L22.3 45.6 L19.7 48.9 L16.95 52.1 L14.1 55.25 L13.35 54.7 L15.4 51 L17.5 47.35 L19.6 43.75 L21.7 40.15 L23.8 36.55 L25.85 32.95 L27.85 29.35 L29.85 25.7 L31.8 22.1 L33.75 18.45 Z M33.5 18.85 L34 17.95 L38.95 21.4 Z M38.95 21.4 L39.75 23 L36.85 23.05 Z","bounds":[13.35,17.95,39.75,55.25],"direction":"curve","weight":42.23169,"revealPath":"M36.625 19.5 Q26.125 38 13.75 55","revealWidth":14},{"outline":"M7.1 53.45 L10.1 53.2 L13.1 52.9 L16.05 52.6 L19 52.25 L21.95 51.9 L24.85 51.5 L27.75 51.1 L30.65 50.7 L33.55 50.35 L36.5 50.05 L36.7 50.9 L34.05 52.15 L31.3 53.3 L28.55 54.3 L25.7 55.2 L22.8 56.05 L19.9 56.8 L16.95 57.55 L13.95 58.2 L10.9 58.8 L7.85 59.4 Z M7.85 59.4 L6.1 53.55 L7.1 53.45 Z M7.85 59.4 L10.65 57.5 L9.05 60.75 Z","bounds":[6.1,50.05,36.7,60.75],"direction":"curve","weight":30.226489,"revealPath":"M7 56.5 Q22.75 54.5 36.625 50.5","revealWidth":14}],[{"outline":"M29.4 39 L30.95 40.05 L32.5 41.2 L33.95 42.5 L35.3 43.9 L36.55 45.45 L37.7 47.1 L38.75 48.9 L39.7 50.75 L40.6 52.7 L41.35 54.75 L35.55 56.3 L35.2 54.4 L34.8 52.55 L34.3 50.8 L33.75 49.1 L33.1 47.45 L32.4 45.8 L31.6 44.25 L30.75 42.65 L29.85 41.1 L28.8 39.65 Z M41.35 54.75 L41.05 57.05 L39.25 58.45 L36.95 58.1 L35.55 56.3 Z","bounds":[28.8,39,41.35,58.45],"direction":"curve","weight":20.652255,"revealPath":"M28.75 39 Q35.875 45.5 38.875 57","revealWidth":14}],[{"outline":"M27.25 53.5 L27.25 91.5 L21.25 94.5 L21.25 53.5 Z","bounds":[21.25,53.5,27.25,94.5],"direction":"down","weight":38.5}],[{"outline":"M18.15 64.3 L17.65 67.1 L17 69.85 L16.2 72.6 L15.25 75.25 L14.2 77.9 L13 80.5 L11.7 83.05 L10.2 85.55 L8.5 87.9 L6.6 90.2 L5.85 89.75 L6.85 87 L7.8 84.35 L8.7 81.7 L9.5 79.1 L10.2 76.55 L10.8 73.95 L11.3 71.4 L11.7 68.8 L12 66.25 L12.2 63.65 Z M12.15 64.15 L12.3 62.6 L18.15 64.3 Z M18.15 64.3 L19.55 65.45 L16.9 66.65 Z","bounds":[5.85,62.6,19.55,90.2],"direction":"curve","weight":27.986604,"revealPath":"M15.25 63.5 Q13.75 77.5 6.25 90","revealWidth":14}],[{"outline":"M29.75 61 L31.3 62.2 L32.8 63.45 L34.15 64.9 L35.45 66.5 L36.6 68.2 L37.7 70 L38.7 71.95 L39.6 74 L40.4 76.15 L41.1 78.4 L35.25 79.6 L34.95 77.55 L34.55 75.55 L34.1 73.6 L33.6 71.75 L33.05 69.95 L32.4 68.2 L31.7 66.5 L30.9 64.85 L30.1 63.2 L29.1 61.65 Z M41.1 78.4 L40.65 80.65 L38.8 81.95 L36.55 81.5 L35.25 79.6 Z","bounds":[29.1,61,41.1,81.95],"direction":"curve","weight":21.636558,"revealPath":"M29.125 61 Q35.875 68 38.5 80.5","revealWidth":14}],[{"outline":"M68 8.9 L68 23.7 L62 23.7 L62 7.9 Z M68 8.9 L69.5 9.9 L67 11.4 Z","bounds":[62,7.9,69.5,23.7],"direction":"down","weight":14.26}],[{"outline":"M44.05 17.35 L44.4 20.25 L44.7 22.9 L44.85 25.4 L44.9 27.7 L44.8 29.85 L44.6 31.8 L44.25 33.6 L43.75 35.3 L43.05 36.8 L42.1 38.2 L37.85 34 L38.4 33.6 L39.05 32.9 L39.7 31.95 L40.3 30.65 L40.9 29.1 L41.45 27.25 L41.95 25.15 L42.4 22.8 L42.85 20.25 L43.15 17.4 Z M42.1 38.2 L40 39.05 L37.9 38.25 L37 36.1 L37.85 34 Z","bounds":[37,17.35,44.9,39.05],"direction":"curve","weight":20.812119,"revealPath":"M43.61 16.903999999999996 Q43.92 32.222 38.96 37.19","revealWidth":14}],[{"outline":"M43.9 22.1 L88.55 22.1 L88.55 24.1 L43.9 24.1 Z M91.35 24.15 L90.75 25.15 L90.1 26.2 L89.35 27.3 L88.6 28.45 L87.75 29.7 L86.9 30.95 L85.9 32.25 L84.9 33.6 L83.75 35 L82.75 36.55 L81.95 36.15 L82.6 34.4 L83.05 32.7 L83.5 31.05 L83.95 29.55 L84.35 28.1 L84.7 26.7 L85.05 25.4 L85.3 24.2 L85.55 23.1 L85.75 22.05 Z M85.55 22.1 L88.55 19.6 L94.05 24.1 L91.55 25.6 L85.55 28.1 Z","bounds":[43.9,19.6,94.05,36.55],"direction":"curve","weight":59.267013,"revealPath":"M43.92 23.114 L88.56 23.114 Q86.7 28.082000000000004 82.36 36.362","revealWidth":14}],[{"outline":"M85.4 47.85 L82.45 49.2 L79.45 50.55 L76.4 51.85 L73.25 53.15 L70 54.45 L66.7 55.75 L63.35 57 L59.9 58.2 L56.3 59.35 L52.65 60.4 L52.3 59.55 L55.55 57.6 L58.8 55.75 L62 54 L65.15 52.3 L68.2 50.6 L71.25 48.95 L74.2 47.35 L77.1 45.7 L79.9 44.1 L82.65 42.55 Z M82.2 42.75 L86.8 47.15 L85.4 47.85 Z M86.8 47.15 L86.85 48.8 L83.8 47.55 Z","bounds":[52.3,42.55,86.85,60.4],"direction":"curve","weight":35.341194,"revealPath":"M84.5 45 Q70 52.5 52.5 60","revealWidth":14}],[{"outline":"M55.5 33 L55.5 83 L49.5 83 L49.5 32 Z M55.5 33 L57 34 L54.5 35.5 Z M49.5 83 L55.5 83 L54.3 84.8 L52.5 86 L50.7 84.8 Z M55.5 83 L55.5 83.6 L55.6 84.05 L55.7 84.35 L55.75 84.5 L55.85 84.6 L55.95 84.7 L56.1 84.75 L56.4 84.85 L56.85 84.95 L57.5 85 L57.5 91 L56.2 90.9 L54.95 90.7 L53.75 90.3 L52.6 89.65 L51.6 88.85 L50.8 87.85 L50.15 86.7 L49.75 85.5 L49.55 84.25 L49.5 83 Z M57.5 85 L59.6 85.9 L60.5 88 L59.6 90.1 L57.5 91 Z M57.5 85 L90 85 L90 91 L57.5 91 Z M90 85 L91.8 86.2 L93 88 L91.8 89.8 L90 91 Z","bounds":[49.5,32,93,91],"direction":"curve","weight":90.071068,"revealPath":"M52.5 32.5 L52.5 83 Q52.5 88 57.5 88 L90 88","revealWidth":14},{"outline":"M90 85 L87 85 L90 72.5 L91 72.5 Z","bounds":[87,72.5,91,85],"direction":"up","weight":12.5}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const LINE_SPEC={pen:11,mask:1,id:'u7d3d-11-1',path:'M52.5 32.5 L52.5 83 Q52.5 88 57.5 88 L90 88'};
function parsed(s){ensure(typeof s.revealPath==='string'&&s.revealWidth===14,'exact original MLQL/width');const tokens=s.revealPath.split(' '),commands=[];for(let i=0;i<tokens.length;){const first=tokens[i++],op=first[0],arity=op==='Q'?4:op==='M'||op==='L'?2:0;ensure(arity>0&&first.length>1,'canonical M/L/Q');const raw=[first.slice(1),...tokens.slice(i,i+arity-1)];i+=arity-1;ensure(raw.length===arity&&raw.every(v=>Number.isFinite(Number(v))&&String(Number(v))===v),'canonical finite args');commands.push({op,args:raw.map(Number)})}ensure(commands.map(c=>c.op).join(' ')==='M L Q L','only exact MLQL');return commands}
function certificate(pen,mask,s){const c=parsed(s);ensure(pen===11&&mask===1&&s.revealPath===LINE_SPEC.path,'own exact first-risk target');ensure(c[0].args[0]===c[1].args[0]&&c[1].args[1]>c[0].args[1],'vertical first line');const dy=BigInt(c[1].args[1]*2)-BigInt(c[0].args[1]*2);ensure(dy===101n&&dy>14n,'first L=101/2 > r=7 exact rational');ensure(c[2].args[0]===c[1].args[0]&&c[2].args[1]>c[1].args[1]&&c[2].args[3]===c[2].args[1]&&c[3].args[1]===c[2].args[3]&&c[3].args[0]>c[2].args[2],'source Q joins retained');certificateChecks++;return Object.freeze({syntax:'M L Q L',firstL:50.5,r:7,initialArcMax:7,curvatureBound:0,exactDecimalRational:true,initialLineOnly:true,notRasterProof:true})}

const Q_SPECS=Object.freeze([{"pen":1,"mask":1,"raw":0,"id":"u7d3d-1-1","path":"M25.75 8 Q20.5 18.5 14.125 28","maskSHA256":"c7446b09469e0d673ac20c8720b2a3263e68e42407a60f2308b0af0ecf7edc03","T":[1,3],"K":[1,20]},{"pen":1,"mask":2,"raw":1,"id":"u7d3d-1-2","path":"M6.25 22.5 Q15.25 28 19 38","maskSHA256":"fb3c536002485ad6a7dde40d63c564f7fa1e7fc486e4e15c37bcbd18e3016955","T":[1,2],"K":[1,10]},{"pen":2,"mask":1,"raw":2,"id":"u7d3d-2-1","path":"M36.625 19.5 Q26.125 38 13.75 55","maskSHA256":"9ea389de28f1b96aea1ab26dec6439c7ed36b6c57d837874b2997a3243f7dd58","T":[1,3],"K":[1,20]},{"pen":2,"mask":2,"raw":3,"id":"u7d3d-2-2","path":"M7 56.5 Q22.75 54.5 36.625 50.5","maskSHA256":"f887ef08aee48864fc68882f1c6914579e092a97a627b99dea3481c3a4155f63","T":[1,3],"K":[1,20]}].map(s=>Object.freeze(s)));
const R=(n,d=1n)=>({n:BigInt(n),d:BigInt(d)}),addR=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),negR=a=>R(-a.n,a.d),subR=(a,b)=>addR(a,negR(b)),mulR=(a,b)=>R(a.n*b.n,a.d*b.d),ltR=(a,b)=>a.n*b.d<b.n*a.d,absR=a=>R(a.n<0n?-a.n:a.n,a.d),sqR=a=>mulR(a,a),cubeR=a=>mulR(sqR(a),a),rat=s=>{const [a,b='']=String(s).split('.');return R(BigInt(a+b),10n**BigInt(b.length))},textR=a=>a.n+'/'+a.d;
function qCertificate(spec,s){ensure(Q_SPECS.includes(spec)&&s.revealPath===spec.path&&s.revealWidth===14,'private exact Q path/width');ensure(same(s,FIXED_STROKES[spec.pen-1][spec.mask-1]),'exact Q all fields');const a=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(a,'own canonical single Q');const v=a.slice(1).map(rat),A=[subR(v[2],v[0]),subR(v[3],v[1])],B=[addR(subR(v[4],mulR(R(2),v[2])),v[0]),addR(subR(v[5],mulR(R(2),v[3])),v[1])],T=R(...spec.T.map(BigInt)),K=R(...spec.K.map(BigInt)),lo=A.map((x,i)=>{const y=addR(x,mulR(T,B[i]));ensure((x.n>0n&&y.n>0n)||(x.n<0n&&y.n<0n),'initial derivative components nonzero/same sign');return ltR(absR(x),absR(y))?absR(x):absR(y)}),S=addR(sqR(lo[0]),sqR(lo[1])),cross=absR(subR(mulR(A[0],B[1]),mulR(A[1],B[0]))),chord=A.map((x,i)=>addR(mulR(mulR(R(2),T),x),mulR(sqR(T),B[i]))),chord2=addR(sqR(chord[0]),sqR(chord[1]));ensure(ltR(R(49),chord2),'initial arc7 is before own T');ensure(ltR(sqR(cross),mulR(mulR(R(4),cubeR(S)),sqR(K))),'own exact Q curvature bound');const rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(rK,cosLower),'initial offset sufficient inequality');certificateChecks++;return Object.freeze({syntax:'M Q',T:spec.T,K:spec.K,r:7,initialArcMax:7,Smin:textR(S),cross:textR(cross),chordSquared:textR(chord2),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,ownInitialArcOnly:true,notRasterOrWholePProof:true})}

const POLICIES=Object.freeze([Object.freeze({id:LINE_SPEC.id,pen:11,mask:1,segment:FIXED_STROKES[10][0],certificate:certificate(11,1,FIXED_STROKES[10][0])}),...Q_SPECS.map(q=>Object.freeze({id:q.id,pen:q.pen,mask:q.mask,segment:FIXED_STROKES[q.pen-1][q.mask-1],certificate:qCertificate(q,FIXED_STROKES[q.pen-1][q.mask-1])}))]);
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact11p14m37 UP-split source only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact original11m1 MLQL');return t}
function lineSource(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:50.5}}
function source(t,s){if(t.pen===11)return lineSource(t,s);ensure(POLICIES.includes(t)&&Q_SPECS.some(q=>q.id===t.id)&&same(t.segment,s),'private exact Q policy/allfields');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:7}}
export function growingState(s,p,L,point){const t=policy(s);if(t.pen===11)return lineGrowingState(s,p,L,point);const f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite own Q p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite own Q endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only11m1');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
function lineGrowingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>50.5,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 紽 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 紽 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 紽 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 紽 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 紽 SVG coordinate tree');
    }
    return () => {
        if (owner.ownerDocument !== document || document.defaultView !== view || view.document !== document)
            return false;
        for (const [node, parent] of parents) {
            if (!node.isConnected || node.ownerDocument !== document || node.parentElement !== parent || (node !== owner && node.ownerSVGElement !== owner) || node.getAttribute('transform') !== null)
                return false;
            const style = view.getComputedStyle(node);
            if (style.transform !== 'none' || ['translate', 'rotate', 'scale'].some(key => { const value = style.getPropertyValue(key); return value !== '' && value !== 'none'; }))
                return false;
        }
        return true;
    };
}
/** L과 endpoint는 pathLength 없는 동일 connected 원 path에서 같은 frame에 읽는다. */
function measureFrame(policy, segment, progress, guide) {
    const fixed = source(policy, segment);
    if (!Number.isFinite(progress) || progress < 0 || progress > 1)
        throw new Error('Invalid 紽 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 紽 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 紽 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 紽 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 紽 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('紽 UA start differs from exact M');
    return Object.freeze({ policyId: policy.id, guide: segment.revealPath, progress, L, d, rho: Math.min(fixed.r, d), q0: Object.freeze(fixed.q0), point: Object.freeze({ x: point.x, y: point.y }) });
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
function commitFrame(policy, segment, progress, clipId, nodes) {
    const { measurement, guide, startCap, endCap, ink } = nodes;
    const reset = () => {
        ink?.setAttribute('visibility', 'hidden');
        guide?.setAttribute('stroke-dasharray', '0 2');
        for (const cap of [startCap, endCap]) {
            cap?.setAttribute('r', '0');
            cap?.setAttribute('cx', '0');
            cap?.setAttribute('cy', '0');
        }
        for (const key of ['data-growing-progress', 'data-growing-length', 'data-growing-distance', 'data-growing-radius', 'data-growing-end-x', 'data-growing-end-y'])
            ink?.removeAttribute(key);
    };
    reset();
    try {
        source(policy, segment);
        if (!Number.isFinite(progress) || progress < 0 || progress > 1 || !/^[A-Za-z0-9_:.-]+$/.test(clipId))
            throw new Error('Invalid 紽 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 紽 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 紽 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('紽 binding changed during UA read');
        guide.setAttribute('stroke-dasharray', String(frame.progress) + ' 2');
        startCap.setAttribute('cx', String(frame.q0[0]));
        startCap.setAttribute('cy', String(frame.q0[1]));
        startCap.setAttribute('r', String(frame.rho));
        endCap.setAttribute('cx', String(frame.point.x));
        endCap.setAttribute('cy', String(frame.point.y));
        endCap.setAttribute('r', String(frame.rho));
        for (const [key, value] of Object.entries({ 'data-growing-progress': frame.progress, 'data-growing-length': frame.L, 'data-growing-distance': frame.d, 'data-growing-radius': frame.rho, 'data-growing-end-x': frame.point.x, 'data-growing-end-y': frame.point.y }))
            ink.setAttribute(key, String(value));
        if (!bound())
            throw new Error('紽 binding changed before visibility commit');
        ink.setAttribute('visibility', 'visible');
        return { status: 'visible', frame, cleanup: reset };
    }
    catch {
        reset();
        return { status: 'hidden', frame: null, cleanup: reset };
    }
}

export function measureTarget(s,p,path){return measureFrame(policy(s),s,p,path)}
export function commitTarget(s,p,id,nodes){return commitFrame(policy(s),s,p,id,nodes)}
function full(s,id){return '<mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask>'}
function targetHTML(t,p,id){const s=t.segment,defs='<defs><path id="'+id+'-can-measure" data-growing-owner="'+id+'" data-can-measurement="true" d="'+s.revealPath+'" fill="none" stroke="none" visibility="hidden"/>'+full(s,id)+'<mask id="'+id+'-can-growing" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path id="'+id+'-can-guide" data-growing-owner="'+id+'" d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="14" stroke-linecap="butt" stroke-linejoin="miter" pathLength="1" stroke-dasharray="0 2" stroke-dashoffset="0"/><circle data-growing-owner="'+id+'" cx="0" cy="0" r="0" fill="white"/><circle data-growing-owner="'+id+'" cx="0" cy="0" r="0" fill="white"/></mask></defs>';return '<g data-can-target="'+t.id+'" data-stroke-start-gate="'+t.id+'" data-can-progress="'+p+'" data-can-clip="'+id+'">'+defs+(p===1?'<path data-can-full="true" d="'+s.outline+'" mask="url(#'+id+')"/>':p>0?'<path data-can-ink="true" data-growing-owner="'+id+'" d="'+s.outline+'" mask="url(#'+id+'-can-growing)" visibility="hidden"/>':'')+'</g>'}
function ordinary(s,p,id){if(p===0)return '';if(p===1)return '<path d="'+s.outline+'"/>';const[x,y,right,bottom]=s.bounds,width=right-x,height=bottom-y;if(s.direction==='curve')return '<defs><mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="round" pathLength="1" stroke-dasharray="'+p+' 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" mask="url(#'+id+')"/>';const horizontal=s.direction==='right'||s.direction==='left',rx=s.direction==='left'?right-width*p:x,ry=s.direction==='up'?bottom-height*p:y;return '<defs><clipPath id="'+id+'"><rect x="'+rx+'" y="'+ry+'" width="'+(horizontal?width*p:width)+'" height="'+(horizontal?height:height*p)+'"/></clipPath></defs><path d="'+s.outline+'" clip-path="url(#'+id+')"/>'}
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=11&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const rawLocal=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),p=pi<stroke-1?1:t&&global===1?1:rawLocal,id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,11,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}

export function ordinaryUpTail(){return clone(FIXED_STROKES[10][1])}
export function renderOrdinaryUpTail(strokes,p,prefix='up-tail'){assertFixedGeometry(strokes);ensure(Number.isFinite(p)&&p>=0&&p<=1,'ordinary UP local progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe tail id');return '<svg viewBox="0 0 100 100"><g fill="#222">'+ordinary(FIXED_STROKES[10][1],p,prefix+'-1-0')+'</g></svg>'}
export function renderBodyLocal(strokes,p,prefix='body-local'){assertFixedGeometry(strokes);ensure(Number.isFinite(p)&&p>=0&&p<=1,'body local progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe body id');return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(POLICIES[0],p,prefix+'-11-0')+'</g></svg>'}

export function renderTargetLocal(strokes,pen,mask,p,prefix='target-local'){assertFixedGeometry(strokes);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'target local p/id');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'own exact local target');return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(t,p,prefix+'-'+pen+'-'+(mask-1))+'</g></svg>'}
