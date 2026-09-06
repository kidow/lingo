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
  'de/advertisement',
  'de/branch-office',
  'de/car-race',
  'de/clearance-sale',
  'de/courtroom',
  'de/dollar',
  'de/editor',
  'de/embankment',
  'de/expert',
  'de/fashion',
  'de/gene',
  'de/haircut',
  'de/king',
  'de/ministry',
  'de/purchase',
  'de/reference-book',
  'de/rehearsal',
  'de/starting-line',
  'en/advertisement',
  'en/branch-office',
  'en/car-race',
  'en/clearance-sale',
  'en/courtroom',
  'en/dollar',
  'en/editor',
  'en/embankment',
  'en/expert',
  'en/fashion',
  'en/gene',
  'en/haircut',
  'en/king',
  'en/ministry',
  'en/purchase',
  'en/reference-book',
  'en/rehearsal',
  'en/starting-line',
  'es/advertisement',
  'es/branch-office',
  'es/car-race',
  'es/clearance-sale',
  'es/courtroom',
  'es/dollar',
  'es/editor',
  'es/embankment',
  'es/expert',
  'es/fashion',
  'es/gene',
  'es/haircut',
  'es/king',
  'es/ministry',
  'es/purchase',
  'es/reference-book',
  'es/rehearsal',
  'es/starting-line',
  'fr/advertisement',
  'fr/branch-office',
  'fr/car-race',
  'fr/clearance-sale',
  'fr/courtroom',
  'fr/dollar',
  'fr/editor',
  'fr/embankment',
  'fr/expert',
  'fr/fashion',
  'fr/gene',
  'fr/haircut',
  'fr/king',
  'fr/ministry',
  'fr/purchase',
  'fr/reference-book',
  'fr/rehearsal',
  'fr/starting-line',
  'ja/advertisement',
  'ja/branch-office',
  'ja/car-race',
  'ja/clearance-sale',
  'ja/courtroom',
  'ja/dollar',
  'ja/editor',
  'ja/embankment',
  'ja/expert',
  'ja/fashion',
  'ja/gene',
  'ja/haircut',
  'ja/king',
  'ja/ministry',
  'ja/purchase',
  'ja/reference-book',
  'ja/rehearsal',
  'ja/starting-line',
  'ru/advertisement',
  'ru/branch-office',
  'ru/car-race',
  'ru/clearance-sale',
  'ru/courtroom',
  'ru/dollar',
  'ru/editor',
  'ru/embankment',
  'ru/expert',
  'ru/fashion',
  'ru/gene',
  'ru/haircut',
  'ru/king',
  'ru/ministry',
  'ru/purchase',
  'ru/reference-book',
  'ru/rehearsal',
  'ru/starting-line',
  'zh/advertisement',
  'zh/branch-office',
  'zh/car-race',
  'zh/clearance-sale',
  'zh/courtroom',
  'zh/dollar',
  'zh/editor',
  'zh/embankment',
  'zh/expert',
  'zh/fashion',
  'zh/gene',
  'zh/haircut',
  'zh/king',
  'zh/ministry',
  'zh/purchase',
  'zh/reference-book',
  'zh/rehearsal',
  'zh/starting-line',
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
