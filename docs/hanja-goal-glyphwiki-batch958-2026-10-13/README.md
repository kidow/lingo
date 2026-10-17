# 蘀 · batch958

국내 전체 자형과 비교하여 분리된 grass를 보존하는 원본VS2만 선택했습니다. Base는 연결된 grass로 호환되지 않습니다. 실제 브라우저 whole 관찰은 base·VS2의2개이며, VS0·VS1은 base와 고정 proof byte가 동일하다는 근거로 재사용했습니다. 실제4개 화면을 모두 관찰했다고 집계하지 않습니다.

원본 pen3/4 전체 mask를 오른쪽 grass의 가로획·세로획 순서로 바꿨습니다. 나머지 원본 경로·폭·방향·좌표와20획·21mask·41polygon은 보존합니다. Root가 보정3/4획 방향과18프레임을 새로 확인했고, 불변 mask의 기존162프레임·fine6개·6획 경계와95% probe를 재사용했습니다. 보정 helper의6획 실제 재생AX2.575→100 및 완료 화면도 확인해 총180프레임을 승인했습니다. 6획의 정적인 AA 경계는99.99%와100%에 함께 남는 선으로 완료 시 튀는 현상이 아닙니다.

원본19개 pin과 전체21파일, 준비4파일은 그대로 보존합니다. Full8 proof와 정확한 root/file/fileSHA256 identity3개 필드, 필수3인자 `compileProgressive` 계약을 선언 파일에 유지했습니다. Source-only 준비 문서의 native/runtime false는 준비 시점의 상태이며 최종 승인은 별도 `review.json`에 기록했습니다.

957 checkpoint의5488자·490자·보류269자를 상속해5489자 적용·489자 남음을 기록합니다. 보류는 추가하지 않습니다. 다음은驒959입니다. Registry 연결 뒤 focused test와 `verify-runtime.mjs`를 실행하며 빌드·배포는 실행하지 않습니다. 앱 자동재생 UI를 새로 검증했다고 주장하지 않습니다.

Root의 registry 연결 후 focused test1회에서3개 모두 통과했고, runtime verifier도1회 실행하여20획·21mask·41polygon·180프레임과 원본 보존을 확인했습니다. 두 종료 코드는0입니다. 기존 verifier가 public 파일 `glyphwiki/u8600.json`의 metadata root는 선택된 `u8600-ue0102`임을 직접 검증했습니다.
