# 衛·豊 2자·28획 검토 — 2026-09-14

**衛 15획·豊 13획을 승인하여 재생 데이터에 반영했다.** 순서 변경 없이 5획을 보정했으며, 나머지 23획은 정규화한 Make Me a Hanzi 경로를 그대로 유지한다.

## 근거와 범위

| 글자 | 급수 | 획수 | 대조 원본 |
|---|---|---:|---|
| 衛 | 4급Ⅱ | 15 | [e-hanja 衛](http://img.e-hanja.kr/hanjaSvg/aniSVG/8800/885B.svg) |
| 豊 | 4급Ⅱ | 13 | [e-hanja 豊](http://img.e-hanja.kr/hanjaSvg/aniSVG/8C00/8C4A.svg) |

두 원본은 국내 민간 사전 자료이며 한국어문회·교육부의 공식 인증을 뜻하지 않는다. 기존 교과서에서 연결됐던 衞·豐과 별개로, 정확한 衛 U+885B·豊 U+8C4A를 검토했다. 다른 자형에 승인을 전이하지 않았다.

원본 SVG와 연결된 CSS·JS를 메모리에만 가져와 고정된 바이트 수와 SHA-256을 확인했다. 브라우저의 원래 CSS 애니메이션을 활성화한 뒤 각 획의 지연 시간 + 재생 시간 20%·80%·100%에서 정지해 **84개 시간 표본**을 관찰했다. 원본의 획 노출은 시간의 75%에서 완료되므로 80% 표본은 경로가 모두 드러난 상태다. 연속 전체 재생을 관찰했다는 주장이 아닌, 원래 렌더러의 시간별 프레임 대조다.

28개 원래 후보 누적 상태와 28개 보정 누적 상태를 확인했다. 豊의 점 간격 검증에서 발견한 접촉을 조정한 후 13개 누적 상태를 추가로 재확인했다. 시간과 방향 기록은 [observations.json](observations.json), 승인과 해시는 [review.json](review.json)에 있다.

## 보정

| 글자·획 | 보정 내용 |
|---|---|
| 衛 7 | 가운데 口의 왼쪽 변을 세로로 내리고 8·9획과 연결 |
| 衛 11 | 10획에서 시작해 아래로 내려간 뒤 오른쪽으로 꺾도록 연결 |
| 豊 3 | 曲 가운데 가로획 양끝을 1·2획에 연결 |
| 豊 8 | 豆의 口 왼쪽 변을 세로로 내려 9·10획과 연결 |
| 豊 11 | 口 아래 안쪽에 오른쪽 아래로 내려가는 점을 배치하고 위·아래 가로획과 간격 확보 |

런타임 선 굵기 5에서 연결부와 점의 분리를 검사한다. 원래 경로의 순서·분할은 유지하고, 교체한 다섯 획의 원본 인덱스만 `null`로 표시했다.

기하 경로는 [고정된 Make Me a Hanzi 원본](https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt)의 medians와 명시적으로 작성한 보정에서 나온다. [originals.json](originals.json), [prior-candidate-paths.json](prior-candidate-paths.json), [corrections.json](corrections.json), [candidate-paths.json](candidate-paths.json)에 원본과 전체 수정 소스를 보존했다. 수정 소스는 기존 [Arphic Public License](../../public/hanja-strokes/ARPHICPL.txt)를 따른다. 사전의 윤곽·중심선·CSS·JS·스크린샷은 저장하거나 재배포하지 않는다.

## 검증 결과

- 전체 한자 테스트 **208개 통과**, 실패 0개.
- 배포용 빌드 및 최종 TypeScript 검사 통과.
- SVG 2개와 CSS·JS의 온라인 응답·바이트·해시 일치.
- 기존 사전 검토 17자의 런타임 레코드는 그대로 유지.
- 교과서 보류와 별도 출처 승인을 구분하도록 테스트를 보완. 보류된 교과서 자체의 승인은 추가하지 않음.

명령과 결과는 [verification.json](verification.json)에 기록했다. 재검증:

```bash
node docs/hanja-g4-wi-pung-2026-09-14/verify.mjs --online
node --test lib/hanja*.test.ts
pnpm run build
```

시각 대조판은 `node docs/hanja-g4-wi-pung-2026-09-14/serve.mjs`가 출력하는 로컬 주소에서 연다. 원본 자료는 서버 실행 중 메모리에만 유지된다.

## 다음 검토

현재 전체 5,978자 중 **1,498자 적용**. 3급Ⅱ까지는 **1,497/1,500자**이며 **藝 19획·獎 15획·鍾 17획 = 3자·51획**이 남았다. 다음은 **獎·鍾 2자·32획**의 정확한 사전 자형과 전체 경로 대조를 권장한다.

KB 검색 표제: `衛豊 full Hanja tests final exit`, `衛豊 online verification exit`, `衛豊 live coverage`.
