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

// Exact standalone-reviewed 麌 source-order geometry; no source getter or registry lookup.
const REVIEWED_YU_OUTLINES: HanjaOutlineStrokes = [[{"outline":"M55 6.95 L55 15 L49 15 L49 5.95 Z M55 6.95 L56.5 7.95 L54 9.45 Z","bounds":[49,5.95,56.5,15],"direction":"down","weight":7.56}],[{"outline":"M16 13 L92 13 L92 15 L16 15 Z M92 13 L82 14 L87 8.5 Z","bounds":[16,8.5,92,15],"direction":"right","weight":76}],[{"outline":"M19 13 L19 30.8 L13 30.8 L13 10 Z M13 30.8 L19 30.8 L17.8 32.6 L16 33.8 L14.2 32.6 Z M19 30.8 L18.7 34 L18.25 37.15 L17.6 40.1 L16.7 42.95 L15.6 45.6 L14.25 48.15 L12.75 50.5 L11 52.65 L9 54.6 L6.8 56.3 L6.15 55.7 L7.55 53.4 L8.8 51.15 L9.9 48.85 L10.85 46.5 L11.6 44.1 L12.2 41.65 L12.65 39.1 L12.95 36.4 L13.05 33.65 L13 30.8 Z","bounds":[6.15,10,19,56.3],"direction":"curve","weight":43.731209,"revealPath":"M16 14.02 L16 30.82 Q16 46.36 6.5 56.02","revealWidth":14}],[{"outline":"M43 14.9 L43 30.1 L37 30.1 L37 13.9 Z M43 14.9 L44.5 15.9 L42 17.4 Z","bounds":[37,13.9,44.5,30.1],"direction":"down","weight":14.7}],[{"outline":"M65 14.9 L65 30.1 L59 30.1 L59 13.9 Z M65 14.9 L66.5 15.9 L64 17.4 Z","bounds":[59,13.9,66.5,30.1],"direction":"down","weight":14.7}],[{"outline":"M16 20.15 L83 20.15 L83 22.15 L16 22.15 Z M86 21.15 L86 30.1 L80 33.1 L80 21.15 Z M80 20.15 L83 17.65 L88.5 22.15 L86 24.15 L80 21.15 Z","bounds":[16,17.65,88.5,33.1],"direction":"curve","weight":74.98,"revealPath":"M16 21.16 L83 21.16 L83 29.14","revealWidth":14}],[{"outline":"M16 28.1 L83 28.1 L83 30.1 L16 30.1 Z","bounds":[16,28.1,83,30.1],"direction":"right","weight":67}],[{"outline":"M31 36.5 L54 36.5 L54 38.5 L31 38.5 Z M54 36.5 L44 37.5 L49 32 Z","bounds":[31,32,54,38.5],"direction":"right","weight":23}],[{"outline":"M34 30.9 L34 46.9 L28 46.9 L28 29.9 Z M34 30.9 L35.5 31.9 L33 33.4 Z","bounds":[28,29.9,35.5,46.9],"direction":"down","weight":15.54},{"outline":"M20.65 45.4 L23.8 45.2 L27 45 L30.35 44.7 L33.75 44.45 L37.3 44.1 L40.9 43.8 L44.6 43.45 L48.4 43.1 L52.35 42.8 L56.4 42.55 L56.55 43.4 L52.7 44.65 L48.9 45.7 L45.15 46.65 L41.5 47.55 L37.9 48.3 L34.4 49.05 L31 49.7 L27.7 50.3 L24.45 50.85 L21.3 51.35 Z M21.3 51.35 L19.65 45.5 L20.65 45.4 Z M21.3 51.35 L24.1 49.55 L22.45 52.75 Z","bounds":[19.65,42.55,56.55,52.75],"direction":"curve","weight":36.411696,"revealPath":"M20.5 48.46 Q36.5 46.78 56.5 43","revealWidth":14}],[{"outline":"M84 38 L82.45 38.35 L80.75 38.65 L78.9 38.95 L76.95 39.2 L74.75 39.45 L72.45 39.7 L70 39.85 L67.35 40 L64.5 40.05 L61.55 40.05 L61.4 39.15 L64.25 38.35 L66.95 37.55 L69.45 36.8 L71.8 36.1 L73.95 35.45 L75.9 34.8 L77.7 34.15 L79.35 33.55 L80.75 32.95 L82 32.35 Z M81.5 32.5 L86.75 37 L84 38 Z M86.75 37 L86.85 38.55 L83.5 37.1 Z","bounds":[61.4,32.35,86.85,40.05],"direction":"curve","weight":22.479867,"revealPath":"M83.5 35.02 Q76.5 37.54 61.5 39.64","revealWidth":14}],[{"outline":"M64.5 30.9 L64.5 42.2 L58.5 42.2 L58.5 29.9 Z M64.5 30.9 L66 31.9 L63.5 33.4 Z M58.5 42.2 L64.5 42.2 L63.3 44 L61.5 45.2 L59.7 44 Z M64.5 42.2 L64.45 42.8 L64.45 43.3 L64.5 43.65 L64.5 43.9 L64.6 44.05 L64.7 44.25 L64.9 44.45 L65.25 44.65 L65.8 44.8 L66.5 44.95 L66.5 49.45 L65.25 49.45 L64.1 49.3 L62.95 49 L61.85 48.5 L60.85 47.8 L60.05 46.85 L59.35 45.8 L58.9 44.65 L58.6 43.45 L58.5 42.2 Z M66.5 44.95 L68.05 45.6 L68.75 47.2 L68.05 48.75 L66.5 49.45 Z M66.5 44.95 L90 44.95 L90 49.45 L66.5 49.45 Z M90 44.95 L91.35 45.85 L92.25 47.2 L91.35 48.55 L90 49.45 Z","bounds":[58.5,29.9,92.25,49.45],"direction":"curve","weight":42.371068,"revealPath":"M61.5 30.4 L61.5 42.2 Q61.5 47.2 66.5 47.2 L90 47.2","revealWidth":14},{"outline":"M90 44.95 L87.75 44.95 L90 38.45 L91 38.45 Z","bounds":[87.75,38.45,91,44.95],"direction":"up","weight":6.5}],[{"outline":"M40.35 54.5 L40.35 65.2 L34.35 68.2 L34.35 51.5 Z","bounds":[34.35,51.5,40.35,68.2],"direction":"down","weight":8.7318}],[{"outline":"M37.35 54.5 L80.05 54.5 L80.05 56.5 L37.35 56.5 Z M83.05 55.5 L83.05 65.2 L77.05 68.2 L77.05 55.5 Z M77.05 54.5 L80.05 52 L85.55 56.5 L83.05 58.5 L77.05 55.5 Z","bounds":[37.35,52,85.55,68.2],"direction":"curve","weight":51.4372,"revealPath":"M37.3623 55.509100000000004 L80.0677 55.509100000000004 L80.0677 64.2409","revealWidth":14}],[{"outline":"M37.35 63.2 L80.05 63.2 L80.05 65.2 L37.35 65.2 Z","bounds":[37.35,63.2,80.05,65.2],"direction":"right","weight":42.7054}],[{"outline":"M25.85 54.25 L25.85 72.55 L19.85 75.55 L19.85 53.25 Z M25.85 54.25 L27.35 55.25 L24.85 56.75 Z M22.85 70.55 L72.1 70.55 L72.1 72.55 L22.85 72.55 Z M75.1 71.55 L75.1 80.8 L69.1 80.8 L69.1 71.55 Z M69.1 70.55 L72.1 68.05 L77.6 72.55 L75.1 74.55 L69.1 71.55 Z","bounds":[19.85,53.25,77.6,80.8],"direction":"curve","weight":75.3225,"revealPath":"M22.895 53.769999999999996 L22.895 71.59 L72.1475 71.59 L72.1475 79.84","revealWidth":14}],[{"outline":"M11.45 78.8 L93 78.8 L93 80.8 L11.45 80.8 Z M93 78.8 L83 79.8 L88 74.3 Z","bounds":[11.45,74.3,93,80.8],"direction":"right","weight":81.59}],[{"outline":"M55.55 71.55 L55 72.65 L52.95 76.4 L50.25 79.8 L47 82.75 L43.15 85.35 L38.75 87.6 L33.8 89.45 L28.3 91 L22.25 92.2 L15.65 93 L8.5 93.45 L8.4 92.55 L15.35 91.15 L21.7 89.6 L27.4 87.85 L32.45 85.9 L36.85 83.75 L40.6 81.45 L43.75 78.9 L46.2 76.25 L48.1 73.45 L48.9 71.55 Z","bounds":[8.4,71.55,55.55,93.45],"direction":"curve","weight":48.752343,"revealPath":"M52.2475 71.59 Q45.2825 89.08 8.467500000000001 93.03999999999999","revealWidth":14}],[{"outline":"M56.85 79.8 L59.25 80.8 L61.7 81.8 L64.4 82.8 L67.35 83.75 L70.55 84.6 L74.05 85.4 L77.85 86.1 L81.9 86.75 L86.25 87.3 L90.95 87.75 L90.15 94.3 L85.35 93.5 L80.85 92.55 L76.65 91.5 L72.75 90.35 L69.15 89.05 L65.85 87.65 L62.9 86.1 L60.3 84.4 L58.05 82.55 L56.3 80.5 Z M90.15 94.3 L90.95 87.75 L96.05 88.4 Z","bounds":[56.3,79.8,96.05,94.3],"direction":"curve","weight":36.114618,"revealPath":"M56.2275 79.84 Q66.1775 88.09 90.555 91.06","revealWidth":14}]]
freezeReviewedStrokes(REVIEWED_YU_OUTLINES)

export type ReviewedHanjaRevealPolicy = Readonly<{
  id: 'u68d6-10-2' | 'u5e28-5-2' | 'u5e28-10-1' | 'u9e8c-9-2' | 'u9e8c-11-1'
  kind: 'circle-start' | 'global-projection' | 'growing-caps'
  segment: Readonly<HanjaOutlineSegment>
}>
export type ReviewedHanjaRevealContext = Readonly<{ id: 'u68d6' | 'u5e28' | 'u9e8c' }>
const CHENG_CONTEXT: ReviewedHanjaRevealContext = Object.freeze({ id: 'u68d6' })
const SHUI_CONTEXT: ReviewedHanjaRevealContext = Object.freeze({ id: 'u5e28' })
const CHENG_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u68d6-10-2', kind: 'circle-start', segment: TARGET })
const SHUI_Q_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u5e28-5-2', kind: 'circle-start', segment: REVIEWED_SHUI_OUTLINES[4][1] })
const SHUI_PLANE_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u5e28-10-1', kind: 'global-projection', segment: REVIEWED_SHUI_OUTLINES[9][0] })
const YU_CONTEXT: ReviewedHanjaRevealContext = Object.freeze({ id: 'u9e8c' })
const YU_Q_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u9e8c-9-2', kind: 'circle-start', segment: REVIEWED_YU_OUTLINES[8][1] })
const YU_GROWING_POLICY: ReviewedHanjaRevealPolicy = Object.freeze({ id: 'u9e8c-11-1', kind: 'growing-caps', segment: REVIEWED_YU_OUTLINES[10][0] })
const REVIEWED_POLICIES = [CHENG_POLICY, SHUI_Q_POLICY, SHUI_PLANE_POLICY, YU_Q_POLICY, YU_GROWING_POLICY] as const

function sameStrokes(strokes: HanjaOutlineStrokes, expected: HanjaOutlineStrokes) {
  return Array.isArray(strokes) && strokes.length === expected.length && strokes.every((masks, pen) =>
    Array.isArray(masks) && masks.length === expected[pen].length && masks.every((mask, index) => sameSegment(mask, expected[pen][index])))
}

/** Exact whole-geometry context; a glyph label or a matching isolated curve is insufficient. */
export function reviewedHanjaRevealContext(strokes: HanjaOutlineStrokes): ReviewedHanjaRevealContext | null {
  if (hasReviewedHanjaStartGate(strokes)) return CHENG_CONTEXT
  if (sameStrokes(strokes, REVIEWED_SHUI_OUTLINES)) return SHUI_CONTEXT
  return sameStrokes(strokes, REVIEWED_YU_OUTLINES) ? YU_CONTEXT : null
}

/** Zero-based pen/mask indices. Only contexts returned by the exact whole matcher are accepted. */
export function reviewedHanjaRevealPolicy(context: ReviewedHanjaRevealContext | null, strokeIndex: number, maskIndex: number): ReviewedHanjaRevealPolicy | null {
  if (context === CHENG_CONTEXT && strokeIndex === 9 && maskIndex === 1) return CHENG_POLICY
  if (context === SHUI_CONTEXT && strokeIndex === 4 && maskIndex === 1) return SHUI_Q_POLICY
  if (context === SHUI_CONTEXT && strokeIndex === 9 && maskIndex === 0) return SHUI_PLANE_POLICY
  if (context === YU_CONTEXT && strokeIndex === 8 && maskIndex === 1) return YU_Q_POLICY
  if (context === YU_CONTEXT && strokeIndex === 10 && maskIndex === 0) return YU_GROWING_POLICY
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


export type ReviewedGrowingGuide = Pick<SVGPathElement, 'isConnected' | 'ownerSVGElement' | 'getAttribute' | 'setAttribute' | 'removeAttribute' | 'getTotalLength' | 'getPointAtLength'>
type GrowingAttributeNode = Pick<SVGElement, 'isConnected' | 'ownerSVGElement' | 'getAttribute' | 'setAttribute' | 'removeAttribute'>
export type ReviewedGrowingNodes = { guide: ReviewedGrowingGuide | null; startCap: GrowingAttributeNode | null; endCap: GrowingAttributeNode | null; ink: GrowingAttributeNode | null }
export type ReviewedGrowingFrame = Readonly<{ policyId: string; guide: string; progress: number; L: number; d: number; rho: number; q0: readonly [number, number]; point: Readonly<{ x: number; y: number }> }>

function growingSource(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment) {
  exactPolicy(policy, segment)
  if (policy !== YU_GROWING_POLICY) throw new Error('Only exact reviewed 麌11m1 growing caps')
  const start = reviewedSourceStart(policy, segment), tokens = segment.revealPath!.split(' ')
  if (tokens.length !== 10 || tokens[0] !== 'M61.5' || tokens[2] !== 'L61.5' || tokens[4] !== 'Q61.5' || tokens[8] !== 'L90') throw new Error('Exact original MLQL required')
  const q0: [number, number] = [start.x, start.y], a = [Number(tokens[2].slice(1)),Number(tokens[3])], c = [Number(tokens[4].slice(1)),Number(tokens[5])], b = [Number(tokens[6]),Number(tokens[7])], end = [Number(tokens[8].slice(1)),Number(tokens[9])]
  const v = [a[0]-q0[0],a[1]-q0[1]], u = [c[0]-a[0],c[1]-a[1]], z = [b[0]-c[0],b[1]-c[1]], w = [end[0]-b[0],end[1]-b[1]], firstL = Math.hypot(...v)
  const aligned = (x: number[], y: number[]) => x[0]*y[1]-x[1]*y[0] === 0 && x[0]*y[0]+x[1]*y[1] > 0
  if (segment.revealPath !== 'M61.5 30.4 L61.5 42.2 Q61.5 47.2 66.5 47.2 L90 47.2' || firstL < start.radius || !aligned(v,u) || !aligned(z,w) || Math.hypot(...u) === 0 || Math.hypot(...z) === 0 || u[0]*z[0]+u[1]*z[1] < 0) throw new Error('Original regular G1 MLQL/first-L guard')
  return { q0, r: start.radius, firstL }
}

/** One exact connected UA path, one length read and one endpoint read for this exact local p. */
export function measureReviewedGrowingCapsFrame(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment, progress: number, guide: ReviewedGrowingGuide | null): ReviewedGrowingFrame {
  const source = growingSource(policy, segment)
  if (!Number.isFinite(progress) || progress < 0 || progress > 1) throw new Error('Invalid growing progress')
  const exact = () => !!guide?.isConnected && guide.getAttribute('d') === segment.revealPath && guide.getAttribute('pathLength') === '1' && guide.getAttribute('stroke-width') === String(segment.revealWidth) && guide.getAttribute('stroke-linecap') === 'butt' && guide.getAttribute('stroke-linejoin') === 'miter'
  if (!exact()) throw new Error('Exact committed growing guide required')
  const L = guide!.getTotalLength()
  if (!Number.isFinite(L) || L < source.r) throw new Error('Growing browser length must reach radius')
  const d = Math.min(progress * L, L), point = guide!.getPointAtLength(d)
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !exact()) throw new Error('Invalid or changed UA growing endpoint')
  if (progress === 0 && Math.hypot(point.x-source.q0[0],point.y-source.q0[1]) >= 1e-4) throw new Error('UA start differs from original M')
  return Object.freeze({ policyId: policy.id, guide: segment.revealPath!, progress, L, d, rho: Math.min(source.r,d), q0: Object.freeze(source.q0), point: Object.freeze({ x: point.x, y: point.y }) })
}

/** Synchronous layout commit only. Reset is also the StrictMode/unmount cleanup; no React or extra RAF. */
export function commitReviewedGrowingCaps(policy: ReviewedHanjaRevealPolicy, segment: HanjaOutlineSegment, progress: number, clipId: string, nodes: ReviewedGrowingNodes) {
  const { guide, startCap, endCap, ink } = nodes
  const reset = () => {
    ink?.setAttribute('visibility','hidden')
    guide?.setAttribute('stroke-dasharray','0 2')
    for (const cap of [startCap,endCap]) { cap?.setAttribute('r','0'); cap?.setAttribute('cx','0'); cap?.setAttribute('cy','0') }
    for (const key of ['data-growing-progress','data-growing-length','data-growing-distance','data-growing-radius','data-growing-end-x','data-growing-end-y']) ink?.removeAttribute(key)
  }
  reset()
  try {
    growingSource(policy, segment)
    if (!Number.isFinite(progress) || progress < 0 || progress > 1 || !/^[A-Za-z0-9_:.-]+$/.test(clipId)) throw new Error('Invalid growing frame/id')
    if (progress === 0 || progress === 1) return { status: progress === 0 ? 'empty' as const : 'complete' as const, frame: null, cleanup: reset }
    if (!guide || !startCap || !endCap || !ink || !guide.ownerSVGElement || [guide,startCap,endCap,ink].some(node => !node.isConnected || node.ownerSVGElement !== guide.ownerSVGElement || node.getAttribute('data-growing-owner') !== clipId)) throw new Error('Mismatched growing refs/id')
    if (guide.getAttribute('id') !== clipId+'-growing-guide' || ink.getAttribute('mask') !== 'url(#'+clipId+'-growing)') throw new Error('Mismatched growing SVG binding')
    const frame = measureReviewedGrowingCapsFrame(policy, segment, progress, guide)
    guide.setAttribute('stroke-dasharray',String(frame.progress)+' 2')
    startCap.setAttribute('cx',String(frame.q0[0])); startCap.setAttribute('cy',String(frame.q0[1])); startCap.setAttribute('r',String(frame.rho))
    endCap.setAttribute('cx',String(frame.point.x)); endCap.setAttribute('cy',String(frame.point.y)); endCap.setAttribute('r',String(frame.rho))
    for (const [key,value] of Object.entries({ 'data-growing-progress':frame.progress,'data-growing-length':frame.L,'data-growing-distance':frame.d,'data-growing-radius':frame.rho,'data-growing-end-x':frame.point.x,'data-growing-end-y':frame.point.y })) ink.setAttribute(key,String(value))
    ink.setAttribute('visibility','visible') // last write: dash and both caps already describe the same measured p
    return { status: 'visible' as const, frame, cleanup: reset }
  } catch { reset(); return { status: 'hidden' as const, frame: null, cleanup: reset } }
}
