import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 迭 K 전용 격리후보: 실제 full5/id3·원9p10m25를 고정한다.
 * MQ9m1·MC9m2의 고유 초기arc7 유리수 조건만 검증한다. 원gap[-1,-1] 유지.
 * 원P/guide/폭/weight/다른8획 불변; native/실제component/제품/runtime 승인은 false.
 * 다음 실제검토: Q epsilon·C boundary-after→P-minus-original-full-round 각2coverage 우선.
 * local0/epsilon/95/near1/1·rho·globalQB경계·pen9coarse·자연진행은 별도이며 원gap 연결성을 증명하지 않는다. */
const FIXED_STROKES=[[{"outline":"M51.85 13 L51 16.35 L50.05 19.65 L48.95 22.85 L47.7 26 L46.3 29.05 L44.75 32 L43.05 34.85 L41.15 37.65 L39.1 40.25 L36.85 42.75 L36.1 42.2 L37.5 39.25 L38.85 36.3 L40.15 33.35 L41.3 30.4 L42.35 27.4 L43.3 24.4 L44.15 21.35 L44.85 18.25 L45.45 15.15 L45.95 11.95 Z M45.85 12.45 L46.1 11 L51.85 13 Z M51.85 13 L53.15 14.25 L50.4 15.3 Z","bounds":[36.1,11,53.15,42.75],"direction":"curve","weight":32.962099,"revealPath":"M49 12 Q46 29 36.5 42.5","revealWidth":14}],[{"outline":"M44 27 L87.5 27 L87.5 29 L44 29 Z M87.5 27 L75.5 28 L81.5 22 Z","bounds":[44,22,87.5,29],"direction":"right","weight":43.5}],[{"outline":"M35 47 L92 47 L92 49 L35 49 Z M92 47 L80 48 L86 42 Z","bounds":[35,42,92,49],"direction":"right","weight":57}],[{"outline":"M67 10 L67 32 L61 32 L61 9 Z M67 10 L68.5 11 L66 12.5 Z M61 32 L67 32 L65.8 33.8 L64 35 L62.2 33.8 Z M67 32 L66.55 39.45 L65.5 46.35 L63.85 52.7 L61.65 58.5 L58.8 63.7 L55.4 68.25 L51.35 72.2 L46.8 75.5 L41.7 78.05 L36.15 79.9 L35.8 79.05 L40.85 76.35 L45.3 73.25 L49.15 69.8 L52.4 65.9 L55.15 61.5 L57.35 56.65 L59.05 51.3 L60.2 45.4 L60.85 38.95 L61 32 Z","bounds":[35.8,9,68.5,79.9],"direction":"curve","weight":77.638462,"revealPath":"M64 9.5 L64 32 Q64 69.5 36 79.5","revealWidth":14}],[{"outline":"M62.15 55.8 L65.7 57.25 L69.05 58.85 L72.15 60.6 L75.05 62.45 L77.8 64.35 L80.3 66.35 L82.6 68.45 L84.7 70.6 L86.6 72.85 L88.3 75.15 L83.15 78.25 L81.95 76.1 L80.5 73.95 L78.9 71.85 L77.05 69.7 L75 67.55 L72.75 65.45 L70.25 63.3 L67.6 61.1 L64.75 58.9 L61.7 56.6 Z M88.3 75.15 L88.6 77.4 L87.25 79.25 L85 79.55 L83.15 78.25 Z","bounds":[61.7,55.8,88.6,79.55],"direction":"curve","weight":33.301652,"revealPath":"M61.5 56 Q79 65.5 86.5 78","revealWidth":14}],[{"outline":"M14.1 10.3 L16.05 10.9 L17.95 11.55 L19.75 12.3 L21.5 13.1 L23.2 14.05 L24.8 15.1 L26.35 16.2 L27.8 17.35 L29.15 18.65 L30.5 20 L25.7 23.6 L24.85 22.25 L23.95 20.95 L23 19.65 L21.95 18.4 L20.8 17.15 L19.55 15.9 L18.25 14.7 L16.85 13.45 L15.35 12.2 L13.75 11.1 Z M30.5 20 L31 22.2 L29.9 24.2 L27.65 24.7 L25.7 23.6 Z","bounds":[13.75,10.3,31,24.7],"direction":"curve","weight":19.912308,"revealPath":"M13.5 10.5 Q23 15 29 23","revealWidth":14}],[{"outline":"M8.6 28.25 L10.55 28.8 L12.45 29.3 L14.3 30 L16.1 30.75 L17.85 31.65 L19.55 32.6 L21.2 33.65 L22.75 34.8 L24.3 36.05 L25.75 37.35 L21.25 41.3 L20.25 39.95 L19.15 38.6 L18.05 37.35 L16.85 36.1 L15.6 34.85 L14.25 33.65 L12.85 32.5 L11.4 31.3 L9.9 30.15 L8.25 29.1 Z M25.75 37.35 L26.45 39.55 L25.45 41.6 L23.3 42.3 L21.25 41.3 Z","bounds":[8.25,28.25,26.45,42.3],"direction":"curve","weight":20.402206,"revealPath":"M8 28.5 Q17.5 32.5 24.5 40.5","revealWidth":14}],[{"outline":"M7 52.5 L25 52.5 L25 54.5 L7 54.5 Z M28 53.5 L28 77.5 L22 80.5 L22 53.5 Z M22 52.5 L25 50 L30.5 54.5 L28 56.5 L22 53.5 Z","bounds":[7,50,30.5,80.5],"direction":"curve","weight":43.5,"revealPath":"M7 53.5 L25 53.5 L25 79","revealWidth":14}],[{"outline":"M6.9 86.65 L8.8 85.7 L10.7 84.8 L12.65 83.8 L14.6 82.8 L16.6 81.8 L18.6 80.75 L20.7 79.7 L22.8 78.65 L25 77.65 L27.2 76.6 L27.75 77.35 L26 79.05 L24.2 80.75 L22.45 82.3 L20.65 83.85 L18.85 85.3 L17.05 86.65 L15.25 88 L13.45 89.35 L11.65 90.6 L9.9 91.8 Z M9.9 91.8 L6.05 87.15 L6.9 86.65 Z M9.9 91.8 L11.75 89 L11.55 92.6 Z","bounds":[6.05,76.6,27.75,92.6],"direction":"curve","weight":23.16247,"revealPath":"M8 89.5 Q17.5 84 27.5 77","revealWidth":14},{"outline":"M27.15 76.1 L29.75 78.4 L32.45 80.35 L35.4 82.05 L39 83.4 L43.55 84.5 L49.3 85.3 L56.5 85.8 L65.45 85.95 L76.3 85.75 L89.35 85.2 L89.6 91.75 L76.45 92 L65.35 91.85 L56.15 91.3 L48.6 90.4 L42.5 89.05 L37.55 87.3 L33.6 85.15 L30.55 82.65 L28.2 79.8 L26.4 76.65 Z M89.6 91.75 L89.35 85.2 L95 84.95 Z","bounds":[26.4,76.1,95,92],"direction":"curve","weight":64.228109,"revealPath":"M26.5 76 C34 86 42 90.5 89.5 88.5","revealWidth":14}]] as unknown as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function freezeSource(value:unknown):void{if(value&&typeof value==='object'){for(const v of Object.values(value))freezeSource(v);Object.freeze(value)}}
export const REVIEWED_U8FED_SOURCE={"glyph":"迭","selectedRoot":"u8fed-k","sourceFixture":"docs/hanja-source-independent-qb-order-u8fed-k-source-experiment-2026-10-20/fixtures.json","sourceFixtureSHA256":"3f4f33ab30abb1dc8791e43e7b2e36299b56e1a05788e94f06242b31bc5ba793","sourceGeometrySHA256":"2d1d7518d10f00319804e6e2e841f95bee2248e1e4f2c8df8f570ed1ac4e7262","sourceIdentity":{"root":"u8fed-k","file":"../hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-k.json","fileSHA256":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a"},"sourceProof":"docs/hanja-goal-glyphwiki-batch896-2026-10-13/engine-whole-u8fed-k.json","sourceProofSHA256":"682a63e93461ab37a5e167980654f993709b4ff042fd5cc633a6dea31a54327a","fullProofCanonicalSHA256":"298dabd60745b2471ad9885581e4aba054cd6c07f600aa68d596ce5aa43a11a3","counts":{"pens":9,"masks":10,"polygons":25},"targets":[{"pen":9,"mask":1,"syntax":"M Q","T":"1/3","K":"1/100"},{"pen":9,"mask":2,"syntax":"M C","T":"1/4","K":"1/13"}],"rawGap":[-2,-2],"displayGap":[-1,-1],"priorHold":"docs/hanja-source-native-hold-u8fed-k-qb-activation-2026-10-20/hold.json","priorHoldSHA256":"40b075841f09aa3f85a68981722d0e6a474f85077eb76820a207ad21c0e42803","preserveGuideOutlineWidthWeightOrder":true,"newConnector":false,"newTailPartition":0,"newSourceGeometryOperations":0,"arithmeticScope":"자기원guide 초기arc7 정칙·단사·곡률상한만; P교집합 연결성/전체coverage/UA/native 승인 아님","nativeApproval":false,"isolatedActualComponentBrowserVerified":false,"actualAppUI":false,"runtimeApplied":false} as const
freezeSource(REVIEWED_U8FED_SOURCE)
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameJSON(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object')return false
 if(Array.isArray(b)){if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false;return b.every((v,i)=>{const d=Object.getOwnPropertyDescriptor(a,String(i));return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,v)})}
 if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b);return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(a,k);return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,(b as Record<string,unknown>)[k])})
}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){return sameJSON(a,b)}
function sameWhole(strokes:HanjaOutlineStrokes){return sameJSON(strokes,FIXED_STROKES)}

export type ReviewedU8fedContext=Readonly<{id:'u8fed-k-qb9'}>
export type ReviewedU8fedCertificate=Readonly<{syntax:string;kind:string;initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;halfSpeedSquaredLower?:string;ab?:string;bb?:string;cross?:string;derivativeXLower?:string;derivativeYLower?:string;speedSquaredLower?:string;secondDerivativeNormSquaredUpper?:string;chordSquared?:string;initialInjectivity?:string}>
export type ReviewedU8fedPolicy=Readonly<{id:string;kind:'growing-u8fed-caps';segment:HanjaOutlineSegment;certificate:ReviewedU8fedCertificate}>
const CONTEXT:ReviewedU8fedContext=Object.freeze({id:'u8fed-k-qb9'})
type Rat=Readonly<{n:bigint;d:bigint}>
type QCPoint=readonly Rat[]
type U8fedSpec=Readonly<{pen:number;mask:number;path:string;kind:string}>
const TARGETS:readonly U8fedSpec[]=Object.freeze([{"pen":9,"mask":1,"path":"M8 89.5 Q17.5 84 27.5 77","kind":"Q"},{"pen":9,"mask":2,"path":"M26.5 76 C34 86 42 90.5 89.5 88.5","kind":"C"}].map(t=>Object.freeze(t)))
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
function certificate(spec:U8fedSpec,s:HanjaOutlineSegment):ReviewedU8fedCertificate{
 const p=parsed(s);ensure(TARGETS.includes(spec)&&spec.path===s.revealPath&&s.direction==='curve','exact QB9 allowlist');const raw=p.commands.flatMap(c=>c.raw),v=raw.map(dec),P=Array.from({length:v.length/2},(_,i)=>v.slice(2*i,2*i+2)),r=R(7),fortyNine=R(49);
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
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u8fed-'+t.pen+'-'+t.mask,kind:'growing-u8fed-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU8fedContext(strokes:HanjaOutlineStrokes):ReviewedU8fedContext|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU8fedPolicy(context:ReviewedU8fedContext|null,pen:number,mask:number):ReviewedU8fedPolicy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU8fedPolicy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 迭 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two QC target guide required');const start=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) [QC]/.exec(spec.path);ensure(start,'fixed original M decimal spelling');return{q0:[Number(start[1]),Number(start[2])],r:7,minimumLength:7}}
export type ReviewedU8fedFrame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU8fedNodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function u8fedCoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 迭 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 迭 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 迭 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 迭 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 迭 SVG coordinate tree')
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
export function measureReviewedU8fedCapsFrame(policy:ReviewedU8fedPolicy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU8fedFrame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 迭 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 迭 measurement parent required')
  const coordinates=u8fedCoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u8fed-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 迭 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 迭 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 迭 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('迭 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 QC commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU8fedCaps(policy:ReviewedU8fedPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU8fedNodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 迭 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 迭 SVG binding tree')
    const coordinates=u8fedCoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u8fed-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u8fed-measure'&&guide.getAttribute('id')===clipId+'-u8fed-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u8fed-growing)'
    if(!bound())throw new Error('Mismatched 迭 SVG binding')
    const frame=measureReviewedU8fedCapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('迭 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('迭 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}

