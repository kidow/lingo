/**
 * 넘김 문서에서 **아직 남은 일감**만 골라낸다. (docs/*-pending.md)
 *
 * `scripts/pending.ts`가 쓴다. 판단을 여기 한 벌만 두는 까닭은 `lib/busy.ts`와
 * 같다 — **파일도 git도 여기서 부르지 않아야** 시험이 워크트리 상태에 안 기댄다.
 *
 * 규칙이 넷이고 넷 다 겪고 나서 생겼다.
 *
 *   1. **표와 목록 줄만 본다.** 산문에 나오는 이름은 대개 끝난 일을 적거나
 *      («`hour`는 어제 뺐다») 거리를 나열하거나 예를 든 것이다. 2026-09-10에
 *      «지금 손댈 수 있는 것» 여덟이 전부 그런 자리였다.
 *   2. **끝난 절은 건너뛴다.** 이 문서들은 고친 것을 지우지 않고 «고쳤다»는
 *      제목 아래 판단의 기록으로 남긴다. 그대로 뽑으면 오늘 끝낸 것이 내일
 *      할 일로 뜬다. 표 한 줄만 끝난 자리는 취소선과 «끝냈다»로 가른다.
 *   3. **`전`·`후` 칸이 있는 표는 통째로 끝난 기록이다.** 고친 것을 지우지 않고
 *      «무엇을 무엇으로 바꿨는지»를 표로 남기는데, 그런 표에는 「끝냈다」 같은
 *      말이 어디에도 없어 일감으로 읽혔다. 2026-09-10에 다섯 줄을 손으로
 *      표시해 줘야 했다. 머리줄 칸에 `전`과 `후`가 함께 있으면 그 표는 건너뛴다.
 *   4. **파일 이름이 홀로 서면 버린다.** `food`(먹을거리)·`nature`(자연)·
 *      `city`(도시)·`number`(번호)는 개념 이름이자 파일 이름이라, 문서는 그
 *      낱말을 파일을 가리키는 데 더 자주 쓴다. 개념을 가리킬 때는 `food/plate`
 *      처럼 적는다.
 */

/** backtick으로 감싼 `slug` 또는 `파일/slug` */
const TOKEN_RE = /`([a-z][a-z0-9-]*(?:\/[a-z0-9-]+)?)`/g

/** 목록은 «- »·«* »처럼 빈칸이 따라온다. 그러지 않으면 **굵게**의 별표가 걸린다 */
const ROW_RE = /^\s*(?:\||[-*] )/

/** 표 한 줄의 칸들 */
const cells = (line: string) =>
  line
    .split('|')
    .map((c) => c.replace(/\*/g, '').trim())
    .filter(Boolean)

/** `전`과 `후`가 머리줄에 함께 있으면 그 표는 끝난 일의 기록이다 */
const isRecordHeader = (line: string) => {
  const c = cells(line)
  return c.includes('전') && c.includes('후')
}

/**
 * 이 말이 든 제목 아래는 끝난 절이다. 줄 하나에 들어 있으면 그 줄만 건너뛴다.
 *
 * 「물건이 다르다」·「아니다」·「정당하다」는 이 레포가 **헛것으로 판정할 때**
 * 쓰는 말이다. 판정도 끝난 자리라 같이 뺀다.
 */
const DONE_RE = /고쳤다|끝났다|끝냈다|그냥 둔다|없다|풀렸다|물건이 다르다|아니다|정당하다/

export type Found = { slug: string; line: number }

/**
 * 문서 한 편에서 남은 일감을 뽑는다. 한 slug가 여러 번 나오면 **처음 줄**만.
 *
 * @param text  문서 전문
 * @param known 실제로 있는 slug (여기 없는 이름은 표기이거나 오타다)
 * @param files 콘텐츠 파일 이름 — 홀로 서면 파일을 가리키는 것으로 본다
 */
export function pendingIn(text: string, known: Set<string>, files: Set<string>): Found[] {
  const out: Found[] = []
  const seen = new Set<string>()
  let done = false
  let record = false
  for (const [i, line] of text.split('\n').entries()) {
    if (line.startsWith('#')) done = DONE_RE.test(line)
    const isTable = line.trimStart().startsWith('|')
    if (!isTable) record = false
    else if (isRecordHeader(line)) record = true
    if (done || record || line.includes('~~') || DONE_RE.test(line)) continue
    if (!ROW_RE.test(line)) continue
    for (const [, token] of line.matchAll(TOKEN_RE)) {
      const slug = token.includes('/') ? token.slice(token.indexOf('/') + 1) : token
      if (!known.has(slug)) continue
      if (!token.includes('/') && files.has(token)) continue
      if (seen.has(slug)) continue
      seen.add(slug)
      out.push({ slug, line: i + 1 })
    }
  }
  return out
}
