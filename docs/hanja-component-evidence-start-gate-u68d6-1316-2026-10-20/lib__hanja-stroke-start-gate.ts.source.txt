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
const TARGET = REVIEWED_OUTLINES[9][1]
const FIELDS = ['outline', 'bounds', 'direction', 'weight', 'revealPath', 'revealWidth'] as const

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
