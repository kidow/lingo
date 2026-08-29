import { DEFAULT_LANGUAGE, LANGUAGES } from './lang.ts'
import type { Language } from './types.ts'

/**
 * 학습 언어 설정. (spec.md §3)
 *
 * 진도와 마찬가지로 서버가 모르는 값이라 localStorage에만 있다. 진도는
 * 언어별로 갈라져 저장되므로(lib/progress.ts) 언어를 오가도 서로를 덮지 않는다.
 */
const KEY = 'lingo.language'

export function loadLanguage(): Language {
  if (typeof localStorage === 'undefined') return DEFAULT_LANGUAGE
  const stored = localStorage.getItem(KEY)
  return LANGUAGES.includes(stored as Language) ? (stored as Language) : DEFAULT_LANGUAGE
}

export function saveLanguage(lang: Language) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(KEY, lang)
}
