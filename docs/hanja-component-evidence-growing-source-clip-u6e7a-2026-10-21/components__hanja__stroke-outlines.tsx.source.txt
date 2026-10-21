'use client'
import { reviewedU6e7aContext, reviewedU6e7aPolicy, commitReviewedU6e7aCaps, commitReviewedU6e7aHV, REVIEWED_U6E7A_HV_PARTS, type ReviewedU6e7aGrowingPolicy, type ReviewedU6e7aHVPolicy } from '@/lib/hanja-stroke-start-gate-u6e7a'
import { reviewedU7d85Context, reviewedU7d85Policy, commitReviewedU7d85Caps, type ReviewedU7d85Policy } from '@/lib/hanja-stroke-start-gate-u7d85'
import { reviewedU7d7aContext, reviewedU7d7aPolicy, commitReviewedU7d7aCaps, type ReviewedU7d7aPolicy } from '@/lib/hanja-stroke-start-gate-u7d7a'
import { reviewedU7c1cContext, reviewedU7c1cPolicy, commitReviewedU7c1cCaps, commitReviewedU7c1cMonotone, type ReviewedU7c1cGrowingPolicy, type ReviewedU7c1cMonotonePolicy } from '@/lib/hanja-stroke-start-gate-u7c1c'
import { reviewedU9081Context, reviewedU9081Policy, commitReviewedU9081Caps, type ReviewedU9081Policy } from '@/lib/hanja-stroke-start-gate-u9081'
import { reviewedU564bContext, reviewedU564bPolicy, commitReviewedU564bCaps, type ReviewedU564bPolicy } from '@/lib/hanja-stroke-start-gate-u564b'
import { reviewedU68b2Context, reviewedU68b2Policy, commitReviewedU68b2Caps, type ReviewedU68b2Policy } from '@/lib/hanja-stroke-start-gate-u68b2'
import { reviewedU6f57Context, reviewedU6f57Policy, commitReviewedU6f57Caps, type ReviewedU6f57Policy } from '@/lib/hanja-stroke-start-gate-u6f57'
import { reviewedU905dContext, reviewedU905dPolicy, commitReviewedU905dCaps, type ReviewedU905dPolicy } from '@/lib/hanja-stroke-start-gate-u905d'
import { reviewedU8cb6Context, reviewedU8cb6Policy, commitReviewedU8cb6Caps, type ReviewedU8cb6Policy } from '@/lib/hanja-stroke-start-gate-u8cb6'

import { useEffect, useLayoutEffect, useId, useRef, useState, type RefObject } from 'react'
import { STROKE_DURATION, STROKE_GAP } from '@/lib/hanja-strokes'
import { reviewedU9148Context, reviewedU9148Policy, commitReviewedU9148Caps, type ReviewedU9148Policy } from '@/lib/hanja-stroke-start-gate-u9148'
import { reviewedU7037Context, reviewedU7037Policy, commitReviewedU7037Caps, type ReviewedU7037Policy } from '@/lib/hanja-stroke-start-gate-u7037'
import { reviewedU7d3dContext, reviewedU7d3dPolicy, commitReviewedU7d3dCaps, type ReviewedU7d3dPolicy } from '@/lib/hanja-stroke-start-gate-u7d3d'
import { reviewedU6303Context, reviewedU6303Policy, commitReviewedU6303Caps, type ReviewedU6303Policy } from '@/lib/hanja-stroke-start-gate-u6303'
import { reviewedU7277Context, reviewedU7277Policy, commitReviewedU7277Caps, type ReviewedU7277Policy } from '@/lib/hanja-stroke-start-gate-u7277'
import { reviewedCanContext, reviewedCanPolicy, commitReviewedCanCaps, type ReviewedCanPolicy } from '@/lib/hanja-stroke-start-gate-can'
import { reviewedDiContext, reviewedDiPolicy, commitReviewedDiCaps, type ReviewedDiPolicy } from '@/lib/hanja-stroke-start-gate-di'
import { reviewedSiContext, reviewedSiPolicy, commitReviewedSiCaps, type ReviewedSiPolicy } from '@/lib/hanja-stroke-start-gate-si'
import { outlineClip, outlineSegmentProgress, type HanjaOutlineSegment, type HanjaOutlineStrokes } from '@/lib/hanja-stroke-outline'
import { reviewedQuanQuadraticCapsContext, reviewedQuanQuadraticCapsPolicy, commitReviewedQuanQuadraticCaps, type ReviewedQuanQuadraticCapsPolicy, reviewedHanjaRevealContext, reviewedHanjaRevealPolicy, reviewedHanjaRevealClip, measureReviewedHanjaRevealLength, commitReviewedGrowingCaps, type ReviewedHanjaRevealPolicy, reviewedQuadraticCapsContext, reviewedQuadraticCapsPolicy, commitReviewedQuadraticCaps, type ReviewedQuadraticCapsPolicy } from '@/lib/hanja-stroke-start-gate'

/** Only this small SVG subtree updates per frame; the card and controls do not. */
export function StrokeOutlines({ strokes, clock, phase, count, manual }: {
  strokes: HanjaOutlineStrokes
  clock: RefObject<Animation[]>
  phase: 'idle' | 'playing' | 'paused' | 'done'
  count: number
  manual: boolean | null
}) {
  const id = useId()
  const [elapsed, setElapsed] = useState(0)
  const u6e7aContext = reviewedU6e7aContext(strokes)
  const revealContext = reviewedHanjaRevealContext(strokes)
  const quadraticContext = reviewedQuadraticCapsContext(strokes)
  const quanContext = reviewedQuanQuadraticCapsContext(strokes)
  const siContext = reviewedSiContext(strokes)
  const u9081Context = reviewedU9081Context(strokes)
  const u905dContext = reviewedU905dContext(strokes)
  const u8cb6Context = reviewedU8cb6Context(strokes)
  const u9148Context = reviewedU9148Context(strokes)
  const u7037Context = reviewedU7037Context(strokes)
  const u7d3dContext = reviewedU7d3dContext(strokes)
  const u6303Context = reviewedU6303Context(strokes)
  const u7277Context = reviewedU7277Context(strokes)
  const u7d85Context = reviewedU7d85Context(strokes)
  const u7d7aContext = reviewedU7d7aContext(strokes)
  const u7c1cContext = reviewedU7c1cContext(strokes)
  const u564bContext = reviewedU564bContext(strokes)
  const u68b2Context = reviewedU68b2Context(strokes)
  const u6f57Context = reviewedU6f57Context(strokes)
  const canContext = reviewedCanContext(strokes)
  const diContext = reviewedDiContext(strokes)
  useEffect(() => {
    if (manual || phase !== 'playing') return
    let frame: number
    const tick = () => {
      const animation = clock.current[0]
      if (!animation) return
      setElapsed(Number(animation.currentTime ?? 0))
      if (animation.playState === 'running' || animation.pending) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [clock, manual, phase])

  return <g fill="currentColor" stroke="none" data-stroke-outlines="true">
    {strokes.map((segments, stroke) => {
      const progress = phase === 'idle' || phase === 'done' ? 1 : manual ? (stroke < count ? 1 : 0)
        : (elapsed - stroke * (STROKE_DURATION + STROKE_GAP)) / STROKE_DURATION
      const amounts = outlineSegmentProgress(segments, progress)
      return <g key={stroke} data-outline-stroke={stroke + 1}>{segments.map((segment, index) => {
        const p = amounts[index]
        const u6e7aPolicy = reviewedU6e7aPolicy(u6e7aContext, stroke, index)
        if (u6e7aPolicy?.kind === 'growing-u6e7a-caps') return <U6e7aCapsOutline key={index} policy={u6e7aPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        if (u6e7aPolicy?.kind === 'original-HJ-B-u6e7a') return <U6e7aHVOutline key={index} policy={u6e7aPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u9081Policy = reviewedU9081Policy(u9081Context, stroke, index)
        if (u9081Policy) return <U9081CapsOutline key={index} policy={u9081Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u905dPolicy = reviewedU905dPolicy(u905dContext, stroke, index)
        if (u905dPolicy) return <U905dCapsOutline key={index} policy={u905dPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u8cb6Policy = reviewedU8cb6Policy(u8cb6Context, stroke, index)
        if (u8cb6Policy) return <U8cb6CapsOutline key={index} policy={u8cb6Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u9148Policy = reviewedU9148Policy(u9148Context, stroke, index)
        if (u9148Policy) return <U9148CapsOutline key={index} policy={u9148Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u7037Policy = reviewedU7037Policy(u7037Context, stroke, index)
        if (u7037Policy) return <U7037CapsOutline key={index} policy={u7037Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u7d3dPolicy = reviewedU7d3dPolicy(u7d3dContext, stroke, index)
        if (u7d3dPolicy) return <U7d3dCapsOutline key={index} policy={u7d3dPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u6303Policy = reviewedU6303Policy(u6303Context, stroke, index)
        if (u6303Policy) return <U6303CapsOutline key={index} policy={u6303Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u7277Policy = reviewedU7277Policy(u7277Context, stroke, index)
        if (u7277Policy) return <U7277CapsOutline key={index} policy={u7277Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u7d85Policy = reviewedU7d85Policy(u7d85Context, stroke, index)
        if (u7d85Policy) return <U7d85CapsOutline key={index} policy={u7d85Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u7d7aPolicy = reviewedU7d7aPolicy(u7d7aContext, stroke, index)
        if (u7d7aPolicy) return <U7d7aCapsOutline key={index} policy={u7d7aPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u7c1cPolicy = reviewedU7c1cPolicy(u7c1cContext, stroke, index)
        if (u7c1cPolicy?.kind === 'growing-u7c1c-caps') return <U7c1cCapsOutline key={index} policy={u7c1cPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        if (u7c1cPolicy?.kind === 'original-P-x-u7c1c') return <U7c1cMonotoneOutline key={index} policy={u7c1cPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u564bPolicy = reviewedU564bPolicy(u564bContext, stroke, index)
        if (u564bPolicy) return <U564bCapsOutline key={index} policy={u564bPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u68b2Policy = reviewedU68b2Policy(u68b2Context, stroke, index)
        if (u68b2Policy) return <U68b2CapsOutline key={index} policy={u68b2Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const u6f57Policy = reviewedU6f57Policy(u6f57Context, stroke, index)
        if (u6f57Policy) return <U6f57CapsOutline key={index} policy={u6f57Policy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const canPolicy = reviewedCanPolicy(canContext, stroke, index)
        if (canPolicy) return <CanCapsOutline key={index} policy={canPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const diPolicy = reviewedDiPolicy(diContext, stroke, index)
        if (diPolicy) return <DiCapsOutline key={index} policy={diPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const siPolicy = reviewedSiPolicy(siContext, stroke, index)
        if (siPolicy) return <SiCapsOutline key={index} policy={siPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const quanPolicy = reviewedQuanQuadraticCapsPolicy(quanContext, stroke, index)
        if (quanPolicy) return <QuanQuadraticCapsOutline key={index} policy={quanPolicy} segment={segment} progress={Number.isFinite(progress) ? progress >= 1 ? 1 : p : NaN} clipId={`${id}-${stroke}-${index}`} />
        const quadraticPolicy = reviewedQuadraticCapsPolicy(quadraticContext, stroke, index)
        if (quadraticPolicy) return <QuadraticCapsOutline key={index} policy={quadraticPolicy} segment={segment} progress={p} clipId={`${id}-${stroke}-${index}`} />
        const policy = reviewedHanjaRevealPolicy(revealContext, stroke, index)
        if (policy?.kind === 'growing-caps') return <GrowingCapsOutline key={index} policy={policy} segment={segment} progress={p} clipId={`${id}-${stroke}-${index}`} />
        if (policy) return <StartGateOutline key={index} policy={policy} segment={segment} progress={p} clipId={`${id}-${stroke}-${index}`} />
        if (p <= 0) return null
        if (p >= 1) return <path key={index} d={segment.outline} />
        const clipId = `${id}-${stroke}-${index}`
        return segment.direction === 'curve'
          ? <g key={index}>
            <defs><mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth}
                strokeLinecap="round" pathLength="1" strokeDasharray={`${p} 2`} strokeDashoffset={0} />
            </mask></defs>
            <path d={segment.outline} mask={`url(#${clipId})`} />
          </g>
          : <g key={index}>
            <defs><clipPath id={clipId}><rect {...outlineClip(segment, p)} /></clipPath></defs>
            <path d={segment.outline} clipPath={`url(#${clipId})`} />
          </g>
      })}</g>
    })}
  </g>
}
function U7d85CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7d85Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU7d85Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u7d85-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u7d85-measure'} data-growing-owner={clipId} data-u7d85-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u7d85-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u7d85-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u7d85-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u7d85-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7d85-growing)'} visibility="hidden" />}
  </g>
}

function U7d7aCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7d7aPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU7d7aCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u7d7a-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u7d7a-measure'} data-growing-owner={clipId} data-u7d7a-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u7d7a-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u7d7a-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u7d7a-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u7d7a-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7d7a-growing)'} visibility="hidden" />}
  </g>
}
/** 湺 원4MQ만 source-exact growing 표시. 다른 glyph/field에는 적용하지 않는다. */
function U6e7aCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU6e7aGrowingPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU6e7aCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u6e7a-caps" data-u6e7a-progress={String(progress)} data-u6e7a-clip={clipId} data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u6e7a-measure'} data-growing-owner={clipId} data-u6e7a-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u6e7a-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u6e7a-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u6e7a-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u6e7a-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u6e7a-growing)'} visibility="hidden" />}
  </g>
}
/** 湺 원7 H/J/B만 native-q 두상 clip. 완료 원P는 partial cleanup과 별도 element/key다. */
function U6e7aHVOutline({policy,segment,progress,clipId}:{policy:ReviewedU6e7aHVPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}){
 const measurement=useRef<SVGPathElement|null>(null),hclip=useRef<SVGClipPathElement|null>(null),bclip=useRef<SVGClipPathElement|null>(null),hrect=useRef<SVGRectElement|null>(null),brect=useRef<SVGRectElement|null>(null),ink=useRef<SVGGElement|null>(null),hink=useRef<SVGPathElement|null>(null),bink=useRef<SVGPathElement|null>(null)
 useLayoutEffect(()=>{
  const committed=commitReviewedU6e7aHV(policy,segment,progress,clipId,{measurement:measurement.current,hclip:hclip.current,bclip:bclip.current,hrect:hrect.current,brect:brect.current,ink:ink.current,hink:hink.current,bink:bink.current})
  return committed.cleanup
 },[policy,segment,progress,clipId])
 const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
 return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="original-HJ-B-u6e7a" data-stroke-reveal-progress={valid?progress:'invalid'} data-u6e7a-progress={String(progress)} data-u6e7a-clip={clipId}>
  <defs>
   <path ref={measurement} id={clipId+'-u6e7a-measure'} data-growing-owner={clipId} data-u6e7a-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
   <clipPath ref={hclip} id={clipId+'-u6e7a-h-clip'} data-growing-owner={clipId} clipPathUnits="userSpaceOnUse"><rect ref={hrect} data-growing-owner={clipId} x="56" y="10" width="0" height="6.5" /></clipPath>
   <clipPath ref={bclip} id={clipId+'-u6e7a-b-clip'} data-growing-owner={clipId} clipPathUnits="userSpaceOnUse"><rect ref={brect} data-growing-owner={clipId} x="80.7" y="13.5" width="6" height="0" /></clipPath>
  </defs>
  {valid&&progress===1&&<path key="u6e7a-original-P-full" data-original-p-complete="true" d={segment.outline} />}
  {valid&&progress>0&&progress<1&&<g key="u6e7a-hv-partial" ref={ink} data-growing-owner={clipId} visibility="hidden">
   <path ref={hink} data-growing-owner={clipId} d={REVIEWED_U6E7A_HV_PARTS.H+' '+REVIEWED_U6E7A_HV_PARTS.J} clipPath={'url(#'+clipId+'-u6e7a-h-clip)'} />
   <path ref={bink} data-growing-owner={clipId} d={REVIEWED_U6E7A_HV_PARTS.B} clipPath={'url(#'+clipId+'-u6e7a-b-clip)'} />
  </g>}
 </g>
}
/** 簜 water9m1만 조건부 growing 정책. */
function U7c1cCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7c1cGrowingPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU7c1cCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u7c1c-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u7c1c-measure'} data-growing-owner={clipId} data-u7c1c-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u7c1c-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u7c1c-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u7c1c-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u7c1c-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7c1c-growing)'} visibility="hidden" />}
  </g>
}
/** 簜 water9m2 원P만 native arc-x에 따른 단조 clip. 완료는 원P 직접표시. */
function U7c1cMonotoneOutline({policy,segment,progress,clipId}:{policy:ReviewedU7c1cMonotonePolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}){
 const measurement=useRef<SVGPathElement|null>(null),rect=useRef<SVGRectElement|null>(null),ink=useRef<SVGPathElement|null>(null)
 useLayoutEffect(()=>{
  const committed=commitReviewedU7c1cMonotone(policy,segment,progress,clipId,{measurement:measurement.current,rect:rect.current,ink:ink.current})
  return committed.cleanup
 },[policy,segment,progress,clipId])
 const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
 return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="original-P-x-u7c1c" data-stroke-reveal-progress={valid?progress:'invalid'}>
  <defs>
   <path ref={measurement} id={clipId+'-u7c1c-measure'} data-growing-owner={clipId} data-u7c1c-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
   <clipPath id={clipId+'-u7c1c-monotone'} clipPathUnits="userSpaceOnUse"><rect ref={rect} id={clipId+'-u7c1c-rect'} data-growing-owner={clipId} x="14.55" y="49.2" width="0" height="32.15" /></clipPath>
  </defs>
  {valid&&progress===1&&<path key="u7c1c-original-P-full" data-original-p-complete="true" d={segment.outline} />}
  {valid&&progress>0&&progress<1&&<path key="u7c1c-monotone-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} clipPath={'url(#'+clipId+'-u7c1c-monotone)'} visibility="hidden" />}
 </g>
}
/** 噋 HQ9 원9m2만 조건부 growing 정책. */
function U564bCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU564bPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU564bCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u564b-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u564b-measure'} data-growing-owner={clipId} data-u564b-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u564b-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u564b-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u564b-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u564b-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u564b-growing)'} visibility="hidden" />}
  </g>
}
/** 梲 HQ6 원6m2만 조건부 growing 정책. */
function U68b2CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU68b2Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU68b2Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u68b2-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u68b2-measure'} data-growing-owner={clipId} data-u68b2-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u68b2-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u68b2-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u68b2-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u68b2-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u68b2-growing)'} visibility="hidden" />}
  </g>
}

/** 潗 K의 원3m1/3m2만 고유 Q growing cap으로 표시한다. 다른 child는 그대로 둔다. */
/** 邁 VS3 body3 QB17의 정확한 두 mask만 조건부 APP 정책으로 측정한다. native/runtime 승인 아님. */
function U9081CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU9081Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU9081Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u9081-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u9081-measure'} data-growing-owner={clipId} data-u9081-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u9081-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u9081-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u9081-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u9081-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u9081-growing)'} visibility="hidden" />}
  </g>
}
function U6f57CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU6f57Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU6f57Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u6f57-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u6f57-measure'} data-growing-owner={clipId} data-u6f57-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u6f57-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u6f57-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u6f57-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u6f57-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u6f57-growing)'} visibility="hidden" />}
  </g>
}
/** u7d3d 紽의 고정 네 Q·11MLQL만 별도 원 path로 측정한다. */
function U7d3dCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7d3dPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU7d3dCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u7d3d-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u7d3d-measure'} data-growing-owner={clipId} data-u7d3d-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u7d3d-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u7d3d-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u7d3d-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u7d3d-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7d3d-growing)'} visibility="hidden" />}
  </g>
}
/** u905d 遝의 정확한 QB14 두 마스크만 별도 원 path로 측정한다. */
function U905dCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU905dPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU905dCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u905d-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u905d-measure'} data-growing-owner={clipId} data-u905d-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u905d-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u905d-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u905d-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u905d-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u905d-growing)'} visibility="hidden" />}
  </g>
}
/** u9148 酈의 고정 MLQL19·MCQ21 body만 원path로 측정한다. */
function U9148CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU9148Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU9148Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u9148-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u9148-measure'} data-growing-owner={clipId} data-u9148-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u9148-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u9148-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u9148-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u9148-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u9148-growing)'} visibility="hidden" />}
  </g>
}
/** u7037 瀷의 정확한 두 Q와 세 첫직선만 별도 원 path로 측정한다. */
function U7037CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7037Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU7037Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u7037-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u7037-measure'} data-growing-owner={clipId} data-u7037-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u7037-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u7037-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u7037-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u7037-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7037-growing)'} visibility="hidden" />}
  </g>
}
/** u6303 挃의 정확한 다섯 MLQ/Q만 별도 원 path로 측정한다. */
function U6303CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU6303Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU6303Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u6303-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u6303-measure'} data-growing-owner={clipId} data-u6303-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u6303-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u6303-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u6303-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u6303-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u6303-growing)'} visibility="hidden" />}
  </g>
}
/** u8cb6 貶의 정확한 Q·C 두 마스크만 별도 원 path로 측정한다. */
function U8cb6CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU8cb6Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU8cb6Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u8cb6-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u8cb6-measure'} data-growing-owner={clipId} data-u8cb6-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u8cb6-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u8cb6-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u8cb6-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u8cb6-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u8cb6-growing)'} visibility="hidden" />}
  </g>
}
/** u7277 牷의 정확한 네 Q만 별도 원 path로 측정한다. */
function U7277CapsOutline({policy,segment,progress,clipId}:{policy:ReviewedU7277Policy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedU7277Caps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-u7277-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-u7277-measure'} data-growing-owner={clipId} data-u7277-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-u7277-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-u7277-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="u7277-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="u7277-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-u7277-growing)'} visibility="hidden" />}
  </g>
}
/** 澯의 정확한 두 Q만 별도 원 path로 측정한다. */
function CanCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedCanPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedCanCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-can-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-can-measure'} data-growing-owner={clipId} data-can-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-can-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-can-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="di-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="di-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-can-growing)'} visibility="hidden" />}
  </g>
}
/** 疷만 독립 원 path로 측정한다. 기존 모든 child 함수와 guide 계약은 바꾸지 않는다. */
function DiCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedDiPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedDiCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-di-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-di-measure'} data-growing-owner={clipId} data-di-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-di-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-di-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="di-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="di-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-di-growing)'} visibility="hidden" />}
  </g>
}

/** 緦만 독립 원 path로 측정한다. 기존 모든 child 함수와 guide 계약은 바꾸지 않는다. */
function SiCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedSiPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedSiCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-si-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-si-measure'} data-growing-owner={clipId} data-si-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-si-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-si-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="si-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="si-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-si-growing)'} visibility="hidden" />}
  </g>
}

/** Mounted even at p=0 so the exact SVG guide can be measured before playback. */
function StartGateOutline({ policy, segment, progress, clipId }: { policy: ReviewedHanjaRevealPolicy; segment: HanjaOutlineSegment; progress: number; clipId: string }) {
  const guide = useRef<SVGPathElement | null>(null)
  const [measurement, setMeasurement] = useState<{ policyId: string; path: string; length: number } | null>(null)
  useEffect(() => {
    const length = measureReviewedHanjaRevealLength(policy, segment, guide.current)
    if (length === null) return
    setMeasurement(previous => previous && previous.policyId === policy.id && previous.path === segment.revealPath && previous.length === length ? previous : { policyId: policy.id, path: segment.revealPath!, length })
  }, [policy, segment])
  const length = measurement && measurement.policyId === policy.id && measurement.path === segment.revealPath ? measurement.length : null
  const gate = policy.kind === 'global-projection' || length !== null ? reviewedHanjaRevealClip(policy, segment, progress, length) : null
  const activeGate = gate?.kind === 'circle-start' && gate.active ? gate : null
  const plane = gate?.kind === 'global-projection' ? gate : null
  // SSR and first hydration agree. Intermediate ink waits for its committed guide measurement.
  // p=1 keeps the reviewed round sweep even before measurement; it never reveals an unmasked target.
  const visible = progress > 0 && (policy.kind === 'global-projection' || progress >= 1 || length !== null)
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy={policy.kind}>
    <defs>
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth}
          strokeLinecap="round" pathLength="1" strokeDasharray={`${progress} 2`} strokeDashoffset={0} />
      </mask>
      {plane && <clipPath id={`${clipId}-plane`}><polygon points={plane.points} /></clipPath>}
      {activeGate && <>
        <clipPath id={`${clipId}-disc`}><circle cx={activeGate.center[0]} cy={activeGate.center[1]} r={activeGate.radius} /></clipPath>
        <mask id={`${clipId}-gate`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <circle cx={activeGate.center[0]} cy={activeGate.center[1]} r={activeGate.radius} fill="black" />
          <g clipPath={`url(#${clipId}-disc)`}><polygon points={activeGate.points} fill="white" /></g>
        </mask>
      </>}
    </defs>
    {visible && <g clipPath={plane ? `url(#${clipId}-plane)` : undefined} mask={activeGate ? `url(#${clipId}-gate)` : undefined}>
      <path d={segment.outline} mask={`url(#${clipId})`} />
    </g>}
  </g>
}


/** All UA reads and dynamic writes for one local p commit together before paint. */
function GrowingCapsOutline({ policy, segment, progress, clipId }: { policy: ReviewedHanjaRevealPolicy; segment: HanjaOutlineSegment; progress: number; clipId: string }) {
  const guide = useRef<SVGPathElement | null>(null), startCap = useRef<SVGCircleElement | null>(null), endCap = useRef<SVGCircleElement | null>(null), ink = useRef<SVGPathElement | null>(null)
  useLayoutEffect(() => {
    const committed = commitReviewedGrowingCaps(policy, segment, progress, clipId, { guide: guide.current, startCap: startCap.current, endCap: endCap.current, ink: ink.current })
    return committed.cleanup
  }, [policy, segment, progress, clipId])
  const valid = Number.isFinite(progress) && progress >= 0 && progress <= 1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-caps" data-stroke-reveal-progress={valid ? progress : 'invalid'}>
    <defs>
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-growing-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid && progress === 1 && <path key="full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid && progress > 0 && progress < 1 && <path key="growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-growing)'} visibility="hidden" />}
  </g>
}

/** All UA reads and dynamic writes for one local p commit together before paint. */
function QuadraticCapsOutline({ policy, segment, progress, clipId }: { policy: ReviewedQuadraticCapsPolicy; segment: HanjaOutlineSegment; progress: number; clipId: string }) {
  const guide = useRef<SVGPathElement | null>(null), startCap = useRef<SVGCircleElement | null>(null), endCap = useRef<SVGCircleElement | null>(null), ink = useRef<SVGPathElement | null>(null)
  useLayoutEffect(() => {
    const committed = commitReviewedQuadraticCaps(policy, segment, progress, clipId, { guide: guide.current, startCap: startCap.current, endCap: endCap.current, ink: ink.current })
    return committed.cleanup
  }, [policy, segment, progress, clipId])
  const valid = Number.isFinite(progress) && progress >= 0 && progress <= 1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-q-caps" data-stroke-reveal-progress={valid ? progress : 'invalid'}>
    <defs>
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-growing-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid && progress === 1 && <path key="full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid && progress > 0 && progress < 1 && <path key="growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-growing)'} visibility="hidden" />}
  </g>
}

/** 荃만 독립 원 path로 측정한다. 기존 癙 component와 guide 계약은 바꾸지 않는다. */
function QuanQuadraticCapsOutline({policy,segment,progress,clipId}:{policy:ReviewedQuanQuadraticCapsPolicy;segment:HanjaOutlineSegment;progress:number;clipId:string}) {
  const measurement=useRef<SVGPathElement|null>(null),guide=useRef<SVGPathElement|null>(null),startCap=useRef<SVGCircleElement|null>(null),endCap=useRef<SVGCircleElement|null>(null),ink=useRef<SVGPathElement|null>(null)
  useLayoutEffect(()=>{
    const committed=commitReviewedQuanQuadraticCaps(policy,segment,progress,clipId,{measurement:measurement.current,guide:guide.current,startCap:startCap.current,endCap:endCap.current,ink:ink.current})
    return committed.cleanup
  },[policy,segment,progress,clipId])
  const valid=Number.isFinite(progress)&&progress>=0&&progress<=1
  return <g data-stroke-start-gate={policy.id} data-stroke-reveal-policy="growing-quan-q-caps" data-stroke-reveal-progress={valid?progress:'invalid'}>
    <defs>
      <path ref={measurement} id={clipId+'-quan-measure'} data-growing-owner={clipId} data-quan-measurement="true" d={segment.revealPath} fill="none" stroke="none" visibility="hidden" />
      <mask id={clipId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="round" strokeLinejoin="miter" pathLength="1" strokeDasharray="1 2" strokeDashoffset={0} />
      </mask>
      <mask id={clipId+'-quan-growing'} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path ref={guide} id={clipId+'-quan-guide'} data-growing-owner={clipId} d={segment.revealPath} fill="none" stroke="white" strokeWidth={segment.revealWidth} strokeLinecap="butt" strokeLinejoin="miter" pathLength="1" strokeDasharray="0 2" strokeDashoffset={0} />
        <circle ref={startCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
        <circle ref={endCap} data-growing-owner={clipId} cx="0" cy="0" r="0" fill="white" />
      </mask>
    </defs>
    {valid&&progress===1&&<path key="quan-full-round-ink" data-growing-full-round="true" d={segment.outline} mask={'url(#'+clipId+')'} />}
    {valid&&progress>0&&progress<1&&<path key="quan-growing-ink" ref={ink} data-growing-owner={clipId} d={segment.outline} mask={'url(#'+clipId+'-quan-growing)'} visibility="hidden" />}
  </g>
}
