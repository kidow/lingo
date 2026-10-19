import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 緦 전용. 고정 원 source/outline/순서와 독립 native 통과 정책만 허용한다. */
const FIXED_STROKES = [[{"outline":"M28.65 9.8 L27.45 11.75 L26.25 13.7 L24.95 15.6 L23.65 17.5 L22.3 19.4 L20.9 21.25 L19.45 23.05 L17.95 24.85 L16.4 26.55 L14.75 28.25 L14 27.7 L14.9 25.6 L15.85 23.45 L16.8 21.4 L17.8 19.35 L18.75 17.3 L19.7 15.25 L20.65 13.2 L21.55 11.15 L22.45 9.1 L23.3 7.05 Z M23.1 7.5 L23.6 6.5 L28.65 9.8 Z M28.65 9.8 L29.55 11.35 L26.65 11.55 Z","bounds":[14,6.5,29.55,28.25],"direction":"curve","weight":23.250813,"revealPath":"M26.245 8 Q20.89 18.5 14.3875 28","revealWidth":14},{"outline":"M7 22.35 L8.85 23.2 L10.75 24.05 L12.45 25.1 L14.1 26.25 L15.65 27.5 L17.05 28.9 L18.35 30.4 L19.55 32 L20.65 33.7 L21.6 35.5 L16 37.65 L15.55 36.05 L14.95 34.55 L14.3 33.05 L13.55 31.55 L12.65 30.1 L11.65 28.7 L10.55 27.25 L9.35 25.85 L8.05 24.45 L6.55 23.1 Z M21.6 35.5 L21.5 37.8 L19.85 39.4 L17.6 39.3 L16 37.65 Z","bounds":[6.55,22.35,21.6,39.4],"direction":"curve","weight":20.233142,"revealPath":"M6.355 22.5 Q15.535 28 19.36 38","revealWidth":14}],[{"outline":"M39.65 21.4 L37.4 24.95 L35.1 28.5 L32.7 32 L30.3 35.45 L27.85 38.85 L25.3 42.25 L22.7 45.6 L20.05 48.9 L17.25 52.1 L14.35 55.25 L13.6 54.7 L15.7 51 L17.85 47.35 L20 43.75 L22.15 40.15 L24.3 36.55 L26.4 32.95 L28.45 29.3 L30.5 25.7 L32.5 22.05 L34.45 18.4 Z M34.2 18.85 L34.75 17.95 L39.65 21.4 Z M39.65 21.4 L40.45 23.05 L37.55 23.05 Z","bounds":[13.6,17.95,40.45,55.25],"direction":"curve","weight":42.481238,"revealPath":"M37.3375 19.5 Q26.6275 38 14.005 55","revealWidth":14},{"outline":"M7.2 53.45 L10.3 53.2 L13.35 52.9 L16.4 52.6 L19.4 52.25 L22.4 51.9 L25.35 51.5 L28.3 51.1 L31.25 50.7 L34.2 50.35 L37.2 50.05 L37.45 50.9 L34.7 52.15 L31.9 53.3 L29.05 54.3 L26.15 55.2 L23.2 56.05 L20.25 56.8 L17.2 57.55 L14.15 58.2 L11.1 58.8 L7.95 59.4 Z M7.95 59.4 L6.25 53.55 L7.2 53.45 Z M7.95 59.4 L10.75 57.55 L9.15 60.75 Z","bounds":[6.25,50.05,37.45,60.75],"direction":"curve","weight":30.807423,"revealPath":"M7.12 56.5 Q23.185 54.5 37.3375 50.5","revealWidth":14}],[{"outline":"M29.95 38.95 L31.55 40.05 L33.1 41.2 L34.55 42.45 L35.95 43.9 L37.2 45.45 L38.35 47.1 L39.45 48.85 L40.45 50.75 L41.35 52.7 L42.1 54.75 L36.3 56.3 L35.95 54.4 L35.55 52.6 L35 50.85 L34.45 49.1 L33.8 47.45 L33.05 45.85 L32.25 44.25 L31.4 42.7 L30.45 41.1 L29.35 39.65 Z M42.1 54.75 L41.8 57 L40 58.4 L37.75 58.1 L36.3 56.3 Z","bounds":[29.35,38.95,42.1,58.4],"direction":"curve","weight":20.752283,"revealPath":"M29.305 39 Q36.5725 45.5 39.6325 57","revealWidth":14}],[{"outline":"M27.7 53.5 L27.7 91.5 L21.7 94.5 L21.7 53.5 Z","bounds":[21.7,53.5,27.7,94.5],"direction":"down","weight":38.5}],[{"outline":"M18.45 64.3 L17.9 67.1 L17.25 69.85 L16.45 72.6 L15.5 75.3 L14.45 77.95 L13.2 80.5 L11.85 83.05 L10.35 85.55 L8.65 87.95 L6.7 90.2 L5.95 89.75 L6.95 87 L7.95 84.35 L8.85 81.7 L9.7 79.1 L10.45 76.5 L11.05 73.95 L11.6 71.35 L12 68.8 L12.3 66.2 L12.45 63.65 Z M12.4 64.15 L12.6 62.6 L18.45 64.3 Z M18.45 64.3 L19.8 65.45 L17.15 66.65 Z","bounds":[5.95,62.6,19.8,90.2],"direction":"curve","weight":28.045007,"revealPath":"M15.535 63.5 Q14.005 77.5 6.355 90","revealWidth":14}],[{"outline":"M30.35 61 L31.85 62.2 L33.4 63.45 L34.8 64.9 L36.1 66.45 L37.3 68.15 L38.4 70 L39.4 71.95 L40.3 74 L41.15 76.15 L41.85 78.4 L36 79.65 L35.65 77.55 L35.3 75.55 L34.85 73.65 L34.3 71.75 L33.7 69.95 L33.05 68.25 L32.3 66.55 L31.55 64.85 L30.7 63.2 L29.7 61.65 Z M41.85 78.4 L41.4 80.6 L39.55 81.95 L37.3 81.5 L36 79.65 Z","bounds":[29.7,61,41.85,81.95],"direction":"curve","weight":21.718458,"revealPath":"M29.6875 61 Q36.5725 68 39.25 80.5","revealWidth":14}],[{"outline":"M52.6 14 L52.6 56 L46.6 59 L46.6 11 Z","bounds":[46.6,11,52.6,59],"direction":"down","weight":34}],[{"outline":"M49.6 14 L86.15 14 L86.15 16 L49.6 16 Z M89.15 15 L89.15 52 L83.15 55 L83.15 15 Z M83.15 14 L86.15 11.5 L91.65 16 L89.15 18 L83.15 15 Z","bounds":[49.6,11.5,91.65,55],"direction":"curve","weight":70.5625,"revealPath":"M49.625 15 L86.1875 15 L86.1875 49","revealWidth":14}],[{"outline":"M49.6 31 L86.15 31 L86.15 33 L49.6 33 Z","bounds":[49.6,31,86.15,33],"direction":"right","weight":36.5625}],[{"outline":"M70.6 14 L70.6 50 L64.6 50 L64.6 14 Z","bounds":[64.6,14,70.6,50],"direction":"down","weight":34}],[{"outline":"M49.6 48 L86.15 48 L86.15 50 L49.6 50 Z","bounds":[49.6,48,86.15,50],"direction":"right","weight":36.5625}],[{"outline":"M48.4 64.95 L49.05 67.95 L49.55 70.8 L49.85 73.5 L49.9 76.1 L49.8 78.6 L49.45 80.9 L48.95 83.1 L48.2 85.15 L47.25 87.1 L46.1 88.85 L41.6 84.85 L42.6 83.9 L43.5 82.7 L44.35 81.3 L45.1 79.7 L45.75 77.8 L46.3 75.7 L46.7 73.4 L47.05 70.8 L47.35 68.05 L47.5 65 Z M46.1 88.85 L44 89.85 L41.85 89.1 L40.9 87 L41.6 84.85 Z","bounds":[40.9,64.95,49.9,89.85],"direction":"curve","weight":24.039112,"revealPath":"M47.9375 64.5 Q49.625 80.5 42.875 88","revealWidth":14}],[{"outline":"M61.6 63 L61.6 85.5 L55.6 85.5 L55.6 62 Z M61.6 63 L63.1 64 L60.6 65.5 Z M55.6 85.5 L61.6 85.5 L60.4 87.3 L58.6 88.5 L56.8 87.3 Z M61.6 85.5 L61.65 86.1 L61.7 86.55 L61.8 86.85 L61.9 87 L61.95 87.1 L62.05 87.2 L62.25 87.25 L62.55 87.35 L63 87.45 L63.6 87.5 L63.6 93.5 L62.3 93.4 L61.05 93.2 L59.85 92.8 L58.75 92.15 L57.75 91.35 L56.9 90.35 L56.3 89.2 L55.9 88 L55.65 86.75 L55.6 85.5 Z M63.6 87.5 L65.7 88.4 L66.6 90.5 L65.7 92.6 L63.6 93.5 Z M63.6 87.5 L82.25 87.5 L82.25 93.5 L63.6 93.5 Z M82.25 87.5 L84.05 88.7 L85.25 90.5 L84.05 92.3 L82.25 93.5 Z","bounds":[55.6,62,85.25,93.5],"direction":"curve","weight":48.696068,"revealPath":"M58.625 62.5 L58.625 85.5 Q58.625 90.5 63.625 90.5 L82.25 90.5","revealWidth":14},{"outline":"M82.25 87.5 L79.25 87.5 L82.25 75 L83.25 75 Z","bounds":[79.25,75,83.25,87.5],"direction":"up","weight":12.5}],[{"outline":"M60.95 54.3 L63.1 55.15 L65.15 55.95 L67.1 56.85 L68.9 57.9 L70.55 59 L72.1 60.2 L73.55 61.45 L74.85 62.85 L76 64.3 L77 65.85 L71.55 68.35 L71.1 67.1 L70.55 65.85 L69.8 64.55 L68.95 63.2 L67.9 61.9 L66.75 60.55 L65.4 59.2 L63.95 57.85 L62.35 56.4 L60.55 55.1 Z M77 65.85 L77.05 68.15 L75.55 69.85 L73.25 69.9 L71.55 68.35 Z","bounds":[60.55,54.3,77.05,69.9],"direction":"curve","weight":20.245756,"revealPath":"M60.3125 54.5 Q71 60 74.9375 68.5","revealWidth":14}],[{"outline":"M81.2 60.55 L83.2 62.1 L85.05 63.8 L86.75 65.55 L88.3 67.4 L89.7 69.35 L90.9 71.35 L92.05 73.4 L93 75.55 L93.8 77.7 L94.45 79.95 L88.55 81.05 L88.3 79.1 L87.9 77.15 L87.4 75.2 L86.8 73.25 L86.05 71.3 L85.2 69.35 L84.2 67.35 L83.1 65.3 L81.9 63.25 L80.55 61.15 Z M94.45 79.95 L93.95 82.2 L92.05 83.45 L89.85 82.95 L88.55 81.05 Z","bounds":[80.55,60.55,94.45,83.45],"direction":"curve","weight":24.265459,"revealPath":"M80.5625 60.5 Q89.5625 70 91.8125 82","revealWidth":14}]] as HanjaOutlineStrokes
const TARGETS = [{"pen":1,"mask":1,"syntax":"M Q"},{"pen":1,"mask":2,"syntax":"M Q"},{"pen":2,"mask":1,"syntax":"M Q"},{"pen":2,"mask":2,"syntax":"M Q"},{"pen":3,"mask":1,"syntax":"M Q"},{"pen":5,"mask":1,"syntax":"M Q"},{"pen":6,"mask":1,"syntax":"M Q"},{"pen":8,"mask":1,"syntax":"M L L"},{"pen":12,"mask":1,"syntax":"M Q"},{"pen":13,"mask":1,"syntax":"M L Q L"},{"pen":14,"mask":1,"syntax":"M Q"},{"pen":15,"mask":1,"syntax":"M Q"}] as const
const Q_SPECS = [{pen:1,mask:1,raw:0,path:"M26.245 8 Q20.89 18.5 14.3875 28",T:[1n,3n],K:[1n,150n]},{pen:1,mask:2,raw:1,path:"M6.355 22.5 Q15.535 28 19.36 38",T:[2n,5n],K:[1n,25n]},{pen:2,mask:1,raw:2,path:"M37.3375 19.5 Q26.6275 38 14.005 55",T:[1n,6n],K:[1n,250n]},{pen:2,mask:2,raw:3,path:"M7.12 56.5 Q23.185 54.5 37.3375 50.5",T:[1n,4n],K:[1n,200n]},{pen:3,mask:1,raw:4,path:"M29.305 39 Q36.5725 45.5 39.6325 57",T:[2n,5n],K:[1n,25n]},{pen:5,mask:1,raw:6,path:"M15.535 63.5 Q14.005 77.5 6.355 90",T:[1n,4n],K:[1n,50n]},{pen:6,mask:1,raw:7,path:"M29.6875 61 Q36.5725 68 39.25 80.5",T:[2n,5n],K:[1n,25n]},{pen:12,mask:1,raw:14,path:"M47.9375 64.5 Q49.625 80.5 42.875 88",T:[1n,4n],K:[1n,40n]},{pen:14,mask:1,raw:16,path:"M60.3125 54.5 Q71 60 74.9375 68.5",T:[1n,3n],K:[1n,32n]},{pen:15,mask:1,raw:17,path:"M80.5625 60.5 Q89.5625 70 91.8125 82",T:[1n,3n],K:[1n,40n]}] as const
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&a.bounds.every((v,i)=>Object.is(v,b.bounds[i])):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k]))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&strokes.every((m,p)=>Array.isArray(m)&&m.length===FIXED_STROKES[p].length&&m.every((s,i)=>sameSegment(s,FIXED_STROKES[p][i])))}
export type ReviewedSiContext=Readonly<{id:'u7de6-order9'}>
export type ReviewedSiCertificate=Readonly<{syntax:string;initialArcMax:7;firstLine?:number;parameterBound?:number;curvatureBound:number;exactDecimalRational:boolean;notRasterProof:true}>
export type ReviewedSiPolicy=Readonly<{id:string;kind:'growing-si-caps';segment:HanjaOutlineSegment;certificate:ReviewedSiCertificate}>
const CONTEXT:ReviewedSiContext=Object.freeze({id:'u7de6-order9'})
type Rat={n:bigint;d:bigint}
const R=(n:bigint|number,d:bigint|number=1n):Rat=>({n:BigInt(n),d:BigInt(d)})
const dec=(v:string):Rat=>{const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:Rat,b:Rat):Rat=>R(a.n*b.d+b.n*a.d,a.d*b.d),sub=(a:Rat,b:Rat):Rat=>add(a,R(-b.n,b.d)),mul=(a:Rat,b:Rat):Rat=>R(a.n*b.n,a.d*b.d),gt=(a:Rat,b:Rat)=>a.n*b.d>b.n*a.d
const div=(a:Rat,b:Rat):Rat=>{ensure(b.n!==0n,'rational division by zero');return b.n<0n?R(-a.n*b.d,-a.d*b.n):R(a.n*b.d,a.d*b.n)}
const dot=(a:Rat[],b:Rat[])=>add(mul(a[0],b[0]),mul(a[1],b[1]))
function parsed(s:HanjaOutlineSegment){
  ensure(typeof s.revealPath==='string'&&s.revealWidth===14,'exact original guide/width')
  const tokens=s.revealPath.split(' '),values:number[]=[],commands:Array<{op:string;args:number[]}>=[]
  for(let i=0;i<tokens.length;){const first=tokens[i++],op=first[0],arity=op==='Q'?4:op==='M'||op==='L'?2:0;ensure(arity>0&&first.length>1,'canonical M/L/Q only');const raw=[first.slice(1),...tokens.slice(i,i+arity-1)];i+=arity-1;ensure(raw.length===arity&&raw.every(v=>Number.isFinite(Number(v))&&String(Number(v))===v),'canonical finite arity');const args=raw.map(Number);values.push(...args);commands.push({op,args})}
  const syntax=commands.map(c=>c.op).join(' ');ensure(['M Q','M L L','M L Q L'].includes(syntax),'exact source command sequence');return{syntax,commands,values}
}
function certificate(pen:number,mask:number,s:HanjaOutlineSegment):ReviewedSiCertificate{
 const parse=parsed(s)
 if(pen===8||pen===13){
  const [m,line,...rest]=parse.commands,q0=m.args,a=line.args,v=[a[0]-q0[0],a[1]-q0[1]],firstL=Math.hypot(...v)
  ensure(firstL>=7,'cap growth inside first L')
  if(pen===8){const b=rest[0].args,w=[b[0]-a[0],b[1]-a[1]];ensure(parse.syntax==='M L L'&&firstL===36.5625&&v[0]===36.5625&&v[1]===0&&w[0]===0&&w[1]===34,'exact MLL certificate')}
  else{const c=rest[0].args.slice(0,2),b=rest[0].args.slice(2),end=rest[1].args,u=[c[0]-a[0],c[1]-a[1]],z=[b[0]-c[0],b[1]-c[1]],w=[end[0]-b[0],end[1]-b[1]],aligned=(x:number[],y:number[])=>x[0]*y[1]-x[1]*y[0]===0&&x[0]*y[0]+x[1]*y[1]>0;ensure(parse.syntax==='M L Q L'&&firstL===23&&aligned(v,u)&&aligned(z,w)&&Math.hypot(...u)>0&&Math.hypot(...z)>0&&u[0]*z[0]+u[1]*z[1]>=0,'exact regular G1 MLQL certificate')}
  return Object.freeze({syntax:parse.syntax,initialArcMax:7,firstLine:firstL,curvatureBound:0,exactDecimalRational:true,notRasterProof:true})
 }
 const spec=Q_SPECS.find(v=>v.pen===pen&&v.mask===mask);ensure(spec&&parse.syntax==='M Q'&&s.revealPath===spec.path,'exact ten Q certificate allowlist')
 const tokens=s.revealPath.split(' '),n=[tokens[0].slice(1),tokens[1],tokens[2].slice(1),tokens[3],tokens[4],tokens[5]].map(dec),P0=n.slice(0,2),P1=n.slice(2,4),P2=n.slice(4),A=P1.map((v,i)=>sub(v,P0[i])),B=P0.map((v,i)=>add(sub(v,mul(R(2),P1[i])),P2[i])),T=R(spec.T[0],spec.T[1]),K=R(spec.K[0],spec.K[1]),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B)
 ensure(gt(bb,R(0)),'fixed nonzero Q second derivative')
 const normAt=(t:Rat)=>add(add(aa,mul(mul(R(2),ab),t)),mul(bb,mul(t,t))),star=div(R(-ab.n,ab.d),bb),minimumT=gt(star,R(0))&&gt(T,star)?star:(gt(normAt(T),aa)?R(0):T),lambda=normAt(minimumT),delta=A.map((v,i)=>add(mul(mul(R(2),T),v),mul(mul(T,T),B[i]))),cross=sub(mul(A[0],B[1]),mul(A[1],B[0])),kr=mul(R(7),K),den=mul(R(4),mul(mul(lambda,lambda),lambda))
 ensure(gt(lambda,R(0))&&gt(dot(delta,delta),R(49)),'initial Q regularity and arc7')
 ensure(gt(mul(mul(K,K),den),mul(cross,cross)),'exact Q curvature bound')
 ensure(gt(sub(R(1),mul(R(1,2),mul(kr,kr))),kr),'initial-offset injectivity lower bound')
 return Object.freeze({syntax:parse.syntax,initialArcMax:7,parameterBound:Number(spec.T[0])/Number(spec.T[1]),curvatureBound:Number(spec.K[0])/Number(spec.K[1]),exactDecimalRational:true,notRasterProof:true})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u7de6-'+t.pen+'-'+t.mask,kind:'growing-si-caps' as const,segment,certificate:certificate(t.pen,t.mask,segment)})})
export function reviewedSiContext(strokes:HanjaOutlineStrokes):ReviewedSiContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedSiPolicy(context:ReviewedSiContext|null,pen:number,mask:number):ReviewedSiPolicy|null {if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedSiPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 緦 policy/segment required');const parse=parsed(segment),q0=parse.commands[0].args;return{q0:[q0[0],q0[1]],r:7,minimumLength:policy.certificate.firstLine??7}}
export type ReviewedSiFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>

export type ReviewedSiNodes = {measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

/** 緦 전용: 같은 document/owner와 최초 부모 트리를 UA 읽기 전후에 고정한다. */
function siCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 緦 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 緦 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 緦 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 緦 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 緦 SVG coordinate tree')
  }
  return()=>{
    if(owner.ownerDocument!==document||document.defaultView!==view||view.document!==document)return false
    for(const[node,parent]of parents){
      if(!node.isConnected||node.ownerDocument!==document||node.parentElement!==parent||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.getAttribute('transform')!==null)return false
      const style=view.getComputedStyle(node)
      if(style.transform!=='none'||['translate','rotate','scale'].some(key=>{const value=style.getPropertyValue(key);return value!==''&&value!=='none'}))return false
    }
    return true
  }
}
/** L과 endpoint는 pathLength 없는 동일 connected 원 path에서 같은 frame에 읽는다. */
export function measureReviewedSiCapsFrame(policy:ReviewedSiPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedSiFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 緦 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 緦 measurement parent required')
  const coordinates=siCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-si-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 緦 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 緦 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 緦 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('緦 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedSiCaps(policy:ReviewedSiPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedSiNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 緦 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 緦 SVG binding tree')
    const coordinates=siCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-si-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-si-measure'&&guide.getAttribute('id')===clipId+'-si-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-si-growing)'
    if(!bound())throw new Error('Mismatched 緦 SVG binding')
    const frame=measureReviewedSiCapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('緦 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('緦 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
