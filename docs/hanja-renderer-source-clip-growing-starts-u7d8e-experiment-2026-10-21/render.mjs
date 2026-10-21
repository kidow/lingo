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

const FIXED_STROKES=[[{"outline":"M26 9.65 L24.95 11.6 L23.85 13.55 L22.75 15.45 L21.6 17.4 L20.4 19.25 L19.2 21.15 L17.9 22.95 L16.6 24.75 L15.2 26.5 L13.75 28.2 L12.95 27.75 L13.7 25.65 L14.45 23.55 L15.2 21.5 L15.95 19.45 L16.75 17.4 L17.5 15.4 L18.3 13.35 L19.05 11.3 L19.75 9.3 L20.45 7.25 Z M20.25 7.7 L20.75 6.6 L26 9.65 Z M26 9.65 L26.95 11.15 L24.05 11.5 Z","bounds":[12.95,6.6,26.95,28.2],"direction":"curve","weight":22.394321,"revealPath":"M23.45 8 Q18.9 18.5 13.375 28","revealWidth":14},{"outline":"M7.2 22.4 L8.8 23.3 L10.45 24.15 L11.95 25.2 L13.4 26.4 L14.75 27.65 L16 29.05 L17.15 30.55 L18.15 32.15 L19.1 33.85 L19.95 35.6 L14.25 37.5 L13.9 35.9 L13.45 34.35 L12.9 32.85 L12.3 31.4 L11.6 29.95 L10.8 28.55 L9.95 27.15 L8.95 25.8 L7.9 24.4 L6.65 23.15 Z M19.95 35.6 L19.75 37.9 L18.05 39.4 L15.75 39.2 L14.25 37.5 Z","bounds":[6.65,22.4,19.95,39.4],"direction":"curve","weight":19.035559,"revealPath":"M6.55 22.5 Q14.35 28 17.6 38","revealWidth":14}],[{"outline":"M35.3 21.25 L33.4 24.8 L31.4 28.35 L29.35 31.85 L27.25 35.3 L25.15 38.75 L22.95 42.15 L20.7 45.5 L18.4 48.8 L15.95 52.05 L13.4 55.2 L12.65 54.75 L14.35 51.05 L16.1 47.45 L17.9 43.85 L19.65 40.25 L21.45 36.7 L23.2 33.1 L24.9 29.5 L26.6 25.85 L28.3 22.25 L29.95 18.6 Z M29.7 19.05 L30.2 18.05 L35.3 21.25 Z M35.3 21.25 L36.25 22.8 L33.3 23.05 Z","bounds":[12.65,18.05,36.25,55.2],"direction":"curve","weight":40.660554,"revealPath":"M32.875 19.5 Q23.775 38 13.05 55","revealWidth":14},{"outline":"M7.25 53.45 L9.85 53.2 L12.4 52.9 L14.95 52.6 L17.5 52.25 L20.05 51.9 L22.6 51.5 L25.1 51.1 L27.6 50.7 L30.15 50.35 L32.7 50.05 L33 50.9 L30.7 52.15 L28.35 53.3 L25.95 54.25 L23.5 55.2 L21.05 56 L18.5 56.8 L15.95 57.5 L13.35 58.2 L10.75 58.8 L8.1 59.35 Z M8.1 59.35 L6.25 53.6 L7.25 53.45 Z M8.1 59.35 L10.85 57.45 L9.3 60.7 Z","bounds":[6.25,50.05,33,60.7],"direction":"curve","weight":26.366752,"revealPath":"M7.2 56.5 Q20.85 54.5 32.875 50.5","revealWidth":14}],[{"outline":"M26.7 39.05 L28.05 40.15 L29.45 41.3 L30.75 42.6 L31.95 44 L33.05 45.55 L34.1 47.25 L35.05 49 L35.9 50.85 L36.7 52.8 L37.4 54.85 L31.55 56.15 L31.25 54.3 L30.95 52.45 L30.55 50.7 L30.05 49 L29.55 47.35 L29 45.7 L28.35 44.15 L27.65 42.6 L26.95 41.1 L26.05 39.65 Z M37.4 54.85 L37 57.1 L35.15 58.45 L32.9 58 L31.55 56.15 Z","bounds":[26.05,39.05,37.4,58.45],"direction":"curve","weight":20.025,"revealPath":"M26.05 39 Q32.225 45.5 34.825 57","revealWidth":14}],[{"outline":"M25.15 53.5 L25.15 91.5 L19.15 94.5 L19.15 53.5 Z","bounds":[19.15,53.5,25.15,94.5],"direction":"down","weight":38.5}],[{"outline":"M17.25 64.25 L16.8 67.05 L16.2 69.8 L15.5 72.5 L14.7 75.2 L13.75 77.85 L12.7 80.45 L11.5 82.95 L10.15 85.45 L8.65 87.85 L6.9 90.2 L6.15 89.75 L6.9 87.05 L7.7 84.4 L8.4 81.8 L9.1 79.2 L9.7 76.6 L10.2 74.05 L10.6 71.45 L10.9 68.9 L11.15 66.3 L11.3 63.7 Z M11.25 64.2 L11.4 62.6 L17.25 64.25 Z M17.25 64.25 L18.65 65.4 L16.05 66.65 Z","bounds":[6.15,62.6,18.65,90.2],"direction":"curve","weight":27.624084,"revealPath":"M14.35 63.5 Q13.05 77.5 6.55 90","revealWidth":14}],[{"outline":"M27 61.05 L28.35 62.25 L29.7 63.55 L30.95 65 L32.1 66.6 L33.15 68.3 L34.1 70.1 L35 72.05 L35.8 74.1 L36.5 76.25 L37.15 78.45 L31.25 79.55 L31 77.45 L30.7 75.45 L30.35 73.5 L29.95 71.65 L29.5 69.85 L28.95 68.15 L28.4 66.45 L27.75 64.8 L27.1 63.2 L26.35 61.65 Z M37.15 78.45 L36.65 80.7 L34.75 81.95 L32.5 81.45 L31.25 79.55 Z","bounds":[26.35,61.05,37.15,81.95],"direction":"curve","weight":21.125,"revealPath":"M26.375 61 Q32.225 68 34.5 80.5","revealWidth":14}],[{"outline":"M89.15 16.95 L86.6 17.7 L83.95 18.4 L81.2 19.05 L78.3 19.7 L75.35 20.3 L72.25 20.9 L69.05 21.4 L65.75 21.85 L62.3 22.2 L58.75 22.4 L58.55 21.55 L61.9 20.35 L65.15 19.25 L68.3 18.2 L71.35 17.2 L74.25 16.2 L77.05 15.25 L79.75 14.25 L82.3 13.3 L84.75 12.3 L87.1 11.35 Z M86.6 11.5 L91.8 16 L89.15 16.95 Z M91.8 16 L91.9 17.55 L88.6 16.1 Z","bounds":[58.55,11.35,91.9,22.4],"direction":"curve","weight":30.975888,"revealPath":"M88.6 14 Q76.25 18.5 58.675 22","revealWidth":14}],[{"outline":"M57.25 42 L93.8 42 L93.8 44 L57.25 44 Z M93.8 42 L81.8 43 L87.8 37 Z","bounds":[57.25,37,93.8,44],"direction":"right","weight":36.575}],[{"outline":"M77.35 18.5 L77.35 74.5 L71.35 74.5 L71.35 18.5 Z","bounds":[71.35,18.5,77.35,74.5],"direction":"down","weight":54}],[{"outline":"M57.7 73 L91.9 73 L91.9 75 L57.7 75 Z M91.9 73 L79.9 74 L85.9 68 Z","bounds":[57.7,68,91.9,75],"direction":"right","weight":34.2}],[{"outline":"M36.8 15.5 L52.95 15.5 L52.95 17.5 L36.8 17.5 Z M55.6 17 L44.3 49.7 L37.65 50.55 L49.75 16.5 Z M49.95 15.5 L52.95 13 L58.45 17.5 L55.95 19 L49.95 21.5 Z","bounds":[36.8,13,58.45,50.55],"direction":"curve","weight":45.873738,"revealPath":"M36.825 16.5 L52.975 16.5 L43 44.5","revealWidth":14}],[{"outline":"M43 43.5 L55.8 43.5 L55.8 45.5 L43 45.5 Z M58.8 44.7 L57.85 52.35 L56.55 59.45 L54.85 65.95 L52.75 71.85 L50.2 77.15 L47.3 81.85 L44 85.95 L40.3 89.3 L36.2 92 L31.75 93.9 L31.4 93.05 L35.15 90.4 L38.5 87.3 L41.5 83.8 L44.1 79.8 L46.4 75.3 L48.4 70.2 L50 64.6 L51.3 58.4 L52.2 51.6 L52.8 44.25 Z M52.8 43.5 L55.8 41 L61.3 45.5 L58.8 47 L52.8 49.5 Z","bounds":[31.4,41,61.3,93.9],"direction":"curve","weight":67.486235,"revealPath":"M43 44.5 L55.825 44.5 Q52.975 83.5 31.6 93.5","revealWidth":14}],[{"outline":"M40.65 57.4 L42.7 63.8 L45.3 69.25 L48.5 73.9 L52.3 77.7 L56.7 80.75 L61.8 83.05 L67.6 84.7 L74.2 85.6 L81.55 85.75 L89.7 85.2 L90.3 91.75 L81.55 92 L73.55 91.45 L66.35 90.05 L59.85 87.8 L54.25 84.7 L49.45 80.75 L45.6 76.05 L42.65 70.55 L40.7 64.4 L39.75 57.55 Z M90.3 91.75 L89.7 85.2 L95.05 84.7 Z","bounds":[39.75,57.4,95.05,92],"direction":"curve","weight":58.989538,"revealPath":"M40.15 57 Q45.85 92.5 90.025 88.5","revealWidth":14}]];
const same=(a,b)=>{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false;const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b);if(ak.length!==bk.length)return false;return bk.every(k=>{const ad=Object.getOwnPropertyDescriptor(a,k),bd=Object.getOwnPropertyDescriptor(b,k);return!!ad&&!!bd&&'value'in ad&&'value'in bd&&ad.enumerable===bd.enumerable&&same(ad.value,bd.value)})},clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;
const SPECS=[{"pen":1,"mask":1,"raw":[0],"path":"M23.45 8 Q18.9 18.5 13.375 28","width":14,"weight":22.394321,"bounds":[12.95,6.6,26.95,28.2],"maskSHA256":"0e1c4f3eaef4e7555dba714951cd37b10d86d516ebc70ad0da6f26615093febf","id":"u7d8e-1-1","kind":"fixed-Q-initial","T":[1,2],"K":[1,100]},{"pen":1,"mask":2,"raw":[1],"path":"M6.55 22.5 Q14.35 28 17.6 38","width":14,"weight":19.035559,"bounds":[6.65,22.4,19.95,39.4],"maskSHA256":"021e400409eba0977e6df2ed33db961425cf087b0f0b3a6c65500b7ff75a1973","id":"u7d8e-1-2","kind":"fixed-Q-initial","T":[1,2],"K":[1,20]},{"pen":2,"mask":1,"raw":[2],"path":"M32.875 19.5 Q23.775 38 13.05 55","width":14,"weight":40.660554,"bounds":[12.65,18.05,36.25,55.2],"maskSHA256":"67843a8282a765c661853d0ced78e0ea40259242c3ac7730a11d56a1c4d5c836","id":"u7d8e-2-1","kind":"fixed-Q-initial","T":[1,2],"K":[1,100]},{"pen":2,"mask":2,"raw":[3],"path":"M7.2 56.5 Q20.85 54.5 32.875 50.5","width":14,"weight":26.366752,"bounds":[6.25,50.05,33,60.7],"maskSHA256":"12ce1069bf0308c337e9128d22a8b6da2291aa74f6485352efd910e74c80811c","id":"u7d8e-2-2","kind":"fixed-Q-initial","T":[1,2],"K":[1,100]},{"pen":11,"mask":1,"raw":[8,9],"path":"M36.825 16.5 L52.975 16.5 L43 44.5","width":14,"weight":45.873738,"bounds":[36.8,13,58.45,50.55],"maskSHA256":"a28fc333fc2c6241d32fce321060f1aa1dc7cc031f4dd0db80671e5a7a37dcc5","id":"u7d8e-11-1","kind":"source-HJ-B-halfplane"},{"pen":12,"mask":1,"raw":[10,11],"path":"M43 44.5 L55.825 44.5 Q52.975 83.5 31.6 93.5","width":14,"weight":67.486235,"bounds":[31.4,41,61.3,93.9],"maskSHA256":"4c02c9beac272d4710fe32fdec9280384ebf8a6442d1eb69d6aeea132437e3ed","id":"u7d8e-12-1","kind":"MLQ-first-straight-prefix","firstLine":12.825}];
const R=(n,d=1n)=>({n:BigInt(n),d:BigInt(d)}),addR=(a,b)=>R(a.n*b.d+b.n*a.d,a.d*b.d),negR=a=>R(-a.n,a.d),subR=(a,b)=>addR(a,negR(b)),mulR=(a,b)=>R(a.n*b.n,a.d*b.d),ltR=(a,b)=>a.n*b.d<b.n*a.d,absR=a=>R(a.n<0n?-a.n:a.n,a.d),sqR=a=>mulR(a,a),cubeR=a=>mulR(sqR(a),a),rat=s=>{const [a,b='']=String(s).split('.');return R(BigInt(a+b),10n**BigInt(b.length))},textR=a=>a.n+'/'+a.d;
function initialCertificate(spec,s){ensure(SPECS.includes(spec)&&same(s,FIXED_STROKES[spec.pen-1][spec.mask-1])&&s.revealPath===spec.path&&s.revealWidth===14,'exact own source mask/guide/width');if(spec.kind==='source-HJ-B-halfplane'){ensure(spec.pen===11&&spec.mask===1&&s.revealPath==='M36.825 16.5 L52.975 16.5 L43 44.5','only fixed H/L source');certificateChecks++;return Object.freeze({kind:spec.kind,Hxbounds:['184/5','1169/20'],uMin:'-3899/320',uMax:'1770027/1600',V:['-399/40','28'],bodyContactStrictlyInsideJ:true,proofSHA256:'5d2b4e1444ac45e535685dba1d4b490bee83bf8c302e700b41d29ffb30dde565',UAQuantizationCertified:false,exactDOMBindingOrHidden:true,notRasterOrDomesticTimingProof:true})}if(spec.kind==='MLQ-first-straight-prefix'){ensure(spec.pen===12&&spec.mask===1&&s.revealPath==='M43 44.5 L55.825 44.5 Q52.975 83.5 31.6 93.5','only fixed MLQ source');const dx=subR(rat('55.825'),rat('43'));ensure(dx.n*40n===513n*dx.d&&ltR(R(7),dx),'own first H513/40>7');certificateChecks++;return Object.freeze({kind:spec.kind,firstLine:'513/40',firstLineNumeric:12.825,tangent:[1,0],initialK:0,initialArcMax:7,initialCorners:0,notLaterCornerOrCoverageProof:true,fullOriginalGuideBrowserLengthRequired:true})}const m=s.revealPath.match(/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/);ensure(m&&spec.kind==='fixed-Q-initial','own canonical MQ only');const n=m.slice(1).map(rat),A=[subR(n[2],n[0]),subR(n[3],n[1])],B=[addR(subR(n[4],mulR(R(2),n[2])),n[0]),addR(subR(n[5],mulR(R(2),n[3])),n[1])],dot=(a,b)=>addR(mulR(a[0],b[0]),mulR(a[1],b[1])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),div=(a,b)=>{ensure(b.n!==0n,'own rational denominator');return R(a.n*b.d,a.d*b.n)},T=R(...spec.T.map(BigInt)),K=R(...spec.K.map(BigInt));ensure(ltR(R(0),bb),'own nonconstant Q');const star=div(negR(ab),bb),tm=ltR(star,R(0))?R(0):ltR(T,star)?T:star,S=addR(addR(aa,mulR(mulR(R(2),ab),tm)),mulR(bb,sqR(tm))),c=subR(mulR(A[0],B[1]),mulR(A[1],B[0])),delta=A.map((a,i)=>addR(mulR(mulR(R(2),T),a),mulR(sqR(T),B[i]))),chord2=dot(delta,delta),margin=subR(mulR(mulR(R(4),sqR(K)),cubeR(S)),sqR(c)),rK=mulR(R(7),K),cosLower=subR(R(1),mulR(R(1,2),sqR(rK)));ensure(ltR(R(0),S)&&ltR(R(49),chord2)&&ltR(R(0),margin)&&ltR(rK,cosLower),'own exact speed/chord/curvature/initial offset conditions');certificateChecks++;return Object.freeze({kind:spec.kind,T:spec.T,K:spec.K,minimumT:textR(tm),Smin:textR(S),cross:textR(c),chordSquared:textR(chord2),curvatureMargin:textR(margin),rK:textR(rK),cosLower:textR(cosLower),exactDecimalRational:true,initialArcMax:7,notWholePolygonConnectivityOrRasterProof:true})}
const POLICIES=Object.freeze(SPECS.map(s=>Object.freeze({id:s.id,pen:s.pen,mask:s.mask,kind:s.kind,segment:FIXED_STROKES[s.pen-1][s.mask-1],certificate:initialCertificate(s,FIXED_STROKES[s.pen-1][s.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact 綎13p15m35 full geometry only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only six fixed 綎 masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact source fields');return{q0:s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number),r:7,minimumLength:t.kind==='MLQ-first-straight-prefix'?12.825:t.kind==='source-HJ-B-halfplane'?16.15:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen+mask required');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only own six targets');return{id:t.id,pen,mask,kind:t.kind,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(t.kind!=='source-HJ-B-halfplane'&&Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>f.minimumLength,'own growing finite UA frame');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite original point');return{policyId:t.id,guide:s.revealPath,progress:p,L,d:p*L,rho:Math.min(7,p*L),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 綎 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 綎 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 綎 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 綎 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 綎 SVG coordinate tree');
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
        throw new Error('Invalid 綎 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 綎 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && target.getAttribute('data-can-progress') === String(progress) && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 綎 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 綎 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 綎 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('綎 UA start differs from exact M');
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
            throw new Error('Invalid 綎 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 綎 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && target.getAttribute('data-can-progress') === String(progress) && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 綎 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('綎 binding changed during UA read');
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
            throw new Error('綎 binding changed before visibility commit');
        ink.setAttribute('visibility', 'visible');
        return { status: 'visible', frame, cleanup: reset };
    }
    catch {
        reset();
        return { status: 'hidden', frame: null, cleanup: reset };
    }
}



const H='M36.8 15.5 L52.95 15.5 L52.95 17.5 L36.8 17.5 Z',B='M55.6 17 L44.3 49.7 L37.65 50.55 L49.75 16.5 Z',J='M49.95 15.5 L52.95 13 L58.45 17.5 L55.95 19 L49.95 21.5 Z';
const G=[52.975,16.5],V=[-399/40,28],N=[-28,-399/40],V2=1413601/1600,UMIN=-3899/320,UMAX=1770027/1600,ZMIN=-8827/100,ZMAX=903/10,HMIN=36.8,HMAX=58.45;
const clamp01=x=>Math.max(0,Math.min(1,x));
function clipSource(s){const t=policy(s);ensure(t.kind==='source-HJ-B-halfplane'&&s.outline===H+' '+B+' '+J,'fixed original H/B/J single mask only');return t}
export function clipState(s,p,L,point){const t=clipSource(s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>16.15,'finite native full guide length/progress');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite same DOM native point');const phase=p===0?'empty':p===1?'complete':point.y<=G[1]?'H':'L';const alpha=phase==='H'?clamp01((point.x-36.825)/16.15):phase==='L'?clamp01((point.y-G[1])/28):p;return{policyId:t.id,progress:p,L,d:p*L,point:{x:point.x,y:point.y},phase,alpha,hH:phase==='H'?HMIN+(HMAX-HMIN)*alpha:phase==='empty'?HMIN:HMAX,hB:phase==='L'?UMIN+(UMAX-UMIN)*alpha:phase==='complete'?UMAX:UMIN,nativePointAuthoritative:true,branchQuantizationCertified:false}}
function planePolygon(h){const from=(u,z)=>[G[0]+(V[0]*u+N[0]*z)/V2,G[1]+(V[1]*u+N[1]*z)/V2];return [[UMIN,ZMIN],[h,ZMIN],[h,ZMAX],[UMIN,ZMAX]].map((v,i)=>(i?'L':'M')+from(...v).join(' ')).join(' ')+' Z'}
function commitClip(s,p,id,nodes){const t=clipSource(s),{measurement,hrect,bplane,hclip,bclip,ink,hink,bink}=nodes;
 const reset=()=>{ink?.setAttribute('visibility','hidden');hrect?.setAttribute('width','0');bplane?.setAttribute('d','');for(const k of ['progress','length','distance','end-x','end-y','phase','alpha','h-h','h-b'])ink?.removeAttribute('data-source-clip-'+k)};reset();
 try{ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z0-9_:.-]+$/.test(id),'fixed clip frame/id');if(p===0||p===1)return{status:p===0?'empty':'complete',frame:null,cleanup:reset};const owner=measurement?.ownerSVGElement,defs=measurement?.parentElement,target=defs?.parentElement;ensure(owner&&defs?.localName==='defs'&&target?.localName==='g'&&hclip&&bclip&&hrect&&bplane&&ink&&hink&&bink,'all clip DOM nodes');const coords=coordinateBinding([measurement,hclip,bclip,hrect,bplane,ink,hink,bink],owner);const bound=()=>coords()&&defs.parentElement===target&&measurement.parentElement===defs&&target.getAttribute('data-stroke-start-gate')===t.id&&target.getAttribute('data-can-progress')===String(p)&&target.getAttribute('data-can-clip')===id&&measurement.getAttribute('id')===id+'-can-measure'&&measurement.getAttribute('data-growing-owner')===id&&measurement.getAttribute('data-can-measurement')==='true'&&measurement.getAttribute('d')===s.revealPath&&measurement.getAttribute('pathLength')===null&&[hclip,bclip].every(n=>n.localName==='clipPath'&&n.parentElement===defs&&n.getAttribute('clipPathUnits')==='userSpaceOnUse')&&hclip.getAttribute('id')===id+'-h-plane'&&bclip.getAttribute('id')===id+'-b-plane'&&hrect.parentElement===hclip&&hrect.localName==='rect'&&hrect.getAttribute('x')==='36.8'&&hrect.getAttribute('y')==='13'&&hrect.getAttribute('height')==='8.5'&&bplane.parentElement===bclip&&bplane.localName==='path'&&ink.parentElement===target&&hink.parentElement===ink&&bink.parentElement===ink&&hink.getAttribute('d')===H+' '+J&&bink.getAttribute('d')===B&&hink.getAttribute('clip-path')==='url(#'+id+'-h-plane)'&&bink.getAttribute('clip-path')==='url(#'+id+'-b-plane)'&&[hclip,bclip,hrect,bplane,ink,hink,bink].every(n=>n.getAttribute('data-growing-owner')===id);
 ensure(bound(),'exact source clip parent/document/attrs/frame');const measured=measureFrame(t,s,p,measurement);ensure(bound(),'clip changed during native measurement');const frame=clipState(s,p,measured.L,measured.point),width=frame.hH-HMIN,polygon=planePolygon(frame.hB);hrect.setAttribute('width',String(width));bplane.setAttribute('d',polygon);for(const[k,v]of Object.entries({progress:p,length:frame.L,distance:frame.d,'end-x':frame.point.x,'end-y':frame.point.y,phase:frame.phase,alpha:frame.alpha,'h-h':frame.hH,'h-b':frame.hB}))ink.setAttribute('data-source-clip-'+k,String(v));ensure(bound()&&hrect.getAttribute('width')===String(width)&&bplane.getAttribute('d')===polygon,'clip changed before visibility');ink.setAttribute('visibility','visible');return{status:'visible',frame,cleanup:reset}
 }catch(e){reset();return{status:'hidden',frame:null,reason:String(e),cleanup:reset}}
}
export function measureTarget(s,p,path){return measureFrame(policy(s),s,p,path)}
export function commitTarget(s,p,id,nodes){return policy(s).kind==='source-HJ-B-halfplane'?commitClip(s,p,id,nodes):commitFrame(policy(s),s,p,id,nodes)}

function full(s,id){return '<mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask>'}
function growingHTML(t,p,id){const s=t.segment,defs='<defs><path id="'+id+'-can-measure" data-growing-owner="'+id+'" data-can-measurement="true" d="'+s.revealPath+'" fill="none" stroke="none" visibility="hidden"/>'+full(s,id)+'<mask id="'+id+'-can-growing" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path id="'+id+'-can-guide" data-growing-owner="'+id+'" d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="14" stroke-linecap="butt" stroke-linejoin="miter" pathLength="1" stroke-dasharray="0 2" stroke-dashoffset="0"/><circle data-growing-owner="'+id+'" cx="0" cy="0" r="0" fill="white"/><circle data-growing-owner="'+id+'" cx="0" cy="0" r="0" fill="white"/></mask></defs>';return '<g data-can-target="'+t.id+'" data-stroke-start-gate="'+t.id+'" data-can-progress="'+p+'" data-can-clip="'+id+'">'+defs+(p===1?'<path data-can-full="true" d="'+s.outline+'" mask="url(#'+id+')"/>':p>0?'<path data-can-ink="true" data-growing-owner="'+id+'" d="'+s.outline+'" mask="url(#'+id+'-can-growing)" visibility="hidden"/>':'')+'</g>'}
function clipHTML(t,p,id){const s=t.segment,defs='<defs><path id="'+id+'-can-measure" data-growing-owner="'+id+'" data-can-measurement="true" d="'+s.revealPath+'" fill="none" stroke="none" visibility="hidden"/><clipPath id="'+id+'-h-plane" data-growing-owner="'+id+'" clipPathUnits="userSpaceOnUse"><rect data-growing-owner="'+id+'" x="36.8" y="13" width="0" height="8.5"/></clipPath><clipPath id="'+id+'-b-plane" data-growing-owner="'+id+'" clipPathUnits="userSpaceOnUse"><path data-growing-owner="'+id+'" d=""/></clipPath></defs>';return '<g data-can-target="'+t.id+'" data-stroke-start-gate="'+t.id+'" data-can-progress="'+p+'" data-can-clip="'+id+'" data-source-clip-policy="H-J-then-B-native-point">'+defs+(p===1?'<path data-can-full="true" data-source-clip-complete="original-P-direct" d="'+s.outline+'"/>':p>0?'<g data-source-clip-ink="true" data-growing-owner="'+id+'" visibility="hidden"><path data-source-clip-hj="true" data-growing-owner="'+id+'" d="'+H+' '+J+'" clip-path="url(#'+id+'-h-plane)"/><path data-source-clip-b="true" data-growing-owner="'+id+'" d="'+B+'" clip-path="url(#'+id+'-b-plane)"/></g>':'')+'</g>'}
function targetHTML(t,p,id){return t.kind==='source-HJ-B-halfplane'?clipHTML(t,p,id):growingHTML(t,p,id)}
function ordinary(s,p,id){if(p===0)return '';if(p===1)return '<path d="'+s.outline+'"/>';const[x,y,right,bottom]=s.bounds,width=right-x,height=bottom-y;if(s.direction==='curve')return '<defs><mask id="'+id+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+s.revealPath+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="round" pathLength="1" stroke-dasharray="'+p+' 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" mask="url(#'+id+')"/>';const horizontal=s.direction==='right'||s.direction==='left',rx=s.direction==='left'?right-width*p:x,ry=s.direction==='up'?bottom-height*p:y;return '<defs><clipPath id="'+id+'"><rect x="'+rx+'" y="'+ry+'" width="'+(horizontal?width*p:width)+'" height="'+(horizontal?height:height*p)+'"/></clipPath></defs><path d="'+s.outline+'" clip-path="url(#'+id+')"/>'}
export function renderGrowingCaps(strokes,stroke,progress,prefix='own'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=13&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const rawLocal=Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),p=pi<stroke-1?1:t&&global===1?1:rawLocal,id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,13,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),measurement=g.querySelector('[data-can-measurement="true"]');let nodes,ink;if(t.kind==='source-HJ-B-halfplane'){ink=g.querySelector(':scope > g[data-source-clip-ink="true"]');nodes={measurement,hclip:g.querySelector('clipPath[id$="-h-plane"]'),bclip:g.querySelector('clipPath[id$="-b-plane"]'),hrect:g.querySelector('clipPath rect'),bplane:g.querySelector('clipPath path'),ink,hink:g.querySelector('[data-source-clip-hj="true"]'),bink:g.querySelector('[data-source-clip-b="true"]')}}else{const caps=g.querySelectorAll('mask circle');ink=g.querySelector(':scope > path[data-can-ink="true"]');nodes={measurement,guide:g.querySelector('path[id$="-can-guide"]'),startCap:caps[0],endCap:caps[1],ink}}const result=commitTarget(t.segment,p,id,nodes);frames.push({id:t.id,pen:t.pen,mask:t.mask,kind:t.kind,requestedLocal:p,status:result.status,reason:result.reason??null,frame:result.frame,fullRound:t.kind!=='source-HJ-B-halfplane'&&!!g.querySelector(':scope > path[data-can-full="true"]'),originalPComplete:!!g.querySelector('[data-source-clip-complete="original-P-direct"]'),inkVisible:ink?.getAttribute('visibility')==='visible'});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual',oldRound=false){const t=policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');const subtraction=t.kind==='source-HJ-B-halfplane'&&!oldRound?'<path d="'+s.outline+'" fill="black"/>':'<path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter"/>';return '<svg viewBox="0 0 100 100" data-coverage-kind="'+(t.kind==='source-HJ-B-halfplane'&&!oldRound?'P-minus-same-original-P':'P-minus-original-fullround')+'"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/>'+subtraction+'</mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
export function renderTargetLocal(strokes,pen,mask,p,prefix='target-local'){assertFixedGeometry(strokes);ensure(Number.isFinite(p)&&p>=0&&p<=1&&/^[A-Za-z][\w-]*$/.test(prefix),'target local p/id');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'own exact local target');return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(t,p,prefix+'-'+pen+'-'+(mask-1))+'</g></svg>'}
