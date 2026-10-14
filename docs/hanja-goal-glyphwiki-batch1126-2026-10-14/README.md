# 萍 source-only 1126

고정 전체 원본 6종과 명시 history 5건을 재현했다. 국내 12획과 배정 12획을 분리 보존한다. 수치 후보는 없음; 기존 water 경계와 K13>국내12 보류 유지이며 연속 authored endpoint만 허용한다. 기존 partial native 보류는 유지되고 접속·순서·방향·fine·coarse·replay는 새로 승인하지 않았다.

source-analysis.json에 기존 보류 근거와 입력 SHA, source-join-analysis.json에 전체 원본 primitive·geometry 중복·원본 그룹을 기록했다. verify-source.mjs는 저장한 public 원본 SHA·명시 whole identity·preset·원본 polygon exact-once·좌표 보존·변조 거부를 검증한다. 국내 SVG는 RAM-only이고 runtime·빌드·커밋 변경은 없다.
