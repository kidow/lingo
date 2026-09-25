// Goethe Wortliste PDF의 글자를 줄마다 뽑는다. scripts/goethe.ts가 부른다.
//
// 글자 일부가 CID 글꼴의 글리프 번호(<002C0045…>)로 찍혀 있어, zlib으로 스트림을
// 풀어 문자열을 읽는 방식으로는 그 쪽이 통째로 빠진다(B1은 쪽마다 있다). 도구를
// 설치하는 대신 macOS의 PDFKit을 쓴다 — ToUnicode를 따라 글자로 풀어 준다.
//
//   swift scripts/goethe-columns.swift <파일> <단 수 1|2> <들여쓰기 pt>
//
// **글자마다 좌표를 받아 줄을 직접 짓는다.** 표제어 칸과 예문 칸은 글자 사이가
// 크게 벌어진 자리로 갈린다 — 거기에 공백 세 칸을 넣는다. 칸의 x 범위를 재어
// 자르면 들여 쓴 명사(`das` 뒤의 `Blut`)가 잘리거나 번호 예문(1. 2.)이 섞였다.
// 두 단이면 쪽 가운데로 나눈다.
//
// 출력은 한 줄에 한 줄, 단 끝에 \u{0B}, 쪽 끝에 \u{0C}. **macOS에서만 돈다** —
// 그래서 goethe.ts가 뽑은 표를 생성물로 커밋한다.
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count == 4, let columns = Int(args[2]), let indent = Double(args[3]),
  let doc = PDFDocument(url: URL(fileURLWithPath: args[1]))
else {
  FileHandle.standardError.write("사용법: <파일> <단 수> <들여쓰기>\n".data(using: .utf8)!)
  exit(1)
}

/// 글자 사이가 이만큼(pt) 넘게 비면 다른 칸이다. 낱말 사이 빈칸은 3pt 안쪽이다
let gap: CGFloat = 6

struct Glyph { let x: CGFloat; let right: CGFloat; let y: CGFloat; let ch: Character }

for i in 0..<doc.pageCount {
  guard let page = doc.page(at: i), let text = page.string else { continue }
  let box = page.bounds(for: .mediaBox)
  var glyphs: [Glyph] = []
  // 글자 하나짜리 선택으로 좌표를 받는다. `characterBounds(at:)`는 줄바꿈을
  // 지나면 한 글자씩 밀린 좌표를 돌려준다(h의 폭이 1, l의 폭이 4로 나왔다).
  // 자리는 UTF-16으로 센다 — Swift의 Character로 세면 또 어긋난다
  let units = text as NSString
  for index in 0..<units.length {
    guard let scalar = Unicode.Scalar(units.character(at: index)) else { continue }
    let ch = Character(scalar)
    if ch == "\n" || ch == "\r" { continue }
    guard let one = page.selection(for: NSRange(location: index, length: 1)) else { continue }
    let b = one.bounds(for: page)
    if b.isEmpty { continue }
    glyphs.append(Glyph(x: b.minX, right: b.maxX, y: b.midY, ch: ch))
  }
  for column in 0..<columns {
    let lo = box.minX + box.width * CGFloat(column) / CGFloat(columns)
    let hi = box.minX + box.width * CGFloat(column + 1) / CGFloat(columns)
    let mine = glyphs.filter { $0.ch != " " && $0.x >= lo && $0.x < hi }
    // 같은 줄은 y가 가깝다. 글자마다 높이가 달라(l·a·g) 중심이 2pt쯤 흔들리므로
    // 줄의 첫 글자에서 4pt 안쪽이면 한 줄로 묶는다. 줄 간격은 11pt다
    var lines: [[Glyph]] = []
    for g in mine.sorted(by: { $0.y > $1.y }) {
      if let last = lines.last, let first = last.first, abs(first.y - g.y) < 4 { lines[lines.count - 1].append(g) }
      else { lines.append([g]) }
    }
    // 표제어 칸의 왼쪽 끝 — 세 줄 이상 시작하는 자리 가운데 가장 왼쪽이다.
    // 가장 흔한 자리로 잡으면 예문 줄이 더 많은 쪽에서 예문 칸이 잡혔다. 네 글자
    // 안 되는 줄은 세지 않는다 — 쪽 가장자리의 세로 글씨가 한 글자씩 줄이 되어
    // 맨 왼쪽을 차지했다. 거기서 <들여쓰기>pt 넘게 들어가 시작하는 줄은 예문이
    // 이어지는 줄이다 — 앞에 공백을 달아 goethe.ts가 건너뛰게 한다
    var starts: [Int: Int] = [:]
    for line in lines where line.count >= 4 { if let x = line.map({ $0.x }).min() { starts[Int(x / 2), default: 0] += 1 } }
    let margin = CGFloat((starts.filter { $0.value >= 3 }.keys.min() ?? 0) * 2)
    for whole in lines {
      // 칸 왼쪽 끝보다 한참 왼쪽의 글자는 쪽 가장자리 세로 글씨다. 같은 높이의
      // 줄에 끼어들어 `30   schreiben`이 됐다
      let line = whole.filter { $0.x >= margin - 15 }
      if line.isEmpty { continue }
      var out = (line.map { $0.x }.min() ?? 0) > margin + CGFloat(indent) ? "   " : ""
      var previous: Glyph? = nil
      for g in line.sorted(by: { $0.x < $1.x }) {
        if let p = previous {
          let space = g.x - p.right
          if space > gap { out += "   " } else if space > 1 { out += " " }
        }
        out.append(g.ch)
        previous = g
      }
      print(out)
    }
    print("\u{0B}")
  }
  print("\u{0C}")
}
