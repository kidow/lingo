'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Drawer } from 'vaul'

/**
 * 바닥에 상주하는 찾기 시트. 낱말 트랙과 한자 트랙이 같은 것을 쓴다.
 *
 * **오래 오른쪽 아래에 뜬 돋보기(FAB)였다.** 왜 그만뒀는지는 brand-spec.md에
 * 적어 두었다 — 여기서는 지금 무엇인지만 말한다.
 *
 * **닫히지 않는다.** 두 키(`peek`·`full`) 사이를 오갈 뿐이다. 그래서 여는
 * 버튼이 따로 없다 — 손잡이가 언제나 화면에 있어서 그 자리가 곧 트리거다.
 * 닫을 수 있게 하면 다시 열 버튼이 필요해지고, 그러면 FAB가 돌아온다.
 *
 * **접힘은 닫힘이 아니다.** 뒤 카드를 흘긋 보려고 내리는 일이 잦으므로 친
 * 것도 보던 상세도 그대로 둔다. 시트 안쪽이 언마운트되지 않으니 상태가 저절로
 * 남는다 — 예전에는 vaul Portal이 사라지며 저절로 지워졌다.
 */

/**
 * 접힌 키. 손잡이만 남는다.
 *
 * **28px은 홈 인디케이터(34px)보다 낮다.** iOS는 그 띠에서 시작한 세로
 * 드래그를 홈 제스처로 가져가므로 끌어 올리기가 안 먹을 수 있다 — 손잡이 탭은
 * 그대로 된다. 실기기에서 보고 64px(=34+30)으로 올릴지 정한다.
 *
 * 값에 `calc()`를 쓸 수 없다. vaul이 스냅을 `parseInt()`로 읽어서
 * `calc(env(safe-area-inset-bottom) + …)`은 `NaN`이 된다.
 */
const PEEK = '28px'

/**
 * 펼친 키. 위 15%로 헤더가 비쳐 **「이건 덮개고 뒤에 내 피드가 있다」**를
 * 말한다. `1`로 두면 시트가 앱의 새 화면처럼 보인다.
 */
const FULL = 0.85

const SNAP_POINTS = [PEEK, FULL]

/** vaul의 스냅 전환 길이 (`TRANSITIONS.DURATION` = 0.5s) */
const TRANSITION_MS = 500

/**
 * **한 번이라도 펼쳐졌는가.**
 *
 * 접힌 채로도 시트 안쪽은 마운트되어 있다(그래야 올라오는 0.5s 동안 목록이
 * 이미 서 있다). 그런데 마운트를 신호로 삼아 무거운 것을 받는 자리가 있으면
 * 찾기를 한 번도 안 여는 사람까지 같이 문다 — `SearchSheet`의 색인이 그렇다.
 * 그래서 **보이는 것과 받는 것을 가른다.**
 *
 * 한 번 켜지면 도로 꺼지지 않는다. 접었다 폈다고 다시 받을 이유가 없다.
 */
const OpenedContext = createContext(false)

export function usePeekOpened() {
  return useContext(OpenedContext)
}

export function PeekDrawer({
  title,
  description,
  lang,
  children,
}: {
  /** 스크린리더가 읽을 시트 이름. Radix가 `Dialog.Title`을 요구한다 */
  title: string
  description: string
  /** 한자 시트는 내용이 한국어다 */
  lang?: string
  children: ReactNode
}) {
  const [snap, setSnap] = useState<number | string | null>(PEEK)
  const full = snap === FULL

  const [opened, setOpened] = useState(false)
  useEffect(() => {
    if (full) setOpened(true)
  }, [full])

  /**
   * 접혀 있는 동안 시트 안쪽을 **없는 것으로 만든다.**
   *
   * vaul은 스냅을 `transform`으로만 옮긴다 — `inert`도 `visibility`도 건드리지
   * 않아서, 화면 밖으로 밀려난 검색 결과가 DOM에 그대로 살아 있고 포커스도
   * 받는다. VoiceOver로 쓸어 내리면 안 보이는 목록이 읽힌다.
   *
   * **거는 때와 걷는 때가 다르다.** 올라가기 시작하면 즉시 걷고(전환 중에도
   * 읽혀야 한다), 내려올 때는 다 내려온 뒤에 건다.
   */
  const [reachable, setReachable] = useState(false)
  useEffect(() => {
    if (full) {
      setReachable(true)
      return
    }
    const id = window.setTimeout(() => setReachable(false), TRANSITION_MS)
    return () => window.clearTimeout(id)
  }, [full])

  function toggle() {
    setSnap(full ? PEEK : FULL)
  }

  return (
    <Drawer.Root
      open
      // 닫는 길을 다 막는다. 열어 두는 것이 이 시트의 전제다
      dismissible={false}
      /*
       * 뒤 피드가 살아 있어야 한다 — peek일 때 화면의 전부가 카드다.
       * `modal={false}`면 vaul이 스크롤 잠금을 걸지 않고 바깥 탭으로도 닫지
       * 않는다. 대신 `Drawer.Overlay`가 `null`을 반환하므로 딤은 우리가 그린다.
       */
      modal={false}
      // 시트 안이 대부분 스크롤 목록이다. 아무 데나 끌리면 목록을 내리는
      // 손가락과 시트를 내리는 손가락이 같아진다
      handleOnly
      snapPoints={SNAP_POINTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        {/*
          vaul이 안 그려 주는 딤. 펼쳤을 때만 선다.

          **막는 것이 본론이다.** 위 15%에 헤더가 남는데 덱 탭이 눌리면 시트
          뒤에서 피드가 통째로 갈린다(`components/shell.tsx`의 `key`). 탭하면
          접히는 것은 덤이다 — 판이 없을 때 이 자리를 누르면 퀴즈 보기를
          찍는다.
        */}
        {full && (
          <div
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={() => setSnap(PEEK)}
            aria-hidden
          />
        )}

        {/*
          **상자는 화면 높이만큼이고 내용은 그 85%다.**

          vaul은 스냅 오프셋을 `window.innerHeight − 스냅높이`로 잡고 그만큼
          아래로 민다. 그 계산은 상자가 화면 전체 높이일 때만 맞는다 —
          `h-[85dvh]`를 주면 690px짜리를 784px 내리게 되어 통째로 사라진다.

          그래서 상자는 `h-full`로 두고, **보이는 만큼만** 안쪽 `h-[85%]`가
          든다. 그 아래 15%는 늘 화면 밖이라 비워 둔다 — 세게 튕겼을 때
          잠깐 비치므로 바탕색은 상자가 들고 있다.

          `dvh`가 아니라 `%`인 것도 같은 이유다. vaul이 `innerHeight`로 재는데
          자판이 올라오면 iOS에서 `dvh`만 줄어 둘이 어긋난다.
        */}
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto h-full w-full max-w-[480px] rounded-t-card bg-bg"
          lang={lang}
        >
         <div className="flex h-[85%] flex-col">
          {/*
            손잡이가 곧 여는 버튼이다.

            **탭을 vaul에 맡길 수 없다.** `Drawer.Handle`의 기본 탭은 스냅을 한
            방향으로 순환하다가 마지막에서 `closeDrawer()`를 부른다. 닫힘이
            없는 시트라 그 길을 막아야 하는데, `dismissible={false}`로 막으면
            이번엔 `snapPoints[i+1]`이 `undefined`로 빠져 오프셋이 깨진다.
            그래서 `preventCycle`을 켜고 `onClick`을 우리 것으로 덮는다
            (vaul이 `...rest`를 자기 `onClick` 뒤에 펴므로 덮인다).

            **vaul은 이 div에 `aria-hidden`을 박는다.** 손잡이가 장식이던 시절
            얘기다 — 여기서는 유일한 조작 수단이라 도로 열고 버튼으로 세운다.

            **크기는 `!`로 이긴다.** vaul이 `__insertCSS`로 `<style>`을
            `document.head` **끝에** 붙여서, 같은 특이도(0,1,0)인 Tailwind
            유틸리티가 순서로 진다.

            **막대는 32px, 잡는 자리는 64px**이다. 상자 자체를 64×28로 키우고
            색은 안 칠한 채(`bg-transparent`) 막대를 `::before`로 그린다.
            vaul의 히트영역이 `max(100%, 2.75rem)`이라 상자 폭을 따라온다.

            테두리나 패딩으로 좁혀서는 안 된다. 그 `100%`는 **padding box**를
            가리키므로, 투명 테두리 16px을 두면 도리어 히트영역이 44px로
            줄어든다 — 실측으로 확인했다(64를 기대하고 44가 나왔다).
          */}
          <Drawer.Handle
            preventCycle
            onClick={toggle}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return
              event.preventDefault()
              toggle()
            }}
            aria-hidden={false}
            role="button"
            tabIndex={0}
            aria-expanded={full}
            aria-label={title}
            className="h-7! w-16! shrink-0 bg-transparent! opacity-100! before:absolute before:top-1/2 before:left-1/2 before:h-[5px] before:w-8 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-pill before:bg-grip before:content-['']"
          />

          <Drawer.Title className="sr-only">{title}</Drawer.Title>
          <Drawer.Description className="sr-only">{description}</Drawer.Description>

          <div inert={!reachable} className="flex min-h-0 flex-1 flex-col">
            <OpenedContext.Provider value={opened}>{children}</OpenedContext.Provider>
          </div>
         </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
