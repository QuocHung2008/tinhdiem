export const MAJOR_PRIORITIES = {
  'AI': 1, // Trí tuệ nhân tạo
  'CS': 2, // Khoa học máy tính
  'SE': 3, // Kỹ thuật phần mềm
  'DS': 4, // Khoa học dữ liệu
  'IT': 5, // Công nghệ thông tin
  'IS': 6, // An toàn thông tin
  'MIS': 7, // Hệ thống thông tin
  'CE': 8, // Kỹ thuật máy tính
  'OTHER': 9
};

export const UNIVERSITIES = [
  { id: 'uit', name: 'ĐH Công nghệ Thông tin (UIT)', tier: 1, type: 'vnu' },
  { id: 'hcmut', name: 'ĐH Bách khoa (HCMUT)', tier: 1, type: 'vnu' },
  { id: 'hcmus', name: 'ĐH Khoa học Tự nhiên (HCMUS)', tier: 1, type: 'vnu' },
  { id: 'ptit', name: 'Học viện Công nghệ Bưu chính Viễn thông (PTIT)', tier: 2, type: 'other' },
  { id: 'uel', name: 'ĐH Kinh tế - Luật (UEL)', tier: 2, type: 'vnu' },
  { id: 'iu', name: 'ĐH Quốc tế (IU)', tier: 2, type: 'vnu' },
  { id: 'spkt', name: 'ĐH Sư phạm Kỹ thuật (SPKT)', tier: 2, type: 'other' },
  { id: 'tdmu', name: 'ĐH Thủ Dầu Một (TDMU)', tier: 3, type: 'other' },
  { id: 'vku', name: 'ĐH CNTT & TT Việt - Hàn (VKU)', tier: 2, type: 'other' },
  { id: 'fpt', name: 'ĐH FPT', tier: 3, type: 'other' }
];

export const PROGRAMS_2025 = [
  // ===================== UIT =====================
  // DGNL Scale: 1200, THPT Scale: 30
  { id: 'uit-ai', schoolId: 'uit', name: 'Trí tuệ nhân tạo', majorType: 'AI', benchmarks: { dgnl: 980, thpt: 27.8 }, formulaType: 'uit_standard' },
  { id: 'uit-cs', schoolId: 'uit', name: 'Khoa học máy tính', majorType: 'CS', benchmarks: { dgnl: 960, thpt: 27.2 }, formulaType: 'uit_standard' },
  { id: 'uit-se', schoolId: 'uit', name: 'Kỹ thuật phần mềm', majorType: 'SE', benchmarks: { dgnl: 955, thpt: 26.9 }, formulaType: 'uit_standard' },
  { id: 'uit-ds', schoolId: 'uit', name: 'Khoa học dữ liệu', majorType: 'DS', benchmarks: { dgnl: 910, thpt: 26.4 }, formulaType: 'uit_standard' },
  { id: 'uit-it', schoolId: 'uit', name: 'Công nghệ thông tin', majorType: 'IT', benchmarks: { dgnl: 920, thpt: 26.5 }, formulaType: 'uit_standard' },
  { id: 'uit-is', schoolId: 'uit', name: 'An toàn thông tin', majorType: 'IS', benchmarks: { dgnl: 900, thpt: 26.1 }, formulaType: 'uit_standard' },
  { id: 'uit-mis', schoolId: 'uit', name: 'Hệ thống thông tin', majorType: 'MIS', benchmarks: { dgnl: 890, thpt: 25.8 }, formulaType: 'uit_standard' },
  { id: 'uit-ce', schoolId: 'uit', name: 'Kỹ thuật máy tính', majorType: 'CE', benchmarks: { dgnl: 895, thpt: 26.0 }, formulaType: 'uit_standard' },
  { id: 'uit-cntt-vietnhat', schoolId: 'uit', name: 'CNTT (Việt - Nhật)', majorType: 'IT', benchmarks: { dgnl: 880, thpt: 25.5 }, formulaType: 'uit_standard' },
  
  // ===================== HCMUT =====================
  // Combined Formula Scale: 100
  { id: 'hcmut-cs', schoolId: 'hcmut', name: 'Khoa học máy tính (gồm AI)', majorType: 'CS', benchmarks: { combined: 84.16 }, formulaType: 'hcmut_combined' },
  { id: 'hcmut-ce', schoolId: 'hcmut', name: 'Kỹ thuật máy tính', majorType: 'CE', benchmarks: { combined: 78.50 }, formulaType: 'hcmut_combined' },
  { id: 'hcmut-it-clc', schoolId: 'hcmut', name: 'Khoa học máy tính (Chất lượng cao)', majorType: 'CS', benchmarks: { combined: 80.00 }, formulaType: 'hcmut_combined' },

  // ===================== HCMUS =====================
  // DGNL Scale: 1200, THPT Scale: 30
  { id: 'hcmus-cs', schoolId: 'hcmus', name: 'Nhóm ngành Máy tính và CNTT', majorType: 'CS', benchmarks: { dgnl: 1005, thpt: 27.5 }, formulaType: 'hcmus_standard' },
  { id: 'hcmus-ai', schoolId: 'hcmus', name: 'Trí tuệ nhân tạo', majorType: 'AI', benchmarks: { dgnl: 1032, thpt: 28.0 }, formulaType: 'hcmus_standard' },
  { id: 'hcmus-ds', schoolId: 'hcmus', name: 'Khoa học dữ liệu', majorType: 'DS', benchmarks: { dgnl: 960, thpt: 27.0 }, formulaType: 'hcmus_standard' },
  { id: 'hcmus-se-clc', schoolId: 'hcmus', name: 'Kỹ thuật phần mềm (CLC)', majorType: 'SE', benchmarks: { dgnl: 940, thpt: 26.5 }, formulaType: 'hcmus_standard' },

  // ===================== PTIT =====================
  { id: 'ptit-it', schoolId: 'ptit', name: 'Công nghệ thông tin (Cơ sở phía Nam)', majorType: 'IT', benchmarks: { thpt: 25.9, dgnl: 860 }, formulaType: 'standard_thpt_dgnl' },
  { id: 'ptit-ai', schoolId: 'ptit', name: 'Trí tuệ nhân tạo (Cơ sở phía Nam)', majorType: 'AI', benchmarks: { thpt: 25.5, dgnl: 850 }, formulaType: 'standard_thpt_dgnl' },
  { id: 'ptit-is', schoolId: 'ptit', name: 'An toàn thông tin (Cơ sở phía Nam)', majorType: 'IS', benchmarks: { thpt: 25.1, dgnl: 840 }, formulaType: 'standard_thpt_dgnl' },

  // ===================== UEL =====================
  { id: 'uel-mis', schoolId: 'uel', name: 'Hệ thống thông tin quản lý', majorType: 'MIS', benchmarks: { dgnl: 890, thpt: 26.2 }, formulaType: 'uit_standard' },
  { id: 'uel-ecommerce', schoolId: 'uel', name: 'Thương mại điện tử', majorType: 'IT', benchmarks: { dgnl: 900, thpt: 26.5 }, formulaType: 'uit_standard' },
  
  // ===================== IU =====================
  { id: 'iu-it', schoolId: 'iu', name: 'Công nghệ thông tin', majorType: 'IT', benchmarks: { dgnl: 800, thpt: 24.5 }, formulaType: 'uit_standard' },
  { id: 'iu-ds', schoolId: 'iu', name: 'Khoa học dữ liệu', majorType: 'DS', benchmarks: { dgnl: 780, thpt: 23.5 }, formulaType: 'uit_standard' },
  { id: 'iu-ai', schoolId: 'iu', name: 'Trí tuệ nhân tạo (Mở mới)', majorType: 'AI', benchmarks: { dgnl: 790, thpt: 24.0 }, formulaType: 'uit_standard' },

  // ===================== SPKT =====================
  { id: 'spkt-it', schoolId: 'spkt', name: 'Công nghệ thông tin', majorType: 'IT', benchmarks: { thpt: 26.5, transcript: 28.0 }, formulaType: 'standard_thpt_transcript' },
  { id: 'spkt-se', schoolId: 'spkt', name: 'Kỹ thuật phần mềm', majorType: 'SE', benchmarks: { thpt: 26.2, transcript: 27.8 }, formulaType: 'standard_thpt_transcript' },
  { id: 'spkt-ai', schoolId: 'spkt', name: 'Trí tuệ nhân tạo', majorType: 'AI', benchmarks: { thpt: 26.0, transcript: 27.5 }, formulaType: 'standard_thpt_transcript' },
  { id: 'spkt-ce', schoolId: 'spkt', name: 'Kỹ thuật máy tính', majorType: 'CE', benchmarks: { thpt: 25.8, transcript: 27.0 }, formulaType: 'standard_thpt_transcript' },
  { id: 'spkt-ds', schoolId: 'spkt', name: 'Kỹ thuật dữ liệu', majorType: 'DS', benchmarks: { thpt: 25.5, transcript: 27.0 }, formulaType: 'standard_thpt_transcript' },

  // ===================== FPT =====================
  { id: 'fpt-it', schoolId: 'fpt', name: 'Công nghệ thông tin', majorType: 'IT', benchmarks: { transcript: 24.5, thpt: 22.0 }, formulaType: 'fpt_standard' },
  { id: 'fpt-ai', schoolId: 'fpt', name: 'Trí tuệ nhân tạo', majorType: 'AI', benchmarks: { transcript: 25.5, thpt: 23.0 }, formulaType: 'fpt_standard' },
  { id: 'fpt-se', schoolId: 'fpt', name: 'Kỹ thuật phần mềm', majorType: 'SE', benchmarks: { transcript: 24.5, thpt: 22.0 }, formulaType: 'fpt_standard' },

  // ===================== VKU =====================
  { id: 'vku-it', schoolId: 'vku', name: 'Công nghệ thông tin', majorType: 'IT', benchmarks: { thpt: 24.5, transcript: 25.5 }, formulaType: 'standard_thpt_transcript' },
  { id: 'vku-ai', schoolId: 'vku', name: 'Trí tuệ nhân tạo', majorType: 'AI', benchmarks: { thpt: 25.0, transcript: 26.0 }, formulaType: 'standard_thpt_transcript' },

  // ===================== TDMU =====================
  { id: 'tdmu-it', schoolId: 'tdmu', name: 'Công nghệ thông tin', majorType: 'IT', benchmarks: { thpt: 21.0, transcript: 23.0 }, formulaType: 'standard_thpt_transcript' },
  { id: 'tdmu-ai', schoolId: 'tdmu', name: 'Trí tuệ nhân tạo (Mở mới)', majorType: 'AI', benchmarks: { thpt: 21.5, transcript: 23.5 }, formulaType: 'standard_thpt_transcript' }
];
