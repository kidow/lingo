# category가 품사와 어긋난 개념 — 임자가 고칠 곳

확인일: 2026-09-28. 손대지 않은 이유는 하나다 — **내가 만든 개념이 아니라서**다
([concurrent-sessions.md](concurrent-sessions.md)).

**고치고 나면 그 줄을 지운다.** `pnpm check`가 이 문서에 없는 어긋남만 이름을
불러 경고한다(lib/category-pos.ts).

## 왜 문제인가

오답 보기는 **같은 category에서** 뽑는다 (`lib/entries.ts`의 `pool`). 동사구가
`adjective`로 적혀 있으면 그 카드의 보기는 형용사로 채워지고, 진짜 형용사
카드에는 동사구·명사구가 보기로 섞인다. **품사 모양만 보고도 오답이 걸러진다.**
퀴즈가 깨지지는 않으므로 `pnpm check`는 통과한다 — 그래서 여태 안 보였다.

잣대는 일곱 언어의 `part_of_speech`다. **다섯 언어 이상이 같은 품사**인데
`category`가 다르면 적었다. 뜻줄(`meaning_ko`)도 대개 그 품사로 끝난다
(「겁먹다」·「타격」). 고칠 때는 `category`만 바꾸면 된다 — 그림도 예문도
그대로다.

## 따로 적는 둘 — 독일어 표제어

| 낱말 | 무엇이 틀렸나 |
| --- | --- |
| `city/take-place-as-planned` de | `zustande gehen`은 없는 말이다. `zustande kommen`(성사되다)이나 곁말의 `stattfinden`(열리다)을 표제로 올린다. 예문 둘도 같이 고친다 |
| `city/playground` de | 표제 `Schulhof`는 **학교 운동장**이다. 그림(그네가 선 마당)과 뜻줄 「놀이터」에는 곁말의 `Spielplatz`가 맞는다. 예문의 한국어도 「운동장」이라 뜻이 둘로 갈려 있다 |

## category 314개 — 2026-09-28에 고쳤다

처음 적을 때는 314개였다 — `adjective`로 적힌 동사구 158 · 명사구 147, 그 밖에
뒤바뀐 아홉. 그날 모든 개념 파일이 비어 있어(`pnpm pending --free`) 일곱 언어의
품사 다수결대로 `category`만 한 번에 바꿨다. 그림 · 예문 · 뜻줄은 손대지 않았다.
