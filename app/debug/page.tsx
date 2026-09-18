import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import { DebugHanja, type HanjaGradeRow, type HanjaRadicalSummary } from '@/components/debug-hanja'
import { DebugCoverage, type CoverageData } from '@/components/debug-coverage'
import { DebugTable, type DebugRow } from '@/components/debug-table'
import { DebugTabs } from '@/components/debug-tabs'
import { DebugSuspects } from '@/components/debug-suspects'
import { DebugTrivia, type TriviaNote } from '@/components/debug-trivia'
import { audioFile, audioPath, entriesFor, imagePath, triviaFor } from '@/lib/content'
import { examplesOf } from '@/lib/entries'
import { gradeLabel, HANJA_GRADES } from '@/lib/hanja'
import { HANJA_CHARACTERS, HANJA_RADICALS } from '@/lib/hanja-corpus'
import { hanjaStrokeData } from '@/lib/hanja-strokes'
import { answerOf, asideOf } from '@/lib/lang'
import { levelOf } from '@/lib/level'
import { LANGUAGES, LANGUAGE_TRACK_IDS as TRACK_IDS, trackOf } from '@/lib/track'
import { auditTrivia, type Suspect } from '@/lib/trivia-audit'
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
        coverage={<DebugCoverage data={coverage()} />}
        trivia={<DebugTrivia notes={triviaNotes()} />}
        suspects={<DebugSuspects suspects={triviaSuspects()} />}
        hanja={<DebugHanja grades={hanjaGrades()} radicals={hanjaRadicals()} />}
      />
    </main>
  )
}

/**
 * 시험 목록 대비 우리 위치. (scripts/coverage.ts)
 *
 * **셈을 옮겨 적지 않는다.** 그 스크립트가 유일한 셈터이고 여기서는 `--json`을
 * 받아 그리기만 한다 — 두 곳에서 세면 반드시 어긋난다. 한 번 도는 데 0.9초고,
 * 이 화면은 어차피 6만 줄을 fs로 훑고 있다.
 *
 * TSL 목록을 원격에서 받으므로 **네트워크가 없으면 못 센다.** 그때는 그 탭만
 * 비고 나머지 표는 그대로 열린다 — 개발 서버 전용 화면이 커버리지 하나 때문에
 * 통째로 죽으면 안 된다.
 */
function coverage(): CoverageData | null {
  try {
    const out = execFileSync('node', ['scripts/coverage.ts', '--json'], {
      encoding: 'utf8',
      // 사람이 읽는 줄은 `--json`이 이미 막지만, 스크립트가 경고를 흘리면
      // 마지막 줄만 JSON이다
      maxBuffer: 16 * 1024 * 1024,
    })
    const last = out.trim().split('\n').pop() ?? ''
    return JSON.parse(last) as CoverageData
  } catch {
    return null
  }
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
 * 상식 문항이 나올 수 없는 노트. **0이라고 다 안 캔 것이 아니다.**
 *
 * `_회화`와 `_기초_어휘`는 낱말·표현 목록이라 "사실 하나 + 그럴듯한 오답 셋"
 * 꼴로 떨어지지 않는다 (lib/types.ts의 Trivia). 오답이 그냥 다른 낱말이 되어
 * 문항이 아니라 단어 문제가 된다 — 그쪽은 개념 카드(content/*.json)의 몫이다.
 *
 * 갈래를 이름으로 가르는 규칙이라 넓게 잡으면 멀쩡한 노트를 지운다. `_어휘`
 * 전부를 빼려다 말았다 — 영어_뉴스·시사_어휘(9문항)나 일본어_계절_날씨_어휘
 * (4문항)처럼 이미 캔 노트가 걸린다. 지금 이 둘만 반례가 없다.
 *
 * 한 문항이라도 나오면 이 표시는 저절로 사라진다 (`count > 0`). 규칙이 틀린
 * 날을 코드가 아니라 콘텐츠가 알려 준다.
 */
const NOT_TRIVIA = /_(회화|기초_어휘)$/

/**
 * 노트 하나 = 한 줄. 문항의 `source`를 세고, 옆 레포를 찾을 수 있으면
 * 아직 한 문항도 안 나온 노트를 0으로 채워 넣는다.
 */
function triviaNotes(): TriviaNote[] {
  const notes: TriviaNote[] = []

  // 트랙이 아니라 언어로 돈다 — zh는 트랙이 둘(HSK·TOCFL)이라 같은 노트가 두 줄이 된다
  for (const language of LANGUAGES) {
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

    for (const [note, count] of counts)
      notes.push({ lang: language, note, count, skip: count === 0 && NOT_TRIVIA.test(note) })
  }

  return notes
}

/**
 * 오답 품질이 의심되는 문항. 판정은 전부 lib/trivia-audit.ts가 한다.
 *
 * `pnpm check`도 같은 함수를 부르지만 거기서는 건수만 세고 넘어간다 — 어느
 * 문항이 왜 걸렸는지는 표로 봐야 읽힌다.
 */
function triviaSuspects(): Suspect[] {
  // 트랙이 아니라 언어로 돈다 (triviaNotes와 같은 이유)
  return LANGUAGES.flatMap((language) =>
    auditTrivia(
      language,
      triviaFor(language).map((entry) => entry.trivia),
    ),
  )
}

/**
 * 급수 하나 = 한 줄. 예시 한자어와 필순 데이터가 어디까지 찼는지 센다.
 *
 * 외국어 표와 달리 파일 시스템을 보지 않는다 — 한자는 그림도 발음도 없고
 * (docs/hanja-track-design.md §1) 검사할 것이 콘텐츠 안에 다 있다. 필순만
 * 별도 모듈이 글자별로 승인 여부를 안다 (lib/hanja-strokes.ts).
 */
function hanjaGrades(): HanjaGradeRow[] {
  return HANJA_GRADES.map((grade) => {
    const characters = HANJA_CHARACTERS.filter((character) => character.readingGrade === grade)
    const missing = characters.filter((character) => !character.example)
    return {
      id: grade,
      label: gradeLabel(grade),
      characters: characters.length,
      examples: characters.length - missing.length,
      strokes: characters.filter((character) => hanjaStrokeData(character) !== null).length,
      missing: missing.map((character) => character.glyph).join(''),
    }
  })
}

/** 부수는 급수와 무관하게 한 벌이라 표가 아니라 요약 줄로 낸다 */
function hanjaRadicals(): HanjaRadicalSummary {
  const withShuowen = HANJA_RADICALS.filter((radical) => radical.shuowen)
  return {
    total: HANJA_RADICALS.length,
    shuowen: withShuowen.length,
    translated: withShuowen.filter((radical) => radical.translation).length,
    named: HANJA_RADICALS.filter((radical) => radical.name).length,
    without: HANJA_RADICALS.filter((radical) => !radical.shuowen).map((radical) => radical.glyph).join('·'),
  }
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
