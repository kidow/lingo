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

const FIXED_STROKES=[[{"outline":"M16.2 20.85 L16.2 73.1 L10.2 76.1 L10.2 17.85 Z","bounds":[10.2,17.85,16.2,76.1],"direction":"down","weight":44.28}],[{"outline":"M13.2 20.85 L30.5 20.85 L30.5 22.85 L13.2 22.85 Z","bounds":[13.2,20.85,30.5,22.85],"direction":"right","weight":17.2927},{"outline":"M33.5 21.85 L33.5 70.1 L27.5 73.1 L27.5 21.85 Z M27.5 20.85 L30.5 18.35 L36 22.85 L33.5 24.85 L27.5 21.85 Z","bounds":[27.5,18.35,36,73.1],"direction":"down","weight":44.28}],[{"outline":"M13.2 65.1 L30.5 65.1 L30.5 67.1 L13.2 67.1 Z","bounds":[13.2,65.1,30.5,67.1],"direction":"right","weight":17.2927}],[{"outline":"M65.4 8 L65.4 25 L59.4 25 L59.4 7 Z M65.4 8 L66.9 9 L64.4 10.5 Z","bounds":[59.4,7,66.9,25],"direction":"down","weight":16.5}],[{"outline":"M62.4 15 L88.95 15 L88.95 17 L62.4 17 Z M88.95 15 L76.95 16 L82.95 10 Z","bounds":[62.4,10,88.95,17],"direction":"right","weight":26.52}],[{"outline":"M42.5 23 L88.35 23 L88.35 25 L42.5 25 Z","bounds":[42.5,23,88.35,25],"direction":"right","weight":45.8575},{"outline":"M91.1 25.25 L90.35 26.35 L89.6 27.5 L88.8 28.65 L88 29.8 L87.15 30.9 L86.3 32.05 L85.4 33.2 L84.5 34.35 L83.5 35.45 L82.7 36.7 L81.9 36.25 L82.4 34.9 L82.7 33.45 L83.05 32.05 L83.4 30.65 L83.8 29.3 L84.15 27.95 L84.55 26.6 L84.9 25.3 L85.3 24 L85.65 22.7 Z M85.35 23 L88.35 20.5 L93.85 25 L91.35 26.5 L85.35 29 Z","bounds":[81.9,20.5,93.85,36.7],"direction":"curve","weight":13.899137,"revealPath":"M88.3975 24 Q85.635 30 82.32 36.5","revealWidth":14}],[{"outline":"M45.5 23 L45.5 50 L39.5 50 L39.5 20 Z M39.5 50 L45.5 50 L44.3 51.8 L42.5 53 L40.7 51.8 Z M45.5 50 L45.25 56.35 L44.75 62.3 L44 67.85 L43.05 72.95 L41.8 77.6 L40.35 81.85 L38.6 85.6 L36.6 88.9 L34.3 91.65 L31.8 93.8 L31.15 93.15 L32.8 90.5 L34.3 87.55 L35.6 84.25 L36.75 80.65 L37.7 76.6 L38.45 72.1 L39.05 67.2 L39.4 61.9 L39.55 56.15 L39.5 50 Z","bounds":[31.15,20,45.5,93.8],"direction":"curve","weight":70.881539,"revealPath":"M42.54 24 L42.54 50 Q42.54 82.5 31.490000000000002 93.5","revealWidth":14}],[{"outline":"M42.95 36.5 L81.1 32.5 L81.3 34.45 L43.15 38.45 Z M81.1 32.5 L69.25 34.75 L74.6 28.15 Z","bounds":[42.95,28.15,81.3,38.45],"direction":"curve","weight":38.331775,"revealPath":"M43.0925 37.5 L81.215 33.5","revealWidth":14}],[{"outline":"M63.75 26 L63.75 38.5 L57.75 38.5 L57.75 25 Z M63.75 26 L65.25 27 L62.75 28.5 Z M57.75 38.5 L63.75 38.5 L62.55 40.3 L60.75 41.5 L58.95 40.3 Z M63.75 38.5 L63.8 39.1 L63.85 39.55 L63.95 39.85 L64.05 40 L64.1 40.1 L64.2 40.2 L64.4 40.25 L64.7 40.35 L65.15 40.45 L65.75 40.5 L65.75 46.5 L64.45 46.4 L63.2 46.2 L62 45.8 L60.9 45.15 L59.9 44.35 L59.05 43.35 L58.45 42.2 L58.05 41 L57.8 39.75 L57.75 38.5 Z M65.75 40.5 L67.85 41.4 L68.75 43.5 L67.85 45.6 L65.75 46.5 Z M65.75 40.5 L88.95 40.5 L88.95 46.5 L65.75 46.5 Z M88.95 40.5 L90.75 41.7 L91.95 43.5 L90.75 45.3 L88.95 46.5 Z","bounds":[57.75,25,91.95,46.5],"direction":"curve","weight":43.248568,"revealPath":"M60.772499999999994 25.5 L60.772499999999994 38.5 Q60.772499999999994 43.5 65.7725 43.5 L88.95 43.5","revealWidth":14},{"outline":"M88.95 40.5 L85.95 40.5 L88.95 28 L89.95 28 Z","bounds":[85.95,28,89.95,40.5],"direction":"up","weight":12.5}],[{"outline":"M82.6 53.5 L79.55 54.1 L76.4 54.7 L73.2 55.2 L69.9 55.6 L66.5 56 L63 56.25 L59.4 56.5 L55.7 56.6 L51.95 56.6 L48.05 56.4 L48 55.55 L51.75 54.7 L55.45 53.95 L59 53.25 L62.45 52.5 L65.8 51.8 L69.05 51.05 L72.2 50.25 L75.25 49.45 L78.2 48.6 L81.05 47.7 Z M80.55 47.85 L86.2 52.55 L82.6 53.5 Z M86.2 52.55 L86.35 54.05 L82.8 52.4 Z","bounds":[48,47.7,86.35,56.6],"direction":"curve","weight":34.693732,"revealPath":"M82.32 50.5 Q67.4025 54.5 48.065 56","revealWidth":14}],[{"outline":"M49.8 59.35 L51.1 60 L52.45 60.5 L53.75 61.05 L55 61.7 L56.15 62.4 L57.25 63.15 L58.3 63.95 L59.25 64.8 L60.15 65.75 L61 66.7 L55.75 69.6 L55.45 68.75 L55.1 67.85 L54.7 66.95 L54.2 66 L53.6 65.05 L52.95 64.05 L52.2 63.05 L51.35 62.05 L50.45 61 L49.35 60.1 Z M61 66.7 L61.2 69 L59.8 70.8 L57.55 71 L55.75 69.6 Z","bounds":[49.35,59.35,61.2,71],"direction":"curve","weight":14.103298,"revealPath":"M49.17 59.5 Q55.8 63.5 59.114999999999995 69.5","revealWidth":14}],[{"outline":"M87.75 60.65 L86.7 61.7 L85.6 62.85 L84.45 64 L83.25 65.2 L81.95 66.45 L80.6 67.7 L79.15 69.05 L77.6 70.4 L76 71.8 L74.35 73.25 L73.65 72.7 L74.85 70.85 L75.9 68.95 L76.95 67.2 L77.95 65.55 L78.9 63.95 L79.8 62.45 L80.65 61 L81.45 59.65 L82.2 58.35 L82.9 57.1 Z M82.6 57.5 L83.15 56.8 L87.75 60.65 Z M87.75 60.65 L88.35 62.35 L85.45 62.1 Z","bounds":[73.65,56.8,88.35,73.25],"direction":"curve","weight":18.570622,"revealPath":"M85.635 58.5 Q81.215 64.5 74.0325 73","revealWidth":14}],[{"outline":"M45.3 73.5 L93.35 73.5 L93.35 75.5 L45.3 75.5 Z M93.35 73.5 L81.35 74.5 L87.35 68.5 Z","bounds":[45.3,68.5,93.35,75.5],"direction":"right","weight":48.0675}],[{"outline":"M71.5 56.5 L71.5 86.5 L65.5 86.5 L65.5 55.5 Z M71.5 56.5 L73 57.5 L70.5 59 Z M65.5 86.5 L71.5 86.5 L70.3 88.3 L68.5 89.5 L66.7 88.3 Z M71.5 86.5 L71.4 87.75 L71.2 89 L70.8 90.2 L70.2 91.35 L69.35 92.35 L68.35 93.15 L67.2 93.8 L66 94.2 L64.75 94.4 L63.5 94.5 L63.5 88.5 L64.1 88.45 L64.55 88.35 L64.85 88.25 L65 88.2 L65.1 88.1 L65.2 88 L65.3 87.85 L65.35 87.55 L65.45 87.1 L65.5 86.5 Z M63.5 91.5 L53.5 90 L53.5 88.5 L63.5 88.5 Z","bounds":[53.5,55.5,73,94.5],"direction":"curve","weight":37.571068,"revealPath":"M68.5075 56 L68.5075 86.5 Q68.5075 91.5 63.50749999999999 91.5","revealWidth":14}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);

const INITIAL_CERTIFICATE=Object.freeze({syntax:'M Q',initialArcMax:7,parameterBound:2/3,curvatureBound:1/100,exactDecimalRational:true,proofPreviouslyComputed:true,notRasterProof:true});
const POLICIES=Object.freeze([Object.freeze({id:'u5611-6-2',pen:6,mask:2,segment:FIXED_STROKES[5][1],certificate:INITIAL_CERTIFICATE})]);
export const SOURCE_GEOMETRY_SHA256='ea03032f8d367306063644973a80a18d73db3e1df2dde62b6ae17096d939ab31',INITIAL_CERTIFICATE_REUSED=true;
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return 0}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact14p17m40 cached-UP9 source only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact u5611-6-2 Q');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only6m2');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 澯 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 澯 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 澯 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 澯 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 澯 SVG coordinate tree');
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
        throw new Error('Invalid 澯 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 澯 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 澯 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 澯 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 澯 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('澯 UA start differs from exact M');
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
            throw new Error('Invalid 澯 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 澯 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 澯 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('澯 binding changed during UA read');
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
            throw new Error('澯 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=14&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=global===1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,14,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
