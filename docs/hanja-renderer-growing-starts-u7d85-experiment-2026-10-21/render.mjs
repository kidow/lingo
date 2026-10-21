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

const FIXED_STROKES=[[{"outline":"M27.9 9.75 L26.75 11.7 L25.55 13.65 L24.35 15.55 L23.1 17.45 L21.8 19.35 L20.45 21.2 L19.1 23.05 L17.65 24.8 L16.1 26.55 L14.55 28.2 L13.8 27.75 L14.65 25.6 L15.5 23.5 L16.4 21.4 L17.3 19.35 L18.2 17.35 L19.1 15.3 L19.95 13.25 L20.8 11.2 L21.65 9.15 L22.5 7.1 Z M22.25 7.55 L22.75 6.55 L27.9 9.75 Z M27.9 9.75 L28.8 11.3 L25.9 11.55 Z","bounds":[13.8,6.55,28.8,28.2],"direction":"curve","weight":22.940824,"revealPath":"M25.425 8 Q20.35 18.5 14.1875 28","revealWidth":14},{"outline":"M7.2 22.35 L9 23.25 L10.8 24.1 L12.45 25.15 L14 26.3 L15.45 27.55 L16.85 28.95 L18.1 30.45 L19.25 32.05 L20.25 33.75 L21.2 35.55 L15.55 37.6 L15.1 36 L14.6 34.5 L14 33 L13.25 31.5 L12.45 30.05 L11.55 28.65 L10.5 27.25 L9.35 25.85 L8.15 24.4 L6.75 23.1 Z M21.2 35.55 L21.05 37.8 L19.4 39.4 L17.1 39.25 L15.55 37.6 Z","bounds":[6.75,22.35,21.2,39.4],"direction":"curve","weight":19.80292,"revealPath":"M6.575 22.5 Q15.275 28 18.9 38","revealWidth":14}],[{"outline":"M38.3 21.35 L36.15 24.9 L33.95 28.45 L31.7 31.95 L29.4 35.4 L27.05 38.85 L24.65 42.25 L22.15 45.6 L19.6 48.9 L16.95 52.1 L14.15 55.25 L13.45 54.7 L15.4 51.05 L17.4 47.4 L19.4 43.8 L21.45 40.2 L23.45 36.6 L25.45 33 L27.4 29.35 L29.3 25.75 L31.2 22.1 L33.05 18.45 Z M32.8 18.9 L33.3 18 L38.3 21.35 Z M38.3 21.35 L39.15 22.95 L36.2 23.05 Z","bounds":[13.45,18,39.15,55.25],"direction":"curve","weight":41.82359,"revealPath":"M35.9375 19.5 Q25.7875 38 13.825 55","revealWidth":14},{"outline":"M7.4 53.45 L10.3 53.2 L13.2 52.9 L16.05 52.6 L18.9 52.25 L21.75 51.9 L24.55 51.5 L27.35 51.1 L30.15 50.7 L32.95 50.35 L35.8 50.05 L36.05 50.9 L33.45 52.15 L30.85 53.3 L28.15 54.3 L25.4 55.2 L22.6 56.05 L19.8 56.8 L16.95 57.55 L14.05 58.2 L11.1 58.8 L8.15 59.4 Z M8.15 59.4 L6.4 53.55 L7.4 53.45 Z M8.15 59.4 L10.95 57.5 L9.35 60.75 Z","bounds":[6.4,50.05,36.05,60.75],"direction":"curve","weight":29.259296,"revealPath":"M7.3 56.5 Q22.525 54.5 35.9375 50.5","revealWidth":14}],[{"outline":"M28.95 39 L30.45 40.1 L32 41.2 L33.4 42.5 L34.7 43.95 L35.9 45.5 L37.05 47.15 L38.05 48.9 L39 50.75 L39.85 52.75 L40.65 54.8 L34.8 56.25 L34.5 54.35 L34.1 52.55 L33.6 50.8 L33.05 49.05 L32.45 47.4 L31.8 45.8 L31.05 44.2 L30.25 42.65 L29.4 41.1 L28.35 39.65 Z M40.65 54.8 L40.25 57.05 L38.45 58.45 L36.2 58.05 L34.8 56.25 Z","bounds":[28.35,39,40.65,58.45],"direction":"curve","weight":20.488903,"revealPath":"M28.325 39 Q35.2125 45.5 38.1125 57","revealWidth":14}],[{"outline":"M26.95 53.5 L26.95 91.5 L20.95 94.5 L20.95 53.5 Z","bounds":[20.95,53.5,26.95,94.5],"direction":"down","weight":38.5}],[{"outline":"M18.2 64.3 L17.7 67.1 L17.05 69.85 L16.25 72.55 L15.4 75.25 L14.35 77.9 L13.2 80.5 L11.9 83.05 L10.45 85.5 L8.8 87.9 L6.95 90.2 L6.15 89.75 L7.1 87 L8 84.35 L8.85 81.75 L9.65 79.15 L10.3 76.55 L10.9 74 L11.4 71.4 L11.75 68.8 L12.05 66.25 L12.2 63.65 Z M12.15 64.15 L12.3 62.6 L18.2 64.3 Z M18.2 64.3 L19.55 65.45 L16.95 66.65 Z","bounds":[6.15,62.6,19.55,90.2],"direction":"curve","weight":27.891576,"revealPath":"M15.275 63.5 Q13.825 77.5 6.575 90","revealWidth":14}],[{"outline":"M29.35 61.05 L30.8 62.2 L32.25 63.5 L33.6 64.95 L34.85 66.5 L36 68.2 L37.05 70.05 L38 71.95 L38.9 74 L39.7 76.15 L40.35 78.4 L34.5 79.6 L34.2 77.5 L33.85 75.5 L33.45 73.6 L32.95 71.75 L32.4 69.95 L31.8 68.2 L31.1 66.5 L30.35 64.85 L29.6 63.2 L28.65 61.65 Z M40.35 78.4 L39.9 80.65 L38 81.95 L35.8 81.5 L34.5 79.6 Z","bounds":[28.65,61.05,40.35,81.95],"direction":"curve","weight":21.502998,"revealPath":"M28.6875 61 Q35.2125 68 37.75 80.5","revealWidth":14}],[{"outline":"M53.1 11 L81.85 11 L81.85 13 L53.1 13 Z M84.85 12 L84.85 37 L78.85 40 L78.85 12 Z M78.85 11 L81.85 8.5 L87.35 13 L84.85 15 L78.85 12 Z","bounds":[53.1,8.5,87.35,40],"direction":"curve","weight":51.755,"revealPath":"M53.14 12 L81.895 12 L81.895 35","revealWidth":14}],[{"outline":"M47.05 22.5 L93.2 22.5 L93.2 24.5 L47.05 24.5 Z M93.2 22.5 L85.2 23.5 L89.2 19 Z","bounds":[47.05,19,93.2,24.5],"direction":"right","weight":46.17}],[{"outline":"M53.1 34 L81.85 34 L81.85 36 L53.1 36 Z","bounds":[53.1,34,81.85,36],"direction":"right","weight":28.755}],[{"outline":"M47.95 41.65 L48.2 43.9 L48.5 46 L48.7 47.95 L48.75 49.75 L48.7 51.45 L48.55 53.05 L48.25 54.55 L47.8 55.95 L47.15 57.25 L46.25 58.45 L42.4 53.85 L42.8 53.7 L43.35 53.3 L43.9 52.65 L44.45 51.8 L45 50.65 L45.55 49.3 L46 47.7 L46.45 45.9 L46.9 43.9 L47.05 41.7 Z M46.25 58.45 L44.05 59.1 L42 58.05 L41.35 55.9 L42.4 53.85 Z","bounds":[41.35,41.65,48.75,59.1],"direction":"curve","weight":16.506747,"revealPath":"M47.536825 41.2 Q47.8264 53.225 43.1932 57.125","revealWidth":14}],[{"outline":"M47.8 45.05 L89.5 45.05 L89.5 47.05 L47.8 47.05 Z M92.25 47.25 L91.65 48.05 L91 48.85 L90.3 49.7 L89.6 50.6 L88.8 51.5 L87.95 52.45 L87.05 53.45 L86.05 54.45 L85 55.5 L84.1 56.7 L83.35 56.2 L84 54.85 L84.4 53.45 L84.85 52.15 L85.2 50.9 L85.6 49.7 L85.9 48.6 L86.2 47.55 L86.4 46.55 L86.6 45.65 L86.75 44.85 Z M86.5 45.05 L89.5 42.55 L95 47.05 L92.5 48.55 L86.5 51.05 Z","bounds":[47.8,42.55,95,56.7],"direction":"curve","weight":53.602643,"revealPath":"M47.8264 46.075 L89.5252 46.075 Q87.78775 49.975 83.73370000000001 56.475","revealWidth":14}],[{"outline":"M49.9 57 L81.05 57 L81.05 59 L49.9 59 Z M83.85 59.05 L81.35 64.3 L78.35 69.15 L74.85 73.6 L70.9 77.65 L66.5 81.25 L61.65 84.45 L56.35 87.25 L50.6 89.6 L44.45 91.5 L37.85 92.9 L37.6 92.05 L43.85 89.7 L49.55 87.15 L54.8 84.35 L59.55 81.3 L63.85 77.95 L67.65 74.3 L70.95 70.4 L73.85 66.2 L76.25 61.7 L78.25 56.9 Z M78.05 57 L81.05 54.5 L86.55 59 L84.05 60.5 L78.05 63 Z","bounds":[37.6,54.5,86.55,92.9],"direction":"curve","weight":86.576084,"revealPath":"M49.9 58 L81.08500000000001 58 Q70.96000000000001 84 37.75 92.5","revealWidth":14}],[{"outline":"M58.15 58.3 L60.5 62.75 L62.95 66.8 L65.55 70.5 L68.3 73.8 L71.3 76.7 L74.5 79.2 L77.9 81.35 L81.55 83.2 L85.45 84.65 L89.6 85.8 L87.9 92.15 L83.3 90.55 L78.95 88.5 L74.95 86.05 L71.3 83.2 L68 80 L65.1 76.45 L62.5 72.5 L60.35 68.2 L58.6 63.6 L57.3 58.6 Z M87.9 92.15 L89.6 85.8 L93.75 86.9 Z","bounds":[57.3,58.3,93.75,92.15],"direction":"curve","weight":43.97163,"revealPath":"M57.595 58 Q66.1 83 88.78 89","revealWidth":14}]];
const same=(a,b)=>{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})},clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;
const SPECS=Object.freeze([{"pen":1,"mask":1,"raw":0,"id":"u7d85-1-1","kind":"fixed-Q-initial","path":"M25.425 8 Q20.35 18.5 14.1875 28","T":[1,2],"K":[1,100],"maskSHA256":"3ca81311f37855a28fef65fdd0b5a16ebbc530ca4f4d1de55780767c88c61250"},{"pen":1,"mask":2,"raw":1,"id":"u7d85-1-2","kind":"fixed-Q-initial","path":"M6.575 22.5 Q15.275 28 18.9 38","T":[1,2],"K":[1,20],"maskSHA256":"1a1279d9e8834aa299af0fdf19630655560e79c73a975a09c690afa2f6a554c5"},{"pen":2,"mask":1,"raw":2,"id":"u7d85-2-1","kind":"fixed-Q-initial","path":"M35.9375 19.5 Q25.7875 38 13.825 55","T":[1,2],"K":[1,100],"maskSHA256":"d9aef59975310dfdae29c32d44641df59624a07960582183b8f9a84c51b87a70"},{"pen":2,"mask":2,"raw":3,"id":"u7d85-2-2","kind":"fixed-Q-initial","path":"M7.3 56.5 Q22.525 54.5 35.9375 50.5","T":[1,2],"K":[1,100],"maskSHA256":"edc79414f6671cbc567c8fbbc7806fe558634e3e1b0582288dc33762557520fa"},{"pen":7,"mask":1,"raw":[8,9],"id":"u7d85-7-1","kind":"MLL-first-straight-prefix","path":"M53.14 12 L81.895 12 L81.895 35","firstLine":28.755,"firstLineExact":["5751","200"],"maskSHA256":"605482d169f13da043b61f5f7d561dc2bd2e0d771a9c0f2f6ca5db3aac96b4e6"},{"pen":11,"mask":1,"raw":[13,14],"id":"u7d85-11-1","kind":"MLQ-first-straight-prefix","path":"M47.8264 46.075 L89.5252 46.075 Q87.78775 49.975 83.73370000000001 56.475","firstLine":41.6988,"firstLineExact":["104247","2500"],"maskSHA256":"ceeb1a73e8c63e60865df37d800b5b3f22a8c1d65dc7899ee582035bb56d7f1a"},{"pen":12,"mask":1,"raw":[15,16],"id":"u7d85-12-1","kind":"MLQ-first-straight-prefix","path":"M49.9 58 L81.08500000000001 58 Q70.96000000000001 84 37.75 92.5","firstLine":31.18500000000001,"firstLineExact":["3118500000000001","100000000000000"],"maskSHA256":"3d8c0f39cd1c441b9a4a16920b4ba8e9c236bb5837a5c5d537458584cfaed0ce"}].map(s=>Object.freeze(s)));
const R=(n,d=1n)=>({n:BigInt(n),d:BigInt(d)}),addR=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),negR=a=>R(-a.n,a.d),subR=(a,b)=>addR(a,negR(b)),mulR=(a,b)=>R(a.n*b.n,a.d*b.d),ltR=(a,b)=>a.n*b.d<b.n*a.d,absR=a=>R(a.n<0n?-a.n:a.n,a.d),sqR=a=>mulR(a,a),cubeR=a=>mulR(sqR(a),a),rat=s=>{const [a,b='']=String(s).split('.');return R(BigInt(a+b),10n**BigInt(b.length))},textR=a=>a.n+'/'+a.d;
function initialCertificate(spec,s){ensure(SPECS.includes(spec)&&same(s,FIXED_STROKES[spec.pen-1][spec.mask-1])&&s.revealPath===spec.path&&s.revealWidth===14,'exact own source mask/guide/width');if(spec.kind==='MLL-first-straight-prefix'||spec.kind==='MLQ-first-straight-prefix'){const allowed=[[7,'MLL-first-straight-prefix','5751','200'],[11,'MLQ-first-straight-prefix','104247','2500'],[12,'MLQ-first-straight-prefix','3118500000000001','100000000000000']].find(v=>v[0]===spec.pen);ensure(allowed&&spec.mask===1&&spec.kind===allowed[1]&&same(spec.firstLineExact,allowed.slice(2)),'three exact own first-line kinds only');const m=s.revealPath.match(spec.kind==='MLL-first-straight-prefix'?/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/:/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) L(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(m,'own complete canonical MLL or MLQ syntax/arity');const n=m.slice(1).map(rat),dx=subR(n[2],n[0]),dy=subR(n[3],n[1]),exact=R(BigInt(allowed[2]),BigInt(allowed[3]));ensure(dy.n===0n&&dx.n*exact.d===exact.n*dx.d&&ltR(R(7),dx),'own exact horizontal first L longer than7');certificateChecks++;return Object.freeze({kind:spec.kind,firstLine:textR(dx),firstLineNumeric:Number(dx.n)/Number(dx.d),tangent:[1,0],initialK:0,initialArcMax:7,priorSegments:0,initialCorners:0,chordSquaredMinus49:textR(subR(sqR(dx),R(49))),ownInitialStraightLegOnly:true,noQuadraticCertificate:true,fullOriginalGuideBrowserLengthRequired:true,notLaterCornerOrPolygonCoverageOrRasterProof:true})}const m=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(m&&spec.kind==='fixed-Q-initial','own canonical MQ only');const n=m.slice(1).map(rat),A=[subR(n[2],n[0]),subR(n[3],n[1])],B=[addR(subR(n[4],mulR(R(2),n[2])),n[0]),addR(subR(n[5],mulR(R(2),n[3])),n[1])],dot=(a,b)=>addR(mulR(a[0],b[0]),mulR(a[1],b[1])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),div=(a,b)=>{ensure(b.n!==0n,'own rational denominator');return R(a.n*b.d,a.d*b.n)},T=R(...spec.T.map(BigInt)),K=R(...spec.K.map(BigInt));ensure(ltR(R(0),bb),'own nonconstant Q');const star=div(negR(ab),bb),tm=ltR(star,R(0))?R(0):ltR(T,star)?T:star,S=addR(addR(aa,mulR(mulR(R(2),ab),tm)),mulR(bb,sqR(tm))),c=subR(mulR(A[0],B[1]),mulR(A[1],B[0])),delta=A.map((a,i)=>addR(mulR(mulR(R(2),T),a),mulR(sqR(T),B[i]))),chord2=dot(delta,delta),margin=subR(mulR(mulR(R(4),sqR(K)),cubeR(S)),sqR(c)),rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(R(0),S)&&ltR(R(49),chord2)&&ltR(R(0),margin)&&ltR(rK,cosLower),'own exact speed/chord/curvature/initial offset conditions');certificateChecks++;return Object.freeze({kind:spec.kind,T:spec.T,K:spec.K,minimumT:textR(tm),Smin:textR(S),cross:textR(c),chordSquared:textR(chord2),curvatureMargin:textR(margin),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,initialArcMax:7,notWholePolygonConnectivityOrRasterProof:true})}
const POLICIES=Object.freeze(SPECS.map(s=>Object.freeze({id:s.id,pen:s.pen,mask:s.mask,kind:s.kind,segment:FIXED_STROKES[s.pen-1][s.mask-1],certificate:initialCertificate(s,FIXED_STROKES[s.pen-1][s.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact 綅13p15m35 cached full geometry only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact 綅 four Q and three straight-prefix targets');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact source mask fields');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:t.certificate.firstLineNumeric??7}}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>f.minimumLength,'finite p/full original UA length');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite same path endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit unique pen+mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only exact seven 綅 targets');return{id:t.id,pen,mask,kind:t.kind,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 綅 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 綅 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 綅 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 綅 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 綅 SVG coordinate tree');
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
        throw new Error('Invalid 綅 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 綅 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 綅 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 綅 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 綅 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('綅 UA start differs from exact M');
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
            throw new Error('Invalid 綅 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 綅 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 綅 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('綅 binding changed during UA read');
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
            throw new Error('綅 binding changed before visibility commit');
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
