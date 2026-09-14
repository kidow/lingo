# 冊·灰·姉 19획 보정·적용

2026-09-14. 앞선 전체 필순 관찰에서 확인한 차이를 보정하고, 세 글자의
19개 누적 상태를 시작·끝 표시와 브라우저 재생으로 다시 확인했다.

| 글자 | 획 | 보정 | 결과 |
|---|---:|---|---|
| 冊 | 5 | 1획을 세우고, 원본 3획 가로를 마지막으로 이동 | 적용 |
| 灰 | 6 | 3획을 왼쪽 아래로 보정, 6획의 위쪽 시작 구간 복원 | 적용 |
| 姉 | 8 | 4·8획을 같은 축의 별도 세로로 보정하고 5획에서 연결 | 적용 |

국내 민간 사전 e-hanja의 해당 글자 전체 필순을 비교 근거로 사용했다.
한국어문회나 교육부가 이 경로를 인증했다는 뜻은 아니다. 사전 원본의
윤곽·중심선·스크립트·화면 이미지는 저장하거나 앱에 복제하지 않았다.

- [앞선 19획 방향 관찰](../hanja-g4-chaek-hoe-ja-2026-09-14/observations.json)
- [정확한 원본 URL·해시](../hanja-g4-held-11-2026-09-14/sources.json)
- [보정 내역](corrections.json) · [고정 경로](candidate-paths.json)
- [검토 승인 기록](review.json) · [보정 전후 비교 화면](review.html)
- [검증 결과](verification.json)

冊·灰의 기하 원본은 Make Me a Hanzi, 姉는 AnimCJK Japanese다.
14개 경로는 원본을 유지하거나 순서만 바꾸었고, 5개 경로를 직접 보정했다.
이후 출처 번들에서도 두 기하 원본을 구분한다. 원본과 수정한 중심선은
[Arphic Public License](../../public/hanja-strokes/ARPHICPL.txt)를 따른다.
[MM 고지](../../public/hanja-strokes/MAKEMEAHANZI-COPYING.txt),
[AnimCJK 고지](../../public/hanja-strokes/COPYING.txt)를 함께 유지한다.

재검증: `node docs/hanja-g4-corrections-2026-09-14/verify.mjs --online`
온라인 검사는 정확한 세 원본의 바이트 수·SHA-256만 메모리에서 대조한다.
경로 재구성, 출처·승인 기록 고정, 잘못된 방향·자형·경로 거부는
`lib/hanja-stroke-g4-corrections.test.ts`와 공통 검사에서 확인한다.

적용 후 전체 1,493 / 5,978자, 3급II까지 누적 1,492 / 1,500자다.
해당 범위의 미적용 8자는 液·藝·衛·砲·豊·筋·獎·鍾이다.
다음 권장 검토는 液·砲·筋 3자·33획이다.
