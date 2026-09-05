import type { TriviaEntry } from './trivia.ts'
import type { Article, Concept, Language } from './types.ts'

/**
 * 화면이 읽는 콘텐츠. (spec.md §4, §8)
 *
 * **번들에 굽지 않는다.** 개념 하나에 일곱 언어가 붙어 있어서(§1) 통째로 실으면
 * JLPT를 보는 사람에게 러시아어 예문까지 같이 간다 — 청크 하나가 11.5MB였고
 * 그중 70%가 지금 보는 언어와 무관한 예문이었다.
 *
 * 그래서 `scripts/split.ts`가 **읽는 단위로 잘라 `public/content/`에 구워 두고**,
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

/**
 * 한 번 받은 것은 다시 받지 않는다. **못 받은 것은 붙들지 않는다** — 다시
 * 시도하면 다시 받아야 하기 때문이다.
 *
 * `lib/peaks.ts`는 실패한 약속까지 담아 둔다. 파형은 없어도 카드가 성립해서
 * 다시 찾아갈 이유가 없기 때문인데, 콘텐츠는 없으면 **화면이 서지 않는다.**
 * 무게가 다르므로 규칙도 갈린다.
 */
const loaded = new Map<string, Promise<Corpus | null>>()

/** `null`이면 못 받은 것이다. 빈 것과 다르다 — 부르는 쪽이 그 둘을 가른다 */
function get(name: string): Promise<Corpus | null> {
  const cached = loaded.get(name)
  if (cached) return cached

  const pending = fetch(`/content/${name}.json`)
    .then((res) => (res.ok ? (res.json() as Promise<Corpus>) : null))
    .catch(() => null)
    .then((corpus) => {
      if (!corpus) loaded.delete(name)
      return corpus
    })

  loaded.set(name, pending)
  return pending
}

/**
 * 그 언어의 개념·상식·참고 글. 피드와 헤더가 쓴다.
 *
 * **못 받은 것과 빈 것을 가른다.** 예전에는 실패를 빈 코퍼스로 바꿔 돌려줬는데,
 * 그러면 화면이 "그림이 준비된 단어가 아직 없어요"라고 말한다 — 콘텐츠가
 * 아직 없다는 뜻이라 기다리라는 말이 되고, 정작 필요한 것은 다시 시도하는
 * 일이다 (components/shell.tsx).
 */
export function loadCorpus(lang: Language): Promise<Corpus | null> {
  return get(lang)
}

/**
 * 찾기 시트가 여는 한 벌. **일곱 언어가 다 있고 예문이 없다.**
 *
 * 검색은 트랙을 안 가리므로 전량이 필요하지만(lib/search.ts) 예문은 한 줄도
 * 안 본다. 시트를 열기 전에는 받지 않는다 — 안 여는 사람에게는 0바이트다.
 */
export function loadSearchCorpus(): Promise<Corpus | null> {
  return get('search')
}
