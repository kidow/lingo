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
export const AUDIO_MISSING: ReadonlySet<string> = new Set([])

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
  'en',
  'es',
  'ja',
  'zh',
])

export const EXAMPLE_MISSING: ReadonlySet<string> = new Set([
  'en/english-language-0-46b423e0acef',
  'en/front-gate-0-fa6b59e4cad3',
  'en/hot-dog-0-879550aec152',
  'en/hot-water-0-c0bd1a81122a',
  'en/oolong-tea-0-95aba77109b3',
  'en/red-bean-0-18327b792862',
  'es/english-language-0-ead1f6959f45',
  'es/front-gate-0-9f92552983aa',
  'es/hot-dog-0-e8b3cb09a1b2',
  'es/hot-water-0-ea8dfa21ea09',
  'es/oolong-tea-0-a134634e5e77',
  'es/red-bean-0-19ae010ad24f',
  'ja/english-language-0-ca912ce711e9',
  'ja/front-gate-0-2f46cc7f2bc2',
  'ja/hot-dog-0-9b51eddb6ba8',
  'ja/hot-water-0-2796d3261dec',
  'ja/oolong-tea-0-bdbf4d776835',
  'ja/red-bean-0-eb5a6701be73',
  'zh/english-language-0-6447c843aa94',
  'zh/front-gate-0-84abfe49f7bb',
  'zh/hot-dog-0-b765d5d21ea9',
  'zh/hot-water-0-4a3a8ce94fb2',
  'zh/oolong-tea-0-218cb9603c91',
  'zh/red-bean-0-ddb3aac09a4f',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
