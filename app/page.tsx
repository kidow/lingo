import { DesktopNotice } from '@/components/desktop-notice'
import { Shell } from '@/components/shell'
import { entriesFor } from '@/lib/content'
import { LANGUAGES } from '@/lib/lang'
import type { Entry } from '@/lib/entries'
import type { Language } from '@/lib/types'

/**
 * 서버가 하는 일은 출제 가능한 목록을 언어별로 추리는 것까지다.
 *
 * 무엇을 언제 낼지는 진도에 달렸고, 어느 언어를 볼지는 설정에 달렸다.
 * 둘 다 localStorage에 있어 서버는 모른다. (spec.md §3, §8)
 *
 * 둘을 나란히 내보내고 어느 쪽을 보일지는 globals.css의 480px 경계가 정한다.
 * 정적 export라 첫 HTML이 이미 둘 다 들고 있고, 깜빡임 없이 CSS 한 번으로
 * 갈린다. (spec.md §3)
 */
export default function Page() {
  const entries = Object.fromEntries(
    LANGUAGES.map((lang) => [lang, entriesFor(lang)]),
  ) as Record<Language, Entry[]>

  return (
    <>
      <Shell entries={entries} />
      <DesktopNotice />
    </>
  )
}
