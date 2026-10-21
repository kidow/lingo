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

const FIXED_STROKES=[[{"outline":"M28.2 9.75 L27.05 11.7 L25.85 13.65 L24.6 15.6 L23.35 17.5 L22.05 19.35 L20.7 21.2 L19.3 23.05 L17.85 24.8 L16.3 26.55 L14.7 28.2 L13.95 27.75 L14.85 25.6 L15.7 23.5 L16.65 21.4 L17.55 19.35 L18.45 17.3 L19.35 15.25 L20.25 13.25 L21.15 11.2 L22 9.15 L22.8 7.1 Z M22.6 7.55 L23.1 6.55 L28.2 9.75 Z M28.2 9.75 L29.1 11.3 L26.2 11.55 Z","bounds":[13.95,6.55,29.1,28.2],"direction":"curve","weight":23.017147,"revealPath":"M25.755 8 Q20.61 18.5 14.3625 28","revealWidth":14},{"outline":"M7.3 22.35 L9.1 23.2 L10.9 24.1 L12.6 25.1 L14.15 26.3 L15.65 27.55 L17 28.95 L18.3 30.45 L19.45 32.05 L20.5 33.75 L21.4 35.55 L15.8 37.6 L15.35 36.05 L14.8 34.5 L14.2 33 L13.45 31.5 L12.6 30.05 L11.7 28.65 L10.65 27.25 L9.5 25.85 L8.25 24.4 L6.8 23.1 Z M21.4 35.55 L21.3 37.8 L19.65 39.4 L17.35 39.25 L15.8 37.6 Z","bounds":[6.8,22.35,21.4,39.4],"direction":"curve","weight":19.909169,"revealPath":"M6.645 22.5 Q15.465 28 19.14 38","revealWidth":14}],[{"outline":"M38.75 21.35 L36.6 24.95 L34.35 28.45 L32.1 31.95 L29.75 35.4 L27.35 38.85 L24.95 42.25 L22.45 45.6 L19.85 48.9 L17.15 52.1 L14.35 55.25 L13.6 54.7 L15.6 51 L17.65 47.4 L19.7 43.75 L21.75 40.15 L23.8 36.6 L25.8 32.95 L27.8 29.35 L29.75 25.75 L31.65 22.1 L33.5 18.45 Z M33.3 18.9 L33.8 17.95 L38.75 21.35 Z M38.75 21.35 L39.6 22.95 L36.7 23.05 Z","bounds":[13.6,17.95,39.6,55.25],"direction":"curve","weight":41.985644,"revealPath":"M36.4125 19.5 Q26.1225 38 13.995 55","revealWidth":14},{"outline":"M7.45 53.45 L10.4 53.2 L13.35 52.9 L16.25 52.6 L19.15 52.25 L22 51.9 L24.9 51.5 L27.7 51.1 L30.55 50.7 L33.4 50.35 L36.25 50.05 L36.5 50.9 L33.9 52.15 L31.25 53.3 L28.5 54.3 L25.7 55.2 L22.9 56.05 L20.05 56.8 L17.15 57.55 L14.2 58.2 L11.25 58.8 L8.25 59.4 Z M8.25 59.4 L6.45 53.55 L7.45 53.45 Z M8.25 59.4 L11 57.5 L9.4 60.75 Z","bounds":[6.45,50.05,36.5,60.75],"direction":"curve","weight":29.646012,"revealPath":"M7.38 56.5 Q22.815 54.5 36.4125 50.5","revealWidth":14}],[{"outline":"M29.35 39 L30.85 40.05 L32.4 41.2 L33.8 42.5 L35.15 43.95 L36.35 45.45 L37.5 47.15 L38.55 48.9 L39.5 50.75 L40.35 52.7 L41.15 54.8 L35.3 56.25 L35 54.4 L34.55 52.55 L34.1 50.8 L33.55 49.1 L32.9 47.4 L32.25 45.8 L31.45 44.2 L30.65 42.65 L29.75 41.1 L28.75 39.65 Z M41.15 54.8 L40.8 57.05 L38.95 58.45 L36.7 58.1 L35.3 56.25 Z","bounds":[28.75,39,41.15,58.45],"direction":"curve","weight":20.553735,"revealPath":"M28.695 39 Q35.6775 45.5 38.6175 57","revealWidth":14}],[{"outline":"M27.25 53.5 L27.25 91.5 L21.25 94.5 L21.25 53.5 Z","bounds":[21.25,53.5,27.25,94.5],"direction":"down","weight":38.5}],[{"outline":"M18.35 64.3 L17.85 67.1 L17.2 69.85 L16.45 72.55 L15.55 75.25 L14.5 77.9 L13.3 80.5 L12 83.05 L10.55 85.5 L8.85 87.9 L7 90.2 L6.25 89.75 L7.2 87 L8.1 84.35 L9 81.75 L9.8 79.15 L10.5 76.55 L11.05 73.95 L11.55 71.4 L11.95 68.8 L12.25 66.25 L12.4 63.65 Z M12.35 64.15 L12.5 62.6 L18.35 64.3 Z M18.35 64.3 L19.75 65.45 L17.1 66.65 Z","bounds":[6.25,62.6,19.75,90.2],"direction":"curve","weight":27.929239,"revealPath":"M15.465 63.5 Q13.995 77.5 6.645 90","revealWidth":14}],[{"outline":"M29.7 61.05 L31.2 62.2 L32.65 63.5 L34.05 64.9 L35.3 66.5 L36.45 68.2 L37.5 70.05 L38.5 71.95 L39.35 74 L40.15 76.15 L40.85 78.4 L35 79.6 L34.7 77.55 L34.35 75.55 L33.9 73.6 L33.4 71.75 L32.85 69.95 L32.25 68.2 L31.55 66.5 L30.8 64.85 L30 63.2 L29.05 61.65 Z M40.85 78.4 L40.4 80.65 L38.55 81.95 L36.3 81.5 L35 79.6 Z","bounds":[29.05,61.05,40.85,81.95],"direction":"curve","weight":21.555977,"revealPath":"M29.0625 61 Q35.6775 68 38.25 80.5","revealWidth":14}],[{"outline":"M83.25 11.9 L80.75 14.15 L77.95 16.4 L74.8 18.6 L71.35 20.8 L67.6 23 L63.5 25.15 L59.1 27.3 L54.35 29.4 L49.25 31.45 L43.8 33.4 L43.45 32.55 L48.45 29.75 L53.15 27 L57.55 24.4 L61.6 21.85 L65.35 19.4 L68.75 16.95 L71.8 14.6 L74.5 12.25 L76.9 10 L78.9 7.8 Z M78.55 8.15 L79.05 7.6 L83.25 11.9 Z M83.25 11.9 L83.65 13.65 L80.8 13.05 Z","bounds":[43.45,7.6,83.65,33.4],"direction":"curve","weight":44.509437,"revealPath":"M81.4375 9.5 Q70.6375 21 43.6375 33","revealWidth":14}],[{"outline":"M49.65 9.3 L54.15 11 L58.35 12.8 L62.35 14.65 L66.1 16.55 L69.6 18.5 L72.85 20.4 L75.9 22.35 L78.75 24.3 L81.35 26.3 L83.75 28.25 L79.6 32.6 L77.6 30.6 L75.4 28.5 L72.9 26.4 L70.2 24.25 L67.3 22.05 L64.1 19.8 L60.7 17.5 L57.1 15.15 L53.3 12.7 L49.25 10.1 Z M83.75 28.25 L84.65 30.35 L83.85 32.5 L81.75 33.4 L79.6 32.6 Z","bounds":[49.25,9.3,84.65,33.4],"direction":"curve","weight":40.28725,"revealPath":"M49.0375 9.5 Q71.3125 20.5 82.7875 31.5","revealWidth":14}],[{"outline":"M64.9 32.3 L63.3 36.85 L61.45 41.3 L59.35 45.6 L57.05 49.85 L54.5 53.95 L51.75 57.9 L48.75 61.75 L45.5 65.45 L42 68.95 L38.2 72.3 L37.55 71.65 L40.55 67.7 L43.4 63.75 L46.1 59.8 L48.6 55.8 L50.85 51.75 L52.95 47.65 L54.8 43.5 L56.45 39.25 L57.9 35 L59.15 30.6 Z M59 31.1 L59.4 29.8 L64.9 32.3 Z M64.9 32.3 L66.05 33.7 L63.25 34.4 Z","bounds":[37.55,29.8,66.05,72.3],"direction":"curve","weight":47.660151,"revealPath":"M62.2 31 Q55.45 54 37.9 72","revealWidth":14}],[{"outline":"M37.55 40 L93.9 40 L93.9 42 L37.55 42 Z M93.9 40 L81.9 41 L87.9 35 Z","bounds":[37.55,35,93.9,42],"direction":"right","weight":56.3625}],[{"outline":"M55.05 56.5 L55.05 84.5 L49.05 87.5 L49.05 56.5 Z","bounds":[49.05,56.5,55.05,87.5],"direction":"down","weight":28.5}],[{"outline":"M52.05 56.5 L84.45 56.5 L84.45 58.5 L52.05 58.5 Z M87.45 57.5 L87.45 79 L81.45 79 L81.45 57.5 Z M81.45 56.5 L84.45 54 L89.95 58.5 L87.45 60.5 L81.45 57.5 Z M81.45 79 L87.45 79 L86.25 80.8 L84.45 82 L82.65 80.8 Z M87.45 79 L87.4 80.25 L87.15 81.5 L86.75 82.7 L86.15 83.85 L85.3 84.85 L84.3 85.65 L83.2 86.3 L82 86.7 L80.75 86.9 L79.45 87 L79.45 81 L80.05 80.95 L80.5 80.85 L80.8 80.75 L81 80.7 L81.1 80.6 L81.15 80.5 L81.25 80.35 L81.35 80.05 L81.4 79.6 L81.45 79 Z M79.45 84 L74.45 82.5 L74.45 81 L79.45 81 Z","bounds":[52.05,54,89.95,87],"direction":"curve","weight":60.971068,"revealPath":"M52.075 57.5 L84.475 57.5 L84.475 79 Q84.475 84 79.475 84","revealWidth":14}],[{"outline":"M70.6 45.5 L70.6 91 L64.6 94 L64.6 44.5 Z M70.6 45.5 L72.1 46.5 L69.6 48 Z","bounds":[64.6,44.5,72.1,94],"direction":"down","weight":47.5}]];
const same=(a,b)=>{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})},clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;
const SPECS=Object.freeze([{"pen":1,"mask":1,"raw":0,"id":"u7d7a-1-1","kind":"fixed-Q-initial","path":"M25.755 8 Q20.61 18.5 14.3625 28","T":[1,2],"K":[1,100],"maskSHA256":"cbbfcaf757b48330a2674a07888b8b1a9a51c39d65deff638dd50421c8b1ae44"},{"pen":1,"mask":2,"raw":1,"id":"u7d7a-1-2","kind":"fixed-Q-initial","path":"M6.645 22.5 Q15.465 28 19.14 38","T":[1,2],"K":[1,20],"maskSHA256":"d9cc600661d9081e404b6ab6c12f3cee0b3797ca79e39400b0067e89a2bb81e1"},{"pen":2,"mask":1,"raw":2,"id":"u7d7a-2-1","kind":"fixed-Q-initial","path":"M36.4125 19.5 Q26.1225 38 13.995 55","T":[1,2],"K":[1,100],"maskSHA256":"88cca12a7d4faa4d015d2407e346d8a4910a828b6c5ec77d8680f3a5278d2e21"},{"pen":2,"mask":2,"raw":3,"id":"u7d7a-2-2","kind":"fixed-Q-initial","path":"M7.38 56.5 Q22.815 54.5 36.4125 50.5","T":[1,2],"K":[1,100],"maskSHA256":"3c2d55d26fb9f0f2a86ab64d0e1c07a26e339531f612f186466b1bb48a10572f"},{"pen":12,"mask":1,"raw":[14,15],"id":"u7d7a-12-1","kind":"MLLQ-first-straight-prefix","path":"M52.075 57.5 L84.475 57.5 L84.475 79 Q84.475 84 79.475 84","firstLine":32.4,"maskSHA256":"f30d69e717a39bd47196004f5cf4b638eabb1e0608697782260553a1523998a0"}].map(s=>Object.freeze(s)));
const R=(n,d=1n)=>({n:BigInt(n),d:BigInt(d)}),addR=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),negR=a=>R(-a.n,a.d),subR=(a,b)=>addR(a,negR(b)),mulR=(a,b)=>R(a.n*b.n,a.d*b.d),ltR=(a,b)=>a.n*b.d<b.n*a.d,absR=a=>R(a.n<0n?-a.n:a.n,a.d),sqR=a=>mulR(a,a),cubeR=a=>mulR(sqR(a),a),rat=s=>{const [a,b='']=String(s).split('.');return R(BigInt(a+b),10n**BigInt(b.length))},textR=a=>a.n+'/'+a.d;
function initialCertificate(spec,s){ensure(SPECS.includes(spec)&&same(s,FIXED_STROKES[spec.pen-1][spec.mask-1])&&s.revealPath===spec.path&&s.revealWidth===14,'exact own source mask/guide/width');if(spec.kind==='MLLQ-first-straight-prefix'){const m=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(m&&spec.pen===12&&spec.mask===1,'only fixed MLLQ first-leg kind');const n=m.slice(1).map(rat),dx=subR(n[2],n[0]),dy=subR(n[3],n[1]);ensure(dy.n===0n&&dx.n*5n===162n*dx.d&&ltR(R(7),dx),'own original first L horizontal 162/5>7');certificateChecks++;return Object.freeze({kind:spec.kind,firstLine:'162/5',firstLineNumeric:32.4,tangent:[1,0],initialK:0,initialArcMax:7,priorSegments:0,initialCorners:0,chordSquaredMinus49:'25019/25',ownInitialStraightLegOnly:true,noQuadraticCertificate:true,fullOriginalGuideBrowserLengthRequired:true,notLaterCornerOrPolygonCoverageOrRasterProof:true})}const m=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(m&&spec.kind==='fixed-Q-initial','own canonical MQ only');const n=m.slice(1).map(rat),A=[subR(n[2],n[0]),subR(n[3],n[1])],B=[addR(subR(n[4],mulR(R(2),n[2])),n[0]),addR(subR(n[5],mulR(R(2),n[3])),n[1])],dot=(a,b)=>addR(mulR(a[0],b[0]),mulR(a[1],b[1])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),div=(a,b)=>{ensure(b.n!==0n,'own rational denominator');return R(a.n*b.d,a.d*b.n)},T=R(...spec.T.map(BigInt)),K=R(...spec.K.map(BigInt));ensure(ltR(R(0),bb),'own nonconstant Q');const star=div(negR(ab),bb),tm=ltR(star,R(0))?R(0):ltR(T,star)?T:star,S=addR(addR(aa,mulR(mulR(R(2),ab),tm)),mulR(bb,sqR(tm))),c=subR(mulR(A[0],B[1]),mulR(A[1],B[0])),delta=A.map((a,i)=>addR(mulR(mulR(R(2),T),a),mulR(sqR(T),B[i]))),chord2=dot(delta,delta),margin=subR(mulR(mulR(R(4),sqR(K)),cubeR(S)),sqR(c)),rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(R(0),S)&&ltR(R(49),chord2)&&ltR(R(0),margin)&&ltR(rK,cosLower),'own exact speed/chord/curvature/initial offset conditions');certificateChecks++;return Object.freeze({kind:spec.kind,T:spec.T,K:spec.K,minimumT:textR(tm),Smin:textR(S),cross:textR(c),chordSquared:textR(chord2),curvatureMargin:textR(margin),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,initialArcMax:7,notWholePolygonConnectivityOrRasterProof:true})}
const POLICIES=Object.freeze(SPECS.map(s=>Object.freeze({id:s.id,pen:s.pen,mask:s.mask,kind:s.kind,segment:FIXED_STROKES[s.pen-1][s.mask-1],certificate:initialCertificate(s,FIXED_STROKES[s.pen-1][s.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact 絺13p15m38 cached full geometry only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact 絺 four Q and straight-prefix targets');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact source mask fields');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:t.kind==='MLLQ-first-straight-prefix'?32.4:7}}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>f.minimumLength,'finite p/full original UA length');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite same path endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit unique pen+mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only exact five 絺 targets');return{id:t.id,pen,mask,kind:t.kind,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 絺 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 絺 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 絺 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 絺 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 絺 SVG coordinate tree');
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
function measureFrame(policy, segment, progress, guide) {
    const fixed = source(policy, segment);
    if (!Number.isFinite(progress) || progress < 0 || progress > 1)
        throw new Error('Invalid 絺 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 絺 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 絺 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 絺 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 絺 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('絺 UA start differs from exact M');
    return Object.freeze({ policyId: policy.id, guide: segment.revealPath, progress, L, d, rho: Math.min(fixed.r, d), q0: Object.freeze(fixed.q0), point: Object.freeze({ x: point.x, y: point.y }) });
}
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
            throw new Error('Invalid 絺 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 絺 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 絺 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('絺 binding changed during UA read');
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
            throw new Error('絺 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=13&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const rawLocal=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),p=pi<stroke-1?1:t&&global===1?1:rawLocal,id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,13,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}


export function renderTargetLocal(strokes,pen,mask,p,prefix='target-local'){assertFixedGeometry(strokes);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'target local p/id');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'own exact local target');return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(t,p,prefix+'-'+pen+'-'+(mask-1))+'</g></svg>'}
