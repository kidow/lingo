import type { NextConfig } from 'next'

/**
 * 외부 도메인이 없다. 이미지·오디오는 전부 public/ 아래 정적 파일이라
 * remotePatterns 설정이 필요 없다. (spec.md §8)
 */
const nextConfig: NextConfig = {}

export default nextConfig
