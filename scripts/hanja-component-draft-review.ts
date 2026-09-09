/** Read-only, reference-guided review of frozen synthesis drafts. Never publishes geometry. */
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDeepStrictEqual } from 'node:util'
import type { HanjaStrokeData } from '../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE } from '../lib/hanja-stroke-textbook.ts'
import { comparePaths } from './hanja-component-geometry.ts'
import type { Candidate } from './hanja-component-synthesis.ts'
import { TEXTBOOK_AUTHORED, type TextbookAuthoredContext } from './hanja-stroke-textbook-authored.ts'
import { TEXTBOOK_CORRECTIONS } from './hanja-stroke-textbook-corrections.ts'
import { TEXTBOOK_SOURCE_FORMS } from './hanja-stroke-source-forms.ts'
import { validateTextbookReview, type TextbookReviewRegistry } from './hanja-stroke-textbook.ts'

export const FROZEN_DRAFT_RESULT = 'docs/hanja-component-phase2-2026-09-09/result.json'
export const FROZEN_DRAFT_RESULT_SHA256 = 'cc8d31b3a612ed729c311122da7ea829eefc827a9af045cd63efe2ef7e378bf8'
export const DRAFT_REVIEW_DIRECTORY = 'docs/hanja-sequential-2026-09-09'

type Draft = Candidate & { grade?: string; hun?: string; eum?: string; review?: unknown }
export type FrozenDrafts = { candidates: { v2: readonly Draft[] } }
const sha256 = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const bytesSha256 = (value: string) => createHash('sha256').update(value).digest('hex')

export type DraftReviewInputPins = {
  frozenFileSha256: string | null
  frozenResultSha256: string
  approvedSnapshotSha256: string
  donorSnapshotSha256: string
  ledgerSha256: string
  authoredRegistrySha256: string
  correctionsRegistrySha256: string
  sourceFormRegistrySha256: string
}

/** expectedInput pins make a replay fail closed when any evidence snapshot changes. */
export function generateDraftReview(
  frozen: FrozenDrafts,
  approved: readonly HanjaStrokeData[],
  ledger: TextbookReviewRegistry,
  options: { context?: TextbookAuthoredContext; frozenFileSha256?: string; expectedInput?: DraftReviewInputPins } = {},
) {
  const drafts = frozen.candidates?.v2
  if (!Array.isArray(drafts) || !drafts.length) throw new Error('Missing frozen v2 drafts')
  if (options.frozenFileSha256 !== undefined && !/^[a-f0-9]{64}$/.test(options.frozenFileSha256)) {
    throw new Error('Invalid frozen file SHA256')
  }
  const context = { entries: options.context?.entries ?? TEXTBOOK_AUTHORED, donors: options.context?.donors ?? approved }
  const input: DraftReviewInputPins = {
    frozenFileSha256: options.frozenFileSha256 ?? null,
    frozenResultSha256: sha256(frozen), approvedSnapshotSha256: sha256(approved), donorSnapshotSha256: sha256(context.donors), ledgerSha256: sha256(ledger),
    authoredRegistrySha256: sha256(context.entries), correctionsRegistrySha256: sha256(TEXTBOOK_CORRECTIONS),
    sourceFormRegistrySha256: sha256(TEXTBOOK_SOURCE_FORMS),
  }
  if (options.expectedInput && !isDeepStrictEqual(input, options.expectedInput)) throw new Error('Draft review input pin mismatch')
  const seen = new Set<string>()
  const records = drafts.map(draft => {
    if (typeof draft.glyph !== 'string' || Array.from(draft.glyph).length !== 1 || seen.has(draft.glyph)) {
      throw new Error('Missing or duplicate draft identity')
    }
    seen.add(draft.glyph)
    if (!Number.isInteger(draft.expectedStrokes) || draft.expectedStrokes < 1
      || draft.status !== 'candidate-unreviewed' || draft.provenance !== 'component-derived-unreviewed') {
      throw new Error(`Invalid original draft: ${draft.glyph}`)
    }
    // Parse every original path, including held drafts; this is geometry validation, not correctness evidence.
    comparePaths(draft.paths, [])
    const original = structuredClone(draft)
    const matches = approved.filter(entry => entry.glyph === draft.glyph)
    if (matches.length > 1) throw new Error(`Duplicate whole-target reference: ${draft.glyph}`)
    const reference = matches[0]
    if (!reference) return {
      glyph: draft.glyph, expectedStrokes: draft.expectedStrokes, original, originalSha256: sha256(original),
      originalPathsSha256: sha256(original.paths), status: 'held' as const,
      holdReason: 'missing-whole-target-evidence' as const, beforeComparison: null, corrected: null,
    }
    if (reference.verificationSource !== HANJA_TEXTBOOK_SOURCE.id) {
      throw new Error(`Unsupported whole-target reference evidence: ${draft.glyph}`)
    }
    // Validates exact identity, full count, manifest/video/date observations, local correction/authored pins,
    // source indices and the runtime paths hash. A matched ledger label alone is insufficient.
    const record = validateTextbookReview(reference, draft.expectedStrokes, ledger, context)
    const beforeComparison = comparePaths(original.paths, reference.paths)
    return {
      glyph: draft.glyph, expectedStrokes: draft.expectedStrokes, original, originalSha256: sha256(original),
      originalPathsSha256: sha256(original.paths), status: 'reference-guided-whole-target-replacement' as const,
      holdReason: null, beforeComparison,
      corrected: {
        paths: [...reference.paths], pathsSha256: reference.pathsSha256,
        provenance: 'exact-current-approved-whole-target-reference' as const,
        runtimeReferenceSha256: sha256(reference), reviewRecordSha256: sha256(record),
        runtimeReference: structuredClone(reference), reviewRecord: structuredClone(record),
      },
    }
  })
  return {
    schemaVersion: 1 as const,
    method: 'reference-guided-whole-target-replacement' as const,
    independentPredictionAccuracy: false as const,
    limitations: [
      '현재 승인된 동일 글자의 전체 경로로 교체한 결과다. 독립 합성 예측의 정확도 평가가 아니다.',
      'beforeComparison은 원래 초안과 참조 경로의 기하학적 진단이다. 필순의 언어적 정답률을 뜻하지 않는다.',
      '원본 초안의 경로·부품 배치·실행 순서는 보존한다. 이 보고서는 런타임이나 승인 원장을 변경하지 않는다.',
    ],
    input, records,
    summary: {
      originalDrafts: records.length,
      referenceGuidedReplacements: records.filter(record => record.corrected !== null).length,
      held: records.filter(record => record.corrected === null).length,
      currentRuntimeApproved: approved.length, additionalRuntimeApprovals: 0, published: 0,
    },
  }
}

export type DraftReviewReport = ReturnType<typeof generateDraftReview>
const escapeHtml = (value: unknown) => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
/** Self-contained artifact; no remote scripts, font requests, fetches or executable embedded data. */
export function renderDraftReviewHtml(report: DraftReviewReport): string {
  const svg = (paths: readonly string[], label: string) => `<svg viewBox="0 0 100 100" role="img" aria-label="${escapeHtml(label)}">${paths.map(path => `<path d="${escapeHtml(path)}" pathLength="1"/>`).join('')}</svg>`
  const panels = report.records.map((record, index) => {
    const proof = record.corrected
    const metrics = record.beforeComparison
    const metricText = metrics ? `동일 순번 거리 ${metrics.orderedMeanDistance?.toFixed(2) ?? '—'} · 최적 대응 거리 ${metrics.unorderedMeanDistance?.toFixed(2) ?? '—'} (100 단위 좌표)` : '동일 글자 전체 참조 근거 없음'
    return `<article id="draft-${index}"><header><h2>${escapeHtml(record.glyph)} <small>${record.expectedStrokes}획</small></h2><button type="button" data-replay="draft-${index}" aria-label="${escapeHtml(record.glyph)} 두 경로 다시 재생">다시 재생</button></header><div class="pair"><section><h3>원본 합성 초안</h3>${svg(record.original.paths, `${record.glyph} 원본 합성 초안`)}</section><section><h3>${proof ? '승인 참조로 전체 교체' : '보류'}</h3>${proof ? svg(proof.paths, `${record.glyph} 승인 참조 경로`) : '<div class="held">전체 글자의 검증 근거가 필요합니다.</div>'}</section></div><p>${escapeHtml(metricText)}</p>${proof ? `<p class="source"><a href="${escapeHtml(proof.reviewRecord.sourceVideo?.url)}" target="_blank" rel="noreferrer">개별 영상 근거</a> · ${escapeHtml(proof.reviewRecord.reviewedAt)} · ${escapeHtml(proof.reviewRecord.reviewer)}</p>` : ''}<details><summary>경로·근거 해시와 진단</summary><pre>${escapeHtml(JSON.stringify({ originalPathsSha256: record.originalPathsSha256, referencePathsSha256: proof?.pathsSha256 ?? null, runtimeReferenceSha256: proof?.runtimeReferenceSha256 ?? null, reviewRecordSha256: proof?.reviewRecordSha256 ?? null, sourceReference: proof?.runtimeReference.sourceReference ?? null, sourceVideo: proof?.reviewRecord.sourceVideo ?? null, strokeEndsSeconds: proof?.reviewRecord.strokeEndsSeconds ?? null, beforeComparison: metrics }, null, 2))}</pre></details></article>`
  }).join('\n')
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>한자 합성 초안 참조 보정</title><style>
*{box-sizing:border-box}body{margin:0;background:#f7f4ee;color:#201f1c;font:16px/1.6 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:32px 20px}h1{font-size:28px;line-height:1.3}h2{font-size:32px;margin:0}h3{font-size:14px;font-weight:500;margin:8px 0}small{font-size:14px;font-weight:400;color:#68645c}article{background:#fffdf9;border:1px solid #ded9ce;border-radius:14px;padding:22px;margin:24px 0}header{display:flex;align-items:center;justify-content:space-between;gap:16px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}.pair section{text-align:center;min-width:0}svg{width:100%;max-height:380px;background:#f9f6ef;border-radius:10px}path{fill:none;stroke:#24221e;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}.held{display:grid;place-items:center;aspect-ratio:1;color:#767168;background:#f9f6ef;border-radius:10px}button{background:#fff;border:1px solid #c9c2b7;border-radius:8px;padding:9px 14px;color:inherit;font:inherit;cursor:pointer}p{margin:12px 0}.source,details{font-size:13px}a{color:inherit}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}.notice{border-left:3px solid #8a7251;padding-left:16px;color:#595247}@keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}@media(max-width:500px){main{padding:20px 12px}article{padding:15px}.pair{gap:10px}h1{font-size:24px}}@media(prefers-reduced-motion:reduce){path{animation:none!important;stroke-dashoffset:0!important}}
</style></head><body><main><h1>합성 초안 ${report.summary.originalDrafts}자 · 참조 보정</h1><p>참조 교체 ${report.summary.referenceGuidedReplacements}자 · 보류 ${report.summary.held}자 · 추가 승인 0자</p><div class="notice">${report.limitations.map(note => `<p>${escapeHtml(note)}</p>`).join('')}</div>${panels}<details><summary>동결 입력 해시</summary><pre>${escapeHtml(JSON.stringify(report.input, null, 2))}</pre></details></main><script>
document.querySelectorAll('button[data-replay]').forEach(button=>button.addEventListener('click',()=>{const card=document.getElementById(button.dataset.replay);card.querySelectorAll('svg').forEach(svg=>{const paths=Array.from(svg.querySelectorAll('path'));paths.forEach(path=>{path.style.animation='none';path.style.strokeDasharray='1';path.style.strokeDashoffset='1'});requestAnimationFrame(()=>requestAnimationFrame(()=>paths.forEach((path,index)=>{path.style.animation='draw 450ms linear '+(index*550)+'ms both'})))})}));
</script></body></html>\n`
}

export function parseDraftReviewArgs(args: string[]) {
  if (args.length > 1 || args.some(arg => !['--json', '--html', '--check'].includes(arg))) {
    throw new Error('Use --json, --html, or --check')
  }
  return args[0] ?? 'summary'
}

async function main() {
  const mode = parseDraftReviewArgs(process.argv.slice(2))
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const [frozenText, runtime, review] = await Promise.all([
    readFile(join(root, FROZEN_DRAFT_RESULT), 'utf8'), import('../lib/hanja-strokes.ts'), import('./hanja-stroke-textbook.ts'),
  ])
  const frozenFileSha256 = bytesSha256(frozenText)
  if (frozenFileSha256 !== FROZEN_DRAFT_RESULT_SHA256) throw new Error('Frozen phase2 result file pin mismatch')
  const saved = mode === '--check' ? JSON.parse(await readFile(join(root, DRAFT_REVIEW_DIRECTORY, 'stage3-result.json'), 'utf8')) as DraftReviewReport : undefined
  const report = generateDraftReview(JSON.parse(frozenText) as FrozenDrafts, runtime.HANJA_STROKES, review.TEXTBOOK_REVIEW_REGISTRY,
    { frozenFileSha256, expectedInput: saved?.input })
  if (mode === '--check') {
    if (!isDeepStrictEqual(report, saved)) throw new Error('Draft review JSON artifact mismatch')
    if (renderDraftReviewHtml(report) !== await readFile(join(root, DRAFT_REVIEW_DIRECTORY, 'stage3-result.html'), 'utf8')) {
      throw new Error('Draft review HTML artifact mismatch')
    }
    process.stdout.write(JSON.stringify({ ok: true, summary: report.summary, input: report.input }, null, 2) + '\n')
  } else process.stdout.write(mode === '--html' ? renderDraftReviewHtml(report)
    : JSON.stringify(mode === '--json' ? report : report.summary, null, 2) + '\n')
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error); process.exitCode = 1 })
