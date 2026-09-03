import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import { DebugTable, type DebugRow } from '@/components/debug-table'
import { DebugTabs } from '@/components/debug-tabs'
import { DebugTrivia, type TriviaNote } from '@/components/debug-trivia'
import { audioFile, audioPath, entriesFor, imagePath, triviaFor } from '@/lib/content'
import { examplesOf } from '@/lib/entries'
import { answerOf, asideOf } from '@/lib/lang'
import { levelOf } from '@/lib/level'
import { TRACKS, TRACK_IDS, trackOf } from '@/lib/track'
import type { Language } from '@/lib/types'

/**
 * 콘텐츠 점검용 개발 화면. `pnpm dev` → http://localhost:5757/debug
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

      // 파일 유무는 저장소 안을 본다. 주소는 CDN을 가리킬 수 있어 fs로 못 연다
      const audio = fileInfo(audioFile(concept.slug, language))
      return [
        {
          slug: concept.slug,
          category: concept.category,
          track,
          level: levelOf(word),
          answer: answerOf(word, language),
          // 디버그 표는 대괄호를 씌우지 않는다. 문자열만 넘긴다 (lib/lang.ts)
          aside: asideOf(word, language).map((item) => item.value),
          meaning: concept.meaning_ko,
          partOfSpeech: word.part_of_speech,
          // 예문은 `example`과 `examples` 두 모양이 있다. 손으로 첫 줄을 꺼내면
          // 한쪽만 보게 되므로 카드가 쓰는 것과 같은 함수를 통해 읽는다
          example: examplesOf(word)[0]?.text,
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

      <DebugTabs
        words={<DebugTable rows={rows} tracks={TRACK_IDS} />}
        trivia={<DebugTrivia notes={triviaNotes()} />}
      />
    </main>
  )
}

/**
 * brain 노트가 있는 자리. 없으면 캔 노트만 세고 조용히 넘어간다.
 *
 * 상식 문항은 이 레포 안에 있지만 원본 노트는 옆 레포에 있다 — 그래서 이
 * 화면은 **옆 레포를 못 찾아도 돌아가야 한다.** 못 찾으면 "안 캔 노트" 줄이
 * 안 나올 뿐이고, 캔 노트의 문항 수는 문항 자체(`source`)에서 나오므로
 * 그대로 보인다. 개발 서버 전용 화면이라 fs로 직접 본다.
 */
const BRAIN_NOTES = process.env.BRAIN_NOTES ?? '../brain/notes'

/** 언어 → brain 노트 폴더 이름. 폴더가 한국어라 코드로 이어지지 않는다 */
const NOTE_DIR: Record<Language, string> = {
  en: '영어',
  ja: '일본어',
  zh: '중국어',
  es: '스페인어',
  fr: '프랑스어',
  de: '독일어',
  ru: '러시아어',
}

/**
 * 노트 하나 = 한 줄. 문항의 `source`를 세고, 옆 레포를 찾을 수 있으면
 * 아직 한 문항도 안 나온 노트를 0으로 채워 넣는다.
 */
function triviaNotes(): TriviaNote[] {
  const notes: TriviaNote[] = []

  for (const { language } of TRACKS) {
    const counts = new Map<string, number>()

    // 옆 레포를 찾으면 그 폴더의 노트를 전부 0으로 깔아 둔다. 캔 것만 세면
    // "안 캔 노트"가 목록에 아예 안 나와 다음에 뭘 캘지 알 수 없다
    const dir = join(BRAIN_NOTES, NOTE_DIR[language])
    if (existsSync(dir)) {
      for (const file of readdirSync(dir)) {
        if (file.endsWith('.md')) counts.set(file.replace(/\.md$/, ''), 0)
      }
    }

    for (const { trivia } of triviaFor(language)) {
      // `source`는 선택 항목이다 (lib/types.ts). 없는 문항은 한 줄로 몰아 센다
      const key = trivia.source ?? '(출처 없음)'
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }

    for (const [note, count] of counts) notes.push({ lang: language, note, count })
  }

  return notes
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
