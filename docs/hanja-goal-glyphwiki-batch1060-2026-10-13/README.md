# 饎 — 원본 base 필순 적용

국내 사전과 대조한 기존 base `u994e`를 사용합니다. VS0·VS1도 전체 자형은 호환되며, VS2는 왼쪽 食 내부와 하단 두 획이 달라 제외했습니다. 기존21획 PROFILE과 빈 raw10 metadata를 보존하고, 전체 mask 목록의 참조 순서만 보정했습니다. 새 좌표·경로·폭·연결선은 만들지 않았습니다.

- 최종: 21획·21mask·40polygon, 원자료9records·4whole·0providers 보존.
- 순서: `[1,2,3,5,6,7,4,8,9,10,11,12,13,14,15,17,16,18,19,20,21]`.
- 최종 compiled SHA256: `51264dd75001df5156faae485cefc83c39a33ff9194f29087c66c5e3f7da80de`.
- root 브라우저 검토: 21방향·189coarse(원135·보정54) PASS. 실제520px fine 1·2·4·14·16·17·20획 PASS(원1·2·14·20 동일mask/prefix 재사용, 보정4·16·17 신규). 14획은 올바른75×120crop에서 종단 동일을 재확인했으며 잘못된 빈crop2장은 근거에서 제외했습니다.
- mask 경계0. 보정4획 실제520px 자연 재생2.6525→100.0000% PASS. 앱 자동재생 UI는 이번 회차에 검증하지 않았습니다.
- 원20파일·기존 strict6·신규 base6·order5·공유renderer3의 바이트를 보존합니다. 외부 full5/id5 필수3/4인자→기존 full8/id3 bridge를 유지합니다.
- base/order source 검증 각각 positive1·거부27, engine0. Runtime fixture는 실제 보유한 최종 RAM 자료를 재사용해 추가 compile0입니다. root가 보고한 base/final cached runner는 각각 import1·request0입니다.

원본 NOTICE와 준비 문서의 native/runtime false는 역사적 상태로 유지합니다. Runtime 모듈은 직접 EXPECTED 상수를 내보내며 JSON을 import하지 않습니다. LicenseRef-GlyphWiki·원본 수정 설명은 배포 fixture와 공개 NOTICE에 보존합니다.

집중테스트3/3·verify 구문·root registry actual 검증을 각1회 실행해 모두 PASS했습니다. 실제1059 부모 SHA를 확인했으며, 적용 후 누적5,544/5,978자·미적용434자·기존보류316자입니다. Compact 목록 생략은 기존 보류 삭제가 아닙니다. 다음은1061爔20획입니다. Root는1060 base/final 및 이전VS2 서버와 wrapper 종료를 보고했습니다. 앱 자동재생 UI·빌드·전체테스트·Git·서버 실행0입니다.
