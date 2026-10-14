# 瘦 source-only 1123

고정 전체 원본 8종과 명시 history 3건을 재현했다. 국내 15획과 배정 14획을 분리 보존한다. 수치 후보는 u7626-k의 원본 15획이며 연속 authored endpoint만 묶었다. 기존 전체 native 보류는 유지되고 접속·순서·방향·fine·coarse·replay는 새로 승인하지 않았다.

source-analysis.json에 기존 보류 근거와 입력 SHA, source-join-analysis.json에 전체 원본 primitive·geometry 중복·원본 그룹을 기록했다. verify-source.mjs는 저장한 public 원본 SHA·명시 whole identity·preset·원본 polygon exact-once·좌표 보존·변조 거부를 검증한다. 국내 SVG는 RAM-only이고 runtime·빌드·커밋 변경은 없다.
