import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 조건부 준비: 전체 native/실제 component/runtime 승인을 뜻하지 않는다.
 * 邁 원VS3 body3 17p22m40·17m1 Q/17m2 Bezier(C)의 두 source-specific 인증만 허용한다. */
const FIXED_STROKES=[[{"outline":"M31.7 13.2 L60.25 13.2 L60.25 15.2 L31.7 15.2 Z M60.25 13.2 L52.25 14.2 L56.25 9.7 Z","bounds":[31.7,9.7,60.25,15.2],"direction":"right","weight":28.5525}],[{"outline":"M51.65 6.7 L51.65 20.4 L45.65 23.4 L45.65 5.7 Z M51.65 6.7 L53.15 7.7 L50.65 9.2 Z","bounds":[45.65,5.7,53.15,23.4],"direction":"down","weight":15.6933}],[{"outline":"M65.2 13.2 L93.75 13.2 L93.75 15.2 L65.2 15.2 Z M93.75 13.2 L81.75 14.2 L87.75 8.2 Z","bounds":[65.2,8.2,93.75,15.2],"direction":"right","weight":28.5525}],[{"outline":"M79.85 6.7 L79.85 20.4 L73.85 23.4 L73.85 5.7 Z M79.85 6.7 L81.35 7.7 L78.85 9.2 Z","bounds":[73.85,5.7,81.35,23.4],"direction":"down","weight":15.6933}],[{"outline":"M46.35 27.5 L46.35 47.35 L40.35 50.35 L40.35 24.5 Z","bounds":[40.35,24.5,46.35,50.35],"direction":"down","weight":17.8752}],[{"outline":"M43.35 27.5 L82.45 27.5 L82.45 29.5 L43.35 29.5 Z","bounds":[43.35,27.5,82.45,29.5],"direction":"right","weight":39.1275},{"outline":"M85.45 28.5 L85.45 47.35 L79.45 50.35 L79.45 28.5 Z M79.45 27.5 L82.45 25 L87.95 29.5 L85.45 31.5 L79.45 28.5 Z","bounds":[79.45,25,87.95,50.35],"direction":"down","weight":17.8752}],[{"outline":"M43.35 36.1 L82.45 36.1 L82.45 38.1 L43.35 38.1 Z","bounds":[43.35,36.1,82.45,38.1],"direction":"right","weight":39.1275}],[{"outline":"M43.35 45.35 L82.45 45.35 L82.45 47.35 L43.35 47.35 Z","bounds":[43.35,45.35,82.45,47.35],"direction":"right","weight":39.1275}],[{"outline":"M42.45 50.7 L42.45 77.75 L36.45 80.75 L36.45 49.7 Z M42.45 50.7 L43.95 51.7 L41.45 53.2 Z","bounds":[36.45,49.7,43.95,80.75],"direction":"down","weight":29.0472}],[{"outline":"M32.05 54.65 L87.4 54.65 L87.4 56.65 L32.05 56.65 Z","bounds":[32.05,54.65,87.4,56.65],"direction":"right","weight":55.3425},{"outline":"M90.4 55.65 L90.4 72.65 L84.4 72.65 L84.4 55.65 Z M84.4 54.65 L87.4 52.15 L92.9 56.65 L90.4 58.65 L84.4 55.65 Z M84.4 72.65 L90.4 72.65 L89.2 74.45 L87.4 75.65 L85.6 74.45 Z","bounds":[84.4,52.15,92.9,75.65],"direction":"down","weight":17.0248},{"outline":"M90.4 72.65 L90.35 73.95 L90.1 75.2 L89.7 76.4 L89.1 77.5 L88.25 78.5 L87.25 79.35 L86.15 79.95 L84.95 80.35 L83.7 80.6 L82.4 80.65 L82.4 74.65 L83 74.6 L83.45 74.55 L83.75 74.45 L83.95 74.35 L84.05 74.3 L84.1 74.2 L84.2 74 L84.3 73.7 L84.35 73.25 L84.4 72.65 Z M82.4 77.65 L73.4 76.15 L73.4 74.65 L82.4 74.65 Z","bounds":[73.4,72.65,90.4,80.65],"direction":"curve","weight":7.071068,"revealPath":"M87.425 72.6752 Q87.425 77.6752 82.425 77.6752","revealWidth":14}],[{"outline":"M65.75 27.5 L65.75 67.8 L59.75 67.8 L59.75 27.5 Z","bounds":[59.75,27.5,65.75,67.8],"direction":"down","weight":38.304}],[{"outline":"M46.25 66.3 L49.6 66.05 L52.85 65.75 L56 65.45 L59.15 65.2 L62.15 64.95 L65.15 64.65 L68.05 64.45 L70.85 64.25 L73.65 64.15 L76.4 64.1 L76.55 65 L74 66 L71.35 66.9 L68.6 67.7 L65.75 68.4 L62.85 69.1 L59.85 69.8 L56.75 70.45 L53.6 71.05 L50.35 71.65 L47.05 72.25 Z M47.05 72.25 L45.3 66.45 L46.25 66.3 Z M47.05 72.25 L49.8 70.4 L48.2 73.6 Z","bounds":[45.3,64.1,76.55,73.6],"direction":"curve","weight":30.690783,"revealPath":"M46.1825 69.376 Q63.455 67.14160000000001 76.4975 64.588","revealWidth":14}],[{"outline":"M72.9 58.2 L74.2 59.15 L75.55 60 L76.75 60.95 L77.9 61.9 L78.95 62.95 L79.85 64.05 L80.7 65.15 L81.45 66.35 L82.1 67.6 L82.65 68.9 L76.75 70.05 L76.75 69.15 L76.65 68.15 L76.45 67.15 L76.2 66.1 L75.8 64.95 L75.35 63.8 L74.75 62.6 L74.1 61.35 L73.35 60.05 L72.3 58.85 Z M82.65 68.9 L82.15 71.1 L80.3 72.4 L78.05 71.95 L76.75 70.05 Z","bounds":[72.3,58.2,82.65,72.4],"direction":"curve","weight":14.938603,"revealPath":"M72.2675 58.20399999999999 Q78.6125 63.949600000000004 80.02250000000001 70.972","revealWidth":14}],[{"outline":"M14.1 10.3 L16.05 10.9 L17.95 11.55 L19.75 12.3 L21.5 13.1 L23.2 14.05 L24.8 15.1 L26.35 16.2 L27.8 17.35 L29.15 18.65 L30.5 20 L25.7 23.6 L24.85 22.25 L23.95 20.95 L23 19.65 L21.95 18.4 L20.8 17.15 L19.55 15.9 L18.25 14.7 L16.85 13.45 L15.35 12.2 L13.75 11.1 Z M30.5 20 L31 22.2 L29.9 24.2 L27.65 24.7 L25.7 23.6 Z","bounds":[13.75,10.3,31,24.7],"direction":"curve","weight":19.912308,"revealPath":"M13.5 10.5 Q23 15 29 23","revealWidth":14}],[{"outline":"M8.6 28.25 L10.55 28.8 L12.45 29.3 L14.3 30 L16.1 30.75 L17.85 31.65 L19.55 32.6 L21.2 33.65 L22.75 34.8 L24.3 36.05 L25.75 37.35 L21.25 41.3 L20.25 39.95 L19.15 38.6 L18.05 37.35 L16.85 36.1 L15.6 34.85 L14.25 33.65 L12.85 32.5 L11.4 31.3 L9.9 30.15 L8.25 29.1 Z M25.75 37.35 L26.45 39.55 L25.45 41.6 L23.3 42.3 L21.25 41.3 Z","bounds":[8.25,28.25,26.45,42.3],"direction":"curve","weight":20.402206,"revealPath":"M8 28.5 Q17.5 32.5 24.5 40.5","revealWidth":14}],[{"outline":"M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z","bounds":[7,52.5,25,54.5],"direction":"right","weight":18},{"outline":"M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z","bounds":[22,50,30.5,80.5],"direction":"down","weight":25.5}],[{"outline":"M6.9 86.65 L8.8 85.7 L10.7 84.8 L12.65 83.8 L14.6 82.8 L16.6 81.8 L18.6 80.75 L20.7 79.7 L22.8 78.65 L25 77.65 L27.2 76.6 L27.75 77.35 L26 79.05 L24.2 80.75 L22.45 82.3 L20.65 83.85 L18.85 85.3 L17.05 86.65 L15.25 88 L13.45 89.35 L11.65 90.6 L9.9 91.8 Z M9.9 91.8 L6.05 87.15 L6.9 86.65 Z M9.9 91.8 L11.75 89 L11.55 92.6 Z","bounds":[6.05,76.6,27.75,92.6],"direction":"curve","weight":23.16247,"revealPath":"M8 89.5 Q17.5 84 27.5 77","revealWidth":14},{"outline":"M27.15 76.1 L29.75 78.4 L32.45 80.35 L35.4 82.05 L39 83.4 L43.55 84.5 L49.3 85.3 L56.5 85.8 L65.45 85.95 L76.3 85.75 L89.35 85.2 L89.6 91.75 L76.45 92 L65.35 91.85 L56.15 91.3 L48.6 90.4 L42.5 89.05 L37.55 87.3 L33.6 85.15 L30.55 82.65 L28.2 79.8 L26.4 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z","bounds":[26.4,76.1,95,92],"direction":"curve","weight":64.228109,"revealPath":"M26.5 76 C34 86 42 90.5 89.5 88.5","revealWidth":14}]] as unknown as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU9081Context=Readonly<{id:'u9081-qb17'}>
export type ReviewedU9081Certificate=Readonly<{syntax:string;kind:string;initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;halfSpeedSquaredLower?:string;ab?:string;bb?:string;cross?:string;derivativeXLower?:string;derivativeYLower?:string;speedSquaredLower?:string;secondDerivativeNormSquaredUpper?:string;chordSquared?:string;initialInjectivity?:string}>
export type ReviewedU9081Policy=Readonly<{id:string;kind:'growing-u9081-caps';segment:HanjaOutlineSegment;certificate:ReviewedU9081Certificate}>
const CONTEXT:ReviewedU9081Context=Object.freeze({id:'u9081-qb17'})
type Rat=Readonly<{n:bigint;d:bigint}>
type QCPoint=readonly Rat[]
type U9081Spec=Readonly<{pen:number;mask:number;path:string;kind:string}>
const TARGETS:readonly U9081Spec[]=Object.freeze([{"pen":17,"mask":1,"path":"M8 89.5 Q17.5 84 27.5 77","kind":"Q"},{"pen":17,"mask":2,"path":"M26.5 76 C34 86 42 90.5 89.5 88.5","kind":"C"}].map(t=>Object.freeze(t)))
const R=(n:bigint|number,d:bigint|number=1n):Rat=>({n:BigInt(n),d:BigInt(d)})
const dec=(v:string):Rat=>{const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const add=(a:Rat,b:Rat):Rat=>R(a.n*b.d+b.n*a.d,a.d*b.d),sub=(a:Rat,b:Rat):Rat=>add(a,R(-b.n,b.d)),mul=(a:Rat,b:Rat):Rat=>R(a.n*b.n,a.d*b.d),gt=(a:Rat,b:Rat)=>a.n*b.d>b.n*a.d
const dot=(a:QCPoint,b:QCPoint):Rat=>add(mul(a[0],b[0]),mul(a[1],b[1]))
function parsed(s:HanjaOutlineSegment){
 ensure(typeof s.revealPath==='string'&&s.revealWidth===14,'exact original QC guide/width')
 const tokens=s.revealPath.split(' '),commands:Array<{op:string;args:number[];raw:string[]}>=[]
 for(let i=0;i<tokens.length;){const first=tokens[i++],op=first[0],arity=op==='M'?2:op==='Q'?4:op==='C'?6:0;ensure(arity&&first.length>1,'canonical M/Q/C only');const raw=[first.slice(1),...tokens.slice(i,i+arity-1)];i+=arity-1;ensure(raw.length===arity&&raw.every(v=>Number.isFinite(Number(v))&&String(Number(v))===v),'canonical finite arity');commands.push({op,args:raw.map(Number),raw})}
 const syntax=commands.map(c=>c.op).join(' ');ensure(['M Q','M C'].includes(syntax),'exact single Q or single C only');return{syntax,commands}
}
function certificate(spec:U9081Spec,s:HanjaOutlineSegment):ReviewedU9081Certificate{
 const p=parsed(s);ensure(TARGETS.includes(spec)&&spec.path===s.revealPath&&s.direction==='curve','exact QB17 allowlist');const raw=p.commands.flatMap(c=>c.raw),v=raw.map(dec),P=Array.from({length:v.length/2},(_,i)=>v.slice(2*i,2*i+2)),r=R(7),fortyNine=R(49);
 let T:Rat,K:Rat,details:Record<string,string|number>;
 if(spec.kind==='Q'){
  ensure(p.syntax==='M Q'&&P.length===3,'single source Q');T=R(1,3);K=R(1,100);
  const A=P[1].map((x,i)=>sub(x,P[0][i])),B=P[0].map((x,i)=>add(sub(x,mul(R(2),P[1][i])),P[2][i])),aa=dot(A,A),ab=dot(A,B),bb=dot(B,B),cross=sub(mul(A[0],B[1]),mul(A[1],B[0])),delta=A.map((x,i)=>add(mul(mul(R(2),T),x),mul(mul(T,T),B[i])));
  ensure(gt(A[0],R(0))&&gt(R(0),A[1])&&gt(B[0],R(0))&&gt(R(0),B[1]),'own Q x increases and y decreases');ensure(sub(aa,R(241,2)).n===0n&&sub(ab,R(13)).n===0n&&sub(bb,R(5,2)).n===0n&&sub(cross,R(-23,2)).n===0n,'own Q exact derivative coefficients');ensure(gt(ab,R(0))&&gt(bb,R(0)),'Q minimum half-speed at t0');ensure(gt(dot(delta,delta),fortyNine)&&sub(dot(delta,delta),R(8993,162)).n===0n,'Q chord beyond arc7');ensure(gt(mul(mul(K,K),mul(R(4),mul(mul(aa,aa),aa))),mul(cross,cross)),'own Q curvature less1/100');
  details={halfSpeedSquaredLower:'241/2',ab:'13',bb:'5/2',cross:'-23/2',chordSquared:'8993/162',initialInjectivity:'x strictly increases and y strictly decreases'};
 }else{
  ensure(spec.kind==='C'&&p.syntax==='M C'&&P.length===4,'single source cubic C');T=R(1,4);K=R(1,13);
  const V=[0,1,2].map(i=>P[i+1].map((x,j)=>sub(x,P[i][j]))),D0=V[1].map((x,i)=>sub(x,V[0][i])),D1=V[2].map((x,i)=>sub(x,V[1][i])),oneMinus=sub(R(1),T),xLower=mul(R(3),V[0][0]),yLower=mul(R(3),add(add(mul(mul(oneMinus,oneMinus),V[0][1]),mul(mul(mul(R(2),T),oneMinus),V[1][1])),mul(mul(T,T),V[2][1]))),speed2=add(mul(xLower,xLower),mul(yLower,yLower)),secondAt=D0.map((x,i)=>mul(R(6),add(mul(oneMinus,x),mul(T,D1[i])))),M2=dot(secondAt,secondAt),delta=V[0].map((x,i)=>add(add(mul(mul(R(3),T),x),mul(mul(R(3),mul(T,T)),D0[i])),mul(mul(mul(T,T),T),sub(D1[i],D0[i]))));
  ensure(V.every(x=>gt(x[0],R(0)))&&gt(V[1][0],V[0][0])&&gt(V[2][0],V[1][0]),'own C positive increasing x derivative controls');ensure(gt(V[0][1],V[1][1])&&gt(V[1][1],V[2][1]),'own C y derivative decreases through T');ensure(gt(D0[0],R(0))&&gt(D1[0],D0[0])&&gt(R(0),D0[1])&&gt(D0[1],D1[1]),'own C second derivative absolute components largest at T');ensure(gt(yLower,R(0))&&sub(xLower,R(45,2)).n===0n&&sub(yLower,R(345,16)).n===0n&&sub(speed2,R(248625,256)).n===0n,'own C exact combined derivative lower');ensure(sub(M2,R(9945,2)).n===0n,'own C exact second derivative bound');ensure(gt(dot(delta,delta),fortyNine)&&sub(dot(delta,delta),R(167297,2048)).n===0n,'C chord beyond arc7');ensure(gt(mul(mul(K,K),mul(speed2,speed2)),M2),'own C curvature less1/13');
  details={derivativeXLower:'45/2',derivativeYLower:'345/16',speedSquaredLower:'248625/256',secondDerivativeNormSquaredUpper:'9945/2',chordSquared:'167297/2048',initialInjectivity:'x derivative strictly positive globally; initial y derivative positive'};
 }
 const kr=mul(r,K);ensure(gt(sub(R(1),mul(R(1,2),mul(kr,kr))),kr),'own initial arc7 normal-strip bound');return Object.freeze({syntax:p.syntax,kind:spec.kind==='Q'?'source-specific-Q':'source-specific-C',initialArcMax:7,parameterBound:spec.kind==='Q'?1/3:.25,curvatureBound:spec.kind==='Q'?1/100:1/13,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,...details});
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u9081-'+t.pen+'-'+t.mask,kind:'growing-u9081-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU9081Context(strokes:HanjaOutlineStrokes):ReviewedU9081Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU9081Policy(context:ReviewedU9081Context|null,pen:number,mask:number):ReviewedU9081Policy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU9081Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 邁 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two QC target guide required');const start=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) [QC]/.exec(spec.path);ensure(start,'fixed original M decimal spelling');return{q0:[Number(start[1]),Number(start[2])],r:7,minimumLength:7}}
export type ReviewedU9081Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU9081Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function canCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 邁 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 邁 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 邁 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 邁 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 邁 SVG coordinate tree')
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
export function measureReviewedU9081CapsFrame(policy:ReviewedU9081Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU9081Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 邁 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 邁 measurement parent required')
  const coordinates=canCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u9081-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 邁 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 邁 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 邁 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('邁 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 QC commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU9081Caps(policy:ReviewedU9081Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU9081Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 邁 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 邁 SVG binding tree')
    const coordinates=canCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u9081-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u9081-measure'&&guide.getAttribute('id')===clipId+'-u9081-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u9081-growing)'
    if(!bound())throw new Error('Mismatched 邁 SVG binding')
    const frame=measureReviewedU9081CapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('邁 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('邁 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

