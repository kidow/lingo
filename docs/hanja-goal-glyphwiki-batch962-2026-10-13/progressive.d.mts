import type { HanjaOutlineStrokes } from '../../lib/hanja-stroke-outline.ts'
export type FileIdentity = Readonly<{ root: string; file: string; fileSHA256: string }>
export type Full5Proof = Readonly<{
  engineRevision: string
  engineHashes: Readonly<Record<string, string>>
  defaults: Readonly<Record<string, number>>
  groups: readonly unknown[]
  trace: readonly unknown[]
}>
export type OuterCallerIdentity = Readonly<{
  root: string
  sourceProofFile: string
  sourceProofFileSHA256: string
  engineHeaderSHA256: string
  sourceFileSHA256: string
  compilerFileSHA256: string
}>
export declare const sourceRoot: string
export declare const sourceGroups: readonly (readonly number[])[]
export declare const sourceProofFile: string
export declare const sourceProofFileSHA256: string
export declare const wholeSourceIdentities: Readonly<Record<string, FileIdentity>>
export declare const nativeApproval: false
export declare const runtimeApplied: false
export declare function compileSourceWhole(root: string, trace: readonly unknown[], proof: Full5Proof, fileIdentity: FileIdentity): HanjaOutlineStrokes
export declare function compileProgressive(trace: readonly unknown[], proof: Full5Proof, fileIdentity: FileIdentity): HanjaOutlineStrokes
export declare function renderProgressive(strokes: HanjaOutlineStrokes, stroke: number, progress: number, prefix?: string): string
