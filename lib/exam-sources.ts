import type { TrackId } from './track.ts'

/**
 * 기출·모의고사 — 트랙마다 시험 대비 문제를 풀 수 있는 곳. (spec.md §3)
 *
 * **문항은 한 개도 싣지 않는다. 링크만 모은다.** 조사한 출처 가운데 재사용을
 * 허락하는 곳이 하나도 없었다 — 한국TOEIC위원회는 문항 저작권이 ETS에 있다며
 * 인용·복제·발췌를 막고, 한국어문회는 온라인 서비스에 쓰려면 사용료 계약을
 * 하라고 한다 (docs/exam-prep-sources-2026-09-27.md). 풀이는 그곳에서 한다.
 *
 * **고른 기준.** 공식은 다 넣는다. 비공식은 운영 주체와 문항 출처가 드러나고
 * 무료로 풀어 볼 수 있는 곳만 넣는다. 이런 곳은 확인될 때까지 뺐다.
 * - 출처를 밝히지 않은 채 「기출」을 내세우는 곳(JLPTCODE — JLPT는 매회 문제를
 *   공개하지 않는다)
 * - AI로 만든 문항(OpenExamPrep)
 * - 허락 여부를 모르는 재게시(EBS 한자 기출, JLPT Sensei, 공식 PDF 미러)
 *
 * 침해 게시물에 계속 링크를 거는 것도 방조가 될 수 있다(대법원 2021. 9. 9.
 * 선고 2017도19025 전원합의체) — 목록에 올리는 순간 우리 책임이다.
 *
 * **기출이라 부르는 것은 `past`뿐이다.** 한국에서 치른 회차 문제가 공식으로
 * 공개된 곳(TOEIC 실제기출, 한능검)과 실제 출제 문항을 모은 공식 문제집(JLPT),
 * 세계 공통 시험의 실제 시행분(DELE)이다. 나머지 트랙은 기출이 공개되지 않아
 * 모의·예시뿐이다 — 제목이 「기출·모의고사」인 이유다.
 */
export type ExamSourceKind = 'past' | 'mock' | 'unofficial' | 'other-exam'

export type ExamSource = {
  /** ^[a-z0-9-]+$, 파일 전체에서 유일 */
  id: string
  track: TrackId
  kind: ExamSourceKind
  /** 목록 첫 줄 */
  name: string
  /** 원 사이트. 안내 페이지를 먼저 걸고 PDF·ZIP 파일로 바로 걸지 않는다 */
  url: string
  operator: string
  /** 「무료」가 아니면 무엇을 내야 하는지 */
  cost: string
  /** 돈을 내야 풀 수 있다. 목록 뒤로 간다 */
  paid?: boolean
  /** 교재를 사야 쓸 수 있는 부록. 목록 뒤로 간다 */
  bundled?: boolean
  /** 들어가기 전에 알아야 할 벽 — 로그인·계정·등록 */
  login?: string
  /** 레벨·영역·세트 수 */
  scope: string
  format: string
  note?: string
  /** 이 날까지만 목록에 선다 (YYYY-MM-DD, 그날 포함) */
  until?: string
}

/** 표의 URL을 모두 열어 본 날 */
export const EXAM_SOURCES_CHECKED = '2026-09-27'

export const EXAM_KIND_LABEL: Record<ExamSourceKind, string> = {
  past: '공식 기출',
  mock: '공식 모의',
  unofficial: '비공식',
  'other-exam': '다른 시험',
}

export const EXAM_SOURCES: ExamSource[] = [
  // ── TOEIC ─────────────────────────────────────────────────────────
  {
    id: 'toeic-real-questions',
    track: 'toeic',
    kind: 'past',
    name: '한국TOEIC위원회 실제기출문제',
    url: 'https://exam.toeic.co.kr/content/common/realQuestion.php',
    operator: '한국TOEIC위원회',
    cost: '무료',
    scope: '한국 정기시험에 실제로 나온 문항, 18차(2026 상반기)까지 Part 1–7별',
    format: '영상(YouTube)',
    note: '문항 저작권은 ETS에 있습니다. 반기마다 새 회차가 붙습니다.',
  },
  {
    id: 'toeic-ybmclass-real',
    track: 'toeic',
    kind: 'past',
    name: 'YBM CLASS 정기시험 실제 기출문제',
    url: 'https://free.ybmclass.com/free/toeic/toeic_exam.asp',
    operator: '와이비엠넷(ETS 라이선스)',
    cost: '무료',
    scope: 'Vol.1–18, 회차·Part별',
    format: '영상',
  },
  {
    id: 'toeic-kr-sample',
    track: 'toeic',
    kind: 'mock',
    name: '한국TOEIC위원회 샘플문제',
    url: 'https://exam.toeic.co.kr/content/TOE/sampleLc1.php',
    operator: '한국TOEIC위원회',
    cost: '무료',
    scope: 'LC 4쪽 · RC 8쪽, 파트별 예시',
    format: '웹 · MP3',
  },
  {
    id: 'toeic-ets-sample',
    track: 'toeic',
    kind: 'mock',
    name: 'ETS 샘플 테스트',
    url: 'https://www.ets.org/toeic/test-takers/prepare.html',
    operator: 'ETS',
    cost: '무료',
    scope: '파트별 발췌 34쪽(200문항 전체는 아님)',
    format: 'PDF',
  },
  {
    id: 'toeic-level-projector',
    track: 'toeic',
    kind: 'mock',
    name: 'TOEIC Level Projector',
    url: 'https://www.etsglobal.org/cm/en/practice-test/toeic-level-projector',
    operator: 'ETS Global',
    cost: '무료',
    login: '계정 필요',
    scope: '실제 LC 문항 25개, 15분, CEFR 판정',
    format: '웹 풀이',
  },
  {
    id: 'toeic-hackers-daily',
    track: 'toeic',
    kind: 'unofficial',
    name: '해커스 매일 토익 풀기',
    url: 'https://www.hackers.co.kr/?c=s_toeic%2Ftoeic_study%2Fdrc&m_mid=drc',
    operator: '해커스',
    cost: '무료',
    scope: '하루 5문항(RC Part 5 · LC Part 1–3), 날짜별 아카이브',
    format: '웹 풀이 · 해설 · MP3',
  },
  {
    id: 'toeic-hackers-mock',
    track: 'toeic',
    kind: 'unofficial',
    name: '해커스 모의토익',
    url: 'https://www.hackers.co.kr/?c=s_toeic%2Ftoeic_winter%2Fmocktoeic',
    operator: '해커스',
    cost: '무료',
    scope: '시험일별 LC/RC 출제예상 모의고사',
    format: '웹 풀이 · PDF',
  },
  {
    id: 'toeic-eduwill',
    track: 'toeic',
    kind: 'unofficial',
    name: '에듀윌 무료 모의고사',
    url: 'https://toeic.eduwill.net/toeic/mocktest',
    operator: '에듀윌',
    cost: '무료',
    scope: '최신 모의고사와 예상 점수 · 백분위',
    format: '웹 풀이',
  },
  {
    id: 'toeic-siwon-daily',
    track: 'toeic',
    kind: 'unofficial',
    name: '시원스쿨랩 토익 데일리 퀴즈',
    url: 'https://lab.siwonschool.com/?s=free&p=dailyquiz',
    operator: '시원스쿨',
    cost: '무료',
    login: '로그인 필요',
    scope: '평일 LC · RC 5문제',
    format: '웹 풀이',
  },
  {
    id: 'toeic-ybm-part5',
    track: 'toeic',
    kind: 'unofficial',
    name: 'YBM 토익 파트 5 스피드 퀴즈',
    url: 'https://free.ybmclass.com/free/toeic/toeic_5min.asp',
    operator: '와이비엠넷',
    cost: '무료',
    scope: 'Part 5, 회당 4문항 30회',
    format: '웹',
  },
  {
    id: 'toeic-englishteststore',
    track: 'toeic',
    kind: 'unofficial',
    name: 'EnglishTestStore Free TOEIC Tests',
    url: 'https://englishteststore.net/index.php?option=com_content&view=category&layout=blog&id=546&Itemid=352',
    operator: 'EnglishTestStore',
    cost: '무료',
    scope: '실전 49회 + Part별 세트',
    format: '웹 풀이(영어)',
  },

  // ── JLPT ──────────────────────────────────────────────────────────
  {
    id: 'jlpt-official-book',
    track: 'jlpt',
    kind: 'past',
    name: 'JLPT 공식문제집',
    url: 'https://www.jlpt.jp/e/samples/sampleindex.html',
    operator: '국제교류기금 · 일본국제교육지원협회',
    cost: '무료',
    scope: 'N1–N5, 2012판 · 2018판 각 1회분(실제 출제 문항에서 선별)',
    format: 'PDF · MP3',
    note: 'JLPT는 매회 문제를 공개하지 않습니다. 실제 출제 문항을 볼 수 있는 곳은 이 두 권뿐입니다.',
  },
  {
    id: 'jlpt-official-examples',
    track: 'jlpt',
    kind: 'mock',
    name: 'JLPT 공식 문제예',
    url: 'https://www.jlpt.jp/samples/forlearners.html',
    operator: '국제교류기금 · 일본국제교육지원협회',
    cost: '무료',
    scope: 'N1–N5, 문제 유형마다 예제 하나',
    format: '웹 풀이 · 음성',
  },
  {
    id: 'jlpt-rikee',
    track: 'jlpt',
    kind: 'unofficial',
    name: 'RIKEE 모의고사',
    url: 'https://rikee.jp/ko/exams/',
    operator: 'WayneMVRS',
    cost: '웹은 레벨당 1회 무료',
    login: '응시 등록',
    scope: 'N1–N5 26회, 회당 67–74문항 + 청해',
    format: '웹 풀이 · 해설',
  },
  {
    id: 'jlpt-japanesetest4you',
    track: 'jlpt',
    kind: 'unofficial',
    name: 'Japanesetest4you',
    url: 'https://japanesetest4you.com/',
    operator: '개인',
    cost: '무료',
    scope: 'N5–N1 문법 · 한자 · 어휘 · 독해 · 청해',
    format: '웹 풀이(영어)',
  },
  {
    id: 'jlpt-hackers',
    track: 'jlpt',
    kind: 'unofficial',
    bundled: true,
    name: '해커스일본어 학습자료실',
    url: 'https://japan.hackers.com/?r=japan&m=mp3&front=mp3%2Fmp3_free',
    operator: '해커스',
    cost: '교재 부록',
    login: '로그인 필요',
    scope: '교재별 실전 모의고사',
    format: 'PDF · MP3',
  },
  {
    id: 'jlpt-darakwon',
    track: 'jlpt',
    kind: 'unofficial',
    bundled: true,
    name: '다락원 학습자료',
    url: 'https://www.darakwon.co.kr/studydata/?pc_id_2=9',
    operator: '다락원',
    cost: '교재 부록',
    scope: '『JLPT 한권으로 끝내기』 등의 테스트 자료',
    format: 'PDF · MP3',
  },
  {
    id: 'jlpt-sisa',
    track: 'jlpt',
    kind: 'unofficial',
    bundled: true,
    name: '시사일본어사 자료실',
    url: 'https://www.sisabooks.com/jpn/board/lists/data?sitecode=A&sCate=23',
    operator: '시사북스',
    cost: '교재 부록',
    login: '로그인 필요',
    scope: '교재 모의고사의 정답 · 해설 · 청해 스크립트',
    format: '첨부 파일',
  },

  // ── HSK ───────────────────────────────────────────────────────────
  {
    id: 'hsk-cti-past',
    track: 'hsk',
    kind: 'past',
    name: '汉考 리소스 센터 真题',
    url: 'https://admin.chinesetest.cn/godownload.do',
    operator: '汉考国际(CTI)',
    cost: '무료',
    scope: '1–6급 급별 1세트 + 정답 · 듣기, 7–9급 샘플',
    format: 'PDF · MP3',
    note: '세계 공통 기출입니다. HSK 3.0과 형식이 달라 따로 연습해야 합니다.',
  },
  {
    id: 'hsk3-demo',
    track: 'hsk',
    kind: 'mock',
    name: 'HSK 3.0 샘플 · 체험',
    url: 'https://www.chinesetest.cn/',
    operator: '汉考国际(CTI)',
    cost: '무료',
    scope: 'HSK 3.0 샘플 문항과 체험 시험',
    format: '웹 체험 · ZIP',
    note: 'HSK 3.0은 2026년 12월 13일부터 전 세계에서 전면 시행됩니다.',
  },
  {
    id: 'hsk-hackers-ibt',
    track: 'hsk',
    kind: 'unofficial',
    name: '해커스중국어 iBT 모의고사',
    url: 'https://china.hackers.com/?c=event&evt_code=30282023',
    operator: '해커스',
    cost: '무료(기간 한정)',
    login: '신청 · 로그인',
    scope: '3–6급',
    format: '웹 iBT',
    until: '2026-10-16',
  },
  {
    id: 'hsk-mock',
    track: 'hsk',
    kind: 'past',
    paid: true,
    name: 'HSK Mock',
    url: 'https://hskmock.com/',
    operator: 'CTI · 我会中文 공동 개발',
    cost: '회당 US$8.99',
    scope: '2.0 1–6급(4급 10세트), 3.0 1–9급',
    format: '웹 · 앱(한국어)',
  },
  {
    id: 'hsk-korea-center',
    track: 'hsk',
    kind: 'past',
    paid: true,
    name: 'HSK시험센터 IBT 모의고사',
    url: 'https://www.hsk-korea.co.kr/mocktest/mocktest.aspx',
    operator: '대교(국내 시행처)',
    cost: '응시 쿠폰',
    scope: '1–6급 각 10세트 등, 출제기관이 제공한 실제 기출',
    format: '웹 IBT',
  },
  {
    id: 'hsk-korea-office',
    track: 'hsk',
    kind: 'past',
    paid: true,
    name: 'HSK한국사무국 공식 기출문제집',
    url: 'https://www.hsk.or.kr/',
    operator: 'HSK한국사무국',
    cost: '책 구매',
    scope: '1–6급 출제기관 공식 기출 + 해설',
    format: '책 · CD',
  },

  // ── TOCFL ─────────────────────────────────────────────────────────
  {
    id: 'tocfl-booklets',
    track: 'tocfl',
    kind: 'mock',
    name: 'TOCFL 모의문제 題本',
    url: 'https://tocfl.edu.tw/tocfl/index.php/exam/test/page/1?pressBtn=%28%E9%A1%8C%E6%9C%AC%29',
    operator: '華測會(SC-TOP)',
    cost: '무료',
    scope: '듣기 · 읽기 1–5輯, 준비급–Band C, 번체/간체, 일부 한국어판',
    format: 'PDF · MP3',
  },
  {
    id: 'tocfl-item-bank',
    track: 'tocfl',
    kind: 'mock',
    name: 'TOCFL 題庫 모의문제',
    url: 'https://tocfl.edu.tw/tocfl/index.php/exam/test/page/1?pressBtn=%28%E9%A1%8C%E5%BA%AB%29',
    operator: '華測會(SC-TOP)',
    cost: '무료',
    scope: '준비급–Band C 듣기 · 읽기 2,460문항',
    format: 'PDF · MP3',
    note: '학습용으로만 쓰고 영리 목적으로 쓰지 말라고 적혀 있습니다.',
  },
  {
    id: 'tocfl-official-bank',
    track: 'tocfl',
    kind: 'mock',
    name: '준비급 · 입문급 정식 문항은행',
    url: 'https://tocfl.edu.tw/index.php/exam/study_resources/page/7',
    operator: '華測會(SC-TOP)',
    cost: '무료',
    scope: '정식 시험에 나올 수 있는 문항, 듣기 · 읽기 유형별',
    format: 'PDF · MP3',
  },
  {
    id: 'tocfl-online-mock',
    track: 'tocfl',
    kind: 'mock',
    name: 'TOCFL 온라인 모의시험',
    url: 'https://tocfl.edu.tw/tocfl/index.php/exam/test/page/19',
    operator: '華測會(SC-TOP)',
    cost: '무료',
    scope: 'Band A/B/C 듣기 · 읽기, 적응형(CAT) 체험',
    format: '실제 시험 화면',
  },
  {
    id: 'tocfl-speaking',
    track: 'tocfl',
    kind: 'mock',
    name: 'TOCFL 말하기 모의문제',
    url: 'https://tocfl.edu.tw/tocfl/index.php/exam/test/page/37',
    operator: '華測會(SC-TOP)',
    cost: '무료',
    scope: '준비급–進階高階 7문항, 예시 음원 · 채점 설명',
    format: '음성 · 문서',
  },

  // ── DELE ──────────────────────────────────────────────────────────
  {
    id: 'dele-cervantes',
    track: 'dele',
    kind: 'past',
    name: 'Cervantes 실제 시행 시험 · Modelo 0',
    url: 'https://examenes.cervantes.es/es/dele/preparar-prueba',
    operator: 'Instituto Cervantes',
    cost: '무료',
    scope: 'A1–C2 Modelo 0 + 실제 시행 시험 1회씩(A1 · A2 2020, B1 · B2 2013, C1 2024.4, C2 2024.5)',
    format: 'PDF · MP3',
    note: '세계 공통 시험이라 한국에서 치른 회차와 같은 문제입니다.',
  },
  {
    id: 'dele-seoul',
    track: 'dele',
    kind: 'mock',
    name: '주한 세르반테스 문화원 DELE',
    url: 'https://seul.cervantes.es/ko/dele_diplomas/dele_diplomas.htm',
    operator: 'Instituto Cervantes 서울',
    cost: '무료',
    scope: 'A1–C2 Modelo 0, 한국어 안내',
    format: 'PDF',
  },
  {
    id: 'dele-youtube-speaking',
    track: 'dele',
    kind: 'mock',
    name: 'Cervantes DELE 말하기 실연',
    url: 'https://www.youtube.com/playlist?list=PLHVjlacTRIv1E84-EfSmuoByIRkiVP09d',
    operator: 'Instituto Cervantes',
    cost: '무료',
    scope: '말하기 시험 실연 10편(A1 escolar–C1)',
    format: '영상',
  },
  {
    id: 'dele-profedeele',
    track: 'dele',
    kind: 'unofficial',
    name: 'ProfeDeELE DELE',
    url: 'https://www.profedeele.es/examenes/dele/',
    operator: 'ProfeDeELE',
    cost: '웹 풀이 무료',
    scope: 'A1–C1 모델 시험 활동 24개, 영역별',
    format: '웹 풀이(스페인어)',
  },
  {
    id: 'dele-edinumen',
    track: 'dele',
    kind: 'unofficial',
    bundled: true,
    name: 'Edinumen El Cronómetro 샘플',
    url: 'https://edinumen.es/muestra-el-cronometro',
    operator: 'Edinumen',
    cost: '샘플 무료',
    scope: 'A1–C2 · escolar 교재 샘플',
    format: 'eBook',
  },
  {
    id: 'dele-difusion',
    track: 'dele',
    kind: 'unofficial',
    bundled: true,
    name: 'Difusión Las claves del DELE',
    url: 'https://difusion.com/catalogo/las-claves-del-nuevo-dele/',
    operator: 'Difusión',
    cost: '교재 구매',
    login: 'Campus 가입',
    scope: 'A1–C1, 자동채점 모의시험 2회',
    format: '교재 · 웹',
  },

  // ── DELF·DALF ─────────────────────────────────────────────────────
  {
    id: 'delf-korea-hub',
    track: 'delf',
    kind: 'mock',
    name: 'DELF · DALF 레벨별 공식 예시(한국어 안내)',
    url: 'https://www.delf-dalf.co.kr/ko/tout-public-f1/',
    operator: '국내 DELF · DALF 사이트',
    cost: '무료',
    scope: 'A1–C2 레벨별로 FEI 공식 예시에 연결',
    format: '링크 모음',
  },
  {
    id: 'delf-fei-b2',
    track: 'delf',
    kind: 'mock',
    name: 'FEI DELF B2 공식 예시',
    url: 'https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b2/exemples-sujets',
    operator: 'France Éducation international',
    cost: '무료',
    scope: '집단시험 2세트 · 구술 1세트, 정답 · 전사 · 평가표',
    format: 'PDF · MP3',
    note: 'A1·A2·B1은 같은 사이트의 레벨별 페이지에 있습니다.',
  },
  {
    id: 'dalf-fei-c1',
    track: 'delf',
    kind: 'mock',
    name: 'FEI DALF C1 공식 예시',
    url: 'https://www.france-education-international.fr/diplome/dalf/exemples-sujets',
    operator: 'France Éducation international',
    cost: '무료',
    scope: 'C1 1세트(집단 + 구술), MP3 · 전사 · 평가 기준',
    format: 'PDF · MP3',
  },
  {
    id: 'delf-rfi',
    track: 'delf',
    kind: 'unofficial',
    name: 'RFI Le français facile DELF',
    url: 'https://francaisfacile.rfi.fr/fr/dipl%C3%B4mes-tests/',
    operator: 'RFI',
    cost: '무료',
    scope: 'DELF B2 듣기 7회분',
    format: '웹 풀이 · 음성',
  },
  {
    id: 'delf-hachette',
    track: 'delf',
    kind: 'unofficial',
    name: 'Hachette FLE DELF',
    url: 'https://delf.hachettefle.fr/',
    operator: 'Hachette FLE',
    cost: '무료',
    scope: 'A1–B2 épreuve · 음성',
    format: 'PDF · MP3',
  },
  {
    id: 'delf-klett',
    track: 'delf',
    kind: 'unofficial',
    name: 'DELF@klett',
    url: 'https://static.klett.de/projekte/delf/',
    operator: 'Ernst Klett',
    cost: '무료',
    scope: 'Scolaire A1–B2 총 9세트',
    format: '웹 풀이 · 음성',
  },
  {
    id: 'delf-partajon',
    track: 'delf',
    kind: 'unofficial',
    name: 'Partajon',
    url: 'https://www.partajondelfdalf.com/',
    operator: '개인',
    cost: '무료',
    scope: 'B1–C2 네 영역',
    format: '웹',
  },

  // ── TELC ──────────────────────────────────────────────────────────
  {
    id: 'telc-uebungstest',
    track: 'telc',
    kind: 'mock',
    name: 'telc 레벨별 Übungstest 1',
    url: 'https://www.telc.net/en/language-examinations/certificate-exams/german/',
    operator: 'telc gGmbH',
    cost: '무료',
    scope: 'A1–C2 각 1세트, 정답 · 채점 안내',
    format: 'ZIP(PDF · 음성)',
    note: '두 레벨이 한 파일에 묶인 시험(A2·B1)이 있습니다. 표지에서 레벨을 확인하세요.',
  },
  {
    id: 'telc-shop',
    track: 'telc',
    kind: 'mock',
    paid: true,
    name: 'telc Shop Übungstests',
    url: 'https://shop.telc.net/de_DE/allgemeinsprache/ubungstests.html',
    operator: 'telc gGmbH',
    cost: '유료(예: MP3 13.50€)',
    scope: 'Version 2 등 추가 모의시험',
    format: '인쇄 · 디지털',
  },
  {
    id: 'telc-levelkraft',
    track: 'telc',
    kind: 'unofficial',
    name: 'LevelKraft telc 미니 테스트',
    url: 'https://levelkraft.de/telc-b1-modelltest',
    operator: 'LevelKraft',
    cost: '웹 미니 테스트 무료',
    scope: 'telc B1 · B2 읽기 · Sprachbausteine · 듣기',
    format: '웹 · 앱',
  },
  {
    id: 'telc-klett-b2',
    track: 'telc',
    kind: 'unofficial',
    bundled: true,
    name: 'Klett Modellprüfung telc B2',
    url: 'https://www.klett-sprachen.de/downloads/telc-deutsch-b2-modelltest/c-941',
    operator: 'Ernst Klett Sprachen',
    cost: '교재 부록',
    login: '회원 로그인',
    scope: 'B2',
    format: 'PDF · 음성',
  },
  {
    id: 'goethe-materials',
    track: 'telc',
    kind: 'other-exam',
    name: 'Goethe-Zertifikat 연습자료',
    url: 'https://www.goethe.de/ins/kr/ko/spr/prf.html',
    operator: 'Goethe-Institut',
    cost: '무료',
    scope: 'A1–C2 레벨별 모의 세트',
    format: 'PDF · 음성',
    note: 'telc가 아니라 Goethe 시험입니다. 같은 CEFR 레벨의 독일어라 연습으로 쓸 만합니다.',
  },
  {
    id: 'goethe-online',
    track: 'telc',
    kind: 'other-exam',
    name: 'Goethe 온라인 모의시험',
    url: 'https://www.goethe.de/ins/kr/ko/spr/prf/bar.html',
    operator: 'Goethe-Institut',
    cost: '무료',
    scope: 'A1–C2 각 1세트, 즉시 채점',
    format: '웹 풀이',
    note: 'telc가 아니라 Goethe 시험입니다.',
  },

  // ── TORFL ─────────────────────────────────────────────────────────
  {
    id: 'torfl-spbu',
    track: 'torfl',
    kind: 'mock',
    name: 'SPbU TORFL 샘플 · 데모',
    url: 'https://testingcenter.spbu.ru/en/exams/russian/torfl.html',
    operator: '상트페테르부르크국립대',
    cost: '무료',
    scope: 'A1–C2 표준 6개 + 데모 11개',
    format: 'PDF',
  },
  {
    id: 'torfl-pushkin',
    track: 'torfl',
    kind: 'mock',
    name: '푸시킨 대학 ТРКИ 표준 시험',
    url: 'https://www.pushkin.institute/certificates/trki/',
    operator: '푸시킨 러시아어대학',
    cost: '무료',
    scope: 'ТЭУ–ТРКИ-IV 표준 시험 6개',
    format: 'PDF',
  },
  {
    id: 'torfl-tsu-demo',
    track: 'torfl',
    kind: 'mock',
    name: '톰스크국립대 웹 데모',
    url: 'https://test.tsu.ru/ru/profile/test/quiz/28',
    operator: '톰스크국립대 РКИ 시험센터',
    cost: '무료',
    scope: 'A1 어휘 · 문법 70문항(50분), 듣기 데모',
    format: '웹 풀이',
  },
  {
    id: 'torfl-spbu-webinars',
    track: 'torfl',
    kind: 'mock',
    name: 'SPbU 응시자 웨비나',
    url: 'https://testingcenter.spbu.ru/en/webinars/for-the-torfl-exam-candidates.html',
    operator: '상트페테르부르크국립대',
    cost: '무료',
    scope: 'A1–C2 6회',
    format: '영상 · PDF',
  },
  {
    id: 'torfl-pushkinhouse',
    track: 'torfl',
    kind: 'unofficial',
    bundled: true,
    name: '뿌쉬낀하우스 토르플 문제집',
    url: 'https://lecture.pushkinhouse.co.kr/gnu/bbs/board.php?bo_table=lt_offline_notice&wr_id=253',
    operator: '뿌쉬낀하우스',
    cost: '문제집 구매(듣기 MP3는 무료)',
    scope: '기초–2단계 문제집 · 실전 모의고사',
    format: '책 · MP3',
  },

  // ── 한능검 ────────────────────────────────────────────────────────
  {
    id: 'hanja-kccpt-past',
    track: 'hanja',
    kind: 'past',
    name: '한국어문회 기출문제',
    url: 'https://www.hanja.re.kr/kccpt/exam/previousQuestion.do',
    operator: '한국어문회',
    cost: '무료',
    scope: '113 · 114회, 특급–8급 15개 급수',
    format: '첨부 파일',
    note: '기출의 저작권은 한국어문회에 있고, 허가 없는 온라인 배포를 금지합니다.',
  },
]

const KIND_ORDER: Record<ExamSourceKind, number> = { past: 0, mock: 1, unofficial: 2, 'other-exam': 3 }

/**
 * 그 트랙의 목록. 무료가 먼저, 그 안에서 공식 기출 → 공식 모의 → 비공식 →
 * 다른 시험이다. 같은 자리끼리는 위 표의 순서를 지킨다(`sort`는 안정 정렬이다).
 *
 * `today`를 넘겨받는다 — 기간이 끝난 행사를 빼려면 날짜가 필요한데, 여기서
 * 시계를 읽으면 테스트가 날짜에 매인다.
 */
export function examSourcesFor(track: TrackId, today: string): ExamSource[] {
  return EXAM_SOURCES.filter((source) => source.track === track && (!source.until || today <= source.until)).sort(
    (a, b) =>
      Number(Boolean(a.paid || a.bundled)) - Number(Boolean(b.paid || b.bundled)) ||
      KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
  )
}

/** 기기 시간대의 오늘(YYYY-MM-DD). 행사 마감은 한국 날짜로 적혀 있다 */
export function localDay(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
