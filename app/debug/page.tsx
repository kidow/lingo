import { statSync } from 'node:fs'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import { DebugTable, type DebugRow } from '@/components/debug-table'
import { audioPath, entriesFor, imagePath } from '@/lib/content'
import { answerOf, asideOf } from '@/lib/lang'
import { levelOf } from '@/lib/level'
import { TRACK_IDS, trackOf } from '@/lib/track'

/**
 * 콘텐츠 점검용 개발 화면. `pnpm dev` → http://localhost:3000/debug
 *
 * 개념을 하나씩 손으로 늘리는 워크플로(spec.md §7)에서 "무엇이 아직 없는지"를
 * 눈으로 확인하는 자리다. `pnpm check`가 터미널에서 하는 일을 화면에서 하되,
 * **발음을 실제로 들어볼 수 있다**는 점이 다르다.
 *
 * 프로덕션 빌드에서는 notFound()가 먼저 걸려 아래 fs 접근까지 가지 않는다.
 * out/debug.html 파일 자체는 생기지만 내용은 404 페이지다 — 목록이 새지 않는다.
 *
 * 파일 유무는 서버에서 fs로 직접 본다. 존재뿐 아니라 크기까지 알 수 있어
 * 0바이트로 남은 실패작을 잡아낸다. 여기서 훑은 결과를 표에 넘기고, 거르고
 * 세는 일은 표가 한다 — 표는 파일 시스템을 모른다.
 */
export default function DebugPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  // 한 줄 = 개념 하나 × 트랙 하나. 한 개념이 여러 트랙에 나온다 — 그게 요점이다.
  // 트랙이 실제로 출제하는 것만 나열한다 — TOEIC은 TSL로 한 번 더 걸린다
  const rows: DebugRow[] = TRACK_IDS.flatMap((track) =>
    entriesFor(track).flatMap(({ concept, word }) => {
      const { language } = trackOf(track)

      const audio = fileInfo(join('public', audioPath(concept.slug, language)))
      return [
        {
          slug: concept.slug,
          track,
          level: levelOf(word),
          answer: answerOf(word, language),
          aside: asideOf(word, language),
          meaning: concept.meaning_ko,
          partOfSpeech: word.part_of_speech,
          example: word.example?.text,
          imagePath: imagePath(concept.slug),
          hasImage: fileInfo(join('public', imagePath(concept.slug))) !== null,
          audioSize: audio?.size ?? null,
          audioPath: audioPath(concept.slug, language),
        },
      ]
    }),
  )

  return (
    <main className="flex h-dvh flex-col overflow-hidden p-6">
      <header className="mb-4 shrink-0">
        <h1 className="text-lg font-semibold">콘텐츠 점검</h1>
        <p className="mt-1 text-sm text-sub">
          개발 서버에서만 열린다. 결손은 실패가 아니라 &ldquo;아직 만들지 않았다&rdquo;는 뜻이다.
        </p>
      </header>

      <DebugTable rows={rows} tracks={TRACK_IDS} />
    </main>
  )
}

/** 파일이 없으면 null. 있으면 크기를 들고 온다 — 0바이트가 곧 실패작이다 */
function fileInfo(path: string): { size: number } | null {
  try {
    const stat = statSync(path)
    return stat.size > 0 ? { size: stat.size } : null
  } catch {
    return null
  }
}
