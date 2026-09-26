/** Whole-glyph backup geometry crosschecked with a domestic dictionary; not exam-body approval. */
import reviewed from '../public/hanja-strokes/dictionary-reviewed-glyphwiki-batch100.json' with { type: 'json' }
import type { HanjaDictionaryStrokeData } from './hanja-stroke-dictionary.ts'
const EXPECTED = [
  {
    "glyph": "邛",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-09-27",
    "geometrySource": "a765c4fc08a187f0bef650c6219b0ae858781b1577113919c4a838c927d1d163",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "pathsSha256": "a336d03461620ff6ca347f18d082573d1e9b58fad9c6bcd49f7de77324fcafcb",
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/909B.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/9000/909B.svg",
      "dictionarySvgSha256": "fd3e99d816263644149582ea15a0d967e5707ebf7af78d3b72eb86bea492bb4d",
      "dictionaryDirectionStrokes": "1,2,3,4,5,6",
      "orderReviewSha256": "24e0a37202a943385cc937261a82cf5d02ba53a57ef4dd7a9e9f1d996a093274",
      "geometryReviewSha256": "24e0a37202a943385cc937261a82cf5d02ba53a57ef4dd7a9e9f1d996a093274",
      "directionReviewSha256": "24e0a37202a943385cc937261a82cf5d02ba53a57ef4dd7a9e9f1d996a093274"
    },
    "geometryLicense": {
      "spdx": "LicenseRef-GlyphWiki",
      "attribution": "GlyphWiki contributors; public backup by tomcumming",
      "url": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/LICENSE.txt",
      "sourceUrl": "https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt",
      "revision": "repository a7dd7f3d911936770fa742e8c37d16bee7e2173c; dump SHA256 7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62",
      "editableSource": "/hanja-strokes/glyphwiki/909b.json",
      "modifications": "Whole 邛 u909b from pinned2016 GlyphWiki backup scaled200 to100 with original default gothic preset (new Kage(); k.kShotai=k.kGothic). Raw groups0;1;2;3+4;5;6 match domestic6strokes. Three quadratics, one cubic, continuous hook and all polygon vertices preserved, winding normalized. No invented points, bridges, trims, custom widths or component substitution."
    },
    "paths": [
      "M8.35 16.85 L46.15 16.85 L46.15 21.85 L8.35 21.85 Z",
      "M22.95 16.85 L27.95 16.85 L27.95 68.85 L22.95 68.85 Z",
      "M7.05 70.4 L10.55 69.4 L14.2 68.35 L18 67.25 L21.95 66.1 L26.1 64.9 L30.35 63.6 L34.8 62.3 L39.4 60.9 L44.2 59.5 L49.1 58 L50.55 62.8 L45.6 64.25 L40.85 65.7 L36.25 67.1 L31.8 68.4 L27.5 69.7 L23.35 70.9 L19.4 72.05 L15.6 73.15 L11.9 74.2 L8.4 75.2 Z",
      "M53.4 11.5 L88.55 11.5 L88.55 16.5 L53.4 16.5 Z M88.3 15.05 L87.05 17.65 L85.7 20.3 L84.15 23 L82.55 25.75 L80.75 28.6 L78.85 31.45 L76.85 34.4 L74.7 37.35 L72.45 40.4 L70.05 43.5 L66.1 40.45 L68.45 37.4 L70.65 34.4 L72.75 31.5 L74.7 28.65 L76.55 25.85 L78.25 23.15 L79.85 20.5 L81.3 17.9 L82.6 15.4 L83.8 12.9 Z",
      "M68.95 39.15 L75.2 41.95 L80.3 45.25 L84.2 48.95 L87.1 52.9 L89 57 L90.05 61.1 L90.35 65 L90.05 68.6 L89.35 71.85 L88.2 74.65 L83.75 72.4 L84.55 70.4 L85.15 67.85 L85.35 65 L85.1 61.9 L84.25 58.7 L82.75 55.45 L80.45 52.25 L77.2 49.15 L72.85 46.3 L67.2 43.8 Z M88.2 74.65 L87.4 75.9 L86.35 76.95 L85.1 77.8 L83.7 78.35 L82.2 78.7 L80.6 78.85 L78.9 78.85 L77.1 78.7 L75.2 78.35 L73.15 77.9 L74.35 73.05 L76.15 73.45 L77.75 73.7 L79.15 73.85 L80.4 73.85 L81.4 73.75 L82.2 73.6 L82.8 73.35 L83.2 73.05 L83.5 72.75 L83.75 72.4 Z",
      "M53.4 11.5 L58.4 11.5 L58.4 93 L53.4 93 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M8.35 16.85 L46.15 16.85 L46.15 21.85 L8.35 21.85 Z",
          "bounds": [
            8.35,
            16.85,
            46.15,
            21.85
          ],
          "direction": "right",
          "weight": 37.82
        }
      ],
      [
        {
          "outline": "M22.95 16.85 L27.95 16.85 L27.95 68.85 L22.95 68.85 Z",
          "bounds": [
            22.95,
            16.85,
            27.95,
            68.85
          ],
          "direction": "down",
          "weight": 46.98
        }
      ],
      [
        {
          "outline": "M7.05 70.4 L10.55 69.4 L14.2 68.35 L18 67.25 L21.95 66.1 L26.1 64.9 L30.35 63.6 L34.8 62.3 L39.4 60.9 L44.2 59.5 L49.1 58 L50.55 62.8 L45.6 64.25 L40.85 65.7 L36.25 67.1 L31.8 68.4 L27.5 69.7 L23.35 70.9 L19.4 72.05 L15.6 73.15 L11.9 74.2 L8.4 75.2 Z",
          "bounds": [
            7.05,
            58,
            50.55,
            75.2
          ],
          "direction": "curve",
          "weight": 43.884217,
          "revealPath": "M7.76 72.84 Q24.84 67.98 49.85 60.42",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.4 11.5 L88.55 11.5 L88.55 16.5 L53.4 16.5 Z",
          "bounds": [
            53.4,
            11.5,
            88.55,
            16.5
          ],
          "direction": "right",
          "weight": 30.16
        },
        {
          "outline": "M88.3 15.05 L87.05 17.65 L85.7 20.3 L84.15 23 L82.55 25.75 L80.75 28.6 L78.85 31.45 L76.85 34.4 L74.7 37.35 L72.45 40.4 L70.05 43.5 L66.1 40.45 L68.45 37.4 L70.65 34.4 L72.75 31.5 L74.7 28.65 L76.55 25.85 L78.25 23.15 L79.85 20.5 L81.3 17.9 L82.6 15.4 L83.8 12.9 Z",
          "bounds": [
            66.1,
            12.9,
            88.3,
            43.5
          ],
          "direction": "curve",
          "weight": 33.275823,
          "revealPath": "M86.08 14 Q80.28 26.5 68.1 42",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M68.95 39.15 L75.2 41.95 L80.3 45.25 L84.2 48.95 L87.1 52.9 L89 57 L90.05 61.1 L90.35 65 L90.05 68.6 L89.35 71.85 L88.2 74.65 L83.75 72.4 L84.55 70.4 L85.15 67.85 L85.35 65 L85.1 61.9 L84.25 58.7 L82.75 55.45 L80.45 52.25 L77.2 49.15 L72.85 46.3 L67.2 43.8 Z",
          "bounds": [
            67.2,
            39.15,
            90.35,
            74.65
          ],
          "direction": "curve",
          "weight": 36.70297,
          "revealPath": "M68.1 41.5 C90.14 49.5 89.56 66.5 86.0115826544759 73.53565508164263",
          "revealWidth": 14
        },
        {
          "outline": "M88.2 74.65 L87.4 75.9 L86.35 76.95 L85.1 77.8 L83.7 78.35 L82.2 78.7 L80.6 78.85 L78.9 78.85 L77.1 78.7 L75.2 78.35 L73.15 77.9 L74.35 73.05 L76.15 73.45 L77.75 73.7 L79.15 73.85 L80.4 73.85 L81.4 73.75 L82.2 73.6 L82.8 73.35 L83.2 73.05 L83.5 72.75 L83.75 72.4 Z",
          "bounds": [
            73.15,
            72.4,
            88.2,
            78.85
          ],
          "direction": "curve",
          "weight": 12.408059,
          "revealPath": "M86.0115826544759 73.53565508164263 Q83.76 78 73.76 75.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M53.4 11.5 L58.4 11.5 L58.4 93 L53.4 93 Z",
          "bounds": [
            53.4,
            11.5,
            58.4,
            93
          ],
          "direction": "down",
          "weight": 79
        }
      ]
    ]
  }
] as const
export function loadGlyphWikiBatch100Strokes(bundle: unknown): readonly HanjaDictionaryStrokeData[] {
  if (JSON.stringify(bundle) !== JSON.stringify(EXPECTED)) throw new Error('GlyphWiki batch100 reviewed data mismatch')
  return EXPECTED
}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH100_STROKES = loadGlyphWikiBatch100Strokes(reviewed)
