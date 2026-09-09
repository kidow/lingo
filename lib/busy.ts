/**
 * 지금 **다른 세션이 만지고 있는 콘텐츠 파일**을 가린다. (docs/concurrent-sessions.md)
 *
 * 워크트리가 하나라 남의 미커밋 수정이 내 눈앞에 그대로 있다. 후보를 조회하다
 * «그럼 그 개념을 고치자»로 가면 그 수정을 덮는다 — 2026-09-09에 닮은 그림
 * 여섯을 그렇게 고쳤다가 임자 세션의 프롬프트를 잃었다.
 *
 * `pnpm dup`과 `pnpm props`가 이걸 써서 걸린 줄에 표시를 붙인다. 같은 판단을
 * 두 곳에 복붙해 두면 한쪽만 고치게 되므로 여기 한 벌만 둔다.
 *
 * **git을 여기서 부르지 않는다.** 부르는 쪽이 결과를 넘긴다 — 그래야 시험이
 * 워크트리 상태에 기대지 않는다.
 */

/** `git diff --name-only HEAD -- content`의 출력 → 파일 이름(확장자 없이) */
export function dirtyFiles(gitOutput: string): Set<string> {
  return new Set(
    gitOutput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.endsWith('.json'))
      .map((line) => line.replace(/^content\//, '').replace(/\.json$/, '')),
  )
}

/** 그 파일이 만져지는 중이면 붙일 표시. 아니면 빈 문자열 */
export function busyMark(file: string | undefined, dirty: Set<string>): string {
  return file && dirty.has(file) ? ' ⟨손대는 중⟩' : ''
}

/**
 * 목록 아래에 붙일 설명. 만져지는 파일이 없으면 아무것도 안 낸다.
 *
 * 표시만 붙여 놓으면 «이게 뭐지»에서 멈춘다. 무슨 뜻이고 무엇을 하지 말아야
 * 하는지까지 적어야 그 자리에서 판단이 선다.
 */
export function busyNote(dirty: Set<string>): string {
  if (dirty.size === 0) return ''
  return (
    `\n⟨손대는 중⟩ = 아직 커밋되지 않은 수정이 있는 파일입니다 (${[...dirty].sort().join(' ')})` +
    '\n  그 개념을 고치면 다른 세션의 작업을 덮습니다'
  )
}
