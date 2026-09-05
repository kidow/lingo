import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { DesktopNotice } from '@/components/desktop-notice'
import { Shell } from '@/components/shell'
import { CONCEPTS, imagePath } from '@/lib/content'

/**
 * 서버가 하는 일은 **그림이 아직 없는 개념을 세는 것 하나**다.
 *
 * 단어 목록은 로드맵이라 그림보다 앞서 쌓이는데(§7), 그림 없는 카드가 피드에
 * 섞이면 학습이 아니라 빈칸 넘기기가 된다. 파일 유무는 빌드 시점에 fs로 본다 —
 * 정적 export라 이 판정이 결과물에 그대로 구워진다.
 *
 * **출제 목록 자체는 넘기지 않는다.** 예전에는 트랙 일곱 벌을 여기서 추려
 * 클라이언트로 넘겼는데, 셸이 `'use client'`라 그 배열이 RSC 페이로드로
 * HTML에 직렬화됐다. 콘텐츠 18MB는 셸이 검색을 위해 이미 정적 import로 들고
 * 있으므로(components/shell.tsx) **같은 것이 두 번 실렸다** — index.html이
 * 17.9MB였다. 목록은 셸이 자기 손에 있는 것으로 만들면 되고, 서버만 아는
 * 사실은 파일이 있느냐 없느냐뿐이다.
 *
 * 있는 쪽이 아니라 **없는 쪽**을 적는다. 4,449자리 가운데 열일곱만 비어 있어
 * 214바이트로 끝난다 — 있는 것을 다 적으면 51KB다. lib/audio-have.ts가 같은
 * 이유로 같은 방향을 쓴다.
 */
export default function Page() {
  const undrawn = CONCEPTS.filter(
    (concept) => !existsSync(join('public', imagePath(concept.slug))),
  ).map((concept) => concept.slug)

  return (
    <>
      <Shell undrawn={undrawn} />
      <DesktopNotice />
    </>
  )
}
