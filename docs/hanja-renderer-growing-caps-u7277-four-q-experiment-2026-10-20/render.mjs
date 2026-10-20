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

const FIXED_STROKES=[[{"outline":"M19.75 14.75 L19.15 19.05 L18.45 23.25 L17.6 27.3 L16.65 31.25 L15.6 35.1 L14.4 38.8 L13.1 42.35 L11.65 45.8 L10.05 49.05 L8.2 52.15 L7.4 51.8 L8.25 48.35 L9.15 44.9 L9.95 41.4 L10.75 37.8 L11.45 34.1 L12.1 30.3 L12.65 26.45 L13.1 22.45 L13.5 18.4 L13.8 14.2 Z M13.75 14.7 L13.9 13.1 L19.75 14.75 Z M19.75 14.75 L21.15 15.9 L18.55 17.15 Z","bounds":[7.4,13.1,21.15,52.15],"direction":"curve","weight":39.055863,"revealPath":"M16.85 14 Q14.8 36 7.83 52","revealWidth":14}],[{"outline":"M13.95 31 L42.65 31 L42.65 33 L13.95 33 Z M42.65 31 L30.65 32 L36.65 26 Z","bounds":[13.95,26,42.65,33],"direction":"right","weight":28.7}],[{"outline":"M30.1 7.5 L30.1 91.5 L24.1 94.5 L24.1 6.5 Z M30.1 7.5 L31.6 8.5 L29.1 10 Z","bounds":[24.1,6.5,31.6,94.5],"direction":"down","weight":86}],[{"outline":"M8.3 63 L11.1 62 L14.05 60.9 L17.1 59.8 L20.25 58.65 L23.5 57.45 L26.85 56.3 L30.35 55.05 L34 53.85 L37.75 52.7 L41.65 51.55 L42 52.4 L38.5 54.45 L35.05 56.3 L31.65 58.1 L28.35 59.75 L25.15 61.4 L22.05 62.9 L19.05 64.4 L16.15 65.85 L13.35 67.2 L10.7 68.55 Z M10.7 68.55 L7.4 63.4 L8.3 63 Z M10.7 68.55 L12.85 65.95 L12.2 69.5 Z","bounds":[7.4,51.55,42,69.5],"direction":"curve","weight":35.662866,"revealPath":"M9.059999999999999 66 Q23 60 41.86 52","revealWidth":14}],[{"outline":"M67.7 12.5 L67.2 13.6 L65 18.3 L62.55 22.85 L59.85 27.3 L56.95 31.55 L53.8 35.6 L50.4 39.55 L46.75 43.3 L42.9 46.85 L38.75 50.2 L34.3 53.3 L33.75 52.65 L37.45 48.8 L41 44.95 L44.35 41.1 L47.45 37.1 L50.4 33.1 L53.1 28.95 L55.55 24.7 L57.8 20.35 L59.8 15.9 L61.1 12.5 Z","bounds":[33.75,12.5,67.7,53.3],"direction":"curve","weight":50.625,"revealPath":"M64.425 12.5 Q54.975 36 34.05 53","revealWidth":14}],[{"outline":"M50.55 11.5 L69.15 11.5 L69.15 13.5 L50.55 13.5 Z M69.15 11.5 L59.15 12.5 L64.15 7 Z","bounds":[50.55,7,69.15,13.5],"direction":"right","weight":18.5625},{"outline":"M66.35 12.75 L69.1 17.15 L71.75 21.25 L74.4 25.1 L77 28.65 L79.65 31.95 L82.3 34.9 L85 37.55 L87.7 39.9 L90.45 41.95 L93.2 43.7 L89.6 49.25 L86.6 46.9 L83.75 44.3 L81.05 41.4 L78.4 38.2 L75.9 34.75 L73.55 31 L71.3 27 L69.2 22.7 L67.25 18.05 L65.55 13.1 Z M89.6 49.25 L93.2 43.7 L95.1 44.95 Z","bounds":[65.55,12.75,95.1,49.25],"direction":"curve","weight":42.590169,"revealPath":"M65.775 12.5 Q76.9125 37 91.425 46.5","revealWidth":14}],[{"outline":"M48.9 44.5 L79.25 44.5 L79.25 46.5 L48.9 46.5 Z M79.25 44.5 L67.25 45.5 L73.25 39.5 Z","bounds":[48.9,39.5,79.25,46.5],"direction":"right","weight":30.375}],[{"outline":"M45.5 65.5 L82.65 65.5 L82.65 67.5 L45.5 67.5 Z M82.65 65.5 L70.65 66.5 L76.65 60.5 Z","bounds":[45.5,60.5,82.65,67.5],"direction":"right","weight":37.125}],[{"outline":"M66.75 45.5 L66.75 89.5 L60.75 89.5 L60.75 45.5 Z","bounds":[60.75,45.5,66.75,89.5],"direction":"down","weight":42}],[{"outline":"M37.75 87.5 L90.05 87.5 L90.05 89.5 L37.75 89.5 Z M90.05 87.5 L78.05 88.5 L84.05 82.5 Z","bounds":[37.75,82.5,90.05,89.5],"direction":"right","weight":52.3125}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const Q_SPECS=[{"pen":1,"mask":1,"path":"M16.85 14 Q14.8 36 7.83 52"},{"pen":4,"mask":1,"path":"M9.059999999999999 66 Q23 60 41.86 52"},{"pen":5,"mask":1,"path":"M64.425 12.5 Q54.975 36 34.05 53"},{"pen":6,"mask":2,"path":"M65.775 12.5 Q76.9125 37 91.425 46.5"}].map(t=>({...t,T:[1n,3n],K:[1n,20n]}));
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
    ensure(spec && parse.syntax === 'M Q' && s.revealPath === spec.path, 'exact four Q certificate allowlist');
    const tokens = s.revealPath.split(' '), n = [tokens[0].slice(1), tokens[1], tokens[2].slice(1), tokens[3], tokens[4], tokens[5]].map(dec), P0 = n.slice(0, 2), P1 = n.slice(2, 4), P2 = n.slice(4), A = P1.map((v, i) => sub(v, P0[i])), B = P0.map((v, i) => add(sub(v, mul(R(2), P1[i])), P2[i])), T = R(spec.T[0], spec.T[1]), K = R(spec.K[0], spec.K[1]), aa = dot(A, A), ab = dot(A, B), bb = dot(B, B);
    ensure(gt(bb, R(0)), 'fixed nonzero Q second derivative');
    const normAt = (t) => add(add(aa, mul(mul(R(2), ab), t)), mul(bb, mul(t, t))), star = div(R(-ab.n, ab.d), bb), minimumT = gt(star, R(0)) && gt(T, star) ? star : (gt(normAt(T), aa) ? R(0) : T), lambda = normAt(minimumT), delta = A.map((v, i) => add(mul(mul(R(2), T), v), mul(mul(T, T), B[i]))), cross = sub(mul(A[0], B[1]), mul(A[1], B[0])), kr = mul(R(7), K), den = mul(R(4), mul(mul(lambda, lambda), lambda));
    ensure(gt(lambda, R(0)) && gt(dot(delta, delta), R(49)), 'initial Q regularity and arc7');
    ensure(gt(mul(mul(K, K), den), mul(cross, cross)), 'exact Q curvature bound');
    ensure(gt(sub(R(1), mul(R(1, 2), mul(kr, kr))), kr), 'initial-offset injectivity lower bound');
    certificateChecks++;
    return Object.freeze({ syntax: parse.syntax, initialArcMax: 7, parameterBound: Number(spec.T[0]) / Number(spec.T[1]), curvatureBound: Number(spec.K[0]) / Number(spec.K[1]), exactDecimalRational: true, notRasterProof: true, notPolygonConnectivityProof: true, notFullSweepProof: true });
}

const POLICIES=Object.freeze(Q_SPECS.map(t=>Object.freeze({id:'u7277-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:certificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact10p11m22 source only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only four exact original Q masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only1m1/4m1/5m1/6m2');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 牷 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 牷 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 牷 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 牷 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 牷 SVG coordinate tree');
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
        throw new Error('Invalid 牷 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 牷 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 牷 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 牷 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 牷 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('牷 UA start differs from exact M');
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
            throw new Error('Invalid 牷 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 牷 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 牷 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('牷 binding changed during UA read');
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
            throw new Error('牷 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=10&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=global===1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,10,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
