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

const FIXED_STROKES=[[{"outline":"M7.15 26.5 L38.7 26.5 L38.7 28.5 L7.15 28.5 Z M38.7 26.5 L26.7 27.5 L32.7 21.5 Z","bounds":[7.15,21.5,38.7,28.5],"direction":"right","weight":31.5375}],[{"outline":"M25.75 8 L25.75 85.5 L19.75 85.5 L19.75 7 Z M25.75 8 L27.25 9 L24.75 10.5 Z M19.75 85.5 L25.75 85.5 L24.55 87.3 L22.75 88.5 L20.95 87.3 Z M25.75 85.5 L25.65 86.75 L25.45 88 L25.05 89.2 L24.4 90.35 L23.6 91.35 L22.6 92.15 L21.45 92.8 L20.25 93.2 L19 93.4 L17.75 93.5 L17.75 87.5 L18.35 87.45 L18.8 87.35 L19.1 87.25 L19.25 87.2 L19.35 87.1 L19.45 87 L19.5 86.85 L19.6 86.55 L19.7 86.1 L19.75 85.5 Z M17.75 90.5 L10.75 89 L10.75 87.5 L17.75 87.5 Z","bounds":[10.75,7,27.25,93.5],"direction":"curve","weight":85.071068,"revealPath":"M22.75 7.5 L22.75 85.5 Q22.75 90.5 17.75 90.5","revealWidth":14}],[{"outline":"M6.7 58.05 L9.9 56.7 L13.1 55.4 L16.3 54.05 L19.45 52.75 L22.6 51.4 L25.75 50.05 L28.9 48.75 L32.05 47.45 L35.25 46.25 L38.45 45.1 L38.9 45.85 L36.15 47.9 L33.3 49.85 L30.4 51.65 L27.5 53.45 L24.5 55.2 L21.5 56.9 L18.45 58.6 L15.4 60.25 L12.3 61.9 L9.2 63.5 Z M9.2 63.5 L5.8 58.45 L6.7 58.05 Z M9.2 63.5 L11.3 60.9 L10.75 64.45 Z","bounds":[5.8,45.1,38.9,64.45],"direction":"curve","weight":34.815666,"revealPath":"M7.525 61 Q23.8375 53.5 38.7 45.5","revealWidth":14}],[{"outline":"M40.75 15.5 L92.35 15.5 L92.35 17.5 L40.75 17.5 Z M92.35 15.5 L80.35 16.5 L86.35 10.5 Z","bounds":[40.75,10.5,92.35,17.5],"direction":"right","weight":51.6}],[{"outline":"M66.65 16.5 L66.05 17.7 L64.65 20.3 L63.2 22.95 L61.65 25.65 L60.05 28.35 L58.3 31.1 L56.5 33.9 L54.6 36.7 L52.6 39.55 L50.45 42.4 L48.1 45.2 L47.35 44.75 L48.8 41.4 L50.3 38.2 L51.75 35.1 L53.2 32.05 L54.6 29.1 L55.95 26.2 L57.2 23.35 L58.4 20.6 L59.5 17.9 L60.05 16.5 Z","bounds":[47.35,16.5,66.65,45.2],"direction":"curve","weight":32.484152,"revealPath":"M63.337500000000006 16.5 Q57.425 29.5 47.75 45","revealWidth":14},{"outline":"M40.7 43.45 L44.55 42.9 L48.45 42.35 L52.45 41.75 L56.55 41.2 L60.75 40.6 L65.05 40.05 L69.4 39.45 L73.85 38.9 L78.45 38.45 L83.1 38.05 L83.3 38.9 L78.8 40.3 L74.4 41.55 L70 42.7 L65.75 43.75 L61.55 44.8 L57.4 45.75 L53.4 46.7 L49.45 47.6 L45.55 48.5 L41.75 49.35 Z M41.75 49.35 L39.7 43.6 L40.7 43.45 Z M41.75 49.35 L44.45 47.35 L43 50.65 Z","bounds":[39.7,38.05,83.3,50.65],"direction":"curve","weight":43.209535,"revealPath":"M40.7625 46.5 Q60.1125 43 83.225 38.5","revealWidth":14}],[{"outline":"M73.65 25 L76.15 26.7 L78.4 28.5 L80.5 30.45 L82.4 32.45 L84.15 34.5 L85.7 36.65 L87.15 38.8 L88.4 41.05 L89.55 43.35 L90.5 45.65 L84.75 47.4 L84.2 45.35 L83.5 43.25 L82.7 41.15 L81.75 39 L80.6 36.9 L79.35 34.75 L77.95 32.55 L76.45 30.3 L74.8 28 L73.05 25.65 Z M90.5 45.65 L90.2 47.95 L88.45 49.4 L86.2 49.15 L84.75 47.4 Z","bounds":[73.05,25,90.5,49.4],"direction":"curve","weight":27.486406,"revealPath":"M73.0125 25 Q84.3 35.5 88.0625 48","revealWidth":14}],[{"outline":"M41.8 65.5 L88.6 65.5 L88.6 67.5 L41.8 67.5 Z M88.6 65.5 L76.6 66.5 L82.6 60.5 Z","bounds":[41.8,60.5,88.6,67.5],"direction":"right","weight":46.7625}],[{"outline":"M66.85 50 L66.85 90.5 L60.85 90.5 L60.85 49 Z M66.85 50 L68.35 51 L65.85 52.5 Z","bounds":[60.85,49,68.35,90.5],"direction":"down","weight":40}],[{"outline":"M32.15 88.5 L93.95 88.5 L93.95 90.5 L32.15 90.5 Z M93.95 88.5 L81.95 89.5 L87.95 83.5 Z","bounds":[32.15,83.5,93.95,90.5],"direction":"right","weight":61.8125}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const Q_SPECS=[{pen:2,mask:1,kind:"MLQ",path:"M22.75 7.5 L22.75 85.5 Q22.75 90.5 17.75 90.5"},{pen:3,mask:1,kind:"Q",path:"M7.525 61 Q23.8375 53.5 38.7 45.5",T:[1n,3n],K:[1n,500n],lambdaLower:309n,crossUpper:20n},{pen:5,mask:1,kind:"Q",path:"M63.337500000000006 16.5 Q57.425 29.5 47.75 45",T:[1n,3n],K:[1n,100n],lambdaLower:203n,crossUpper:35n},{pen:5,mask:2,kind:"Q",path:"M40.7625 46.5 Q60.1125 43 83.225 38.5",T:[1n,3n],K:[1n,1000n],lambdaLower:386n,crossUpper:7n},{pen:6,mask:1,kind:"Q",path:"M73.0125 25 Q84.3 35.5 88.0625 48",T:[1n,3n],K:[1n,50n],lambdaLower:201n,crossUpper:102n}];
const R = (n, d = 1n) => ({ n: BigInt(n), d: BigInt(d) });
const dec = (v) => { const [a, b = ''] = v.split('.'); return R(BigInt(a + b), 10n ** BigInt(b.length)); };
const add = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d), sub = (a, b) => add(a, R(-b.n, b.d)), mul = (a, b) => R(a.n * b.n, a.d * b.d), gt = (a, b) => a.n * b.d > b.n * a.d;
const div = (a, b) => { ensure(b.n !== 0n, 'rational division by zero'); return b.n < 0n ? R(-a.n * b.d, -a.d * b.n) : R(a.n * b.d, a.d * b.n); };
const dot = (a, b) => add(mul(a[0], b[0]), mul(a[1], b[1]));
function parsed(s) {
    ensure(typeof s.revealPath === 'string' && s.revealWidth === 14, 'exact original guide/width');
    const tokens = s.revealPath.split(' '), values = [], commands = [];
    for (let i = 0; i < tokens.length;) {
        const first = tokens[i++], op = first[0], arity = op === 'Q' ? 4 : op === 'M' || op === 'L' ? 2 : 0;
        ensure(arity > 0 && first.length > 1, 'canonical M/L/Q only');
        const raw = [first.slice(1), ...tokens.slice(i, i + arity - 1)];
        i += arity - 1;
        ensure(raw.length === arity && raw.every(v => Number.isFinite(Number(v)) && String(Number(v)) === v), 'canonical finite arity');
        const args = raw.map(Number);
        values.push(...args);
        commands.push({ op, args });
    }
    const syntax = commands.map(c => c.op).join(' ');
    ensure(['M Q', 'M L Q'].includes(syntax), 'exact source command sequence');
    return { syntax, commands, values };
}
function certificate(pen, mask, s) {
 const parse=parsed(s),spec=Q_SPECS.find(v=>v.pen===pen&&v.mask===mask);
 ensure(spec&&s.revealPath===spec.path,'exact five source-specific certificate allowlist');
 const values=parse.commands.flatMap(c=>c.args.map(String)).map(dec),points=Array.from({length:values.length/2},(_,i)=>values.slice(2*i,2*i+2)),[P0,P1,P2,P3]=points;
 if(spec.kind==='MLQ'){
  ensure(parse.syntax==='M L Q'&&P3,'fixed canonical M L Q arity');const v=P1.map((x,i)=>sub(x,P0[i])),q=P2.map((x,i)=>sub(x,P1[i])),joinCross=sub(mul(v[0],q[1]),mul(v[1],q[0])),joinDot=dot(v,q);
  ensure(v[0].n===0n&&v[1].n===78n*v[1].d&&gt(dot(v,v),R(49)),'exact original first L78 before arc7');
  ensure(joinCross.n===0n&&joinDot.n===390n*joinDot.d&&gt(joinDot,R(0)),'unchanged source L-to-Q tangent cross0 dot390');
  certificateChecks++;return Object.freeze({syntax:parse.syntax,kind:'initial-line',firstL:78,joinCross:0,joinDot:390,initialArcMax:7,curvatureBound:0,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,followingQ314Unchanged:true});
 }
 ensure(spec.kind==='Q'&&parse.syntax==='M Q'&&points.length===3,'fixed canonical M Q arity');
 const A=P1.map((v,i)=>sub(v,P0[i])),B=P0.map((v,i)=>add(sub(v,mul(R(2),P1[i])),P2[i])),T=R(spec.T[0],spec.T[1]),K=R(spec.K[0],spec.K[1]),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B);ensure(gt(bb,R(0)),'nonzero fixed Q second derivative');
 const normAt=t=>add(add(aa,mul(mul(R(2),ab),t)),mul(bb,mul(t,t))),star=div(R(-ab.n,ab.d),bb),minimumT=gt(star,R(0))&&gt(T,star)?star:(gt(normAt(T),aa)?R(0):T),lambda=normAt(minimumT),delta=A.map((v,i)=>add(mul(mul(R(2),T),v),mul(mul(T,T),B[i]))),cross=sub(mul(A[0],B[1]),mul(A[1],B[0])),crossAbs=R(cross.n<0n?-cross.n:cross.n,cross.d),lo=R(spec.lambdaLower),upper=R(spec.crossUpper),kr=mul(R(7),K);
 ensure(gt(lambda,lo)&&gt(upper,crossAbs)&&gt(dot(delta,delta),R(49)),'exact source Q lambda/cross/chord arc7 bounds');
 ensure(gt(mul(mul(K,K),mul(R(4),mul(mul(lo,lo),lo))),mul(upper,upper)),'conservative exact Q curvature bound');
 ensure(gt(sub(R(1),mul(R(1,2),mul(kr,kr))),kr),'initial normal-strip injectivity lower bound');
 certificateChecks++;return Object.freeze({syntax:parse.syntax,kind:'source-specific-Q',initialArcMax:7,parameterBound:Number(spec.T[0])/Number(spec.T[1]),curvatureBound:Number(spec.K[0])/Number(spec.K[1]),lambdaLower:Number(spec.lambdaLower),crossUpper:Number(spec.crossUpper),exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true});
}

const POLICIES=Object.freeze(Q_SPECS.map(t=>Object.freeze({id:'u6303-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:certificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact9p10m24 source only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only five exact original source masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only2m1/3m1/5m1/5m2/6m1');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 挃 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 挃 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 挃 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 挃 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 挃 SVG coordinate tree');
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
        throw new Error('Invalid 挃 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 挃 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 挃 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 挃 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 挃 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('挃 UA start differs from exact M');
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
            throw new Error('Invalid 挃 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 挃 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 挃 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('挃 binding changed during UA read');
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
            throw new Error('挃 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=9&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=global===1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,9,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
