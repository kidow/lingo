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
  'zh/bald',
  'zh/boast',
  'zh/car-race',
  'zh/card-game',
  'zh/concise',
  'zh/deaf',
  'zh/debt',
  'zh/draw-them-in',
  'zh/elite-group',
  'zh/ferment-it',
  'zh/gazebo',
  'zh/hooligan',
  'zh/inflation',
  'zh/interchange',
  'zh/leave-it-out',
  'zh/limp',
  'zh/loud-sound',
  'zh/lunar-calendar',
  'zh/pale-white',
  'zh/put-their-name-forward',
  'zh/reach-for',
  'zh/something-does-not-add-up',
  'zh/submarine',
  'zh/substitute-player',
  'zh/successor',
  'zh/the-way-one-carries-oneself',
  'zh/unplug',
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
  'zh/bald-0-1bfd26da1eab',
  'zh/boast-0-b1e8bb89b9f2',
  'zh/car-race-0-728cd0873b79',
  'zh/card-game-0-9da2a8fd8060',
  'zh/concise-0-18e166614f92',
  'zh/deaf-0-1ff76604c880',
  'zh/debt-0-7077540c429a',
  'zh/draw-them-in-0-c06964ac8ac0',
  'zh/elite-group-0-d01c2aaf6b6f',
  'zh/ferment-it-0-7b14fd0a6855',
  'zh/gazebo-0-ffb9afea5396',
  'zh/hooligan-0-8984f93245e6',
  'zh/inflation-0-40fb88179833',
  'zh/interchange-0-df1fefad22b8',
  'zh/leave-it-out-0-cfac24951c58',
  'zh/limp-0-b518af732ec1',
  'zh/loud-sound-0-b450c9c691b2',
  'zh/lunar-calendar-0-9835059330ad',
  'zh/pale-white-0-5fb23dc24fdb',
  'zh/put-their-name-forward-0-d3af8d4b78ee',
  'zh/reach-for-0-90f22a3e08bb',
  'zh/something-does-not-add-up-0-bcb9c5b66539',
  'zh/submarine-0-46c4db2c2723',
  'zh/substitute-player-0-f5508bcf2b73',
  'zh/successor-0-f17675357348',
  'zh/the-way-one-carries-oneself-0-f7c6f1dcf4ae',
  'zh/unplug-0-020f56fbd32f',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
