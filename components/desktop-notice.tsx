import { CardBody, ImageTile } from './feed'

/**
 * 481px 이상에서 피드 대신 뜨는 안내 한 장. (spec.md §3)
 *
 * 골격은 소개 카드와 같다 — 이미지 타일 → 제목 → 설명. 하단 Cue는 없다.
 * Cue는 잠금 중에만 나타나는 줄이고(brand-spec), 여기서 할 일은 설명줄이
 * 이미 말하고 있다.
 *
 * 세로 중앙에 놓는다. 카드 하단의 빈 여백은 "다음 장이 있다"는 신호인데
 * 안내 화면에는 다음 장이 없어서 상단 정렬은 거짓 신호가 된다.
 *
 * 보이고 숨는 것은 이 파일이 정하지 않는다. globals.css의 480px 경계 하나가
 * 피드와 이 화면을 동시에 뒤집는다.
 */
export function DesktopNotice() {
  return (
    <section className="desktop-notice mx-auto grid h-dvh w-full max-w-[480px] place-items-center px-5">
      <div className="flex w-full flex-col gap-lg">
        <ImageTile>
          <PhoneIcon />
        </ImageTile>
        <CardBody>
          {/* 기기를 지칭하지 않는다. 가로로 눕힌 폰도 이 화면을 본다 */}
          <p className="text-center text-lg font-semibold">화면이 너무 넓어요</p>
          <p className="text-center text-sm text-sub">
            휴대폰에서 열거나
            <br />
            창을 좁혀 주세요
          </p>
        </CardBody>
      </div>
    </section>
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
      <svg viewBox="0 0 64 64" className="h-1/3 w-1/3 text-sub" fill="none">
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
