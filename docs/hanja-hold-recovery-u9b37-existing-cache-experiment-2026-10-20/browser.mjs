const q = id => document.getElementById(id);
const roots = new Set(['u9b37', 'u9b37-ue0100']);
const rawAllowed = new Set([12, 14, 13, 15, 16, 17, 18]);
async function getSVG(path, target) {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error('고정 자료 확인 실패: ' + response.status);
  const text = await response.text();
  if (!text.startsWith('<svg ')) throw new Error('SVG 응답 계약 불일치');
  target.innerHTML = text;
}
async function showDomestic(pen) {
  if (![11, 12, 13, 14, 15, 16].includes(pen)) throw new Error('미허용 국내 획');
  q('domestic-label').textContent = '국내 ' + pen + '획 · 원 SVG 방향';
  await getSVG('/api/domestic?stroke=' + pen, q('domestic'));
}
async function showDomesticWhole() {
  await getSVG('/api/domestic-whole', q('whole-domestic'));
}
async function showRaw() {
  const root = q('root').value;
  const raw = Number(q('raw').value);
  if (!roots.has(root) || !rawAllowed.has(raw)) throw new Error('미허용 원 raw 선택');
  q('raw-label').textContent = root + ' / raw ' + raw + ' (0부터)';
  await Promise.all([
    getSVG('/api/raw?root=' + root + '&raw=' + raw, q('selected-raw')),
    getSVG('/api/raw?root=' + root + '&raw=12', q('raw12')),
    getSVG('/api/raw?root=' + root + '&raw=14', q('raw14')),
  ]);
}
async function run(action) {
  q('status').textContent = '고정 자료 읽는 중';
  try { await action(); q('status').textContent = '읽기 전용 · 필순 승인 없음'; }
  catch (error) { q('status').textContent = error.message; }
}
for (const pen of [11, 12, 13, 14, 15, 16]) q('domestic-' + pen).onclick = () => run(() => showDomestic(pen));
for (const raw of [12, 14, 13, 15, 16, 17, 18]) q('raw-' + raw).onclick = () => {
  q('raw').value = String(raw); run(showRaw);
};
q('domestic-whole').onclick = () => run(showDomesticWhole);
q('root').onchange = () => run(showRaw);
q('raw').onchange = () => run(showRaw);
run(async () => {
  await Promise.all([
    getSVG('/api/whole?root=u9b37', q('whole-base')),
    getSVG('/api/whole?root=u9b37-ue0100', q('whole-vs0')),
    showDomestic(11), showDomesticWhole(), showRaw(),
  ]);
});
