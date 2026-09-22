/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch74.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "伻",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-22",
    "geometrySource": "258a7377f01ae48b9b9c465f65aa11a9a3d1e11146facc82529204c9646089f5",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      5,
      4,
      6,
      7
    ],
    "pathsSha256": "5483ee13caefcb45f33ec9bef5366c68ebebd26ba391537a3e6bd05d27b98c62",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F3B.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/4F00/4F3B.svg",
      "dictionarySvgSha256": "020adba6872129a05b6ea21e5be1a13d374a13f88e639b0da097989062dcec8e",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6,7",
      "orderReviewSha256": "e1438826e93527f2e771e047101ed1845bc78ec528c8c0316d230dbf814300d8",
      "geometryReviewSha256": "e1438826e93527f2e771e047101ed1845bc78ec528c8c0316d230dbf814300d8",
      "directionReviewSha256": "e1438826e93527f2e771e047101ed1845bc78ec528c8c0316d230dbf814300d8"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/4f3b.json",
      "modifications": "Complete original u4f3b glyph from the pinned 2016 GlyphWiki backup scaled200 to100. Swap source middle strokes4/5 to domestic left-falling then right-dot order. Preserve all three original quadratic paths and every outline vertex with normalized winding. No new path, component replacement, mirroring, bridge, trimming or coordinate correction."
    },
    "paths": [
      "M35.9 9 L33.55 14.55 L31.05 20 L28.45 25.35 L25.75 30.5 L22.95 35.6 L19.95 40.5 L16.9 45.3 L13.65 49.95 L10.25 54.45 L6.65 58.75 L5.95 58.2 L8.7 53.4 L11.4 48.55 L14.05 43.65 L16.65 38.65 L19.2 33.6 L21.6 28.45 L23.9 23.2 L26.15 17.85 L28.25 12.4 L30.3 6.85 Z M30.1 7.35 L30.55 6.2 L35.9 9 Z M35.9 9 L36.95 10.5 L34.05 11 Z",
      "M25.4 37 L25.4 91.5 L19.4 94.5 L19.4 36 Z M25.4 37 L26.9 38 L24.4 39.5 Z",
      "M38 14 L89.45 14 L89.45 16 L38 16 Z M89.45 14 L77.45 15 L83.45 9 Z",
      "M55.9 25.35 L54.8 28.05 L53.6 30.65 L52.25 33.2 L50.75 35.65 L49.1 38.1 L47.3 40.4 L45.4 42.65 L43.35 44.85 L41.1 46.9 L38.7 48.8 L38 48.15 L39.7 45.65 L41.25 43.15 L42.75 40.7 L44.2 38.3 L45.45 35.85 L46.65 33.45 L47.7 31 L48.65 28.5 L49.5 26.05 L50.2 23.55 Z M50.05 24 L50.45 22.75 L55.9 25.35 Z M55.9 25.35 L57.05 26.8 L54.2 27.45 Z",
      "M73.8 24.05 L76 25.75 L78.05 27.6 L79.9 29.5 L81.6 31.45 L83.15 33.5 L84.6 35.55 L85.9 37.65 L87.05 39.8 L88.1 41.95 L89 44.15 L83.25 45.9 L82.75 43.9 L82.15 41.9 L81.4 39.85 L80.55 37.75 L79.6 35.7 L78.5 33.55 L77.3 31.4 L76 29.25 L74.6 27 L73.15 24.65 Z M89 44.15 L88.75 46.45 L87 47.9 L84.75 47.65 L83.25 45.9 Z",
      "M34 55.5 L93.45 55.5 L93.45 57.5 L34 57.5 Z M93.45 55.5 L81.45 56.5 L87.45 50.5 Z",
      "M66.75 14 L66.75 91 L60.75 94 L60.75 14 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M35.9 9 L33.55 14.55 L31.05 20 L28.45 25.35 L25.75 30.5 L22.95 35.6 L19.95 40.5 L16.9 45.3 L13.65 49.95 L10.25 54.45 L6.65 58.75 L5.95 58.2 L8.7 53.4 L11.4 48.55 L14.05 43.65 L16.65 38.65 L19.2 33.6 L21.6 28.45 L23.9 23.2 L26.15 17.85 L28.25 12.4 L30.3 6.85 Z M30.1 7.35 L30.55 6.2 L35.9 9 Z M35.9 9 L36.95 10.5 L34.05 11 Z",
          "bounds": [
            5.95,
            6.2,
            36.95,
            58.75
          ],
          "direction": "curve",
          "weight": 57.690953,
          "revealPath": "M33.2975 7.5 Q22.43 36 6.33 58.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.4 37 L25.4 91.5 L19.4 94.5 L19.4 36 Z M25.4 37 L26.9 38 L24.4 39.5 Z",
          "bounds": [
            19.4,
            36,
            26.9,
            94.5
          ],
          "direction": "down",
          "weight": 56.5
        }
      ],
      [
        {
          "outline": "M38 14 L89.45 14 L89.45 16 L38 16 Z M89.45 14 L77.45 15 L83.45 9 Z",
          "bounds": [
            38,
            9,
            89.45,
            16
          ],
          "direction": "right",
          "weight": 51.475
        }
      ],
      [
        {
          "outline": "M55.9 25.35 L54.8 28.05 L53.6 30.65 L52.25 33.2 L50.75 35.65 L49.1 38.1 L47.3 40.4 L45.4 42.65 L43.35 44.85 L41.1 46.9 L38.7 48.8 L38 48.15 L39.7 45.65 L41.25 43.15 L42.75 40.7 L44.2 38.3 L45.45 35.85 L46.65 33.45 L47.7 31 L48.65 28.5 L49.5 26.05 L50.2 23.55 Z M50.05 24 L50.45 22.75 L55.9 25.35 Z M55.9 25.35 L57.05 26.8 L54.2 27.45 Z",
          "bounds": [
            38,
            22.75,
            57.05,
            48.8
          ],
          "direction": "curve",
          "weight": 28.655609,
          "revealPath": "M53.2375 24 Q48.8875 37.5 38.375 48.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M73.8 24.05 L76 25.75 L78.05 27.6 L79.9 29.5 L81.6 31.45 L83.15 33.5 L84.6 35.55 L85.9 37.65 L87.05 39.8 L88.1 41.95 L89 44.15 L83.25 45.9 L82.75 43.9 L82.15 41.9 L81.4 39.85 L80.55 37.75 L79.6 35.7 L78.5 33.55 L77.3 31.4 L76 29.25 L74.6 27 L73.15 24.65 Z M89 44.15 L88.75 46.45 L87 47.9 L84.75 47.65 L83.25 45.9 Z",
          "bounds": [
            73.15,
            24.05,
            89,
            47.9
          ],
          "direction": "curve",
          "weight": 26.194373,
          "revealPath": "M73.175 24 Q82.9625 34.5 86.5875 46.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M34 55.5 L93.45 55.5 L93.45 57.5 L34 57.5 Z M93.45 55.5 L81.45 56.5 L87.45 50.5 Z",
          "bounds": [
            34,
            50.5,
            93.45,
            57.5
          ],
          "direction": "right",
          "weight": 59.45
        }
      ],
      [
        {
          "outline": "M66.75 14 L66.75 91 L60.75 94 L60.75 14 Z",
          "bounds": [
            60.75,
            14,
            66.75,
            94
          ],
          "direction": "down",
          "weight": 77.5
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch74Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch74 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH74_STROKES = loadGlyphWikiBatch74Strokes(reviewed)
