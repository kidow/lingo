import { CardImage, CardSheet, FeedCard } from './feed'

/**
 * 481px 이상에서 피드 대신 뜨는 안내 한 장. (spec.md §3)
 *
 * 카드와 **같은 골격**이다 — 풀블리드 이미지 위로 본문 시트가 올라탄다.
 * 안내라고 다른 모양을 만들면 화면이 둘이 되는데, 이 제품에 있는 것은
 * 카드뿐이다.
 *
 * 보이고 숨는 것은 이 파일이 정하지 않는다. globals.css의 480px 경계 하나가
 * 피드와 이 화면을 동시에 뒤집는다.
 */
export function DesktopNotice() {
  return (
    <div className="desktop-notice h-dvh">
      <FeedCard>
        <CardImage>
          <PhoneIcon />
        </CardImage>
        <CardSheet>
          {/* 기기를 지칭하지 않는다. 가로로 눕힌 폰도 이 화면을 본다 */}
          <p className="text-lg font-semibold">화면이 너무 넓어요</p>
          <p className="text-sm text-sub">휴대폰에서 열거나 창을 좁혀 주세요</p>
        </CardSheet>
      </FeedCard>
    </div>
  )
}

/**
 * 파일이 아니라 인라인 SVG다. 플레이스홀더와 같은 이유 — 바이너리를 하나 더
 * 두고 관리할 이유가 없고 요청도 안 나간다.
 *
 * 색은 --sub 다. 플레이스홀더가 쓰는 --line 은 "아직 없음"이라는 뜻이라
 * 여기서 쓰면 의미가 어긋난다.
 */
function PhoneIcon() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden>
      <svg viewBox="0 0 64 64" className="h-1/4 w-1/4 text-sub" fill="none">
        <rect
          x="19"
          y="8"
          width="26"
          height="48"
          rx="6"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M29 48h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  )
}
