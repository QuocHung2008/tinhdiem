import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Laptop,
  Info,
  PenTool,
  BookOpen,
} from 'lucide-react';
import { CardSection } from '../components/common/CardSection';
import { QuickScoreInput } from '../components/common/QuickScoreInput';
import { SavedScoresBanner } from '../components/common/SavedScoresBanner';
import { CalculatorHero } from '../components/common/CalculatorHero';
import { ResultShell } from '../components/common/ResultShell';
import { FloatingResultBar } from '../components/common/FloatingResultBar';
import { KHU_VUC, DOI_TUONG } from '../constants/common';
import { useUitCalculator } from '../hooks/useUitCalculator';

const clampScore = (value, max) => {
  if (value === '') return '';
  if (value.toString().trim().startsWith('-')) return '0';
  const number = parseFloat(value);
  if (Number.isNaN(number)) return value;
  return Math.min(Math.max(number, 0), max).toString();
};

export const UitCalculator = () => {
  const { state, results } = useUitCalculator();
  const [showMobileResultModal, setShowMobileResultModal] = useState(false);

  const subjects = ['Môn 1', 'Môn 2', 'Môn 3'];

  const hasThptDetail = state.thpt.some((value) => value !== '');
  const hasThptQuickTotal = state.thptQuickTotal !== '';
  const hasHocBaDetail = state.hocBa.some((value) => value !== '');
  const hasHocBaQuickTotal = state.hocBaQuickTotal !== '';

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

  const setQuickTotal = (setter, value) => {
    setter(clampScore(value, 30));
  };

  const resultCard = (
    <ResultShell
      tone="blue"
      showMobile={showMobileResultModal}
      onClose={() => setShowMobileResultModal(false)}
      score={results.total.toFixed(2)}
      subtitle="Tính theo công thức Xét tuyển tổng hợp UIT 2026"
    >
      <div className="space-y-5">
        <div>
          <div className="mb-3 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
            <div className="font-semibold">
              ĐHL = ĐGNL x 47.5% + THPT x 47.5% + Học bạ x 5.0%
            </div>
            <div className="mt-2 flex justify-between font-bold">
              <span>ĐHL</span>
              <span>{results.dhl.toFixed(2)}</span>
            </div>
          </div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Điểm học lực</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">ĐGNL chuẩn hóa (Thang 100)</span>
              <span className="font-semibold">{results.dgnl100.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">THPT chuẩn hóa (Thang 100)</span>
              <span className="font-semibold">{results.thpt100.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Học bạ chuẩn hóa (Thang 100)</span>
              <span className="font-semibold">{results.hocBa100.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Điểm cộng & Ưu tiên</h3>
          <div className="space-y-4 text-sm">
            <div className="space-y-1">
              {state.hasLanguage && results.bonusLanguage > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Cộng ngoại ngữ</span>
                  <span>+{results.bonusLanguage.toFixed(2)}</span>
                </div>
              )}
              {state.hasHsg && results.bonusHsg > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Cộng HSG / Olympic</span>
                  <span>+{results.bonusHsg.toFixed(2)}</span>
                </div>
              )}
              {state.hasTinHoc && results.bonusTinHoc > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Cộng Olympic Tin / VOAI</span>
                  <span>+{results.bonusTinHoc.toFixed(2)}</span>
                </div>
              )}
              {state.hasSpecialSchool && results.bonusSpecialSchool > 0 && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Cộng 149 trường ưu tiên</span>
                  <span>+{results.bonusSpecialSchool.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between rounded bg-amber-50 p-2 font-medium text-amber-900 border border-amber-100">
                <div className="flex flex-col">
                  <span>Tổng điểm cộng</span>
                  {results.dcGoc > 10 && (
                    <span className="text-[10px] text-amber-700 font-normal">Capped tối đa 10.0đ</span>
                  )}
                </div>
                <span className="font-bold text-amber-700">+{results.dcThucNhan.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-slate-600">
                <span>Ưu tiên KV/ĐT (Gốc)</span>
                <span>+{results.priority100.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between rounded bg-emerald-50 p-2 font-medium text-emerald-900 border border-emerald-100">
                <div className="flex flex-col">
                  <span>Ưu tiên thực nhận</span>
                  {results.dhl + results.dcThucNhan >= 75 && (
                    <span className="text-[10px] text-emerald-700 font-normal">Giảm dần theo quy chế Bộ</span>
                  )}
                </div>
                <span className="font-bold text-emerald-700">+{results.priorityAccepted.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResultShell>
  );

  return (
    <div className="w-full animate-in fade-in pb-28 duration-500">
      <div className="space-y-8">
        <CalculatorHero
          title="Máy tính điểm UIT 2026"
          description="Xét tuyển tổng hợp của Trường Đại học Công nghệ Thông tin - ĐHQG-HCM. Phương thức chủ đạo kết hợp ĐGNL, tốt nghiệp THPT, Học bạ cùng các chứng chỉ quốc tế và giải thưởng học thuật."
          icon={Laptop}
          tone="blue"
          ctaLabel="Xem phương thức tuyển sinh UIT"
          ctaHref="https://tuyensinh.uit.edu.vn/2026-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-2026"
        />

        <SavedScoresBanner
          hasSavedData={state.hasSavedData}
          onClear={state.clearSavedForm}
          tone="blue"
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6">
            
            {/* Học bạ */}
            <CardSection title="1. Điểm Học bạ" icon={BookOpen}>
              <div className="space-y-4">
                <h4 className="mb-3 font-semibold text-slate-800">Học bạ 3 môn (Điểm trung bình năm học)</h4>
                
                {/* Desktop View: Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="rounded-tl-lg px-3 py-2 text-left font-semibold">Môn</th>
                        <th className="px-3 py-2 font-semibold">Lớp 10</th>
                        <th className="px-3 py-2 font-semibold">Lớp 11</th>
                        <th className="rounded-tr-lg px-3 py-2 font-semibold">Lớp 12</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjects.map((subject, subjectIndex) => (
                        <tr key={`hocba-desktop-${subject}`}>
                          <td className="px-3 py-2 font-medium text-slate-700">{subject}</td>
                          {[0, 1, 2].map((yearIndex) => {
                            const cellIndex = subjectIndex * 3 + yearIndex;
                            return (
                              <td key={cellIndex} className="px-1 py-2">
                                <input
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="0.1"
                                  value={state.hocBa[cellIndex]}
                                  onChange={(event) => handleHocBaChange(cellIndex, event.target.value)}
                                  disabled={hasHocBaQuickTotal}
                                  className={`w-full rounded-md border border-slate-200 px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    hasHocBaQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : ''
                                  }`}
                                  placeholder="0.0"
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Stacked Cards */}
                <div className="block md:hidden space-y-4">
                  {subjects.map((subject, subjectIndex) => (
                    <div key={`hocba-mobile-${subject}`} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 space-y-2">
                      <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">{subject}</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Lớp 10', idx: 0 },
                          { label: 'Lớp 11', idx: 1 },
                          { label: 'Lớp 12', idx: 2 }
                        ].map((year) => {
                          const cellIndex = subjectIndex * 3 + year.idx;
                          return (
                            <div key={year.label} className="space-y-1">
                              <span className="text-[10px] font-medium text-slate-500 block text-center">{year.label}</span>
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={state.hocBa[cellIndex]}
                                onChange={(event) => handleHocBaChange(cellIndex, event.target.value)}
                                disabled={hasHocBaQuickTotal}
                                className={`w-full rounded-lg border border-slate-200 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                                  hasHocBaQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'text-slate-950 font-semibold'
                                }`}
                                placeholder="0.0"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <QuickScoreInput
                  title="Nhập nhanh tổng điểm học bạ"
                  value={hasHocBaDetail ? ((results.hocBaTotal / 30) * 30).toFixed(2) : state.hocBaQuickTotal}
                  onChange={(event) => setQuickTotal(state.setHocBaQuickTotal, event.target.value)}
                  disabled={hasHocBaDetail}
                  step="0.01"
                  placeholder="0.00"
                  tone="blue"
                />
              </div>
            </CardSection>

            {/* Điểm Thi */}
            <CardSection title="2. Điểm các kỳ thi (ĐGNL & THPT)" icon={PenTool}>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 block text-sm font-semibold text-slate-700">Điểm Đánh giá năng lực ĐHQG-HCM</h4>
                  <input
                    type="number"
                    min="0"
                    max="1200"
                    value={state.dgnl}
                    onChange={(event) => state.setDgnl(clampScore(event.target.value, 1200))}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: 850 (trên thang 1200)"
                  />
                </div>

                <div className="h-px bg-slate-100" />

                <div>
                  <h4 className="mb-3 font-semibold text-slate-800">Điểm thi tốt nghiệp THPT 3 môn</h4>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {subjects.map((subject, index) => (
                      <div key={`thpt-${subject}`} className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500 block text-center">{subject}</label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={state.thpt[index]}
                          onChange={(event) => handleThptChange(index, event.target.value)}
                          disabled={hasThptQuickTotal}
                          className={`w-full rounded-lg border border-slate-200 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                            hasThptQuickTotal ? 'cursor-not-allowed bg-slate-100 text-slate-400' : 'text-slate-950 font-semibold'
                          }`}
                          placeholder="0.0"
                        />
                      </div>
                    ))}
                  </div>

                  <QuickScoreInput
                    title="Nhập nhanh tổng THPT"
                    value={hasThptDetail ? results.thptTotal.toFixed(2) : state.thptQuickTotal}
                    onChange={(event) => setQuickTotal(state.setThptQuickTotal, event.target.value)}
                    disabled={hasThptDetail}
                    step="0.01"
                    placeholder="0.00"
                    tone="blue"
                  />
                </div>
              </div>
            </CardSection>

            {/* Điểm cộng thành tích */}
            <CardSection title="3. Điểm cộng thành tích (Cộng tối đa 10.0đ)" icon={Award}>
              <div className="space-y-6">
                
                {/* 1. Chứng chỉ Ngoại ngữ */}
                <div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <input
                      type="checkbox"
                      checked={state.hasLanguage}
                      onChange={(event) => state.setHasLanguage(event.target.checked)}
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Có chứng chỉ Ngoại ngữ quốc tế (Cộng 5.0đ)</span>
                  </label>
                  {state.hasLanguage && (
                    <div className="mt-3 grid grid-cols-1 gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 md:grid-cols-3">
                      <select
                        value={state.languageType}
                        onChange={(event) => {
                          state.setLanguageType(event.target.value);
                          state.setLanguageScore('');
                          state.setLanguageScore2('');
                        }}
                        className="rounded-md border border-blue-200 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="IELTS">IELTS (Academic)</option>
                        <option value="TOEFL">TOEFL iBT</option>
                        <option value="TOEIC">TOEIC (Nghe/Đọc & Nói/Viết)</option>
                        <option value="JLPT">JLPT (Tiếng Nhật)</option>
                      </select>

                      {state.languageType === 'JLPT' ? (
                        <select
                          value={state.languageScore}
                          onChange={(event) => state.setLanguageScore(event.target.value)}
                          className="rounded-md border border-blue-200 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          <option value="">Chọn cấp độ</option>
                          <option value="N3">N3 trở lên</option>
                          <option value="N2">N2</option>
                          <option value="N1">N1</option>
                        </select>
                      ) : (
                        <input
                          type="number"
                          value={state.languageScore}
                          onChange={(event) => {
                            const max = state.languageType === 'IELTS' ? 9.0 : state.languageType === 'TOEFL' ? 120 : 990;
                            state.setLanguageScore(clampScore(event.target.value, max));
                          }}
                          className="rounded-md border border-blue-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                          placeholder={state.languageType === 'TOEIC' ? 'Điểm Nghe-Đọc (Min: 650)' : 'Điểm chứng chỉ'}
                        />
                      )}

                      {state.languageType === 'TOEIC' && (
                        <input
                          type="number"
                          value={state.languageScore2}
                          onChange={(event) => state.setLanguageScore2(clampScore(event.target.value, 400))}
                          className="rounded-md border border-blue-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                          placeholder="Điểm Nói-Viết (Min: 250)"
                        />
                      )}

                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 md:col-span-3">
                        {results.bonusLanguage > 0 ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Đủ điều kiện cộng: +{results.bonusLanguage.toFixed(1)} điểm</span>
                          </>
                        ) : (
                          <span className="text-slate-500">
                            Yêu cầu: IELTS &ge; 5.0 | TOEFL &ge; 50 | TOEIC (NĐ &ge; 650 & NV &ge; 250) | JLPT &ge; N3.
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Giải HSG / Olympic */}
                <div>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <input
                      type="checkbox"
                      checked={state.hasHsg}
                      onChange={(event) => state.setHasHsg(event.target.checked)}
                      className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Đạt giải HSG Quốc gia, cấp Tỉnh hoặc Olympic quốc tế (Cộng 10.0đ)</span>
                  </label>
                  {state.hasHsg && (
                    <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <select
                        value={state.hsgRank}
                        onChange={(event) => state.setHsgRank(event.target.value)}
                        className="w-full rounded-md border border-blue-200 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="NONE">-- Chọn thành tích đạt giải --</option>
                        <option value="HSG_QG_TINH">
                          Huy chương Olympic Quốc tế / Giải HSG Quốc gia (Nhất/Nhì/Ba/KK) / Giải HSG Cấp Tỉnh (Nhất/Nhì/Ba)
                        </option>
                      </select>
                      {state.hsgRank === 'HSG_QG_TINH' && (
                        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Đủ điều kiện cộng: +10.0 điểm</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Olympic Tin học / VOAI */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <input
                    type="checkbox"
                    checked={state.hasTinHoc}
                    onChange={(event) => state.setHasTinHoc(event.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Đạt giải Olympic Tin học sinh viên / Olympic Trí tuệ Nhân tạo (VOAI) (Cộng 5.0đ)</span>
                    <span className="text-xs text-slate-500">Áp dụng giải Đặc biệt/Nhất/Nhì/Ba các năm 2024, 2025, 2026</span>
                  </div>
                </label>

                {/* 4. 149 trường ưu tiên */}
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <input
                    type="checkbox"
                    checked={state.hasSpecialSchool}
                    onChange={(event) => state.setHasSpecialSchool(event.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Học sinh thuộc danh sách 149 trường THPT ưu tiên của ĐHQG-HCM (Cộng 5.0đ)</span>
                    <span className="text-xs text-slate-500">Yêu cầu: Đạt học lực Giỏi và hạnh kiểm Tốt 3 năm THPT, ĐTB môn tổ hợp xét tuyển &ge; 8.0</span>
                  </div>
                </label>

              </div>
            </CardSection>

            {/* Ưu tiên khu vực & đối tượng */}
            <CardSection title="4. Ưu tiên khu vực & đối tượng" icon={Info}>
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Khu vực</label>
                  <select
                    value={state.kv}
                    onChange={(event) => state.setKv(event.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    {KHU_VUC.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Đối tượng</label>
                  <select
                    value={state.dt}
                    onChange={(event) => state.setDt(event.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    {DOI_TUONG.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardSection>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Khu vực</label>
                  <select
                    value={state.kv}
                    onChange={(event) => state.setKv(event.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {KHU_VUC.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Đối tượng</label>
                  <select
                    value={state.dt}
                    onChange={(event) => state.setDt(event.target.value)}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DOI_TUONG.map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardSection>

          </div>

          {resultCard}
        </div>

        <FloatingResultBar
          tone="blue"
          value={`${results.total.toFixed(2)} / 100`}
          onOpen={() => setShowMobileResultModal(true)}
        />
      </div>
    </div>
  );
};
