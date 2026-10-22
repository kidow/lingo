import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
/** 梴8m2 원cardinal H만의 contact-prefix. 원guide/폭은 없으며 합성하지 않는다. 새내부시계/조건부opaque-union 증명이고 실제DOM·공식시간·native 승인과 별개다. */
const FIXED_STROKES=[[{"outline":"M6.4 29.5 L35.7 29.5 L35.7 31.5 L6.4 31.5 Z M35.7 29.5 L25.7 30.5 L30.7 25 Z","bounds":[6.4,25,35.7,31.5],"direction":"right","weight":29.26}],[{"outline":"M24.6 8 L24.6 91.5 L18.6 94.5 L18.6 7 Z M24.6 8 L26.1 9 L23.6 10.5 Z","bounds":[18.6,7,26.1,94.5],"direction":"down","weight":85.5}],[{"outline":"M23.5 30.5 L23.45 30.95 L22.45 35.85 L21.3 40.65 L20.05 45.3 L18.65 49.85 L17.1 54.25 L15.35 58.55 L13.5 62.7 L11.5 66.7 L9.25 70.55 L6.8 74.2 L6 73.75 L7.55 69.7 L9.05 65.6 L10.45 61.45 L11.8 57.25 L13.05 52.95 L14.15 48.55 L15.2 44.05 L16.05 39.5 L16.85 34.8 L17.4 30.5 Z","bounds":[6,30.5,23.5,74.2],"direction":"curve","weight":45.715792,"revealPath":"M20.5 30.5 Q16.7 55 6.44 74","revealWidth":14}],[{"outline":"M23.05 42.8 L24.45 43.45 L25.95 44 L27.4 44.65 L28.75 45.4 L30.05 46.25 L31.3 47.15 L32.5 48.2 L33.65 49.25 L34.7 50.45 L35.65 51.7 L30.4 54.65 L29.95 53.45 L29.45 52.3 L28.85 51.15 L28.2 50.05 L27.45 48.95 L26.65 47.85 L25.75 46.75 L24.8 45.65 L23.8 44.55 L22.6 43.6 Z M35.65 51.7 L35.9 54 L34.5 55.8 L32.25 56 L30.4 54.65 Z","bounds":[22.6,42.8,35.9,56],"direction":"curve","weight":16.1929,"revealPath":"M22.4 43 Q29.62 47 33.8 54.5","revealWidth":14}],[{"outline":"M89.1 12.35 L86.55 13.5 L83.8 14.6 L80.95 15.65 L77.95 16.6 L74.75 17.55 L71.4 18.4 L67.9 19.2 L64.25 19.9 L60.4 20.5 L56.35 20.9 L56.15 20.05 L59.95 18.65 L63.55 17.3 L67 16.05 L70.3 14.8 L73.4 13.55 L76.3 12.25 L79.05 11 L81.6 9.7 L84 8.4 L86.2 7.1 Z M85.75 7.3 L90.2 11.7 L89.1 12.35 Z M90.2 11.7 L90.3 13.4 L87.3 12.15 Z","bounds":[56.15,7.1,90.3,20.9],"direction":"curve","weight":33.672402,"revealPath":"M88.1 9.5 Q76.225 16 56.275 20.5","revealWidth":14}],[{"outline":"M76.6 16 L76.6 74 L71.1 74 L71.1 16 Z","bounds":[71.1,16,76.6,74],"direction":"down","weight":56}],[{"outline":"M73.85 40.5 L90.95 40.5 L90.95 42.5 L73.85 42.5 Z M90.95 40.5 L82.95 41.5 L86.95 37 Z","bounds":[73.85,37,90.95,42.5],"direction":"right","weight":17.1}],[{"outline":"M65.65 35.5 L65.65 74 L60.15 74 L60.15 34.5 Z M65.65 35.5 L67.05 36.5 L64.65 38 Z","bounds":[60.15,34.5,67.05,74],"direction":"down","weight":38},{"outline":"M53.4 72 L92.85 72 L92.85 74 L53.4 74 Z M92.85 72 L80.85 73 L86.85 67 Z","bounds":[53.4,67,92.85,74],"direction":"right","weight":39.425}],[{"outline":"M34.4 14 L48.2 14 L48.2 16 L34.4 16 Z M50.8 15.5 L42.7 44.3 L36.1 45.45 L45.05 15 Z M45.2 14 L48.2 11.5 L53.7 16 L51.2 17.5 L45.2 20 Z M40.1 41.5 L52 41.5 L52 43.5 L40.1 43.5 Z","bounds":[34.4,11.5,53.7,45.45],"direction":"curve","weight":54.311047,"revealPath":"M34.425 15 L48.2 15 L40.125 42.5 L52 42.5","revealWidth":14}],[{"outline":"M54.95 42.9 L53.6 50.35 L51.95 57.3 L50.05 63.7 L47.85 69.6 L45.35 75 L42.55 79.85 L39.5 84.15 L36.1 87.85 L32.4 90.95 L28.5 93.35 L27.95 92.6 L31.15 89.5 L34.1 86.05 L36.8 82.2 L39.3 77.95 L41.5 73.2 L43.5 67.95 L45.25 62.25 L46.75 56.05 L48 49.3 L49 42.05 Z M49 41.5 L52 39 L57.5 43.5 L55 45 L49 47.5 Z","bounds":[27.95,39,57.5,93.35],"direction":"curve","weight":55.806026,"revealPath":"M52 42.5 Q46.775 80.5 28.25 93","revealWidth":14}],[{"outline":"M37.8 51.9 L40.1 59.15 L42.95 65.4 L46.4 70.8 L50.4 75.25 L55 78.8 L60.25 81.6 L66.15 83.55 L72.75 84.75 L80.15 85.1 L88.3 84.7 L88.8 91.25 L80 91.35 L71.95 90.6 L64.65 88.85 L58.05 86.2 L52.3 82.65 L47.4 78.15 L43.4 72.8 L40.3 66.7 L38.1 59.75 L36.9 52.05 Z M88.8 91.25 L88.3 84.7 L93.7 84.25 Z","bounds":[36.9,51.9,93.7,91.35],"direction":"curve","weight":62.959828,"revealPath":"M37.275 51.5 Q44.4 91.5 88.575 88","revealWidth":14}]] as const
export const REVIEWED_U68B4_CONTACT_PROOF={"schema":"u68b4-own-cardinal-contact-prefix/v1","targetPen":8,"targetMask":2,"sourceP1Kind":"original-cardinal-down-P","sourceP2Kind":"original-cardinal-right-P","sourceGuideAbsent":true,"sourceRevealWidthAbsent":true,"originalHRectangle":[[["267","5"],["72","1"]],[["1857","20"],["72","1"]],[["1857","20"],["74","1"]],[["267","5"],["74","1"]]],"originalHTriangle":[[["1857","20"],["72","1"]],[["1617","20"],["73","1"]],[["1737","20"],["67","1"]]],"originalVBody":[[["1313","20"],["71","2"]],[["1313","20"],["74","1"]],[["1203","20"],["74","1"]],[["1203","20"],["69","2"]]],"originalPositiveCore":[[["1203","20"],["72","1"]],[["1313","20"],["72","1"]],[["1313","20"],["74","1"]],[["1203","20"],["74","1"]]],"positiveCoreArea":["11","1"],"xMin":["267","5"],"xMax":["1857","20"],"initialLeft":["1203","20"],"initialRight":["1313","20"],"clipY":["67","1"],"clipHeight":["7","1"],"leftBackfill":["27","4"],"rightAdvance":["136","5"],"newOpaqueUnionAreaLipschitzBound":["2039","10"],"p0SelectedInkEmpty":true,"p0PositiveLimitHAreaAlreadyInsideV":true,"p1OriginalExact":true,"sourceTimingPreservedClaim":false,"nativeApproval":false,"sourceGeometryChanged":false} as const
export const REVIEWED_U68B4_SOURCE={"root":"u68b4-var-001","fixtureFile":"docs/hanja-source-independent-vh-u68b4-var001-source-experiment-2026-10-20/fixtures.json","actualFull5File":"docs/hanja-goal-glyphwiki-batch915-2026-10-13/engine-whole-u68b4-var-001.json","geometrySHA256":"d0a12406e6dc3fda2012d6edef84dafb7afe47a4dd5a7f305c35b948e3131767","pens":11,"masks":12,"polygons":25,"target":[8,2],"inputSHA256":{"docs/hanja-source-independent-vh-u68b4-var001-source-experiment-2026-10-20/fixtures.json":"039f6a12433c4d6aa5d403198897e09c2ccd9e242497aa3684d3dd9841ea957e","docs/hanja-goal-glyphwiki-batch915-2026-10-13/engine-whole-u68b4-var-001.json":"3bfeb5f11bac4cab87401ab180445f5dad19443e2f413d1be7d86917975d6448","docs/hanja-goal-glyphwiki-batch915-2026-10-13/review.json":"d276ba8319f3c1fef6f4d109c4ec075184f2b8edd1a70f9cc6dfd2880f91741d","docs/hanja-goal-glyphwiki-batch915-2026-10-13/metadata.json":"576bf85ef7f1d708d9b9fa0b3343f93fb4f1255d2a26b2ba9ebc892cef537027","docs/hanja-source-native-hold-u68b4-vh-prefix-2026-10-20/hold.json":"b415247f20f27d9eec2c67ec80e64522a54c14f4ad02897a8e86f0402703f0ac"},"newInternalClock":true,"sourceTimingPreservedClaim":false,"previousP1Kind":"original-cardinal-down-P","originalHGuideAbsent":true,"originalHRevealWidthAbsent":true,"sourcePGuideWidthWeightPreserved":true,"newGuideOrConnector":false,"sourceGeometryChanged":false,"mathematicalScope":"opaque union given completed exact original V; not pixel/AA/official timing evidence","DOMAdapterPrepared":false,"nativeApproval":false,"actualAppUI":false,"runtimeApplied":false} as const
function freeze(v:unknown):void{if(v&&typeof v==='object'){for(const x of Object.values(v))freeze(x);Object.freeze(v)}}
function sameJSON(a:unknown,b:unknown):boolean{if(Object.is(a,b))return true;if(!a||!b||typeof a!=='object'||typeof b!=='object')return false;if(Array.isArray(b)){if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false;for(let i=0;i<b.length;i++){const d=Object.getOwnPropertyDescriptor(a,String(i));if(!d||!d.enumerable||!Object.hasOwn(d,'value')||!sameJSON(d.value,b[i]))return false}return true}if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false;const keys=Object.keys(b);return Reflect.ownKeys(a).length===keys.length&&keys.every(k=>{const d=Object.getOwnPropertyDescriptor(a,k);return!!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,(b as Record<string,unknown>)[k])})}
freeze(FIXED_STROKES);freeze(REVIEWED_U68B4_CONTACT_PROOF);freeze(REVIEWED_U68B4_SOURCE)
const number=(x:readonly string[])=>Number(x[0])/Number(x[1])
export type ReviewedU68b4Context=Readonly<{id:'u68b4-var001-exact11'}>
export type ReviewedU68b4Policy=Readonly<{id:'u68b4-8-2';kind:'cardinal-contact-prefix-u68b4';pen:7;mask:1;segment:HanjaOutlineSegment;predecessor:HanjaOutlineSegment}>
const CONTEXT:ReviewedU68b4Context=Object.freeze({id:'u68b4-var001-exact11'})
const POLICY:ReviewedU68b4Policy=Object.freeze({id:'u68b4-8-2',kind:'cardinal-contact-prefix-u68b4',pen:7,mask:1,segment:FIXED_STROKES[7][1],predecessor:FIXED_STROKES[7][0]})
export function reviewedU68b4Context(strokes:HanjaOutlineStrokes):ReviewedU68b4Context|null{return sameJSON(strokes,FIXED_STROKES)?CONTEXT:null}
export function reviewedU68b4Policy(context:ReviewedU68b4Context|null,pen:number,mask:number):ReviewedU68b4Policy|null{return context===CONTEXT&&pen===7&&mask===1?POLICY:null}
export type ReviewedU68b4PrefixFrame=Readonly<{policyId:'u68b4-8-2';progress:number;phase:'empty'|'contact-prefix'|'full';visible:boolean;originalPDirect:boolean;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;requiresCompletedOriginalPredecessor:true;UARead:false}>
/**
 * q>0 clip contains the same positive-area original V/H core. q0's selected H is empty.
 * The right/left backfill frontiers are nested and source-bounded; only H ∩ clip is ink.
 * New opaque UNION area (with completed exact V) is Lipschitz <=2039/10*|dq|.
 * H's own selected area has a covered core at q→0; this is not a zero-area-H-mask claim.
 * A later adapter must verify the original full V/frame and apply visibility last.
 */
export function sampleReviewedU68b4Prefix(policy:ReviewedU68b4Policy,progress:number):ReviewedU68b4PrefixFrame{
 if(policy!==POLICY)throw new Error('Private exact 梴 cardinal policy required')
 if(!Number.isFinite(progress)||progress<0||progress>1)throw new Error('Finite progress0..1 required')
 if(progress===0||progress===1)return Object.freeze({policyId:POLICY.id,progress,phase:progress===0?'empty':'full',visible:progress===1,originalPDirect:progress===1,clip:null,requiresCompletedOriginalPredecessor:true,UARead:false})
 const F=REVIEWED_U68B4_CONTACT_PROOF,xMin=number(F.xMin),xMax=number(F.xMax),left0=number(F.initialLeft),right0=number(F.initialRight)
 const left=Math.max(xMin,Math.min(left0,left0-number(F.leftBackfill)*progress)),right=Math.min(xMax,Math.max(right0,right0+number(F.rightAdvance)*progress))
 return Object.freeze({policyId:POLICY.id,progress,phase:'contact-prefix',visible:true,originalPDirect:false,clip:Object.freeze({x:left,y:number(F.clipY),width:right-left,height:number(F.clipHeight)}),requiresCompletedOriginalPredecessor:true,UARead:false})
}

/** This export describes the later adapter stage; SOURCE.DOMAdapterPrepared=false retains the initial pure-policy preparation history. */
export const REVIEWED_U68B4_DOM_ADAPTER=Object.freeze({prepared:true,kind:'cardinal-contact-prefix-u68b4',nativeGuideRead:false,requiresCompletedOriginalVForPositiveProgress:true,actualNativeApproved:false})
export type ReviewedU68b4Nodes={ink:SVGPathElement|null;rect:SVGRectElement|null}
type BoundPrefix={policy:ReviewedU68b4Policy;ink:SVGPathElement;rect:SVGRectElement;clipURL:string;exact:()=>boolean;before:()=>boolean}
type PaintState={rect:SVGRectElement;clipURL:string;x:number;width:number;progress:number;full:boolean}
const BOUND_PREFIX=new WeakMap<ReviewedU68b4PrefixFrame,BoundPrefix>(),PAINT=new WeakMap<SVGPathElement,PaintState>()
function requireOwn(ok:unknown,message:string):asserts ok{if(!ok)throw new Error(message)}
const META_U68B4=['data-contact-progress','data-contact-left','data-contact-right','data-u68b4-previous-full','data-u68b4-frame-committed']
function opaqueFill(style:CSSStyleDeclaration){const fill=style.fill;return fill==='black'||(/^rgb\(/.test(fill)&&!fill.includes('/'))}
function safeCoordinateTree(nodes:readonly SVGElement[],owner:SVGSVGElement,ink:SVGPathElement):()=>boolean{
 const document=owner.ownerDocument,view=document?.defaultView
 requireOwn(view&&view.document===document,'Connected same SVG document required')
 const parents=new Map<SVGElement,Element|null>(),ownerViewBox=owner.getAttribute('viewBox'),ownerWidth=owner.getAttribute('width'),ownerHeight=owner.getAttribute('height')
 for(const node of nodes){
  let current:Element|null=node
  const seen=new Set<Element>()
  while(current){
   requireOwn(!seen.has(current),'Cyclic SVG tree');seen.add(current)
   requireOwn(current.namespaceURI==='http://www.w3.org/2000/svg'&&current.isConnected&&current.ownerDocument===document,'Connected exact SVG owner required')
   requireOwn(current===owner||(current as SVGElement).ownerSVGElement===owner,'Mismatched SVG owner')
   parents.set(current as SVGElement,current.parentElement)
   if(current===owner)break
   current=current.parentElement
  }
  requireOwn(current===owner,'Detached SVG source tree')
 }
 return()=>{
  if(owner.ownerDocument!==document||document.defaultView!==view||view.document!==document||owner.getAttribute('viewBox')!==ownerViewBox||owner.getAttribute('width')!==ownerWidth||owner.getAttribute('height')!==ownerHeight)return false
  for(const[node,parent]of parents){
   if(!node.isConnected||node.ownerDocument!==document||node.parentElement!==parent||(node!==owner&&node.ownerSVGElement!==owner)||node.getAttribute('transform')!==null)return false
   const style=view.getComputedStyle(node)
   if(style.transform!=='none'||['translate','rotate','scale'].some(k=>{const v=style.getPropertyValue(k);return v!==''&&v!=='none'}))return false
   if(style.opacity!=='1'||style.display==='none'||style.filter!=='none'||style.mixBlendMode!=='normal')return false
   if(node!==ink&&(style.visibility!=='visible'||node.getAttribute('mask')!==null||node.getAttribute('clip-path')!==null||style.getPropertyValue('mask-image')!=='none'||style.getPropertyValue('clip-path')!=='none'))return false
  }
  return true
 }
}
function frameBinding(policy:ReviewedU68b4Policy,frame:ReviewedU68b4PrefixFrame,nodes:ReviewedU68b4Nodes):BoundPrefix{
 const{ink,rect}=nodes;requireOwn(policy===POLICY&&ink&&rect,'Exact private 梴 nodes required')
 const owner=ink.ownerSVGElement,target=ink.parentElement,clip=rect.parentElement,defs=clip?.parentElement,stroke=target?.parentElement,outline=stroke?.parentElement,id=ink.getAttribute('data-owner')
 requireOwn(owner&&id&&target?.localName==='g'&&clip?.localName==='clipPath'&&defs?.localName==='defs'&&stroke?.localName==='g'&&outline?.localName==='g','Exact own clip hierarchy required')
 const clipURL='url(#'+id+'-u68b4-prefix-clip)',previous=target.previousElementSibling
 const prior=previous?.localName==='path'?previous as SVGPathElement:null
 if(frame.progress>0)requireOwn(prior,'Positive H requires completed original V path')
 const stable=safeCoordinateTree([ink,rect,...(prior?[prior]:[])],owner,ink),view=owner.ownerDocument.defaultView!
 const previousFull=()=>{
  if(!prior||prior.parentElement!==stroke||prior.nextElementSibling!==target||prior.previousElementSibling!==null||stroke.children.length!==2||prior.ownerSVGElement!==owner||prior.getAttribute('d')!==policy.predecessor.outline||prior.getAttribute('mask')!==null||prior.getAttribute('clip-path')!==null||prior.getAttribute('pathLength')!==null)return false
  const p=view.getComputedStyle(prior),h=view.getComputedStyle(ink)
  return p.visibility==='visible'&&p.display!=='none'&&p.opacity==='1'&&p.fillOpacity==='1'&&p.fillRule==='nonzero'&&p.stroke==='none'&&opaqueFill(p)&&p.fill===h.fill&&h.fillOpacity==='1'&&h.fillRule==='nonzero'&&h.stroke==='none'
 }
 const clipCSSMatches=(style:CSSStyleDeclaration)=>{
  if(style.getPropertyValue('mask-image')!=='none')return false
  const attribute=ink.getAttribute('clip-path'),computed=style.getPropertyValue('clip-path')
  if(attribute===null)return computed==='none'
  if(attribute!==clipURL)return false
  const match=/^url\(["']?(.*?)["']?\)$/.exec(computed)
  if(!match)return false
  try{return new URL(match[1],owner.ownerDocument.baseURI).href===new URL('#'+id+'-u68b4-prefix-clip',owner.ownerDocument.baseURI).href}catch{return false}
 }
 const exact=()=>{
  const h=view.getComputedStyle(ink)
  return stable()&&ink.parentElement===target&&rect.parentElement===clip&&clip.parentElement===defs&&defs.parentElement===target&&target.parentElement===stroke&&stroke.parentElement===outline&&outline.getAttribute('data-stroke-outlines')==='true'&&stroke.getAttribute('data-outline-stroke')==='8'&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-stroke-reveal-policy')===policy.kind&&target.getAttribute('data-stroke-reveal-progress')===String(frame.progress)&&target.children.length===2&&target.children[0]===defs&&target.children[1]===ink&&defs.children.length===1&&defs.children[0]===clip&&clip.children.length===1&&clip.children[0]===rect&&clip.getAttribute('id')===id+'-u68b4-prefix-clip'&&clip.getAttribute('clipPathUnits')==='userSpaceOnUse'&&rect.getAttribute('id')===id+'-u68b4-prefix-rect'&&rect.getAttribute('y')==='67'&&rect.getAttribute('height')==='7'&&ink.getAttribute('id')===id+'-u68b4-ink'&&ink.getAttribute('data-owner')===id&&ink.getAttribute('data-u68b4-ink')==='true'&&ink.getAttribute('d')===policy.segment.outline&&ink.getAttribute('mask')===null&&ink.getAttribute('pathLength')===null&&h.stroke==='none'&&h.fillOpacity==='1'&&h.fillRule==='nonzero'&&opaqueFill(h)&&clipCSSMatches(h)&&(frame.progress===0||previousFull())
 }
 requireOwn(exact(),'Changed original 梴 P/coordinate/paint or predecessor')
 const state=PAINT.get(ink)
 if(state)requireOwn(state.rect===rect&&state.clipURL===clipURL&&rect.getAttribute('x')===String(state.x)&&rect.getAttribute('width')===String(state.width)&&ink.getAttribute('clip-path')===(state.full?null:clipURL),'Changed previous own clip state')
 else requireOwn(rect.getAttribute('x')==='60.15'&&rect.getAttribute('width')==='0'&&ink.getAttribute('clip-path')===clipURL,'Exact initial own clip required')
 const initialX=rect.getAttribute('x'),initialWidth=rect.getAttribute('width'),initialClip=ink.getAttribute('clip-path')
 const before=()=>exact()&&rect.getAttribute('x')===initialX&&rect.getAttribute('width')===initialWidth&&ink.getAttribute('clip-path')===initialClip
 return{policy,ink,rect,clipURL,exact,before}
}
/** No pathLength/getTotalLength/getPointAtLength or invented H guide. This binds original source P, DOM ownership and the full prior V in the same frame. */
export function bindReviewedU68b4Frame(policy:ReviewedU68b4Policy,progress:number,nodes:ReviewedU68b4Nodes):ReviewedU68b4PrefixFrame{
 const frame=sampleReviewedU68b4Prefix(policy,progress),binding=frameBinding(policy,frame,nodes)
 BOUND_PREFIX.set(frame,binding);return frame
}
function hideOwnPrefix(nodes:ReviewedU68b4Nodes){
 const{ink,rect}=nodes;ink?.setAttribute('visibility','hidden')
 if(ink){for(const k of META_U68B4)ink.removeAttribute(k);const state=PAINT.get(ink);if(state)ink.setAttribute('clip-path',state.clipURL);PAINT.delete(ink)}
 rect?.setAttribute('x','60.15');rect?.setAttribute('width','0')
}
/** All geometry/clip writes and source checks precede visibility; failure never paints H or alters the previous V. */
export function commitReviewedU68b4Prefix(nodes:ReviewedU68b4Nodes,frame:ReviewedU68b4PrefixFrame):boolean{
 nodes.ink?.setAttribute('visibility','hidden')
 try{
  const binding=BOUND_PREFIX.get(frame),{ink,rect}=nodes
  requireOwn(binding&&ink&&rect&&binding.ink===ink&&binding.rect===rect&&binding.before(),'Private fresh same-frame 梴 binding required')
  const{clipURL}=binding,clip=frame.clip,x=clip?.x??60.15,width=clip?.width??0
  ink.setAttribute('clip-path',clipURL);rect.setAttribute('x',String(x));rect.setAttribute('width',String(width))
  ink.setAttribute('data-contact-progress',String(frame.progress));ink.setAttribute('data-contact-left',String(clip?.x??(frame.progress===1?53.4:60.15)));ink.setAttribute('data-contact-right',String(clip?clip.x+clip.width:frame.progress===1?92.85:65.65));ink.setAttribute('data-u68b4-previous-full',String(frame.progress>0));ink.setAttribute('data-u68b4-frame-committed','true')
  if(frame.originalPDirect)ink.removeAttribute('clip-path')
  requireOwn(binding.exact()&&rect.getAttribute('x')===String(x)&&rect.getAttribute('width')===String(width)&&ink.getAttribute('clip-path')===(frame.originalPDirect?null:clipURL),'Changed own clip/source before visibility')
  PAINT.set(ink,{rect,clipURL,x,width,progress:frame.progress,full:frame.originalPDirect})
  ink.setAttribute('visibility',frame.visible?'visible':'hidden')
  return true
 }catch{hideOwnPrefix(nodes);return false}
}
/** Convenience entry point for a future own child: even a binding failure hides the previous H frame. */
export function applyReviewedU68b4Prefix(policy:ReviewedU68b4Policy,progress:number,nodes:ReviewedU68b4Nodes):boolean{
 nodes.ink?.setAttribute('visibility','hidden')
 try{return commitReviewedU68b4Prefix(nodes,bindReviewedU68b4Frame(policy,progress,nodes))}catch{hideOwnPrefix(nodes);return false}
}
