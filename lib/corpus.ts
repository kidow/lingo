import type { TriviaEntry } from './trivia.ts'
import type { Article, Concept, Language } from './types.ts'

/**
 * 화면이 읽는 콘텐츠. (spec.md §4, §8)
 *
 * **번들에 굽지 않는다.** 개념 하나에 일곱 언어가 붙어 있어서(§1) 통째로 실으면
 * JLPT를 보는 사람에게 러시아어 예문까지 같이 간다 — 청크 하나가 11.5MB였고
 * 그중 70%가 지금 보는 언어와 무관한 예문이었다.
 *
 * 그래서 `scripts/pack.ts`가 **읽는 단위로 잘라 `public/content/`에 구워 두고**,
 * 여기서 필요한 것만 받아 온다. `lib/peaks.ts`가 파형에 대해 이미 같은 판단을
 * 했다 — 언어 하나가 230KB라 일곱을 실을 이유가 없다.
 *
 * 서버는 여전히 정적 import를 쓴다(lib/content.ts). 빌드 시점에만 도는 코드라
 * 번들에 실리지 않고, fs로 그림 유무를 보는 일에는 전량이 필요하다.
 */
export type Corpus = {
  concepts: Concept[]
  trivia: TriviaEntry[]
  articles: Article[]
}

const EMPTY: Corpus = { concepts: [], trivia: [], articles: [] }

/**
 * 한 번 받은 것은 다시 받지 않는다. **실패한 약속도 그대로 담아 둔다** —
 * 파일이 없는데 트랙을 오갈 때마다 다시 찾아가면 요청만 쌓인다 (lib/peaks.ts).
 */
const loaded = new Map<string, Promise<Corpus>>()

function get(name: string): Promise<Corpus> {
  const cached = loaded.get(name)
  if (cached) return cached

  const pending = fetch(`/content/${name}.json`)
    .then((res) => (res.ok ? (res.json() as Promise<Corpus>) : EMPTY))
    // 못 받으면 빈 피드가 된다. 그 자리에는 이미 "그림이 준비된 단어가 아직
    // 없어요"가 서 있어서(components/feed.tsx) 화면이 깨지지는 않는다
    .catch(() => EMPTY)

  loaded.set(name, pending)
  return pending
}

/** 그 언어의 개념·상식·참고 글. 피드와 헤더가 쓴다 */
export function loadCorpus(lang: Language): Promise<Corpus> {
  return get(lang)
}

/**
 * 찾기 시트가 여는 한 벌. **일곱 언어가 다 있고 예문이 없다.**
 *
 * 검색은 트랙을 안 가리므로 전량이 필요하지만(lib/search.ts) 예문은 한 줄도
 * 안 본다. 시트를 열기 전에는 받지 않는다 — 안 여는 사람에게는 0바이트다.
 */
export function loadSearchCorpus(): Promise<Corpus> {
  return get('search')
}
