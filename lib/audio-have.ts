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
  'de',
  'en',
  'es',
  'fr',
  'ja',
  'ru',
  'zh',
])

export const EXAMPLE_MISSING: ReadonlySet<string> = new Set([
  'de/a-chinese-man-0-469d745bd206',
  'de/a-frenchman-0-9ec6ebed3b04',
  'de/a-german-man-0-adbdf8271442',
  'de/a-muscovite-0-0ce73f7e516d',
  'de/a-spaniard-0-4631ee497223',
  'de/an-englishman-0-d3de03921cb8',
  'de/of-africa-the-land-0-70090ac5dca8',
  'de/of-america-0-68017786075b',
  'de/of-china-0-e707e53f4b29',
  'de/of-england-0-b70a5da5090b',
  'de/of-france-0-c7078e14d07c',
  'de/of-germany-0-06f188e50095',
  'de/of-russia-0-8ae73deb06a0',
  'de/of-siberia-0-debfbff9b682',
  'de/of-spain-0-fcdd8dc49b7a',
  'de/of-the-slavs-0-67481f4bb1d7',
  'de/of-the-soviets-0-f9aac8051c8d',
  'en/of-africa-the-land-0-bec13650df5e',
  'en/of-the-soviets-0-6988d567878f',
  'es/a-chinese-man-0-43e6023db5c7',
  'es/a-frenchman-0-31cb2c5963ea',
  'es/a-german-man-0-697dc5a33858',
  'es/a-spaniard-0-2116bfd342b2',
  'es/an-englishman-0-721396d9f4d5',
  'es/of-germany-0-68e93a65cba7',
  'es/of-russia-0-5a84b4311261',
  'fr/a-frenchman-0-265c832fd198',
  'fr/a-german-man-0-1dede815d66d',
  'fr/an-englishman-0-cc5f8ee8ed7b',
  'fr/of-england-0-d442d6a805a8',
  'fr/of-france-0-e4e3c1e1c6ac',
  'fr/of-germany-0-2573f2b35ef4',
  'ja/a-frenchman-0-e79b6956bfbe',
  'ja/a-german-man-0-772b604d7b20',
  'ja/of-africa-the-land-0-aea296590301',
  'ru/a-chinese-man-0-1df481529cd6',
  'ru/a-german-man-0-93cce3bd2285',
  'ru/a-spaniard-0-b7c01aefc7f4',
  'ru/an-englishman-0-001ca19cf79a',
  'ru/of-china-0-080c27237812',
  'ru/of-germany-0-cd4c6c1ebd66',
  'ru/of-spain-0-581b6c14cb75',
  'ru/of-the-slavs-0-b1c6518dc20c',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
