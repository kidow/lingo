import { CardBody, Cue, Feed, FeedCard, ImageTile } from '@/components/feed'
import { entriesFor } from '@/lib/content'
import { asideOf, DEFAULT_LANGUAGE } from '@/lib/lang'

/**
 * 2단계 — 타입과 로더.
 *
 * 카드 3종은 3단계에서 붙인다. 지금 확인할 것은 데이터가 흐르는지다.
 *   1. content/*.json이 빌드 시점에 로드되는가
 *   2. LANG 전략대로 읽기가 정답 자리에 오는가
 *   3. 참고줄에서 정답과 겹치는 값이 빠지는가 (`バナナ`)
 */
export default function Page() {
  const lang = DEFAULT_LANGUAGE
  const entries = entriesFor(lang)

  return (
    <Feed>
      {entries.map(({ concept, word, answer }) => (
        <FeedCard key={concept.slug}>
          <ImageTile>
            <div className="grid h-full place-items-center text-sm text-sub">{concept.slug}</div>
          </ImageTile>

          <CardBody>
            <p className="text-center font-jp text-4xl font-bold">{answer}</p>
            <p className="text-center text-lg font-semibold">{concept.meaning_ko}</p>
            <p className="text-center font-jp text-sm text-sub">
              {asideOf(word, lang).join(' · ')}
            </p>
          </CardBody>

          <Cue>위로 밀어 다음</Cue>
        </FeedCard>
      ))}
    </Feed>
  )
}
