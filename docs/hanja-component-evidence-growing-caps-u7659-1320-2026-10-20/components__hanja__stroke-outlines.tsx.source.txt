'use client'

import { useEffect, useLayoutEffect, useId, useRef, useState, type RefObject } from 'react'
import { STROKE_DURATION, STROKE_GAP } from '@/lib/hanja-strokes'
import { outlineClip, outlineSegmentProgress, type HanjaOutlineSegment, type HanjaOutlineStrokes } from '@/lib/hanja-stroke-outline'
import { reviewedHanjaRevealContext, reviewedHanjaRevealPolicy, reviewedHanjaRevealClip, measureReviewedHanjaRevealLength, commitReviewedGrowingCaps, type ReviewedHanjaRevealPolicy, reviewedQuadraticCapsContext, reviewedQuadraticCapsPolicy, commitReviewedQuadraticCaps, type ReviewedQuadraticCapsPolicy } from '@/lib/hanja-stroke-start-gate'

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
  const revealContext = reviewedHanjaRevealContext(strokes)
  const quadraticContext = reviewedQuadraticCapsContext(strokes)
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
