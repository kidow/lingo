/**
 * CC-CEDICT 한 벌. **중국어 표기를 영어 뜻풀이로 바꾸는 자리.**
 *
 * `scripts/also-audit.ts`가 쓰던 것을 그대로 옮겨 왔다. `scripts/dup.ts`가
 * 같은 사전으로 「뜻이 닿는 개념」을 찾게 되면서 둘이 나눠 쓴다 — 두 벌이면
 * 한쪽만 고쳐 놓고 다른 쪽이 딴 판정을 내리는 자리가 생긴다.
 */
import { readFileSync } from 'node:fs'

export const CEDICT = '.cache/cedict.txt'

/** 간체 표제어 → 영어 뜻풀이들. 같은 표제어가 여러 줄이면 다 합친다 */
export function loadDict() {
  const dict = new Map<string, string[]>()
  for (const line of readFileSync(CEDICT, 'utf8').split('\n')) {
    if (line.startsWith('#') || !line.trim()) continue
    const space = line.indexOf(' ')
    const bracket = line.indexOf(' [')
    const slash = line.indexOf('] /')
    if (space < 0 || bracket < 0 || slash < 0) continue
    const simplified = line.slice(space + 1, bracket)
    const glosses = line
      .slice(slash + 3)
      .replace(/\/$/, '')
      .split('/')
      .filter(Boolean)
    const seen = dict.get(simplified)
    if (seen) seen.push(...glosses)
    else dict.set(simplified, glosses)
  }
  return dict
}

/** 뜻풀이를 낱말 집합으로. 괄호 주석과 두 글자 이하는 버린다 */
export const stem = (word: string) => word.replace(/(ing|ed|es|s)$/, '')
export function bag(text: string) {
  const out = new Set<string>()
  for (const word of text
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/[^a-z ]/g, ' ')
    .split(/\s+/))
    if (word.length > 2) out.add(stem(word))
  return out
}
