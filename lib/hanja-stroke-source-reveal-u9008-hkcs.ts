/** Original-public HKCS 逈: five source-preserving draft windows; mask10m2 remains HOLD. No original-clock, app or native approval. */
import {outlineSegmentProgress,outlineClip,type HanjaOutlineSegment,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import fixture from '../docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json' with {type:'json'}
const FIXED=fixture.u9008,STROKES=FIXED.strokes as HanjaOutlineStrokes
const NS='http://www.w3.org/2000/svg',PREFIX='data-u9008-hkcs-source-reveal-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
freeze(FIXED)
export type ReviewedU9008HkcsSourceRevealContext=Readonly<{id:'u9008-hkcs-original-10-source-reveal'}>
const CONTEXT:ReviewedU9008HkcsSourceRevealContext=Object.freeze({id:'u9008-hkcs-original-10-source-reveal'})
export function makeReviewedU9008HkcsSourceRevealContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU9008HkcsSourceRevealContext|null{
 try{return arguments.length===3&&same(proof,FIXED.fullProof)&&same(identity,FIXED.identity)&&same(strokes,STROKES)?CONTEXT:null}catch{return null}
}
export type ReviewedU9008HkcsSourceRevealPolicy=Readonly<{id:string;kind:'source-point-window-u9008-hkcs'|'source-mask-y-prefix-u9008-hkcs';pen:1|3|7|8|10;mask:1|3;segment:HanjaOutlineSegment;anchor:readonly[number,number];sourceBounds:readonly number[];sourceT:0|0.25;axisStart?:number;axisFinish?:number;priorRequired:boolean;priorSegment:HanjaOutlineSegment|null;proofFingerprint:string;previewOnly:true}>
const POLICIES:readonly ReviewedU9008HkcsSourceRevealPolicy[]=freeze([
{...{"id":"u9008-hkcs-mask-y-prefix-1-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":1,"mask":1,"anchor":[61.75,9.432500000000001],"sourceT":0,"axisStart":8.2,"axisFinish":24.25,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},segment:STROKES[0][0],sourceBounds:STROKES[0][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u9008-hkcs-mask-y-prefix-7-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":7,"mask":1,"anchor":[13,10.5],"sourceT":0,"axisStart":10.25,"axisFinish":24.6,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},segment:STROKES[6][0],sourceBounds:STROKES[6][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u9008-hkcs-mask-y-prefix-8-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":8,"mask":1,"anchor":[10,28.5],"sourceT":0,"axisStart":28.25,"axisFinish":42.6,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},segment:STROKES[7][0],sourceBounds:STROKES[7][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u9008-hkcs-mask-y-prefix-10-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":10,"mask":1,"anchor":[8,89.5],"sourceT":0,"axisStart":92.55,"axisFinish":76.6,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},segment:STROKES[9][0],sourceBounds:STROKES[9][0].bounds,priorSegment:null,previewOnly:true},
{...{"id":"u9008-hkcs-point-window-3-3","kind":"source-point-window-u9008-hkcs","pen":3,"mask":3,"anchor":[84.0475,73.8375],"sourceT":0.25,"priorRequired":true,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},segment:STROKES[2][2],sourceBounds:STROKES[2][2].bounds,priorSegment:STROKES[2][1],previewOnly:true}
]as const)
const PRIVATE=new WeakSet<object>(POLICIES)
export function reviewedU9008HkcsSourceRevealPolicy(context:ReviewedU9008HkcsSourceRevealContext|null,pen:number,mask:number):ReviewedU9008HkcsSourceRevealPolicy|null{
 return context===CONTEXT?POLICIES.find(p=>p.pen===pen+1&&p.mask===mask+1)??null:null
}
function source(policy:ReviewedU9008HkcsSourceRevealPolicy,segment:HanjaOutlineSegment){
 if(!policy||!PRIVATE.has(policy)||!same(segment,policy.segment))throw Error('Private 逈 local policy and unchanged source P/Q/bounds/width/weight required')
}
export type ReviewedU9008HkcsSourceRevealFrame=Readonly<{
 policyId:string;progress:number;phase:'empty'|'source-kernel-point-window'|'source-mask-y-prefix'|'full';visible:boolean;originalPDirect:boolean;
 outline:string|null;clip:Readonly<{x:number;y:number;width:number;height:number}>|null;
 sourceGuide:string;sourceWidth:14;anchorIsOriginalQ0:boolean;sourceT:number;priorOpaque:boolean;previewOnly:true;authorClock:'source-author-kernel-point-rectangle'|'source-author-mask-y-prefix';originalClockEquivalent:false;UARead:false
}>
export function sampleReviewedU9008HkcsSourceRevealFrame(policy:ReviewedU9008HkcsSourceRevealPolicy,segment:HanjaOutlineSegment,p:number,priorProgress=0,priorOpaque=false):ReviewedU9008HkcsSourceRevealFrame{
 source(policy,segment)
 if(!Number.isFinite(p)||p<0||p>1)throw Error('Finite unit authored 逈 progress required')
 if(!Number.isFinite(priorProgress)||priorProgress<0||priorProgress>1||typeof priorOpaque!=='boolean')throw Error('Exact unit prior progress and actual DOM guard boolean required')
 if(p>0&&policy.priorRequired&&(priorProgress!==1||!priorOpaque))throw Error('Current-frame exact completed prior original P must be opaque')
 const [ax,ay]=policy.anchor,[x0,y0,x1,y1]=policy.sourceBounds
 const clip=p>0&&p<1?Object.freeze(policy.kind==='source-mask-y-prefix-u9008-hkcs'?policy.axisFinish!>policy.axisStart!?{x:x0,y:policy.axisStart!,width:x1-x0,height:(policy.axisFinish!-policy.axisStart!)*p}:{x:x0,y:policy.axisStart!+(policy.axisFinish!-policy.axisStart!)*p,width:x1-x0,height:(policy.axisStart!-policy.axisFinish!)*p}:{x:ax+(x0-ax)*p,y:ay+(y0-ay)*p,width:(x1-x0)*p,height:(y1-y0)*p}):null
 return Object.freeze({policyId:policy.id,progress:p,phase:p===0?'empty':p===1?'full':policy.kind==='source-mask-y-prefix-u9008-hkcs'?'source-mask-y-prefix':'source-kernel-point-window',visible:p>0,originalPDirect:p===1,outline:p===0?null:segment.outline,clip,sourceGuide:segment.revealPath!,sourceWidth:14,anchorIsOriginalQ0:false,sourceT:policy.sourceT,priorOpaque:policy.priorRequired?priorOpaque:false,previewOnly:true,authorClock:policy.kind==='source-mask-y-prefix-u9008-hkcs'?'source-author-mask-y-prefix':'source-author-kernel-point-rectangle',originalClockEquivalent:false,UARead:false})
}
export type ReviewedU9008HkcsSourceRevealNodes={group:SVGGElement|null;ink:SVGPathElement|null;rect:SVGRectElement|null;clipPath:SVGClipPathElement|null}
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
/** Current-frame canonical render equivalence only, not stylesheet-origin purity. Collapsed nonnegative boxes are valid; source window coordinates never change. */
function canonicalRectGeometry(owner:SVGSVGElement,doc:Document,view:Window,shape:Readonly<{x:number;y:number;width:number;height:number}>){
 const host=doc.createElementNS(NS,'g'),probe=doc.createElementNS(NS,'rect'),keys=['x','y','width','height']as const
 const neutral={display:'inline',visibility:'hidden',opacity:'0',fill:'none',stroke:'none',transform:'none',filter:'none','clip-path':'none','mask-image':'none',translate:'none',rotate:'none',scale:'none',animation:'none',transition:'none'}
 for(const node of[host,probe])for(const[k,v]of Object.entries(neutral))node.style.setProperty(k,v,'important')
 for(const k of keys){probe.setAttribute(k,String(shape[k]));probe.style.setProperty(k,String(shape[k])+'px','important')}
 const inline=new Map(keys.map(k=>[k,probe.style.getPropertyValue(k)]))
 host.appendChild(probe)
 try{
  owner.appendChild(host)
  const exact=()=>host.parentNode===owner&&probe.parentNode===host&&host.children.length===1&&host.children[0]===probe&&host.ownerSVGElement===owner&&probe.ownerSVGElement===owner&&host.ownerDocument===doc&&probe.ownerDocument===doc&&host.isConnected&&probe.isConnected&&doc.defaultView===view&&view.document===doc&&keys.every(k=>probe.getAttribute(k)===String(shape[k])&&probe.style.getPropertyPriority(k)==='important'&&inline.get(k)!==''&&probe.style.getPropertyValue(k)===inline.get(k))
  if(!exact())throw Error('Connected isolated canonical SVG rectangle required')
  for(const node of[host,probe]){
   const style=view.getComputedStyle(node)
   if(style.display==='none'||style.visibility!=='hidden'||Number(style.opacity)!==0||style.fill!=='none'||style.stroke!=='none'||style.transform!=='none'||style.filter!=='none'||style.clipPath!=='none'||!['','none'].includes(style.getPropertyValue('mask-image'))||['translate','rotate','scale'].some(k=>!['','none'].includes(style.getPropertyValue(k))))throw Error('Canonical rectangle probe must have no paint or effects')
  }
  const computed=view.getComputedStyle(probe),css=new Map(keys.map(k=>[k,computed.getPropertyValue(k)])),b=probe.getBBox(),bounds={x:b.x,y:b.y,width:b.width,height:b.height}
  if([...css.values()].some(v=>!v.endsWith('px')||!Number.isFinite(Number(v.slice(0,-2))))||!Object.values(bounds).every(Number.isFinite)||bounds.width<0||bounds.height<0||!exact())throw Error('Finite nonnegative browser-canonical rectangle required')
  return{css,bounds}
 }finally{host.remove()}
}
/** New authored clock only: a strict union-kernel anchor plus nested convex rectangles containing it gives a star-shaped connected P intersection. This does not establish source-Q forward timing. This mask3 policy requires the exact previous mask2 full opaque in this actual owner/frame. */
function projectedOwnerCount(policy:ReviewedU9008HkcsSourceRevealPolicy,p:number,prior:number,logical:number,g:SVGGElement|null,frameId:string):number|null{
 if(!g||!frameId||g.getAttribute(PREFIX+'frame')!==frameId||!Number.isFinite(logical)||logical<0||logical>1||g.getAttribute(PREFIX+'logical-progress')!==String(logical))return null
 const segments=STROKES[policy.pen-1],amounts=outlineSegmentProgress(segments,logical),target=policy.mask-1,slot=g.parentNode as SVGGElement|null,id=g.getAttribute(PREFIX+'clip')
 if(!slot||!id||!id.endsWith('-'+(policy.pen-1)+'-'+target)||amounts.length!==segments.length||amounts[target]!==p||(target?amounts[target-1]:0)!==prior)return null
 const indices=amounts.map((v,i)=>i===target||v>0?i:-1).filter(i=>i>=0)
 if(slot.children.length!==indices.length||slot.children[indices.indexOf(target)]!==g)return null
 for(let position=0;position<indices.length;position++){
  const i=indices[position];if(i===target)continue
  const node:Element=slot.children[position],segment=segments[i],owner=g.ownerSVGElement
  if(!node||!node.isConnected||node.ownerDocument!==g.ownerDocument||(node as SVGElement).ownerSVGElement!==owner||node.parentNode!==slot)return null
  if(amounts[i]===1){if(node.localName!=='path'||node.getAttribute('d')!==segment.outline||['clip-path','mask','pathLength','stroke-dasharray','stroke-dashoffset'].some(k=>node.getAttribute(k)!==null))return null}
  else{
   const defs=node.children[0],path=node.children[1],clip=defs?.children[0],guide=clip?.children[0],clipId=id.slice(0,id.lastIndexOf('-')+1)+i
   if(node.localName!=='g'||node.children.length!==2||defs?.localName!=='defs'||defs.children.length!==1||path?.localName!=='path'||path.getAttribute('d')!==segment.outline)return null
   // This is exact projection of the unchanged generic mask, not approval of that mask's reveal or start cap.
   if(segment.direction==='curve'){
    if(clip?.localName!=='mask'||clip.id!==clipId||clip.children.length!==1||[['maskUnits','userSpaceOnUse'],['x','0'],['y','0'],['width','100'],['height','100']].some(([k,v])=>clip.getAttribute(k)!==v)||guide?.localName!=='path'||guide.getAttribute('d')!==segment.revealPath||[['fill','none'],['stroke','white'],['stroke-width',String(segment.revealWidth)],['stroke-linecap','round'],['pathLength','1'],['stroke-dasharray',String(amounts[i])+' 2'],['stroke-dashoffset','0']].some(([k,v])=>guide.getAttribute(k)!==v)||path.getAttribute('mask')!=='url(#'+clipId+')'||path.hasAttribute('clip-path'))return null
   }else{
    const shape=outlineClip(segment,amounts[i]);if(path.getAttribute('clip-path')!=='url(#'+clipId+')'||path.hasAttribute('mask')||clip?.localName!=='clipPath'||clip.id!==clipId||clip.children.length!==1||guide?.localName!=='rect'||Object.entries(shape).some(([k,v])=>guide.getAttribute(k)!==String(v)))return null
   }
  }
 }
 return indices.length
}
export function commitReviewedU9008HkcsSourceReveal(policy:ReviewedU9008HkcsSourceRevealPolicy,segment:HanjaOutlineSegment,progress:number,clipId:string,nodes:ReviewedU9008HkcsSourceRevealNodes,priorProgress=0,logicalProgress=NaN,frameId=''){
 const {group:g,ink:p,rect:r,clipPath:c}=nodes
 const reset=()=>{p?.setAttribute('visibility','hidden');p?.setAttribute(PREFIX+'committed','false')}
 reset()
 try{
  const f=sampleReviewedU9008HkcsSourceRevealFrame(policy,segment,progress,priorProgress,verifyReviewedU9008HkcsSourceRevealPriorDOM(policy,g,progress,priorProgress,logicalProgress,frameId))
  if(!g||!p||!r||!c||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-'+(policy.pen-1)+'-'+(policy.mask-1)))throw Error('Exact 逈 target nodes and id required')
  const owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,defs=c.parentNode,pen=g.parentNode,outer=pen?.parentNode
  if(!owner||!view||view.document!==doc||!defs||!pen||!outer||defs.nodeType!==1||pen.nodeType!==1||outer.nodeType!==1)throw Error('Connected 逈 SVG owner tree required')
  const d=defs as SVGDefsElement,slot=pen as SVGGElement,outlines=outer as SVGGElement,key=clipId+'-u9008-hkcs-source-reveal-clip'
  const shape=f.clip??{x:policy.anchor[0],y:policy.anchor[1],width:0,height:0}
  for(const [k,v]of Object.entries(shape))r.setAttribute(k,String(v))
  if(f.originalPDirect)p.removeAttribute('clip-path');else p.setAttribute('clip-path','url(#'+key+')')
  const canonical=canonicalRectGeometry(owner,doc,view,shape),expectedCSS=canonical.css
  const tree:Element[]=[g,p,d,c,r],seen=new Set<Element>();let n:Element|null=slot
  while(n){if(seen.has(n))throw Error('Cyclic 逈 owner');seen.add(n);tree.push(n);if(n===owner)break;const parent:ParentNode|null=n.parentNode;n=parent&&parent.nodeType===1?parent as Element:null}
  if(n!==owner)throw Error('Disconnected 逈 SVG chain')
  const parents=new Map(tree.map(node=>[node,node.parentNode]))
  const exact=(visibility:string,committed:boolean)=>g.localName==='g'&&p.localName==='path'&&r.localName==='rect'&&c.localName==='clipPath'&&d.localName==='defs'&&d.parentNode===g&&c.parentNode===d&&r.parentNode===c&&c.children.length===1&&c.children[0]===r&&p.parentNode===g&&g.children.length===2&&g.children[0]===d&&g.children[1]===p&&projectedOwnerCount(policy,progress,priorProgress,logicalProgress,g,frameId)===slot.children.length&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')===String(policy.pen)&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===10&&outlines.children[policy.pen-1]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'clip')===clipId&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')===String(priorProgress)&&p.getAttribute('d')===segment.outline&&p.getAttribute('pathLength')===null&&p.getAttribute('stroke-dasharray')===null&&p.getAttribute('stroke-dashoffset')===null&&p.getAttribute('mask')===null&&p.getAttribute('visibility')===visibility&&p.getAttribute(PREFIX+'committed')===String(committed)&&p.getAttribute('clip-path')===(f.originalPDirect?null:'url(#'+key+')')&&c.getAttribute('id')===key&&c.getAttribute('clipPathUnits')==='userSpaceOnUse'&&Object.entries(shape).every(([k,v])=>r.getAttribute(k)===String(v))
  const stable=(visibility:string,committed:boolean)=>{
   if(progress>0&&policy.priorRequired&&!verifyReviewedU9008HkcsSourceRevealPriorDOM(policy,g,progress,priorProgress,logicalProgress,frameId))return false
   if(!exact(visibility,committed)||owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
   for(const node of tree){
    if(!node.isConnected||node.ownerDocument!==doc||(node!==owner&&(node as SVGElement).ownerSVGElement!==owner)||node.namespaceURI!==NS||node.parentNode!==parents.get(node)||['transform','filter','mask'].some(k=>node.getAttribute(k)!==null)||(node!==p&&node.getAttribute('clip-path')!==null))return false
    const s=view.getComputedStyle(node)
    if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||(node!==p&&s.clipPath!=='none')||!['','none'].includes(s.getPropertyValue('mask-image'))||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k))))return false
   }
   const rs=view.getComputedStyle(r)
   if([...expectedCSS].some(([k,v])=>r.style.getPropertyValue(k)!==''||rs.getPropertyValue(k)!==v))return false
   const actualBox=r.getBBox()
   if(!(['x','y','width','height']as const).every(k=>Number.isFinite(actualBox[k])&&actualBox[k]===canonical.bounds[k]))return false
   const paint=view.getComputedStyle(p)
   if(paint.stroke!=='none'||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||!opaqueRGB(paint.fill)||paint.visibility!==visibility||!cssSourcePath(doc,paint.getPropertyValue('d').trim(),segment.outline))return false
   return exact(visibility,committed)&&tree.every(node=>node.isConnected&&node.ownerDocument===doc&&node.parentNode===parents.get(node)&&(node===owner||(node as SVGElement).ownerSVGElement===owner))
  }
  if(!stable('hidden',false))throw Error('Changed 逈 source/coordinates/rectangle')
  for(const [k,v]of Object.entries({progress,phase:f.phase,'direct-original':f.originalPDirect,'source-full':f.originalPDirect,'one-ink':true,'source-subpaths':(segment.outline.match(/M/g)||[]).length,'ua-read':false}))p.setAttribute(PREFIX+k,String(v))
  if(!stable('hidden',false))throw Error('Changed 逈 pre-visibility binding')
  p.setAttribute(PREFIX+'committed','true');p.setAttribute('visibility',f.visible?'visible':'hidden')
  if(!stable(f.visible?'visible':'hidden',true))throw Error('Changed 逈 visibility commit')
  return {status:progress===0?'empty' as const:progress===1?'complete' as const:'visible' as const,error:null,frame:f,cleanup:reset}
 }catch(error){reset();return {status:'hidden' as const,error:error instanceof Error?error.message:'Invalid source point-window DOM binding',frame:null,cleanup:reset}}
}

export function verifyReviewedU9008HkcsSourceRevealPriorDOM(policy:ReviewedU9008HkcsSourceRevealPolicy,g:SVGGElement|null,p:number,priorProgress:number,logicalProgress=NaN,frameId=''):boolean{
 try{
  source(policy,policy.segment);if(!Number.isFinite(p)||p<0||p>1||!policy.priorRequired||!policy.priorSegment||priorProgress!==1||!g)return false
  const slot=g.parentNode,outer=slot?.parentNode,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView
  if(!slot||!outer||slot.nodeType!==1||outer.nodeType!==1||!owner||!view||view.document!==doc)return false
  const pen=slot as SVGGElement,outlines=outer as SVGGElement,H=pen.children[policy.mask-2]as SVGPathElement|undefined
  if(!H)return false
  const exact=()=>g.parentNode===pen&&projectedOwnerCount(policy,p,priorProgress,logicalProgress,g,frameId)===pen.children.length&&pen.children[policy.mask-2]===H&&pen.getAttribute('data-outline-stroke')===String(policy.pen)&&pen.parentNode===outlines&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===10&&outlines.children[policy.pen-1]===pen&&H.parentNode===pen&&H.localName==='path'&&H.getAttribute('d')===policy.priorSegment!.outline&&owner.getAttribute('viewBox')==='0 0 100 100'&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(p)&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')==='1'
  if(!exact())return false
  return opaqueTree([g,H],pen,owner,doc,view,exact)&&opaqueSourcePath(H,policy.priorSegment.outline,doc,view)&&exact()
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
export const REVIEWED_U9008_HKCS_SOURCE_REVEAL_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json":"c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f","docs/hanja-source-original-u9008-hkcs-2026-10-27/onset-correction-conditions.json":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4","docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-prior-anchor-exclusion.json":"7b94dc3d44d0f60e300d43b17db9c2ca0ad1faf7e759fd0afd62281b7146335a","docs/hanja-source-original-u9008-hkcs-2026-10-27/native-baseline-review.json":"9c2848160ae009911d1d2f3bb55372f795324dcf44c37ba00f07d31b879ba060"})
export const REVIEWED_U9008_HKCS_SOURCE_REVEAL_INPUT=Object.freeze({fullProof:FIXED.fullProof,identity:FIXED.identity,strokes:STROKES})
export const REVIEWED_U9008_HKCS_SOURCE_REVEAL=freeze({"glyph":"逈","root":"hkcs_m9008","catalogStrokes":9,"playbackStrokes":10,"fixtureSHA256":"c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f","compiledSHA256":"0ea0ea47896a94ac45a2ebb912d9c2c8f85610ee81d8609cd3706587036d881d","targets":[{"id":"u9008-hkcs-mask-y-prefix-1-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":1,"mask":1,"anchor":[61.75,9.432500000000001],"sourceT":0,"axisStart":8.2,"axisFinish":24.25,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},{"id":"u9008-hkcs-mask-y-prefix-7-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":7,"mask":1,"anchor":[13,10.5],"sourceT":0,"axisStart":10.25,"axisFinish":24.6,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},{"id":"u9008-hkcs-mask-y-prefix-8-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":8,"mask":1,"anchor":[10,28.5],"sourceT":0,"axisStart":28.25,"axisFinish":42.6,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},{"id":"u9008-hkcs-mask-y-prefix-10-1","kind":"source-mask-y-prefix-u9008-hkcs","pen":10,"mask":1,"anchor":[8,89.5],"sourceT":0,"axisStart":92.55,"axisFinish":76.6,"priorRequired":false,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"},{"id":"u9008-hkcs-point-window-3-3","kind":"source-point-window-u9008-hkcs","pen":3,"mask":3,"anchor":[84.0475,73.8375],"sourceT":0.25,"priorRequired":true,"proofFingerprint":"fb7a9c12a0cab639fa8839074191067a05975f448decd4d447c07c69cccbc6e4"}],"heldTargets":[{"pen":10,"mask":2,"reason":"Original C has no point in completed previous Q; X-prefix initial boundary also outside previous ink.","proof":"docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-prior-anchor-exclusion.json","SHA256":"7b94dc3d44d0f60e300d43b17db9c2ca0ad1faf7e759fd0afd62281b7146335a"}],"sourcePGuideWidthWeightsChanged":false,"whole10Prefix":false,"tenFirstMaskUsesOnlyOwnOriginalWeightClock":true,"genericFutureMaskProjectionIsApproval":false,"previewOnly":true,"nativeApproval":false,"runtimeApplied":false})
