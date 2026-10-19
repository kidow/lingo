import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'

// Exact reviewed 棖 geometry; no glyph-wide or generic curve opt-in.
// Source: qq-u68d6 fixture fa3be0dbcd906119295020bea0caea8a4064925a8b85078a8cc71c0fee9f1e36.
const REVIEWED_OUTLINES = [
  [
    {
      "outline": "M6.55 29.5 L39.7 29.5 L39.7 31.5 L6.55 31.5 Z M39.7 29.5 L27.7 30.5 L33.7 24.5 Z",
      "bounds": [
        6.55,
        24.5,
        39.7,
        31.5
      ],
      "direction": "right",
      "weight": 33.11
    }
  ],
  [
    {
      "outline": "M26.75 8 L26.75 91.5 L20.75 94.5 L20.75 7 Z M26.75 8 L28.25 9 L25.75 10.5 Z",
      "bounds": [
        20.75,
        7,
        28.25,
        94.5
      ],
      "direction": "down",
      "weight": 85.5
    }
  ],
  [
    {
      "outline": "M25.55 30.5 L25.45 31 L24.35 35.9 L23.05 40.7 L21.65 45.35 L20.1 49.9 L18.35 54.35 L16.45 58.6 L14.35 62.75 L12.1 66.75 L9.65 70.6 L6.95 74.2 L6.2 73.75 L8 69.65 L9.7 65.55 L11.4 61.4 L12.95 57.2 L14.35 52.85 L15.65 48.5 L16.8 44 L17.85 39.4 L18.75 34.75 L19.4 30.5 Z",
      "bounds": [
        6.2,
        30.5,
        25.55,
        74.2
      ],
      "direction": "curve",
      "weight": 46.318226,
      "revealPath": "M22.5 30.5 Q18.2 55 6.59 74",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M25.25 42.8 L26.9 43.4 L28.55 43.9 L30.15 44.55 L31.65 45.3 L33.1 46.15 L34.45 47.05 L35.75 48.1 L37 49.15 L38.15 50.35 L39.25 51.6 L34.2 54.8 L33.65 53.6 L33 52.45 L32.3 51.3 L31.5 50.15 L30.6 49.05 L29.65 47.9 L28.6 46.8 L27.45 45.7 L26.25 44.55 L24.9 43.6 Z M39.25 51.6 L39.6 53.85 L38.35 55.75 L36.05 56.1 L34.2 54.8 Z",
      "bounds": [
        24.9,
        42.8,
        39.6,
        56.1
      ],
      "direction": "curve",
      "weight": 17.281782,
      "revealPath": "M24.65 43 Q32.82 47 37.55 54.5",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M54.3 14 L54.3 53.5 L48.3 53.5 L48.3 11 Z",
      "bounds": [
        48.3,
        11,
        54.3,
        53.5
      ],
      "direction": "down",
      "weight": 37.5
    }
  ],
  [
    {
      "outline": "M51.3 14 L88.75 14 L88.75 16 L51.3 16 Z M88.75 14 L76.75 15 L82.75 9 Z",
      "bounds": [
        51.3,
        9,
        88.75,
        16
      ],
      "direction": "right",
      "weight": 37.45
    }
  ],
  [
    {
      "outline": "M51.3 26.5 L85.55 26.5 L85.55 28.5 L51.3 28.5 Z M85.55 26.5 L73.55 27.5 L79.55 21.5 Z",
      "bounds": [
        51.3,
        21.5,
        85.55,
        28.5
      ],
      "direction": "right",
      "weight": 34.24
    }
  ],
  [
    {
      "outline": "M51.3 39 L86.05 39 L86.05 41 L51.3 41 Z M86.05 39 L74.05 40 L80.05 34 Z",
      "bounds": [
        51.3,
        34,
        86.05,
        41
      ],
      "direction": "right",
      "weight": 34.775
    }
  ],
  [
    {
      "outline": "M39.5 51.5 L93.55 51.5 L93.55 53.5 L39.5 53.5 Z M93.55 51.5 L81.55 52.5 L87.55 46.5 Z",
      "bounds": [
        39.5,
        46.5,
        93.55,
        53.5
      ],
      "direction": "right",
      "weight": 54.035
    }
  ],
  [
    {
      "outline": "M54.3 51.5 L54.3 85.5 L48.3 85.5 L48.3 51.5 Z",
      "bounds": [
        48.3,
        51.5,
        54.3,
        85.5
      ],
      "direction": "down",
      "weight": 32
    },
    {
      "outline": "M39.55 87.95 L43.05 86.95 L46.5 85.85 L50.05 84.7 L53.6 83.55 L57.15 82.35 L60.8 81.1 L64.45 79.85 L68.1 78.55 L71.9 77.3 L75.7 76.05 L76.1 76.9 L72.65 79 L69.2 81 L65.75 82.85 L62.25 84.6 L58.75 86.3 L55.3 87.9 L51.8 89.4 L48.35 90.9 L44.9 92.3 L41.5 93.65 Z M41.5 93.65 L38.6 88.3 L39.55 87.95 Z M41.5 93.65 L43.85 91.25 L42.9 94.75 Z",
      "bounds": [
        38.6,
        76.05,
        76.1,
        94.75
      ],
      "direction": "curve",
      "weight": 38.666704,
      "revealPath": "M40.08 91 Q57.735 85 75.925 76.5",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M89.65 62.65 L88.3 63.4 L86.85 64.2 L85.35 65 L83.7 65.8 L81.9 66.65 L80.05 67.45 L78.05 68.3 L75.9 69.15 L73.65 70 L71.3 70.85 L70.85 70.1 L72.9 68.6 L74.8 67.15 L76.55 65.75 L78.25 64.45 L79.85 63.2 L81.3 62.05 L82.65 60.9 L83.9 59.85 L85 58.85 L86 57.9 Z M85.6 58.2 L86 57.9 L89.65 62.65 Z M89.65 62.65 L89.75 64.45 L87.05 63.4 Z",
      "bounds": [
        70.85,
        57.9,
        89.75,
        70.85
      ],
      "direction": "curve",
      "weight": 20.083436,
      "revealPath": "M88.23 60 Q82.345 64.5 71.11 70.5",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M63.65 52.8 L66.15 58 L68.7 62.8 L71.25 67.2 L73.9 71.2 L76.6 74.85 L79.45 78.05 L82.4 80.9 L85.45 83.3 L88.6 85.35 L91.85 87.05 L88.85 92.9 L85.2 90.6 L81.75 87.9 L78.55 84.85 L75.6 81.4 L72.85 77.6 L70.35 73.45 L68.05 68.9 L66 64 L64.2 58.75 L62.8 53.1 Z M88.85 92.9 L91.85 87.05 L94.5 88.4 Z",
      "bounds": [
        62.8,
        52.8,
        94.5,
        92.9
      ],
      "direction": "curve",
      "weight": 46.375869,
      "revealPath": "M63.084999999999994 52.5 Q72.715 81 90.37 90",
      "revealWidth": 14
    }
  ]
] as const
// Exact 帨 corrected-UP source c1488f46315395ce3258b8bccafd0350bd2d49f281e7a187bf4f0bf5cf7fa8b3.
const REVIEWED_SHUI_OUTLINES = [
  [
    {
      "outline": "M15.05 25.7 L15.05 72.75 L9.05 75.75 L9.05 22.7 Z",
      "bounds": [
        9.05,
        22.7,
        15.05,
        75.75
      ],
      "direction": "down",
      "weight": 47.53
    }
  ],
  [
    {
      "outline": "M12.05 25.7 L37.25 25.7 L37.25 27.7 L12.05 27.7 Z M40.25 26.7 L40.25 67.3 L34.25 67.3 L34.25 26.7 Z M34.25 25.7 L37.25 23.2 L42.75 27.7 L40.25 29.7 L34.25 26.7 Z M34.25 67.3 L40.25 67.3 L39.05 69.1 L37.25 70.3 L35.45 69.1 Z M40.25 67.3 L40.2 68.55 L39.95 69.8 L39.55 71 L38.95 72.15 L38.15 73.15 L37.1 74 L36 74.6 L34.8 75 L33.55 75.2 L32.25 75.3 L32.25 69.3 L32.85 69.25 L33.35 69.15 L33.6 69.1 L33.8 69 L33.9 68.9 L33.95 68.8 L34.05 68.65 L34.15 68.35 L34.2 67.9 L34.25 67.3 Z M32.25 72.3 L28.25 70.8 L28.25 69.3 L32.25 69.3 Z",
      "bounds": [
        12.05,
        23.2,
        42.75,
        75.3
      ],
      "direction": "curve",
      "weight": 72.861068,
      "revealPath": "M12.08 26.72 L37.28 26.72 L37.28 67.31 Q37.28 72.31 32.28 72.31",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M27.65 8.75 L27.65 90.2 L21.65 93.2 L21.65 7.75 Z M27.65 8.75 L29.15 9.75 L26.65 11.25 Z",
      "bounds": [
        21.65,
        7.75,
        29.15,
        93.2
      ],
      "direction": "down",
      "weight": 83.42
    }
  ],
  [
    {
      "outline": "M61.45 18.25 L59.95 20.8 L58.35 23.25 L56.6 25.65 L54.8 28 L52.85 30.25 L50.8 32.45 L48.65 34.6 L46.35 36.6 L43.9 38.55 L41.3 40.3 L40.65 39.65 L42.55 37.2 L44.4 34.75 L46.2 32.4 L47.9 30.05 L49.5 27.65 L51 25.3 L52.4 22.9 L53.75 20.5 L54.95 18.05 L56.05 15.6 Z M55.85 16.05 L56.35 15.05 L61.45 18.25 Z M61.45 18.25 L62.35 19.85 L59.4 20.05 Z",
      "bounds": [
        40.65,
        15.05,
        62.35,
        40.3
      ],
      "direction": "curve",
      "weight": 29.60152,
      "revealPath": "M59 16.5 Q52.5 29.5 41 40",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M57 11.5 L80.5 11.5 L80.5 13.5 L57 13.5 Z M80.5 11.5 L70.5 12.5 L75.5 7 Z",
      "bounds": [
        57,
        7,
        80.5,
        13.5
      ],
      "direction": "right",
      "weight": 23.5
    },
    {
      "outline": "M75.1 12.75 L76.75 14.7 L78.3 16.65 L79.9 18.5 L81.55 20.35 L83.3 22.05 L85.1 23.75 L87.05 25.35 L89.05 26.9 L91.15 28.35 L93.35 29.75 L89.6 35.2 L87.35 33.3 L85.2 31.4 L83.25 29.35 L81.4 27.3 L79.75 25.1 L78.25 22.85 L76.9 20.55 L75.8 18.15 L74.9 15.7 L74.25 13.1 Z M89.6 35.2 L93.35 29.75 L95.1 30.95 Z",
      "bounds": [
        74.25,
        12.75,
        95.1,
        35.2
      ],
      "direction": "curve",
      "weight": 26.248809,
      "revealPath": "M74.5 12.5 Q80 24.5 91.5 32.5",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M56.5 35 L56.5 64 L50.5 67 L50.5 32 Z",
      "bounds": [
        50.5,
        32,
        56.5,
        67
      ],
      "direction": "down",
      "weight": 21
    }
  ],
  [
    {
      "outline": "M53.5 35 L83.5 35 L83.5 37 L53.5 37 Z M86.5 36 L86.5 61 L80.5 64 L80.5 36 Z M80.5 35 L83.5 32.5 L89 37 L86.5 39 L80.5 36 Z",
      "bounds": [
        53.5,
        32.5,
        89,
        64
      ],
      "direction": "curve",
      "weight": 51,
      "revealPath": "M53.5 36 L83.5 36 L83.5 57",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M53.5 56 L83.5 56 L83.5 58 L53.5 58 Z",
      "bounds": [
        53.5,
        56,
        83.5,
        58
      ],
      "direction": "right",
      "weight": 30
    }
  ],
  [
    {
      "outline": "M65.9 61.35 L64.9 66.15 L63.55 70.65 L61.75 74.9 L59.5 78.8 L56.9 82.35 L53.9 85.6 L50.55 88.5 L46.8 91.05 L42.65 93.15 L38.15 94.9 L37.8 94.05 L41.7 91.5 L45.25 88.85 L48.4 86 L51.15 83 L53.5 79.85 L55.5 76.45 L57.15 72.85 L58.4 69 L59.35 64.95 L59.95 60.6 Z M59.85 61.1 L60.05 59.55 L65.9 61.35 Z M65.9 61.35 L67.25 62.5 L64.6 63.7 Z",
      "bounds": [
        37.8,
        59.55,
        67.25,
        94.9
      ],
      "direction": "curve",
      "weight": 42.201896,
      "revealPath": "M63 60.5 Q60 84.5 38 94.5",
      "revealWidth": 14
    }
  ],
  [
    {
      "outline": "M76 56 L76 85 L70 85 L70 56 Z M70 85 L76 85 L74.8 86.8 L73 88 L71.2 86.8 Z M76 85 L76 85.6 L76.1 86.05 L76.2 86.35 L76.25 86.5 L76.35 86.6 L76.45 86.7 L76.6 86.75 L76.9 86.85 L77.35 86.95 L78 87 L78 93 L76.7 92.9 L75.45 92.7 L74.25 92.3 L73.1 91.65 L72.1 90.85 L71.3 89.85 L70.65 88.7 L70.25 87.5 L70.05 86.25 L70 85 Z M78 87 L80.1 87.9 L81 90 L80.1 92.1 L78 93 Z M78 87 L91 87 L91 93 L78 93 Z M91 87 L92.8 88.2 L94 90 L92.8 91.8 L91 93 Z",
      "bounds": [
        70,
        56,
        94,
        93
      ],
      "direction": "curve",
      "weight": 48.071068,
      "revealPath": "M73 57 L73 85 Q73 90 78 90 L91 90",
      "revealWidth": 14
    },
    {
      "outline": "M91 87 L88 87 L91 74.5 L92 74.5 Z",
      "bounds": [
        88,
        74.5,
        92,
        87
      ],
      "direction": "up",
      "weight": 12.5
    }
  ]
] as const
const TARGET = REVIEWED_OUTLINES[9][1]
const FIELDS = ['outline', 'bounds', 'direction', 'weight', 'revealPath', 'revealWidth'] as const

// Runtime immutability is required: a policy must never expose mutable allowlist data.
function freezeReviewedStrokes(strokes: HanjaOutlineStrokes) {
  for (const masks of strokes) {
    for (const segment of masks) { Object.freeze(segment.bounds); Object.freeze(segment) }
    Object.freeze(masks)
  }
  Object.freeze(strokes)
}
freezeReviewedStrokes(REVIEWED_OUTLINES)
freezeReviewedStrokes(REVIEWED_SHUI_OUTLINES)

function sameSegment(actual: HanjaOutlineSegment, expected: HanjaOutlineSegment) {
  if (!actual || Object.getPrototypeOf(actual) !== Object.prototype) return false
  const keys = Object.keys(actual).sort(), expectedKeys = Object.keys(expected).sort()
  if (keys.length !== expectedKeys.length || keys.some((key, i) => key !== expectedKeys[i])) return false
  return FIELDS.every(key => key === 'bounds'
    ? Array.isArray(actual.bounds) && actual.bounds.length === expected.bounds.length && actual.bounds.every((value, i) => value === expected.bounds[i])
    : actual[key] === expected[key])
}

/** Match all 12 pens/13 masks, not just a similar guide or a glyph label. */
export function hasReviewedHanjaStartGate(strokes: HanjaOutlineStrokes) {
  return Array.isArray(strokes) && strokes.length === REVIEWED_OUTLINES.length && strokes.every((masks, pen) =>
    Array.isArray(masks) && masks.length === REVIEWED_OUTLINES[pen].length && masks.every((mask, index) => sameSegment(mask, REVIEWED_OUTLINES[pen][index])))
}

export function isReviewedHanjaStartGateSegment(segment: HanjaOutlineSegment) {
  return sameSegment(segment, TARGET)
}

type GuideElement = Pick<SVGPathElement, 'isConnected' | 'getAttribute' | 'getTotalLength'>

/** Call only after React commits the exact guide ref. No DOM access at import/render. */
export function measureHanjaStartGateLength(segment: HanjaOutlineSegment, guide: GuideElement | null): number | null {
  if (!isReviewedHanjaStartGateSegment(segment) || !guide?.isConnected || guide.getAttribute('d') !== TARGET.revealPath) return null
  try {
    const length = guide.getTotalLength()
    return Number.isFinite(length) && length > 0 ? length : null
  } catch {
    return null
  }
}

export type HanjaStartGateClip = {
  center: readonly [number, number]
  radius: number
  tangent: readonly [number, number]
  projectionMin: number
  projectionMax: number
  threshold: number
  tau: number
  active: boolean
  points: string
}

/** Display-only gate. The original outline, guide, width and timing weights stay fixed. */
export function hanjaStartGateClip(segment: HanjaOutlineSegment, progress: number, guideLength: number): HanjaStartGateClip {
  if (!isReviewedHanjaStartGateSegment(segment)) throw new Error('Unreviewed start-gate geometry')
  if (!Number.isFinite(progress) || progress < 0 || progress > 1 || !Number.isFinite(guideLength) || guideLength <= 0) throw new Error('Invalid start-gate measurement/progress')
  const match = /^M([-\d.]+) ([-\d.]+) Q([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)$/.exec(TARGET.revealPath)!
  const [x, y, cx, cy] = match.slice(1).map(Number)
  const tangentLength = Math.hypot(cx - x, cy - y)
  const vx = (cx - x) / tangentLength, vy = (cy - y) / tangentLength
  const radius = TARGET.revealWidth / 2
  const tau = Math.min(1, TARGET.revealWidth / guideLength)
  const threshold = -radius + 2 * radius * Math.min(progress / tau, 1)
  const corner = (u: number, t: number) => [x + u * vx - t * vy, y + u * vy + t * vx]
  const points = [corner(-radius, -radius), corner(threshold, -radius), corner(threshold, radius), corner(-radius, radius)].map(point => point.join(',')).join(' ')
  return { center: [x, y], radius, tangent: [vx, vy], projectionMin: -radius, projectionMax: radius, threshold, tau, active: progress > 0 && progress < tau, points }
}

export type ReviewedHanjaRevealPolicy = Readonly<{
  id: 'u68d6-10-2' | 'u5e28-5-2' | 'u5e28-10-1'
  kind: 'circle-start' | 'global-projection'
  segment: Readonly<HanjaOutlineSegment>
}>
export type ReviewedHanjaRevealContext = Readonly<{ id: 'u68d6' | 'u5e28' }>
const CHENG_CONTEXT: ReviewedHanjaRevealContext = Object.freeze({ id: 'u68d6' })
const SHUI_CONTEXT: ReviewedHanjaRevealContext = Object.freeze({ id: 'u5e28' })
const CHENG_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u68d6-10-2', kind: 'circle-start', segment: TARGET })
const SHUI_Q_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u5e28-5-2', kind: 'circle-start', segment: REVIEWED_SHUI_OUTLINES[4][1] })
const SHUI_PLANE_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u5e28-10-1', kind: 'global-projection', segment: REVIEWED_SHUI_OUTLINES[9][0] })
const REVIEWED_POLICIES = [CHENG_POLICY, SHUI_Q_POLICY, SHUI_PLANE_POLICY] as const

function sameStrokes(strokes: HanjaOutlineStrokes, expected: HanjaOutlineStrokes) {
  return Array.isArray(strokes) && strokes.length === expected.length && strokes.every((masks, pen) =>
    Array.isArray(masks) && masks.length === expected[pen].length && masks.every((mask, index) => sameSegment(mask, expected[pen][index])))
}

/** Exact whole-geometry context; a glyph label or a matching isolated curve is insufficient. */
export function reviewedHanjaRevealContext(strokes: HanjaOutlineStrokes): ReviewedHanjaRevealContext | null {
  if (hasReviewedHanjaStartGate(strokes)) return CHENG_CONTEXT
  return sameStrokes(strokes, REVIEWED_SHUI_OUTLINES) ? SHUI_CONTEXT : null
}

/** Zero-based pen/mask indices. Only contexts returned by the exact whole matcher are accepted. */
export function reviewedHanjaRevealPolicy(context: ReviewedHanjaRevealContext | null, strokeIndex: number, maskIndex: number): ReviewedHanjaRevealPolicy | null {
  if (context === CHENG_CONTEXT && strokeIndex === 9 && maskIndex === 1) return CHENG_POLICY
  if (context === SHUI_CONTEXT && strokeIndex === 4 && maskIndex === 1) return SHUI_Q_POLICY
  if (context === SHUI_CONTEXT && strokeIndex === 9 && maskIndex === 0) return SHUI_PLANE_POLICY
  return null
}

function exactPolicy(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment) {
  if (!REVIEWED_POLICIES.some(known => known === policy) || !sameSegment(segment, policy.segment)) throw new Error('Unreviewed reveal policy/geometry')
}

/** Canonical explicit source M/L/Q only, after the entire mask has matched its fixed allowlist. */
function reviewedSourceStart(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment) {
  exactPolicy(policy, segment)
  const guide = segment.revealPath!
  const number = '-?(?:0|[1-9]\\d*)(?:\\.\\d+)?'
  const grammar = new RegExp('^M' + number + ' ' + number + '(?:(?: L' + number + ' ' + number + ')|(?: Q' + number + ' ' + number + ' ' + number + ' ' + number + '))+$')
  if (!grammar.test(guide)) throw new Error('Noncanonical reviewed guide')
  const tokens = guide.match(/[MLQ]|-?\d+(?:\.\d+)?/g)!
  const x = Number(tokens[1]), y = Number(tokens[2]), dx = Number(tokens[4]) - x, dy = Number(tokens[5]) - y
  const length = Math.hypot(dx, dy)
  if (!(length > 0) || !Number.isFinite(length) || !Number.isFinite(segment.revealWidth) || segment.revealWidth! <= 0) throw new Error('Invalid reviewed source tangent/width')
  return { x, y, vx: dx / length, vy: dy / length, radius: segment.revealWidth! / 2 }
}

/** Only circle policies need a committed, matching SVG guide measurement. Plane never measures. */
export function measureReviewedHanjaRevealLength(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment, guide: GuideElement | null): number | null {
  exactPolicy(policy, segment)
  if (policy.kind !== 'circle-start' || !guide?.isConnected || guide.getAttribute('d') !== segment.revealPath) return null
  try {
    const length = guide.getTotalLength()
    return Number.isFinite(length) && length > 0 ? length : null
  } catch { return null }
}

export type ReviewedHanjaRevealClip = (HanjaStartGateClip & { kind: 'circle-start' }) | {
  kind: 'global-projection'
  center: readonly [number, number]
  tangent: readonly [number, number]
  normal: readonly [number, number]
  projectionMin: number
  projectionMax: number
  normalMin: number
  normalMax: number
  threshold: number
  points: string
}

/** Display clips only; the original round sweep remains present at p=1 and completed prefixes. */
export function reviewedHanjaRevealClip(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment, progress: number, guideLength: number | null): ReviewedHanjaRevealClip {
  const { x, y, vx, vy, radius } = reviewedSourceStart(policy, segment)
  if (!Number.isFinite(progress) || progress < 0 || progress > 1) throw new Error('Invalid reviewed reveal progress')
  const corner = (u: number, w: number) => [x + u * vx - w * vy, y + u * vy + w * vx]
  if (policy.kind === 'circle-start') {
    if (guideLength === null || !Number.isFinite(guideLength) || guideLength <= 0) throw new Error('Invalid reviewed guide measurement')
    const tau = Math.min(1, segment.revealWidth! / guideLength)
    const threshold = -radius + 2 * radius * Math.min(progress / tau, 1)
    const points = [corner(-radius, -radius), corner(threshold, -radius), corner(threshold, radius), corner(-radius, radius)].map(point => point.join(',')).join(' ')
    return { kind: 'circle-start', center: [x, y], radius, tangent: [vx, vy], projectionMin: -radius, projectionMax: radius, threshold, tau, active: progress > 0 && progress < tau, points }
  }
  if (policy !== SHUI_PLANE_POLICY || x !== 73 || y !== 57 || vx !== 0 || vy !== 1) throw new Error('Invalid fixed projection target')
  const vertices = [...segment.outline.matchAll(/(?:M|L)(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map(m => [Number(m[1]), Number(m[2])])
  const u = vertices.map(point => (point[0] - x) * vx + (point[1] - y) * vy)
  const w = vertices.map(point => -(point[0] - x) * vy + (point[1] - y) * vx)
  const a = Math.min(...u), b = Math.max(...u), normalMin = Math.min(...w), normalMax = Math.max(...w)
  if (a !== -1 || b !== 36 || normalMin !== -21 || normalMax !== 3) throw new Error('Changed source projection bounds')
  const threshold = a + (b - a) * progress
  const points = [corner(a, normalMin), corner(threshold, normalMin), corner(threshold, normalMax), corner(a, normalMax)].map(point => point.join(',')).join(' ')
  return { kind: 'global-projection', center: [x, y], tangent: [vx, vy], normal: [-vy, vx], projectionMin: a, projectionMax: b, normalMin, normalMax, threshold, points }
}
