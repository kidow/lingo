import type {HanjaOutlineSegment} from './hanja-stroke-outline'
import {measureReviewedU8fc5Frame,type ReviewedU8fc5Policy} from './hanja-stroke-start-caps-u8fc5.ts'
import {reviewedU8fc5TailFrame,type ReviewedU8fc5TailContext} from './hanja-stroke-original-up-tail-u8fc5.ts'

export type ReviewedU8fc5TailNodes={measurement:SVGPathElement|null;bodyClip:SVGPathElement|null;tailClip:SVGPathElement|null;guide:SVGPathElement|null;startCap:SVGCircleElement|null;endCap:SVGCircleElement|null;bodyFill:SVGPathElement|null;tailRect:SVGRectElement|null;ink:SVGPathElement|null}
/** One original ink path; a body-clip and original-UP-clip form its mask union. */
export function commitReviewedU8fc5Tail(context:ReviewedU8fc5TailContext|null,policy:ReviewedU8fc5Policy,segment:HanjaOutlineSegment,progress:number,id:string,n:ReviewedU8fc5TailNodes){
  const reset=()=>{n.ink?.setAttribute('visibility','hidden');n.bodyFill?.setAttribute('visibility','hidden');n.tailRect?.setAttribute('height','0');n.guide?.setAttribute('stroke-dasharray','0 2');n.startCap?.setAttribute('r','0');n.endCap?.setAttribute('r','0')}
  reset()
  try{
    const frame=reviewedU8fc5TailFrame(context,segment,progress)
    if(!/^[A-Za-z0-9_-]+$/.test(id)||policy.id!=='u8fc5-1-1')throw new Error('Exact 迅 composite target required')
    const{measurement,bodyClip,tailClip,guide,startCap,endCap,bodyFill,tailRect,ink}=n
    if(!measurement||!bodyClip||!tailClip||!guide||!startCap||!endCap||!bodyFill||!tailRect||!ink)throw new Error('Incomplete 迅 composite nodes')
    const defs=measurement.parentElement,target=defs?.parentElement,mask=bodyFill.parentElement,bodyGroup=guide.parentElement,tailGroup=tailRect.parentElement,owner=measurement.ownerSVGElement
    if(!owner||defs?.localName!=='defs'||target?.localName!=='g'||mask?.localName!=='mask'||bodyGroup?.localName!=='g'||tailGroup?.localName!=='g')throw new Error('Exact 迅 composite parents required')
    const doc=owner.ownerDocument,view=doc.defaultView
    if(!view||view.document!==doc)throw new Error('Connected 迅 composite document required')
    const parents=new Map<Element,Element|null>()
    for(const node of Object.values(n)){
      let x:Element|null=node
      const visited=new Set<Element>()
      while(x){if(visited.has(x)||x.namespaceURI!=='http://www.w3.org/2000/svg'||x.ownerDocument!==doc||!x.isConnected||(x!==owner&&(x as SVGElement).ownerSVGElement!==owner))throw new Error('Changed 迅 composite coordinate tree');visited.add(x);parents.set(x,x.parentElement);if(x===owner)break;x=x.parentElement}
      if(x!==owner)throw new Error('Detached 迅 composite node')
    }
    const exact=()=>{
      if(owner.ownerDocument!==doc||doc.defaultView!==view||view.document!==doc)return false
      for(const[node,parent]of parents){if(node.parentElement!==parent||!node.isConnected||node.ownerDocument!==doc||node.getAttribute('transform')!==null)return false;const s=view.getComputedStyle(node);if(s.transform!=='none'||['translate','rotate','scale'].some(k=>{const v=s.getPropertyValue(k);return v!==''&&v!=='none'}))return false}
      return measurement.parentElement===defs&&defs.parentElement===target&&target.getAttribute('data-stroke-start-gate')===policy.id&&target.getAttribute('data-u8fc5-progress')===String(frame.bodyProgress)&&target.getAttribute('data-u8fc5-composite-progress')===String(progress)&&target.getAttribute('data-u8fc5-clip')===id&&mask.parentElement===defs&&mask.getAttribute('id')===id+'-u8fc5-composite'&&mask.getAttribute('maskUnits')==='userSpaceOnUse'&&['x','y','width','height'].every((k,i)=>mask.getAttribute(k)===['0','0','100','100'][i])&&bodyGroup.parentElement===mask&&bodyGroup.getAttribute('clip-path')==='url(#'+id+'-u8fc5-body)'&&bodyGroup.getAttribute('id')===id+'-u8fc5-body-guide'&&guide.parentElement===bodyGroup&&startCap.parentElement===bodyGroup&&endCap.parentElement===bodyGroup&&guide.getAttribute('d')===segment.revealPath&&guide.getAttribute('pathLength')==='1'&&guide.getAttribute('stroke-width')==='14'&&guide.getAttribute('stroke-linecap')==='butt'&&guide.getAttribute('stroke-linejoin')==='miter'&&guide.getAttribute('stroke')==='white'&&startCap.getAttribute('fill')==='white'&&endCap.getAttribute('fill')==='white'&&bodyClip.getAttribute('d')===frame.bodyOutline&&bodyClip.parentElement?.localName==='clipPath'&&bodyClip.parentElement.parentElement===defs&&bodyClip.parentElement.getAttribute('id')===id+'-u8fc5-body'&&bodyClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&tailClip.getAttribute('d')===frame.tailOutline&&tailClip.parentElement?.localName==='clipPath'&&tailClip.parentElement.parentElement===defs&&tailClip.parentElement.getAttribute('id')===id+'-u8fc5-up'&&tailClip.parentElement.getAttribute('clipPathUnits')==='userSpaceOnUse'&&bodyFill.parentElement===mask&&bodyFill.getAttribute('d')===frame.bodyOutline&&bodyFill.getAttribute('fill')==='white'&&tailGroup.parentElement===mask&&tailGroup.getAttribute('clip-path')==='url(#'+id+'-u8fc5-up)'&&tailRect.parentElement===tailGroup&&tailRect.getAttribute('x')==='86'&&tailRect.getAttribute('width')==='4'&&tailRect.getAttribute('fill')==='white'&&ink.parentElement===target&&ink.getAttribute('d')===segment.outline&&ink.getAttribute('mask')==='url(#'+id+'-u8fc5-composite)'
    }
    if(!exact())throw new Error('Exact 迅 composite DOM required')
    // This validates private source policy plus connected original MLQ measurement.
    const measured=measureReviewedU8fc5Frame(policy,segment,frame.bodyProgress,measurement)
    if(!exact())throw new Error('Changed 迅 composite after measurement')
    if(progress===0)return{status:'empty' as const,frame,cleanup:reset}
    if(frame.phase==='body'){
      guide.setAttribute('stroke-dasharray',String(frame.bodyProgress)+' 2')
      guide.setAttribute('stroke-dashoffset','0')
      for(const[c,p]of[[startCap,{x:measured.q0[0],y:measured.q0[1]}],[endCap,measured.point]] as const){c.setAttribute('cx',String(p.x));c.setAttribute('cy',String(p.y));c.setAttribute('r',String(measured.rho))}
    }else bodyFill.setAttribute('visibility','visible')
    tailRect.setAttribute('y',String(frame.tailRect.y));tailRect.setAttribute('height',String(frame.tailRect.height))
    if(!exact())throw new Error('Changed 迅 composite during write')
    ink.setAttribute('data-u8fc5-composite-phase',frame.phase)
    ink.setAttribute('data-u8fc5-body-progress',String(frame.bodyProgress))
    ink.setAttribute('data-u8fc5-up-progress',String(frame.tailProgress))
    ink.setAttribute('visibility','visible')
    return{status:'visible' as const,frame,cleanup:reset}
  }catch{reset();return{status:'hidden' as const,frame:null,cleanup:reset}}
}
