/**
 * 세로 무한 피드의 껍데기. (spec.md §3)
 *
 * 지금은 CSS scroll-snap이다. 4단계에서 embla(axis:'y')로 교체하면서
 * 미응답 퀴즈 잠금을 붙인다. 잠금은 CSS가 아니라 다음 카드를 마운트하지
 * 않는 방식으로 건다.
 */
export function Feed({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="
        h-dvh overflow-y-scroll overscroll-contain
        snap-y snap-mandatory
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      "
    >
      {children}
    </main>
  )
}

/**
 * 카드 한 장 = 화면 하나. 골격은 세 종류가 모두 같다.
 *   이미지 → 본문 → 하단 안내
 */
export function FeedCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-dvh snap-start snap-always mx-auto flex w-full max-w-[480px] flex-col gap-lg px-5 pt-xl pb-lg">
      {children}
    </section>
  )
}

/** 정사각 이미지 타일. 화면이 낮아도 카드를 밀어내지 않도록 높이를 가둔다. */
export function ImageTile({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-square w-[min(100%,48dvh)] shrink overflow-hidden rounded-card bg-img-bg">
      {children}
    </div>
  )
}

/** 카드별 본문이 들어가는 자리. 남는 높이를 다 먹고 가운데 정렬한다. */
export function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center gap-md">{children}</div>
  )
}

/**
 * 하단 한 줄. 장식이 아니라 "다음 장이 있다"는 신호다.
 * 잠금 중에는 무엇을 해야 하는지 말한다. (brand-spec.md — Cue 문구)
 */
export function Cue({ children, locked = false }: { children: React.ReactNode; locked?: boolean }) {
  return (
    <p
      className={`grid h-[22px] shrink-0 place-items-center text-xs tracking-wide ${
        locked ? 'font-semibold text-accent' : 'text-sub'
      }`}
    >
      {children}
    </p>
  )
}
