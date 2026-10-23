import type {HanjaDictionaryStrokeData} from './hanja-stroke-dictionary.ts'
/** Preparation flags remain false; finite native approval is separately pinned. */
const GEOMETRY_LICENSE={"geometryLicense":{"spdx":"LicenseRef-GlyphWiki","attribution":"GlyphWiki Project and contributors","url":"https://glyphwiki.org/wiki/GlyphWiki:License@18","sourceUrl":"https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt","revision":"2016 archive a7dd7f3d911936770fa742e8c37d16bee7e2173c; selected closure7 and captured unused VS0 retained; no current-latest claim","editableSource":"/hanja-strokes/glyphwiki/u7e58.json","modifications":"Original full5/24raw28calls52P,18pens/23masks,originalguides/widths/weights and LEFT10/13 UP15 preserved. Five growing caps plus two source-foot clocks. UA normalized x-progress saturates to mathematical[0,1] with raw UAq retained. ROOT97 unique finite conditions=91reuse+6fresh; rawsuccessful102 includes5duplicates; old97HOLD1FAIL preserved. No all-frame/official microtiming/APP/controller/storage approval."}}
const CORE: Omit<HanjaDictionaryStrokeData,'geometryLicense'>[] = [
  {
    "glyph": "繘",
    "verificationSource": "ehanja-crosschecked",
    "verifiedAt": "2026-10-23",
    "geometrySource": "b0e9d80559388fd3781b8fa8c80a154bd18692cc35fd1c0493f63cf40e9dbabc",
    "geometryCorrection": "glyphwiki-reviewed-filled-outline-reveal-v1",
    "sourceStrokeIndices": [
      1,
      3,
      5,
      6,
      7,
      8,
      9,
      11,
      12,
      14,
      15,
      16,
      17,
      19,
      20,
      21,
      22,
      24
    ],
    "pathsSha256": "ce8ea5379bd992ad8a3596b69f00b29fc3903b14e35ba6ac1e7c971903139b70",
    "paths": [
      "M26.6 9.7 L25.5 11.65 L24.4 13.6 L23.2 15.5 L22 17.4 L20.8 19.3 L19.5 21.15 L18.2 23 L16.8 24.8 L15.35 26.5 L13.85 28.2 L13.1 27.75 L13.9 25.65 L14.65 23.55 L15.5 21.45 L16.35 19.4 L17.15 17.35 L18 15.35 L18.8 13.3 L19.6 11.25 L20.4 9.25 L21.15 7.2 Z M20.95 7.65 L21.4 6.6 L26.6 9.7 Z M26.6 9.7 L27.55 11.2 L24.65 11.55 Z M6.95 22.4 L8.65 23.25 L10.35 24.15 L11.95 25.15 L13.4 26.35 L14.8 27.6 L16.1 29 L17.3 30.5 L18.4 32.1 L19.4 33.8 L20.25 35.6 L14.6 37.55 L14.2 35.95 L13.7 34.4 L13.15 32.9 L12.5 31.45 L11.75 30 L10.9 28.6 L9.95 27.2 L8.9 25.8 L7.75 24.4 L6.45 23.15 Z M20.25 35.6 L20.1 37.85 L18.4 39.4 L16.1 39.2 L14.6 37.55 Z",
      "M36.45 21.3 L34.4 24.85 L32.3 28.4 L30.2 31.9 L28 35.35 L25.75 38.8 L23.5 42.2 L21.1 45.55 L18.7 48.85 L16.15 52.1 L13.5 55.2 L12.75 54.75 L14.55 51.05 L16.45 47.4 L18.35 43.8 L20.25 40.2 L22.1 36.65 L23.95 33.05 L25.8 29.45 L27.6 25.8 L29.4 22.2 L31.1 18.55 Z M30.9 19 L31.4 18 L36.45 21.3 Z M36.45 21.3 L37.3 22.9 L34.4 23.05 Z M7.05 53.45 L9.8 53.2 L12.5 52.9 L15.2 52.6 L17.9 52.25 L20.55 51.9 L23.25 51.5 L25.9 51.1 L28.55 50.7 L31.2 50.35 L33.9 50.05 L34.15 50.9 L31.75 52.15 L29.25 53.3 L26.7 54.3 L24.1 55.2 L21.5 56.05 L18.85 56.8 L16.15 57.55 L13.4 58.2 L10.65 58.8 L7.85 59.4 Z M7.85 59.4 L6.05 53.55 L7.05 53.45 Z M7.85 59.4 L10.65 57.5 L9.05 60.75 Z",
      "M27.5 39 L28.9 40.1 L30.4 41.25 L31.7 42.55 L32.95 44 L34.15 45.55 L35.2 47.2 L36.2 48.95 L37.1 50.8 L37.9 52.75 L38.65 54.8 L32.8 56.2 L32.5 54.3 L32.15 52.5 L31.7 50.75 L31.2 49 L30.65 47.35 L30 45.75 L29.35 44.2 L28.6 42.65 L27.8 41.1 L26.85 39.65 Z M38.65 54.8 L38.25 57.05 L36.4 58.45 L34.15 58.05 L32.8 56.2 Z",
      "M25.7 53.5 L25.7 91.5 L19.7 94.5 L19.7 53.5 Z",
      "M17.45 64.25 L16.95 67.05 L16.35 69.8 L15.6 72.55 L14.75 75.2 L13.75 77.85 L12.65 80.45 L11.4 83 L10 85.5 L8.45 87.9 L6.65 90.2 L5.9 89.75 L6.75 87.05 L7.55 84.4 L8.35 81.75 L9.1 79.15 L9.7 76.6 L10.25 74 L10.7 71.45 L11.05 68.85 L11.3 66.25 L11.45 63.7 Z M11.4 64.2 L11.55 62.6 L17.45 64.25 Z M17.45 64.25 L18.8 65.4 L16.2 66.65 Z",
      "M27.85 61.05 L29.25 62.25 L30.65 63.5 L31.95 64.95 L33.1 66.55 L34.2 68.25 L35.2 70.1 L36.15 72 L37 74.05 L37.75 76.2 L38.4 78.45 L32.5 79.55 L32.25 77.5 L31.9 75.5 L31.55 73.55 L31.1 71.7 L30.6 69.9 L30 68.15 L29.4 66.45 L28.7 64.85 L28 63.2 L27.15 61.65 Z M38.4 78.45 L37.9 80.65 L36 81.95 L33.8 81.45 L32.5 79.55 Z",
      "M45.5 10.05 L79.9 10.05 L79.9 12.05 L45.5 12.05 Z M82.15 13 L81.1 13.95 L79.95 14.85 L78.75 15.8 L77.5 16.8 L76.2 17.8 L74.85 18.8 L73.4 19.8 L71.9 20.8 L70.3 21.8 L68.75 22.9 L68.1 22.25 L69.35 20.8 L70.4 19.25 L71.45 17.8 L72.5 16.4 L73.45 15.05 L74.4 13.8 L75.3 12.55 L76.15 11.35 L76.9 10.15 L77.65 9.05 Z M76.9 10.05 L79.9 7.55 L85.4 12.05 L82.9 13.55 L76.9 16.05 Z",
      "M57.55 15.3 L59.25 15.7 L61 16.05 L62.6 16.5 L64.15 17.1 L65.6 17.75 L67 18.55 L68.3 19.45 L69.5 20.45 L70.6 21.6 L71.65 22.8 L66.45 25.8 L66 24.8 L65.5 23.8 L64.9 22.8 L64.2 21.8 L63.35 20.8 L62.4 19.85 L61.3 18.85 L60.1 17.9 L58.8 16.9 L57.3 16.15 Z M71.65 22.8 L71.9 25.05 L70.5 26.9 L68.25 27.15 L66.45 25.8 Z",
      "M42.1 25.6 L87.35 25.6 L87.35 27.6 L42.1 27.6 Z M90 28 L89.05 29.3 L88 30.65 L86.9 31.95 L85.75 33.2 L84.45 34.5 L83.1 35.75 L81.65 36.95 L80.15 38.15 L78.45 39.3 L76.85 40.5 L76.2 39.85 L77.45 38.25 L78.55 36.6 L79.55 35.05 L80.5 33.55 L81.4 32.05 L82.2 30.6 L82.95 29.2 L83.6 27.85 L84.15 26.5 L84.65 25.25 Z M84.35 25.6 L87.35 23.1 L92.85 27.6 L90.35 29.1 L84.35 31.6 Z",
      "M72.1 25.6 L72.1 42.7 L66.1 42.7 L66.1 25.6 Z M66.1 42.7 L72.1 42.7 L70.9 44.5 L69.1 45.7 L67.3 44.5 Z M72.1 42.7 L72.05 44 L71.8 45.25 L71.4 46.45 L70.8 47.6 L69.95 48.6 L68.95 49.4 L67.85 50 L66.65 50.4 L65.4 50.65 L64.1 50.7 L64.1 44.7 L64.7 44.7 L65.15 44.6 L65.45 44.5 L65.65 44.4 L65.75 44.35 L65.8 44.25 L65.9 44.1 L66 43.8 L66.05 43.35 L66.1 42.7 Z M64.1 47.7 L54.1 46.2 L54.1 44.7 L64.1 44.7 Z",
      "M69.3 26.6 L68.35 28.1 L66.25 31.2 L63.95 34.05 L61.5 36.65 L58.85 39 L56.05 41.1 L53.05 42.9 L49.9 44.45 L46.6 45.7 L43.15 46.6 L39.5 47.15 L39.3 46.25 L42.5 44.8 L45.55 43.2 L48.4 41.55 L51 39.7 L53.45 37.75 L55.75 35.6 L57.85 33.25 L59.75 30.75 L61.5 28.05 L62.25 26.6 Z",
      "M46 51.75 L46 90.45 L40 93.45 L40 48.75 Z",
      "M43 51.75 L88.45 51.75 L88.45 53.75 L43 53.75 Z M91.45 52.75 L91.45 85.95 L85.45 85.95 L85.45 52.75 Z M85.45 51.75 L88.45 49.25 L93.95 53.75 L91.45 55.75 L85.45 52.75 Z M85.45 85.95 L91.45 85.95 L90.25 87.75 L88.45 88.95 L86.65 87.75 Z M91.45 85.95 L91.4 87.2 L91.15 88.45 L90.75 89.65 L90.15 90.8 L89.3 91.8 L88.3 92.6 L87.2 93.25 L85.95 93.65 L84.75 93.85 L83.45 93.95 L83.45 87.95 L84.05 87.9 L84.5 87.8 L84.8 87.7 L85 87.65 L85.05 87.55 L85.15 87.45 L85.25 87.3 L85.35 87 L85.4 86.55 L85.45 85.95 Z M83.45 90.95 L74.45 89.45 L74.45 87.95 L83.45 87.95 Z",
      "M62.75 52.75 L62.7 53.15 L62.05 55.7 L61.15 58.1 L60.05 60.4 L58.7 62.55 L57.15 64.6 L55.4 66.55 L53.45 68.3 L51.25 69.95 L48.85 71.4 L46.25 72.7 L45.75 71.95 L47.75 69.95 L49.55 68 L51.15 66.05 L52.55 64.15 L53.75 62.2 L54.7 60.3 L55.5 58.3 L56.1 56.35 L56.5 54.35 L56.65 52.75 Z",
      "M75.05 52.25 L75.05 61.55 L69.05 61.55 L69.05 52.25 Z M69.05 61.55 L75.05 61.55 L73.85 63.35 L72.05 64.55 L70.25 63.35 Z M75.05 61.55 L75 62.2 L74.95 62.7 L74.95 63.05 L74.95 63.35 L75 63.65 L75.1 63.9 L75.35 64.15 L75.75 64.4 L76.35 64.65 L77.05 64.8 L77.05 68.3 L75.9 68.35 L74.8 68.3 L73.7 68.05 L72.65 67.65 L71.65 67 L70.8 66.15 L70.1 65.15 L69.6 64 L69.25 62.8 L69.05 61.55 Z M77.05 64.8 L78.3 65.35 L78.8 66.55 L78.3 67.8 L77.05 68.3 Z M77.05 64.8 L83.1 64.8 L83.1 68.3 L77.05 68.3 Z M83.1 64.8 L84.15 65.5 L84.85 66.55 L84.15 67.6 L83.1 68.3 Z M83.1 64.8 L81.35 64.8 L83.1 62.3 L84.1 62.3 Z",
      "M58.85 71.4 L58.85 85.6 L52.85 88.6 L52.85 68.4 Z",
      "M55.85 71.4 L75.6 71.4 L75.6 73.4 L55.85 73.4 Z M78.6 72.4 L78.6 85.1 L72.6 88.1 L72.6 72.4 Z M72.6 71.4 L75.6 68.9 L81.1 73.4 L78.6 75.4 L72.6 72.4 Z",
      "M55.85 82.1 L75.6 82.1 L75.6 84.1 L55.85 84.1 Z"
    ],
    "outlines": [
      [
        {
          "outline": "M26.6 9.7 L25.5 11.65 L24.4 13.6 L23.2 15.5 L22 17.4 L20.8 19.3 L19.5 21.15 L18.2 23 L16.8 24.8 L15.35 26.5 L13.85 28.2 L13.1 27.75 L13.9 25.65 L14.65 23.55 L15.5 21.45 L16.35 19.4 L17.15 17.35 L18 15.35 L18.8 13.3 L19.6 11.25 L20.4 9.25 L21.15 7.2 Z M20.95 7.65 L21.4 6.6 L26.6 9.7 Z M26.6 9.7 L27.55 11.2 L24.65 11.55 Z",
          "bounds": [
            13.1,
            6.6,
            27.55,
            28.2
          ],
          "direction": "curve",
          "weight": 22.643571,
          "revealPath": "M24.105 8 Q19.31 18.5 13.4875 28",
          "revealWidth": 14
        },
        {
          "outline": "M6.95 22.4 L8.65 23.25 L10.35 24.15 L11.95 25.15 L13.4 26.35 L14.8 27.6 L16.1 29 L17.3 30.5 L18.4 32.1 L19.4 33.8 L20.25 35.6 L14.6 37.55 L14.2 35.95 L13.7 34.4 L13.15 32.9 L12.5 31.45 L11.75 30 L10.9 28.6 L9.95 27.2 L8.9 25.8 L7.75 24.4 L6.45 23.15 Z M20.25 35.6 L20.1 37.85 L18.4 39.4 L16.1 39.2 L14.6 37.55 Z",
          "bounds": [
            6.45,
            22.4,
            20.25,
            39.4
          ],
          "direction": "curve",
          "weight": 19.387007,
          "revealPath": "M6.295 22.5 Q14.515 28 17.94 38",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M36.45 21.3 L34.4 24.85 L32.3 28.4 L30.2 31.9 L28 35.35 L25.75 38.8 L23.5 42.2 L21.1 45.55 L18.7 48.85 L16.15 52.1 L13.5 55.2 L12.75 54.75 L14.55 51.05 L16.45 47.4 L18.35 43.8 L20.25 40.2 L22.1 36.65 L23.95 33.05 L25.8 29.45 L27.6 25.8 L29.4 22.2 L31.1 18.55 Z M30.9 19 L31.4 18 L36.45 21.3 Z M36.45 21.3 L37.3 22.9 L34.4 23.05 Z",
          "bounds": [
            12.75,
            18,
            37.3,
            55.2
          ],
          "direction": "curve",
          "weight": 41.191584,
          "revealPath": "M34.0375 19.5 Q24.4475 38 13.145 55",
          "revealWidth": 14
        },
        {
          "outline": "M7.05 53.45 L9.8 53.2 L12.5 52.9 L15.2 52.6 L17.9 52.25 L20.55 51.9 L23.25 51.5 L25.9 51.1 L28.55 50.7 L31.2 50.35 L33.9 50.05 L34.15 50.9 L31.75 52.15 L29.25 53.3 L26.7 54.3 L24.1 55.2 L21.5 56.05 L18.85 56.8 L16.15 57.55 L13.4 58.2 L10.65 58.8 L7.85 59.4 Z M7.85 59.4 L6.05 53.55 L7.05 53.45 Z M7.85 59.4 L10.65 57.5 L9.05 60.75 Z",
          "bounds": [
            6.05,
            50.05,
            34.15,
            60.75
          ],
          "direction": "curve",
          "weight": 27.714767,
          "revealPath": "M6.98 56.5 Q21.365 54.5 34.0375 50.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M27.5 39 L28.9 40.1 L30.4 41.25 L31.7 42.55 L32.95 44 L34.15 45.55 L35.2 47.2 L36.2 48.95 L37.1 50.8 L37.9 52.75 L38.65 54.8 L32.8 56.2 L32.5 54.3 L32.15 52.5 L31.7 50.75 L31.2 49 L30.65 47.35 L30 45.75 L29.35 44.2 L28.6 42.65 L27.8 41.1 L26.85 39.65 Z M38.65 54.8 L38.25 57.05 L36.4 58.45 L34.15 58.05 L32.8 56.2 Z",
          "bounds": [
            26.85,
            39,
            38.65,
            58.45
          ],
          "direction": "curve",
          "weight": 20.236508,
          "revealPath": "M26.845 39 Q33.3525 45.5 36.0925 57",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M25.7 53.5 L25.7 91.5 L19.7 94.5 L19.7 53.5 Z",
          "bounds": [
            19.7,
            53.5,
            25.7,
            94.5
          ],
          "direction": "down",
          "weight": 38.5
        }
      ],
      [
        {
          "outline": "M17.45 64.25 L16.95 67.05 L16.35 69.8 L15.6 72.55 L14.75 75.2 L13.75 77.85 L12.65 80.45 L11.4 83 L10 85.5 L8.45 87.9 L6.65 90.2 L5.9 89.75 L6.75 87.05 L7.55 84.4 L8.35 81.75 L9.1 79.15 L9.7 76.6 L10.25 74 L10.7 71.45 L11.05 68.85 L11.3 66.25 L11.45 63.7 Z M11.4 64.2 L11.55 62.6 L17.45 64.25 Z M17.45 64.25 L18.8 65.4 L16.2 66.65 Z",
          "bounds": [
            5.9,
            62.6,
            18.8,
            90.2
          ],
          "direction": "curve",
          "weight": 27.745601,
          "revealPath": "M14.515 63.5 Q13.145 77.5 6.295 90",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M27.85 61.05 L29.25 62.25 L30.65 63.5 L31.95 64.95 L33.1 66.55 L34.2 68.25 L35.2 70.1 L36.15 72 L37 74.05 L37.75 76.2 L38.4 78.45 L32.5 79.55 L32.25 77.5 L31.9 75.5 L31.55 73.55 L31.1 71.7 L30.6 69.9 L30 68.15 L29.4 66.45 L28.7 64.85 L28 63.2 L27.15 61.65 Z M38.4 78.45 L37.9 80.65 L36 81.95 L33.8 81.45 L32.5 79.55 Z",
          "bounds": [
            27.15,
            61.05,
            38.4,
            81.95
          ],
          "direction": "curve",
          "weight": 21.297099,
          "revealPath": "M27.1875 61 Q33.3525 68 35.75 80.5",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M45.5 10.05 L79.9 10.05 L79.9 12.05 L45.5 12.05 Z M82.15 13 L81.1 13.95 L79.95 14.85 L78.75 15.8 L77.5 16.8 L76.2 17.8 L74.85 18.8 L73.4 19.8 L71.9 20.8 L70.3 21.8 L68.75 22.9 L68.1 22.25 L69.35 20.8 L70.4 19.25 L71.45 17.8 L72.5 16.4 L73.45 15.05 L74.4 13.8 L75.3 12.55 L76.15 11.35 L76.9 10.15 L77.65 9.05 Z M76.9 10.05 L79.9 7.55 L85.4 12.05 L82.9 13.55 L76.9 16.05 Z",
          "bounds": [
            45.5,
            7.55,
            85.4,
            22.9
          ],
          "direction": "curve",
          "weight": 50.711541,
          "revealPath": "M45.5 11.055 L79.925 11.055 Q75.5375 16.08 68.45 22.6125",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M57.55 15.3 L59.25 15.7 L61 16.05 L62.6 16.5 L64.15 17.1 L65.6 17.75 L67 18.55 L68.3 19.45 L69.5 20.45 L70.6 21.6 L71.65 22.8 L66.45 25.8 L66 24.8 L65.5 23.8 L64.9 22.8 L64.2 21.8 L63.35 20.8 L62.4 19.85 L61.3 18.85 L60.1 17.9 L58.8 16.9 L57.3 16.15 Z M71.65 22.8 L71.9 25.05 L70.5 26.9 L68.25 27.15 L66.45 25.8 Z",
          "bounds": [
            57.3,
            15.3,
            71.9,
            27.15
          ],
          "direction": "curve",
          "weight": 16.293653,
          "revealPath": "M56.975 15.5775 Q65.75 18.5925 69.8 25.6275",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M42.1 25.6 L87.35 25.6 L87.35 27.6 L42.1 27.6 Z M90 28 L89.05 29.3 L88 30.65 L86.9 31.95 L85.75 33.2 L84.45 34.5 L83.1 35.75 L81.65 36.95 L80.15 38.15 L78.45 39.3 L76.85 40.5 L76.2 39.85 L77.45 38.25 L78.55 36.6 L79.55 35.05 L80.5 33.55 L81.4 32.05 L82.2 30.6 L82.95 29.2 L83.6 27.85 L84.15 26.5 L84.65 25.25 Z M84.35 25.6 L87.35 23.1 L92.85 27.6 L90.35 29.1 L84.35 31.6 Z",
          "bounds": [
            42.1,
            23.1,
            92.85,
            40.5
          ],
          "direction": "curve",
          "weight": 62.566195,
          "revealPath": "M42.125 26.6325 L87.35 26.6325 Q83.975 33.165 76.55 40.2",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M72.1 25.6 L72.1 42.7 L66.1 42.7 L66.1 25.6 Z M66.1 42.7 L72.1 42.7 L70.9 44.5 L69.1 45.7 L67.3 44.5 Z M72.1 42.7 L72.05 44 L71.8 45.25 L71.4 46.45 L70.8 47.6 L69.95 48.6 L68.95 49.4 L67.85 50 L66.65 50.4 L65.4 50.65 L64.1 50.7 L64.1 44.7 L64.7 44.7 L65.15 44.6 L65.45 44.5 L65.65 44.4 L65.75 44.35 L65.8 44.25 L65.9 44.1 L66 43.8 L66.05 43.35 L66.1 42.7 Z",
          "bounds": [
            64.1,
            25.6,
            72.1,
            50.7
          ],
          "direction": "curve",
          "weight": 23.176068,
          "revealPath": "M69.125 26.6325 L69.125 42.7375 Q69.125 47.7375 64.125 47.7375",
          "revealWidth": 14
        },
        {
          "outline": "M64.1 47.7 L54.1 46.2 L54.1 44.7 L64.1 44.7 Z",
          "bounds": [
            54.1,
            44.7,
            64.1,
            47.7
          ],
          "direction": "left",
          "weight": 10
        }
      ],
      [
        {
          "outline": "M69.3 26.6 L68.35 28.1 L66.25 31.2 L63.95 34.05 L61.5 36.65 L58.85 39 L56.05 41.1 L53.05 42.9 L49.9 44.45 L46.6 45.7 L43.15 46.6 L39.5 47.15 L39.3 46.25 L42.5 44.8 L45.55 43.2 L48.4 41.55 L51 39.7 L53.45 37.75 L55.75 35.6 L57.85 33.25 L59.75 30.75 L61.5 28.05 L62.25 26.6 Z",
          "bounds": [
            39.3,
            26.6,
            69.3,
            47.15
          ],
          "direction": "curve",
          "weight": 33.121226,
          "revealPath": "M65.75 26.6325 Q56.975 42.21 39.425 46.7325",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M46 51.75 L46 90.45 L40 93.45 L40 48.75 Z",
          "bounds": [
            40,
            48.75,
            46,
            93.45
          ],
          "direction": "down",
          "weight": 39.195
        }
      ],
      [
        {
          "outline": "M43 51.75 L88.45 51.75 L88.45 53.75 L43 53.75 Z M91.45 52.75 L91.45 85.95 L85.45 85.95 L85.45 52.75 Z M85.45 51.75 L88.45 49.25 L93.95 53.75 L91.45 55.75 L85.45 52.75 Z M85.45 85.95 L91.45 85.95 L90.25 87.75 L88.45 88.95 L86.65 87.75 Z M91.45 85.95 L91.4 87.2 L91.15 88.45 L90.75 89.65 L90.15 90.8 L89.3 91.8 L88.3 92.6 L87.2 93.25 L85.95 93.65 L84.75 93.85 L83.45 93.95 L83.45 87.95 L84.05 87.9 L84.5 87.8 L84.8 87.7 L85 87.65 L85.05 87.55 L85.15 87.45 L85.25 87.3 L85.35 87 L85.4 86.55 L85.45 85.95 Z",
          "bounds": [
            43,
            49.25,
            93.95,
            93.95
          ],
          "direction": "curve",
          "weight": 85.702068,
          "revealPath": "M43.0295 52.7625 L88.4705 52.7625 L88.4705 85.9525 Q88.4705 90.9525 83.4705 90.9525",
          "revealWidth": 14
        },
        {
          "outline": "M83.45 90.95 L74.45 89.45 L74.45 87.95 L83.45 87.95 Z",
          "bounds": [
            74.45,
            87.95,
            83.45,
            90.95
          ],
          "direction": "left",
          "weight": 9
        }
      ],
      [
        {
          "outline": "M62.75 52.75 L62.7 53.15 L62.05 55.7 L61.15 58.1 L60.05 60.4 L58.7 62.55 L57.15 64.6 L55.4 66.55 L53.45 68.3 L51.25 69.95 L48.85 71.4 L46.25 72.7 L45.75 71.95 L47.75 69.95 L49.55 68 L51.15 66.05 L52.55 64.15 L53.75 62.2 L54.7 60.3 L55.5 58.3 L56.1 56.35 L56.5 54.35 L56.65 52.75 Z",
          "bounds": [
            45.75,
            52.75,
            62.75,
            72.7
          ],
          "direction": "curve",
          "weight": 23.910835,
          "revealPath": "M59.73575 52.7625 Q58.065125 64.32 46.036625 72.36",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M75.05 52.25 L75.05 61.55 L69.05 61.55 L69.05 52.25 Z M69.05 61.55 L75.05 61.55 L73.85 63.35 L72.05 64.55 L70.25 63.35 Z M75.05 61.55 L75 62.2 L74.95 62.7 L74.95 63.05 L74.95 63.35 L75 63.65 L75.1 63.9 L75.35 64.15 L75.75 64.4 L76.35 64.65 L77.05 64.8 L77.05 68.3 L75.9 68.35 L74.8 68.3 L73.7 68.05 L72.65 67.65 L71.65 67 L70.8 66.15 L70.1 65.15 L69.6 64 L69.25 62.8 L69.05 61.55 Z M77.05 64.8 L78.3 65.35 L78.8 66.55 L78.3 67.8 L77.05 68.3 Z M77.05 64.8 L83.1 64.8 L83.1 68.3 L77.05 68.3 Z M83.1 64.8 L84.15 65.5 L84.85 66.55 L84.15 67.6 L83.1 68.3 Z",
          "bounds": [
            69.05,
            52.25,
            84.85,
            68.35
          ],
          "direction": "curve",
          "weight": 21.413443,
          "revealPath": "M72.098375 53.265 L72.098375 61.58125 Q72.098375 66.58125 77.098375 66.58125 L83.1245 66.58125",
          "revealWidth": 14
        },
        {
          "outline": "M83.1 64.8 L81.35 64.8 L83.1 62.3 L84.1 62.3 Z",
          "bounds": [
            81.35,
            62.3,
            84.1,
            64.8
          ],
          "direction": "up",
          "weight": 2.5
        }
      ],
      [
        {
          "outline": "M58.85 71.4 L58.85 85.6 L52.85 88.6 L52.85 68.4 Z",
          "bounds": [
            52.85,
            68.4,
            58.85,
            88.6
          ],
          "direction": "down",
          "weight": 10.718325
        }
      ],
      [
        {
          "outline": "M55.85 71.4 L75.6 71.4 L75.6 73.4 L55.85 73.4 Z M78.6 72.4 L78.6 85.1 L72.6 88.1 L72.6 72.4 Z M72.6 71.4 L75.6 68.9 L81.1 73.4 L78.6 75.4 L72.6 72.4 Z",
          "bounds": [
            55.85,
            68.9,
            81.1,
            88.1
          ],
          "direction": "curve",
          "weight": 30.48516,
          "revealPath": "M55.8665825 72.4027125 L75.63341749999998 72.4027125 L75.63341749999998 83.1210375",
          "revealWidth": 14
        }
      ],
      [
        {
          "outline": "M55.85 82.1 L75.6 82.1 L75.6 84.1 L55.85 84.1 Z",
          "bounds": [
            55.85,
            82.1,
            75.6,
            84.1
          ],
          "direction": "right",
          "weight": 19.766835
        }
      ]
    ],
    "sourceReference": {
      "orderUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E58.svg",
      "dictionarySvgUrl": "http://img.e-hanja.kr/hanjaSvg/aniSVG/7E00/7E58.svg",
      "dictionarySvgSha256": "a318e67229aac69224030567b5e41273a5e85ae0186ecf30e12e5b6e79a03a98",
      "dictionaryDirectionStrokes": "Historical18 directions/36SVG and whole3 compatible observations are reused only at their recorded scope. Original full5/24raw28calls52P and all LEFT10/13, UP15 fields preserved. ROOT97 unique actual conditions=91 prior PASS reuse+6 fresh; rawsuccessful102 includes five duplicate conditions. Old97HOLD/1FAIL remains separate. Display clocks and UA domain projection do not establish exam-body microtiming, all-frame or APP/controller/storage approval.",
      "orderReviewSha256": "841d6e93d027a5d52d02295e8b158f610ee84c28145dceecc56a7d93180b0b45",
      "geometryReviewSha256": "a4b85100d55b2f374cb8a6fa9c28fe8b53f2c2776f01b2d04d5aeef5fe0a2430",
      "directionReviewSha256": "841d6e93d027a5d52d02295e8b158f610ee84c28145dceecc56a7d93180b0b45"
    }
  }
]
const EXPECTED: readonly HanjaDictionaryStrokeData[] = CORE.map(entry=>({...entry,...GEOMETRY_LICENSE}))
function freezeDeep(value:unknown):void {if(value&&typeof value==='object'){for(const child of Object.values(value))freezeDeep(child);Object.freeze(value)}}
freezeDeep(CORE);freezeDeep(GEOMETRY_LICENSE);freezeDeep(EXPECTED)
function sameJSON(a:unknown,b:unknown):boolean {
 if(Object.is(a,b))return true
 if(!b||typeof b!=='object'||!a||typeof a!=='object')return false
 if(Array.isArray(b)){
  if(!Array.isArray(a)||Object.getPrototypeOf(a)!==Array.prototype||a.length!==b.length||Reflect.ownKeys(a).length!==b.length+1)return false
  return b.every((value,index)=>{const d=Object.getOwnPropertyDescriptor(a,String(index));return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,value)})
 }
 if(Array.isArray(a)||Object.getPrototypeOf(a)!==Object.prototype)return false
 const keys=Object.keys(b),expected=b as Record<string,unknown>
 return Reflect.ownKeys(a).length===keys.length&&keys.every(key=>{const d=Object.getOwnPropertyDescriptor(a,key);return !!d&&d.enumerable&&Object.hasOwn(d,'value')&&sameJSON(d.value,expected[key])})
}
export function loadGlyphWikiBatch1406Strokes(bundle:unknown):readonly HanjaDictionaryStrokeData[]{if(arguments.length!==1||!sameJSON(bundle,EXPECTED))throw Error('Invalid GlyphWiki batch1406 provisional bundle');return EXPECTED}
export const HANJA_DICTIONARY_GLYPHWIKI_BATCH1406_STROKES:ReturnType<typeof loadGlyphWikiBatch1406Strokes>=EXPECTED
export const GLYPHWIKI_BATCH1406_NATIVE_APPROVAL=false
export const GLYPHWIKI_BATCH1406_RUNTIME_APPLIED=false
export const GLYPHWIKI_BATCH1406_ASSIGNMENT_PROVISIONAL=true
export const GLYPHWIKI_BATCH1406_APPROVAL_REVIEW=Object.freeze({"path":"docs/hanja-actual-component-profiles-2026-10-22/u7e58-activation-review.json","SHA256":"a4b85100d55b2f374cb8a6fa9c28fe8b53f2c2776f01b2d04d5aeef5fe0a2430"})
