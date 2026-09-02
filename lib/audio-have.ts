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
  'de/bat-animal',
  'de/book-reserve',
  'de/date-fruit',
  'de/elephant-trunk',
  'de/fly-insect',
  'de/light-ray',
  'de/mouse-animal',
  'de/orange-fruit',
  'de/plant-life',
  'de/spring-coil',
  'en/bat-animal',
  'en/book-reserve',
  'en/date-fruit',
  'en/elephant-trunk',
  'en/fly-insect',
  'en/light-ray',
  'en/mouse-animal',
  'en/orange-fruit',
  'en/plant-life',
  'en/spring-coil',
  'es/bat-animal',
  'es/book-reserve',
  'es/date-fruit',
  'es/elephant-trunk',
  'es/fly-insect',
  'es/light-ray',
  'es/mouse-animal',
  'es/orange-fruit',
  'es/plant-life',
  'es/spring-coil',
  'fr/bat-animal',
  'fr/book-reserve',
  'fr/date-fruit',
  'fr/elephant-trunk',
  'fr/fly-insect',
  'fr/light-ray',
  'fr/mouse-animal',
  'fr/orange-fruit',
  'fr/plant-life',
  'fr/spring-coil',
  'ja/bat-animal',
  'ja/book-reserve',
  'ja/date-fruit',
  'ja/elephant-trunk',
  'ja/fly-insect',
  'ja/light-ray',
  'ja/mouse-animal',
  'ja/orange-fruit',
  'ja/plant-life',
  'ja/spring-coil',
  'ru/bat-animal',
  'ru/book-reserve',
  'ru/date-fruit',
  'ru/elephant-trunk',
  'ru/fly-insect',
  'ru/light-ray',
  'ru/mouse-animal',
  'ru/orange-fruit',
  'ru/plant-life',
  'ru/spring-coil',
  'zh/bat-animal',
  'zh/book-reserve',
  'zh/date-fruit',
  'zh/elephant-trunk',
  'zh/fly-insect',
  'zh/light-ray',
  'zh/mouse-animal',
  'zh/orange-fruit',
  'zh/plant-life',
  'zh/spring-coil',
])

/** 그 언어에 그 개념의 발음이 있는가 */
export function hasAudio(slug: string, lang: string): boolean {
  return !AUDIO_MISSING.has(`${lang}/${slug}`)
}

/**
 * 예문 소리가 **있는** 자리. 낱말과 반대로 적는다.
 *
 * 낱말은 20,671자리가 거의 다 차 있어 **없는 것**을 적는 편이 짧다. 예문은
 * 42,000자리가 거의 다 비어 있어 **있는 것**을 적는 편이 짧다. 같은 이유로
 * 방향만 뒤집었다 — 목록이 번들에 실리므로 짧은 쪽을 고른다.
 *
 * 열쇠는 `{lang}/{slug}-{index}-{해시}`다. 해시가 문장에서 나오므로(lib/entries.ts)
 * 예문을 고치면 열쇠가 달라지고, 이 목록에 없으니 버튼이 조용히 안 뜬다.
 *
 *   node scripts/audio.ts manifest    다시 만든다
 */
export const EXAMPLE_AUDIO: ReadonlySet<string> = new Set([])
