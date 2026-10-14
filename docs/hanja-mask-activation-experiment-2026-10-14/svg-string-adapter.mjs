// Diagnostic adapter; all reveal decisions come from the shared pure descriptor.
import { revealDescriptor } from './reveal-descriptor.mjs'
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
export function renderString(strokes,pen,progress,mode='original',prefix='experiment') {
  const content=revealDescriptor(strokes,pen,progress,mode).map(d=>{
    const s=d.source,id=prefix+'-'+d.pen+'-'+(d.mask-1)
    let body
    if(d.kind==='full') body='<path d="'+esc(s.outline)+'"/>'
    else if(d.kind==='curve') body='<defs><mask id="'+esc(id)+'" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="'+esc(s.revealPath)+'" fill="none" stroke="white" stroke-width="'+s.revealWidth+'" stroke-linecap="round" pathLength="1" stroke-dasharray="'+d.q+' 2" stroke-dashoffset="0"/></mask></defs><path d="'+esc(s.outline)+'" mask="url(#'+esc(id)+')"/>'
    else {const r=d.rect;body='<defs><clipPath id="'+esc(id)+'"><rect x="'+r.x+'" y="'+r.y+'" width="'+r.width+'" height="'+r.height+'"/></clipPath></defs><path d="'+esc(s.outline)+'" clip-path="url(#'+esc(id)+')"/>'}
    return d.opacity===1?body:'<g opacity="'+d.opacity+'">'+body+'</g>'
  }).join('')
  return '<svg viewBox="0 0 100 100"><g fill="#222">'+content+'</g></svg>'
}
