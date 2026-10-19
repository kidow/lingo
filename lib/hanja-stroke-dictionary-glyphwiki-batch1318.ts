import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'

const EXPECTED: readonly HanjaDictionaryStrokeData[] = [
  {
    "glyph": "麌",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-20",
    "geometrySource": "9e2c76ad7fd9eb4a499baf16d2fbf93677b85267d51855ec81c7941a647f3d65",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      6,
      7,
      4,
      8,
      9,
      10,
      12,
      13,
      14,
      15,
      17,
      21,
      18,
      19,
      20
    ],
    "paths": [
      "M55 6.95 L55 15 L49 15 L49 5.95 Z M55 6.95 L56.5 7.95 L54 9.45 Z",
      "M16 13 L92 13 L92 15 L16 15 Z M92 13 L82 14 L87 8.5 Z",
      "M19 13 L19 30.8 L13 30.8 L13 10 Z M13 30.8 L19 30.8 L17.8 32.6 L16 33.8 L14.2 32.6 Z M19 30.8 L18.7 34 L18.25 37.15 L17.6 40.1 L16.7 42.95 L15.6 45.6 L14.25 48.15 L12.75 50.5 L11 52.65 L9 54.6 L6.8 56.3 L6.15 55.7 L7.55 53.4 L8.8 51.15 L9.9 48.85 L10.85 46.5 L11.6 44.1 L12.2 41.65 L12.65 39.1 L12.95 36.4 L13.05 33.65 L13 30.8 Z",
      "M43 14.9 L43 30.1 L37 30.1 L37 13.9 Z M43 14.9 L44.5 15.9 L42 17.4 Z",
      "M65 14.9 L65 30.1 L59 30.1 L59 13.9 Z M65 14.9 L66.5 15.9 L64 17.4 Z",
      "M16 20.15 L83 20.15 L83 22.15 L16 22.15 Z M86 21.15 L86 30.1 L80 33.1 L80 21.15 Z M80 20.15 L83 17.65 L88.5 22.15 L86 24.15 L80 21.15 Z",
      "M16 28.1 L83 28.1 L83 30.1 L16 30.1 Z",
      "M31 36.5 L54 36.5 L54 38.5 L31 38.5 Z M54 36.5 L44 37.5 L49 32 Z",
      "M34 30.9 L34 46.9 L28 46.9 L28 29.9 Z M34 30.9 L35.5 31.9 L33 33.4 Z M20.65 45.4 L23.8 45.2 L27 45 L30.35 44.7 L33.75 44.45 L37.3 44.1 L40.9 43.8 L44.6 43.45 L48.4 43.1 L52.35 42.8 L56.4 42.55 L56.55 43.4 L52.7 44.65 L48.9 45.7 L45.15 46.65 L41.5 47.55 L37.9 48.3 L34.4 49.05 L31 49.7 L27.7 50.3 L24.45 50.85 L21.3 51.35 Z M21.3 51.35 L19.65 45.5 L20.65 45.4 Z M21.3 51.35 L24.1 49.55 L22.45 52.75 Z",
      "M84 38 L82.45 38.35 L80.75 38.65 L78.9 38.95 L76.95 39.2 L74.75 39.45 L72.45 39.7 L70 39.85 L67.35 40 L64.5 40.05 L61.55 40.05 L61.4 39.15 L64.25 38.35 L66.95 37.55 L69.45 36.8 L71.8 36.1 L73.95 35.45 L75.9 34.8 L77.7 34.15 L79.35 33.55 L80.75 32.95 L82 32.35 Z M81.5 32.5 L86.75 37 L84 38 Z M86.75 37 L86.85 38.55 L83.5 37.1 Z",
      "M64.5 30.9 L64.5 42.2 L58.5 42.2 L58.5 29.9 Z M64.5 30.9 L66 31.9 L63.5 33.4 Z M58.5 42.2 L64.5 42.2 L63.3 44 L61.5 45.2 L59.7 44 Z M64.5 42.2 L64.45 42.8 L64.45 43.3 L64.5 43.65 L64.5 43.9 L64.6 44.05 L64.7 44.25 L64.9 44.45 L65.25 44.65 L65.8 44.8 L66.5 44.95 L66.5 49.45 L65.25 49.45 L64.1 49.3 L62.95 49 L61.85 48.5 L60.85 47.8 L60.05 46.85 L59.35 45.8 L58.9 44.65 L58.6 43.45 L58.5 42.2 Z M66.5 44.95 L68.05 45.6 L68.75 47.2 L68.05 48.75 L66.5 49.45 Z M66.5 44.95 L90 44.95 L90 49.45 L66.5 49.45 Z M90 44.95 L91.35 45.85 L92.25 47.2 L91.35 48.55 L90 49.45 Z M90 44.95 L87.75 44.95 L90 38.45 L91 38.45 Z",
      "M40.35 54.5 L40.35 65.2 L34.35 68.2 L34.35 51.5 Z",
      "M37.35 54.5 L80.05 54.5 L80.05 56.5 L37.35 56.5 Z M83.05 55.5 L83.05 65.2 L77.05 68.2 L77.05 55.5 Z M77.05 54.5 L80.05 52 L85.55 56.5 L83.05 58.5 L77.05 55.5 Z",
      "M37.35 63.2 L80.05 63.2 L80.05 65.2 L37.35 65.2 Z",
      "M25.85 54.25 L25.85 72.55 L19.85 75.55 L19.85 53.25 Z M25.85 54.25 L27.35 55.25 L24.85 56.75 Z M22.85 70.55 L72.1 70.55 L72.1 72.55 L22.85 72.55 Z M75.1 71.55 L75.1 80.8 L69.1 80.8 L69.1 71.55 Z M69.1 70.55 L72.1 68.05 L77.6 72.55 L75.1 74.55 L69.1 71.55 Z",
      "M11.45 78.8 L93 78.8 L93 80.8 L11.45 80.8 Z M93 78.8 L83 79.8 L88 74.3 Z",
      "M55.55 71.55 L55 72.65 L52.95 76.4 L50.25 79.8 L47 82.75 L43.15 85.35 L38.75 87.6 L33.8 89.45 L28.3 91 L22.25 92.2 L15.65 93 L8.5 93.45 L8.4 92.55 L15.35 91.15 L21.7 89.6 L27.4 87.85 L32.45 85.9 L36.85 83.75 L40.6 81.45 L43.75 78.9 L46.2 76.25 L48.1 73.45 L48.9 71.55 Z",
      "M56.85 79.8 L59.25 80.8 L61.7 81.8 L64.4 82.8 L67.35 83.75 L70.55 84.6 L74.05 85.4 L77.85 86.1 L81.9 86.75 L86.25 87.3 L90.95 87.75 L90.15 94.3 L85.35 93.5 L80.85 92.55 L76.65 91.5 L72.75 90.35 L69.15 89.05 L65.85 87.65 L62.9 86.1 L60.3 84.4 L58.05 82.55 L56.3 80.5 Z M90.15 94.3 L90.95 87.75 L96.05 88.4 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M55 6.95 L55 15 L49 15 L49 5.95 Z M55 6.95 L56.5 7.95 L54 9.45 Z",
          "bounds": [
            49,
            5.95,
            56.5,
            15
          ],
          "direction": "down",
          "weight": 7.56
        }
      ],
      [
        {
          "outline": "M16 13 L92 13 L92 15 L16 15 Z M92 13 L82 14 L87 8.5 Z",
          "bounds": [
            16,
            8.5,
            92,
            15
          ],
          "direction": "right",
          "weight": 76
        }
      ],
      [
        {
          "outline": "M19 13 L19 30.8 L13 30.8 L13 10 Z M13 30.8 L19 30.8 L17.8 32.6 L16 33.8 L14.2 32.6 Z M19 30.8 L18.7 34 L18.25 37.15 L17.6 40.1 L16.7 42.95 L15.6 45.6 L14.25 48.15 L12.75 50.5 L11 52.65 L9 54.6 L6.8 56.3 L6.15 55.7 L7.55 53.4 L8.8 51.15 L9.9 48.85 L10.85 46.5 L11.6 44.1 L12.2 41.65 L12.65 39.1 L12.95 36.4 L13.05 33.65 L13 30.8 Z",
          "bounds": [
            6.15,
            10,
            19,
            56.3
          ],
          "direction": "curve",
          "weight": 43.731209,
          "revealPath": "M16 14.02 L16 30.82 Q16 46.36 6.5 56.02",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M43 14.9 L43 30.1 L37 30.1 L37 13.9 Z M43 14.9 L44.5 15.9 L42 17.4 Z",
          "bounds": [
            37,
            13.9,
            44.5,
            30.1
          ],
          "direction": "down",
          "weight": 14.7
        }
      ],
      [
        {
          "outline": "M65 14.9 L65 30.1 L59 30.1 L59 13.9 Z M65 14.9 L66.5 15.9 L64 17.4 Z",
          "bounds": [
            59,
            13.9,
            66.5,
            30.1
          ],
          "direction": "down",
          "weight": 14.7
        }
      ],
      [
        {
          "outline": "M16 20.15 L83 20.15 L83 22.15 L16 22.15 Z M86 21.15 L86 30.1 L80 33.1 L80 21.15 Z M80 20.15 L83 17.65 L88.5 22.15 L86 24.15 L80 21.15 Z",
          "bounds": [
            16,
            17.65,
            88.5,
            33.1
          ],
          "direction": "curve",
          "weight": 74.98,
          "revealPath": "M16 21.16 L83 21.16 L83 29.14",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M16 28.1 L83 28.1 L83 30.1 L16 30.1 Z",
          "bounds": [
            16,
            28.1,
            83,
            30.1
          ],
          "direction": "right",
          "weight": 67
        }
      ],
      [
        {
          "outline": "M31 36.5 L54 36.5 L54 38.5 L31 38.5 Z M54 36.5 L44 37.5 L49 32 Z",
          "bounds": [
            31,
            32,
            54,
            38.5
          ],
          "direction": "right",
          "weight": 23
        }
      ],
      [
        {
          "outline": "M34 30.9 L34 46.9 L28 46.9 L28 29.9 Z M34 30.9 L35.5 31.9 L33 33.4 Z",
          "bounds": [
            28,
            29.9,
            35.5,
            46.9
          ],
          "direction": "down",
          "weight": 15.54
        },
        {
          "outline": "M20.65 45.4 L23.8 45.2 L27 45 L30.35 44.7 L33.75 44.45 L37.3 44.1 L40.9 43.8 L44.6 43.45 L48.4 43.1 L52.35 42.8 L56.4 42.55 L56.55 43.4 L52.7 44.65 L48.9 45.7 L45.15 46.65 L41.5 47.55 L37.9 48.3 L34.4 49.05 L31 49.7 L27.7 50.3 L24.45 50.85 L21.3 51.35 Z M21.3 51.35 L19.65 45.5 L20.65 45.4 Z M21.3 51.35 L24.1 49.55 L22.45 52.75 Z",
          "bounds": [
            19.65,
            42.55,
            56.55,
            52.75
          ],
          "direction": "curve",
          "weight": 36.411696,
          "revealPath": "M20.5 48.46 Q36.5 46.78 56.5 43",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M84 38 L82.45 38.35 L80.75 38.65 L78.9 38.95 L76.95 39.2 L74.75 39.45 L72.45 39.7 L70 39.85 L67.35 40 L64.5 40.05 L61.55 40.05 L61.4 39.15 L64.25 38.35 L66.95 37.55 L69.45 36.8 L71.8 36.1 L73.95 35.45 L75.9 34.8 L77.7 34.15 L79.35 33.55 L80.75 32.95 L82 32.35 Z M81.5 32.5 L86.75 37 L84 38 Z M86.75 37 L86.85 38.55 L83.5 37.1 Z",
          "bounds": [
            61.4,
            32.35,
            86.85,
            40.05
          ],
          "direction": "curve",
          "weight": 22.479867,
          "revealPath": "M83.5 35.02 Q76.5 37.54 61.5 39.64",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M64.5 30.9 L64.5 42.2 L58.5 42.2 L58.5 29.9 Z M64.5 30.9 L66 31.9 L63.5 33.4 Z M58.5 42.2 L64.5 42.2 L63.3 44 L61.5 45.2 L59.7 44 Z M64.5 42.2 L64.45 42.8 L64.45 43.3 L64.5 43.65 L64.5 43.9 L64.6 44.05 L64.7 44.25 L64.9 44.45 L65.25 44.65 L65.8 44.8 L66.5 44.95 L66.5 49.45 L65.25 49.45 L64.1 49.3 L62.95 49 L61.85 48.5 L60.85 47.8 L60.05 46.85 L59.35 45.8 L58.9 44.65 L58.6 43.45 L58.5 42.2 Z M66.5 44.95 L68.05 45.6 L68.75 47.2 L68.05 48.75 L66.5 49.45 Z M66.5 44.95 L90 44.95 L90 49.45 L66.5 49.45 Z M90 44.95 L91.35 45.85 L92.25 47.2 L91.35 48.55 L90 49.45 Z",
          "bounds": [
            58.5,
            29.9,
            92.25,
            49.45
          ],
          "direction": "curve",
          "weight": 42.371068,
          "revealPath": "M61.5 30.4 L61.5 42.2 Q61.5 47.2 66.5 47.2 L90 47.2",
          "revealWidth": 14
        },
        {
          "outline": "M90 44.95 L87.75 44.95 L90 38.45 L91 38.45 Z",
          "bounds": [
            87.75,
            38.45,
            91,
            44.95
          ],
          "direction": "up",
          "weight": 6.5
        }
      ],
      [
        {
          "outline": "M40.35 54.5 L40.35 65.2 L34.35 68.2 L34.35 51.5 Z",
          "bounds": [
            34.35,
            51.5,
            40.35,
            68.2
          ],
          "direction": "down",
          "weight": 8.7318
        }
      ],
      [
        {
          "outline": "M37.35 54.5 L80.05 54.5 L80.05 56.5 L37.35 56.5 Z M83.05 55.5 L83.05 65.2 L77.05 68.2 L77.05 55.5 Z M77.05 54.5 L80.05 52 L85.55 56.5 L83.05 58.5 L77.05 55.5 Z",
          "bounds": [
            37.35,
            52,
            85.55,
            68.2
          ],
          "direction": "curve",
          "weight": 51.4372,
          "revealPath": "M37.3623 55.509100000000004 L80.0677 55.509100000000004 L80.0677 64.2409",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M37.35 63.2 L80.05 63.2 L80.05 65.2 L37.35 65.2 Z",
          "bounds": [
            37.35,
            63.2,
            80.05,
            65.2
          ],
          "direction": "right",
          "weight": 42.7054
        }
      ],
      [
        {
          "outline": "M25.85 54.25 L25.85 72.55 L19.85 75.55 L19.85 53.25 Z M25.85 54.25 L27.35 55.25 L24.85 56.75 Z M22.85 70.55 L72.1 70.55 L72.1 72.55 L22.85 72.55 Z M75.1 71.55 L75.1 80.8 L69.1 80.8 L69.1 71.55 Z M69.1 70.55 L72.1 68.05 L77.6 72.55 L75.1 74.55 L69.1 71.55 Z",
          "bounds": [
            19.85,
            53.25,
            77.6,
            80.8
          ],
          "direction": "curve",
          "weight": 75.3225,
          "revealPath": "M22.895 53.769999999999996 L22.895 71.59 L72.1475 71.59 L72.1475 79.84",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M11.45 78.8 L93 78.8 L93 80.8 L11.45 80.8 Z M93 78.8 L83 79.8 L88 74.3 Z",
          "bounds": [
            11.45,
            74.3,
            93,
            80.8
          ],
          "direction": "right",
          "weight": 81.59
        }
      ],
      [
        {
          "outline": "M55.55 71.55 L55 72.65 L52.95 76.4 L50.25 79.8 L47 82.75 L43.15 85.35 L38.75 87.6 L33.8 89.45 L28.3 91 L22.25 92.2 L15.65 93 L8.5 93.45 L8.4 92.55 L15.35 91.15 L21.7 89.6 L27.4 87.85 L32.45 85.9 L36.85 83.75 L40.6 81.45 L43.75 78.9 L46.2 76.25 L48.1 73.45 L48.9 71.55 Z",
          "bounds": [
            8.4,
            71.55,
            55.55,
            93.45
          ],
          "direction": "curve",
          "weight": 48.752343,
          "revealPath": "M52.2475 71.59 Q45.2825 89.08 8.467500000000001 93.03999999999999",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M56.85 79.8 L59.25 80.8 L61.7 81.8 L64.4 82.8 L67.35 83.75 L70.55 84.6 L74.05 85.4 L77.85 86.1 L81.9 86.75 L86.25 87.3 L90.95 87.75 L90.15 94.3 L85.35 93.5 L80.85 92.55 L76.65 91.5 L72.75 90.35 L69.15 89.05 L65.85 87.65 L62.9 86.1 L60.3 84.4 L58.05 82.55 L56.3 80.5 Z M90.15 94.3 L90.95 87.75 L96.05 88.4 Z",
          "bounds": [
            56.3,
            79.8,
            96.05,
            94.3
          ],
          "direction": "curve",
          "weight": 36.114618,
          "revealPath": "M56.2275 79.84 Q66.1775 88.09 90.555 91.06",
          "revealWidth": 14
        }
      ]
    ],
    "pathsSha256": "4d80745cc8686dfd3070b82fc18c0cb51aa6890995352eef2a00be5457d28ffa",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E8C.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9E00/9E8C.svg",
      "dictionarySvgSha256": "332b2696002215a9918d0549a5305d14580ea6a73066222cb1a17c643e83a31b",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
      "orderReviewSha256": "1b9c4258dd8389c411db17c81ca69c292faf25d0ea2b68e638b9aff7f6ae9d9d",
      "geometryReviewSha256": "1b9c4258dd8389c411db17c81ca69c292faf25d0ea2b68e638b9aff7f6ae9d9d",
      "directionReviewSha256": "1b9c4258dd8389c411db17c81ca69c292faf25d0ea2b68e638b9aff7f6ae9d9d"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki Project and contributors",
      "url": "https://glyphwiki.org/wiki/GlyphWiki:License@18",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "고정 source 참조순열과 UP partition을 보존한 exact-target circle/growing-caps 표시정책; 독립 component 관찰 별도",
      "editableSource": "/hanja-strokes/glyphwiki/u9e8c.json",
      "modifications": "원麌 u9e8c full5와 48polygon·18획 전체 mask 필드를 보존합니다. 원logical9의 VQ gap은 연결하지 않고 두 독립mask로 재생하며 원11 UP3006/5 마지막quad는 기존 exact분리 mask를 유지합니다. 완전pen 참조순열[1,2,3,5,6,4,7..18]로 당시미확인5/6까지 새 standalone 전방향으로 확인했습니다. exact전체geometry guard의9m2 circle-start 및11m1 growing-caps만 앱 표시정책을 사용합니다. 두 target은100%/완료prefix/whole에서도 fullround mask를 유지하며 원형상을 unmask로 덮지 않습니다. 원760/939 canonical OBJECT1·source8·이전 FAIL/HOLD·isolatedrenderer/native2·harness/snapshot의 당시false는 그대로 보존합니다. 이번 실제 전체 StrokeOutlines의 SSR/hydration 브라우저 PASS는 새1318review에만 기록합니다. 초기 stale tab/dataURL 정책과 잘못된 crop/숨김창/클릭전 helper누락은 root가 환경·locator만 교정했으며 geometry gate FAIL이 아닙니다. actualAppUI/controller/storage/routes 미검증false, runtime 작성 source/fixture/compiler/derive/engine/build 실행0입니다."
    }
  }
]

export function loadGlyphWikiBatch1318Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (arguments.length !== 1 || JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('Invalid GlyphWiki batch1318 reviewed bundle')
  return EXPECTED
}

export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1318_STROKES: ReturnType<typeof loadGlyphWikiBatch1318Strokes> = EXPECTED
