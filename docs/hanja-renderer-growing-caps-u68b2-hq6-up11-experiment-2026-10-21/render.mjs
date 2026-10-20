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

const FIXED_STROKES=[[{"outline":"M6.85 29.5 L41.5 29.5 L41.5 31.5 L6.85 31.5 Z M41.5 29.5 L29.5 30.5 L35.5 24.5 Z","bounds":[6.85,24.5,41.5,31.5],"direction":"right","weight":34.65}],[{"outline":"M27.85 8 L27.85 91.5 L21.85 94.5 L21.85 7 Z M27.85 8 L29.35 9 L26.85 10.5 Z","bounds":[21.85,7,29.35,94.5],"direction":"down","weight":85.5}],[{"outline":"M26.55 30.5 L26.45 31 L25.3 35.95 L23.95 40.7 L22.5 45.4 L20.85 49.95 L19.05 54.35 L17.05 58.65 L14.9 62.8 L12.55 66.8 L10 70.6 L7.2 74.2 L6.45 73.75 L8.35 69.65 L10.2 65.55 L11.95 61.35 L13.6 57.15 L15.1 52.85 L16.45 48.45 L17.7 43.95 L18.75 39.4 L19.7 34.7 L20.4 30.5 Z","bounds":[6.45,30.5,26.55,74.2],"direction":"curve","weight":46.577597,"revealPath":"M23.5 30.5 Q19 55 6.85 74","revealWidth":14}],[{"outline":"M26.35 42.8 L28.05 43.35 L29.8 43.9 L31.45 44.55 L33 45.25 L34.5 46.1 L35.9 47.05 L37.3 48.05 L38.55 49.15 L39.75 50.3 L40.9 51.55 L35.9 54.9 L35.3 53.7 L34.6 52.5 L33.85 51.35 L33 50.2 L32.05 49.05 L31.05 47.95 L29.9 46.85 L28.7 45.7 L27.45 44.55 L26 43.6 Z M40.9 51.55 L41.3 53.8 L40.05 55.75 L37.8 56.15 L35.9 54.9 Z","bounds":[26,42.8,41.3,56.15],"direction":"curve","weight":17.734148,"revealPath":"M25.75 43 Q34.3 47 39.25 54.5","revealWidth":14}],[{"outline":"M58.95 18.3 L57.35 20.85 L55.65 23.3 L53.85 25.7 L51.9 28.05 L49.9 30.3 L47.75 32.5 L45.45 34.6 L43.05 36.65 L40.45 38.55 L37.75 40.3 L37.15 39.65 L39.2 37.15 L41.15 34.75 L43.05 32.35 L44.9 30 L46.6 27.6 L48.2 25.25 L49.75 22.85 L51.15 20.4 L52.45 17.95 L53.65 15.5 Z M53.4 15.95 L53.9 15 L58.95 18.3 Z M58.95 18.3 L59.8 19.9 L56.9 20.05 Z","bounds":[37.15,15,59.8,40.3],"direction":"curve","weight":30.270388,"revealPath":"M56.54 16.5 Q49.65 29.5 37.46 40","revealWidth":14}],[{"outline":"M54.4 11.5 L79.3 11.5 L79.3 13.5 L54.4 13.5 Z M79.3 11.5 L69.3 12.5 L74.3 7 Z","bounds":[54.4,7,79.3,13.5],"direction":"right","weight":24.91},{"outline":"M73.55 12.75 L75.25 14.7 L76.9 16.6 L78.6 18.5 L80.3 20.3 L82.15 22 L84.05 23.7 L86.1 25.3 L88.2 26.85 L90.45 28.3 L92.8 29.7 L89.15 35.25 L86.75 33.35 L84.5 31.45 L82.4 29.4 L80.45 27.35 L78.7 25.15 L77.1 22.9 L75.65 20.6 L74.45 18.2 L73.45 15.7 L72.75 13.1 Z M89.15 35.25 L92.8 29.7 L94.7 30.95 Z","bounds":[72.75,12.75,94.7,35.25],"direction":"curve","weight":26.920631,"revealPath":"M72.97 12.5 Q78.8 24.5 90.99 32.5","revealWidth":14}],[{"outline":"M53.7 35 L53.7 64 L47.7 67 L47.7 32 Z","bounds":[47.7,32,53.7,67],"direction":"down","weight":21}],[{"outline":"M50.7 35 L82.5 35 L82.5 37 L50.7 37 Z M85.5 36 L85.5 61 L79.5 64 L79.5 36 Z M79.5 35 L82.5 32.5 L88 37 L85.5 39 L79.5 36 Z","bounds":[50.7,32.5,88,64],"direction":"curve","weight":52.8,"revealPath":"M50.71 36 L82.51 36 L82.51 57","revealWidth":14}],[{"outline":"M50.7 56 L82.5 56 L82.5 58 L50.7 58 Z","bounds":[50.7,56,82.5,58],"direction":"right","weight":31.8}],[{"outline":"M63.65 61.35 L62.65 66.2 L61.15 70.7 L59.25 74.95 L56.95 78.85 L54.2 82.4 L51.05 85.65 L47.45 88.55 L43.5 91.05 L39.15 93.2 L34.45 94.9 L34.1 94.05 L38.25 91.5 L42.05 88.8 L45.4 86 L48.35 83 L50.85 79.8 L53 76.4 L54.75 72.8 L56.1 68.95 L57.1 64.9 L57.7 60.6 Z M57.65 61.05 L57.85 59.55 L63.65 61.35 Z M63.65 61.35 L65 62.55 L62.35 63.7 Z","bounds":[34.1,59.55,65,94.9],"direction":"curve","weight":43.107424,"revealPath":"M60.78 60.5 Q57.6 84.5 34.28 94.5","revealWidth":14}],[{"outline":"M74.35 56 L74.35 85 L68.35 85 L68.35 56 Z M68.35 85 L74.35 85 L73.15 86.8 L71.35 88 L69.55 86.8 Z M74.35 85 L74.4 85.6 L74.45 86.05 L74.55 86.35 L74.65 86.5 L74.75 86.6 L74.8 86.7 L75 86.75 L75.3 86.85 L75.75 86.95 L76.35 87 L76.35 93 L75.05 92.9 L73.85 92.7 L72.6 92.3 L71.5 91.65 L70.5 90.85 L69.65 89.85 L69.05 88.7 L68.65 87.5 L68.4 86.25 L68.35 85 Z M76.35 87 L78.45 87.9 L79.35 90 L78.45 92.1 L76.35 93 Z M76.35 87 L90.45 87 L90.45 93 L76.35 93 Z M90.45 87 L92.25 88.2 L93.45 90 L92.25 91.8 L90.45 93 Z","bounds":[68.35,56,93.45,93],"direction":"curve","weight":49.151068,"revealPath":"M71.38 57 L71.38 85 Q71.38 90 76.38 90 L90.46 90","revealWidth":14},{"outline":"M90.45 87 L87.45 87 L90.45 74.5 L91.45 74.5 Z","bounds":[87.45,74.5,91.45,87],"direction":"up","weight":12.5}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;
const Q_SPECS=Object.freeze([{"pen":6,"mask":2,"raw":6,"id":"u68b2-6-2","path":"M72.97 12.5 Q78.8 24.5 90.99 32.5","maskSHA256":"dbfa24c8aeebc67000f29b2037713a2834e289aa280501efe1ed07ff93d474f6","T":[1,3],"K":[1,40]}].map(s=>Object.freeze(s)));
const R=(n,d=1n)=>({n:BigInt(n),d:BigInt(d)}),addR=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),negR=a=>R(-a.n,a.d),subR=(a,b)=>addR(a,negR(b)),mulR=(a,b)=>R(a.n*b.n,a.d*b.d),ltR=(a,b)=>a.n*b.d<b.n*a.d,absR=a=>R(a.n<0n?-a.n:a.n,a.d),sqR=a=>mulR(a,a),cubeR=a=>mulR(sqR(a),a),rat=s=>{const [a,b='']=String(s).split('.');return R(BigInt(a+b),10n**BigInt(b.length))},textR=a=>a.n+'/'+a.d;
function qCertificate(spec,s){ensure(spec===Q_SPECS[0]&&spec.pen===6&&spec.mask===2&&s.revealPath===spec.path&&s.revealWidth===14&&same(s,FIXED_STROKES[5][1]),'only exact first Q6m2 allfields');const a=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(a,'own Q6m2 canonical guide');const v=a.slice(1).map(rat),A=[subR(v[2],v[0]),subR(v[3],v[1])],B=[addR(subR(v[4],mulR(R(2),v[2])),v[0]),addR(subR(v[5],mulR(R(2),v[3])),v[1])],dot=(a,b)=>addR(mulR(a[0],b[0]),mulR(a[1],b[1])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),div=(a,b)=>{ensure(b.n!==0n,'own Q denominator');return R(a.n*b.d,a.d*b.n)},T=R(1,3),K=R(1,40),star=div(negR(ab),bb),norm=t=>addR(addR(aa,mulR(mulR(R(2),ab),t)),mulR(bb,sqR(t)));ensure(ltR(R(0),star)&&ltR(star,T),'own Q6m2 internal speed minimum');const S=norm(star),cross=absR(subR(mulR(A[0],B[1]),mulR(A[1],B[0]))),chord=A.map((x,i)=>addR(mulR(mulR(R(2),T),x),mulR(sqR(T),B[i]))),chord2=dot(chord,chord),rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(R(0),S)&&ltR(R(49),chord2),'own initial arc7 beforeT');ensure(ltR(sqR(cross),mulR(mulR(R(4),cubeR(S)),sqR(K))),'own exact speed-minimum curvature');ensure(ltR(rK,cosLower),'own initial injectivity sufficient inequality');certificateChecks++;return Object.freeze({syntax:'M Q',T:spec.T,K:spec.K,r:7,initialArcMax:7,minimumT:textR(star),Smin:textR(S),cross:textR(cross),chordSquared:textR(chord2),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,ownInitialArcOnly:true,notRasterOrWholePProof:true})}

const POLICIES=Object.freeze(Q_SPECS.map(q=>Object.freeze({id:q.id,pen:q.pen,mask:q.mask,segment:FIXED_STROKES[q.pen-1][q.mask-1],certificate:qCertificate(q,FIXED_STROKES[q.pen-1][q.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact 梲 K15p16m30 cached full geometry only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact 梲3m2 Q');return t}
function source(t,s){ensure(POLICIES.includes(t)&&Q_SPECS.some(q=>q.id===t.id)&&same(t.segment,s),'private exact Q policy/allfields');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:7}}
export function growingState(s,p,L,point){const t=policy(s);const f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite own Q p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite own Q endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only exact 梲3m2 Q');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=15&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const rawLocal=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),p=pi<stroke-1?1:t&&global===1?1:rawLocal,id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,15,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}


export function renderTargetLocal(strokes,pen,mask,p,prefix='target-local'){assertFixedGeometry(strokes);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'target local p/id');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'own exact local target');return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(t,p,prefix+'-'+pen+'-'+(mask-1))+'</g></svg>'}
