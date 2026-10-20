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

const FIXED_STROKES=[[{"outline":"M14.5 9.55 L16.45 10.05 L18.35 10.45 L20.15 10.95 L21.85 11.55 L23.45 12.25 L25 13.1 L26.4 14 L27.7 15 L28.9 16.1 L30 17.3 L24.95 20.5 L24.5 19.5 L23.9 18.5 L23.15 17.5 L22.3 16.45 L21.3 15.45 L20.2 14.4 L18.9 13.4 L17.5 12.35 L15.95 11.3 L14.2 10.4 Z M30 17.3 L30.35 19.55 L29.1 21.45 L26.85 21.8 L24.95 20.5 Z","bounds":[14.2,9.55,30.35,21.8],"direction":"curve","weight":17.729278,"revealPath":"M13.9 9.85 Q23.9 13.2975 28.3 20.1925","revealWidth":14}],[{"outline":"M6.9 32.2 L9 32.65 L11 33.05 L12.9 33.55 L14.7 34.2 L16.35 34.9 L17.9 35.7 L19.35 36.6 L20.65 37.65 L21.85 38.75 L22.9 40 L17.75 43.05 L17.35 42.1 L16.8 41.15 L16.15 40.15 L15.25 39.15 L14.25 38.1 L13.05 37.1 L11.7 36.05 L10.2 35.05 L8.5 33.95 L6.6 33.05 Z M22.9 40 L23.2 42.3 L21.85 44.1 L19.55 44.4 L17.75 43.05 Z","bounds":[6.6,32.2,23.2,44.4],"direction":"curve","weight":18.055672,"revealPath":"M6.3 32.505 Q17.1 35.9525 21.1 42.8475","revealWidth":14}],[{"outline":"M7.7 65.2 L10.5 65.8 L13.1 66.85 L15.45 68.35 L17.5 70.3 L19.2 72.65 L20.6 75.4 L21.6 78.4 L22.25 81.75 L22.6 85.4 L22.6 89.35 L16.6 88.85 L16.9 85.4 L16.9 82.25 L16.65 79.45 L16.2 76.9 L15.45 74.6 L14.45 72.55 L13.15 70.7 L11.6 69.05 L9.7 67.5 L7.4 66.05 Z M22.6 89.35 L21.5 91.35 L19.35 92.1 L17.35 91.05 L16.6 88.85 Z","bounds":[7.4,65.2,22.6,92.1],"direction":"curve","weight":28.011583,"revealPath":"M7.1 65.5025 Q21.1 69.935 19.5 90.62","revealWidth":14},{"outline":"M14.6 73.05 L15.25 71.45 L16.25 69.35 L17.5 66.7 L19.05 63.55 L20.95 59.8 L23.15 55.5 L25.65 50.65 L28.55 45.2 L31.8 39.25 L35.45 32.8 L36.3 33.15 L33.5 40.1 L31 46.35 L28.65 52.05 L26.6 57.1 L24.8 61.55 L23.3 65.4 L22.1 68.65 L21.2 71.3 L20.65 73.35 L20.35 74.65 Z","bounds":[14.6,32.8,36.3,74.65],"direction":"curve","weight":44.827782,"revealPath":"M17.5 73.875 Q19.1 67.965 35.9 32.9975","revealWidth":14}],[{"outline":"M29.8 10.85 L56.3 10.85 L56.3 12.85 L29.8 12.85 Z M59.3 11.85 L59.3 29.4 L53.3 29.4 L53.3 11.85 Z M53.3 10.85 L56.3 8.35 L61.8 12.85 L59.3 14.85 L53.3 11.85 Z M53.3 29.4 L59.3 29.4 L58.1 31.2 L56.3 32.4 L54.5 31.2 Z M59.3 29.4 L59.25 30.7 L59 31.95 L58.6 33.15 L58 34.3 L57.15 35.3 L56.15 36.1 L55.05 36.7 L53.8 37.1 L52.6 37.35 L51.3 37.4 L51.3 31.4 L51.9 31.4 L52.35 31.3 L52.65 31.2 L52.85 31.1 L52.9 31.05 L53 30.95 L53.1 30.8 L53.2 30.5 L53.25 30.05 L53.3 29.4 Z","bounds":[29.8,8.35,61.8,37.4],"direction":"curve","weight":51.151068,"revealPath":"M29.8 11.8776 L56.32 11.8776 L56.32 29.437600000000003 Q56.32 34.4376 51.32 34.4376","revealWidth":14},{"outline":"M51.3 34.4 L41.3 32.9 L41.3 31.4 L51.3 31.4 Z","bounds":[41.3,31.4,51.3,34.4],"direction":"left","weight":10}],[{"outline":"M49.9 15.7 L48.45 16.75 L46.95 17.8 L45.35 18.75 L43.65 19.65 L41.8 20.55 L39.9 21.35 L37.85 22.1 L35.75 22.8 L33.45 23.4 L31.1 24 L30.8 23.15 L32.85 21.95 L34.75 20.7 L36.55 19.45 L38.2 18.3 L39.8 17.1 L41.2 15.95 L42.5 14.8 L43.7 13.65 L44.7 12.55 L45.65 11.45 Z M45.25 11.8 L45.75 11.3 L49.9 15.7 Z M49.9 15.7 L50.25 17.45 L47.4 16.75 Z","bounds":[30.8,11.3,50.25,24],"direction":"curve","weight":20.053932,"revealPath":"M48.13 13.231200000000001 Q42.28 19.096799999999998 30.97 23.608800000000002","revealWidth":14}],[{"outline":"M54.2 22.85 L52.45 24.35 L50.55 25.8 L48.5 27.2 L46.25 28.6 L43.8 29.95 L41.2 31.3 L38.4 32.65 L35.4 33.9 L32.2 35.1 L28.8 36.15 L28.4 35.35 L31.35 33.4 L34.15 31.5 L36.8 29.75 L39.25 28.05 L41.5 26.4 L43.6 24.8 L45.45 23.2 L47.15 21.65 L48.6 20.15 L49.9 18.7 Z M49.55 19.05 L50.05 18.55 L54.2 22.85 Z M54.2 22.85 L54.6 24.65 L51.75 23.95 Z","bounds":[28.4,18.55,54.6,36.15],"direction":"curve","weight":28.307318,"revealPath":"M52.42 20.4504 Q45.01000000000001 28.1208 28.63 35.791199999999996","revealWidth":14}],[{"outline":"M62.15 10.85 L89.05 10.85 L89.05 12.85 L62.15 12.85 Z M92.05 11.85 L92.05 29.4 L86.05 29.4 L86.05 11.85 Z M86.05 10.85 L89.05 8.35 L94.55 12.85 L92.05 14.85 L86.05 11.85 Z M86.05 29.4 L92.05 29.4 L90.85 31.2 L89.05 32.4 L87.25 31.2 Z M92.05 29.4 L92 30.7 L91.75 31.95 L91.35 33.15 L90.75 34.3 L89.95 35.3 L88.9 36.1 L87.8 36.7 L86.6 37.1 L85.35 37.35 L84.05 37.4 L84.05 31.4 L84.65 31.4 L85.15 31.3 L85.4 31.2 L85.6 31.1 L85.7 31.05 L85.75 30.95 L85.85 30.8 L85.95 30.5 L86 30.05 L86.05 29.4 Z","bounds":[62.15,8.35,94.55,37.4],"direction":"curve","weight":51.541068,"revealPath":"M62.17 11.8776 L89.08 11.8776 L89.08 29.437600000000003 Q89.08 34.4376 84.08 34.4376","revealWidth":14},{"outline":"M84.05 34.4 L77.05 32.9 L77.05 31.4 L84.05 31.4 Z","bounds":[77.05,31.4,84.05,34.4],"direction":"left","weight":7}],[{"outline":"M81.05 15.7 L79.75 16.65 L78.35 17.6 L76.85 18.5 L75.25 19.4 L73.55 20.25 L71.75 21.1 L69.85 21.85 L67.85 22.6 L65.7 23.25 L63.5 24 L63.1 23.2 L65.05 21.9 L66.8 20.6 L68.45 19.35 L70 18.1 L71.4 16.95 L72.75 15.8 L73.95 14.65 L75.05 13.55 L76 12.45 L76.85 11.45 Z M76.5 11.8 L77 11.3 L81.05 15.7 Z M81.05 15.7 L81.4 17.45 L78.6 16.75 Z","bounds":[63.1,11.3,81.4,24],"direction":"curve","weight":19.062389,"revealPath":"M79.33 13.231200000000001 Q73.87 18.645599999999998 63.34 23.608800000000002","revealWidth":14}],[{"outline":"M86 23 L84.15 24.35 L82.15 25.65 L80.05 26.95 L77.8 28.2 L75.4 29.45 L72.9 30.65 L70.2 31.8 L67.35 32.9 L64.35 33.9 L61.15 34.8 L60.8 34 L63.55 32.2 L66.15 30.5 L68.65 28.9 L71.05 27.3 L73.25 25.8 L75.3 24.3 L77.25 22.8 L79 21.35 L80.6 19.9 L82 18.5 Z M81.65 18.85 L82.1 18.45 L86 23 Z M86 23 L86.25 24.8 L83.45 23.9 Z","bounds":[60.8,18.45,86.25,34.8],"direction":"curve","weight":27.261727,"revealPath":"M84.4 20.4504 Q76.21000000000001 27.6696 61 34.4376","revealWidth":14}],[{"outline":"M42.9 39.55 L42.9 61.3 L36.9 64.3 L36.9 36.55 Z","bounds":[36.9,36.55,42.9,64.3],"direction":"down","weight":18.23544}],[{"outline":"M39.9 39.55 L82.05 39.55 L82.05 41.55 L39.9 41.55 Z M85.05 40.55 L85.05 60.8 L79.05 63.8 L79.05 40.55 Z M79.05 39.55 L82.05 37.05 L87.55 41.55 L85.05 43.55 L79.05 40.55 Z","bounds":[39.9,37.05,87.55,63.8],"direction":"curve","weight":60.35544,"revealPath":"M39.94 40.57944 L82.06 40.57944 L82.06 58.814879999999995","revealWidth":14}],[{"outline":"M39.9 48.65 L82.05 48.65 L82.05 50.65 L39.9 50.65 Z","bounds":[39.9,48.65,82.05,50.65],"direction":"right","weight":42.12}],[{"outline":"M64 39.55 L64 59.8 L58 59.8 L58 39.55 Z","bounds":[58,39.55,64,59.8],"direction":"down","weight":18.23544}],[{"outline":"M39.9 57.8 L82.05 57.8 L82.05 59.8 L39.9 59.8 Z","bounds":[39.9,57.8,82.05,59.8],"direction":"right","weight":42.12}],[{"outline":"M33.7 67.75 L88.3 67.75 L88.3 69.75 L33.7 69.75 Z M88.3 67.75 L78.3 68.75 L83.3 63.25 Z","bounds":[33.7,63.25,88.3,69.75],"direction":"right","weight":54.6}],[{"outline":"M54.25 61.5 L54.25 79.05 L48.25 79.05 L48.25 60.5 Z M54.25 61.5 L55.75 62.5 L53.25 64 Z","bounds":[48.25,60.5,55.75,79.05],"direction":"down","weight":17.028}],[{"outline":"M73.75 61.5 L73.75 79.05 L67.75 79.05 L67.75 60.5 Z M73.75 61.5 L75.25 62.5 L72.75 64 Z","bounds":[67.75,60.5,75.25,79.05],"direction":"down","weight":17.028}],[{"outline":"M28.6 77.05 L93.35 77.05 L93.35 79.05 L28.6 79.05 Z M93.35 77.05 L81.35 78.05 L87.35 72.05 Z","bounds":[28.6,72.05,93.35,79.05],"direction":"right","weight":64.74}],[{"outline":"M54.55 84.3 L52.45 85.25 L50.2 86.15 L47.9 87.05 L45.5 87.9 L43.05 88.7 L40.45 89.45 L37.8 90.2 L35 90.8 L32.1 91.35 L29.1 91.75 L28.85 90.85 L31.55 89.55 L34.15 88.25 L36.7 87.1 L39.1 85.9 L41.45 84.75 L43.7 83.65 L45.85 82.5 L47.9 81.35 L49.85 80.2 L51.7 79.05 Z M51.25 79.25 L55.7 83.65 L54.55 84.3 Z M55.7 83.65 L55.75 85.35 L52.8 84.15 Z","bounds":[28.85,79.05,55.75,91.75],"direction":"curve","weight":26.484119,"revealPath":"M53.59 81.443544 Q43.45 87.024084 29.02 91.32907199999998","revealWidth":14}],[{"outline":"M65.85 80.8 L68.55 81.05 L71.1 81.35 L73.55 81.8 L75.85 82.3 L78.05 82.9 L80.15 83.55 L82.1 84.25 L83.95 85.05 L85.7 85.95 L87.35 86.9 L83.7 91.7 L82.55 90.65 L81.3 89.65 L79.85 88.65 L78.25 87.65 L76.5 86.65 L74.6 85.65 L72.6 84.7 L70.4 83.7 L68.1 82.65 L65.65 81.65 Z M87.35 86.9 L88.45 88.9 L87.9 91.1 L85.95 92.2 L83.7 91.7 Z","bounds":[65.65,80.8,88.45,92.2],"direction":"curve","weight":23.295919,"revealPath":"M65.28999999999999 81.124656 Q78.94 84.313536 86.74 90.21296400000001","revealWidth":14}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const Q_SPECS=[{pen:3,mask:1,path:"M7.1 65.5025 Q21.1 69.935 19.5 90.62",T:[1n,3n],K:[1n,11n]},{pen:3,mask:2,path:"M17.5 73.875 Q19.1 67.965 35.9 32.9975",T:[1n,3n],K:[1n,10n]}];
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
    ensure(spec && parse.syntax === 'M Q' && s.revealPath === spec.path, 'exact ten Q certificate allowlist');
    const tokens = s.revealPath.split(' '), n = [tokens[0].slice(1), tokens[1], tokens[2].slice(1), tokens[3], tokens[4], tokens[5]].map(dec), P0 = n.slice(0, 2), P1 = n.slice(2, 4), P2 = n.slice(4), A = P1.map((v, i) => sub(v, P0[i])), B = P0.map((v, i) => add(sub(v, mul(R(2), P1[i])), P2[i])), T = R(spec.T[0], spec.T[1]), K = R(spec.K[0], spec.K[1]), aa = dot(A, A), ab = dot(A, B), bb = dot(B, B);
    ensure(gt(bb, R(0)), 'fixed nonzero Q second derivative');
    const normAt = (t) => add(add(aa, mul(mul(R(2), ab), t)), mul(bb, mul(t, t))), star = div(R(-ab.n, ab.d), bb), minimumT = gt(star, R(0)) && gt(T, star) ? star : (gt(normAt(T), aa) ? R(0) : T), lambda = normAt(minimumT), delta = A.map((v, i) => add(mul(mul(R(2), T), v), mul(mul(T, T), B[i]))), cross = sub(mul(A[0], B[1]), mul(A[1], B[0])), kr = mul(R(7), K), den = mul(R(4), mul(mul(lambda, lambda), lambda));
    ensure(gt(lambda, R(0)) && gt(dot(delta, delta), R(49)), 'initial Q regularity and arc7');
    ensure(gt(mul(mul(K, K), den), mul(cross, cross)), 'exact Q curvature bound');
    ensure(gt(sub(R(1), mul(R(1, 2), mul(kr, kr))), kr), 'initial-offset injectivity lower bound');
    certificateChecks++;
    return Object.freeze({ syntax: parse.syntax, initialArcMax: 7, parameterBound: Number(spec.T[0]) / Number(spec.T[1]), curvatureBound: Number(spec.K[0]) / Number(spec.K[1]), exactDecimalRational: true, notRasterProof: true });
}

const LINE_SPECS=[{pen:4,mask:1,syntax:"M L L Q",path:"M29.8 11.8776 L56.32 11.8776 L56.32 29.437600000000003 Q56.32 34.4376 51.32 34.4376",firstL:[663n,25n]},{pen:7,mask:1,syntax:"M L L Q",path:"M62.17 11.8776 L89.08 11.8776 L89.08 29.437600000000003 Q89.08 34.4376 84.08 34.4376",firstL:[2691n,100n]},{pen:11,mask:1,syntax:"M L L",path:"M39.94 40.57944 L82.06 40.57944 L82.06 58.814879999999995",firstL:[1053n,25n]}];
function parsedInitialLine(pen,mask,s){
 const spec=LINE_SPECS.find(x=>x.pen===pen&&x.mask===mask);ensure(spec&&s.direction==='curve'&&s.revealWidth===14&&s.revealPath===spec.path,'three exact original line-start masks only');
 const tokens=s.revealPath.split(' '),commands=[];
 for(let i=0;i<tokens.length;){const first=tokens[i++],op=first[0],arity=op==='Q'?4:op==='M'||op==='L'?2:0;ensure(arity>0&&first.length>1,'canonical exact M/L/Q arity');const raw=[first.slice(1),...tokens.slice(i,i+arity-1)];i+=arity-1;ensure(raw.length===arity&&raw.every(v=>Number.isFinite(Number(v))&&String(Number(v))===v),'unchanged finite source decimals');commands.push({op,raw});}
 ensure(commands.map(x=>x.op).join(' ')===spec.syntax,'source-specific M L L Q or M L L only');ensure(commands.length===(spec.pen===11?3:4),'exact full source command count');return{spec,commands};
}
function initialLineCertificate(pen,mask,s){
 const {spec,commands}=parsedInitialLine(pen,mask,s),P0=commands[0].raw.map(dec),P1=commands[1].raw.map(dec),v=P1.map((x,i)=>sub(x,P0[i])),expected=R(spec.firstL[0],spec.firstL[1]);
 ensure(v[1].n===0n&&gt(v[0],R(0))&&v[0].n*expected.d===expected.n*v[0].d,'exact positive horizontal first L');ensure(gt(dot(v,v),R(49)),'original first L strictly exceeds arc7');certificateChecks++;
 return Object.freeze({syntax:spec.syntax,kind:'initial-line',firstL:Number(spec.firstL[0])/Number(spec.firstL[1]),firstLNumerator:String(spec.firstL[0]),firstLDenominator:String(spec.firstL[1]),initialArcMax:7,curvatureBound:0,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,laterCornersAndQNotCertified:true,fullGuideBrowserLengthRequired:true});
}
const POLICIES=Object.freeze([...Q_SPECS.map(t=>Object.freeze({id:'u7037-k-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:certificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])})),...LINE_SPECS.map(t=>Object.freeze({id:'u7037-k-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:initialLineCertificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])}))]);
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact20p23m51 source with independent LEFT tails only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only two exact original Q masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only3m1/3m2/4m1/7m1/11m1');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 瀷 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 瀷 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 瀷 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 瀷 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 瀷 SVG coordinate tree');
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
        throw new Error('Invalid 瀷 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 瀷 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 瀷 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 瀷 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 瀷 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('瀷 UA start differs from exact M');
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
            throw new Error('Invalid 瀷 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 瀷 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 瀷 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('瀷 binding changed during UA read');
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
            throw new Error('瀷 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=20&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=global===1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,20,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}

export function ordinaryLeftTail(pen){ensure(pen===4||pen===7,'two exact LEFT tails only');return clone(FIXED_STROKES[pen-1][1])}
export function renderOrdinaryLeftTail(strokes,pen,p,prefix='lefttail'){assertFixedGeometry(strokes);ensure(pen===4||pen===7,'two exact LEFT tails only');ensure(Number.isFinite(p)&&p>=0&&p<=1,'tail local progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe tail id');return '<svg viewBox="0 0 100 100"><g fill="#222">'+ordinary(FIXED_STROKES[pen-1][1],p,prefix+'-1-0')+'</g></svg>'}
