import type { Buffer } from 'node:buffer'
export type HistoricalAppSnapshotBinding = Readonly<{
  originalPath: string
  expectedSHA256: string
  snapshot: string
}>
export function historicalAppSnapshotBindings(): HistoricalAppSnapshotBinding[]
export function verifyHistoricalAppSnapshotBytes(originalPath: string, expectedSHA256: string, bytes: Buffer): Buffer
export function readHistoricalAppSnapshot(originalPath: string, expectedSHA256: string): Buffer
export const historicalApproval: Readonly<{
  batch: 1316
  glyph: '棖'
  review: string
  reviewSHA256: string
  nativeReview: string
  nativeReviewSHA256: string
}>
