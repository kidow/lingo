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

const FIXED_STROKES=[[{"outline":"M8 11.5 L34.7 11.5 L34.7 13.5 L8 13.5 Z M34.7 11.5 L22.7 12.5 L28.7 6.5 Z","bounds":[8,6.5,34.7,13.5],"direction":"right","weight":26.715}],[{"outline":"M15.3 18 L15.3 35.25 L10.3 37.75 L10.3 15.5 Z","bounds":[10.3,15.5,15.3,37.75],"direction":"down","weight":17.5}],[{"outline":"M12.8 18 L29.2 18 L29.2 20 L12.8 20 Z M31.2 19 L31.2 35 L27.2 37 L27.2 19 Z M27.2 18 L29.2 15.5 L33.7 20 L31.2 21 L27.2 19 Z","bounds":[12.8,15.5,33.7,37],"direction":"curve","weight":33.44,"revealPath":"M12.8025 19 L29.2425 19 L29.2425 36","revealWidth":14}],[{"outline":"M23.35 23 L23.35 34.5 L19.35 36.5 L19.35 22 Z M23.35 23 L24.35 24 L22.35 25.5 Z","bounds":[19.35,22,24.35,36.5],"direction":"down","weight":13}],[{"outline":"M38.1 11.5 L65.5 11.5 L65.5 13.5 L38.1 13.5 Z M65.5 11.5 L53.5 12.5 L59.5 6.5 Z","bounds":[38.1,6.5,65.5,13.5],"direction":"right","weight":27.4}],[{"outline":"M44.9 18 L44.9 35 L40.9 37 L40.9 16 Z","bounds":[40.9,16,44.9,37],"direction":"down","weight":17}],[{"outline":"M42.9 18 L59.35 18 L59.35 20 L42.9 20 Z M61.85 19 L61.85 34.25 L56.85 36.75 L56.85 19 Z M56.85 18 L59.35 15.5 L64.35 20 L61.85 21.5 L56.85 19 Z","bounds":[42.9,15.5,64.35,36.75],"direction":"curve","weight":32.94,"revealPath":"M42.9425 19 L59.3825 19 L59.3825 35.5","revealWidth":14}],[{"outline":"M52.8 22 L52.8 34 L48.8 36 L48.8 21 Z M52.8 22 L53.8 23 L51.8 24.5 Z","bounds":[48.8,21,53.8,36],"direction":"down","weight":13.5}],[{"outline":"M38.05 32.5 L38.05 43.5 L34.05 43.5 L34.05 31.5 Z M38.05 32.5 L39.05 33.5 L37.05 35 Z","bounds":[34.05,31.5,39.05,43.5],"direction":"down","weight":10.5}],[{"outline":"M13.8 41.5 L63.15 41.5 L63.15 43.5 L13.8 43.5 Z M63.15 41.5 L51.15 42.5 L57.15 36.5 Z","bounds":[13.8,36.5,63.15,43.5],"direction":"right","weight":49.32}],[{"outline":"M16.8 41.5 L16.8 64.5 L10.8 64.5 L10.8 38.5 Z M10.8 64.5 L16.8 64.5 L15.6 66.3 L13.8 67.5 L12 66.3 Z M16.8 64.5 L16.6 68.05 L16.2 71.5 L15.65 74.85 L14.95 78.1 L14.05 81.2 L13.05 84.2 L11.85 87.1 L10.45 89.8 L8.85 92.35 L7 94.7 L6.2 94.25 L7.15 91.5 L7.95 88.75 L8.75 85.95 L9.4 83.15 L9.95 80.25 L10.35 77.25 L10.65 74.2 L10.85 71.05 L10.9 67.8 L10.8 64.5 Z","bounds":[6.2,38.5,16.8,94.7],"direction":"curve","weight":52.850155,"revealPath":"M13.83 42.5 L13.83 64.5 Q13.83 82 6.6375 94.5","revealWidth":14}],[{"outline":"M13.8 51 L59 51 L59 53 L13.8 53 Z M62 52 L62 62.5 L56 65.5 L56 52 Z M56 51 L59 48.5 L64.5 53 L62 55 L56 52 Z","bounds":[13.8,48.5,64.5,65.5],"direction":"curve","weight":54.71,"revealPath":"M13.83 52 L59.04 52 L59.04 61.5","revealWidth":14}],[{"outline":"M32.55 44.5 L32.55 62.5 L26.55 62.5 L26.55 43.5 Z M32.55 44.5 L34.05 45.5 L31.55 47 Z","bounds":[26.55,43.5,34.05,62.5],"direction":"down","weight":17.5}],[{"outline":"M47.3 44.5 L47.3 62.5 L41.3 62.5 L41.3 43.5 Z M47.3 44.5 L48.8 45.5 L46.3 47 Z","bounds":[41.3,43.5,48.8,62.5],"direction":"down","weight":17.5}],[{"outline":"M13.8 60.5 L59 60.5 L59 62.5 L13.8 62.5 Z","bounds":[13.8,60.5,59,62.5],"direction":"right","weight":45.21}],[{"outline":"M23.4 74.5 L38.8 74.5 L38.8 76.5 L23.4 76.5 Z M38.8 74.5 L30.8 75.5 L34.8 71 Z","bounds":[23.4,71,38.8,76.5],"direction":"right","weight":15.4125}],[{"outline":"M26.4 65.5 L26.4 89 L20.4 89 L20.4 64.5 Z M26.4 65.5 L27.9 66.5 L25.4 68 Z","bounds":[20.4,64.5,27.9,89],"direction":"down","weight":23},{"outline":"M14.7 87.45 L16.6 87.2 L18.65 86.9 L20.85 86.55 L23.15 86.2 L25.65 85.75 L28.3 85.3 L31.05 84.85 L34 84.4 L37.1 83.95 L40.4 83.55 L40.65 84.4 L37.6 85.75 L34.7 86.95 L31.9 88.05 L29.25 89 L26.7 89.9 L24.3 90.7 L22 91.45 L19.85 92.1 L17.8 92.75 L15.95 93.3 Z M15.95 93.3 L13.75 87.65 L14.7 87.45 Z M15.95 93.3 L18.55 91.25 L17.2 94.55 Z","bounds":[13.75,83.55,40.65,94.55],"direction":"curve","weight":26.497125,"revealPath":"M14.8575 90.5 Q24.4475 88.5 40.545 84","revealWidth":14}],[{"outline":"M61.05 72.7 L59.7 73.4 L58.25 74.1 L56.8 74.75 L55.25 75.35 L53.7 75.9 L52.1 76.4 L50.4 76.85 L48.7 77.2 L46.9 77.5 L45.1 77.9 L44.8 77.05 L46.4 76.2 L47.9 75.25 L49.3 74.3 L50.65 73.4 L51.95 72.45 L53.2 71.55 L54.4 70.6 L55.5 69.7 L56.55 68.8 L57.55 67.85 Z M57.1 68.15 L57.55 67.85 L61.05 72.7 Z M61.05 72.7 L61.15 74.5 L58.45 73.35 Z","bounds":[44.8,67.85,61.15,77.9],"direction":"curve","weight":16.527228,"revealPath":"M59.725 70 Q53.56 74.5 44.9975 77.5","revealWidth":14}],[{"outline":"M46.25 66 L46.25 84.5 L40.25 84.5 L40.25 65 Z M46.25 66 L47.75 67 L45.25 68.5 Z M40.25 84.5 L46.25 84.5 L45.05 86.3 L43.25 87.5 L41.45 86.3 Z M46.25 84.5 L46.3 85.1 L46.35 85.55 L46.45 85.85 L46.55 86 L46.65 86.1 L46.7 86.2 L46.9 86.25 L47.2 86.35 L47.65 86.45 L48.25 86.5 L48.25 92.5 L47 92.4 L45.75 92.2 L44.55 91.8 L43.4 91.15 L42.4 90.35 L41.55 89.35 L40.95 88.2 L40.55 87 L40.35 85.75 L40.25 84.5 Z M48.25 86.5 L50.35 87.4 L51.25 89.5 L50.35 91.6 L48.25 92.5 Z M48.25 86.5 L62.1 86.5 L62.1 92.5 L48.25 92.5 Z M62.1 86.5 L63.9 87.7 L65.1 89.5 L63.9 91.3 L62.1 92.5 Z","bounds":[40.25,65,65.1,92.5],"direction":"curve","weight":39.908568,"revealPath":"M43.285 65.5 L43.285 84.5 Q43.285 89.5 48.285 89.5 L62.1225 89.5","revealWidth":14},{"outline":"M62.1 86.5 L59.1 86.5 L62.1 74 L63.1 74 Z","bounds":[59.1,74,63.1,86.5],"direction":"up","weight":12.5}],[{"outline":"M71.45 13 L89.25 13 L89.25 15 L71.45 15 Z M92.15 14.75 L91.25 17.3 L90.3 19.9 L89.25 22.55 L88.1 25.25 L86.85 28 L85.55 30.75 L84.15 33.6 L82.6 36.45 L80.9 39.3 L79.05 42.15 L78.25 41.8 L79.15 38.5 L80.15 35.35 L81.1 32.3 L82.05 29.35 L82.9 26.45 L83.75 23.65 L84.5 20.95 L85.2 18.3 L85.8 15.7 L86.35 13.2 Z M86.25 13 L89.25 10.5 L94.75 15 L92.25 16.5 L86.25 19 Z","bounds":[71.45,10.5,94.75,42.15],"direction":"curve","weight":47.755472,"revealPath":"M71.47 14 L89.28 14 Q85.85499999999999 26.5 78.6625 42","revealWidth":14}],[{"outline":"M79.3 41.35 L83.4 43.35 L86.55 46.3 L88.95 49.8 L90.75 53.5 L91.95 57.35 L92.7 61.2 L93 64.9 L93 68.3 L92.7 71.4 L92.2 74.05 L86.45 72.35 L87 70.35 L87.45 67.85 L87.7 64.9 L87.7 61.7 L87.35 58.3 L86.6 54.9 L85.45 51.55 L83.8 48.35 L81.55 45.3 L78.85 42.1 Z M92.2 74.05 L90.75 75.8 L88.45 76.05 L86.7 74.6 L86.45 72.35 Z M92.2 74.05 L91.75 75.25 L91.2 76.35 L90.55 77.4 L89.75 78.35 L88.8 79.2 L87.75 79.85 L86.6 80.35 L85.4 80.7 L84.15 80.9 L82.9 81 L82.9 75 L83.55 74.95 L84.1 74.85 L84.55 74.75 L84.9 74.55 L85.2 74.35 L85.45 74.15 L85.75 73.85 L86 73.45 L86.2 72.95 L86.45 72.35 Z","bounds":[78.85,41.35,93,81],"direction":"curve","weight":41.473609,"revealPath":"M78.6625 41.5 C91.67750000000001 49.5 91.33500000000001 66.5 89.33717934906275 73.20801094475281 Q87.91 78 82.91 78","revealWidth":14},{"outline":"M82.9 78 L77.9 76.5 L77.9 75 L82.9 75 Z","bounds":[77.9,75,82.9,78],"direction":"left","weight":5}],[{"outline":"M74.45 13 L74.45 91.5 L68.45 94.5 L68.45 10 Z","bounds":[68.45,10,74.45,94.5],"direction":"down","weight":79}]];
const freeze=v=>{if(v&&typeof v==='object'){for(const value of Object.values(v))freeze(value);Object.freeze(v)}return v};freeze(FIXED_STROKES);
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
let certificateChecks=0;const SPECIFICATIONS=Object.freeze([{"pen":19,"mask":1,"id":"u9148-19-1","kind":"MLQL","path":"M43.285 65.5 L43.285 84.5 Q43.285 89.5 48.285 89.5 L62.1225 89.5","firstL":19,"maskSHA256":"46a68404ddd9126c99c03accea3b9a839ef97f08d68899f8c78a72dc6523e3a7"},{"pen":21,"mask":1,"id":"u9148-21-1","kind":"MCQ","path":"M78.6625 41.5 C91.67750000000001 49.5 91.33500000000001 66.5 89.33717934906275 73.20801094475281 Q87.91 78 82.91 78","T":"1/4","K":"1/10","maskSHA256":"48ee925e91e1c1b741687c3563268d9ddf3a9fd94b628c74c5f8fbcff719f2fd"}].map(Object.freeze));
const gcd=(a,b)=>b?gcd(b,a%b):a<0n?-a:a;
const R=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);ensure(d!==0n,'nonzero rational denominator');if(d<0n){n=-n;d=-d}const g=gcd(n,d);return[n/g,d/g]};
const D=v=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))};
const plus=(a,b)=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a,b)=>plus(a,[-b[0],b[1]]),times=(a,b)=>R(a[0]*b[0],a[1]*b[1]),square=a=>times(a,a),greater=(a,b)=>a[0]*b[1]>b[0]*a[1],absR=a=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=a=>a[0]+'/'+a[1],dotR=(a,b)=>plus(times(a[0],b[0]),times(a[1],b[1]));

function fixedNumbers(spec){const num='(-?\\d+(?:\\.\\d+)?)',tail=' Q'+num+' '+num+' '+num+' '+num,patterns={MLQL:'^M'+num+' '+num+' L'+num+' '+num+tail+' L'+num+' '+num+'$',MCQ:'^M'+num+' '+num+' C'+num+' '+num+' '+num+' '+num+' '+num+' '+num+tail+'$'};const match=new RegExp(patterns[spec.kind]).exec(spec.path);ensure(match,'exact MLQL19 or MCQ21 original grammar');return match.slice(1).map(D)}
function certificate(spec,s){ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source path/width/direction');const n=fixedNumbers(spec),P=Array.from({length:n.length/2},(_,i)=>n.slice(2*i,2*i+2));let result;
if(spec.kind==='MLQL'){const v=P[1].map((x,i)=>minus(x,P[0][i]));ensure(rString(v[0])==='0/1'&&rString(v[1])==='19/1'&&greater(v[1],R(7)),'exact first L19 > r7');result={kind:'initial-line',firstL:19,firstLRational:'19/1',curvatureUpper:'0/1',rKUpper:'0/1',initialArcMax:7,laterCurveAndLastLineNotCertified:true}}
else{const [P0,P1,P2,P3]=P,v0=P1.map((x,i)=>minus(x,P0[i])),v1=P2.map((x,i)=>minus(x,P1[i])),v2=P3.map((x,i)=>minus(x,P2[i])),a=v1.map((x,i)=>minus(x,v0[i])),b=v2.map((x,i)=>minus(x,v1[i])),T=R(1,4),u=minus(R(1),T);
ensure(greater(v0[0],v1[0])&&greater(v1[0],v2[0]),'decreasing derivative Bernstein x controls');const xmin=times(R(3),plus(plus(times(square(u),v0[0]),times(times(times(R(2),u),T),v1[0])),times(square(T),v2[0])));ensure(greater(xmin,R(0)),'positive X derivative throughout first quarter');ensure(greater(a[1],R(0))&&greater(plus(times(u,a[1]),times(T,b[1])),R(0)),'Y derivative increases on first quarter');const ymin=times(R(3),v0[1]);ensure(greater(ymin,R(0)),'positive Y derivative');const speed2=plus(square(xmin),square(ymin)),aa=dotR(a,a),bb=dotR(b,b),M2=times(R(36),greater(aa,bb)?aa:bb),chord=P0.map((_,i)=>minus(plus(plus(times(times(square(u),u),P0[i]),times(times(times(R(3),square(u)),T),P1[i])),plus(times(times(times(R(3),u),square(T)),P2[i]),times(times(square(T),T),P3[i]))),P0[i])),chord2=dotR(chord,chord),K=R(1,10),kr=R(7,10),cosLower=minus(R(1),times(R(1,2),square(kr)));
ensure(rString(xmin)==='33924653804718849/1600000000000000'&&rString(ymin)==='24/1','exact original C21 derivative bounds');ensure(rString(speed2)==='2625442135770025077341219935884801/2560000000000000000000000000000'&&rString(M2)==='23348052562500024043500000000009/2500000000000000000000000000','exact C21 norm bounds');ensure(rString(chord2)==='2250773579115164709370262533828841/20480000000000000000000000000000','exact original chord');ensure(greater(chord2,R(49))&&greater(times(square(K),square(speed2)),M2)&&greater(cosLower,kr),'initial arc7 / K<1/10 / cos(Kr)>Kr');result={kind:'fixed-C21-in-MCQ-only',tUpper:'1/4',derivativeXLower:rString(xmin),derivativeYLower:rString(ymin),speedSquaredLower:rString(speed2),secondDerivativeNormSquaredUpper:rString(M2),chordSquared:rString(chord2),curvatureUpper:'1/10',rKUpper:'7/10',cosLower:'151/200',initialArcMax:7,laterCubicAndQJoinNotCertified:true}}
certificateChecks++;return Object.freeze({...result,exactDecimalRational:true,notRasterProof:true,notFullSweepProof:true,notPolygonConnectivityProof:true})}
const POLICIES=Object.freeze(SPECIFICATIONS.map(spec=>Object.freeze({...spec,segment:FIXED_STROKES[spec.pen-1][spec.mask-1],certificate:certificate(spec,FIXED_STROKES[spec.pen-1][spec.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact22p25m57 body19/21 source only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only exact MLQL19 and MCQ21 body masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only19m1 and21m1');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 酈 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 酈 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 酈 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 酈 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 酈 SVG coordinate tree');
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
        throw new Error('Invalid 酈 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 酈 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 酈 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 酈 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 酈 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('酈 UA start differs from exact M');
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
            throw new Error('Invalid 酈 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 酈 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 酈 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('酈 binding changed during UA read');
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
            throw new Error('酈 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=22&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{let p=pi<stroke-1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;if(t&&global===1)p=1;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,22,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}


export function tailMask(pen){ensure(pen===19||pen===21,'only original UP19 and LEFT21 tails');return clone(FIXED_STROKES[pen-1][1])}
export function renderTail(strokes,pen,p,prefix='tail'){assertFixedGeometry(strokes);tailMask(pen);ensure(Number.isFinite(p)&&p>=0&&p<=1,'tail local p');return renderProgressive([[strokes[pen-1][1]]],1,p,prefix)}
