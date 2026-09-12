# Batch8 B → A 독립 교차 검토

2026-09-12 · /root/hanja_b6_b

諸·齊·縱·坐·珠 5자·64획을 원문부터 독립 재검토했습니다. 모두 통과했습니다. 전체 개별 영상 2fps, 64개 완료 상한 10fps, 모든 실제 폭5 누적 경로를 직접 대조했습니다. Ja 원본 전체 파일을 새로 받아 SHA와5자 원본 좌표도 검산했습니다.

坐의 오른 人 삐침 끝과 중앙 세로 사이 좁은 흰 간격이 기존 경로에서 붙는 점을 발견했습니다. 작성자가 끝점을 보정한 뒤 완성형과7개의 누적 상태를 다시 확인했습니다. 諸의 별도 점은12.6–13.5초10fps에서 독립 재생을 확인했으며 원본 없는 null 계보를 유지합니다.

- **諸 (16획):** Complete row1328 independently shows 言7 then 者9. The detached right dot is separately painted after the long falling11th stroke; fresh12.6–13.5s10fps samples confirm the new12th stroke. Ja original15 omits it, so null lineage is accurate. Actual width5 keeps 言/者 bars, detached dot, and lower 日 spaces; all16 cumulative states and final source match.
- **齊 (14획):** Complete row1336 independently shows14 strokes: upper dot/bar, paired short marks/central vertical, left hooked shape and falling stroke, right three strokes, lower left wall then two bars and final right wall. All14 completed samples match. Actual lower two bars remain detached from both walls as visible in the final source; upper connections and direction match.
- **縱 (17획):** Complete row1364 shows 糸 central vertical before its left sweep/right dot, followed by 彳 and right-side 人/下部 sequence. The original4/5 exchange follows actual video. Reopened13.5/14.8/15.3/19.4s confirms touching adjacent 人 and lower short sweep joining 彳 post; source strokes remain separate playback units. All17 completion samples and cumulative states match.
- **坐 (7획):** Complete row1365 shows two 人, horizontal5, central vertical6, bottom7. All7 completed samples match. Independent11.2s700px plus3.7/8.8/9/11.2s420px review found a narrow white gap between right 人 falling3 and vertical6. Author changed output3 endpoint to[54,54.4]; revised actual width5 final and all7 cumulative states now preserve that gap. Left 人 right mark also remains detached.
- **珠 (10획):** Complete row1384 shows 王 upper bar, middle bar, vertical, rising base, then 朱6. Original2/3 exchange is source-observed. All10 completion samples and cumulative states match. Actual width5 preserves the separated 王/朱 horizontal ends and upper short sweep-to-lower bar gap while keeping short sweep-to-upper bar and central crossings connected.

최종 작성 파일 SHA: `255068c9c84594f35e161e6f55c867913710047b5511c0afc07144107da9fabf`. 글자별 원문·레코드·레시피·경로·완료 표본 핀은 [peer-b.json](peer-b.json)에 기록했습니다. 실제 생성기 검산 오류0개입니다.
