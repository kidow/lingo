/** Local-authored 菰: four exact source-bound point windows. No original-clock, app or native approval. */
import type {HanjaOutlineSegment,HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u83f0,STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u83f0-local-source-window-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU83f0LocalPointWindowContext=Readonly<{id:'u83f0-local-original-12-point-windows'}>
const CONTEXT:ReviewedU83f0LocalPointWindowContext=Object.freeze({id:'u83f0-local-original-12-point-windows'})
export function makeReviewedU83f0LocalPointWindowContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU83f0LocalPointWindowContext|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU83f0LocalPointWindowPolicy=Readonly<{id:string;kind:'source-point-window-u83f0-local';pen:5|6|7|10;mask:1|2;segment:HanjaOutlineSegment;anchor:readonly[number,number];sourceBounds:readonly number[];sourceT:0|0.0625|0.125|0.25;priorRequired:boolean;priorSegment:HanjaOutlineSegment|null;proofFingerprint:string;previewOnly:true}>
const POLICIES:readonly ReviewedU83f0LocalPointWindowPolicy[]=freeze([
 {id:'u83f0-local-point-window-5-2',kind:'source-point-window-u83f0-local',pen:5,mask:2,segment:STROKES[4][1],anchor:[36.4875,34.177734375],sourceBounds:STROKES[4][1].bounds,sourceT:0.0625,priorRequired:true,priorSegment:STROKES[4][0],proofFingerprint:'75ac07ee87d836ad6e889a48b726c8344a6bfc34747523e0ee7a2d4962c86033',previewOnly:true},
 {id:'u83f0-local-point-window-6-2',kind:'source-point-window-u83f0-local',pen:6,mask:2,segment:STROKES[5][1],anchor:[23.9875,87.9375],sourceBounds:STROKES[5][1].bounds,sourceT:0.25,priorRequired:true,priorSegment:STROKES[5][0],proofFingerprint:'75ac07ee87d836ad6e889a48b726c8344a6bfc34747523e0ee7a2d4962c86033',previewOnly:true},
 {id:'u83f0-local-point-window-7-1',kind:'source-point-window-u83f0-local',pen:7,mask:1,segment:STROKES[6][0],anchor:[7.9,65.25],sourceBounds:STROKES[6][0].bounds,sourceT:0,priorRequired:false,priorSegment:null,proofFingerprint:'75ac07ee87d836ad6e889a48b726c8344a6bfc34747523e0ee7a2d4962c86033',previewOnly:true},
 {id:'u83f0-local-point-window-10-2',kind:'source-point-window-u83f0-local',pen:10,mask:2,segment:STROKES[9][1],anchor:[62.0640234375,88.5775],sourceBounds:STROKES[9][1].bounds,sourceT:0.125,priorRequired:true,priorSegment:STROKES[9][0],proofFingerprint:'b5c078205f638248d69166e3814090590bb0dcd7873aa4026ed2492ca6c1fece',previewOnly:true}
]as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU83f0LocalPointWindowPolicy(context:ReviewedU83f0LocalPointWindowContext|null,pen:number,mask:number):ReviewedU83f0LocalPointWindowPolicy|null{
 return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null
}
function source(policy:ReviewedU83f0LocalPointWindowPolicy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 菰 local policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU83f0LocalPointWindowFrame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-kernel-point-window'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;anchorIsOriginalQ0:boolean;sourceT:number;priorOpaque:boolean;previewOnly:true;authorClock:'source-author-kernel-point-rectangle';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU83f0LocalPointWindowFrame(policy:ReviewedU83f0LocalPointWindowPolicy,segment:HanjaOutlineSegment,p:number,priorProgress=0,priorOpaque=false):ReviewedU83f0LocalPointWindowFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 菰 progress required')
 if(!Number.isFinite(priorProgress)||priorProgress<0||priorProgress>1||typeof priorOpaque!=='boolean')throw Error('Exact unit prior progress and actual DOM guard boolean required')
 if(p>0&&policy.priorRequired&&(priorProgress!==1||!priorOpaque))throw Error('Current-frame exact completed prior original P must be opaque')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const clip=p>0&&p<1?Object.freeze({x:ax+(x0-ax)*p,y:ay+(y0-ay)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':'source-kernel-point-window',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,anchorIsOriginalQ0:policy.sourceT===0,sourceT:policy.sourceT,priorOpaque:policy.priorRequired?priorOpaque:false,previewOnly:true,authorClock:'source-author-kernel-point-rectangle',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU83f0LocalPointWindowNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
function opaqueRGB(value:string):boolean{
 const match=/^rgba?\(([^)]+)\)$/.exec(value.trim());if(!match)return false
 const slash=match[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/\s+/);let alpha:string|undefined=slash[1]?.trim()
 if(slash.length>2)return false
 if(alpha===undefined&&parts.length===4)alpha=parts.pop()
 return parts.length===3&&parts.every(v=>Number.isFinite(Number(v.replace('%',''))))&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)
}
function cssSourcePath(doc:Document,value:string,outline:string):boolean{
 if(value==='')return true
 const probe=doc.createElementNS(NS,'path');probe.style.setProperty('d','path('+JSON.stringify(outline)+')')
 const expected=probe.style.getPropertyValue('d')
 return expected!==''&&value===expected
}
/** New authored clock only: a strict union-kernel anchor plus nested convex rectangles containing it gives a star-shaped connected P intersection. This does not establish source-Q forward timing. Three mask2 policies additionally require the exact previous mask full opaque in this actual owner/frame. */
export function commitReviewedU83f0LocalPointWindow(policy:ReviewedU83f0LocalPointWindowPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU83f0LocalPointWindowNodes,priorProgress=0){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU83f0LocalPointWindowFrame(policy,segment,progress,priorProgress,verifyReviewedU83f0LocalPointWindowPriorDOM(policy,g,progress,priorProgress))
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-'+(policy.mask-1)))throw Error('Exact 菰 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 菰 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u83f0-local-source-window-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const expectedCSS=new Map<string,string>()
  for(const [k,v]of Object.entries(shape)){const probe=doc.createElementNS(NS,'rect');probe.style.setProperty(k,String(v)+'px');expectedCSS.set(k,probe.style.getPropertyValue(k))}
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 菰 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 菰 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&slot.children.length===STROKES[policy.pen-1].length&&slot.children[policy.mask-1]===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===12&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')===String(priorProgress)&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(progress>0&&policy.priorRequired&&!verifyReviewedU83f0LocalPointWindowPriorDOM(policy,g,progress,priorProgress))return false
   if(!exact(visibility,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   for(const node of tree){
    if(!node.isConnected||node.ownerDocument!==doc||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.namespaceURI!==NS||node.parentNode!==parents.get(node)||['transform','filter','mask'].some(k=>node.getAttribute(k)!==null)||(node!==p&&node.getAttribute('clip-path')!==null))return false
    const s=view.getComputedStyle(node)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||(node!==p&&s.clipPath!=='none')||!['','none'].includes(s.getPropertyValue('mask-image'))||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
   }
   const rs=view.getComputedStyle(r)
   if([...expectedCSS].some(([k,v])=>v===''||rs.getPropertyValue(k)!==v))return false
   const paint=view.getComputedStyle(p)
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 菰 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 菰 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 菰 visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,error:null,frame:f,cleanup:reset}
 }catch(error){reset();return {status:'hidden' as const,error:error instanceof Error?error.message:'Invalid source point-window DOM binding',frame:null,cleanup:reset}}
}

export function verifyReviewedU83f0LocalPointWindowPriorDOM(policy:ReviewedU83f0LocalPointWindowPolicy,g:SVGGElement|null,p:number,priorProgress:number):boolean{
 try{
  source(policy,policy.segment);if(!Number.isFinite(p)||p<0||p>1||!policy.priorRequired||!policy.priorSegment||priorProgress!==1||!g)return false
  const slot=g.parentNode,outer=slot?.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!owner||!view||view.document!==doc)return false
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,H=pen.children[0]as SVGPathElement|undefined,id=g.getAttribute(PREFIX+'clip')
  if(!H||!id||!/^[A-Za-z0-9_:.-]+$/.test(id)||!id.endsWith('-'+(policy.pen-1)+'-'+(policy.mask-1)))return false
  const exact=()=>g.parentNode===pen&&pen.children.length===STROKES[policy.pen-1].length&&pen.children[policy.mask-2]===H&&pen.children[policy.mask-1]===g&&pen.getAttribute('data-outline-stroke')===String(policy.pen)&&pen.parentNode===outlines&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===12&&outlines.children[policy.pen-1]===pen&&H.parentNode===pen&&H.localName==='path'&&H.getAttribute('d')===policy.priorSegment!.outline&&['pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>H.getAttribute(k)===null)&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')==='1'
  if(!exact())return false
  return opaqueTree([g,H],pen,owner,doc,view,exact)&&opaqueSourcePath(H,policy.priorSegment!.outline,doc,view)&&exact()
 }catch{return false}
}
function opaqueSourcePath(p:SVGPathElement,d:string,doc:Document,view:Window):boolean{
 const s=view.getComputedStyle(p)
 return p.getAttribute('d')===d&&['mask','clip-path','transform','filter','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>p.getAttribute(k)===null)&&s.visibility==='visible'&&s.stroke==='none'&&s.fillRule==='nonzero'&&Number(s.fillOpacity)===1&&Number(s.opacity)===1&&opaqueRGB(s.fill)&&cssSourcePath(doc,s.getPropertyValue('d').trim(),d)
}
function opaqueTree(extra:Element[],start:Element,owner:SVGSVGElement,doc:Document,view:Window,exact:()=>boolean):boolean{
 const tree=[...extra],seen=new Set<Element>();let n:Element|null=start
 while(n){if(seen.has(n))return false;seen.add(n);tree.push(n);if(n===owner)break;const a:ParentNode|null=n.parentNode;n=a&&a.nodeType===1?a as Element:null}
 if(n!==owner)return false
 const parents=new Map(tree.map(v=>[v,v.parentNode]))
 const valid=(v:Element)=>{const s=view.getComputedStyle(v);return v.isConnected&&v.ownerDocument===doc&&v.namespaceURI===NS&&(v===owner||(v as SVGElement).ownerSVGElement===owner)&&v.parentNode===parents.get(v)&&['mask','clip-path','transform','filter'].every(k=>v.getAttribute(k)===null)&&s.display!=='none'&&s.visibility==='visible'&&Number(s.opacity)===1&&Number(s.fillOpacity)===1&&s.transform==='none'&&s.filter==='none'&&s.clipPath==='none'&&['','none'].includes(s.getPropertyValue('mask-image'))&&s.mixBlendMode==='normal'&&['translate','rotate','scale'].every(k=>['','none'].includes(s.getPropertyValue(k)))}
 return exact()&&tree.every(valid)&&doc.defaultView===view&&view.document===doc&&exact()&&tree.every(v=>v.isConnected&&v.parentNode===parents.get(v))
}
export const REVIEWED_U83F0_LOCAL_POINT_WINDOW_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u83f0-local-components-2026-10-27/fixtures-draft.json":"80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485","docs/hanja-source-original-u83f0-local-components-2026-10-27/baseline-onset-conditions-review.json":"75ac07ee87d836ad6e889a48b726c8344a6bfc34747523e0ee7a2d4962c86033","docs/hanja-source-original-u83f0-local-components-2026-10-27/var-dyadic-input-reuse-review.json":"1874e6e00f9522abd62eb85cddb25ec76529beb8597b181fa4acc03717513816","docs/hanja-source-original-u83f0-var-001-2026-10-27/q-dyadic-joint-conditions-proof.json":"b5c078205f638248d69166e3814090590bb0dcd7873aa4026ed2492ca6c1fece","docs/hanja-source-original-u83f0-local-components-2026-10-27/verify-baseline-onset-conditions.py":"35b0d7f372a2ed37052ebbbd1b116e951786fe80a5d70798c95659cfc85a63cf","docs/hanja-source-original-u7443-g-2026-10-26/verify-curve-union-start-kernels.py":"95286fc3de0d18ff96735263582095325f7d9afa00bbd2c3a0ea42e03caf2396"})
export const REVIEWED_U83F0_LOCAL_POINT_WINDOWS=freeze({"glyph":"菰","root":"lingo-u83f0-components-v1","locallyAuthoredRoot":true,"mixedParts":true,"originalPublicWholeClaim":false,"fixtureSHA256":"80df51355acb56c1b1d69fe5c67e866fb1d484f325e361d91a0b582e3ea11485","geometrySHA256":"efbf229cb5e874b17bb812b380408f71dccd6734a2653eda26d207cbaab50606","targetPens":[5,6,7,10],"targets":[{"pen":5,"mask":2,"sourceT":0.0625,"anchor":[36.4875,34.177734375],"priorRequired":true},{"pen":6,"mask":2,"sourceT":0.25,"anchor":[23.9875,87.9375],"priorRequired":true},{"pen":7,"mask":1,"sourceT":0,"anchor":[7.9,65.25],"priorRequired":false},{"pen":10,"mask":2,"sourceT":0.125,"anchor":[62.0640234375,88.5775],"priorRequired":true}],"sourcePOrQOrBoundsOrWidthOrWeightChanged":false,"geometryFamily":"strict union kernel + nested convex homothetic rectangle containing anchor","sourceQ0IdentityOnlyAtPen7":true,"sourceQForwardTimingApproved":false,"authorClock":"source-author-kernel-point-rectangle","previewOnly":true,"appRendererConnected":false,"nativeApproval":false,"runtimeApplied":false})
