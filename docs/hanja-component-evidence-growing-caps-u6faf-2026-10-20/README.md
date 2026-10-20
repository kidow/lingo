# 澯 앱 당시의 고정 바이트 증거

앱commit86c29e9a5a1ea646d7cf789c5caf8104ce2e8d9a의 main/test,CAN/test,StrokeOutlines 총5원파일 bytes를변환없이보존합니다. resolver는정확한원경로+기대SHA쌍만허용하고Buffer의실제SHA를재검사하며어떤live앱파일도읽지않습니다. 원snapshot/다른후보승인을변경하지않고실제컴포넌트native/runtime승인은이역사기록에덮지않습니다.

이9파일 자체는 native/actualAppUI/runtimefalse로영구유지합니다. 별도CAN하네스에서DI/SI는각기존frozenresolver로정확원경로/SHA를읽고새복사본을만들지않습니다. 새후보는2개의원Q만허용하며sourcegeometry/compiler/engine/서버/UI/빌드0입니다.

check.mjs는새5바이트와경로/SHA/Buffer/arity/변조반례만최초1회검사하며기존source/app검사·다른후보검사를호출하지않습니다.
