import { CardBody, Cue, Feed, FeedCard, ImageTile } from '@/components/feed'

/**
 * 1단계 — 셸.
 *
 * 카드 3종은 3단계에서 붙인다. 지금 확인할 것은 세 가지뿐이다.
 *   1. 토큰이 실제로 적용되는가
 *   2. 한 카드가 화면 하나를 정확히 차지하는가
 *   3. 세로 스냅이 한 장씩 걸리는가
 */
const PLACEHOLDERS = ['첫 번째 카드', '두 번째 카드', '세 번째 카드']

export default function Page() {
  return (
    <Feed>
      {PLACEHOLDERS.map((label, i) => (
        <FeedCard key={label}>
          <ImageTile>
            <div className="grid h-full place-items-center text-sm text-sub">이미지 자리</div>
          </ImageTile>

          <CardBody>
            <p className="text-center font-jp text-4xl font-bold">{label}</p>
            <div className="grid grid-cols-2 gap-sm">
              <div className="grid h-[72px] place-items-center rounded-ctrl border border-line bg-surface text-sub">
                본문 자리
              </div>
              <div className="grid h-[72px] place-items-center rounded-ctrl border border-accent bg-pick font-semibold text-accent">
                선택 상태
              </div>
            </div>
          </CardBody>

          <Cue locked={i === 1}>
            {i === 1 ? '잠금 상태 문구' : '위로 밀어 다음'}
          </Cue>
        </FeedCard>
      ))}
    </Feed>
  )
}
