import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { DesktopNotice } from '@/components/desktop-notice'
import { Shell } from '@/components/shell'
import { CONCEPTS, entriesFor, imagePath } from '@/lib/content'
import type { Entry } from '@/lib/entries'
import { TRACK_IDS, type TrackId } from '@/lib/track'

/**
 * 서버가 하는 일은 출제 가능한 목록을 트랙별로 추리는 것까지다.
 *
 * 무엇을 언제 낼지는 진도에, 어느 트랙을 볼지는 설정에 달렸다. 둘 다
 * localStorage에 있어 서버는 모른다. (spec.md §3, §8)
 *
 * **그림이 있는 개념만 내보낸다.** 단어 목록은 로드맵이라 그림보다 앞서
 * 쌓이는데(§7), 그림 없는 카드가 피드에 섞이면 학습이 아니라 빈칸 넘기기가
 * 된다. 파일 유무는 빌드 시점에 fs로 본다 — 정적 export라 이 판정이 결과물에
 * 그대로 구워진다.
 */
export default function Page() {
  const drawn = new Set(
    CONCEPTS.filter((concept) => existsSync(join('public', imagePath(concept.slug)))).map(
      (concept) => concept.slug,
    ),
  )

  const entries = Object.fromEntries(
    TRACK_IDS.map((track) => [
      track,
      entriesFor(track).filter((entry) => drawn.has(entry.concept.slug)),
    ]),
  ) as Record<TrackId, Entry[]>

  return (
    <>
      <Shell entries={entries} />
      <DesktopNotice />
    </>
  )
}
