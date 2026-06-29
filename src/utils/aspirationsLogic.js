import { MAJOR_PRIORITIES, PROGRAMS_2025, UNIVERSITIES } from '../constants/admissionData2025';
import { KHU_VUC, DOI_TUONG } from '../constants/common';

export const calculateAspirations = (state) => {
  // Extract state
  const {
    hocBa, hocBaQuickAverage,
    thpt, thptQuickTotal,
    dgnlTv, dgnlTa, dgnlToan, dgnlKh, dgnlQuickTotal,
    kv, dt, thuong, xetThuong, khuyenKhich
  } = state;

  // Calculate Base Scores (using same logic as other calculators)
  
  // 1. Priority Score
  const khuvuc = KHU_VUC.find(k => k.id === kv);
  const doituong = DOI_TUONG.find(d => d.id === dt);
  const priorityScoreThpt = (khuvuc ? khuvuc.points : 0) + (doituong ? doituong.points : 0);
  const priorityScoreDgnl = (priorityScoreThpt / 3) * 120; // Approx equivalent for 1200 scale

  // Bonus
  const bonus = Math.min(10, (parseFloat(thuong) || 0) + (parseFloat(xetThuong) || 0) + (parseFloat(khuyenKhich) || 0));

  // 2. THPT Total
  let thptScore = ((parseFloat(thpt[0]) || 0) + (parseFloat(thpt[1]) || 0) + (parseFloat(thpt[2]) || 0));
  if (thptQuickTotal !== '') thptScore = parseFloat(thptQuickTotal) * 3;

  // 3. Transcript Total
  const tbMon = (subIdx) => {
    const v10 = parseFloat(hocBa[subIdx * 3]) || 0;
    const v11 = parseFloat(hocBa[subIdx * 3 + 1]) || 0;
    const v12 = parseFloat(hocBa[subIdx * 3 + 2]) || 0;
    return (v10 + v11 + v12) / 3;
  };
  let transcriptScore = tbMon(0) + tbMon(1) + tbMon(2);
  if (hocBaQuickAverage !== '') transcriptScore = parseFloat(hocBaQuickAverage) * 3;

  // 4. DGNL Total
  let dgnlScore = (parseFloat(dgnlTv) || 0) + (parseFloat(dgnlTa) || 0) + ((parseFloat(dgnlToan) || 0) * 2) + (parseFloat(dgnlKh) || 0);
  if (dgnlQuickTotal !== '') dgnlScore = parseFloat(dgnlQuickTotal);

  // HCMUT Specific calculations (for formulaType === hcmut_combined)
  // diemNangLuc = dgnl/15. diemThptQuyDoi = thptScore/3 * 10...
  const diemNangLucHcmut = dgnlScore / 15;
  const diemThptQuyDoiHcmut = thptScore / 3 * 10;
  const diemHbQuyDoiHcmut = transcriptScore / 3 * 10;
  const hcmutDiemHL = (0.7 * diemNangLucHcmut) + (0.2 * diemThptQuyDoiHcmut) + (0.1 * diemHbQuyDoiHcmut);
  const hcmutUuTien = (priorityScoreThpt / 3) * 10;
  const hcmutTotal = Math.min(100, hcmutDiemHL + bonus + hcmutUuTien);

  let allMethodsList = [];

  PROGRAMS_2025.forEach(program => {
    const school = UNIVERSITIES.find(u => u.id === program.schoolId);

    if (program.benchmarks.dgnl) {
      let myScore = dgnlScore + priorityScoreDgnl;
      allMethodsList.push(createAspirationObj(program, school, myScore, program.benchmarks.dgnl, 'ĐGNL (1200)', 1200));
    }
    
    if (program.benchmarks.thpt) {
      let myScore = thptScore + priorityScoreThpt;
      allMethodsList.push(createAspirationObj(program, school, myScore, program.benchmarks.thpt, 'THPT (30)', 30));
    }

    if (program.benchmarks.transcript) {
      let myScore = transcriptScore + priorityScoreThpt;
      allMethodsList.push(createAspirationObj(program, school, myScore, program.benchmarks.transcript, 'Học bạ (30)', 30));
    }

    if (program.benchmarks.combined) {
      allMethodsList.push(createAspirationObj(program, school, hcmutTotal, program.benchmarks.combined, 'Tổng hợp Bách khoa', 100));
    }
  });

  return sortAndSelectAspirations(allMethodsList);
};

const createAspirationObj = (program, school, myScore, benchmark, method, maxScore) => {
  const diff = myScore - benchmark;
  const probabilityObj = analyzeProbability(diff, maxScore);
  
  return {
    ...program,
    id: `${program.id}-${method}`,
    schoolName: school?.name,
    myScore: myScore.toFixed(2),
    benchmark: benchmark,
    method: method,
    diff: diff.toFixed(2),
    probability: probabilityObj.label,
    rating: probabilityObj.rating,
    color: probabilityObj.color,
    scoreRatio: (myScore / benchmark),
    priorityValue: MAJOR_PRIORITIES[program.majorType] || 9
  };
}

const analyzeProbability = (diff, maxScore) => {
  const diffPercent = (diff / maxScore) * 100;
  if (diffPercent >= 3) return { label: '★★★★★ Rất an toàn', rating: 5, color: 'bg-emerald-500' };
  if (diffPercent >= 0.5) return { label: '★★★★ Khá an toàn', rating: 4, color: 'bg-emerald-400' };
  if (diffPercent >= -1) return { label: '★★★ Cân bằng', rating: 3, color: 'bg-amber-500' };
  if (diffPercent >= -3) return { label: '★★ Nguy hiểm', rating: 2, color: 'bg-orange-500' };
  return { label: '★ Khó', rating: 1, color: 'bg-rose-500' };
};

const sortAndSelectAspirations = (allResults) => {
  // Sort by priority, then ratio
  let sorted = [...allResults].sort((a, b) => {
    if (a.priorityValue !== b.priorityValue) {
      return a.priorityValue - b.priorityValue;
    }
    return b.scoreRatio - a.scoreRatio;
  });

  // Filter out duplicates so we don't have the same major from the same school multiple times if they pass well.
  // Actually, standard is one NV per method. But for UI, let's keep it clean.
  
  let dream = sorted.filter(r => r.rating <= 2);
  let match = sorted.filter(r => r.rating === 3);
  let safe = sorted.filter(r => r.rating >= 4);

  let selected = [];
  
  const take = (arr, count) => {
    const items = arr.slice(0, count);
    arr.splice(0, count);
    return items;
  };

  selected.push(...take(dream, 4));
  selected.push(...take(match, 6));
  selected.push(...take(safe, 5));

  const remaining = [...dream, ...match, ...safe].sort((a, b) => a.priorityValue - b.priorityValue);
  while (selected.length < 15 && remaining.length > 0) {
    selected.push(remaining.shift());
  }

  selected.sort((a, b) => a.rating - b.rating);

  return {
    aspirations: selected.map((s, idx) => ({ ...s, nv: idx + 1 })),
    radarDataRaw: null // We will calculate radar data in the component based on state directly
  };
};
