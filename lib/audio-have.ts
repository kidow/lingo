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
  'de/greengrocer',
  'de/juggler',
  'de/lumberjack',
  'de/magician',
  'de/octagon',
  'de/pendulum-clock',
  'de/pentagon',
  'de/quarter-past',
  'de/sculptor',
  'de/semicircle',
  'de/surveyor',
  'en/greengrocer',
  'en/juggler',
  'en/lumberjack',
  'en/magician',
  'en/octagon',
  'en/pendulum-clock',
  'en/pentagon',
  'en/quarter-past',
  'en/sculptor',
  'en/semicircle',
  'en/surveyor',
  'es/greengrocer',
  'es/juggler',
  'es/lumberjack',
  'es/magician',
  'es/octagon',
  'es/pendulum-clock',
  'es/pentagon',
  'es/quarter-past',
  'es/sculptor',
  'es/semicircle',
  'es/surveyor',
  'fr/greengrocer',
  'fr/juggler',
  'fr/lumberjack',
  'fr/magician',
  'fr/octagon',
  'fr/pendulum-clock',
  'fr/pentagon',
  'fr/quarter-past',
  'fr/sculptor',
  'fr/semicircle',
  'fr/surveyor',
  'ja/greengrocer',
  'ja/juggler',
  'ja/lumberjack',
  'ja/magician',
  'ja/octagon',
  'ja/pendulum-clock',
  'ja/pentagon',
  'ja/quarter-past',
  'ja/sculptor',
  'ja/semicircle',
  'ja/surveyor',
  'ru/greengrocer',
  'ru/juggler',
  'ru/lumberjack',
  'ru/magician',
  'ru/octagon',
  'ru/pendulum-clock',
  'ru/pentagon',
  'ru/quarter-past',
  'ru/sculptor',
  'ru/semicircle',
  'ru/surveyor',
  'zh/greengrocer',
  'zh/juggler',
  'zh/lumberjack',
  'zh/magician',
  'zh/octagon',
  'zh/pendulum-clock',
  'zh/pentagon',
  'zh/quarter-past',
  'zh/sculptor',
  'zh/semicircle',
  'zh/surveyor',
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
