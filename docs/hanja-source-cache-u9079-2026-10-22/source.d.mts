import type {HanjaOutlineStrokes} from '../../lib/hanja-stroke-outline'
export function renderProgressive(strokes:HanjaOutlineStrokes,stroke:number,progress:number,prefix?:string):string
import type {StrokeCacheFixture} from '../../lib/hanja-stroke-batch-test-types'
type SourceCache=StrokeCacheFixture<typeof import('./source.json')>
export const sourceRoot:SourceCache['root']
export const selectedProofIdentity:SourceCache['identity']
export const logicalSourceGroups:SourceCache['sourceGroups']
export const nativeApproval:false
export const runtimeApplied:false
export const actualAppUI:false
export const cachedLeftCorrectionCallCount:()=>number
export const projectionCallCount:()=>number
export const cachedPositiveCallCount:()=>number
export function deriveCachedLeftCorrection(cache:unknown,proof:unknown,identity:unknown):SourceCache
export function captureProjection(...args:unknown[]):unknown
export function compileProgressive(...args:unknown[]):HanjaOutlineStrokes
export function compileSourceWhole(...args:unknown[]):HanjaOutlineStrokes
