import { MAJOR_PRIORITIES, PROGRAMS_2025, UNIVERSITIES } from '../constants/admissionData2025';
import { KHU_VUC, DOI_TUONG } from '../constants/common';

// ──────────────────────────────────────────────────────────────
// Helper
// ──────────────────────────────────────────────────────────────
const p = (v) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
const round2 = (v) => Math.round(v * 100) / 100;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// ──────────────────────────────────────────────────────────────
// Shared: tính tổng học bạ từ 9 ô (3 môn × 3 năm), thang 30
// ──────────────────────────────────────────────────────────────
const calcHocBaTotal30 = (hocBa, hocBaQuickAverage) => {
  if (hocBaQuickAverage !== '') {
    return clamp(p(hocBaQuickAverage) * 3, 0, 30);
  }
  let total = 0;
  for (let s = 0; s < 3; s++) {
    const v10 = p(hocBa[s * 3]);
    const v11 = p(hocBa[s * 3 + 1]);
    const v12 = p(hocBa[s * 3 + 2]);
    total += (v10 + v11 + v12) / 3;
  }
  return clamp(total, 0, 30);
};

// ──────────────────────────────────────────────────────────────
// Shared: tổng THPT 3 môn, thang 30
// ──────────────────────────────────────────────────────────────
const calcThptTotal30 = (thpt, thptQuickTotal) => {
  if (thptQuickTotal !== '') return clamp(p(thptQuickTotal) * 3, 0, 30);
  return clamp(p(thpt[0]) + p(thpt[1]) + p(thpt[2]), 0, 30);
};

// ──────────────────────────────────────────────────────────────
// Shared: điểm ưu tiên thang 30 (KV + ĐT)
// ──────────────────────────────────────────────────────────────
const calcPriority30 = (kv, dt) => {
  const kvPts = KHU_VUC.find(k => k.id === kv)?.points || 0;
  const dtPts = DOI_TUONG.find(d => d.id === dt)?.points || 0;
  return kvPts + dtPts;
};

// ──────────────────────────────────────────────────────────────
// UIT — Công thức xét tuyển tổng hợp (thang 100)
// Nguồn: useUitCalculator.js
// DHL = THPT_100 × 47.5% + DGNL_100 × 47.5% + HB_100 × 5%
// ──────────────────────────────────────────────────────────────
const calcUitScore = (state) => {
  const hbTotal30 = calcHocBaTotal30(state.hocBa, state.hocBaQuickAverage);
  const thptTotal30 = calcThptTotal30(state.thpt, state.thptQuickTotal);
  const rawDgnl = p(state.dgnlQuickTotal || 0);

  const dgnl100 = round2((rawDgnl / 1200) * 100);
  const thpt100 = round2((thptTotal30 / 30) * 100);
  const hb100   = round2((hbTotal30   / 30) * 100);

  const dhl = round2(thpt100 * 0.475 + dgnl100 * 0.475 + hb100 * 0.05);

  // Ưu tiên (thang 100)
  const priority30 = calcPriority30(state.kv, state.dt);
  const priority100 = round2((priority30 / 3) * 10);
  const temp = dhl;
  const priorityAccepted = temp >= 75
    ? round2(Math.max(0, ((100 - temp) / 25) * priority100))
    : priority100;

  return round2(Math.min(100, dhl + priorityAccepted));
};

// UIT THPT-only score (thang 30)
const calcUitThptScore30 = (state) => {
  const total30 = calcThptTotal30(state.thpt, state.thptQuickTotal);
  const priority30 = calcPriority30(state.kv, state.dt);
  return round2(Math.min(30, total30 + priority30));
};

// UIT Học bạ score (thang 30)
const calcUitHocBaScore30 = (state) => {
  const hb30 = calcHocBaTotal30(state.hocBa, state.hocBaQuickAverage);
  const priority30 = calcPriority30(state.kv, state.dt);
  return round2(Math.min(30, hb30 + priority30));
};

// ──────────────────────────────────────────────────────────────
// HCMUS — Công thức xét tuyển (thang 30)
// Nguồn: useHcmusCalculator.js
// Phương án 1: w1*THPT + w2*HB (w1=0.7, w2=0.3)
// Phương án 2: w3*DGNL_chuanhoa + w4*HB (w3=0.7, w4=0.3)
// Điểm học lực = max(PA1, PA2)
// ──────────────────────────────────────────────────────────────
const calcHcmusScore30 = (state) => {
  const hb30 = calcHocBaTotal30(state.hocBa, state.hocBaQuickAverage);
  const thpt30 = calcThptTotal30(state.thpt, state.thptQuickTotal);
  const rawDgnl = p(state.dgnlQuickTotal || 0);
  const dgnlChuanHoa = Math.min(30, (rawDgnl / 1200) * 30);

  const w1 = 0.7; const w2 = 0.3;
  const w3 = 0.7; const w4 = 0.3;
  const diemHL1 = (w1 * thpt30) + (w2 * hb30);
  const diemHL2 = (w3 * dgnlChuanHoa) + (w4 * hb30);
  const diemHL = Math.max(diemHL1, diemHL2);

  // Ưu tiên HCMUS (giảm dần khi >= 22.5/30)
  const priority30 = calcPriority30(state.kv, state.dt);
  const uuTienThuc = diemHL >= 22.5
    ? Math.max(0, ((30 - diemHL) / 7.5) * priority30)
    : priority30;

  return round2(Math.min(30, diemHL + uuTienThuc));
};

// ──────────────────────────────────────────────────────────────
// HCMUT — Công thức tổng hợp (thang 100)
// Nguồn: useHcmutCalculator.js
// NL = DGNL / 15 (thang 100 từ thang 1500)
// THPT_qd = (THPT30 / 3) × 10
// HB_qd   = (HB30   / 3) × 10
// DHL = 70%×NL + 20%×THPT_qd + 10%×HB_qd
// ──────────────────────────────────────────────────────────────
const calcHcmutScore100 = (state) => {
  const thpt30 = calcThptTotal30(state.thpt, state.thptQuickTotal);
  const hb30   = calcHocBaTotal30(state.hocBa, state.hocBaQuickAverage);

  // DGNL: HCMUT dùng thang 1500 (4 phần thi riêng nhân hệ số)
  let dgnlScore;
  if (state.dgnlQuickTotal !== '') {
    dgnlScore = p(state.dgnlQuickTotal);
  } else {
    dgnlScore = p(state.dgnlTv) + p(state.dgnlTa) + (p(state.dgnlToan) * 2) + p(state.dgnlKh);
  }

  const diemNL    = dgnlScore / 15;
  const diemThptQd = (thpt30 / 3) * 10;
  const diemHbQd   = (hb30   / 3) * 10;
  const diemHL = (0.7 * diemNL) + (0.2 * diemThptQd) + (0.1 * diemHbQd);

  // Điểm ưu tiên (thang 100)
  const priority30 = calcPriority30(state.kv, state.dt);
  const uuTien100  = (priority30 / 3) * 10;
  const uuTienThuc = diemHL >= 75
    ? Math.max(0, ((100 - diemHL) / 25) * uuTien100)
    : uuTien100;

  return round2(Math.min(100, diemHL + uuTienThuc));
};

// ──────────────────────────────────────────────────────────────
// Standard THPT-only schools (PTIT, SPKT, FPT, VKU, TDMU, UEL...)
// ──────────────────────────────────────────────────────────────
const calcStandardThpt30 = (state) => {
  const thpt30 = calcThptTotal30(state.thpt, state.thptQuickTotal);
  const priority30 = calcPriority30(state.kv, state.dt);
  return round2(Math.min(30, thpt30 + priority30));
};

const calcStandardHocBa30 = (state) => {
  const hb30 = calcHocBaTotal30(state.hocBa, state.hocBaQuickAverage);
  const priority30 = calcPriority30(state.kv, state.dt);
  return round2(Math.min(30, hb30 + priority30));
};

const calcStandardDgnl = (state) => {
  const rawDgnl = p(state.dgnlQuickTotal || 0);
  const priority30 = calcPriority30(state.kv, state.dt);
  // DGNL thang 1200, ưu tiên quy đổi: (ưu tiên30/3)*120
  const priorityDgnl = (priority30 / 3) * 120;
  return round2(Math.min(1200, rawDgnl + priorityDgnl));
};

// ──────────────────────────────────────────────────────────────
// Main export
// ──────────────────────────────────────────────────────────────
export const calculateAspirations = (state) => {
  const allMethods = [];

  PROGRAMS_2025.forEach(program => {
    const school = UNIVERSITIES.find(u => u.id === program.schoolId);
    const bm = program.benchmarks;

    if (program.formulaType === 'uit_standard') {
      // UIT: có 3 phương thức
      if (bm.dgnl) {
        const score = calcUitScore(state); // thang 100
        // Quy về tương đương thang 30 để so sánh với điểm chuẩn thực tế của UIT (thang 30)
        // UIT công bố điểm chuẩn thang 100 cho phương thức tổng hợp
        allMethods.push(mkEntry(program, school, score, bm.dgnl, 'Tổng hợp UIT (100)', 100));
      }
      if (bm.thpt) {
        const score = calcUitThptScore30(state);
        allMethods.push(mkEntry(program, school, score, bm.thpt, 'THPT (30)', 30));
      }
      if (bm.transcript) {
        const score = calcUitHocBaScore30(state);
        allMethods.push(mkEntry(program, school, score, bm.transcript, 'Học bạ (30)', 30));
      }

    } else if (program.formulaType === 'hcmut_combined') {
      if (bm.combined !== undefined) {
        const score = calcHcmutScore100(state);
        allMethods.push(mkEntry(program, school, score, bm.combined, 'Tổng hợp Bách khoa (100)', 100));
      }

    } else if (program.formulaType === 'hcmus_standard') {
      if (bm.dgnl || bm.thpt) {
        const score = calcHcmusScore30(state);
        allMethods.push(mkEntry(program, school, score, bm.dgnl ?? bm.thpt, 'Tổng hợp HCMUS (30)', 30));
      }

    } else {
      // Tất cả trường còn lại (PTIT, SPKT, FPT, VKU, TDMU, UEL, IU)
      if (bm.thpt) {
        const score = calcStandardThpt30(state);
        allMethods.push(mkEntry(program, school, score, bm.thpt, 'THPT (30)', 30));
      }
      if (bm.transcript) {
        const score = calcStandardHocBa30(state);
        allMethods.push(mkEntry(program, school, score, bm.transcript, 'Học bạ (30)', 30));
      }
      if (bm.dgnl) {
        const score = calcStandardDgnl(state);
        allMethods.push(mkEntry(program, school, score, bm.dgnl, 'ĐGNL (1200)', 1200));
      }
    }
  });

  return { aspirations: sortAndSelect(allMethods) };
};

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────
const mkEntry = (program, school, myScore, benchmark, method, maxScore) => {
  const diff = myScore - benchmark;
  const diffPct = (diff / maxScore) * 100;
  let rating, label, color;
  if (diffPct >= 3)   { rating = 5; label = '★★★★★ Rất an toàn'; color = 'bg-emerald-500'; }
  else if (diffPct >= 0.5) { rating = 4; label = '★★★★ Khá an toàn'; color = 'bg-emerald-400'; }
  else if (diffPct >= -1)  { rating = 3; label = '★★★ Cân bằng';    color = 'bg-amber-500'; }
  else if (diffPct >= -3)  { rating = 2; label = '★★ Nguy hiểm';    color = 'bg-orange-500'; }
  else                     { rating = 1; label = '★ Khó';            color = 'bg-rose-500'; }

  return {
    ...program,
    id: `${program.id}__${method}`,
    schoolName: school?.name,
    myScore: myScore.toFixed(2),
    benchmark,
    method,
    diff: diff.toFixed(2),
    probability: label,
    rating,
    color,
    scoreRatio: myScore / benchmark,
    priorityValue: MAJOR_PRIORITIES[program.majorType] || 9,
  };
};

const sortAndSelect = (all) => {
  const sorted = [...all].sort((a, b) =>
    a.priorityValue !== b.priorityValue
      ? a.priorityValue - b.priorityValue
      : b.scoreRatio - a.scoreRatio
  );

  const dream = sorted.filter(r => r.rating <= 2);
  const match = sorted.filter(r => r.rating === 3);
  const safe  = sorted.filter(r => r.rating >= 4);

  const take = (arr, n) => arr.splice(0, n);
  const selected = [
    ...take(dream, 4),
    ...take(match, 6),
    ...take(safe, 5),
  ];

  const remaining = [...dream, ...match, ...safe].sort((a, b) => a.priorityValue - b.priorityValue);
  while (selected.length < 15 && remaining.length > 0) selected.push(remaining.shift());

  selected.sort((a, b) => a.rating - b.rating);
  return selected.map((s, i) => ({ ...s, nv: i + 1 }));
};

