import { DesktopNotice } from '@/components/desktop-notice'
import { Feed } from '@/components/feed'
import { entriesFor } from '@/lib/content'
import { DEFAULT_LANGUAGE } from '@/lib/lang'

/**
 * 5단계 — 학습 엔진 연결.
 *
 * 서버는 출제 가능한 개념 목록만 넘긴다. 무엇을 언제 낼지는 진도에 달렸고
 * 진도는 localStorage에 있으므로 클라이언트만 안다. (spec.md §8)
 *
 * 둘을 나란히 내보내고 어느 쪽을 보일지는 globals.css의 480px 경계가 정한다.
 * 서버는 뷰포트를 모르고 알 필요도 없다 — 정적 export라 첫 HTML이 이미 둘 다
 * 들고 있고, 깜빡임 없이 CSS 한 번으로 갈린다. (spec.md §3)
 */
export default function Page() {
  const lang = DEFAULT_LANGUAGE
  return (
    <>
      <Feed entries={entriesFor(lang)} lang={lang} />
      <DesktopNotice />
    </>
  )
}
