# 粻 원 full8 정적 대조 준비

원 `engine-whole-u7cbb.json`의 8개 키 전체와 `sourceRoot/sourceProofFile/sourceArchiveSHA256`을 그대로 사용합니다. full5 추출·헤더 합성·SVG 재작성은 없습니다. 원 15raw·15calls·30 polygon을 국내 14획과 대조할 준비이며, 기존 sourceGroups에서 옮긴 provisional 행은 `[1]…[11],[12,13],[14],[15]`입니다. 이 매핑은 코드상 원자료 전달일 뿐 ROOT의 시각 승인으로 취급하지 않습니다.

`docs/hanja-shared-patches-2026-10-23/u7cbb-static-full8-only.patch`는 적용됐습니다. launcher는 정확한 粻 파일 경로·SHA·원 8키·원 provenance3에만 한정한 검증/로더를 사용하고 원 full8 객체를 통째로 반환합니다. 기존 full5/body3 기본 분기와 공용 SVG 함수·동결 shared serve 파일은 보존하며, board의 launcher SHA 핀을 갱신했습니다.

준비 단계 Python AST 2개와 새 full8 guard 양성 1개·음성 9개를 통과했습니다. 원 8키 전체 반환과 14행/15raw 정확히 1회 배정을 확인했고, 적용 후 최초 `--check-only`도 통과했습니다. ROOT의 브라우저 패널 정적 대조는 `native-review.json`에 기록했습니다. 이는 정적 자형·대응 검토이며, 애니메이션·미세 시계·런타임 승인과는 별도입니다. 엔진·투영은 실행하지 않았습니다.
