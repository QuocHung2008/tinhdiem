import React, { useState, useMemo, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Download, Calculator, BookOpen, PenTool, Award, Info, XCircle, RotateCcw, Building2 } from 'lucide-react';
import { useAspirationsCalculator } from '../hooks/useAspirationsCalculator';
import { CardSection } from '../components/common/CardSection';
import { QuickScoreInput } from '../components/common/QuickScoreInput';
import { SavedScoresBanner } from '../components/common/SavedScoresBanner';
import { CalculatorHero } from '../components/common/CalculatorHero';
import { KHU_VUC, DOI_TUONG } from '../constants/common';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const clampScore = (value, max) => {
  if (value === '') return '';
  if (value.toString().trim().startsWith('-')) return '0';
  const number = parseFloat(value);
  if (Number.isNaN(number)) return value;
  return Math.min(Math.max(number, 0), max).toString();
};

export const AspirationsAnalyzer = () => {
  const { state, results } = useAspirationsCalculator();
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedAspiration, setSelectedAspiration] = useState(null);
  const pdfRef = useRef();

  const handleHocBaChange = (index, val) => {
    const newHocBa = [...state.hocBa];
    newHocBa[index] = clampScore(val, 10);
    state.setHocBa(newHocBa);
  };

  const handleThptChange = (index, val) => {
    const newThpt = [...state.thpt];
    newThpt[index] = clampScore(val, 10);
    state.setThpt(newThpt);
  };

  const hasHocBaDetail = state.hocBa.some(val => val !== '');
  const hasHocBaQuickAverage = state.hocBaQuickAverage !== '';
  const hasThptDetail = state.thpt.some(val => val !== '');
  const hasThptQuickTotal = state.thptQuickTotal !== '';
  const dgnlDetailTotal = (parseFloat(state.dgnlTv) || 0) + (parseFloat(state.dgnlTa) || 0) + ((parseFloat(state.dgnlToan) || 0) * 2) + (parseFloat(state.dgnlKh) || 0);
  const hasDgnlDetail = state.dgnlTv !== '' || state.dgnlTa !== '' || state.dgnlToan !== '' || state.dgnlKh !== '';
  const hasDgnlQuickTotal = state.dgnlQuickTotal !== '';

  const exportPDF = () => {
    const input = pdfRef.current;
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('KetQuaXetTuyen2025.pdf');
    });
  };

  // Radar Data calculation based on state
  const radarData = useMemo(() => {
    let mathRaw = (parseFloat(state.thpt[0]) || 0) * 10;
    if (mathRaw === 0 && hasThptQuickTotal) mathRaw = parseFloat(state.thptQuickTotal) * 10;
    
    let logicRaw = ((parseFloat(state.dgnlToan) || 0) / 300) * 100;
    
    let academicRaw = 0;
    if (hasDgnlDetail) academicRaw = (dgnlDetailTotal / 1500) * 100;
    else if (hasDgnlQuickTotal) academicRaw = (parseFloat(state.dgnlQuickTotal) / 1500) * 100;

    const tbToan = (parseFloat(state.hocBa[0]) || 0 + parseFloat(state.hocBa[1]) || 0 + parseFloat(state.hocBa[2]) || 0) / 3;
    let codeRaw = tbToan * 10;

    return {
      labels: ['Toán THPT', 'Logic ĐGNL', 'AI (Ước tính)', 'Lập trình', 'Học thuật chung'],
      datasets: [
        {
          label: 'Năng lực cá nhân (%)',
          data: [mathRaw || 0, logicRaw || 0, ((mathRaw + logicRaw)/2) || 0, codeRaw || 0, academicRaw || 0],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
        },
      ],
    };
  }, [state, hasThptQuickTotal, hasDgnlDetail, hasDgnlQuickTotal, dgnlDetailTotal]);


  return (
    <div className="calculator-page w-full animate-in fade-in duration-500 pb-28">
      <div className="space-y-8">
        <CalculatorHero
          title="Phân Tích Nguyện Vọng AI 2025"
          description="Đồng bộ tự động dữ liệu từ các trường. Dự đoán xác suất đỗ nhóm ngành CNTT cho ĐHQG-HCM và các trường top đầu dựa trên 4 phương thức."
          icon={Building2}
          tone="blue"
          ctaLabel={analyzed ? "Tính lại điểm mới" : "Chạy AI Xếp Nguyện Vọng"}
          ctaHref={analyzed ? "#" : "#"}
          onCtaClick={(e) => {
             e.preventDefault();
             setAnalyzed(!analyzed);
          }}
        />

        <SavedScoresBanner
          hasSavedData={state.hasSavedData}
          onExport={state.exportData}
          onImport={state.importData}
          onClear={state.clearSavedForm}
          tone="blue"
        />

        {!analyzed ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Forms */}
            <div className="flex-1 space-y-6">
              
              {/* Thông tin Dự tuyển */}
              <CardSection title="1. Điểm thi ĐGNL 2025 (4 phần thi)" icon={Calculator}>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-blue-800 mb-1">Tiếng Việt</label>
                      <input type="number" min="0" max="300" step="1" value={state.dgnlTv} onChange={e => state.setDgnlTv(clampScore(e.target.value, 300))} disabled={hasDgnlQuickTotal} className={`w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-800 ${hasDgnlQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white'}`} placeholder="VD: 300" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-800 mb-1">Tiếng Anh</label>
                      <input type="number" min="0" max="300" step="1" value={state.dgnlTa} onChange={e => state.setDgnlTa(clampScore(e.target.value, 300))} disabled={hasDgnlQuickTotal} className={`w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-800 ${hasDgnlQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white'}`} placeholder="VD: 300" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-800 mb-1">Toán <span className="font-bold">(x2)</span></label>
                      <input type="number" min="0" max="300" step="1" value={state.dgnlToan} onChange={e => state.setDgnlToan(clampScore(e.target.value, 300))} disabled={hasDgnlQuickTotal} className={`w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-800 ${hasDgnlQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white'}`} placeholder="VD: 300" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-blue-800 mb-1">Tư duy khoa học</label>
                      <input type="number" min="0" max="300" step="1" value={state.dgnlKh} onChange={e => state.setDgnlKh(clampScore(e.target.value, 300))} disabled={hasDgnlQuickTotal} className={`w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-800 ${hasDgnlQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'bg-white'}`} placeholder="VD: 300" />
                    </div>
                  </div>
                  <div className="mt-4 rounded-xl border border-blue-100 bg-white/70 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-blue-900">Nhập nhanh tổng ĐGNL</label>
                        <p className="text-xs text-blue-700">Thang 1500 (HCMUT) / 1200 (Các trường khác sẽ tự quy đổi).</p>
                      </div>
                      <input
                        type="number" min="0" max="1500" step="1"
                        value={hasDgnlDetail ? dgnlDetailTotal.toFixed(0) : state.dgnlQuickTotal}
                        onChange={(e) => state.setDgnlQuickTotal(clampScore(e.target.value, 1500))}
                        disabled={hasDgnlDetail}
                        className={`w-full rounded-md border px-3 py-2 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-800 sm:w-40 ${hasDgnlDetail ? 'cursor-not-allowed border-blue-100 bg-slate-100 text-slate-500' : 'border-blue-200 bg-white text-blue-800'}`}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </CardSection>

              {/* Học bạ */}
              <CardSection title="2. Điểm Học Bạ (Tổ hợp)" icon={BookOpen}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg font-semibold w-1 whitespace-nowrap">Môn</th>
                        <th className="px-4 py-3 font-semibold text-center w-1/4">Lớp 10</th>
                        <th className="px-4 py-3 font-semibold text-center w-1/4">Lớp 11</th>
                        <th className="px-4 py-3 font-semibold text-center w-1/4">Lớp 12</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[0, 1, 2].map((subjectIndex) => (
                        <tr key={`subject-${subjectIndex}`} className={subjectIndex === 0 ? "bg-blue-50/50" : ""}>
                          <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">
                            Môn {subjectIndex + 1} {subjectIndex === 0 && <span className="text-blue-700 font-bold ml-1">(Toán x2 ở Bách khoa)</span>}
                          </td>
                          {[0, 1, 2].map((yearIndex) => {
                            const cellIndex = subjectIndex * 3 + yearIndex;
                            return (
                              <td key={cellIndex} className="px-2 py-2">
                                <input
                                  type="number" min="0" max="10" step="0.1"
                                  value={state.hocBa[cellIndex]}
                                  onChange={(e) => handleHocBaChange(cellIndex, e.target.value)}
                                  disabled={hasHocBaQuickAverage}
                                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 text-center transition-colors border-slate-200 ${hasHocBaQuickAverage ? 'cursor-not-allowed bg-slate-100 text-slate-400' : `text-slate-900 ${subjectIndex === 0 ? "bg-white" : ""}`}`}
                                  placeholder="0.0"
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">Nhập nhanh trung bình học bạ</label>
                      </div>
                      <input
                        type="number" min="0" max="10" step="0.01"
                        value={state.hocBaQuickAverage}
                        onChange={(e) => state.setHocBaQuickAverage(clampScore(e.target.value, 10))}
                        disabled={hasHocBaDetail}
                        className={`w-full rounded-md border px-3 py-2 text-right text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-800 sm:w-40 ${hasHocBaDetail ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-500' : 'border-slate-200 bg-white text-blue-800'}`}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </CardSection>

              {/* Điểm Thi THPT */}
              <CardSection title="3. Điểm Thi THPT" icon={PenTool}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((idx) => (
                      <div key={`thpt-${idx}`}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Môn {idx + 1}
                        </label>
                        <input
                          type="number" min="0" max="10" step="0.1"
                          value={state.thpt[idx]}
                          onChange={(e) => handleThptChange(idx, e.target.value)}
                          disabled={hasThptQuickTotal}
                          className={`w-full px-3 py-2 border border-slate-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-800 ${hasThptQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : ''}`}
                          placeholder="0.0"
                        />
                      </div>
                    ))}
                  </div>
                  <QuickScoreInput
                    title="Nhập nhanh tổng điểm THPT 3 môn"
                    description="Thang 30 điểm (không tính ưu tiên)."
                    value={hasThptDetail ? (parseFloat(state.thpt[0]||0) + parseFloat(state.thpt[1]||0) + parseFloat(state.thpt[2]||0)).toFixed(2) : (state.thptQuickTotal ? (state.thptQuickTotal*3).toFixed(2) : '')}
                    onChange={(e) => state.setThptQuickTotal(clampScore((e.target.value / 3).toString(), 10))}
                    disabled={hasThptDetail}
                    max={30}
                    tone="blue"
                  />
                </div>
              </CardSection>

              {/* Thành tích & Ưu tiên */}
              <CardSection title="4. Thành Tích & Ưu Tiên" icon={Award}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-[13fr_14fr] gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Khu vực</label>
                      <select value={state.kv} onChange={e => state.setKv(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-800">
                        {KHU_VUC.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Đối tượng (Chính sách)</label>
                      <select value={state.dt} onChange={e => state.setDt(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-800">
                        {DOI_TUONG.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-5">
                    <h4 className="text-sm font-semibold text-slate-800 mb-3">Điểm cộng thành tích cho Bách Khoa (Max 10)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Điểm thưởng</label>
                        <input type="number" min="0" max="10" step="0.1" value={state.thuong} onChange={e => state.setThuong(clampScore(e.target.value, 10))} className="w-full bg-white px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-800" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Xét thưởng</label>
                        <input type="number" min="0" max="5" step="0.1" value={state.xetThuong} onChange={e => state.setXetThuong(clampScore(e.target.value, 5))} className="w-full bg-white px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-800" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Khuyến khích</label>
                        <input type="number" min="0" max="5" step="0.1" value={state.khuyenKhich} onChange={e => state.setKhuyenKhich(clampScore(e.target.value, 5))} className="w-full bg-white px-3 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardSection>
            </div>
            
            {/* Right Column - Setup Prompt */}
            <div className="w-full lg:w-1/3">
               <div className="sticky top-6 flex flex-col justify-center items-center p-8 bg-[color:var(--panel-muted)] rounded-[2rem] border border-[color:var(--line-soft)] text-center">
                 <div className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-700 rounded-full mb-4">
                   <Calculator className="h-10 w-10" />
                 </div>
                 <h2 className="text-2xl font-black text-slate-900">AI Chuẩn Bị Xếp Hạng</h2>
                 <p className="text-slate-600 mt-2 mb-8">
                   Nhập đầy đủ điểm của bạn ở form bên trái. Hệ thống sẽ tính điểm tự động theo công thức riêng của UIT, HCMUT, HCMUS... và xuất danh sách 15 nguyện vọng an toàn nhất.
                 </p>
                 <button 
                   onClick={() => setAnalyzed(true)}
                   className="w-full rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                 >
                   Bắt đầu xếp nguyện vọng
                 </button>
               </div>
            </div>
          </div>
        ) : (
          <div ref={pdfRef} className="space-y-8 bg-white p-2 rounded-2xl">
            <div className="flex justify-end gap-2 px-4 pt-4">
               <button onClick={exportPDF} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                 <Download className="h-4 w-4" /> Lưu PDF
               </button>
            </div>
            {/* Dashboard Charts */}
            <div className="grid lg:grid-cols-3 gap-6 px-4">
              <div className="rounded-2xl p-6 border border-slate-200 lg:col-span-1 bg-white shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 text-center">Radar Năng Lực AI</h3>
                <div className="relative h-64">
                  <Radar data={radarData} options={{ maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                 <div className="rounded-2xl p-6 border border-slate-200 flex flex-col justify-center bg-white shadow-sm">
                   <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Tổ Hợp THPT</p>
                   <p className="text-4xl font-black text-blue-700 mt-2">
                     {(() => {
                       let thptRaw = (parseFloat(state.thpt[0]) || 0) + (parseFloat(state.thpt[1]) || 0) + (parseFloat(state.thpt[2]) || 0);
                       if (state.thptQuickTotal !== '') thptRaw = parseFloat(state.thptQuickTotal) * 3;
                       return thptRaw.toFixed(2);
                     })()}
                   </p>
                 </div>
                 <div className="rounded-2xl p-6 border border-slate-200 flex flex-col justify-center bg-white shadow-sm">
                   <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Học Bạ (Tổng 3 môn)</p>
                   <p className="text-4xl font-black text-blue-700 mt-2">
                     {(() => {
                       if (state.hocBaQuickAverage !== '') return (parseFloat(state.hocBaQuickAverage) * 3).toFixed(2);
                       let hb = 0;
                       for (let i = 0; i < 3; i++) {
                          const v10 = parseFloat(state.hocBa[i * 3]) || 0;
                          const v11 = parseFloat(state.hocBa[i * 3 + 1]) || 0;
                          const v12 = parseFloat(state.hocBa[i * 3 + 2]) || 0;
                          hb += (v10 + v11 + v12) / 3;
                       }
                       return hb.toFixed(2);
                     })()}
                   </p>
                 </div>
                 <div className="rounded-2xl p-6 border border-slate-200 flex flex-col justify-center bg-white shadow-sm">
                   <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">ĐGNL HCMUT / KHÁC</p>
                   <p className="text-4xl font-black text-blue-700 mt-2">
                     {state.dgnlQuickTotal ? state.dgnlQuickTotal : dgnlDetailTotal} <span className="text-lg text-slate-400 font-medium">/ 1500</span>
                   </p>
                 </div>
                 <div className="rounded-2xl p-6 border border-blue-600 flex flex-col justify-center bg-blue-600 shadow-md">
                   <p className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Ngành Phù Hợp Nhất</p>
                   <p className="text-2xl font-black text-white mt-2">
                     {results.aspirations.length > 0 ? results.aspirations[0].name : "Chưa đủ dữ liệu"}
                   </p>
                 </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 mx-4 shadow-sm">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Bảng Đánh Giá Mọi Phương Thức (Top 15 An Toàn Nhất)</h3>
                  <p className="text-sm text-slate-500 mt-1">Sắp xếp tối ưu theo mức độ rủi ro giảm dần và độ ưu tiên ngành IT.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm bg-white border-collapse">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold whitespace-nowrap">NV</th>
                      <th className="p-4 font-semibold whitespace-nowrap">Trường</th>
                      <th className="p-4 font-semibold whitespace-nowrap">Ngành</th>
                      <th className="p-4 font-semibold whitespace-nowrap">Phương thức</th>
                      <th className="p-4 font-semibold text-right whitespace-nowrap">Điểm của bạn</th>
                      <th className="p-4 font-semibold text-right whitespace-nowrap">Điểm chuẩn (24/25)</th>
                      <th className="p-4 font-semibold whitespace-nowrap">Phân tích AI</th>
                      <th className="p-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.aspirations.slice(0, 15).map((nv) => (
                      <tr key={nv.id} className="hover:bg-blue-50/50 transition">
                        <td className="p-4 font-bold text-slate-900">#{nv.nv}</td>
                        <td className="p-4 font-medium text-slate-800">{nv.schoolName}</td>
                        <td className="p-4 text-blue-700 font-semibold">{nv.name}</td>
                        <td className="p-4 text-slate-500 font-medium">
                          <span className="px-2 py-1 bg-slate-100 rounded-md border border-slate-200 text-xs">{nv.method}</span>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-900">{nv.myScore}</td>
                        <td className="p-4 text-right font-mono text-slate-500">{nv.benchmark}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm ${nv.color}`}>
                            {nv.probability}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setSelectedAspiration(nv)}
                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition"
                          >
                            <Info className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {results.aspirations.length === 0 && (
                       <tr><td colSpan="8" className="p-8 text-center text-slate-500">Chưa có kết quả. Vui lòng nhập điểm để tính toán.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedAspiration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedAspiration.schoolName}</h2>
                  <p className="text-lg font-semibold text-blue-700 mt-1">{selectedAspiration.name}</p>
                </div>
                <button onClick={() => setSelectedAspiration(null)} className="text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2"><XCircle className="w-6 h-6" /></button>
              </div>
              
              <div className="space-y-6">
                 <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                   <h4 className="font-bold text-xs text-blue-800 uppercase tracking-wider mb-4">Chi tiết tính điểm ({selectedAspiration.method})</h4>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center text-lg font-mono bg-white p-3 rounded-xl shadow-sm">
                       <span className="text-slate-600 font-sans text-base font-semibold">Điểm quy đổi của bạn:</span>
                       <span className="font-bold text-blue-700">{selectedAspiration.myScore}</span>
                     </div>
                     <div className="flex justify-between items-center text-lg font-mono bg-white p-3 rounded-xl shadow-sm">
                       <span className="text-slate-600 font-sans text-base font-semibold">Điểm chuẩn (thực tế 24/25):</span>
                       <span className="font-bold text-slate-900">{selectedAspiration.benchmark}</span>
                     </div>
                     <div className="flex justify-between items-center text-lg font-mono bg-white p-3 rounded-xl shadow-sm border-2 border-transparent focus-within:border-blue-200">
                       <span className="text-slate-600 font-sans text-base font-semibold">Chênh lệch an toàn:</span>
                       <span className={`font-black ${parseFloat(selectedAspiration.diff) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                         {parseFloat(selectedAspiration.diff) > 0 ? '+' : ''}{selectedAspiration.diff}
                       </span>
                     </div>
                   </div>
                 </div>

                 <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                   <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500"/> Lý do xếp hạng #{selectedAspiration.nv}</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                     Hệ thống AI đánh giá nguyện vọng này ở mức <span className={`font-bold ${selectedAspiration.color.replace('bg-', 'text-')}`}>{selectedAspiration.probability}</span>. 
                     Thuật toán đã đối chiếu điểm của bạn với phương thức <strong>{selectedAspiration.method}</strong> của ngành. 
                     Đây là một trong những lựa chọn tối ưu thuộc nhóm chiến lược (Mơ ước / Vừa sức / An toàn) đảm bảo tỷ lệ trúng tuyển cao nhất cho bạn.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
