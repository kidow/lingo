/** One retry of the rows that failed in the first dictionary pass; concurrency is halved. Output replaces the first pass. */
import { readFileSync } from 'node:fs'
import { auditDictionary } from './dictionary-audit.mjs'

const first = JSON.parse(readFileSync(process.argv[2], 'utf8'))
console.log(JSON.stringify(await auditDictionary({ retryInventory: first })))
