# 遷: 10~11획 방향 보강 및 15획 후보 대조

검토 완료: 2026-09-14. 후보 15획의 순서·방향·누적 자형 검토를 마쳤다. **서비스 등록은 아직 하지 않았다.** 현재 적용은 1,489자, 3급II는 499/500자이며 遷이 남아 있다.

## 확인 결과

- **10획**: 오른쪽 위로 가로를 긋고 아래로 꺾은 뒤 왼쪽 위로 거둔다. 기존 후보의 주 진행과 끝 방향이 맞았다.
- **11획**: 왼쪽 세로를 내려가 밑을 오른쪽으로 돌아 끝을 왼쪽 위로 올린다. 후보의 거의 수직이던 마지막 구간을 끝점 하나만 이동해 보정했다.
- **13~14획**: MM 원본의 책받침 굽음 한 획을 자료의 두 획에 맞춰 분리했다. 전환점은 공유하고 원본 점을 누락하거나 역전하지 않았다.
- **전체 15획**: 국내 누적·번호 도해와 교육부 플레이어를 대조했다. 후보의 15개 누적 SVG를 확인하고, 선 두께 5 기준의 주요 내부 간격과 책받침 연결을 검사했다.

짧은 붓 시작 보조 구간과 비례에는 원본 사이 차이가 있다. 검토 범위는 필순·주 진행 방향·획 구분·누적 자형이며, 외곽을 복제하거나 모든 미세 중심점이 일치한다고 판정한 것은 아니다.

## 출처와 이용 범위

1. [모야랜드 遷](https://www.moyaland.com/_new/hanja/item_01.php?it_id=1428026156): 국내 15단계 순서·번호 도해. 이전 [출처 조사](../hanja-g3ii-cheon-2026-09-13/README.md)를 보존했다. 같은 제공자의 두 그림을 독립 출처 두 개로 계산하지 않는다.
2. [대만 교육부 遷](https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID=36983): 동일 자형의 공식 15획 애니메이션. 10~11획의 끝 방향과 13~14획 분리를 보강했다. 국내 시험기관의 공식 승인을 뜻하지 않으며 두 제공자 자료의 제작상 독립성도 확인하지 못했다.
3. [CNS 遷](https://www.cns11643.gov.tw/wordView.jsp?ID=94031): 15획이라는 획수만 보조 확인한다.

교육부 공개 페이지의 15개 Track과 전체 도해를 다시 읽고 해시를 검증했다. 해당 애니메이션의 CC BY-NC-ND 3.0 TW 조건을 고려해 외곽·Track·미디어·코드를 앱이나 저장소에 복사하지 않았다. 후보 기하는 기존 **Make Me a Hanzi / Arphic Public License** 원본 중심선에 명시적인 로컬 보정을 적용했다. 출처·라이선스·수정 기록은 [sources.json](sources.json), [originals.json](originals.json), [recipe.json](recipe.json)에 있다. 관련 라이선스는 [ARPHICPL.txt](../../public/hanja-strokes/ARPHICPL.txt)와 [MAKEMEAHANZI-COPYING.txt](../../public/hanja-strokes/MAKEMEAHANZI-COPYING.txt)를 따른다.

## 재현 및 검증

```sh
node docs/hanja-g3ii-cheon-paths-2026-09-13/verify.mjs --live
node --test lib/hanja*.test.ts
node docs/hanja-g3ii-cheon-paths-2026-09-13/serve.mjs
```

서버가 출력하는 loopback 주소로 [review.html](review.html)을 연다. 국내 원문 이미지는 출처에서 읽어 해시 확인 후 메모리에서만 제공한다. 교육부 재생 화면은 공식 링크로 따로 확인한다. 임의 URL을 중계하지 않는다.

- [candidate.mjs](candidate.mjs): 고정 원본과 레시피로 15획 재현.
- [candidate-before.json](candidate-before.json) / [candidate-paths.json](candidate-paths.json): 11획 끝점 보정 전·후 고정 자료.
- [review.json](review.json): 각 획의 대조 결과와 브라우저 관찰 기록.
- [verify.mjs](verify.mjs): 후보 해시·보정 범위·방향·간격·연결, 역방향/병합/접합점 변경 등 6개 거부 사례, 이전 근거와 실행 데이터 불변 검증.
- [verification.json](verification.json): 실제 실행 결과. 기존 한자 테스트 28개 파일의 **186개 테스트 통과**.

다음 작업은 이 검토 결과를 서비스용 출처·경로 등록부에 연결하고 遷 15획을 활성화하는 것이다. 이때 3급II 500/500자와 기존 필순 검증이 함께 통과하는지 확인한다. 이번 검토만으로 실행 데이터의 승인을 자동 변경하지 않는다.
