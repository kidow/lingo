# 梲 · batch961 source 보류

u68b2-ue0100 13raw/15draw/29polygon → 연속 최소12그룹; u68b2 13raw/15draw/29polygon → 연속 최소12그룹. 사전·기록된 국내 기준11획을 초과합니다. 빈 raw·빈 polygon은 없고 원본 raw 내부의 복수 draw는 모두 정확히 연결됩니다.

비연속 접촉 [[7,10]]은 왼쪽 세로획 끝과 뒤의 바닥 가로획 시작이 만나는 좌표상의 접촉입니다. 중간 raw를 건너 하나의 획으로 취급할 native 근거가 없으므로 획수에 맞추려고 결합하지 않습니다. 추가 상단raw5/6도 실제[-12.72,0] 간격이 있어 connector 없이 연결할 수 없습니다.

새 compiler 실행은 하지 않았습니다. 원본 endpoint 계산으로 최소 연속 그룹을 확인했습니다. 원본 source·metadata·NOTICE·helper와 기존 pin은 보존합니다. 새 path·mask·폭·보간을 만들지 않았습니다.

Native whole·방향·진행 프레임·fine·재생은 이 보류 조사에서0이며 runtime 미적용입니다. 955까지의 canonical 이력에서 중복 보류는 없었습니다. 새 canonical 보류 계수와 resume는 root가 순서대로 확정할 때까지 추가하지 않습니다.
