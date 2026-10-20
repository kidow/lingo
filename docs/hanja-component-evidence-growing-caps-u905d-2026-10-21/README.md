# 遝 실제 앱의 불변 바이트

앱 커밋 `1067f5eff229dff560310c5619b61910b33c967d`의 module/test/component 세 파일을 byte 그대로 고정합니다. resolver는 원경로+기대 SHA 정확쌍, arity와 Buffer만 허용하고 live 파일 대체를 금지합니다. 과거 snapshot의 승인 값은 영구 false이며 향후 실제 브라우저 검토와 별개입니다. 기존 정책은 해당 과거 resolver로만 읽습니다. 원 full5/id5·14p15m31과 Q/C 두 target은 변경하지 않습니다.

새 snapshot 검사 1회만 수행하며 기존 앱·원 source 검사는 반복하지 않습니다. 서버·브라우저·runtime·appUI·Git·빌드 실행0입니다.
