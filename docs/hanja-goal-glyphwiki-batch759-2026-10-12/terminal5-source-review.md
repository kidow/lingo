# 噳 9획 terminal5 원본 꼬리 분리 후보

검증 범위: 공개 고정 엔진 질의, 실제 cdDrawLine 실행 및 원본 polygon 보존. 브라우저 재검토 대기이며 런타임 승인이 아닙니다.

출처: [kagecd.js 고정 원본 887–906행](https://github.com/kamichikoichi/kage-engine/blob/49232bac0348fe815f4200d4116ab7917e0db47f/kagecd.js#L887). 함수 cdDrawLine의 Mincho → 수평 → a1=6 → a2=5 → 오른쪽 진행 분기입니다. 엔진 SHA는 terminal5-source-review.json에 기록했습니다.

원본 call [126.15,85,174.95,85,3006,5]에서 opt1=floor(3006/1000)=3, width=6−3/2=4.5, jump=5×(4×(1−3/5)+1)=13입니다. 마지막 polygon [(174.9,80.5),(176.9,67.5),(174.9,67.5),(170.4,80.5)]를 몸통 마스크에서 분리해 같은 9획의 추가 up 마스크로 표시합니다. 정규화 bounds [85.2,33.75,88.45,40.25]와 원본 높이/2=6.5를 사용합니다.

이 direction과 시간 weight는 원본 상향 polygon의 렌더링 해석입니다. 엔진은 별도 꼬리 중심 경로를 제공하지 않으므로 새 centerline을 만들지 않습니다. 기존 경로와 revealWidth14, 모든 윤곽 좌표를 유지합니다. 총 16펜·17마스크 후보이며 원본 polygon 전부를 정확히 한 번씩 보존하는지 검사합니다.

verify-terminal5.mjs는 공개 소스 3파일 SHA 확인, 실제 마지막 cdDrawLine 출력 전체 일치, 생성 공식 일치, 전체 원본 polygon 일치, 좌표·끝점·기본값 변조 거부를 검사합니다. private 사전 이미지를 사용하지 않았습니다. 빌드·등록·커밋을 수행하지 않았습니다.
