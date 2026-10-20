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

const FIXED_STROKES=[[{"outline":"M6.45 13.15 L46.75 13.15 L46.75 15.15 L6.45 15.15 Z M46.75 13.15 L36.75 14.15 L41.75 8.65 Z","bounds":[6.45,8.65,46.75,15.15],"direction":"right","weight":40.2975}],[{"outline":"M34.8 6.55 L34.8 20.5 L28.8 23.5 L28.8 5.55 Z M34.8 6.55 L36.3 7.55 L33.8 9.05 Z","bounds":[28.8,5.55,36.3,23.5],"direction":"down","weight":15.9375}],[{"outline":"M52.7 13.15 L93 13.15 L93 15.15 L52.7 15.15 Z M93 13.15 L81 14.15 L87 8.15 Z","bounds":[52.7,8.15,93,15.15],"direction":"right","weight":40.2975}],[{"outline":"M70.65 6.55 L70.65 20.5 L64.65 23.5 L64.65 5.55 Z M70.65 6.55 L72.15 7.55 L69.65 9.05 Z","bounds":[64.65,5.55,72.15,23.5],"direction":"down","weight":15.9375}],[{"outline":"M22.45 25 L21.35 26.65 L20.1 28.25 L18.8 29.7 L17.35 31.1 L15.8 32.4 L14.1 33.65 L12.35 34.8 L10.45 35.8 L8.4 36.7 L6.35 37.6 L5.9 36.8 L7.6 35.4 L9.1 33.9 L10.5 32.45 L11.8 31.05 L13 29.6 L14.05 28.15 L14.95 26.7 L15.8 25.25 L16.5 23.8 L17.05 22.35 Z M16.85 22.8 L17.35 21.8 L22.45 25 Z M22.45 25 L23.35 26.55 L20.45 26.8 Z","bounds":[5.9,21.8,23.35,37.6],"direction":"curve","weight":19.685669,"revealPath":"M19.995 23.25505 Q15.865 31.598050000000004 6.13 37.229575","revealWidth":14}],[{"outline":"M16.45 27.85 L54.2 27.85 L54.2 29.85 L16.45 29.85 Z M54.2 27.85 L46.2 28.85 L50.2 24.35 Z","bounds":[16.45,24.35,54.2,29.85],"direction":"right","weight":37.76}],[{"outline":"M22.25 33.8 L16 60.4 L9.45 61.95 L17.1 29.5 Z M14.65 51.9 L54.5 51.9 L54.5 53.9 L14.65 53.9 Z M54.5 51.9 L48.5 52.9 L51.5 48.9 Z","bounds":[9.45,29.5,54.5,61.95],"direction":"curve","weight":59.129516,"revealPath":"M19.11 34.1218075 L14.685 52.91232925 L54.51 52.91232925","revealWidth":14}],[{"outline":"M19.1 33.1 L45.35 33.1 L45.35 35.1 L19.1 35.1 Z M48.35 34.35 L47.95 38.4 L47.6 42 L47.25 45.25 L46.9 48.15 L46.5 50.6 L46.15 52.7 L45.75 54.45 L45.3 55.95 L44.7 57.25 L43.2 58.75 L40.35 53.5 L39.55 54.15 L39.65 53.9 L39.95 53 L40.25 51.55 L40.6 49.65 L40.95 47.3 L41.3 44.55 L41.65 41.4 L42 37.85 L42.35 33.85 Z M42.35 33.1 L45.35 30.6 L50.85 35.1 L48.35 36.6 L42.35 39.1 Z M43.2 58.75 L42.2 59.25 L41.15 59.75 L40.1 60.15 L39.05 60.5 L37.95 60.8 L36.85 61.05 L35.75 61.25 L34.65 61.4 L33.5 61.5 L32.4 61.5 L32.4 55.5 L33.2 55.5 L34.05 55.45 L34.9 55.35 L35.7 55.2 L36.5 55 L37.25 54.8 L38.05 54.5 L38.8 54.2 L39.6 53.85 L40.35 53.5 Z","bounds":[19.1,30.6,50.85,61.5],"direction":"curve","weight":58.254876,"revealPath":"M19.11 34.1218075 L45.365 34.1218075 Q43.595 55.16076775 41.791393490682324 56.1426801747943 Q37.4 58.5334255 32.4 58.5334255","revealWidth":14},{"outline":"M32.4 58.5 L23.4 57 L23.4 55.5 L32.4 55.5 Z","bounds":[23.4,55.5,32.4,58.5],"direction":"left","weight":9}],[{"outline":"M27.35 35.85 L28.4 36.1 L29.5 36.05 L30.55 36.05 L31.5 36.15 L32.4 36.25 L33.3 36.45 L34.15 36.7 L34.95 37.05 L35.75 37.55 L36.5 38.15 L31.4 41.3 L31.5 41.1 L31.55 40.75 L31.45 40.35 L31.2 39.9 L30.85 39.4 L30.35 38.85 L29.7 38.25 L29 37.7 L28.15 37.05 L27.15 36.75 Z M36.5 38.15 L36.8 40.4 L35.5 42.3 L33.25 42.6 L31.4 41.3 Z","bounds":[27.15,35.85,36.8,42.6],"direction":"curve","weight":9.308874,"revealPath":"M26.78 36.20964325 Q32.68 37.655068 34.745 41.02772575","revealWidth":14}],[{"outline":"M25 45 L26.15 45.2 L27.35 45.2 L28.5 45.2 L29.6 45.3 L30.6 45.5 L31.6 45.7 L32.55 46 L33.45 46.4 L34.3 46.9 L35.1 47.5 L30.25 51 L30.25 50.65 L30.15 50.25 L29.9 49.75 L29.55 49.2 L29.05 48.65 L28.45 48.1 L27.7 47.5 L26.85 46.85 L25.9 46.25 L24.8 45.9 Z M35.1 47.5 L35.6 49.75 L34.4 51.7 L32.2 52.2 L30.25 51 Z","bounds":[24.8,45,35.6,52.2],"direction":"curve","weight":10.490153,"revealPath":"M24.42 45.364000000000004 Q30.91 46.80942475 33.565 50.50328799999999","revealWidth":14}],[{"outline":"M6.7 42.4 L56.25 42.4 L56.25 44.4 L6.7 44.4 Z M56.25 42.4 L48.25 43.4 L52.25 38.9 Z","bounds":[6.7,38.9,56.25,44.4],"direction":"right","weight":49.56}],[{"outline":"M71.8 25 L70.5 27.1 L69.1 29.1 L67.5 31.05 L65.8 32.85 L63.95 34.6 L62 36.25 L59.85 37.75 L57.55 39.2 L55.15 40.45 L52.55 41.55 L52.05 40.8 L54.1 38.9 L56 37.1 L57.75 35.3 L59.4 33.5 L60.95 31.7 L62.3 29.85 L63.5 28.05 L64.6 26.15 L65.55 24.3 L66.4 22.4 Z M66.15 22.85 L66.65 21.8 L71.8 25 Z M71.8 25 L72.7 26.55 L69.8 26.8 Z","bounds":[52.05,21.8,72.7,41.55],"direction":"curve","weight":24.713399,"revealPath":"M69.325 23.25505 Q64.225 33.892375 52.325 41.1925","revealWidth":14}],[{"outline":"M62.5 32.45 L93.95 32.45 L93.95 34.45 L62.5 34.45 Z M93.95 32.45 L81.95 33.45 L87.95 27.45 Z","bounds":[62.5,27.45,93.95,34.45],"direction":"right","weight":31.45}],[{"outline":"M84.95 34.2 L83.4 38.45 L81.2 42.35 L78.4 45.9 L75.1 49.05 L71.25 51.85 L66.9 54.2 L62 56.25 L56.6 57.9 L50.7 59.15 L44.3 59.95 L44.15 59.1 L50.25 57.3 L55.8 55.35 L60.75 53.2 L65.1 50.85 L68.85 48.35 L72 45.6 L74.6 42.7 L76.6 39.55 L78.15 36.25 L79.15 32.7 Z","bounds":[44.15,32.7,84.95,59.95],"direction":"curve","weight":45.939888,"revealPath":"M82.075 33.475225 Q76.975 53.707 44.25 59.5471","revealWidth":14}],[{"outline":"M60.5 35.9 L62.15 38.6 L64 41.05 L66.1 43.3 L68.55 45.35 L71.3 47.25 L74.5 49 L78.05 50.55 L82.05 51.95 L86.45 53.15 L91.3 54.2 L89.8 60.65 L84.7 59.2 L80.05 57.5 L75.8 55.55 L72 53.45 L68.65 51.05 L65.75 48.5 L63.35 45.65 L61.5 42.65 L60.25 39.45 L59.65 36.15 Z M89.8 60.65 L91.3 54.2 L95.7 55.2 Z","bounds":[59.65,35.9,95.7,60.65],"direction":"curve","weight":37.629595,"revealPath":"M59.975 35.560975 Q64.65 51.62125 90.575 57.46135","revealWidth":14}],[{"outline":"M50.4 63 L49.1 63.75 L47.75 64.45 L46.35 65.15 L44.9 65.85 L43.4 66.55 L41.9 67.25 L40.3 67.9 L38.65 68.5 L36.9 69.1 L35.2 69.8 L34.75 69 L36.2 67.9 L37.55 66.65 L38.85 65.5 L40.1 64.4 L41.35 63.3 L42.5 62.25 L43.65 61.2 L44.75 60.2 L45.8 59.2 L46.75 58.25 Z M46.35 58.55 L46.8 58.2 L50.4 63 Z M50.4 63 L50.5 64.8 L47.8 63.75 Z","bounds":[34.75,58.2,50.5,69.8],"direction":"curve","weight":16.682361,"revealPath":"M49 60.349 Q43 64.88499999999999 35 69.42099999999999","revealWidth":14},{"outline":"M22.6 64.55 L25.1 64.95 L27.55 65.35 L29.8 65.8 L31.95 66.4 L33.95 67.05 L35.85 67.75 L37.6 68.55 L39.2 69.4 L40.7 70.35 L42.1 71.4 L37.8 75.6 L37 74.65 L36.1 73.65 L34.95 72.65 L33.7 71.65 L32.2 70.65 L30.55 69.6 L28.75 68.6 L26.8 67.55 L24.65 66.45 L22.35 65.45 Z M42.1 71.4 L42.9 73.55 L42 75.65 L39.9 76.5 L37.8 75.6 Z","bounds":[22.35,64.55,42.9,76.5],"direction":"curve","weight":21.34194,"revealPath":"M22 64.88499999999999 Q35 68.449 41 74.60499999999999","revealWidth":14}],[{"outline":"M69.7 67 L67.7 68.1 L65.55 69.2 L63.35 70.3 L61 71.45 L58.5 72.6 L55.95 73.8 L53.2 74.95 L50.35 76.1 L47.35 77.2 L44.2 78.2 L43.75 77.4 L46.5 75.5 L49.1 73.7 L51.7 72.05 L54.15 70.45 L56.45 68.9 L58.7 67.4 L60.8 66 L62.8 64.6 L64.65 63.25 L66.4 61.95 Z M66 62.25 L70.15 66.7 L69.7 67 Z M70.15 66.7 L70.2 68.45 L67.4 67.3 Z","bounds":[43.75,61.95,70.2,78.2],"direction":"curve","weight":28.025482,"revealPath":"M68.5 64.237 Q59 70.393 44 77.845","revealWidth":14},{"outline":"M10.9 76.1 L16.45 76.1 L22.4 76.1 L28.6 76.1 L35.2 76.05 L42.15 76 L49.4 75.95 L57.05 75.95 L65 75.9 L73.3 75.95 L81.95 76.05 L82 76.95 L73.4 77.85 L65.1 78.6 L57.15 79.2 L49.55 79.75 L42.3 80.25 L35.35 80.7 L28.8 81.1 L22.55 81.5 L16.6 81.8 L11.05 82.1 Z M11.05 82.1 L9.9 76.15 L10.9 76.1 Z M11.05 82.1 L14 80.55 L12.1 83.6 Z","bounds":[9.9,75.9,82,83.6],"direction":"curve","weight":71.546967,"revealPath":"M10.5 79.14099999999999 Q38 78.493 82 76.549","revealWidth":14}],[{"outline":"M70.1 69.8 L72.55 70.4 L74.9 70.95 L77.1 71.6 L79.2 72.3 L81.1 73.1 L82.9 73.95 L84.55 74.85 L86.1 75.8 L87.5 76.85 L88.8 78 L84.2 81.85 L83.55 80.85 L82.7 79.8 L81.65 78.75 L80.45 77.65 L79.1 76.55 L77.55 75.4 L75.85 74.25 L74 73.05 L72 71.8 L69.8 70.65 Z M88.8 78 L89.45 80.15 L88.45 82.2 L86.25 82.9 L84.2 81.85 Z","bounds":[69.8,69.8,89.45,82.9],"direction":"curve","weight":21.103371,"revealPath":"M69.5 70.069 Q82 74.60499999999999 87.5 81.08500000000001","revealWidth":14}],[{"outline":"M53 77.45 L53 91.2 L47 94.2 L47 77.45 Z","bounds":[47,77.45,53,94.2],"direction":"down","weight":14.256}],[{"outline":"M35.4 85.05 L33.7 86.1 L31.85 87.1 L29.9 88.1 L27.8 89 L25.55 89.9 L23.15 90.75 L20.6 91.55 L17.95 92.3 L15.1 92.95 L12.1 93.45 L11.85 92.6 L14.5 91.2 L17 89.85 L19.4 88.6 L21.65 87.35 L23.7 86.15 L25.65 84.95 L27.4 83.75 L29 82.6 L30.45 81.45 L31.75 80.3 Z M31.35 80.6 L31.75 80.25 L35.4 85.05 Z M35.4 85.05 L35.55 86.85 L32.85 85.8 Z","bounds":[11.85,80.25,35.55,93.45],"direction":"curve","weight":24.460557,"revealPath":"M34 82.381 Q26.5 88.21300000000001 12 93.07300000000001","revealWidth":14}],[{"outline":"M63.1 80.45 L65.75 81 L68.3 81.55 L70.75 82.2 L73 82.95 L75.15 83.75 L77.15 84.6 L79 85.5 L80.75 86.45 L82.4 87.45 L83.9 88.55 L79.85 92.95 L78.85 91.85 L77.7 90.75 L76.35 89.65 L74.9 88.5 L73.25 87.35 L71.45 86.2 L69.5 85 L67.4 83.8 L65.2 82.55 L62.8 81.3 Z M83.9 88.55 L84.85 90.6 L84.1 92.75 L82 93.7 L79.85 92.95 Z","bounds":[62.8,80.45,84.85,93.7],"direction":"curve","weight":23.27235,"revealPath":"M62.5 80.761 Q76 85.29699999999998 83 91.777","revealWidth":14}]];

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),clone=v=>JSON.parse(JSON.stringify(v)),ensure=(v,m)=>{if(!v)throw Error(m)};
for(const a of FIXED_STROKES){for(const s of a){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(a)}Object.freeze(FIXED_STROKES);
let certificateChecks=0;const Q_SPECS=[{"pen":16,"mask":1,"kind":"Q","path":"M49 60.349 Q43 64.88499999999999 35 69.42099999999999","certificate":{"kind":"source-specific-Q","syntax":"M Q","T":"1/2","K":"1/90","A":["-6/1","453599999999999/100000000000000"],"B":["-2/1","1/100000000000000"],"aa":"565752959999999092800000000001/10000000000000000000000000000","ab":"120000000000000453599999999999/10000000000000000000000000000","bb":"40000000000000000000000000001/10000000000000000000000000000","abAtT":"280000000000000907199999999999/20000000000000000000000000000","cross":"113399999999999/12500000000000","halfSpeedSquaredLower":"565752959999999092800000000001/10000000000000000000000000000","chordSquared":"10052047359999989113600000000009/160000000000000000000000000000","speedMinimumAt":"0","parameterBound":0.5,"curvatureBound":0.011111111111111112,"initialArcMax":7,"exactDecimalRational":true,"notRasterProof":true,"notPolygonConnectivityProof":true,"notFullSweepProof":true}},{"pen":16,"mask":2,"kind":"Q","path":"M22 64.88499999999999 Q35 68.449 41 74.60499999999999","certificate":{"kind":"source-specific-Q","syntax":"M Q","T":"1/3","K":"1/50","A":["13/1","356400000000001/100000000000000"],"B":["-7/1","129599999999999/50000000000000"],"aa":"1817020960000000712800000000001/10000000000000000000000000000","ab":"-408810560000000226800000000001/5000000000000000000000000000","bb":"139296159999999740800000000001/2500000000000000000000000000","abAtT":"-947839360000001198800000000001/15000000000000000000000000000","cross":"5864399999999981/100000000000000","halfSpeedSquaredLower":"12004646560000002656800000000001/90000000000000000000000000000","chordSquared":"3509905360000001198800000000001/50625000000000000000000000000","speedMinimumAt":"T","parameterBound":0.3333333333333333,"curvatureBound":0.02,"initialArcMax":7,"exactDecimalRational":true,"notRasterProof":true,"notPolygonConnectivityProof":true,"notFullSweepProof":true}}];
const R = (n, d = 1n) => ({ n: BigInt(n), d: BigInt(d) });
const dec = (v) => { const [a, b = ''] = v.split('.'); return R(BigInt(a + b), 10n ** BigInt(b.length)); };
const add = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d), sub = (a, b) => add(a, R(-b.n, b.d)), mul = (a, b) => R(a.n * b.n, a.d * b.d), gt = (a, b) => a.n * b.d > b.n * a.d;
const div = (a, b) => { ensure(b.n !== 0n, 'rational division by zero'); return b.n < 0n ? R(-a.n * b.d, -a.d * b.n) : R(a.n * b.d, a.d * b.n); };
const dot = (a, b) => add(mul(a[0], b[0]), mul(a[1], b[1]));
function parsed(s){
 ensure(typeof s.revealPath==='string'&&s.revealWidth===14,'exact original QC guide/width');
 const tokens=s.revealPath.split(' '),commands=[];for(let i=0;i<tokens.length;){const first=tokens[i++],op=first[0],arity=op==='M'?2:op==='Q'?4:op==='C'?6:0;ensure(arity&&first.length>1,'canonical M/Q/C only');const raw=[first.slice(1),...tokens.slice(i,i+arity-1)];i+=arity-1;ensure(raw.length===arity&&raw.every(v=>Number.isFinite(Number(v))&&String(Number(v))===v),'canonical finite arity');commands.push({op,args:raw.map(Number),raw})}
 const syntax=commands.map(c=>c.op).join(' ');ensure(['M Q','M C'].includes(syntax),'exact single Q or single C only');return{syntax,commands};
}
function certificate(pen,mask,s){
 const p=parsed(s),spec=Q_SPECS.find(t=>t.pen===pen&&t.mask===mask);ensure(spec&&spec.path===s.revealPath&&p.syntax==='M Q','exact 蘩16m1/16m2 singleQ allowlist');const c=spec.certificate,from=text=>{const[n,d]=text.split('/');return R(n,d)},v=p.commands.flatMap(x=>x.raw).map(dec),P=Array.from({length:3},(_,i)=>v.slice(2*i,2*i+2)),A=P[1].map((a,i)=>sub(a,P[0][i])),B=P[0].map((a,i)=>add(sub(a,mul(R(2),P[1][i])),P[2][i])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),T=from(c.T),K=from(c.K),at=A.map((a,i)=>add(a,mul(B[i],T))),atDerivative=add(ab,mul(bb,T)),min=mask===1?aa:dot(at,at),cross=sub(mul(A[0],B[1]),mul(A[1],B[0])),delta=A.map((a,i)=>add(mul(mul(R(2),T),a),mul(mul(T,T),B[i]))),chord=dot(delta,delta);
 for(const[k,val]of Object.entries({aa,ab,bb,abAtT:atDerivative,cross,halfSpeedSquaredLower:min,chordSquared:chord}))ensure(sub(val,from(c[k])).n===0n,'own exact rational '+k);for(let i=0;i<2;i++){ensure(sub(A[i],from(c.A[i])).n===0n&&sub(B[i],from(c.B[i])).n===0n,'own exact A/B')}ensure(gt(bb,R(0))&&gt(min,R(0)),'regular initial Q');if(mask===1){ensure(gt(ab,R(0)),'Q1 norm grows: minimum at0');ensure(gt(R(0),A[0])&&gt(R(0),at[0]),'Q1 strict x decrease on [0,T]')}else{ensure(mask===2&&gt(R(0),atDerivative),'Q2 norm decreases through T');ensure(gt(A[0],R(0))&&gt(at[0],R(0)),'Q2 strict x increase on [0,T]')}ensure(gt(chord,R(49)),'own Q chord beyond arc7');ensure(gt(mul(mul(K,K),mul(R(4),mul(mul(min,min),min))),mul(cross,cross)),'own strict curvature bound');const rK=mul(R(7),K);ensure(gt(sub(R(1),mul(R(1,2),mul(rK,rK))),rK),'own initial arc7 normal strip bound');certificateChecks++;return Object.freeze({...c});
}
const POLICIES=Object.freeze(Q_SPECS.map(t=>Object.freeze({id:'u8629-vs2-'+t.pen+'-'+t.mask,pen:t.pen,mask:t.mask,segment:FIXED_STROKES[t.pen-1][t.mask-1],certificate:certificate(t.pen,t.mask,FIXED_STROKES[t.pen-1][t.mask-1])})));
export const nativeApproval=false,runtimeApplied=false,appUI=false;
export function certificateCheckCount(){return certificateChecks}
export function assertFixedGeometry(strokes){ensure(same(strokes,FIXED_STROKES),'exact 蘩 VS2 21p24m54 only');return true}
function policy(s){const t=POLICIES.find(t=>same(t.segment,s));ensure(t,'only two exact 蘩16 Q source masks');return t}
function source(t,s){ensure(POLICIES.includes(t)&&same(t.segment,s),'private exact policy/all segment fields');const n=s.revealPath.match(/-?\d+(?:\.\d+)?/g).slice(0,2).map(Number);return{q0:n,r:7,minimumLength:7}}
export function targetInfo(pen,mask){ensure(arguments.length===2,'explicit pen and mask');const t=POLICIES.find(t=>t.pen===pen&&t.mask===mask);ensure(t,'only16m1/16m2');return{id:t.id,pen,mask,segment:clone(t.segment),certificate:clone(t.certificate)}}
export function targetMask(pen,mask){return targetInfo(pen,mask).segment}
export function sourceCertificate(s){return clone(policy(s).certificate)}
export function growingState(s,p,L,point){const t=policy(s),f=source(t,s);ensure(Number.isFinite(p)&&p>=0&&p<=1&&Number.isFinite(L)&&L>7,'finite local p/L');ensure(point&&Number.isFinite(point.x)&&Number.isFinite(point.y),'finite endpoint');const d=p*L;return{policyId:t.id,guide:s.revealPath,progress:p,L,d,rho:Math.min(7,d),q0:f.q0,point:{x:point.x,y:point.y}}}
function coordinateBinding(nodes, owner) {
    const document = owner.ownerDocument, view = document?.defaultView;
    if (!view || view.document !== document)
        throw new Error('Connected 遝 SVG document required');
    const parents = new Map();
    for (const node of nodes) {
        let current = node;
        const visited = new Set();
        while (current) {
            if (visited.has(current))
                throw new Error('Cyclic 遝 SVG parent');
            visited.add(current);
            if (current.namespaceURI !== 'http://www.w3.org/2000/svg' || current.ownerDocument !== document || !current.isConnected || (current !== owner && current.ownerSVGElement !== owner))
                throw new Error('Mismatched 遝 SVG coordinate owner');
            const parent = current.parentElement;
            if (parent && (!parent.isConnected || parent.ownerDocument !== document))
                throw new Error('Mismatched 遝 outer SVG parent');
            parents.set(current, parent);
            if (current === owner)
                break;
            current = current.parentElement;
        }
        if (current !== owner)
            throw new Error('Detached 遝 SVG coordinate tree');
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
        throw new Error('Invalid 遝 Q progress');
    const owner = guide?.ownerSVGElement;
    const defs = guide?.parentElement, target = defs?.parentElement;
    if (!owner || !guide || defs?.localName !== 'defs' || target?.localName !== 'g' || target.getAttribute('data-stroke-start-gate') !== policy.id)
        throw new Error('Exact 遝 measurement parent required');
    const coordinates = coordinateBinding([guide], owner);
    const exact = () => coordinates() && guide.parentElement === defs && defs.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('data-can-measurement') === 'true' && guide.getAttribute('pathLength') === null;
    if (!exact())
        throw new Error('Exact connected 遝 measurement guide required');
    const L = guide.getTotalLength();
    if (!Number.isFinite(L) || L <= fixed.minimumLength || !exact())
        throw new Error('Invalid 遝 browser length');
    const d = Math.min(progress * L, L), point = guide.getPointAtLength(d);
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact())
        throw new Error('Changed 遝 guide or invalid endpoint');
    if (progress === 0 && Math.hypot(point.x - fixed.q0[0], point.y - fixed.q0[1]) >= 1e-4)
        throw new Error('遝 UA start differs from exact M');
    return Object.freeze({ policyId: policy.id, guide: segment.revealPath, progress, L, d, rho: Math.min(fixed.r, d), q0: Object.freeze(fixed.q0), point: Object.freeze({ x: point.x, y: point.y }) });
}
/** 기존 정책과 분리된 원 QC commit. 완료 잉크는 별도 key/full round mask이다. */
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
            throw new Error('Invalid 遝 frame/id');
        if (progress === 0 || progress === 1)
            return { status: progress === 0 ? 'empty' : 'complete', frame: null, cleanup: reset };
        const owner = measurement?.ownerSVGElement;
        const defs = measurement?.parentElement, target = defs?.parentElement, mask = guide?.parentElement;
        if (!owner || !measurement || !guide || !startCap || !endCap || !ink || defs?.localName !== 'defs' || target?.localName !== 'g' || mask?.localName !== 'mask')
            throw new Error('Missing 遝 SVG binding tree');
        const coordinates = coordinateBinding([measurement, guide, startCap, endCap, ink], owner);
        const bound = () => coordinates() && measurement.parentElement === defs && defs.parentElement === target && guide.parentElement === mask && mask.parentElement === defs && startCap.parentElement === mask && endCap.parentElement === mask && ink.parentElement === target && target.getAttribute('data-stroke-start-gate') === policy.id && mask.getAttribute('id') === clipId + '-can-growing' && mask.getAttribute('maskUnits') === 'userSpaceOnUse' && ['x', 'y'].every(key => mask.getAttribute(key) === '0') && ['width', 'height'].every(key => mask.getAttribute(key) === '100') && [measurement, guide, startCap, endCap, ink].every(node => node.getAttribute('data-growing-owner') === clipId) && measurement.getAttribute('id') === clipId + '-can-measure' && guide.getAttribute('id') === clipId + '-can-guide' && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === '14' && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter' && ink.getAttribute('d') === segment.outline && ink.getAttribute('mask') === 'url(#' + clipId + '-can-growing)';
        if (!bound())
            throw new Error('Mismatched 遝 SVG binding');
        const frame = measureFrame(policy, segment, progress, measurement);
        if (!bound())
            throw new Error('遝 binding changed during UA read');
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
            throw new Error('遝 binding changed before visibility commit');
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
export function renderGrowingCaps(strokes,stroke,progress,prefix='can'){assertFixedGeometry(strokes);ensure(Number.isInteger(stroke)&&stroke>=1&&stroke<=21&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact pen/progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe id');let out='';strokes.forEach((masks,pi)=>{const global=pi<stroke-1?1:pi===stroke-1?progress:0,total=masks.reduce((n,s)=>n+s.weight,0);let elapsed=global*total;masks.forEach((s,mi)=>{const p=pi<stroke-1?1:Math.max(0,Math.min(1,elapsed/s.weight));elapsed-=s.weight;const t=POLICIES.find(t=>t.pen===pi+1&&t.mask===mi+1),id=prefix+'-'+(pi+1)+'-'+mi;out+=t?targetHTML(t,global===1?1:p,id):ordinary(s,p,id)})});return '<svg viewBox="0 0 100 100"><g fill="#222">'+out+'</g></svg>'}
export function renderWhole(strokes,prefix='whole'){return renderGrowingCaps(strokes,21,1,prefix)}
export function renderOriginal(strokes,stroke,p,prefix='original'){return renderProgressive(strokes,stroke,p,prefix)}
let lastFrames=[];
export function commitHost(host){ensure(host&&host.isConnected,'connected render host');const frames=[];for(const g of host.querySelectorAll('[data-can-target]')){const t=POLICIES.find(t=>t.id===g.getAttribute('data-can-target'));ensure(t,'exact target id');const id=g.getAttribute('data-can-clip'),p=Number(g.getAttribute('data-can-progress')),caps=g.querySelectorAll('mask circle'),measurement=g.querySelector('[data-can-measurement="true"]'),guide=g.querySelector('path[id$="-can-guide"]'),ink=g.querySelector(':scope > path[data-can-ink="true"]');const result=commitFrame(t,t.segment,p,id,{measurement,guide,startCap:caps[0],endCap:caps[1],ink});frames.push({id:t.id,pen:t.pen,mask:t.mask,requestedLocal:p,status:result.status,frame:result.frame,fullRound:!!g.querySelector(':scope > path[data-can-full="true"]'),inkVisible:ink?.getAttribute('visibility')==='visible',inkMask:ink?.getAttribute('mask')??null});}lastFrames=frames;return clone(frames)}
export function browserMetrics(){return clone(lastFrames)}
export function targetCoverageResidual(s,prefix='residual'){policy(s);ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe coverage id');return '<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><defs><mask id="'+prefix+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/><path d="'+s.revealPath+'" fill="none" stroke="black" stroke-width="14" stroke-linecap="round" stroke-linejoin="miter" pathLength="1" stroke-dasharray="1 2" stroke-dashoffset="0"/></mask></defs><path d="'+s.outline+'" fill="black" mask="url(#'+prefix+')"/></svg>'}
export function renderTargetLocal(strokes,mask,progress,prefix='local'){assertFixedGeometry(strokes);ensure(Number.isInteger(mask)&&[1,2].includes(mask)&&Number.isFinite(progress)&&progress>=0&&progress<=1,'exact isolated QQ16 target/local progress');ensure(/^[A-Za-z][\w-]*$/.test(prefix),'safe local id');const t=POLICIES.find(t=>t.pen===16&&t.mask===mask);return '<svg viewBox="0 0 100 100"><g fill="#222">'+targetHTML(t,progress,prefix+'-16-'+(mask-1))+'</g></svg>'}
