import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'

type Props = { slug: string; lang: string; label: string; src?: string; enabled?: boolean; autoPlay?: boolean }
type Button = { props: { disabled: boolean } }

// Exercise the component's Audio side effects without a browser or a live CDN.
function render(props: Partial<Props>, catalogHasAudio: boolean) {
  const effects: Array<() => unknown> = []
  const requested: string[] = []
  let plays = 0
  class AudioStub {
    constructor(src: string) { requested.push(src) }
    addEventListener() {}
    play() { plays += 1; return Promise.resolve() }
    pause() {}
  }
  const exports: { SayButton?: (props: Props) => Button } = {}
  const source = readFileSync(new URL('../components/say-button.tsx', import.meta.url), 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const modules: Record<string, unknown> = {
    react: {
      useRef: (current: unknown) => ({ current }),
      useState: (value: unknown) => [value, () => {}],
      useCallback: (callback: unknown) => callback,
      useEffect: (effect: () => unknown) => effects.push(effect),
    },
    'react/jsx-runtime': { jsx: (type: unknown, props: unknown) => ({ type, props }) },
    'lucide-react': { AudioLines: () => null },
    '@/lib/entries': { audioPath: (slug: string, lang: string) => `https://cdn.example/audio/${lang}/${slug}.mp3` },
    '@/lib/audio-have': { hasAudio: () => catalogHasAudio },
  }
  runInNewContext(compiled, { exports, Audio: AudioStub, require: (name: string) => {
    assert.ok(name in modules, `Unexpected dependency: ${name}`)
    return modules[name]
  } })
  assert.ok(exports.SayButton)
  const button = exports.SayButton({ slug: 'refund-please', lang: 'ja', label: '환불', ...props })
  effects.forEach((effect) => effect())
  return { button, requested, plays }
}

test('a missing catalog entry never requests or autoplays an obsolete CDN recording', () => {
  const result = render({ autoPlay: true }, false)
  assert.equal(result.button.props.disabled, true)
  assert.deepEqual(result.requested, [])
  assert.equal(result.plays, 0)
})

test('an explicitly disabled button does not preload or autoplay', () => {
  const result = render({ enabled: false, autoPlay: true }, true)
  assert.equal(result.button.props.disabled, true)
  assert.deepEqual(result.requested, [])
  assert.equal(result.plays, 0)
})

test('an available word recording still autoplays', () => {
  const result = render({ autoPlay: true }, true)
  assert.equal(result.button.props.disabled, false)
  assert.deepEqual(result.requested, ['https://cdn.example/audio/ja/refund-please.mp3'])
  assert.equal(result.plays, 1)
})

test('a supplied example recording is independent of the word audio catalog', () => {
  const result = render({ src: '/audio/ja/ex/refund-please-0-newhash.mp3', autoPlay: true }, false)
  assert.equal(result.button.props.disabled, false)
  assert.deepEqual(result.requested, ['/audio/ja/ex/refund-please-0-newhash.mp3'])
  assert.equal(result.plays, 1)
})
