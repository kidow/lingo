import assert from 'node:assert/strict'
import { test } from 'node:test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

test('芍·菽의 겹친 원본 다각형이 반대 감김으로 비지 않고 좌표·재생 경로를 보존한다', () => {
  const verifier=fileURLToPath(new URL('../docs/hanja-goal-outline-winding-2026-09-22/verify.mjs',import.meta.url))
  const result=JSON.parse(execFileSync(process.execPath,[verifier],{encoding:'utf8'}))
  assert.equal(result.passed,true)
  assert.deepEqual(result.results.map((r: {glyph: string})=>r.glyph),['芍','菽'])
})
