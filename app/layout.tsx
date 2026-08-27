import type { Metadata, Viewport } from 'next'
import './globals.css'

const TITLE = 'Lingo'
const DESCRIPTION = '그림을 보고 단어를 떠올리는 세로 피드. 열면 바로 시작한다.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: TITLE,
  // 홈 화면에서 열었을 때 브라우저 UI 없이 뜬다
  appleWebApp: { capable: true, title: TITLE, statusBarStyle: 'default' },
  // 학습 앱이라 검색 노출이 목적이 아니지만 막을 이유도 없다
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', locale: 'ko_KR' },
  formatDetection: { telephone: false, date: false, address: false, email: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale을 막지 않는다. 카드가 화면 하나를 차지한다는 전제는 깨지지만
  // 확대를 봉쇄하는 건 접근성 위반이다 (WCAG 1.4.4)
  viewportFit: 'cover',
  themeColor: '#f4f1ec',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
