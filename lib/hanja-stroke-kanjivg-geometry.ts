/** Uniformly scale the reviewed KanjiVG cubic paths; preserve commands and curves. */
export function normalizeKanjiVGPath(path: string): string {
  const tokens = path.match(/[MCcs]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g)
  if (!tokens || path.replace(/[MCcs]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?|[\s,]/g, '')
    || tokens[0] !== 'M') throw new Error('Unsupported KanjiVG path')
  let command = '', count = 0
  const arity: Record<string, number> = { M: 2, C: 6, c: 6, s: 4 }
  const check = () => {
    if (!count || count % arity[command] !== 0) throw new Error('Invalid KanjiVG coordinates')
  }
  const scaled = tokens.map(token => {
    if (token in arity) {
      if (command) check()
      command = token
      count = 0
      return token
    }
    count++
    const value = Number(token) * 100 / 109
    if (!Number.isFinite(value)) throw new Error('Invalid KanjiVG coordinate')
    return String(Number(value.toFixed(8)))
  })
  check()
  return scaled.join(' ')
}
