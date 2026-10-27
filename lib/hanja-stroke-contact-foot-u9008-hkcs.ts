/** Source-specific 逈10m2 draft; original P/C/width/weight unchanged. New author clock; native pending. */
import {outlineSegmentProgress,type HanjaOutlineSegment,type HanjaOutlineStrokes} from './hanja-stroke-outline.ts'
import {makeReviewedU9008HkcsSourceRevealContext,reviewedU9008HkcsSourceRevealPolicy,REVIEWED_U9008_HKCS_SOURCE_REVEAL_INPUT} from './hanja-stroke-source-reveal-u9008-hkcs.ts'
const INPUT=REVIEWED_U9008_HKCS_SOURCE_REVEAL_INPUT,STROKES=INPUT.strokes,SEGMENT=STROKES[9][1],PRIOR=STROKES[9][0]
const NS='http://www.w3.org/2000/svg',PREFIX='data-u9008-hkcs-contact-foot-',PRIOR_PREFIX='data-u9008-hkcs-source-reveal-'
function freeze<T>(v:T):T{if(v&&typeof v==='object')for(const d of Object.values(Object.getOwnPropertyDescriptors(v))){if('value'in d)freeze(d.value)}return Object.freeze(v)}
function same(a:unknown,b:unknown):boolean{
 if(Object.is(a,b))return true
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b)||Object.getPrototypeOf(a)!==Object.getPrototypeOf(b))return false
 const ak=Reflect.ownKeys(a),bk=Reflect.ownKeys(b)
 return ak.length===bk.length&&bk.every(k=>{const x=Object.getOwnPropertyDescriptor(a,k),y=Object.getOwnPropertyDescriptor(b,k);return!!x&&!!y&&'value'in x&&'value'in y&&x.enumerable===y.enumerable&&same(x.value,y.value)})
}
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
const PRIOR_CONTEXT=makeReviewedU9008HkcsSourceRevealContext(INPUT.fullProof,INPUT.identity,STROKES),PRIOR_POLICY=reviewedU9008HkcsSourceRevealPolicy(PRIOR_CONTEXT,9,0)!
const AUX=freeze([{"triangleOneBased":2,"parentTriangleOneBased":null,"vertices":[[27.4,76.14545454545454],[27.4,78.85],[25.45,75.65]],"seed":[26.40435809385333,77.03760046170802],"weight":0.7879456706281833},{"triangleOneBased":1,"parentTriangleOneBased":2,"vertices":[[25.45,75.65],[26.15,75.1],[27.4,76.14545454545454]],"seed":[26.425,75.89772727272727],"weight":0.21205432937181665}] as const)
const CONTEXT=Object.freeze({id:'u9008-hkcs-original-10-contact-foot' as const})
export type ReviewedU9008HkcsContactFootContext=typeof CONTEXT
export function makeReviewedU9008HkcsContactFootContext(proof:unknown,identity:unknown,strokes:HanjaOutlineStrokes):ReviewedU9008HkcsContactFootContext|null{return arguments.length===3&&makeReviewedU9008HkcsSourceRevealContext(proof,identity,strokes)?CONTEXT:null}
const POLICY=freeze({id:'u9008-hkcs-contact-foot-10-2',kind:'source-contact-foot-cubic-x-u9008-hkcs',pen:10,mask:2,segment:SEGMENT,predecessor:PRIOR,cut:27.4,maxX:93.5,phaseShare:0.009583490753151732,proofFingerprint:'87cf861aa60f1832f4731d18ff111a4a2d1877aab3a4f36d0b240d22fe1d7bad',previewOnly:true}as const)
export type ReviewedU9008HkcsContactFootPolicy=typeof POLICY
export function reviewedU9008HkcsContactFootPolicy(context:ReviewedU9008HkcsContactFootContext|null,pen:number,mask:number):ReviewedU9008HkcsContactFootPolicy|null{return context===CONTEXT&&pen===9&&mask===1?POLICY:null}
function source(policy:ReviewedU9008HkcsContactFootPolicy){if(policy!==POLICY||!PRIOR_POLICY)throw Error('Private exact original contact-foot source required')}
export type ReviewedU9008HkcsContactFootSample=Readonly<{sourceGuide:string;L:number;d:number;start:Readonly<{x:number;y:number}>;end:Readonly<{x:number;y:number}>;point:Readonly<{x:number;y:number}>}>
export type ReviewedU9008HkcsContactFootFrame=Readonly<{policyId:string;progress:number;phase:'empty'|'foot'|'body'|'full';footPathD:string;footFullTriangles:number;footLocal:number;bodyProgress:number;threshold:number;bodyRect:Readonly<{x:number;y:number;width:number;height:number}>|null;originalPDirect:boolean;UARead:boolean;L:number|null;d:number|null;point:Readonly<{x:number;y:number}>|null;authorClock:'source-contact-foot-then-original-cubic-x';originalClockEquivalent:false}>
function trianglePath(vertices:readonly(readonly number[])[]){return vertices.map((v,i)=>(i?'L':'M')+v[0]+' '+v[1]).join(' ')+' Z'}
function footFrame(progress:number){
 if(progress===0)return{d:'',full:0,local:0}
 if(progress===1)return{d:AUX.map(t=>trianglePath(t.vertices)).join(' '),full:2,local:1}
 const split=AUX[0].weight,second=progress>split,index=second?1:0,local=second?(progress-split)/(1-split):progress/split,t=AUX[index],partial=t.vertices.map(v=>[t.seed[0]+(v[0]-t.seed[0])*local,t.seed[1]+(v[1]-t.seed[1])*local])
 return{d:(second?trianglePath(AUX[0].vertices)+' ':'')+trianglePath(partial),full:second?1:local===1?1:0,local}
}
export function sampleReviewedU9008HkcsContactFootFrame(policy:ReviewedU9008HkcsContactFootPolicy,progress:number,sample?:ReviewedU9008HkcsContactFootSample):ReviewedU9008HkcsContactFootFrame{
 source(policy);if(!Number.isFinite(progress)||progress<0||progress>1)throw Error('Finite original local mask progress0..1 required')
 const phase=progress===0?'empty':progress===1?'full':progress<=policy.phaseShare?'foot':'body',bodyProgress=phase==='body'?(progress-policy.phaseShare)/(1-policy.phaseShare):phase==='full'?1:0,foot=footFrame(phase==='foot'?progress/policy.phaseShare:phase==='body'?1:0)
 let threshold=phase==='full'?policy.maxX:policy.cut,L:number|null=null,d:number|null=null,point:Readonly<{x:number;y:number}>|null=null
 if(phase==='body'){
  if(!sample||sample.sourceGuide!==SEGMENT.revealPath||!Number.isFinite(sample.L)||sample.L<=0||sample.d!==bodyProgress*sample.L||![sample.start.x,sample.start.y,sample.end.x,sample.end.y,sample.point.x,sample.point.y].every(Number.isFinite)||sample.start.x!==25.5||sample.start.y!==75||sample.end.x!==88||sample.end.y!==88)throw Error('Exact same original cubic native sample required')
  const fraction=(sample.point.x-sample.start.x)/(sample.end.x-sample.start.x);if(!Number.isFinite(fraction)||fraction<0||fraction>1)throw Error('Monotone original cubic X range required')
  threshold=policy.cut+(policy.maxX-policy.cut)*fraction;L=sample.L;d=sample.d;point=Object.freeze({...sample.point})
 }
 const b=SEGMENT.bounds,bodyRect=phase==='body'?Object.freeze({x:b[0],y:b[1],width:threshold-b[0],height:b[3]-b[1]}):null
 return Object.freeze({policyId:policy.id,progress,phase,footPathD:foot.d,footFullTriangles:foot.full,footLocal:foot.local,bodyProgress,threshold,bodyRect,originalPDirect:phase==='full',UARead:false,L,d,point,authorClock:'source-contact-foot-then-original-cubic-x',originalClockEquivalent:false})
}
export type ReviewedU9008HkcsContactFootNodes={group:SVGGElement|null;ink:SVGPathElement|null;foot:SVGPathElement|null;body:SVGRectElement|null;mask:SVGMaskElement|null;measurement:SVGPathElement|null}
const FRAMES=new WeakMap<object,{policy:ReviewedU9008HkcsContactFootPolicy;path:SVGPathElement;exact:()=>boolean}>()
export function measureReviewedU9008HkcsContactFootFrame(policy:ReviewedU9008HkcsContactFootPolicy,progress:number,path:SVGPathElement|null):ReviewedU9008HkcsContactFootFrame{
 source(policy);if(!path||!path.ownerSVGElement||!path.isConnected)throw Error('Connected original C measurement required')
 const doc=path.ownerDocument,view=doc.defaultView,owner=path.ownerSVGElement,parent=path.parentNode,length=path.getTotalLength,point=path.getPointAtLength
 const exact=()=>!!view&&view.document===doc&&path.ownerDocument===doc&&path.ownerSVGElement===owner&&path.isConnected&&path.parentNode===parent&&path.localName==='path'&&path.getAttribute('d')===SEGMENT.revealPath&&path.getAttribute('fill')==='none'&&path.getAttribute('stroke')==='none'&&path.getAttribute('visibility')==='hidden'&&!path.hasAttribute('transform')&&!path.hasAttribute('pathLength')&&path.getTotalLength===length&&path.getPointAtLength===point&&cssSourcePath(doc,view.getComputedStyle(path).getPropertyValue('d'),SEGMENT.revealPath!)&&view.getComputedStyle(path).fill==='none'&&view.getComputedStyle(path).stroke==='none'&&view.getComputedStyle(path).transform==='none'&&view.getComputedStyle(path).filter==='none'
 if(!exact())throw Error('Original same-frame C measurement changed')
 let sample:ReviewedU9008HkcsContactFootSample|undefined
 if(progress>policy.phaseShare&&progress<1){const L=length.call(path);if(!Number.isFinite(L)||L<=0||!exact())throw Error('Finite stable native C length required');const start=point.call(path,0),end=point.call(path,L),d=(progress-policy.phaseShare)/(1-policy.phaseShare)*L,value=point.call(path,d);if(!exact()||length.call(path)!==L||!exact())throw Error('Changing original C native measurement');sample={sourceGuide:SEGMENT.revealPath!,L,d,start:{x:start.x,y:start.y},end:{x:end.x,y:end.y},point:{x:value.x,y:value.y}}}
 const raw=sampleReviewedU9008HkcsContactFootFrame(policy,progress,sample),frame=Object.freeze({...raw,UARead:raw.phase==='body'});FRAMES.set(frame,{policy,path,exact});return frame
}
function white(value:string){
 const match=/^rgba?[(]([^)]+)[)]$/.exec(value.trim());if(!match)return false
 const slash=match[1].split('/'),parts=slash[0].replaceAll(',',' ').trim().split(/ +/);let alpha:string|undefined=slash[1]?.trim();if(slash.length>2)return false;if(alpha===undefined&&parts.length===4)alpha=parts.pop()
 return parts.length===3&&parts.every(v=>v.endsWith('%')?Number(v.slice(0,-1))===100:Number(v)===255)&&(alpha===undefined||(alpha.endsWith('%')?Number(alpha.slice(0,-1))/100:Number(alpha))===1)
}
function canonicalMaskImage(owner:SVGSVGElement,doc:Document,view:Window,id:string){
 const g=doc.createElementNS(NS,'g'),probe=doc.createElementNS(NS,'rect'),value='url(#'+id+')',neutral={display:'inline',visibility:'hidden',opacity:'0',fill:'none',stroke:'none',transform:'none',filter:'none',translate:'none',rotate:'none',scale:'none',animation:'none',transition:'none'}
 for(const node of[g,probe])for(const[k,v]of Object.entries(neutral))node.style.setProperty(k,v,'important')
 for(const k of['x','y','width','height'])probe.setAttribute(k,'0');probe.style.setProperty('mask-image',value,'important');g.appendChild(probe)
 try{owner.appendChild(g);const exact=()=>g.parentNode===owner&&probe.parentNode===g&&g.isConnected&&probe.isConnected&&g.ownerSVGElement===owner&&probe.ownerSVGElement===owner&&probe.ownerDocument===doc&&doc.defaultView===view&&probe.style.getPropertyPriority('mask-image')==='important'&&probe.style.getPropertyValue('mask-image')!=='';if(!exact())throw Error('Connected canonical mask probe required');const result=view.getComputedStyle(probe).getPropertyValue('mask-image');if(!result||result==='none'||!exact())throw Error('Canonical source mask reference required');return result}finally{g.remove()}
}
function bound(policy:ReviewedU9008HkcsContactFootPolicy,progress:number,priorProgress:number,logical:number,frameId:string,g:SVGGElement|null){
 if(!g||g.getAttribute(PREFIX+'context')!==CONTEXT.id||!frameId||!Number.isFinite(logical)||logical<0||logical>1)return false
 const amounts=outlineSegmentProgress(STROKES[9],logical),slot=g.parentNode as SVGGElement|null,first=slot?.children[0]as SVGGElement|undefined,ink=first?.children[1]
 return amounts[0]===priorProgress&&amounts[1]===progress&&!!slot&&slot.children.length===2&&slot.children[1]===g&&!!first&&first.localName==='g'&&first.children.length===2&&first.children[0].localName==='defs'&&ink?.localName==='path'&&ink.getAttribute('d')===PRIOR.outline&&first.getAttribute('data-stroke-start-gate')===PRIOR_POLICY.id&&first.getAttribute('data-stroke-reveal-policy')===PRIOR_POLICY.kind&&first.getAttribute('data-stroke-reveal-progress')===String(priorProgress)&&first.getAttribute(PRIOR_PREFIX+'fingerprint')===PRIOR_POLICY.proofFingerprint&&first.getAttribute(PRIOR_PREFIX+'frame')===frameId&&first.getAttribute(PRIOR_PREFIX+'logical-progress')===String(logical)&&g.getAttribute('data-stroke-start-gate')===policy.id&&g.getAttribute('data-stroke-reveal-policy')===policy.kind&&g.getAttribute('data-stroke-reveal-progress')===String(progress)&&g.getAttribute(PREFIX+'fingerprint')===policy.proofFingerprint&&g.getAttribute(PREFIX+'prior-progress')===String(priorProgress)&&g.getAttribute(PREFIX+'logical-progress')===String(logical)&&g.getAttribute(PREFIX+'frame')===frameId
}
export function verifyReviewedU9008HkcsContactFootPriorDOM(policy:ReviewedU9008HkcsContactFootPolicy,progress:number,priorProgress:number,logical:number,frameId:string,g:SVGGElement|null):boolean{
 try{source(policy);if(priorProgress!==1||!bound(policy,progress,priorProgress,logical,frameId,g)||!g)return false
 const slot=g.parentNode as SVGGElement,outer=slot.parentNode as SVGGElement|null,owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,H=slot.children[0]as SVGGElement,ink=H.children[1]as SVGPathElement
 if(!outer||!owner||!view||view.document!==doc)return false
 const exact=()=>bound(policy,progress,priorProgress,logical,frameId,g)&&slot.parentNode===outer&&slot.getAttribute('data-outline-stroke')==='10'&&outer.getAttribute('data-stroke-outlines')==='true'&&outer.children.length===10&&outer.children[9]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&H.parentNode===slot&&ink.parentNode===H&&ink.getAttribute(PRIOR_PREFIX+'committed')==='true'&&ink.getAttribute('visibility')==='visible'&&['mask','clip-path','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)
 return exact()&&opaqueTree([g,H,ink],slot,owner,doc,view,exact)&&opaqueSourcePath(ink,PRIOR.outline,doc,view)&&exact()
 }catch{return false}
}
export function commitReviewedU9008HkcsContactFoot(policy:ReviewedU9008HkcsContactFootPolicy,progress:number,clipId:string,nodes:ReviewedU9008HkcsContactFootNodes,priorProgress:number,logical:number,frameId:string){
 const{group:g,ink,foot,body,mask,measurement}=nodes
 const hide=()=>{ink?.setAttribute('visibility','hidden');ink?.setAttribute(PREFIX+'committed','false');foot?.setAttribute('visibility','hidden');foot?.setAttribute('d','');body?.setAttribute('visibility','hidden')}
 hide()
 try{
  source(policy);if(!g||!ink||!foot||!body||!mask||!measurement||!/^[A-Za-z0-9_:.-]+$/.test(clipId)||!clipId.endsWith('-9-1')||!Number.isFinite(progress)||progress<0||progress>1||!bound(policy,progress,priorProgress,logical,frameId,g))throw Error('Exact current mask/progress/owner binding required')
  const defs=g.children[0],owner=g.ownerSVGElement,doc=g.ownerDocument,view=doc.defaultView,slot=g.parentNode as SVGGElement|null,outlines=slot?.parentNode as SVGGElement|null,maskId=clipId+'-u9008-foot-mask'
  if(!owner||!view||!slot||!outlines||view.document!==doc)throw Error('Connected original owner required')
  if(progress>0&&!verifyReviewedU9008HkcsContactFootPriorDOM(policy,progress,priorProgress,logical,frameId,g))throw Error('Same-frame actually opaque completed source-prefix prior required')
  const frame=measureReviewedU9008HkcsContactFootFrame(policy,progress,measurement),info=FRAMES.get(frame)!,b=SEGMENT.bounds,shape=frame.bodyRect??{x:b[0],y:b[1],width:0,height:b[3]-b[1]}
  foot.setAttribute('d',frame.footPathD);for(const[k,v]of Object.entries(shape))body.setAttribute(k,String(v))
  if(frame.originalPDirect)ink.removeAttribute('mask');else ink.setAttribute('mask','url(#'+maskId+')')
  const maskCSS=frame.originalPDirect?'none':canonicalMaskImage(owner,doc,view,maskId),canonical=canonicalRectGeometry(owner,doc,view,shape)
  const exact=()=>info.policy===policy&&info.path===measurement&&info.exact()&&bound(policy,progress,priorProgress,logical,frameId,g)&&g.children.length===2&&g.children[0]===defs&&g.children[1]===ink&&defs.localName==='defs'&&defs.children.length===2&&defs.children[0]===measurement&&defs.children[1]===mask&&measurement.parentNode===defs&&mask.parentNode===defs&&mask.localName==='mask'&&mask.children.length===2&&mask.children[0]===foot&&mask.children[1]===body&&foot.parentNode===mask&&body.parentNode===mask&&foot.localName==='path'&&body.localName==='rect'&&ink.localName==='path'&&ink.parentNode===g&&slot.parentNode===outlines&&slot.getAttribute('data-outline-stroke')==='10'&&outlines.getAttribute('data-stroke-outlines')==='true'&&outlines.children.length===10&&outlines.children[9]===slot&&owner.getAttribute('viewBox')==='0 0 100 100'&&ink.getAttribute('d')===SEGMENT.outline&&ink.getAttribute('mask')===(frame.originalPDirect?null:'url(#'+maskId+')')&&mask.id===maskId&&[['maskUnits','userSpaceOnUse'],['maskContentUnits','userSpaceOnUse'],['x','0'],['y','0'],['width','100'],['height','100']].every(([k,v])=>mask.getAttribute(k)===v)&&measurement.id===clipId+'-u9008-foot-measure'&&foot.id===clipId+'-u9008-foot-foot'&&body.id===clipId+'-u9008-foot-body'&&foot.getAttribute('d')===frame.footPathD&&Object.entries(shape).every(([k,v])=>body.getAttribute(k)===String(v))&&['clip-path','pathLength','stroke-dasharray','stroke-dashoffset'].every(k=>ink.getAttribute(k)===null)
  const tree=[g,defs,mask,foot,body,measurement,ink,slot,outlines,owner],parents=new Map(tree.map(n=>[n,n.parentNode]))
  const safe=()=>{
   if(!exact())return false
   if(progress>0&&!verifyReviewedU9008HkcsContactFootPriorDOM(policy,progress,priorProgress,logical,frameId,g))return false
   for(const n of tree){if(!n.isConnected||n.ownerDocument!==doc||n.parentNode!==parents.get(n)||(n!==owner&&(n as SVGElement).ownerSVGElement!==owner)||['transform','filter','clip-path'].some(k=>n.hasAttribute(k))||(n!==ink&&n.hasAttribute('mask')))return false;const s=view.getComputedStyle(n);if(s.display==='none'||s.transform!=='none'||s.filter!=='none'||s.clipPath!=='none'||Number(s.opacity)!==1||s.mixBlendMode!=='normal'||['translate','rotate','scale'].some(k=>!['','none'].includes(s.getPropertyValue(k)))||s.getPropertyValue('mask-image')!==(n===ink?maskCSS:'none'))return false}
   const paint=view.getComputedStyle(ink),footPaint=view.getComputedStyle(foot),bodyPaint=view.getComputedStyle(body),rect=view.getComputedStyle(body),bbox=body.getBBox()
   if(!opaqueRGB(paint.fill)||Number(paint.fillOpacity)!==1||paint.fillRule!=='nonzero'||paint.stroke!=='none'||!cssSourcePath(doc,paint.getPropertyValue('d'),SEGMENT.outline))return false
   if(foot.getAttribute('fill')!=='white'||body.getAttribute('fill')!=='white'||!white(footPaint.fill)||!white(bodyPaint.fill)||footPaint.stroke!=='none'||bodyPaint.stroke!=='none'||Number(footPaint.fillOpacity)!==1||Number(bodyPaint.fillOpacity)!==1||footPaint.fillRule!=='nonzero'||bodyPaint.fillRule!=='nonzero')return false
   const footD=footPaint.getPropertyValue('d');if(frame.footPathD?!cssSourcePath(doc,footD,frame.footPathD):!['','none'].includes(footD))return false
   if(view.getComputedStyle(mask).getPropertyValue('mask-type')!=='luminance'||Object.keys(shape).some(k=>rect.getPropertyValue(k)!==canonical.css.get(k as 'x'|'y'|'width'|'height')||!Number.isFinite(bbox[k as keyof DOMRect])||bbox[k as keyof DOMRect]!==canonical.bounds[k as keyof typeof canonical.bounds]))return false
   return exact()
  }
  if(!safe())throw Error('Changed source/contact-foot DOM or computed geometry')
  foot.setAttribute('visibility',frame.footPathD?'visible':'hidden');body.setAttribute('visibility',frame.bodyRect?'visible':'hidden');ink.setAttribute('visibility',progress>0?'visible':'hidden');ink.setAttribute(PREFIX+'committed','true')
  if(!safe()||view.getComputedStyle(ink).visibility!==(progress>0?'visible':'hidden')||view.getComputedStyle(foot).visibility!==(frame.footPathD?'visible':'hidden')||view.getComputedStyle(body).visibility!==(frame.bodyRect?'visible':'hidden'))throw Error('Changed paint during contact-foot visibility commit')
  return{status:'committed' as const,frame,cleanup:hide}
 }catch(error){hide();return{status:'hidden' as const,error:error instanceof Error?error.message:String(error),cleanup:hide}}
}

export const REVIEWED_U9008_HKCS_CONTACT_FOOT_INPUT=INPUT
export const REVIEWED_U9008_HKCS_CONTACT_FOOT_INPUT_SHA256=Object.freeze({"docs/hanja-source-original-u9008-hkcs-2026-10-27/fixtures-draft.json":"c9fce51a23da581bcd9b25bc7e2f5fbabd765b45c222926fafc2fcdaef92707f","docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-contact-foot-feasibility.json":"87cf861aa60f1832f4731d18ff111a4a2d1877aab3a4f36d0b240d22fe1d7bad","docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-foot-runtime-data.json":"2119c363447f2fc1c4a9e21196d5aab8f5df28b8c398825333cf515041a8042d","docs/hanja-source-original-u9008-hkcs-2026-10-27/derive-cubic-foot-runtime-data.py":"ddf54e46e99b3eb2d4b78453c6258524584e1694eaf15d6f02c770c30c2d5884","lib/hanja-stroke-source-reveal-u9008-hkcs.ts":"882c2c9fdf1d69ca3d23c2aa21e04da209526c0dce2765b9b89e9c72e69a213a"})
export const REVIEWED_U9008_HKCS_CONTACT_FOOT_SOURCE=freeze({"glyph":"逈","root":"hkcs_m9008","catalogStrokes":9,"playbackStrokes":10,"target":[10,2],"compiledSHA256":"0ea0ea47896a94ac45a2ebb912d9c2c8f85610ee81d8609cd3706587036d881d","sourceGuide":"M25.5 75 C33.5 85 42 90 88 88","sourceWeight":63.837685,"sourceWidth":14,"proof":"docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-contact-foot-feasibility.json","proofSHA256":"87cf861aa60f1832f4731d18ff111a4a2d1877aab3a4f36d0b240d22fe1d7bad","runtimeMaskData":"docs/hanja-source-original-u9008-hkcs-2026-10-27/cubic-foot-runtime-data.json","runtimeMaskDataSHA256":"2119c363447f2fc1c4a9e21196d5aab8f5df28b8c398825333cf515041a8042d","footTriangles":2,"phaseShareExact":"29450/3072993","sourcePGuideWidthWeightsChanged":false,"singleColoredOriginalInkPath":true,"auxiliaryMaskGraphicsOnly":["path","rect"],"wholeTargetPointForbidden":true,"originalCBodyXMonotone":true,"requiresActualCompletedSourcePrefixPrior":true,"sourceClockEquivalent":false,"footFirstInkPureDRApproved":false,"previewOnly":true,"nativeApproval":false,"runtimeApplied":false})
