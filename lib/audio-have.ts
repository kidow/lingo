/**
 * 발음이 **없는** 자리. (spec.md §5)
 *
 * 듣기 카드는 소리가 단서다. 파일이 없으면 문제가 성립하지 않으므로 그 카드는
 * 아예 만들지 않고 재인 카드를 낸다 — 소리 없는 듣기 문제를 내는 것보다
 * 조용히 다른 문제를 내는 편이 낫다.
 *
 * 정적 내보내기(`output: 'export'`)라 앱이 도는 중에 파일 존재를 물어볼 서버가
 * 없다. 그래서 **없는 것만** 목록으로 적어 둔다. 지금은 20,671자리가 모두 차
 * 있어 비어 있고, 비었다는 사실 자체가 이 파일의 값이다 — 있는 것을 다 적으면
 * 400KB짜리 목록이 번들에 실린다.
 *
 *   node scripts/audio.ts manifest    다시 만든다
 *
 * 낡으면 `pnpm check`가 경고한다. 콘텐츠를 넣고 발음을 아직 안 만들었는데 이
 * 목록이 옛날 그대로면 듣기 카드가 빈 소리를 내기 때문이다.
 */
export const AUDIO_MISSING: ReadonlySet<string> = new Set([
  'de/accident-mishap',
  'de/assorted-sweets',
  'de/chat-online',
  'de/die-pass-away',
  'de/easter',
  'de/luxembourg',
  'de/prepare-for-it',
  'de/ride-the-waves',
  'de/save-a-file',
  'en/accident-mishap',
  'en/assorted-sweets',
  'en/chat-online',
  'en/die-pass-away',
  'en/easter',
  'en/luxembourg',
  'en/prepare-for-it',
  'en/ride-the-waves',
  'en/save-a-file',
  'es/accident-mishap',
  'es/assorted-sweets',
  'es/chat-online',
  'es/die-pass-away',
  'es/easter',
  'es/luxembourg',
  'es/prepare-for-it',
  'es/ride-the-waves',
  'es/save-a-file',
  'fr/accident-mishap',
  'fr/assorted-sweets',
  'fr/chat-online',
  'fr/die-pass-away',
  'fr/easter',
  'fr/luxembourg',
  'fr/prepare-for-it',
  'fr/ride-the-waves',
  'fr/save-a-file',
  'ja/accident-mishap',
  'ja/assorted-sweets',
  'ja/chat-online',
  'ja/die-pass-away',
  'ja/easter',
  'ja/luxembourg',
  'ja/prepare-for-it',
  'ja/ride-the-waves',
  'ja/save-a-file',
  'ru/accident-mishap',
  'ru/assorted-sweets',
  'ru/chat-online',
  'ru/die-pass-away',
  'ru/easter',
  'ru/luxembourg',
  'ru/prepare-for-it',
  'ru/ride-the-waves',
  'ru/save-a-file',
  'zh/accident-mishap',
  'zh/assorted-sweets',
  'zh/chat-online',
  'zh/die-pass-away',
  'zh/easter',
  'zh/luxembourg',
  'zh/prepare-for-it',
  'zh/ride-the-waves',
  'zh/save-a-file',
])

/** 그 언어에 그 개념의 발음이 있는가 */
export function hasAudio(slug: string, lang: string): boolean {
  return !AUDIO_MISSING.has(`${lang}/${slug}`)
}

/**
 * 예문 소리는 **언어 단위로 켠다.** 켜진 언어 안에서는 없는 것만 적는다.
 *
 * 소리를 내는 것은 소개 카드의 첫 예문(index 0)뿐이라 자리가 언어마다 1만 개를
 * 넘는다. 있는 것을 적으면 다 채웠을 때 3MB가 번들에 실리고, 없는 것만 적으면
 * 만드는 도중에 그만큼 실린다. 그래서 한 언어를 거의 다 채우면
 * (`EXAMPLE_AUDIO_ON` 이상) 그 언어를 켜고, 남은 빈자리만 적는다 — 예문을 고친
 * 뒤 아직 다시 만들지 않은 몇 줄이다.
 *
 * 열쇠는 `{lang}/{slug}-0-{해시}`다. 해시가 문장에서 나오므로(lib/entries.ts)
 * 예문을 고치면 열쇠가 달라지고, 다시 만들 때까지 여기에 빈자리로 오른다.
 *
 *   node scripts/audio.ts manifest    다시 만든다
 */
export const EXAMPLE_AUDIO_ON = 0.99

export const EXAMPLE_AUDIO_LANGS: ReadonlySet<string> = new Set([
  'de',
  'en',
  'es',
  'fr',
  'ja',
  'ru',
  'zh',
])

export const EXAMPLE_MISSING: ReadonlySet<string> = new Set([
  'de/accident-mishap-0-075d0f276c8c',
  'de/assorted-sweets-0-cdbe33eb58ec',
  'de/chat-online-0-b7f915a5d7e0',
  'de/die-pass-away-0-b4dc780443d3',
  'de/easter-0-3a1ab0c0b8be',
  'de/luxembourg-0-f6591576f1d3',
  'de/prepare-for-it-0-7b01e5229ea3',
  'de/ride-the-waves-0-b3b9ff607079',
  'de/save-a-file-0-404e53dba2d5',
  'en/accident-mishap-0-d0c382ac0a30',
  'en/assorted-sweets-0-f932740bad89',
  'en/chat-online-0-2fa27e06debb',
  'en/die-pass-away-0-eb52b60cf35b',
  'en/easter-0-f8c60b4aa674',
  'en/luxembourg-0-ffbbc487ef4f',
  'en/prepare-for-it-0-48c32a85b095',
  'en/ride-the-waves-0-5e17a8c8788a',
  'en/save-a-file-0-f7b9e3806380',
  'es/accident-mishap-0-2574d0aa2506',
  'es/assorted-sweets-0-c94bf3222052',
  'es/chat-online-0-8798a58e3f97',
  'es/die-pass-away-0-b9ec949bbf05',
  'es/easter-0-b2d2a14ef34d',
  'es/luxembourg-0-91a366d6efcd',
  'es/prepare-for-it-0-20c5026d3539',
  'es/ride-the-waves-0-c4692d97d647',
  'es/save-a-file-0-6c4013439ed2',
  'fr/accident-mishap-0-6fdfaf7e235e',
  'fr/assorted-sweets-0-bee016db5219',
  'fr/chat-online-0-ba40db5402ac',
  'fr/die-pass-away-0-75f882151083',
  'fr/easter-0-34d2b91fab13',
  'fr/luxembourg-0-7bb958e73b06',
  'fr/prepare-for-it-0-33fff267413c',
  'fr/ride-the-waves-0-3abf3970115f',
  'fr/save-a-file-0-524c2e48a009',
  'ja/accident-mishap-0-c7d641c5ec4c',
  'ja/assorted-sweets-0-f94fe254b75e',
  'ja/chat-online-0-82cf5d939bb2',
  'ja/die-pass-away-0-58daeece7dd7',
  'ja/easter-0-00dcce797ac1',
  'ja/luxembourg-0-3f33b99df72f',
  'ja/prepare-for-it-0-4c06520846e4',
  'ja/ride-the-waves-0-6958c381dc52',
  'ja/save-a-file-0-e4f6b2b4aebe',
  'ru/accident-mishap-0-a71bb74a5aed',
  'ru/assorted-sweets-0-0d6b5cd6ed19',
  'ru/chat-online-0-a5fcf5d62602',
  'ru/die-pass-away-0-be8dcd1bcd6c',
  'ru/easter-0-1c0089cb2858',
  'ru/luxembourg-0-2dcefad56002',
  'ru/prepare-for-it-0-775333b3bb7c',
  'ru/ride-the-waves-0-cc6a62ccd681',
  'ru/save-a-file-0-04bb47a39b59',
  'zh/accident-mishap-0-32da37018ebd',
  'zh/assorted-sweets-0-94c68efae33b',
  'zh/chat-online-0-e8092ce94aa9',
  'zh/die-pass-away-0-480945a621e5',
  'zh/easter-0-a3f5e0d3ebcc',
  'zh/luxembourg-0-e930654369ec',
  'zh/prepare-for-it-0-f7baf98e22ea',
  'zh/ride-the-waves-0-2f4e2201d3d8',
  'zh/save-a-file-0-e6971d9dd8df',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
