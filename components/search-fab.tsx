import type { ReactNode } from 'react'

/**
 * 찾기 버튼이 앉는 자리. 카드 레일 오른쪽 아래에 떠 있다. (brand-spec.md)
 *
 * 오래 헤더 오른쪽 끝에 있었다. 덱 탭이 셋일 때까지는 들어갔는데 넷이 되면서
 * 넘쳤다 — 실측으로 탭 버튼 하나가 46px(`min-w-11`이 아니라 `px-2.5` + 글자가
 * 정한다)이라 다섯이면 구분선까지 242px이고, 트랙 이름과 패딩을 더하면 397px이
 * 된다. 390px 화면에서도 9px 모자란다. 320px에서는 애초에 불가능하다 — 남는
 * 폭이 194px인데 44px짜리 다섯은 220px이다.
 *
 * **탭을 줄이는 대신 찾기를 뺐다.** 탭은 지금 무엇을 보고 있는지를 말하므로
 * 늘 보여야 하지만, 찾기는 **찾을 때만** 필요하다. 빼고 나니 헤더가 348px이라
 * 320px에서도 탭 넷이 선다.
 *
 * **트랙을 가리지 않는다.** JLPT만 FAB로 내리면 같은 기능이 트랙마다 다른
 * 자리에 있게 되는데, 그건 `header.tsx`가 「찾기는 언제나 선다」고 적어 둔 것이
 * 막으려던 상태 그대로다 — 트랙을 바꾸는 건 드롭다운 한 번이라 사용자는 한
 * 세션에서 두 자리를 다 만난다.
 *
 * 레일과 같은 480px 상자 안에서 오른쪽에 붙는다. 화면 오른쪽 끝에 붙이면 넓은
 * 화면에서 카드와 멀어져 혼자 떠 버린다.
 *
 * **바깥 층은 클릭을 받지 않는다**(`pointer-events-none`). 카드 위에 깔린
 * 투명한 판이 스와이프를 먹으면 피드가 통째로 멈춘다.
 *
 * 하단 여백 한복판은 비워 둔다 — 「다음 장이 있다」는 신호이자 스와이프가
 * 지나는 자리다(brand-spec.md). FAB는 모서리에 붙어 그 축을 비켜 간다.
 */
export function SearchFab({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px]">
      <div className="pointer-events-auto absolute right-4 bottom-[calc(var(--spacing-lg)+env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  )
}

/**
 * FAB 버튼 자체의 모양. 여는 쪽(`SearchDrawer`·`HanjaSearch`)이 자기 트리거에
 * 그대로 붙인다 — 트리거는 각 Drawer가 들고 있어서 여기서 감쌀 수가 없다.
 *
 * `SayButton`과 같은 옷이다(`--surface` 바탕에 `--line` 테두리). 짙은 원으로
 * 두면 화면에서 가장 튀는 것이 찾기가 되는데, 이 제품에서 튀어야 할 것은
 * 정답과 선택뿐이다 (brand-spec.md). 대신 그림자를 얹어 시트 위에 떠 있다는
 * 것만 말한다.
 *
 * 52px이다. 44px 규격보다 큰 것은 카드 위에 떠 있어 기댈 모서리가 없기
 * 때문이다.
 */
export const FAB_CLASS =
  'grid size-13 place-items-center rounded-full border border-line bg-surface text-ink shadow-[0_4px_14px_rgba(28,25,23,.14)] transition active:scale-[.96]'
