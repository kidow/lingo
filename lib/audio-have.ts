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
  'de/contestant',
  'de/walkway',
  'en/a-going-over-it-again',
  'en/a-parting-of-views',
  'en/a-special-skill',
  'en/a-thing-you-seldom-see',
  'en/a-word-of-correction',
  'en/accommodate-to',
  'en/as-luck-would-have-it',
  'en/at-some-time-still-to-come',
  'en/by-word-of-mouth',
  'en/cheer-them-on',
  'en/completion-of-work',
  'en/contestant',
  'en/do-as-they-are-told',
  'en/done-rightly',
  'en/dull-and-dry',
  'en/electric-plug',
  'en/for-good-and-all',
  'en/from-the-heart',
  'en/full-of-go',
  'en/give-guidance',
  'en/goods-items',
  'en/herewith-this',
  'en/hungry-for-a-name',
  'en/idle-unused',
  'en/layout-plan',
  'en/let-off-the-burden',
  'en/much-alike-to-it',
  'en/of-a-bright-outlook',
  'en/of-the-whole-nation',
  'en/renovate',
  'en/ride-the-waves',
  'en/right-then',
  'en/send-along-a-line',
  'en/set-and-fixed',
  'en/solely-and-only',
  'en/spear-against-own-shield',
  'en/spur-on',
  'en/stand-out',
  'en/the-real-one-itself',
  'en/the-taking-in-of-it',
  'en/to-do-with-art',
  'en/to-do-with-sport',
  'en/walkway',
  'en/wonderfully-good',
  'en/working-together',
  'es/contestant',
  'es/walkway',
  'fr/contestant',
  'fr/walkway',
  'ja/contestant',
  'ja/walkway',
  'ru/contestant',
  'ru/walkway',
  'zh/contestant',
  'zh/walkway',
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
  'de/contestant-0-b6bf3094c811',
  'de/walkway-0-b2f36f3922d5',
  'en/a-going-over-it-again-0-d99e28225992',
  'en/a-parting-of-views-0-235b08f717c5',
  'en/a-special-skill-0-b8d722bfc0f8',
  'en/a-thing-you-seldom-see-0-1c46376027b3',
  'en/a-word-of-correction-0-2683b44e1cb3',
  'en/accommodate-to-0-021c5b37e9f7',
  'en/as-luck-would-have-it-0-d9af71689bb1',
  'en/at-some-time-still-to-come-0-408a75b8b8a1',
  'en/by-word-of-mouth-0-516649cd242b',
  'en/cheer-them-on-0-fa12f4738f67',
  'en/completion-of-work-0-b2381300b2eb',
  'en/contestant-0-6a557341b58c',
  'en/do-as-they-are-told-0-78f38a6d31f4',
  'en/done-rightly-0-22095940ac3d',
  'en/dull-and-dry-0-08899541bf81',
  'en/electric-plug-0-00ddf9ec6c49',
  'en/for-good-and-all-0-27bdd41e9aca',
  'en/from-the-heart-0-b09514bbe781',
  'en/full-of-go-0-5331d15ef2a5',
  'en/give-guidance-0-f5ddd556b626',
  'en/goods-items-0-872d53f52192',
  'en/herewith-this-0-540074e435ca',
  'en/hungry-for-a-name-0-263afd7344f1',
  'en/idle-unused-0-a5f8507f443f',
  'en/layout-plan-0-dd5704ca9c68',
  'en/let-off-the-burden-0-56576d307e28',
  'en/much-alike-to-it-0-fa2c7f56dc61',
  'en/of-a-bright-outlook-0-2b457812d0ba',
  'en/of-the-whole-nation-0-69853b79909b',
  'en/renovate-0-256e56a6604a',
  'en/ride-the-waves-0-b845fdfeb468',
  'en/right-then-0-02c7cf73d259',
  'en/send-along-a-line-0-04e880d93932',
  'en/set-and-fixed-0-d1d9c978f14f',
  'en/solely-and-only-0-6b233915b6bb',
  'en/spear-against-own-shield-0-1b28b32fbdb9',
  'en/spur-on-0-e04232c5e432',
  'en/stand-out-0-9887d7df3158',
  'en/the-real-one-itself-0-140018521e2b',
  'en/the-taking-in-of-it-0-fa400acad6fb',
  'en/to-do-with-art-0-b082d0ff08db',
  'en/to-do-with-sport-0-c21e7f3bcfc0',
  'en/walkway-0-19b8504a31af',
  'en/wonderfully-good-0-2fd934cbf21b',
  'en/working-together-0-bbbfac6836d0',
  'es/contestant-0-65b3e6f1e1a1',
  'es/walkway-0-047b7cf19f6e',
  'fr/contestant-0-e505599b02b3',
  'fr/walkway-0-fe0807985565',
  'ja/contestant-0-398ee8eec690',
  'ja/walkway-0-20f017995e14',
  'ru/contestant-0-3424f07beb66',
  'ru/walkway-0-a289d482e420',
  'zh/contestant-0-179834733ff9',
  'zh/walkway-0-ce671950791d',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
