import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 潗 K 원15p16m30·3m1/3m2의 두 source-specific Q 인증만 허용한다. */
const FIXED_STROKES=[[{"outline":"M13.9 9.75 L15.75 10.2 L17.55 10.65 L19.3 11.15 L20.95 11.8 L22.45 12.55 L23.9 13.35 L25.3 14.3 L26.55 15.3 L27.7 16.4 L28.75 17.65 L23.6 20.75 L23.15 19.7 L22.6 18.7 L21.95 17.65 L21.15 16.65 L20.25 15.6 L19.15 14.6 L18 13.55 L16.65 12.5 L15.2 11.45 L13.55 10.55 Z M28.75 17.65 L29.05 19.9 L27.7 21.75 L25.45 22.05 L23.6 20.75 Z","bounds":[13.55,9.75,29.05,22.05],"direction":"curve","weight":17.245069,"revealPath":"M13.28 10 Q22.78 13.5 26.96 20.5","revealWidth":14}],[{"outline":"M6.65 32.7 L8.65 33.2 L10.6 33.6 L12.4 34.15 L14.1 34.75 L15.7 35.5 L17.2 36.3 L18.6 37.25 L19.85 38.3 L21 39.45 L22 40.75 L16.75 43.6 L16.4 42.65 L15.9 41.65 L15.25 40.65 L14.45 39.65 L13.5 38.65 L12.4 37.6 L11.15 36.55 L9.7 35.55 L8.15 34.45 L6.35 33.55 Z M22 40.75 L22.25 43 L20.8 44.8 L18.55 45 L16.75 43.6 Z","bounds":[6.35,32.7,22.25,45],"direction":"curve","weight":17.548037,"revealPath":"M6.06 33 Q16.32 36.5 20.12 43.5","revealWidth":14}],[{"outline":"M7.4 66.2 L10.1 66.8 L12.65 67.9 L14.85 69.45 L16.8 71.45 L18.45 73.85 L19.75 76.6 L20.7 79.65 L21.35 83.05 L21.65 86.75 L21.7 90.7 L15.7 90.25 L16 86.75 L16 83.5 L15.8 80.6 L15.3 78 L14.6 75.7 L13.7 73.6 L12.5 71.75 L11.05 70.05 L9.25 68.5 L7.1 67.05 Z M21.7 90.7 L20.65 92.75 L18.45 93.45 L16.45 92.4 L15.7 90.25 Z","bounds":[7.1,66.2,21.7,93.45],"direction":"curve","weight":28.089471,"revealPath":"M6.82 66.5 Q20.12 71 18.6 92","revealWidth":14},{"outline":"M13.75 74.25 L14.4 72.6 L15.35 70.45 L16.55 67.8 L18.05 64.55 L19.85 60.8 L21.95 56.4 L24.35 51.45 L27.1 45.95 L30.25 39.9 L33.75 33.3 L34.55 33.65 L31.95 40.65 L29.6 47.05 L27.4 52.8 L25.45 57.9 L23.75 62.4 L22.35 66.35 L21.2 69.65 L20.4 72.35 L19.85 74.35 L19.6 75.7 Z","bounds":[13.75,33.3,34.55,75.7],"direction":"curve","weight":45.031105,"revealPath":"M16.7 75 Q18.22 69 34.18 33.5","revealWidth":14}],[{"outline":"M54.3 9.5 L52.9 12.55 L51.35 15.6 L49.55 18.65 L47.6 21.6 L45.5 24.55 L43.15 27.4 L40.65 30.25 L37.95 33.05 L35.05 35.7 L31.85 38.3 L31.25 37.65 L33.65 34.4 L35.95 31.3 L38.1 28.2 L40.1 25.15 L41.95 22.15 L43.65 19.15 L45.15 16.2 L46.5 13.25 L47.7 10.3 L48.7 7.4 Z M48.5 7.85 L48.95 6.7 L54.3 9.5 Z M54.3 9.5 L55.35 10.95 L52.5 11.5 Z","bounds":[31.25,6.7,55.35,38.3],"direction":"curve","weight":36.125,"revealPath":"M51.7 8 Q45.95 23.5 31.575000000000003 38","revealWidth":14}],[{"outline":"M48.95 20.5 L48.95 58 L42.95 61 L42.95 20.5 Z","bounds":[42.95,20.5,48.95,61],"direction":"down","weight":32}],[{"outline":"M75.3 10.4 L74.3 11.7 L73.3 12.9 L72.2 14.15 L71.1 15.35 L69.95 16.5 L68.75 17.6 L67.5 18.7 L66.2 19.75 L64.8 20.75 L63.5 21.8 L62.85 21.15 L63.8 19.8 L64.6 18.35 L65.4 16.95 L66.15 15.55 L66.9 14.2 L67.6 12.8 L68.3 11.45 L68.95 10.1 L69.55 8.75 L70.1 7.4 Z M69.85 7.85 L70.35 6.95 L75.3 10.4 Z M75.3 10.4 L76.1 12 L73.2 12.05 Z","bounds":[62.85,6.95,76.1,21.8],"direction":"curve","weight":16.265012,"revealPath":"M72.975 8.5 Q68.95 15.5 63.2 21.5","revealWidth":14}],[{"outline":"M45.95 20.5 L90.2 20.5 L90.2 22.5 L45.95 22.5 Z M90.2 20.5 L78.2 21.5 L84.2 15.5 Z","bounds":[45.95,15.5,90.2,22.5],"direction":"right","weight":44.275}],[{"outline":"M45.95 31 L86.75 31 L86.75 33 L45.95 33 Z M86.75 31 L76.75 32 L81.75 26.5 Z","bounds":[45.95,26.5,86.75,33],"direction":"right","weight":40.825}],[{"outline":"M45.95 41 L86.75 41 L86.75 43 L45.95 43 Z M86.75 41 L76.75 42 L81.75 36.5 Z","bounds":[45.95,36.5,86.75,43],"direction":"right","weight":40.825}],[{"outline":"M67.35 20.5 L67.35 54.5 L61.35 54.5 L61.35 20.5 Z","bounds":[61.35,20.5,67.35,54.5],"direction":"down","weight":32}],[{"outline":"M45.95 52.5 L91.95 52.5 L91.95 54.5 L45.95 54.5 Z M91.95 52.5 L81.95 53.5 L86.95 48 Z","bounds":[45.95,48,91.95,54.5],"direction":"right","weight":46}],[{"outline":"M33.85 65 L93.1 65 L93.1 67 L33.85 67 Z M93.1 65 L81.1 66 L87.1 60 Z","bounds":[33.85,60,93.1,67],"direction":"right","weight":59.225}],[{"outline":"M67.35 56.5 L67.35 92 L61.35 95 L61.35 55.5 Z M67.35 56.5 L68.85 57.5 L66.35 59 Z","bounds":[61.35,55.5,68.85,95],"direction":"down","weight":37.5}],[{"outline":"M63.15 66 L62.4 67.3 L60.55 70.4 L58.4 73.3 L56 76.1 L53.4 78.7 L50.5 81.2 L47.35 83.5 L44 85.65 L40.35 87.6 L36.45 89.35 L32.3 90.9 L31.95 90.05 L35.6 87.7 L39 85.3 L42.15 82.9 L45.05 80.5 L47.7 78 L50.05 75.45 L52.2 72.85 L54.05 70.2 L55.65 67.45 L56.35 66 Z","bounds":[31.95,66,63.15,90.9],"direction":"curve","weight":36.90542,"revealPath":"M59.75 66 Q52.275000000000006 81 32.15 90.5","revealWidth":14}],[{"outline":"M67.85 66.15 L70.25 68.4 L72.55 70.55 L74.8 72.6 L77.05 74.45 L79.3 76.2 L81.55 77.75 L83.85 79.15 L86.2 80.4 L88.55 81.5 L90.95 82.45 L88.3 88.5 L85.7 87.1 L83.2 85.5 L80.75 83.75 L78.45 81.8 L76.25 79.7 L74.15 77.45 L72.15 75.05 L70.3 72.45 L68.6 69.65 L67.1 66.65 Z M88.3 88.5 L90.95 82.45 L94 83.8 Z","bounds":[67.1,66.15,94,88.5],"direction":"curve","weight":29.717514,"revealPath":"M67.225 66 Q77 80 89.65 85.5","revealWidth":14}]] as HanjaOutlineStrokes
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU6f57Context=Readonly<{id:'u6f57-k-two-q'}>
export type ReviewedU6f57Certificate=Readonly<{syntax:'Q';initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedU6f57Policy=Readonly<{id:string;kind:'growing-u6f57-caps';segment:HanjaOutlineSegment;certificate:ReviewedU6f57Certificate}>
const CONTEXT:ReviewedU6f57Context=Object.freeze({id:'u6f57-k-two-q'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type U6f57Spec=Readonly<{pen:number;mask:number;path:string}>
const TARGETS:readonly U6f57Spec[]=Object.freeze([{"pen":3,"mask":1,"path":"M6.82 66.5 Q20.12 71 18.6 92"},{"pen":3,"mask":2,"path":"M16.7 75 Q18.22 69 34.18 33.5"}].map(t=>Object.freeze(t)))
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:U6f57Spec):Rat[]{
 const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(spec.path)
 ensure(match,'fixed canonical M/Q six-argument source only');return match.slice(1).map(D)
}
function certificate(spec:U6f57Spec,s:HanjaOutlineSegment):ReviewedU6f57Certificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source Q guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]],A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,3),K=R(1,11),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta)
 ensure(greater(lambda,R(0))&&greater(chord2,R(49)),'own Q initial regularity and arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lambda),lambda))),square(cross)),'own Q exact curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/3,curvatureBound:1/11,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquaredLower:rString(lambda),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u6f57-k-'+t.pen+'-'+t.mask,kind:'growing-u6f57-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU6f57Context(strokes:HanjaOutlineStrokes):ReviewedU6f57Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU6f57Policy(context:ReviewedU6f57Context|null,pen:number,mask:number):ReviewedU6f57Policy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU6f57Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 潗 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two target guide required');const n=sourceNumbers(spec);return{q0:[Number(n[0][0])/Number(n[0][1]),Number(n[1][0])/Number(n[1][1])],r:7,minimumLength:7}}
export type ReviewedU6f57Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU6f57Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function u6f57CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 潗 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 潗 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 潗 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 潗 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 潗 SVG coordinate tree')
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
export function measureReviewedU6f57CapsFrame(policy:ReviewedU6f57Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU6f57Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 潗 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 潗 measurement parent required')
  const coordinates=u6f57CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u6f57-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 潗 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 潗 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 潗 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('潗 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU6f57Caps(policy:ReviewedU6f57Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU6f57Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 潗 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 潗 SVG binding tree')
    const coordinates=u6f57CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u6f57-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u6f57-measure'&&guide.getAttribute('id')===clipId+'-u6f57-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u6f57-growing)'
    if(!bound())throw new Error('Mismatched 潗 SVG binding')
    const frame=measureReviewedU6f57CapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('潗 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('潗 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
