import type { MetadataRoute } from 'next'

/**
 * PWA manifest. 서비스워커는 없다 — 홈 화면에 담기고 전체화면으로 열리는
 * 것까지만 한다. (spec.md §2)
 *
 * 색은 brand-spec.md의 토큰 그대로다. theme_color를 화면 배경과 같게 두면
 * 상태바가 카드와 이어져 이음매가 사라진다.
 */
/** 정적 내보내기에서는 라우트가 정적임을 명시해야 한다 */
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lingo — 이미지로 기억하는 일본어',
    short_name: 'Lingo',
    description: '그림을 보고 단어를 떠올리는 세로 피드. 열면 바로 시작한다.',
    lang: 'ko',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F4F1EC',
    theme_color: '#F4F1EC',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // 안드로이드 적응형 아이콘은 바깥을 잘라낸다. 여백을 준 별도 파일이 필요하다
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
