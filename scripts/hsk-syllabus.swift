// 공식 HSK 대강 PDF에서 글자를 뽑는다. scripts/hsk-syllabus.ts가 부른다.
//
// PDF가 암호로 잠겨 있어(`/Encrypt`) zlib으로 스트림을 푸는 우리 방식
// (scripts/levels.ts의 `pdfWords`)으로는 못 읽는다. 도구를 설치하는 대신
// macOS가 이미 가진 PDFKit을 쓴다 — 잠긴 PDF도 그대로 연다.
//
//   swift scripts/hsk-syllabus.swift <파일> > 글자
//
// **macOS에서만 돈다.** 그래서 뽑은 표를 생성물로 커밋한다 — 다른 기계에서
// 등급을 채울 때 이 단계를 다시 밟지 않아도 되게.
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count >= 2, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else {
  FileHandle.standardError.write("PDF를 열지 못했습니다\n".data(using: .utf8)!)
  exit(1)
}

FileHandle.standardError.write("쪽수 \(doc.pageCount)\n".data(using: .utf8)!)
for i in 0..<doc.pageCount {
  guard let page = doc.page(at: i), let text = page.string else { continue }
  print(text)
}
