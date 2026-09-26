/**
 * 발음이 **없는** 자리. (spec.md §5)
 *
 * 듣기 카드는 소리가 단서다. 파일이 없으면 문제가 성립하지 않으므로 그 카드는
 * 아예 만들지 않고 재인 카드를 낸다 — 소리 없는 듣기 문제를 내는 것보다
 * 조용히 다른 문제를 내는 편이 낫다.
 *
 * 정적 내보내기(`output: 'export'`)라 앱이 도는 중에 파일 존재를 물어볼 서버가
 * 없다. 그래서 **없는 것만** 목록으로 적어 둔다. 지금은 20,671자리가 모두 차
 * 있어 비어 있고, 비었다는 사실 자체가 이 파일의 값이다 — 있는 것을 다 적으면
 * 400KB짜리 목록이 번들에 실린다.
 *
 *   node scripts/audio.ts manifest    다시 만든다
 *
 * 낡으면 `pnpm check`가 경고한다. 콘텐츠를 넣고 발음을 아직 안 만들었는데 이
 * 목록이 옛날 그대로면 듣기 카드가 빈 소리를 내기 때문이다.
 */
export const AUDIO_MISSING: ReadonlySet<string> = new Set([])

/** 그 언어에 그 개념의 발음이 있는가 */
export function hasAudio(slug: string, lang: string): boolean {
  return !AUDIO_MISSING.has(`${lang}/${slug}`)
}

/**
 * 예문 소리는 **언어 단위로 켠다.** 켜진 언어 안에서는 없는 것만 적는다.
 *
 * 소리를 내는 것은 소개 카드의 첫 예문(index 0)뿐이라 자리가 언어마다 1만 개를
 * 넘는다. 있는 것을 적으면 다 채웠을 때 3MB가 번들에 실리고, 없는 것만 적으면
 * 만드는 도중에 그만큼 실린다. 그래서 한 언어를 거의 다 채우면
 * (`EXAMPLE_AUDIO_ON` 이상) 그 언어를 켜고, 남은 빈자리만 적는다 — 예문을 고친
 * 뒤 아직 다시 만들지 않은 몇 줄이다.
 *
 * 열쇠는 `{lang}/{slug}-0-{해시}`다. 해시가 문장에서 나오므로(lib/entries.ts)
 * 예문을 고치면 열쇠가 달라지고, 다시 만들 때까지 여기에 빈자리로 오른다.
 *
 *   node scripts/audio.ts manifest    다시 만든다
 */
export const EXAMPLE_AUDIO_ON = 0.99

export const EXAMPLE_AUDIO_LANGS: ReadonlySet<string> = new Set([
  'en',
  'es',
  'ja',
  'zh',
])

export const EXAMPLE_MISSING: ReadonlySet<string> = new Set([
  'en/adult-0-b90b4df277a8',
  'en/afternoon-tea-0-350e44df3740',
  'en/archipelago-0-496016a18136',
  'en/award-certificate-0-06da352a4a9d',
  'en/blind-date-0-c1ea1748031f',
  'en/buddha-statue-0-d4ea662a3bc8',
  'en/casino-0-526a58c0031c',
  'en/cicada-0-7037f45961bf',
  'en/come-0-76e931598bdf',
  'en/comet-0-b29679ec7f55',
  'en/cram-school-0-1e0bc3f289f8',
  'en/dried-shrimp-0-a0b7c941f8b4',
  'en/english-language-0-46b423e0acef',
  'en/flower-arranging-0-1650de8ce672',
  'en/fluorescent-lamp-0-68824f8e9dc0',
  'en/front-gate-0-fa6b59e4cad3',
  'en/fruit-tree-0-316a99fcd63d',
  'en/goldfish-0-ab4f9382185d',
  'en/gong-0-383449d5cd9e',
  'en/heartbeat-0-a001881ef5a3',
  'en/hoe-0-1665016574c8',
  'en/hot-dog-0-879550aec152',
  'en/hot-water-0-c0bd1a81122a',
  'en/love-letter-0-a7d954afc40f',
  'en/maze-0-75b9cb80a430',
  'en/mung-bean-0-3cc38b6cb815',
  'en/night-view-0-c8c2d29293f6',
  'en/nun-0-934cf1afb1bf',
  'en/oil-field-0-103b10c8711c',
  'en/oolong-tea-0-95aba77109b3',
  'en/pesticide-0-9d11b8c1d60f',
  'en/red-bean-0-18327b792862',
  'en/sapling-0-a1691be243b4',
  'en/shake-head-0-b38acd8fdf1f',
  'en/she-0-d46e4d84d212',
  'en/silkworm-0-4d747480200f',
  'en/snowflake-0-86fe951dbcff',
  'en/stamp-collecting-0-0c16880c8d4a',
  'en/tea-set-0-84e67da860b6',
  'en/totem-0-82db085039fa',
  'es/adult-0-311302ea0dbe',
  'es/afternoon-tea-0-3bee2d8bcae4',
  'es/archipelago-0-29d2aa23940e',
  'es/award-certificate-0-1e6abb14efec',
  'es/blind-date-0-15bd35b4c732',
  'es/buddha-statue-0-47677b8e6308',
  'es/casino-0-b1b62f8f175d',
  'es/cicada-0-14380d1e05fb',
  'es/come-0-8bb950c99471',
  'es/comet-0-801f2a7ae403',
  'es/cram-school-0-764613274729',
  'es/dried-shrimp-0-ae366243b4ee',
  'es/english-language-0-ead1f6959f45',
  'es/flower-arranging-0-62c1abdc0182',
  'es/fluorescent-lamp-0-0cb8526eca87',
  'es/front-gate-0-9f92552983aa',
  'es/fruit-tree-0-2b940d076a3c',
  'es/goldfish-0-9d52a581bd99',
  'es/gong-0-0627a49adaeb',
  'es/heartbeat-0-e1eb96d3a9f8',
  'es/hoe-0-eaa433c235ef',
  'es/hot-dog-0-e8b3cb09a1b2',
  'es/hot-water-0-ea8dfa21ea09',
  'es/love-letter-0-35df7a19bc45',
  'es/maze-0-b6257879284d',
  'es/mung-bean-0-1ccc250c3214',
  'es/night-view-0-3e8ac5cf439f',
  'es/nun-0-374423a732a7',
  'es/oil-field-0-ebc6bd9558d1',
  'es/oolong-tea-0-a134634e5e77',
  'es/pesticide-0-496352935f51',
  'es/red-bean-0-19ae010ad24f',
  'es/sapling-0-7a921216d25a',
  'es/shake-head-0-d665a399f142',
  'es/she-0-d5c8fdfc2a03',
  'es/silkworm-0-f1066c769ca3',
  'es/snowflake-0-89274d3516cc',
  'es/stamp-collecting-0-a2423062da3a',
  'es/tea-set-0-fbf20c6ae5e6',
  'es/totem-0-6d5f07f63d6b',
  'ja/adult-0-16d59f7b3d65',
  'ja/afternoon-tea-0-d0809275c611',
  'ja/archipelago-0-2f9b31c348be',
  'ja/award-certificate-0-aa38a8800d6f',
  'ja/blind-date-0-219737a38f1b',
  'ja/buddha-statue-0-cb59eef71cfe',
  'ja/casino-0-860ed3298f2c',
  'ja/cicada-0-c7df8a10fb28',
  'ja/come-0-73e6eb0e2dbc',
  'ja/comet-0-750b6a97c362',
  'ja/cram-school-0-1270f478e56b',
  'ja/dried-shrimp-0-db60bc2939e5',
  'ja/english-language-0-ca912ce711e9',
  'ja/flower-arranging-0-0da908a97824',
  'ja/fluorescent-lamp-0-9b0b80c7c4d5',
  'ja/front-gate-0-2f46cc7f2bc2',
  'ja/fruit-tree-0-10220902887b',
  'ja/goldfish-0-0b677d25a8d5',
  'ja/gong-0-539068bc3959',
  'ja/heartbeat-0-cda45e9cc62d',
  'ja/hoe-0-e0d0074ae0ac',
  'ja/hot-dog-0-9b51eddb6ba8',
  'ja/hot-water-0-2796d3261dec',
  'ja/love-letter-0-67e29bcb88c8',
  'ja/maze-0-6ffd00c882ec',
  'ja/mung-bean-0-9834743176a8',
  'ja/night-view-0-3c1c00cb646f',
  'ja/nun-0-7cf8383d2147',
  'ja/oil-field-0-eceaba902459',
  'ja/oolong-tea-0-bdbf4d776835',
  'ja/pesticide-0-542969ec96a4',
  'ja/red-bean-0-eb5a6701be73',
  'ja/sapling-0-18bd0e3aec42',
  'ja/shake-head-0-18bdbb1a1814',
  'ja/she-0-8cb64e4c0c20',
  'ja/silkworm-0-edd9d682b9e4',
  'ja/snowflake-0-26c8666c5716',
  'ja/stamp-collecting-0-52ed44e0cced',
  'ja/tea-set-0-d564a49264ce',
  'ja/totem-0-c4e3b57371b3',
  'zh/adult-0-d6c5261367df',
  'zh/afternoon-tea-0-673af390cf13',
  'zh/archipelago-0-2b3d224ad811',
  'zh/award-certificate-0-c09a69a3248f',
  'zh/bathroom-0-409467053b18',
  'zh/blind-date-0-22b9a53f5dc1',
  'zh/breakfast-0-cf01659ce1fc',
  'zh/buddha-statue-0-827b756c35f3',
  'zh/casino-0-4698ca19c981',
  'zh/cicada-0-7ca65f19fe86',
  'zh/come-0-7a6ec389e5c0',
  'zh/comet-0-5649dd658701',
  'zh/cram-school-0-2cf5b165b1c4',
  'zh/dried-shrimp-0-5075f7d013fb',
  'zh/english-language-0-6447c843aa94',
  'zh/father-0-c95215d733fd',
  'zh/flower-arranging-0-43d1a68cf399',
  'zh/fluorescent-lamp-0-4703f83a1e7e',
  'zh/front-gate-0-84abfe49f7bb',
  'zh/fruit-tree-0-3ea5c7039c92',
  'zh/goldfish-0-a7022aacaa8e',
  'zh/gong-0-dd9d92d9e388',
  'zh/grandfather-0-0eae059e9e0c',
  'zh/grandmother-0-4f385973a83b',
  'zh/heartbeat-0-b5cb3df17891',
  'zh/hoe-0-c40994b4f26e',
  'zh/hot-dog-0-b765d5d21ea9',
  'zh/hot-water-0-4a3a8ce94fb2',
  'zh/ice-cream-0-05ebd860045b',
  'zh/illness-0-0723f7a9aef4',
  'zh/lawn-0-a007de5ef6f5',
  'zh/love-letter-0-a77f14e641da',
  'zh/lunch-0-bc7edf4f6ddb',
  'zh/maze-0-1087eb38a1d8',
  'zh/mother-0-52f333fd15cc',
  'zh/mung-bean-0-5a280657c698',
  'zh/night-view-0-4ff625520659',
  'zh/nun-0-5f59e0435f37',
  'zh/oil-field-0-c7afd1808235',
  'zh/oolong-tea-0-218cb9603c91',
  'zh/pesticide-0-61a5d2d41c94',
  'zh/red-bean-0-ddb3aac09a4f',
  'zh/restaurant-0-f82feefcc359',
  'zh/sapling-0-13872eafa848',
  'zh/shake-head-0-cac81b87507e',
  'zh/she-0-0f9303597ee1',
  'zh/sheep-0-4bef667e4a8f',
  'zh/silkworm-0-722b7e16e588',
  'zh/snowflake-0-c1a1ffadf2a7',
  'zh/stamp-collecting-0-a814534613a8',
  'zh/tea-set-0-c769c46c4d72',
  'zh/tooth-0-1f0dffcf95ee',
  'zh/totem-0-34afce62fdf2',
])

/** 그 언어의 그 예문(열쇠는 `exampleAudioKey`)에 소리가 있는가 */
export function hasExampleAudio(lang: string, key: string): boolean {
  return EXAMPLE_AUDIO_LANGS.has(lang) && !EXAMPLE_MISSING.has(`${lang}/${key}`)
}
