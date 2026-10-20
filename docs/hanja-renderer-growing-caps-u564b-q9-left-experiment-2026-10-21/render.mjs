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

const FIXED_STROKES=[[{"outline":"M13.2 20.85 L13.2 73.1 L7.2 76.1 L7.2 17.85 Z","bounds":[7.2,17.85,13.2,76.1],"direction":"down","weight":44.28}],[{"outline":"M10.2 20.85 L26.7 20.85 L26.7 22.85 L10.2 22.85 Z M29.7 21.85 L29.7 70.1 L23.7 73.1 L23.7 21.85 Z M23.7 20.85 L26.7 18.35 L32.2 22.85 L29.7 24.85 L23.7 21.85 Z","bounds":[10.2,18.35,32.2,73.1],"direction":"curve","weight":60.7955,"revealPath":"M10.229750000000001 21.86 L26.745250000000002 21.86 L26.745250000000002 66.14","revealWidth":14}],[{"outline":"M10.2 65.1 L26.7 65.1 L26.7 67.1 L10.2 67.1 Z","bounds":[10.2,65.1,26.7,67.1],"direction":"right","weight":16.5155}],[{"outline":"M51.4 7.5 L51.4 21 L45.4 21 L45.4 6.5 Z M51.4 7.5 L52.9 8.5 L50.4 10 Z","bounds":[45.4,6.5,52.9,21],"direction":"down","weight":13}],[{"outline":"M33.2 19 L65.05 19 L65.05 21 L33.2 21 Z M65.05 19 L53.05 20 L59.05 14 Z","bounds":[33.2,14,65.05,21],"direction":"right","weight":31.878}],[{"outline":"M43.05 27.5 L43.05 44 L37.05 47 L37.05 24.5 Z","bounds":[37.05,24.5,43.05,47],"direction":"down","weight":13}],[{"outline":"M40.05 27.5 L56.75 27.5 L56.75 29.5 L40.05 29.5 Z M59.75 28.5 L59.75 42.5 L53.75 45.5 L53.75 28.5 Z M53.75 27.5 L56.75 25 L62.25 29.5 L59.75 31.5 L53.75 28.5 Z","bounds":[40.05,25,62.25,45.5],"direction":"curve","weight":29.6635,"revealPath":"M40.092 28.5 L56.7555 28.5 L56.7555 41.5","revealWidth":14}],[{"outline":"M40.05 40.5 L56.75 40.5 L56.75 42.5 L40.05 42.5 Z","bounds":[40.05,40.5,56.75,42.5],"direction":"right","weight":16.6635}],[{"outline":"M35.35 52.5 L58.2 52.5 L58.2 54.5 L35.35 54.5 Z","bounds":[35.35,52.5,58.2,54.5],"direction":"right","weight":22.82175},{"outline":"M60.65 55.15 L59.55 56.45 L58.4 57.7 L57.3 58.85 L56.15 59.95 L55.05 61 L53.9 62 L52.8 62.9 L51.65 63.75 L50.45 64.5 L49.45 65.3 L48.8 64.65 L49.5 63.6 L50.1 62.4 L50.75 61.2 L51.4 59.95 L52.1 58.7 L52.75 57.4 L53.5 56.05 L54.2 54.65 L54.95 53.25 L55.7 51.8 Z M55.2 52.5 L58.2 50 L63.7 54.5 L61.2 56 L55.2 58.5 Z","bounds":[48.8,50,63.7,65.3],"direction":"curve","weight":14.637816,"revealPath":"M58.204499999999996 53.5 Q53.49525 60.5 49.148250000000004 65","revealWidth":14}],[{"outline":"M52.1 61.5 L52.1 86 L46.1 86 L46.1 60.5 Z M52.1 61.5 L53.6 62.5 L51.1 64 Z M46.1 86 L52.1 86 L50.9 87.8 L49.1 89 L47.3 87.8 Z M52.1 86 L52.05 87.25 L51.85 88.5 L51.45 89.7 L50.8 90.85 L50 91.85 L49 92.65 L47.85 93.3 L46.65 93.7 L45.4 93.9 L44.1 94 L44.1 88 L44.75 87.95 L45.2 87.85 L45.5 87.75 L45.65 87.7 L45.75 87.6 L45.85 87.5 L45.9 87.35 L46 87.05 L46.1 86.6 L46.1 86 Z","bounds":[44.1,60.5,53.6,94],"direction":"curve","weight":32.071068,"revealPath":"M49.148250000000004 61 L49.148250000000004 86 Q49.148250000000004 91 44.148250000000004 91","revealWidth":14},{"outline":"M44.1 91 L34.1 89.5 L34.1 88 L44.1 88 Z","bounds":[34.1,88,44.1,91],"direction":"left","weight":10}],[{"outline":"M34.15 73.45 L37.4 72.9 L40.6 72.3 L43.7 71.7 L46.75 71.1 L49.7 70.4 L52.6 69.75 L55.5 69.05 L58.3 68.35 L61.05 67.65 L63.8 67.05 L64.15 67.9 L61.75 69.45 L59.2 70.85 L56.55 72.15 L53.8 73.35 L50.95 74.5 L48 75.55 L44.95 76.55 L41.85 77.55 L38.65 78.45 L35.35 79.3 Z M35.35 79.3 L33.2 73.65 L34.15 73.45 Z M35.35 79.3 L38 77.25 L36.65 80.6 Z","bounds":[33.2,67.05,64.15,80.6],"direction":"curve","weight":31.037998,"revealPath":"M34.296 76.5 Q51.32175 73 64.0005 67.5","revealWidth":14}],[{"outline":"M77.35 7.9 L76.35 12.9 L75.25 17.7 L74.05 22.4 L72.7 26.9 L71.25 31.2 L69.7 35.4 L68 39.4 L66.15 43.2 L64.1 46.8 L61.9 50.2 L61.1 49.75 L62.4 46 L63.65 42.15 L64.9 38.2 L66.1 34.15 L67.2 30 L68.25 25.65 L69.15 21.2 L70 16.65 L70.75 11.9 L71.4 7 Z M71.35 7.5 L71.55 6 L77.35 7.9 Z M77.35 7.9 L78.65 9.15 L75.95 10.25 Z","bounds":[61.1,6,78.65,50.2],"direction":"curve","weight":44.91406,"revealPath":"M74.47469999999998 7 Q70.5831 32.5 61.5027 50","revealWidth":14}],[{"outline":"M69.25 30.5 L93.25 30.5 L93.25 32.5 L69.25 32.5 Z M93.25 30.5 L83.25 31.5 L88.25 26 Z","bounds":[69.25,26,93.25,32.5],"direction":"right","weight":23.9982}],[{"outline":"M87.15 31.7 L86 41.2 L84.4 50 L82.35 58.1 L79.9 65.55 L76.95 72.25 L73.55 78.25 L69.7 83.45 L65.4 87.95 L60.7 91.6 L55.55 94.35 L55.1 93.6 L59.5 90.1 L63.5 86.05 L67.1 81.45 L70.3 76.3 L73.1 70.45 L75.5 64 L77.5 56.8 L79.15 49 L80.35 40.45 L81.2 31.25 Z","bounds":[55.1,31.25,87.15,94.35],"direction":"curve","weight":68.842614,"revealPath":"M84.2037 31.5 Q80.3121 80 55.340999999999994 94","revealWidth":14}],[{"outline":"M67.8 36.95 L69.25 44.2 L70.85 50.9 L72.7 57.15 L74.75 62.85 L77.1 68 L79.65 72.7 L82.5 76.85 L85.6 80.45 L88.95 83.6 L92.55 86.3 L88.75 91.65 L84.75 88.25 L81.2 84.35 L78 80 L75.2 75.2 L72.8 69.95 L70.8 64.25 L69.2 58.1 L67.95 51.5 L67.2 44.5 L66.9 37 Z M88.75 91.65 L92.55 86.3 L94.25 87.45 Z","bounds":[66.9,36.95,94.25,91.65],"direction":"curve","weight":57.458279,"revealPath":"M67.3401 36.5 Q70.9074 75 90.68969999999999 89","revealWidth":14}]];
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const Q_SPECS=[{pen:9,mask:2,path:"M58.204499999999996 53.5 Q53.49525 60.5 49.148250000000004 65",T:[1n,2n],K:[1n,50n]}];
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
    ensure(['M Q', 'M L L', 'M L Q L'].includes(syntax), 'exact source command sequence');
    return { syntax, commands, values };
}
function certificate(pen, mask, s) {
    const parse = parsed(s);
    const spec = Q_SPECS.find(v => v.pen === pen && v.mask === mask);
    ensure(spec && parse.syntax === 'M Q' && s.revealPath === spec.path, 'exact Q9m2 certificate allowlist');
    const tokens = s.revealPath.split(' '), n = [tokens[0].slice(1), tokens[1], tokens[2].slice(1), tokens[3], tokens[4], tokens[5]].map(dec), P0 = n.slice(0, 2), P1 = n.slice(2, 4), P2 = n.slice(4), A = P1.map((v, i) => sub(v, P0[i])), B = P0.map((v, i) => add(sub(v, mul(R(2), P1[i])), P2[i])), T = R(spec.T[0], spec.T[1]), K = R(spec.K[0], spec.K[1]), aa = dot(A, A), ab = dot(A, B), bb = dot(B, B);
    ensure(gt(bb, R(0)), 'fixed nonzero Q second derivative');
    const normAt = (t) => add(add(aa, mul(mul(R(2), ab), t)), mul(bb, mul(t, t))), star = div(R(-ab.n, ab.d), bb), minimumT = gt(star, R(0)) && gt(T, star) ? star : (gt(normAt(T), aa) ? R(0) : T), lambda = normAt(minimumT), delta = A.map((v, i) => add(mul(mul(R(2), T), v), mul(mul(T, T), B[i]))), cross = sub(mul(A[0], B[1]), mul(A[1], B[0])), kr = mul(R(7), K), den = mul(R(4), mul(mul(lambda, lambda), lambda));
    ensure(gt(lambda, R(0)) && gt(dot(delta, delta), R(49)), 'initial Q regularity and arc7');
    ensure(gt(mul(mul(K, K), den), mul(cross, cross)), 'exact Q curvature bound');
    ensure(gt(sub(R(1), mul(R(1, 2), mul(kr, kr))), kr), 'initial-offset injectivity lower bound');
    certificateChecks++;
    return Object.freeze({ syntax: parse.syntax, initialArcMax: 7, parameterBound: Number(spec.T[0]) / Number(spec.T[1]), curvatureBound: Number(spec.K[0]) / Number(spec.K[1]), exactDecimalRational: true, notRasterProof: true, notPolygonConnectivityProof: true, notFullSweepProof: true });
}

const POLICIES=Object.freeze(Q_SPECS.map(t=>Object.freeze({id:'u564b-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:certificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
const eq=(a,b)=>ensure(a===b,'exact own JSON shape'),deep=(a,b)=>ensure(same(a,b),'exact own JSON keys');
function strictJSON(value){if(value===null||typeof value==='string'||typeof value==='boolean')return;if(typeof value==='number'){ensure(Number.isFinite(value));return}ensure(value&&typeof value==='object');if(Array.isArray(value)){eq(Object.getPrototypeOf(value),Array.prototype);eq(Reflect.ownKeys(value).length,value.length+1);for(let i=0;i<value.length;i++){const d=Object.getOwnPropertyDescriptor(value,String(i));ensure(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}return}eq(Object.getPrototypeOf(value),Object.prototype);deep(Reflect.ownKeys(value),Object.keys(value));for(const k of Object.keys(value)){const d=Object.getOwnPropertyDescriptor(value,k);ensure(d&&d.enumerable&&Object.hasOwn(d,'value'));strictJSON(d.value)}}
export function assertFixedGeometry(strokes){strictJSON(strokes);ensure(same(strokes,FIXED_STROKES),'exact15p17m33 source only');return true}
function policy(s){strictJSON(s);const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact original Q9m2 mask');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only9m2');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 噋 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 噋 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 噋 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 噋 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 噋 SVG coordinate tree');
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
        throw new Error('Invalid 噋 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 噋 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 噋 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 噋 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 噋 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('噋 UA start differs from exact M');
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
            throw new Error('Invalid 噋 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 噋 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 噋 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('噋 binding changed during UA read');
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
            throw new Error('噋 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=15&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=global===1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,15,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
