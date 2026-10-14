// Experiment-only pure reveal model. Source segments are referenced, never rewritten.
export const EXPERIMENT = Object.freeze({ pen: 12, mask: 2, gateMilliseconds: 40, strokeDurationMilliseconds: 650 / 1.5 })
const clamp = x => Math.max(0, Math.min(1, x))
export function localProgress(segments, progress) {
  let remaining = clamp(progress) * segments.reduce((sum, s) => sum + s.weight, 0)
  return segments.map(s => { const q = clamp(remaining / s.weight); remaining -= s.weight; return q })
}
export function activationAlpha(q, durationMilliseconds, gateMilliseconds = EXPERIMENT.gateMilliseconds) {
  if (!(durationMilliseconds > 0) || !(gateMilliseconds > 0)) throw new Error('Positive diagnostic timing required')
  return clamp(clamp(q) * durationMilliseconds / Math.min(gateMilliseconds, durationMilliseconds))
}
export function revealDescriptor(strokes, pen, progress, mode = 'original') {
  if (!['original','gated'].includes(mode) || !Number.isInteger(pen) || pen < 1 || pen > strokes.length) throw new Error('Explicit fixture mode/pen required')
  const segments = strokes[pen - 1], totalWeight = segments.reduce((sum,s) => sum+s.weight,0)
  const amounts = localProgress(segments, progress)
  const paths = strokes.slice(0, pen - 1).flatMap((segments,stroke) => segments.map((source,mask) => ({ source, pen:stroke+1, mask:mask+1, q:1, opacity:1, kind:'full' })))
  segments.forEach((source,index) => {
    const q = amounts[index]
    if (q <= 0) return
    const gated = mode === 'gated' && pen === EXPERIMENT.pen && index + 1 === EXPERIMENT.mask && source.direction === 'curve'
    const durationMilliseconds = EXPERIMENT.strokeDurationMilliseconds * source.weight / totalWeight
    const opacity = gated ? activationAlpha(q,durationMilliseconds) : 1
    if (q >= 1) { paths.push({source,pen,mask:index+1,q,opacity:1,kind:'full'}); return }
    if (source.direction === 'curve') { paths.push({source,pen,mask:index+1,q,opacity,kind:'curve'}); return }
    const [x,y,right,bottom]=source.bounds,width=right-x,height=bottom-y
    const horizontal=source.direction==='right'||source.direction==='left'
    paths.push({source,pen,mask:index+1,q,opacity,kind:'cardinal',rect:{
      x:source.direction==='left'?right-width*q:x,
      y:source.direction==='up'?bottom-height*q:y,
      width:horizontal?width*q:width,height:horizontal?height:height*q
    }})
  })
  return paths
}
