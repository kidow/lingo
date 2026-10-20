import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

/** 梲 actual full5/id3 · new11p13m29 · Q6m2만의 조건부 source-specific 인증. 전체fields 고정/native·runtime 미승인. */
const FIXED_STROKES=[[{"outline":"M6.85 29.5 L41.5 29.5 L41.5 31.5 L6.85 31.5 Z M41.5 29.5 L29.5 30.5 L35.5 24.5 Z","bounds":[6.85,24.5,41.5,31.5],"direction":"right","weight":34.65}],[{"outline":"M27.85 8 L27.85 91.5 L21.85 94.5 L21.85 7 Z M27.85 8 L29.35 9 L26.85 10.5 Z","bounds":[21.85,7,29.35,94.5],"direction":"down","weight":85.5}],[{"outline":"M26.55 30.5 L26.45 31 L25.3 35.95 L23.95 40.7 L22.5 45.4 L20.85 49.95 L19.05 54.35 L17.05 58.65 L14.9 62.8 L12.55 66.8 L10 70.6 L7.2 74.2 L6.45 73.75 L8.35 69.65 L10.2 65.55 L11.95 61.35 L13.6 57.15 L15.1 52.85 L16.45 48.45 L17.7 43.95 L18.75 39.4 L19.7 34.7 L20.4 30.5 Z","bounds":[6.45,30.5,26.55,74.2],"direction":"curve","weight":46.577597,"revealPath":"M23.5 30.5 Q19 55 6.85 74","revealWidth":14}],[{"outline":"M26.35 42.8 L28.05 43.35 L29.8 43.9 L31.45 44.55 L33 45.25 L34.5 46.1 L35.9 47.05 L37.3 48.05 L38.55 49.15 L39.75 50.3 L40.9 51.55 L35.9 54.9 L35.3 53.7 L34.6 52.5 L33.85 51.35 L33 50.2 L32.05 49.05 L31.05 47.95 L29.9 46.85 L28.7 45.7 L27.45 44.55 L26 43.6 Z M40.9 51.55 L41.3 53.8 L40.05 55.75 L37.8 56.15 L35.9 54.9 Z","bounds":[26,42.8,41.3,56.15],"direction":"curve","weight":17.734148,"revealPath":"M25.75 43 Q34.3 47 39.25 54.5","revealWidth":14}],[{"outline":"M58.95 18.3 L57.35 20.85 L55.65 23.3 L53.85 25.7 L51.9 28.05 L49.9 30.3 L47.75 32.5 L45.45 34.6 L43.05 36.65 L40.45 38.55 L37.75 40.3 L37.15 39.65 L39.2 37.15 L41.15 34.75 L43.05 32.35 L44.9 30 L46.6 27.6 L48.2 25.25 L49.75 22.85 L51.15 20.4 L52.45 17.95 L53.65 15.5 Z M53.4 15.95 L53.9 15 L58.95 18.3 Z M58.95 18.3 L59.8 19.9 L56.9 20.05 Z","bounds":[37.15,15,59.8,40.3],"direction":"curve","weight":30.270388,"revealPath":"M56.54 16.5 Q49.65 29.5 37.46 40","revealWidth":14}],[{"outline":"M54.4 11.5 L79.3 11.5 L79.3 13.5 L54.4 13.5 Z M79.3 11.5 L69.3 12.5 L74.3 7 Z","bounds":[54.4,7,79.3,13.5],"direction":"right","weight":24.91},{"outline":"M73.55 12.75 L75.25 14.7 L76.9 16.6 L78.6 18.5 L80.3 20.3 L82.15 22 L84.05 23.7 L86.1 25.3 L88.2 26.85 L90.45 28.3 L92.8 29.7 L89.15 35.25 L86.75 33.35 L84.5 31.45 L82.4 29.4 L80.45 27.35 L78.7 25.15 L77.1 22.9 L75.65 20.6 L74.45 18.2 L73.45 15.7 L72.75 13.1 Z M89.15 35.25 L92.8 29.7 L94.7 30.95 Z","bounds":[72.75,12.75,94.7,35.25],"direction":"curve","weight":26.920631,"revealPath":"M72.97 12.5 Q78.8 24.5 90.99 32.5","revealWidth":14}],[{"outline":"M53.7 35 L53.7 64 L47.7 67 L47.7 32 Z","bounds":[47.7,32,53.7,67],"direction":"down","weight":21}],[{"outline":"M50.7 35 L82.5 35 L82.5 37 L50.7 37 Z M85.5 36 L85.5 61 L79.5 64 L79.5 36 Z M79.5 35 L82.5 32.5 L88 37 L85.5 39 L79.5 36 Z","bounds":[50.7,32.5,88,64],"direction":"curve","weight":52.8,"revealPath":"M50.71 36 L82.51 36 L82.51 57","revealWidth":14}],[{"outline":"M50.7 56 L82.5 56 L82.5 58 L50.7 58 Z","bounds":[50.7,56,82.5,58],"direction":"right","weight":31.8}],[{"outline":"M63.65 61.35 L62.65 66.2 L61.15 70.7 L59.25 74.95 L56.95 78.85 L54.2 82.4 L51.05 85.65 L47.45 88.55 L43.5 91.05 L39.15 93.2 L34.45 94.9 L34.1 94.05 L38.25 91.5 L42.05 88.8 L45.4 86 L48.35 83 L50.85 79.8 L53 76.4 L54.75 72.8 L56.1 68.95 L57.1 64.9 L57.7 60.6 Z M57.65 61.05 L57.85 59.55 L63.65 61.35 Z M63.65 61.35 L65 62.55 L62.35 63.7 Z","bounds":[34.1,59.55,65,94.9],"direction":"curve","weight":43.107424,"revealPath":"M60.78 60.5 Q57.6 84.5 34.28 94.5","revealWidth":14}],[{"outline":"M74.35 56 L74.35 85 L68.35 85 L68.35 56 Z M68.35 85 L74.35 85 L73.15 86.8 L71.35 88 L69.55 86.8 Z M74.35 85 L74.4 85.6 L74.45 86.05 L74.55 86.35 L74.65 86.5 L74.75 86.6 L74.8 86.7 L75 86.75 L75.3 86.85 L75.75 86.95 L76.35 87 L76.35 93 L75.05 92.9 L73.85 92.7 L72.6 92.3 L71.5 91.65 L70.5 90.85 L69.65 89.85 L69.05 88.7 L68.65 87.5 L68.4 86.25 L68.35 85 Z M76.35 87 L78.45 87.9 L79.35 90 L78.45 92.1 L76.35 93 Z M76.35 87 L90.45 87 L90.45 93 L76.35 93 Z M90.45 87 L92.25 88.2 L93.45 90 L92.25 91.8 L90.45 93 Z","bounds":[68.35,56,93.45,93],"direction":"curve","weight":49.151068,"revealPath":"M71.38 57 L71.38 85 Q71.38 90 76.38 90 L90.46 90","revealWidth":14},{"outline":"M90.45 87 L87.45 87 L90.45 74.5 L91.45 74.5 Z","bounds":[87.45,74.5,91.45,87],"direction":"up","weight":12.5}]];
function freezeFixed(){for(const masks of FIXED_STROKES){for(const s of masks){Object.freeze(s.bounds);Object.freeze(s)}Object.freeze(masks)}Object.freeze(FIXED_STROKES)}
freezeFixed()
function ensure(value:unknown,message:string):asserts value {if(!value)throw new Error(message)}
function sameSegment(a:HanjaOutlineSegment,b:HanjaOutlineSegment){const keys=Object.keys(b);return !!a&&Object.keys(a).length===keys.length&&keys.every(k=>Object.prototype.propertyIsEnumerable.call(a,k)&&(k==='bounds'?Array.isArray(a.bounds)&&a.bounds.length===4&&b.bounds.every((v,i)=>Object.hasOwn(a.bounds,i)&&Object.is(a.bounds[i],v)):Object.is((a as unknown as Record<string,unknown>)[k],(b as unknown as Record<string,unknown>)[k])))}
function sameWhole(strokes:HanjaOutlineStrokes){return Array.isArray(strokes)&&strokes.length===FIXED_STROKES.length&&FIXED_STROKES.every((fixed,p)=>Object.hasOwn(strokes,p)&&Array.isArray(strokes[p])&&strokes[p].length===fixed.length&&fixed.every((segment,i)=>Object.hasOwn(strokes[p],i)&&sameSegment(strokes[p][i],segment)))}
export type ReviewedU68b2Context=Readonly<{id:'u68b2-hq6'}>
export type ReviewedU68b2Certificate=Readonly<{syntax:'Q';initialArcMax:7;parameterBound:number;curvatureBound:number;exactDecimalRational:true;notRasterProof:true;notPolygonConnectivityProof:true;notFullSweepProof:true;bounds:Readonly<Record<string,string>>}>
export type ReviewedU68b2Policy=Readonly<{id:string;kind:'growing-u68b2-caps';segment:HanjaOutlineSegment;certificate:ReviewedU68b2Certificate}>
const CONTEXT:ReviewedU68b2Context=Object.freeze({id:'u68b2-hq6'})
type Rat=readonly [bigint,bigint]
type Point=readonly [Rat,Rat]
type U68b2Spec=Readonly<{pen:number;mask:number;path:string}>
const TARGETS:readonly U68b2Spec[]=Object.freeze([{pen:6,mask:2,path:'M72.97 12.5 Q78.8 24.5 90.99 32.5'}].map(t=>Object.freeze(t)))
const gcd=(a:bigint,b:bigint):bigint=>b?gcd(b,a%b):a<0n?-a:a
const R=(n:bigint|number,d:bigint|number=1n):Rat=>{let a=BigInt(n),b=BigInt(d);ensure(b!==0n,'nonzero rational denominator');if(b<0n){a=-a;b=-b}const g=gcd(a,b);return[a/g,b/g]}
const D=(v:string):Rat=>{ensure(/^-?\d+(?:\.\d+)?$/.test(v),'canonical source decimal');const[a,b='']=v.split('.');return R(BigInt(a+b),10n**BigInt(b.length))}
const plus=(a:Rat,b:Rat):Rat=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),minus=(a:Rat,b:Rat):Rat=>plus(a,[-b[0],b[1]]),times=(a:Rat,b:Rat):Rat=>R(a[0]*b[0],a[1]*b[1]),square=(a:Rat):Rat=>times(a,a),greater=(a:Rat,b:Rat)=>a[0]*b[1]>b[0]*a[1],absR=(a:Rat):Rat=>R(a[0]<0n?-a[0]:a[0],a[1]),rString=(a:Rat)=>a[0]+'/'+a[1],dotR=(a:Point,b:Point):Rat=>plus(times(a[0],b[0]),times(a[1],b[1]))
const vector=(a:Point,b:Point):Point=>[minus(a[0],b[0]),minus(a[1],b[1])]
function sourceNumbers(spec:U68b2Spec):Rat[]{
 const match=/^M(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Q(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)$/.exec(spec.path)
 ensure(match,'fixed canonical M/Q six-argument source only');return match.slice(1).map(D)
}
function certificate(spec:U68b2Spec,s:HanjaOutlineSegment):ReviewedU68b2Certificate{
 ensure(s.revealPath===spec.path&&s.revealWidth===14&&s.direction==='curve','exact source Q guide/width/direction')
 const n=sourceNumbers(spec),P0:Point=[n[0],n[1]],P1:Point=[n[2],n[3]],P2:Point=[n[4],n[5]],A=vector(P1,P0),B:Point=[plus(minus(P0[0],times(R(2),P1[0])),P2[0]),plus(minus(P0[1],times(R(2),P1[1])),P2[1])],T=R(1,3),K=R(1,40),aa=dotR(A,A),ab=dotR(A,B),bb=dotR(B,B)
 ensure(greater(bb,R(0)),'nondegenerate fixed Q second derivative')
 const divide=(a:Rat,b:Rat)=>{ensure(b[0]!==0n,'nonzero fixed Q divisor');return R(a[0]*b[1],a[1]*b[0])},normAt=(t:Rat)=>plus(plus(aa,times(times(R(2),ab),t)),times(bb,square(t))),star=divide(R(-ab[0],ab[1]),bb),minimumT=greater(star,R(0))&&greater(T,star)?star:greater(normAt(T),aa)?R(0):T,lambda=normAt(minimumT),delta:Point=[plus(times(times(R(2),T),A[0]),times(square(T),B[0])),plus(times(times(R(2),T),A[1]),times(square(T),B[1]))],cross=minus(times(A[0],B[1]),times(A[1],B[0])),kr=times(R(7),K),cosLower=minus(R(1),times(R(1,2),square(kr))),chord2=dotR(delta,delta)
 ensure(greater(lambda,R(0))&&greater(chord2,R(49)),'own Q initial regularity and arc7')
 ensure(greater(times(square(K),times(R(4),times(square(lambda),lambda))),square(cross)),'own Q exact curvature bound')
 ensure(greater(cosLower,kr),'own Q initial-offset injectivity lower bound')
 return Object.freeze({syntax:'Q',initialArcMax:7,parameterBound:1/3,curvatureBound:1/40,exactDecimalRational:true,notRasterProof:true,notPolygonConnectivityProof:true,notFullSweepProof:true,bounds:Object.freeze({tUpper:rString(T),minimumT:rString(minimumT),halfSpeedSquaredLower:rString(lambda),chordSquared:rString(chord2),cross:rString(cross),curvatureUpper:rString(K),rKUpper:rString(kr),cosLower:rString(cosLower)})})
}
const POLICIES=TARGETS.map(t=>{const segment=FIXED_STROKES[t.pen-1][t.mask-1];return Object.freeze({id:'u68b2-'+t.pen+'-'+t.mask,kind:'growing-u68b2-caps' as const,segment,certificate:certificate(t,segment)})})
export function reviewedU68b2Context(strokes:HanjaOutlineStrokes):ReviewedU68b2Context|null{return sameWhole(strokes)?CONTEXT:null}
export function reviewedU68b2Policy(context:ReviewedU68b2Context|null,pen:number,mask:number):ReviewedU68b2Policy|null{if(context!==CONTEXT)return null;const i=TARGETS.findIndex(t=>t.pen===pen+1&&t.mask===mask+1);return i<0?null:POLICIES[i]}
function source(policy:ReviewedU68b2Policy,segment:HanjaOutlineSegment){ensure(POLICIES.includes(policy as typeof POLICIES[number])&&sameSegment(segment,policy.segment),'private fixed 梲 policy/segment required');const spec=TARGETS.find(t=>t.path===segment.revealPath);ensure(spec,'fixed two target guide required');const n=sourceNumbers(spec);return{q0:[Number(n[0][0])/Number(n[0][1]),Number(n[1][0])/Number(n[1][1])],r:7,minimumLength:7}}
export type ReviewedU68b2Frame=Readonly<{policyId:string;guide:string;progress:number;L:number;d:number;rho:number;q0:readonly number[];point:Readonly<{x:number;y:number}>}>
export type ReviewedU68b2Nodes={measurement:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;ink:SVGPathElement|null}

function u68b2CoordinateBinding(nodes:readonly SVGElement[],owner:SVGSVGElement):()=>boolean {
  const document=owner.ownerDocument,view=document?.defaultView
  if(!view||view.document!==document)throw new Error('Connected 梲 SVG document required')
  const parents=new Map<Element,Element|null>()
  for(const node of nodes){
    let current:Element|null=node
    const visited=new Set<Element>()
    while(current){
      if(visited.has(current))throw new Error('Cyclic 梲 SVG parent')
      visited.add(current)
      if(current.namespaceURI!=='http://www.w3.org/2000/svg'||current.ownerDocument!==document||!current.isConnected||(current!==owner&&(current as SVGElement).ownerSVGElement!==owner))throw new Error('Mismatched 梲 SVG coordinate owner')
      const parent=current.parentElement
      if(parent&&(!parent.isConnected||parent.ownerDocument!==document))throw new Error('Mismatched 梲 outer SVG parent')
      parents.set(current,parent)
      if(current===owner)break
      current=current.parentElement
    }
    if(current!==owner)throw new Error('Detached 梲 SVG coordinate tree')
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
export function measureReviewedU68b2CapsFrame(policy:ReviewedU68b2Policy,segment:HanjaOutlineSegment,progress:number,guide:SVGPathElement|null):ReviewedU68b2Frame {
  const fixed=source(policy,segment)
  if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Invalid 梲 Q progress')
  const owner=guide?.ownerSVGElement
  const defs=guide?.parentElement,target=defs?.parentElement
  if(!owner||!guide||defs?.localName!=='defs'||target?.localName!=='g'||target.getAttribute('data-stroke-start-gate')!==policy.id)throw new Error('Exact 梲 measurement parent required')
  const coordinates=u68b2CoordinateBinding([guide],owner)
  const exact=()=>coordinates()&&guide.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('data-u68b2-measurement')==='true'&&guide.getAttribute('pathLength')===null
  if(!exact())throw new Error('Exact connected 梲 measurement guide required')
  const L=guide!.getTotalLength()
  if(!Number.isFinite(L)||L<=fixed.minimumLength||!exact())throw new Error('Invalid 梲 browser length')
  const d=Math.min(progress*L,L),point=guide!.getPointAtLength(d)
  if(!Number.isFinite(point.x)||!Number.isFinite(point.y)||!exact())throw new Error('Changed 梲 guide or invalid endpoint')
  if(progress===0&&Math.hypot(point.x-fixed.q0[0],point.y-fixed.q0[1])>=1e-4)throw new Error('梲 UA start differs from exact M')
  return Object.freeze({policyId:policy.id,guide:segment.revealPath!,progress,L,d,rho:Math.min(fixed.r,d),q0:Object.freeze(fixed.q0),point:Object.freeze({x:point.x,y:point.y})})
}
/** 기존 정책과 분리된 원 Q commit. 완료 잉크는 별도 key/full round mask이다. */
export function commitReviewedU68b2Caps(policy:ReviewedU68b2Policy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU68b2Nodes) {
  const{measurement,guide,startCap,endCap,ink}=nodes
  const reset=()=>{
    ink?.setAttribute('visibility','hidden');guide?.setAttribute('stroke-dasharray','0 2')
    for(const cap of[startCap,endCap]){cap?.setAttribute('r','0');cap?.setAttribute('cx','0');cap?.setAttribute('cy','0')}
    for(const key of['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y'])ink?.removeAttribute(key)
  }
  reset()
  try{
    source(policy,segment)
    if(!Number.isFinite(progress)||progress<0||progress>1||!/^[A-Za-z0-9_:.-]+$/.test(clipId))throw new Error('Invalid 梲 frame/id')
    if(progress===0||progress===1)return{status:progress===0?'empty' as const:'complete' as const,frame:null,cleanup:reset}
    const owner=measurement?.ownerSVGElement
    const defs=measurement?.parentElement,target=defs?.parentElement,mask=guide?.parentElement
    if(!owner||!measurement||!guide||!startCap||!endCap||!ink||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask')throw new Error('Missing 梲 SVG binding tree')
    const coordinates=u68b2CoordinateBinding([measurement,guide,startCap,endCap,ink],owner)
    const bound=()=>coordinates()&&measurement.parentElement===defs&&defs.parentElement===target&&guide.parentElement===mask&&mask.parentElement===defs&&startCap.parentElement===mask&&endCap.parentElement===mask&&ink.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&mask.getAttribute('id')===clipId+'-u68b2-growing'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y'].every(key=>mask.getAttribute(key)==='0')&&['width','height'].every(key=>mask.getAttribute(key)==='100')&&[measurement,guide,startCap,endCap,ink].every(node=>node.getAttribute('data-growing-owner')===clipId)&&measurement.getAttribute('id')===clipId+'-u68b2-measure'&&guide.getAttribute('id')===clipId+'-u68b2-guide'&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+clipId+'-u68b2-growing)'
    if(!bound())throw new Error('Mismatched 梲 SVG binding')
    const frame=measureReviewedU68b2CapsFrame(policy,segment,progress,measurement)
    if(!bound())throw new Error('梲 binding changed during UA read')
    guide!.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap!.setAttribute('cx',String(frame.q0[0]));startCap!.setAttribute('cy',String(frame.q0[1]));startCap!.setAttribute('r',String(frame.rho))
    endCap!.setAttribute('cx',String(frame.point.x));endCap!.setAttribute('cy',String(frame.point.y));endCap!.setAttribute('r',String(frame.rho))
    for(const[key,value]of Object.entries({'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y}))ink!.setAttribute(key,String(value))
    if(!bound())throw new Error('梲 binding changed before visibility commit')
    ink!.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
