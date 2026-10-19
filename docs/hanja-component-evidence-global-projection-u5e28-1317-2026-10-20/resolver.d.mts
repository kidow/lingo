import type { Buffer } from 'node:buffer'
export type HistoricalAppSnapshotBinding = Readonly<{
  originalPath: string
  expectedSHA256: string
  snapshot: string
}>
export function historicalAppSnapshotBindings(): HistoricalAppSnapshotBinding[]
export function verifyHistoricalAppSnapshotBytes(originalPath: string, expectedSHA256: string, bytes: Buffer): Buffer
export function readHistoricalAppSnapshot(originalPath: string, expectedSHA256: string): Buffer
export const historicalEvidence: Readonly<{
  glyph: '帨'
  intendedBatch: 1317
  batchAssignmentProvisional: true
  phase: 'app-byte-snapshot-before-component-browser-review'
  isolatedActualComponentBrowserVerified: false
  actualAppUI: false
  runtimeRegistered: false
  runtimeApplied: false
  approvalStatusLivesInFutureRuntimeReview: true
}>
