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
  'de/a-kiss',
  'de/cause-damage',
  'de/city-tour',
  'de/computer-file',
  'de/hammer-tool',
  'de/put-on-makeup',
  'de/quiz',
  'de/rechargeable-battery',
  'de/retire-from-work',
  'de/sting',
  'de/stone',
  'de/stress',
  'de/view-from-the-room',
  'en/a-kiss',
  'en/cause-damage',
  'en/city-tour',
  'en/computer-file',
  'en/hammer-tool',
  'en/put-on-makeup',
  'en/quiz',
  'en/rechargeable-battery',
  'en/retire-from-work',
  'en/sting',
  'en/stone',
  'en/stress',
  'en/view-from-the-room',
  'es/a-kiss',
  'es/cause-damage',
  'es/city-tour',
  'es/computer-file',
  'es/hammer-tool',
  'es/put-on-makeup',
  'es/quiz',
  'es/rechargeable-battery',
  'es/retire-from-work',
  'es/sting',
  'es/stone',
  'es/stress',
  'es/view-from-the-room',
  'fr/a-kiss',
  'fr/cause-damage',
  'fr/city-tour',
  'fr/computer-file',
  'fr/hammer-tool',
  'fr/put-on-makeup',
  'fr/quiz',
  'fr/rechargeable-battery',
  'fr/retire-from-work',
  'fr/sting',
  'fr/stone',
  'fr/stress',
  'fr/view-from-the-room',
  'ja/a-kiss',
  'ja/cause-damage',
  'ja/city-tour',
  'ja/computer-file',
  'ja/hammer-tool',
  'ja/put-on-makeup',
  'ja/quiz',
  'ja/rechargeable-battery',
  'ja/retire-from-work',
  'ja/sting',
  'ja/stone',
  'ja/stress',
  'ja/view-from-the-room',
  'ru/a-kiss',
  'ru/cause-damage',
  'ru/city-tour',
  'ru/computer-file',
  'ru/hammer-tool',
  'ru/put-on-makeup',
  'ru/quiz',
  'ru/rechargeable-battery',
  'ru/retire-from-work',
  'ru/sting',
  'ru/stone',
  'ru/stress',
  'ru/view-from-the-room',
  'zh/a-kiss',
  'zh/cause-damage',
  'zh/city-tour',
  'zh/computer-file',
  'zh/hammer-tool',
  'zh/put-on-makeup',
  'zh/quiz',
  'zh/rechargeable-battery',
  'zh/retire-from-work',
  'zh/sting',
  'zh/stone',
  'zh/stress',
  'zh/view-from-the-room',
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
  'de/a-kiss-0-be6819bc39ff',
  'de/cause-damage-0-5f5215048b74',
  'de/city-tour-0-536047fb0e3a',
  'de/computer-file-0-5fe6c0033c79',
  'de/hammer-tool-0-7f3d65026b6e',
  'de/put-on-makeup-0-1c34a0ef5921',
  'de/quiz-0-3d3453a9e2bd',
  'de/rechargeable-battery-0-d9e1799e8a81',
  'de/retire-from-work-0-1e0252c930b3',
  'de/sting-0-44665218c260',
  'de/stone-0-1792130309aa',
  'de/stress-0-a8b37f863b63',
  'de/view-from-the-room-0-dde7013aed8d',
  'en/a-kiss-0-08f408c1d858',
  'en/cause-damage-0-53ec8b4c3f41',
  'en/city-tour-0-01ab3b66bd20',
  'en/computer-file-0-805254406d0d',
  'en/hammer-tool-0-128748988f67',
  'en/put-on-makeup-0-6fae5a761513',
  'en/quiz-0-06fcb396f77e',
  'en/rechargeable-battery-0-5096ebec04f5',
  'en/retire-from-work-0-f2d1e6f57cab',
  'en/sting-0-8b39d9486bda',
  'en/stone-0-358194d57d83',
  'en/stress-0-0c3ae0da3a37',
  'en/view-from-the-room-0-422f024d19f6',
  'es/a-kiss-0-fc87d59d9a90',
  'es/cause-damage-0-063091834dd3',
  'es/city-tour-0-209afa413ed8',
  'es/computer-file-0-60cc6c11d176',
  'es/hammer-tool-0-34da926dd022',
  'es/put-on-makeup-0-aedc8b348775',
  'es/quiz-0-5fcbfaa7adc1',
  'es/rechargeable-battery-0-b5be3da6f019',
  'es/retire-from-work-0-731ee0dfa6fc',
  'es/sting-0-bc227e97d41b',
  'es/stone-0-3776ac875137',
  'es/stress-0-f26e65b8f4f5',
  'es/view-from-the-room-0-c66a964fb59b',
  'fr/a-kiss-0-2b9c8aaaa3a0',
  'fr/cause-damage-0-627ee4d27bd2',
  'fr/city-tour-0-f0389a76002a',
  'fr/computer-file-0-4af1327d98ba',
  'fr/hammer-tool-0-6cbec5251dba',
  'fr/put-on-makeup-0-090c6c0d52e8',
  'fr/quiz-0-bde006576356',
  'fr/rechargeable-battery-0-c7f82fca82ba',
  'fr/retire-from-work-0-c810745e6238',
  'fr/sting-0-3e466f2d766c',
  'fr/stone-0-33a2b4b7e9a4',
  'fr/stress-0-1d97c79d962b',
  'fr/view-from-the-room-0-c4abe5a8bcae',
  'ja/a-kiss-0-49831d048b3c',
  'ja/cause-damage-0-63819cccacaf',
  'ja/city-tour-0-06f5b07bf088',
  'ja/computer-file-0-cf00221ba5d0',
  'ja/hammer-tool-0-f034b60ba658',
  'ja/put-on-makeup-0-f96a5f56b004',
  'ja/quiz-0-3d1c9dd4ce79',
  'ja/rechargeable-battery-0-ad059a28921d',
  'ja/retire-from-work-0-5de92e3204e1',
  'ja/sting-0-031b67ee6c57',
  'ja/stone-0-d51f2709f6f5',
  'ja/stress-0-f9748fd60f06',
  'ja/view-from-the-room-0-73b57d4883c7',
  'ru/a-kiss-0-1796276d8d96',
  'ru/cause-damage-0-9892625713c3',
  'ru/city-tour-0-facba079b5fd',
  'ru/computer-file-0-81f0fc386c0e',
  'ru/hammer-tool-0-5c10387416dc',
  'ru/put-on-makeup-0-338282e9ec8b',
  'ru/quiz-0-7738b1048f3c',
  'ru/rechargeable-battery-0-c4a86e8694cf',
  'ru/retire-from-work-0-318d51f70faf',
  'ru/sting-0-70a9e4a69120',
  'ru/stone-0-81b506ecff21',
  'ru/stress-0-9fff4ccfb36f',
  'ru/view-from-the-room-0-3b50ebe2fd09',
  'zh/a-kiss-0-d93d7f3630c0',
  'zh/cause-damage-0-a58845783428',
  'zh/city-tour-0-d554ef6ed789',
  'zh/computer-file-0-e0d98c0dd1d0',
  'zh/hammer-tool-0-dc342dda4e72',
  'zh/put-on-makeup-0-dacf562d59a4',
  'zh/quiz-0-b308b81dfb1c',
  'zh/rechargeable-battery-0-bdd05bc3cc7e',
  'zh/retire-from-work-0-1c649daa4f9b',
  'zh/sting-0-e53d785d72d6',
  'zh/stone-0-995fd0dcd966',
  'zh/stress-0-e211025c2c65',
  'zh/view-from-the-room-0-6e300a1ecb95',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
