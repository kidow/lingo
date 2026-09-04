/**
 * 내려받은 목록을 `.cache/`에 두고 다시 쓴다. (spec.md §7)
 *
 * `pnpm levels`는 다섯 출처를 본다. 넷은 통짜 목록이라 한 번에 받으면 되는데,
 * JLPT만 낱말당 요청이 하나다 — 3,400개 개념을 돌면 요청도 3,400번이고,
 * jisho가 몇십 초 502를 뱉는 날에는 그중 하나만 걸려도 20분짜리 실행이 통째로
 * 죽는다. 실제로 그렇게 두 번 죽었다.
 *
 * 시험 어휘 목록은 연 단위로나 바뀐다. 매 실행마다 다시 받을 이유가 없다.
 *
 *   .cache/jlpt.json        낱말 → 등급. 등급 없음(null)도 적는다
 *   .cache/hsk.json         complete-hsk-vocabulary 원본
 *   .cache/tsl.csv          TOEIC Service List 원본
 *   .cache/flelex-fr.tsv    FLELex/Beacco 원본
 *   .cache/goethe-{A1,A2,B1}.pdf
 *   .cache/torfl.json       ros-edu.ru에서 긁어 모은 줄
 *
 * `.cache/`는 커밋하지 않는다(.gitignore). 결과는 content/에 들어간다.
 *
 * 목록이 갱신됐을 때는 `--refresh`를 준다 — 캐시를 무시하고 다시 받는다.
 * 등급을 지우는 쪽으로 바뀔 수도 있으니 사람이 직접 부를 때만 쓴다.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CACHE_DIR = join(import.meta.dirname, '..', '.cache')

/** `--refresh`면 있는 캐시를 안 쓰고 새로 받는다. 쓰기는 그대로 한다 */
export const refreshing = process.argv.includes('--refresh')

const pathOf = (name: string) => join(CACHE_DIR, name)

/**
 * 통짜 파일 하나. 없으면 받아서 저장하고, 있으면 그대로 읽는다.
 *
 * 바이트로 다룬다 — TSL CSV는 windows-1252고 Goethe는 PDF다. 문자열로 미리
 * 바꾸면 둘 다 깨진다.
 */
export async function cachedBytes(name: string, fetcher: () => Promise<Buffer>): Promise<Buffer> {
  const file = pathOf(name)
  if (!refreshing && existsSync(file)) return readFileSync(file)
  mkdirSync(CACHE_DIR, { recursive: true })
  const bytes = await fetcher()
  writeFileSync(file, bytes)
  return bytes
}

/** JSON 캐시를 읽는다. 없거나 깨졌으면 null — 깨진 캐시로 실행을 죽이지 않는다 */
export function readJson<T>(name: string): T | null {
  const file = pathOf(name)
  if (refreshing || !existsSync(file)) return null
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as T
  } catch {
    return null
  }
}

export function writeJson(name: string, value: unknown): void {
  mkdirSync(CACHE_DIR, { recursive: true })
  writeFileSync(pathOf(name), JSON.stringify(value))
}
