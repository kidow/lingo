'use client'

import Image from 'next/image'
import { useState } from 'react'
import { imagePath } from '@/lib/content'

/**
 * 개념 이미지.
 *
 * 경로가 slug에서 결정되므로 데이터에 경로 필드가 없다. 파일이 아직 없으면
 * 플레이스홀더로 떨어진다 — "그림이 없는 개념"이 아니라 "아직 생성 전"이라는
 * 뜻이다. (spec.md §4)
 */
export function ConceptImage({
  slug,
  alt,
  priority = false,
}: {
  slug: string
  alt: string
  /** 첫 카드만 true. 피드의 LCP다 */
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)

  if (failed) return <Placeholder />

  return (
    <Image
      src={imagePath(slug)}
      alt={alt}
      fill
      sizes="(max-width: 480px) 100vw, 480px"
      className="object-cover"
      priority={priority}
      onError={() => setFailed(true)}
    />
  )
}

/**
 * 생성 전 개념용 대체 화면.
 *
 * 파일 대신 인라인 SVG다. 바이너리를 하나 더 두고 관리할 이유가 없고,
 * 토큰을 그대로 따라가며, 요청도 안 나간다.
 */
function Placeholder() {
  return (
    <div className="grid h-full w-full place-items-center bg-img-bg" aria-hidden>
      <svg viewBox="0 0 64 64" className="h-1/3 w-1/3 text-line" fill="none">
        <rect x="8" y="14" width="48" height="36" rx="6" stroke="currentColor" strokeWidth="3" />
        <circle cx="23" cy="27" r="4" fill="currentColor" />
        <path
          d="M14 44l12-12 9 9 6-6 9 9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
