import type { NextConfig } from 'next'

/**
 * 서버가 없다. (spec.md §1, §4)
 *
 * 진도는 localStorage에 있고 콘텐츠는 빌드 시점에 번들되므로 런타임에 서버가
 * 할 일이 전혀 없다. output:'export'로 그 사실을 강제한다 — out/ 폴더 하나면
 * 어디서든 뜬다.
 *
 * 이미지 최적화도 끈다. public/concepts/*.webp 는 이미 512×512 q80으로
 * 파이프라인이 만든 최종본(개당 5KB)이라 최적화기가 더 줄일 게 없다. 덤으로
 * /_next/image 캐시가 400 응답에도 옛 이미지를 계속 그리던 문제가 사라진다.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
