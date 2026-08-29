import { statSync } from 'node:fs'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import { DebugPlay } from '@/components/debug-play'
import { CONCEPTS, audioPath, imagePath } from '@/lib/content'
import { answerOf, asideOf, LANG } from '@/lib/lang'
import type { Language } from '@/lib/types'

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
 * 0바이트로 남은 실패작을 잡아낸다.
 */
export default function DebugPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  const langs = Object.keys(LANG) as Language[]
  const rows = CONCEPTS.map((concept) => ({
    concept,
    image: fileInfo(join('public', imagePath(concept.slug))),
    audio: langs.map((lang) => ({
      lang,
      info: fileInfo(join('public', audioPath(concept.slug, lang))),
      src: audioPath(concept.slug, lang),
    })),
  }))

  const missingImage = rows.filter((r) => !r.image).length
  const missingAudio = rows.filter((r) => r.audio.some((a) => !a.info)).length
  const missingExample = rows.filter((r) =>
    langs.some((lang) => r.concept.words[lang] && !r.concept.words[lang]?.example),
  ).length

  return (
    <main className="h-dvh overflow-y-auto p-6">
      <header className="mb-4">
        <h1 className="text-lg font-semibold">콘텐츠 점검</h1>
        <p className="mt-1 text-sm text-sub">
          개발 서버에서만 열린다. 결손은 실패가 아니라 &ldquo;아직 만들지 않았다&rdquo;는 뜻이다.
        </p>
      </header>

      <dl className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-ctrl border border-line bg-surface px-3 py-2.5 text-[13px] text-sub">
        <Stat label="개념" value={`${rows.length}`} />
        <Stat label="이미지" value={`${rows.length - missingImage}/${rows.length}`} bad={missingImage > 0} />
        <Stat label="발음" value={`${rows.length - missingAudio}/${rows.length}`} bad={missingAudio > 0} />
        <Stat label="예문" value={`${rows.length - missingExample}/${rows.length}`} bad={missingExample > 0} />
      </dl>

      <table className="w-full overflow-hidden rounded-ctrl border border-line bg-surface text-left text-[13px]">
        <thead>
          <tr className="text-[11px] tracking-wide text-sub uppercase">
            <Th />
            <Th>slug</Th>
            <Th>읽기 · 참고</Th>
            <Th>뜻</Th>
            <Th>품사</Th>
            <Th>예문</Th>
            <Th>발음</Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {rows.map(({ concept, image, audio }) => {
            const lang = langs[0]
            const word = concept.words[lang]
            const answer = word && answerOf(word, lang)
            const aside = word ? asideOf(word, lang) : []
            const say = audio[0]

            return (
              <tr key={concept.slug} className="border-t border-line align-middle">
                <Td>
                  <span className="grid size-9 place-items-center overflow-hidden rounded-md bg-img-bg">
                    {image ? (
                      // 최적화가 꺼져 있어(next.config.ts) img로도 같은 파일이 그대로 나간다
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePath(concept.slug)} alt="" className="size-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-err">없음</span>
                    )}
                  </span>
                </Td>
                <Td>
                  <span className="font-mono text-xs text-sub">{concept.slug}</span>
                </Td>
                <Td>
                  {answer ? (
                    <>
                      <span className="font-jp font-semibold">{answer}</span>{' '}
                      {aside.length > 0 && (
                        <span className="font-jp text-xs text-sub">
                          {aside.map((v, i) => (i === 0 ? `[${v}]` : v)).join(' · ')}
                        </span>
                      )}
                    </>
                  ) : (
                    <Missing>출제 불가</Missing>
                  )}
                </Td>
                <Td>{concept.meaning_ko}</Td>
                <Td>
                  {word?.part_of_speech ?? <span className="text-sub">—</span>}
                </Td>
                <Td>
                  {word?.example ? (
                    <span className="font-jp text-xs">{word.example.text}</span>
                  ) : (
                    <Missing>없음</Missing>
                  )}
                </Td>
                <Td>
                  {say.info ? (
                    <span className="rounded-pill border border-ok/30 bg-ok-soft px-2 py-0.5 text-[11px] font-semibold text-ok">
                      {kb(say.info.size)}
                    </span>
                  ) : (
                    <Missing>없음</Missing>
                  )}
                </Td>
                <Td>{say.info ? <DebugPlay src={say.src} /> : <span className="block size-7" />}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>
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

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)}KB`

function Stat({ label, value, bad = false }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <dt>{label}</dt>
      <dd className={`font-semibold ${bad ? 'text-err' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}

const Th = ({ children }: { children?: React.ReactNode }) => (
  <th className="px-2.5 py-2 font-semibold">{children}</th>
)
const Td = ({ children }: { children?: React.ReactNode }) => <td className="px-2.5 py-2">{children}</td>
const Missing = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-pill border border-err/25 bg-err-soft px-2 py-0.5 text-[11px] font-semibold text-err">
    {children}
  </span>
)
