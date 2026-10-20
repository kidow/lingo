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

const FIXED_STROKES=[[{"outline":"M13.9 9.75 L15.75 10.2 L17.55 10.65 L19.3 11.15 L20.95 11.8 L22.45 12.55 L23.9 13.35 L25.3 14.3 L26.55 15.3 L27.7 16.4 L28.75 17.65 L23.6 20.75 L23.15 19.7 L22.6 18.7 L21.95 17.65 L21.15 16.65 L20.25 15.6 L19.15 14.6 L18 13.55 L16.65 12.5 L15.2 11.45 L13.55 10.55 Z M28.75 17.65 L29.05 19.9 L27.7 21.75 L25.45 22.05 L23.6 20.75 Z","bounds":[13.55,9.75,29.05,22.05],"direction":"curve","weight":17.245069,"revealPath":"M13.28 10 Q22.78 13.5 26.96 20.5","revealWidth":14}],[{"outline":"M6.65 32.7 L8.65 33.2 L10.6 33.6 L12.4 34.15 L14.1 34.75 L15.7 35.5 L17.2 36.3 L18.6 37.25 L19.85 38.3 L21 39.45 L22 40.75 L16.75 43.6 L16.4 42.65 L15.9 41.65 L15.25 40.65 L14.45 39.65 L13.5 38.65 L12.4 37.6 L11.15 36.55 L9.7 35.55 L8.15 34.45 L6.35 33.55 Z M22 40.75 L22.25 43 L20.8 44.8 L18.55 45 L16.75 43.6 Z","bounds":[6.35,32.7,22.25,45],"direction":"curve","weight":17.548037,"revealPath":"M6.06 33 Q16.32 36.5 20.12 43.5","revealWidth":14}],[{"outline":"M7.4 66.2 L10.1 66.8 L12.65 67.9 L14.85 69.45 L16.8 71.45 L18.45 73.85 L19.75 76.6 L20.7 79.65 L21.35 83.05 L21.65 86.75 L21.7 90.7 L15.7 90.25 L16 86.75 L16 83.5 L15.8 80.6 L15.3 78 L14.6 75.7 L13.7 73.6 L12.5 71.75 L11.05 70.05 L9.25 68.5 L7.1 67.05 Z M21.7 90.7 L20.65 92.75 L18.45 93.45 L16.45 92.4 L15.7 90.25 Z","bounds":[7.1,66.2,21.7,93.45],"direction":"curve","weight":28.089471,"revealPath":"M6.82 66.5 Q20.12 71 18.6 92","revealWidth":14},{"outline":"M13.75 74.25 L14.4 72.6 L15.35 70.45 L16.55 67.8 L18.05 64.55 L19.85 60.8 L21.95 56.4 L24.35 51.45 L27.1 45.95 L30.25 39.9 L33.75 33.3 L34.55 33.65 L31.95 40.65 L29.6 47.05 L27.4 52.8 L25.45 57.9 L23.75 62.4 L22.35 66.35 L21.2 69.65 L20.4 72.35 L19.85 74.35 L19.6 75.7 Z","bounds":[13.75,33.3,34.55,75.7],"direction":"curve","weight":45.031105,"revealPath":"M16.7 75 Q18.22 69 34.18 33.5","revealWidth":14}],[{"outline":"M54.3 9.5 L52.9 12.55 L51.35 15.6 L49.55 18.65 L47.6 21.6 L45.5 24.55 L43.15 27.4 L40.65 30.25 L37.95 33.05 L35.05 35.7 L31.85 38.3 L31.25 37.65 L33.65 34.4 L35.95 31.3 L38.1 28.2 L40.1 25.15 L41.95 22.15 L43.65 19.15 L45.15 16.2 L46.5 13.25 L47.7 10.3 L48.7 7.4 Z M48.5 7.85 L48.95 6.7 L54.3 9.5 Z M54.3 9.5 L55.35 10.95 L52.5 11.5 Z","bounds":[31.25,6.7,55.35,38.3],"direction":"curve","weight":36.125,"revealPath":"M51.7 8 Q45.95 23.5 31.575000000000003 38","revealWidth":14}],[{"outline":"M48.95 20.5 L48.95 58 L42.95 61 L42.95 20.5 Z","bounds":[42.95,20.5,48.95,61],"direction":"down","weight":32}],[{"outline":"M75.3 10.4 L74.3 11.7 L73.3 12.9 L72.2 14.15 L71.1 15.35 L69.95 16.5 L68.75 17.6 L67.5 18.7 L66.2 19.75 L64.8 20.75 L63.5 21.8 L62.85 21.15 L63.8 19.8 L64.6 18.35 L65.4 16.95 L66.15 15.55 L66.9 14.2 L67.6 12.8 L68.3 11.45 L68.95 10.1 L69.55 8.75 L70.1 7.4 Z M69.85 7.85 L70.35 6.95 L75.3 10.4 Z M75.3 10.4 L76.1 12 L73.2 12.05 Z","bounds":[62.85,6.95,76.1,21.8],"direction":"curve","weight":16.265012,"revealPath":"M72.975 8.5 Q68.95 15.5 63.2 21.5","revealWidth":14}],[{"outline":"M45.95 20.5 L90.2 20.5 L90.2 22.5 L45.95 22.5 Z M90.2 20.5 L78.2 21.5 L84.2 15.5 Z","bounds":[45.95,15.5,90.2,22.5],"direction":"right","weight":44.275}],[{"outline":"M45.95 31 L86.75 31 L86.75 33 L45.95 33 Z M86.75 31 L76.75 32 L81.75 26.5 Z","bounds":[45.95,26.5,86.75,33],"direction":"right","weight":40.825}],[{"outline":"M45.95 41 L86.75 41 L86.75 43 L45.95 43 Z M86.75 41 L76.75 42 L81.75 36.5 Z","bounds":[45.95,36.5,86.75,43],"direction":"right","weight":40.825}],[{"outline":"M67.35 20.5 L67.35 54.5 L61.35 54.5 L61.35 20.5 Z","bounds":[61.35,20.5,67.35,54.5],"direction":"down","weight":32}],[{"outline":"M45.95 52.5 L91.95 52.5 L91.95 54.5 L45.95 54.5 Z M91.95 52.5 L81.95 53.5 L86.95 48 Z","bounds":[45.95,48,91.95,54.5],"direction":"right","weight":46}],[{"outline":"M33.85 65 L93.1 65 L93.1 67 L33.85 67 Z M93.1 65 L81.1 66 L87.1 60 Z","bounds":[33.85,60,93.1,67],"direction":"right","weight":59.225}],[{"outline":"M67.35 56.5 L67.35 92 L61.35 95 L61.35 55.5 Z M67.35 56.5 L68.85 57.5 L66.35 59 Z","bounds":[61.35,55.5,68.85,95],"direction":"down","weight":37.5}],[{"outline":"M63.15 66 L62.4 67.3 L60.55 70.4 L58.4 73.3 L56 76.1 L53.4 78.7 L50.5 81.2 L47.35 83.5 L44 85.65 L40.35 87.6 L36.45 89.35 L32.3 90.9 L31.95 90.05 L35.6 87.7 L39 85.3 L42.15 82.9 L45.05 80.5 L47.7 78 L50.05 75.45 L52.2 72.85 L54.05 70.2 L55.65 67.45 L56.35 66 Z","bounds":[31.95,66,63.15,90.9],"direction":"curve","weight":36.90542,"revealPath":"M59.75 66 Q52.275000000000006 81 32.15 90.5","revealWidth":14}],[{"outline":"M67.85 66.15 L70.25 68.4 L72.55 70.55 L74.8 72.6 L77.05 74.45 L79.3 76.2 L81.55 77.75 L83.85 79.15 L86.2 80.4 L88.55 81.5 L90.95 82.45 L88.3 88.5 L85.7 87.1 L83.2 85.5 L80.75 83.75 L78.45 81.8 L76.25 79.7 L74.15 77.45 L72.15 75.05 L70.3 72.45 L68.6 69.65 L67.1 66.65 Z M88.3 88.5 L90.95 82.45 L94 83.8 Z","bounds":[67.1,66.15,94,88.5],"direction":"curve","weight":29.717514,"revealPath":"M67.225 66 Q77 80 89.65 85.5","revealWidth":14}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;
const Q_SPECS=Object.freeze([{"pen":3,"mask":1,"raw":2,"id":"u6f57-k-3-1","path":"M6.82 66.5 Q20.12 71 18.6 92","maskSHA256":"9071cffc4800f87d70bda3696c05f5ffc17b5b0b8f27c68cfcf928c033108fd8","T":[1,3],"K":[1,11]},{"pen":3,"mask":2,"raw":3,"id":"u6f57-k-3-2","path":"M16.7 75 Q18.22 69 34.18 33.5","maskSHA256":"ee0de79b6830b8084b9f328d70829fc420092a6ceb38a3d7cfddeae88abc9c5d","T":[1,3],"K":[1,11]}].map(s=>Object.freeze(s)));
const R=(n,d=1n)=>({n:BigInt(n),d:BigInt(d)}),addR=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),negR=a=>R(-a.n,a.d),subR=(a,b)=>addR(a,negR(b)),mulR=(a,b)=>R(a.n*b.n,a.d*b.d),ltR=(a,b)=>a.n*b.d<b.n*a.d,absR=a=>R(a.n<0n?-a.n:a.n,a.d),sqR=a=>mulR(a,a),cubeR=a=>mulR(sqR(a),a),rat=s=>{const [a,b='']=String(s).split('.');return R(BigInt(a+b),10n**BigInt(b.length))},textR=a=>a.n+'/'+a.d;
function qCertificate(spec,s){ensure(Q_SPECS.includes(spec)&&s.revealPath===spec.path&&s.revealWidth===14,'private exact Q path/width');ensure(same(s,FIXED_STROKES[spec.pen-1][spec.mask-1]),'exact Q all fields');const a=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(a,'own canonical single Q');const v=a.slice(1).map(rat),A=[subR(v[2],v[0]),subR(v[3],v[1])],B=[addR(subR(v[4],mulR(R(2),v[2])),v[0]),addR(subR(v[5],mulR(R(2),v[3])),v[1])],T=R(...spec.T.map(BigInt)),K=R(...spec.K.map(BigInt)),lo=A.map((x,i)=>{const y=addR(x,mulR(T,B[i]));ensure((x.n>0n&&y.n>0n)||(x.n<0n&&y.n<0n),'initial derivative components nonzero/same sign');return ltR(absR(x),absR(y))?absR(x):absR(y)}),S=addR(sqR(lo[0]),sqR(lo[1])),cross=absR(subR(mulR(A[0],B[1]),mulR(A[1],B[0]))),chord=A.map((x,i)=>addR(mulR(mulR(R(2),T),x),mulR(sqR(T),B[i]))),chord2=addR(sqR(chord[0]),sqR(chord[1]));ensure(ltR(R(49),chord2),'initial arc7 is before own T');ensure(ltR(sqR(cross),mulR(mulR(R(4),cubeR(S)),sqR(K))),'own exact Q curvature bound');const rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(rK,cosLower),'initial offset sufficient inequality');certificateChecks++;return Object.freeze({syntax:'M Q',T:spec.T,K:spec.K,r:7,initialArcMax:7,Smin:textR(S),cross:textR(cross),chordSquared:textR(chord2),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,ownInitialArcOnly:true,notRasterOrWholePProof:true})}

function firstQCertificate(spec,s){ensure(spec===Q_SPECS[0]&&spec.pen===3&&spec.mask===1&&s.revealPath===spec.path&&s.revealWidth===14&&same(s,FIXED_STROKES[2][0]),'only exact first Q3m1 allfields');const a=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(a,'own Q3m1 canonical guide');const v=a.slice(1).map(rat),A=[subR(v[2],v[0]),subR(v[3],v[1])],B=[addR(subR(v[4],mulR(R(2),v[2])),v[0]),addR(subR(v[5],mulR(R(2),v[3])),v[1])],dot=(a,b)=>addR(mulR(a[0],b[0]),mulR(a[1],b[1])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),div=(a,b)=>{ensure(b.n!==0n,'own Q denominator');return R(a.n*b.d,a.d*b.n)},T=R(1,3),K=R(1,11),star=div(negR(ab),bb),norm=t=>addR(addR(aa,mulR(mulR(R(2),ab),t)),mulR(bb,sqR(t)));ensure(ltR(R(0),star)&&ltR(star,T),'own Q3m1 internal speed minimum');const S=norm(star),cross=absR(subR(mulR(A[0],B[1]),mulR(A[1],B[0]))),chord=A.map((x,i)=>addR(mulR(mulR(R(2),T),x),mulR(sqR(T),B[i]))),chord2=dot(chord,chord),rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(R(0),S)&&ltR(R(49),chord2),'own initial arc7 beforeT');ensure(ltR(sqR(cross),mulR(mulR(R(4),cubeR(S)),sqR(K))),'own exact speed-minimum curvature');ensure(ltR(rK,cosLower),'own initial injectivity sufficient inequality');certificateChecks++;return Object.freeze({syntax:'M Q',T:spec.T,K:spec.K,r:7,initialArcMax:7,minimumT:textR(star),Smin:textR(S),cross:textR(cross),chordSquared:textR(chord2),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,ownInitialArcOnly:true,notRasterOrWholePProof:true})}
const POLICIES=Object.freeze(Q_SPECS.map(q=>Object.freeze({id:q.id,pen:q.pen,mask:q.mask,segment:FIXED_STROKES[q.pen-1][q.mask-1],certificate:q.mask===1?firstQCertificate(q,FIXED_STROKES[q.pen-1][q.mask-1]):qCertificate(q,FIXED_STROKES[q.pen-1][q.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact 潗 K15p16m30 cached full geometry only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact 潗3m1/3m2 Q');return t}
function source(t,s){ensure(POLICIES.includes(t)&&Q_SPECS.some(q=>q.id===t.id)&&same(t.segment,s),'private exact Q policy/allfields');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:7}}
export function growingState(s,p,L,point){const t=policy(s);const f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite own Q p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite own Q endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only exact 潗3m1/3m2 Q');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
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
