// Diagnostic DOM adapter, not the production React component. Shared descriptor is authoritative.
import { revealDescriptor } from './reveal-descriptor.mjs'
const NS='http://www.w3.org/2000/svg'
export function renderDOM(document,strokes,pen,progress,mode='original',prefix='experiment') {
  const el=(name,attrs={})=>{const node=document.createElementNS(NS,name);for(const[k,v]of Object.entries(attrs))node.setAttribute(k,String(v));return node}
  const svg=el('svg',{viewBox:'0 0 100 100'}),group=el('g',{fill:'#222'});svg.appendChild(group)
  for(const d of revealDescriptor(strokes,pen,progress,mode)) {
    const s=d.source,id=prefix+'-'+d.pen+'-'+(d.mask-1),target=d.opacity===1?group:el('g',{opacity:d.opacity})
    if(target!==group)group.appendChild(target)
    if(d.kind==='full'){target.appendChild(el('path',{d:s.outline}));continue}
    const defs=el('defs')
    if(d.kind==='curve') {
      const mask=el('mask',{id,maskUnits:'userSpaceOnUse',x:0,y:0,width:100,height:100})
      mask.appendChild(el('path',{d:s.revealPath,fill:'none',stroke:'white','stroke-width':s.revealWidth,'stroke-linecap':'round',pathLength:1,'stroke-dasharray':d.q+' 2','stroke-dashoffset':0}))
      defs.appendChild(mask);target.appendChild(defs);target.appendChild(el('path',{d:s.outline,mask:'url(#'+id+')'}))
    } else {
      const clip=el('clipPath',{id});clip.appendChild(el('rect',d.rect));defs.appendChild(clip)
      target.appendChild(defs);target.appendChild(el('path',{d:s.outline,'clip-path':'url(#'+id+')'}))
    }
  }
  return svg
}
