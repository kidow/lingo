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
  'de/arrival',
  'de/entrance',
  'de/love-dearly',
  'de/rain-down',
  'en/arrival',
  'en/entrance',
  'en/love-dearly',
  'en/rain-down',
  'es/arrival',
  'es/entrance',
  'es/love-dearly',
  'es/rain-down',
  'fr/arrival',
  'fr/entrance',
  'fr/love-dearly',
  'fr/rain-down',
  'ja/arrival',
  'ja/entrance',
  'ja/love-dearly',
  'ja/rain-down',
  'ru/arrival',
  'ru/entrance',
  'ru/love-dearly',
  'ru/rain-down',
  'zh/arrival',
  'zh/entrance',
  'zh/love-dearly',
  'zh/rain-down',
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
  'de/arrival-0-edbbd25a45c7',
  'de/entrance-0-8f935241a305',
  'de/love-dearly-0-080d2f87fb67',
  'de/rain-down-0-daf28d7c1bf4',
  'en/arrival-0-651b15aaf220',
  'en/entrance-0-d03cb94ad4df',
  'en/love-dearly-0-ebd5d4169171',
  'en/rain-down-0-17a19ad41399',
  'es/arrival-0-5129d629370b',
  'es/entrance-0-525d47e32d62',
  'es/love-dearly-0-999ed590cd94',
  'es/rain-down-0-8c5b6f6128bf',
  'fr/arrival-0-1098356f61c8',
  'fr/entrance-0-4f4b9921f33b',
  'fr/love-dearly-0-6029ca9d4b7c',
  'fr/rain-down-0-8eded76aaa9e',
  'ja/arrival-0-f923f244bb36',
  'ja/entrance-0-d51e8c3d1c7d',
  'ja/love-dearly-0-8e3d06f37566',
  'ja/rain-down-0-4af99a078020',
  'ru/arrival-0-158ae77a2c86',
  'ru/entrance-0-8b9caf7d3551',
  'ru/love-dearly-0-50d931445355',
  'ru/rain-down-0-f3ee4f783b34',
  'zh/arrival-0-528842a3a444',
  'zh/entrance-0-de0bf52abb37',
  'zh/love-dearly-0-4a5edc2b6d54',
  'zh/rain-down-0-a829867b4e52',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
