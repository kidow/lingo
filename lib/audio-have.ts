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
  'ru/a-certain-few-0-b0e220dee3d9',
  'ru/a-chinese-woman-0-085496aa2b51',
  'ru/a-crossing-place-0-4f2a3046162d',
  'ru/a-frenchwoman-0-e73ed7f42ee9',
  'ru/a-going-away-0-d0d6089cf073',
  'ru/a-muscovite-0-5a5eab2893be',
  'ru/a-piece-of-folly-0-71e560925e0c',
  'ru/a-racist-person-0-3a7bbce6ab26',
  'ru/a-selfish-minded-one-0-926ca0d695e8',
  'ru/a-stiff-paper-card-0-de9e92765b9b',
  'ru/a-yard-behind-the-house-0-c5409b2c1b05',
  'ru/an-office-of-management-0-6e8ac461e1f5',
  'ru/coming-round-in-turn-0-71fa8f02a954',
  'ru/delayed-0-cbe3c1d38309',
  'ru/easily-moved-to-tears-0-1ebe0bbb6a32',
  'ru/facing-the-east-0-89a18de2c3b2',
  'ru/fallen-in-love-0-542645593e06',
  'ru/games-and-sport-0-f17c068529d6',
  'ru/grid-paper-0-82f01f775ea6',
  'ru/hatred-aimed-at-the-jews-0-f2dd602bf8df',
  'ru/layman-0-7a0cf63c46a6',
  'ru/made-of-paper-0-b42aed19decb',
  'ru/meant-for-learning-0-ff610983fe84',
  'ru/metaphor-0-5f945e8b0768',
  'ru/mum-at-home-0-b524c8143b06',
  'ru/of-a-woman-0-0edfe56758c3',
  'ru/of-africa-the-land-0-77e41ae15dc6',
  'ru/of-an-olive-green-0-4ea98d388b8a',
  'ru/of-reckoning-0-50bf00f58eec',
  'ru/of-that-kind-0-0621eb809701',
  'ru/of-the-burgher-class-0-2d4b7a79329a',
  'ru/of-the-jewellers-trade-0-67f8d1b050d0',
  'ru/of-the-latin-tongue-0-7bf6eeb50e69',
  'ru/of-the-railway-line-0-a9292610d4fd',
  'ru/of-two-years-standing-0-c46bd89cd1f9',
  'ru/out-in-space-0-210e7c015b4e',
  'ru/quick-to-answer-a-need-0-9423656e74b7',
  'ru/ready-to-start-things-0-5f11b5f9168c',
  'ru/sneering-at-it-all-0-ebb1102b9433',
  'ru/staffroom-0-edad3287c719',
  'ru/the-far-point-of-the-axis-0-03cf0b742d0b',
  'ru/the-japanese-money-0-7884666f5cd0',
  'ru/the-killing-of-a-people-0-72aca49aacd4',
  'ru/the-life-one-lives-0-20ffcf36ea5c',
  'ru/the-look-of-a-thing-0-4c0e5147be69',
  'ru/the-loop-you-hold-0-f9dd51e1bfc6',
  'ru/the-study-of-language-0-e7c8b91fc2ae',
  'ru/the-way-one-walks-0-86878ce9feda',
  'ru/to-do-with-music-0-930a9d221f8e',
  'ru/to-do-with-the-sexes-0-a85006961432',
  'ru/touched-with-genius-0-d3179011a321',
  'ru/whole-and-unbroken-0-d766940952ce',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
