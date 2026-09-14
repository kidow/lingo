# 冊·灰·姉 3자·19획 검토

2026-09-14. **원본의 19획을 모두 움직이는 상태로 관찰하고, 후보 경로 19개 누적 상태와 대조했다.** 자료 부족이 아니라 구체적인 순서·경로 차이가 남아 있다. 이번 검토에서 새로 승인하거나 앱에 적용한 글자는 **0자**다.

## 결과

| 글자 | 원본에서 확인한 내용 | 필요한 보정 |
|---|---|---|
| [冊 · 5획](http://img.e-hanja.kr/hanjaSvg/aniSVG/5100/518A.svg) | 왼쪽 외곽 → 위·오른쪽 외곽 → 내부 왼쪽 세로 → 내부 오른쪽 세로 → 가로 | 후보 순서를 **1·2·4·5·3**으로 재배열. 후보의 왼쪽 외곽이 원본보다 크게 벌어져 있어 외곽 세로와 위쪽 연결부도 맞춘 뒤 재검토 |
| [灰 · 6획](http://img.e-hanja.kr/hanjaSvg/aniSVG/7000/7070.svg) | 3획은 왼쪽 아래로 내려가는 짧은 획. 6획은 火 중앙의 높은 시작점에서 오른쪽 아래로 진행 | **3획 방향·경로**, **6획의 위쪽 시작 구간** 보정. 4획은 오른쪽 위에서 왼쪽 아래로 진행하므로 역전할 필요 없음 |
| [姉 · 8획](http://img.e-hanja.kr/hanjaSvg/aniSVG/5900/59C9.svg) | 4획은 위의 짧은 세로, 8획은 위 가로에서 아래로 이어지는 긴 세로 | 후보의 비스듬한 4획을 **짧은 세로**로 보정하고 **8획 시작점과 축** 정렬. 붙어 보이더라도 4·8획을 합치면 안 됨 |

冊의 순서 재배열안 5개 누적 상태도 별도로 확인했다. 순서를 옮겨도 외곽의 벌어짐은 그대로 남는다. 灰의 3획은 후보를 뒤집으면 위아래 방향까지 바뀌므로 단순 반전으로 처리할 수 없다. 姉는 정확한 글자가 Make Me a Hanzi에 없어 AnimCJK의 일본어 자료에서 8획 후보를 확보했다. 외국 자료의 순서를 한국 필순으로 간주하지 않고 사전 원본과 대조했다.

**다음 권장 작업은 이 세 글자의 기록된 보정을 진행하는 것이다.** 보정 후 전체 19개 누적 상태와 재생 방향을 다시 확인하고, 근거에 맞는 글자만 적용 여부를 결정한다. 기존 적용 **1,490 / 5,978자**는 이번 검토로 증가하지 않는다.

## 근거와 검토 범위

- [앞선 11자 출처 확보](../hanja-g4-held-11-2026-09-14/README.md)의 URL·해시를 그대로 사용했다. 원본은 e-hanja 국내 민간 사전이며 한국어문회·교육부 공식 인증으로 표기하지 않는다.
- 원본 SVG를 클릭해 정상 재생했다. 진행 중인 획과 앞서 완료된 획 목록을 읽은 직후 스크린샷을 눈으로 확인했다. 19획에 대해 **20개 움직이는 화면**을 관찰했으며 冊 2획은 꺾인 뒤도 추가 확인했다. 화면을 반환하지 못한 실패 시도는 세지 않았다.
- 원본의 애니메이션 시계·DOM·경로를 변경하지 않았다. 사전의 윤곽·중심선·스크립트·CSS·스크린샷은 저장하거나 앱에 복사하지 않았다.
- 검증 스크립트는 기록된 수치와 후보 재현을 검사한다. 필순의 시각적 정확성이나 공식성을 자동으로 증명하지 않는다.

## 파일

| 파일 | 내용 |
|---|---|
| [observations.json](observations.json) | 19획의 실제 재생 관찰 20건과 완료 획 목록 |
| [review.json](review.json) | 획별 역할·방향·후보 번호·보정 사유 19행 |
| [originals.json](originals.json) | 고정된 리비전에서 확보한 3자 후보 중심선과 원본 해시 |
| [candidate-paths.json](candidate-paths.json) | `normalizeMedians`로 재현한 원래 경로 및 별도의 순서 대조안 |
| [review.html](review.html) | 후보의 원래 순서와 대조안을 보여 주는 누적 경로 화면 |
| [verify.mjs](verify.mjs) | 출처·관찰 범위·후보 재현·라이선스 기록 검증 |
| [verification.json](verification.json) | 실제 검증 실행 결과 |

검토 화면은 저장소 루트를 정적 서버로 열고 이 폴더의 `review.html`로 접근하면 된다. 서버 없이 `file://`로 열면 JSON 로딩이 제한될 수 있다.

```sh
node docs/hanja-g4-chaek-hoe-ja-2026-09-14/verify.mjs --online
node --test lib/hanja*.test.ts
```

## 후보 데이터의 출처·라이선스

冊·灰의 중심선은 [Make Me a Hanzi](https://github.com/skishore/makemeahanzi/tree/bddc96d41bef78427ed0e034e9f7e31d71fd1b92), 姉의 중심선은 [AnimCJK](https://github.com/parsimonhi/animCJK/tree/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6)의 문자 그래픽에서 발췌했다. 원래 점·획 경계는 `originals.json`에 보존했고, 대조 화면에는 좌표 정규화만 적용했다. 사전 경로를 추출한 결과가 아니다.

이 후보 데이터와 파생 경로에는 기존 [Make Me a Hanzi 고지](../../public/hanja-strokes/MAKEMEAHANZI-COPYING.txt), [AnimCJK 고지](../../public/hanja-strokes/COPYING.txt), [Arphic Public License](../../public/hanja-strokes/ARPHICPL.txt)가 적용된다. AnimCJK 저작권은 2016–2026 FM&SH이며 원 출처·라이선스를 유지한다. 이 폴더를 별도로 배포할 때도 해당 고지와 라이선스를 함께 제공해야 한다.
