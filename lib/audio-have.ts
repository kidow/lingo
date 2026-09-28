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
  'zh/bedraggled',
  'zh/bulging-pocket',
  'zh/bumpy-road',
  'zh/burning-with-feeling',
  'zh/carrying-an-air-of-command',
  'zh/carrying-real-weight',
  'zh/chunky',
  'zh/clear-and-bright',
  'zh/clingy',
  'zh/close-woven',
  'zh/coming-round-every-year',
  'zh/cramped-space',
  'zh/crisp-and-stiff',
  'zh/daily',
  'zh/delayed',
  'zh/distant',
  'zh/dowdy',
  'zh/dull-boring',
  'zh/easily-moved-to-tears',
  'zh/fits-the-case',
  'zh/free-of-self-interest',
  'zh/going-on-foot',
  'zh/gold-coloured',
  'zh/grubby',
  'zh/half-hearted',
  'zh/hard-fought',
  'zh/harsh-cruel',
  'zh/held-very-precious',
  'zh/highest',
  'zh/hushed',
  'zh/ill-at-ease-within',
  'zh/languid',
  'zh/led-by-the-feelings',
  'zh/left-side',
  'zh/listless',
  'zh/mocking-by-twisting-it',
  'zh/modest-plain',
  'zh/much-alike-to-it',
  'zh/nearby',
  'zh/not-enough-of-it',
  'zh/not-fairly-dealt-out',
  'zh/odd-strange',
  'zh/of-a-chocolate-brown',
  'zh/of-a-lilac-shade',
  'zh/of-an-olive-green',
  'zh/optimist',
  'zh/out-of-place-here',
  'zh/particular-special',
  'zh/past-caring-either-way',
  'zh/pleasing-to-have',
  'zh/pungent-tingle',
  'zh/put-out-of-humour',
  'zh/quick-and-witty',
  'zh/refreshed',
  'zh/remaining',
  'zh/right-side',
  'zh/seasoned-player',
  'zh/sharpen-and-worsen',
  'zh/sits-well-in-the-hand',
  'zh/sky-blue',
  'zh/small-and-neatly-packed',
  'zh/sneering-at-it-all',
  'zh/thin-lean',
  'zh/tiny-of-its-kind',
  'zh/too-big-by-far',
  'zh/tousled',
  'zh/turning-out-plenty',
  'zh/turning-with-little-to-show',
  'zh/uncrowded',
  'zh/underdone',
  'zh/unhurried',
  'zh/wanted-for-the-job',
  'zh/well-pleased',
  'zh/whole-and-unbroken',
  'zh/widely-known',
  'zh/winding-road',
  'zh/without-any-decency',
  'zh/wonderfully-good',
  'zh/you-cannot-count-on-it',
  'zh/you-cannot-leave-it-out',
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
  'zh/bedraggled-0-7fff058d23ee',
  'zh/bulging-pocket-0-57ab34a59ae5',
  'zh/bumpy-road-0-3665923b117b',
  'zh/burning-with-feeling-0-c05749799a03',
  'zh/carrying-an-air-of-command-0-3d9df34e629d',
  'zh/carrying-real-weight-0-9526575a96ac',
  'zh/chunky-0-938eff9d97ae',
  'zh/clear-and-bright-0-1ceffdd1514a',
  'zh/clingy-0-cdc228d9e7e1',
  'zh/close-woven-0-e27705daa1ee',
  'zh/coming-round-every-year-0-3db07c859c8a',
  'zh/cramped-space-0-7d92c67df9f0',
  'zh/crisp-and-stiff-0-03d2b82b7f52',
  'zh/daily-0-96ff476fa807',
  'zh/delayed-0-09af59712986',
  'zh/distant-0-e740013bd51e',
  'zh/dowdy-0-a0a98c59e142',
  'zh/dull-boring-0-130ab20c958f',
  'zh/easily-moved-to-tears-0-7392ad4892c4',
  'zh/fits-the-case-0-54678becd697',
  'zh/free-of-self-interest-0-d0ad378efeef',
  'zh/going-on-foot-0-09e0f2f68983',
  'zh/gold-coloured-0-c27673671583',
  'zh/grubby-0-37d0f9d79cc0',
  'zh/half-hearted-0-3c2132d5bb62',
  'zh/hard-fought-0-3d459ce9d0a3',
  'zh/harsh-cruel-0-e162f7fecfbb',
  'zh/held-very-precious-0-1afd40e64eb0',
  'zh/highest-0-e62bffd6bb1b',
  'zh/hushed-0-e98eb02fb800',
  'zh/ill-at-ease-within-0-576f8291f8a8',
  'zh/interchange-0-df1fefad22b8',
  'zh/languid-0-8c3e988fef35',
  'zh/led-by-the-feelings-0-230583777922',
  'zh/left-side-0-6970dd79dc8d',
  'zh/listless-0-9cfd08313b9b',
  'zh/lunar-calendar-0-9835059330ad',
  'zh/mocking-by-twisting-it-0-d946376954a6',
  'zh/modest-plain-0-8af41e7bb9f8',
  'zh/much-alike-to-it-0-325d67dd2e6f',
  'zh/nearby-0-c566b627e4c5',
  'zh/not-enough-of-it-0-ef11a524420c',
  'zh/not-fairly-dealt-out-0-6b567d321b70',
  'zh/odd-strange-0-0279d77415c3',
  'zh/of-a-chocolate-brown-0-a7902e1021ba',
  'zh/of-a-lilac-shade-0-a6b42955d3a2',
  'zh/of-an-olive-green-0-5d75330e39a9',
  'zh/optimist-0-be65f0290144',
  'zh/out-of-place-here-0-a6337ca8a072',
  'zh/particular-special-0-8b19e8db9052',
  'zh/past-caring-either-way-0-7f9b77c4cff9',
  'zh/pleasing-to-have-0-f69ad2ae39c3',
  'zh/pungent-tingle-0-a5f709cf1437',
  'zh/put-out-of-humour-0-2207dc38759d',
  'zh/quick-and-witty-0-5054cd6e433b',
  'zh/refreshed-0-a2c33a07d6a5',
  'zh/remaining-0-8c6c8f981b48',
  'zh/right-side-0-0c7252d5c1bc',
  'zh/seasoned-player-0-f205b8aad437',
  'zh/sharpen-and-worsen-0-314d2bdec77a',
  'zh/sits-well-in-the-hand-0-957eb2bb0637',
  'zh/sky-blue-0-51bbdd62c057',
  'zh/small-and-neatly-packed-0-342b63ca4cfa',
  'zh/sneering-at-it-all-0-d3205172a3e4',
  'zh/submarine-0-46c4db2c2723',
  'zh/thin-lean-0-931dd860b02c',
  'zh/tiny-of-its-kind-0-7b91766bb8cc',
  'zh/too-big-by-far-0-bdd1c977aa04',
  'zh/tousled-0-9137ef601d00',
  'zh/turning-out-plenty-0-dce1784a5d52',
  'zh/turning-with-little-to-show-0-7788002ce60f',
  'zh/uncrowded-0-26d1fb0ab360',
  'zh/underdone-0-085b00731c2f',
  'zh/unhurried-0-b866cfb4eccb',
  'zh/wanted-for-the-job-0-276ca3c95915',
  'zh/well-pleased-0-daab02f40360',
  'zh/whole-and-unbroken-0-a05f9de5d8b0',
  'zh/widely-known-0-910dd3488d5c',
  'zh/winding-road-0-a57f8077f66c',
  'zh/without-any-decency-0-70cd4beb6ba2',
  'zh/wonderfully-good-0-35150c2bd1af',
  'zh/you-cannot-count-on-it-0-c14285bb6aca',
  'zh/you-cannot-leave-it-out-0-e5fd5a94ff71',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
