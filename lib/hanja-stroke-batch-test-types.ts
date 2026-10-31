import type {HanjaOutlineStrokes} from './hanja-stroke-outline'
import type {HanjaStrokeData} from './hanja-strokes'
import {createHash} from 'node:crypto'
import {readHanjaHistoricalSource} from './hanja-test-component-loader.ts'

/** A negative-case clone may mutate geometry while retaining the fixture's metadata. */
export type MutableFixture<T> = {-readonly [K in keyof T]: MutableFixture<T[K]>}
export type BatchTestFixture<T extends readonly unknown[]> = {
  -readonly [K in keyof T]: Omit<T[K], 'outlines'> & {outlines: MutableFixture<HanjaOutlineStrokes>}
}
export type OutlineOnlyStrokes = readonly (readonly {outline:string}[])[]
export type WeightOnlyStrokes = readonly (readonly {weight:number}[])[]
export type NegativeBatchFixture<T extends readonly unknown[]> = {
  -readonly [K in keyof T]: Omit<T[K], 'outlines'> & {
    outlines: (Omit<MutableFixture<HanjaOutlineStrokes[number][number]>, 'direction'> & {direction:string})[][]
  }
}
export type StrokeCacheFixture<T> = Omit<T,'strokes'> & {strokes:MutableFixture<HanjaOutlineStrokes>}

/** Dynamic fixture keys must exist before the test reads their value. */
export function fixtureKey<T extends object>(value:T,key:PropertyKey):keyof T {
  if (!Object.hasOwn(value,key)) throw new Error('Missing reviewed fixture key: '+String(key))
  return key as keyof T
}

type WholeProofIdentity = {root:string;file:string;fileSHA256:string}
type SplitProofIdentity = {
  root:string;headerFile:string;headerFileSHA256:string;traceFile:string;traceFileSHA256:string;
  sourceFile:string;sourceFileSHA256:string
}
/** The archive uses two explicit identity formats; tests cover both branches. */
export function reviewProofIdentity(value:WholeProofIdentity|SplitProofIdentity):WholeProofIdentity|SplitProofIdentity {
  return value
}

/** Empty arrays and failed matches are invalid evidence, never silent non-null assertions. */
export function requiredFixture<T>(value:T|null|undefined):T {
  if (value===null||value===undefined) throw new Error('Missing reviewed fixture value')
  return value
}

/** Optional JSON fields deliberately compare as undefined when absent. */
export function fixtureProperty(value:object,key:PropertyKey):unknown {
  return Object.getOwnPropertyDescriptor(value,key)?.value
}

export function fixtureObject(value:unknown):Record<string,unknown> {
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Reviewed fixture object required')
  return value as Record<string,unknown>
}

export function dictionaryFixture(value:HanjaStrokeData|null):{outlines:HanjaOutlineStrokes} {
  if(!value||!('outlines' in value)||!value.outlines)throw new Error('Reviewed dictionary outlines required')
  return {outlines:value.outlines}
}

/** Reviewed source pins describe their captured version; live validators are tested separately. */
export function fixtureEvidenceBytes(path:string,expectedSHA256:unknown,readCurrent:(path:string)=>Buffer):Buffer {
  const current=readCurrent(path)
  if(typeof expectedSHA256==='string'&&createHash('sha256').update(current).digest('hex')!==expectedSHA256
    &&(/^(?:lib|components\/hanja)\/[A-Za-z0-9-]+(?:\.test)?\.tsx?$/.test(path)
      ||/^content\/hanja\/characters\/[a-z0-9-]+\.json$/.test(path)
      ||path==='scripts/hanja-actual-component-review.mjs')) {
    try{return readHanjaHistoricalSource(path,expectedSHA256)}
    catch(cause){throw new Error('Historical fixture unavailable: '+path+' '+expectedSHA256,{cause})}
  }
  return current
}
