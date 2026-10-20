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

const FIXED_STROKES=[[{"outline":"M14.7 13.8 L14.7 69.5 L8.7 72.5 L8.7 10.8 Z","bounds":[8.7,10.8,14.7,72.5],"direction":"down","weight":52.2054}],[{"outline":"M11.7 13.8 L33.6 13.8 L33.6 15.8 L11.7 15.8 Z M36.6 14.8 L36.6 68 L30.6 71 L30.6 14.8 Z M30.6 13.8 L33.6 11.3 L39.1 15.8 L36.6 17.8 L30.6 14.8 Z","bounds":[11.7,11.3,39.1,71],"direction":"curve","weight":74.0754,"revealPath":"M11.745 14.818999999999999 L33.615 14.818999999999999 L33.615 67.0244","revealWidth":14}],[{"outline":"M11.7 30.8 L33.6 30.8 L33.6 32.8 L11.7 32.8 Z","bounds":[11.7,30.8,33.6,32.8],"direction":"right","weight":21.87}],[{"outline":"M11.7 47.85 L33.6 47.85 L33.6 49.85 L11.7 49.85 Z","bounds":[11.7,47.85,33.6,49.85],"direction":"right","weight":21.87}],[{"outline":"M11.7 66 L33.6 66 L33.6 68 L11.7 68 Z","bounds":[11.7,66,33.6,68],"direction":"right","weight":21.87}],[{"outline":"M21.25 74.8 L20.2 76.9 L19.05 79 L17.8 81.05 L16.45 83.05 L14.95 85 L13.35 86.9 L11.6 88.8 L9.75 90.6 L7.75 92.3 L5.55 93.95 L4.9 93.35 L6.35 91.1 L7.75 88.9 L9.05 86.8 L10.3 84.7 L11.45 82.65 L12.5 80.65 L13.45 78.65 L14.25 76.65 L15 74.65 L15.6 72.7 Z M15.45 73.15 L15.9 72 L21.25 74.8 Z M21.25 74.8 L22.3 76.3 L19.4 76.8 Z","bounds":[4.9,72,22.3,93.95],"direction":"curve","weight":24.363089,"revealPath":"M18.63 73.31 Q14.58 83.98 5.265 93.68","revealWidth":14}],[{"outline":"M26.55 72.3 L28.05 73.25 L29.6 74.15 L31.05 75.15 L32.4 76.25 L33.7 77.45 L34.85 78.7 L35.95 80 L36.95 81.4 L37.9 82.9 L38.7 84.4 L33.1 86.5 L32.75 85.15 L32.35 83.8 L31.85 82.45 L31.25 81.1 L30.6 79.75 L29.85 78.4 L29.05 77.05 L28.15 75.65 L27.15 74.25 L26 73 Z M38.7 84.4 L38.6 86.7 L36.95 88.25 L34.65 88.15 L33.1 86.5 Z","bounds":[26,72.3,38.7,88.25],"direction":"curve","weight":17.960607,"revealPath":"M25.92 72.34 Q33.21 78.16 36.45 86.89","revealWidth":14}],[{"outline":"M89.25 13.9 L85.3 15.5 L81.2 17 L76.95 18.35 L72.6 19.6 L68.15 20.7 L63.55 21.65 L58.8 22.5 L53.9 23.2 L48.9 23.65 L43.75 23.9 L43.65 23.05 L48.6 21.8 L53.4 20.55 L58.1 19.3 L62.65 18 L67 16.6 L71.25 15.15 L75.35 13.6 L79.25 12 L83.05 10.3 L86.7 8.45 Z M86.25 8.7 L91 13.1 L89.25 13.9 Z M91 13.1 L91.05 14.7 L87.95 13.4 Z","bounds":[43.65,8.45,91.05,23.9],"direction":"curve","weight":46.436537,"revealPath":"M88.4425 11 Q69.3475 20 43.72 23.5","revealWidth":14}],[{"outline":"M71.3 23.1 L71.3 41.1 L65.3 41.1 L65.3 22.1 Z M71.3 23.1 L72.8 24.1 L70.3 25.6 Z","bounds":[65.3,22.1,72.8,41.1],"direction":"down","weight":17.5225}],[{"outline":"M43.2 39.1 L86.9 39.1 L86.9 41.1 L43.2 41.1 Z","bounds":[43.2,39.1,86.9,41.1],"direction":"right","weight":43.7175}],[{"outline":"M89.55 41.55 L86.95 45.7 L84.25 49.7 L81.35 53.65 L78.3 57.45 L75.1 61.1 L71.75 64.7 L68.25 68.15 L64.55 71.45 L60.65 74.6 L56.55 77.55 L55.95 76.85 L59.35 73.2 L62.65 69.55 L65.85 65.85 L68.9 62.15 L71.85 58.4 L74.6 54.6 L77.25 50.7 L79.75 46.75 L82.1 42.75 L84.3 38.65 Z M83.9 39.1 L86.9 36.6 L92.4 41.1 L89.9 42.6 L83.9 45.1 Z","bounds":[55.95,36.6,92.4,77.55],"direction":"curve","weight":48.1112,"revealPath":"M86.935 40.135000000000005 Q75.3775 60.9175 56.2825 77.2175","revealWidth":14}],[{"outline":"M40.2 85.9 L41.15 84.9 L42.15 83.7 L43.2 82.2 L44.35 80.45 L45.5 78.45 L46.7 76.25 L48 73.8 L49.3 71.15 L50.75 68.3 L52.3 65.25 L53.15 65.5 L52.55 68.9 L51.8 72.1 L51 75 L50.2 77.7 L49.35 80.2 L48.5 82.5 L47.6 84.6 L46.7 86.5 L45.8 88.2 L44.8 89.7 Z M44.8 89.7 L39.55 86.7 L40.2 85.9 Z M44.8 89.7 L45.55 86.45 L46.6 89.9 Z","bounds":[39.55,65.25,53.15,89.9],"direction":"curve","weight":25.141751,"revealPath":"M42.2125 88.22 Q47.2375 82.1075 52.765 65.4","revealWidth":14},{"outline":"M52.75 65.8 L54.05 70 L55.5 73.6 L57.2 76.5 L59.3 78.8 L61.9 80.6 L65.2 81.95 L69.45 82.85 L74.75 83.35 L81.3 83.35 L89.2 82.85 L89.65 89.45 L81.4 89.65 L74.35 89.25 L68.4 88.3 L63.45 86.75 L59.4 84.55 L56.3 81.7 L54.1 78.35 L52.7 74.6 L52 70.45 L51.85 65.95 Z M89.65 89.45 L89.2 82.85 L94.7 82.5 Z","bounds":[51.85,65.8,94.7,89.65],"direction":"curve","weight":42.598551,"revealPath":"M52.2625 65.4 C54.2725 81.2925 60.3025 88.22 89.4475 86.1825","revealWidth":14}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const Q_SPECS=[{"pen":12,"mask":1,"kind":"Q","path":"M42.2125 88.22 Q47.2375 82.1075 52.765 65.4"},{"pen":12,"mask":2,"kind":"C","path":"M52.2625 65.4 C54.2725 81.2925 60.3025 88.22 89.4475 86.1825"}];
const R = (n, d = 1n) => ({ n: BigInt(n), d: BigInt(d) });
const dec = (v) => { const [a, b = ''] = v.split('.'); return R(BigInt(a + b), 10n ** BigInt(b.length)); };
const add = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d), sub = (a, b) => add(a, R(-b.n, b.d)), mul = (a, b) => R(a.n * b.n, a.d * b.d), gt = (a, b) => a.n * b.d > b.n * a.d;
const div = (a, b) => { ensure(b.n !== 0n, 'rational division by zero'); return b.n < 0n ? R(-a.n * b.d, -a.d * b.n) : R(a.n * b.d, a.d * b.n); };
const dot = (a, b) => add(mul(a[0], b[0]), mul(a[1], b[1]));
function parsed(s){
 ensure(typeof s.revealPath==='string'&&s.revealWidth===14,'exact original QC guide/width');
 const tokens=s.revealPath.split(' '),commands=[];for(let i=0;i<tokens.length;){const first=tokens[i++],op=first[0],arity=op==='M'?2:op==='Q'?4:op==='C'?6:0;ensure(arity&&first.length>1,'canonical M/Q/C only');const raw=[first.slice(1),...tokens.slice(i,i+arity-1)];i+=arity-1;ensure(raw.length===arity&&raw.every(v=>Number.isFinite(Number(v))&&String(Number(v))===v),'canonical finite arity');commands.push({op,args:raw.map(Number),raw})}
 const syntax=commands.map(c=>c.op).join(' ');ensure(['M Q','M C'].includes(syntax),'exact single Q or single C only');return{syntax,commands};
}
function certificate(pen,mask,s){
 const p=parsed(s),spec=Q_SPECS.find(t=>t.pen===pen&&t.mask===mask);ensure(spec&&spec.path===s.revealPath,'exact QC12 allowlist');const raw=p.commands.flatMap(c=>c.raw),v=raw.map(dec),P=Array.from({length:v.length/2},(_,i)=>v.slice(2*i,2*i+2)),r=R(7),fortyNine=R(49);
 let T,K,details;
 if(spec.kind==='Q'){ensure(p.syntax==='M Q'&&P.length===3,'single source Q');T=R(1,2);K=R(1,18);const A=P[1].map((x,i)=>sub(x,P[0][i])),B=P[0].map((x,i)=>add(sub(x,mul(R(2),P[1][i])),P[2][i])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),cross=sub(mul(A[0],B[1]),mul(A[1],B[0])),cross2=mul(cross,cross),lo=R(62),up=R(51),delta=A.map((x,i)=>add(mul(mul(R(2),T),x),mul(mul(T,T),B[i])));
  ensure(gt(ab,R(0))&&gt(bb,R(0))&&gt(aa,lo),'Q regular minimum at t0 through T');ensure(gt(mul(up,up),cross2),'Q exact cross upper51');ensure(gt(dot(delta,delta),fortyNine),'Q chord beyond initial arc7');ensure(gt(mul(mul(K,K),mul(R(4),mul(mul(lo,lo),lo))),mul(up,up)),'Q curvature less1/18');details={lambdaLower:62,crossUpper:51,chordSquared:'52883681/512000',initialInjectivity:'x strictly increases and y strictly decreases'};
 }else{ensure(spec.kind==='C'&&p.syntax==='M C'&&P.length===4,'single source cubic C');T=R(1,4);K=R(1,15);const V=[0,1,2].map(i=>P[i+1].map((x,j)=>sub(x,P[i][j]))),D0=V[1].map((x,i)=>sub(x,V[0][i])),D1=V[2].map((x,i)=>sub(x,V[1][i])),oneMinus=sub(R(1),T),yLower=mul(R(3),add(add(mul(mul(oneMinus,oneMinus),V[0][1]),mul(mul(mul(R(2),T),oneMinus),V[1][1])),mul(mul(T,T),V[2][1]))),secondAt=D0.map((x,i)=>mul(R(6),add(mul(oneMinus,x),mul(T,D1[i])))),M2=dot(secondAt,secondAt),delta=V[0].map((x,i)=>add(add(mul(mul(R(3),T),x),mul(mul(R(3),mul(T,T)),D0[i])),mul(mul(mul(T,T),T),sub(D1[i],D0[i]))));
  ensure(V.every(x=>gt(x[0],R(0)))&&gt(V[0][1],V[1][1])&&gt(V[1][1],V[2][1]),'C global x monotonic and y derivative controls decreasing');ensure(gt(D0[0],R(0))&&gt(D1[0],D0[0])&&sub(D0[1],D1[1]).n===0n,'C second derivative norm largest at T');ensure(gt(yLower,R(0))&&sub(yLower,R(3423,100)).n===0n,'C exact derivative-y lower');ensure(sub(M2,R(908359281,160000)).n===0n,'C exact second norm bound');ensure(gt(dot(delta,delta),fortyNine),'C chord beyond initial arc7');ensure(gt(mul(mul(K,K),mul(mul(yLower,yLower),mul(yLower,yLower))),M2),'C curvature less1/15');details={derivativeYLower:'3423/100',secondDerivativeNormSquaredUpper:'908359281/160000',chordSquared:'18248040873/163840000',initialInjectivity:'x strictly increases; initial y derivative positive'};
 }const kr=mul(r,K);ensure(gt(sub(R(1),mul(R(1,2),mul(kr,kr))),kr),'initial arc7 normal-strip bound');certificateChecks++;return Object.freeze({syntax:p.syntax,kind:spec.kind==='Q'?'source-specific-Q':'source-specific-C',initialArcMax:7,parameterBound:spec.kind==='Q'?.5:.25,curvatureBound:spec.kind==='Q'?1/18:1/15,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,...details});
}

const POLICIES=Object.freeze(Q_SPECS.map(t=>Object.freeze({id:'u8cb6-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:certificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact12p13m25 QC source only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only two exact QC12 source masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only12m1/12m2');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 貶 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 貶 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 貶 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 貶 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 貶 SVG coordinate tree');
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
        throw new Error('Invalid 貶 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 貶 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 貶 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 貶 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 貶 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('貶 UA start differs from exact M');
    return Object.freeze({ policyId: policy.id, guide: segment.revealPath, progress, L, d, rho: Math.min(fixed.r, d), q0: Object.freeze(fixed.q0), point: Object.freeze({ x: point.x, y: point.y }) });
}
/** 기존 정책과 분리된 원 QC commit. 완료 잉크는 별도 key/full round mask이다. */
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
            throw new Error('Invalid 貶 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 貶 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 貶 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('貶 binding changed during UA read');
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
            throw new Error('貶 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=12&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=global===1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,12,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
export function renderTargetLocal(strokes,mask,progress,prefix='local'){assertFixedGeometry(strokes);ensure(Number.isInteger(mask)&&[1,2].includes(mask)&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact isolated QC target/local progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe local id');const t=POLICIES.find(t=>t.pen===12&&t.mask===mask);return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(t,progress,prefix+'-12-'+(mask-1))+'</g></svg>'}
