# 庾 · source-only whole/raw native preparation

Catalog 11획 / 국내 고정 SVG 12획 충돌을 유지합니다. 오른쪽 raw는 국내 획으로 승인된 단위가 아닙니다. 양쪽 번호는 독립 선택하며 자동 1:1 매핑·병합·순열 선택을 하지 않습니다.

- `rtk proxy python3 -B -u /Users/kidow/Documents/dev/kidow/lingo/docs/hanja-hold-recovery-native-prep-u5ebe-2026-10-18/serve-native.py --port 0`
- 출력의 PID·동적 포트를 기록하고, 검토 종료·보류 시 서버와 래퍼를 종료합니다. 이번 준비 작업에서는 서버를 시작하지 않습니다.
- `/whole?id=u5ebe`: 왼쪽 국내 전체, 오른쪽 선택 whole의 원 polygon 전체. 고정 family 10개 모두 선택할 수 있습니다.
- `/pairs?id=u5ebe&pairs=1:1,2:3`: 국내 번호:공개 raw 번호를 각각 지정(1-based). 오른쪽은 선택한 raw만 표시하고 누적 prefix를 그리지 않습니다. 예시 번호는 필순 대응을 주장하지 않습니다.
- `--check-only`: 원본/새 helper byte SHA, full5 proof, 엔진8핀, group/trace polygon 대응을 정적으로 확인합니다. HTTP·엔진·compiler·서버 실행이 없습니다.

## Preserved identity

원 캡슐 24개 파일과 국내 RAM 렌더러/메타데이터 2개를 config의 immutablePins로 고정합니다. 원 full5 스키마는 defaults/engineHashes/engineRevision/groups/trace 그대로입니다. source decomposition·raw 순서·빈 raw·모든 polygon 좌표를 보존합니다. 실행 시 국내 SVG는 기존 SHA/bytes/title/clip 타임라인 검증 렌더러의 RAM cache에만 존재하며 파일·스크린샷으로 저장하지 않습니다.

기존 source-analysis metadata SHA `f9dab2c67930563ccfa29987db229268edb420e85ef3167136f6301d49f65cb1`와 현재 metadata 바이트 SHA `66915aa8d2604eda275afd201c62b76c8e7c5ab37b6892ef486d33b465b9a548`는 다릅니다. 두 원파일을 수정하지 않으며, 새 config는 양쪽 값을 별도로 고정하고 차이를 화면에 표시합니다. 과거 전체 자형 기록은 참고 표기일 뿐 이번 native 승인으로 상속하지 않습니다.

진행형 path/mask·새 연결점·폭·보간·획 분할/합치기를 생성하지 않습니다. source compile/engine 재생성 0, native 승인 false, runtime 적용 false.
