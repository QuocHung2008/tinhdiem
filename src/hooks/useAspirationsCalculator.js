import { useMemo } from 'react';
import { usePersistentCalculatorState } from './usePersistentCalculatorState';
import { KHU_VUC, DOI_TUONG } from '../constants/common';
import { calculateAspirations } from '../utils/aspirationsLogic';

const INITIAL_VALUES = {
  doiTuongUT: '2.1',
  dgnlTv: '',
  dgnlTa: '',
  dgnlToan: '',
  dgnlKh: '',
  dgnlQuickTotal: '',
  hocBa: Array(9).fill(''),
  hocBaQuickAverage: '',
  thpt: ['', '', ''],
  thptQuickTotal: '',
  kv: 'KV3',
  dt: 'NONE',
  thuong: '',
  xetThuong: '',
  khuyenKhich: '',
};

export const useAspirationsCalculator = () => {
  const { values, generatedSetters, hasSavedData, clearSavedForm, exportData, importData } =
    usePersistentCalculatorState('vnuhcm-calculator:aspirations', INITIAL_VALUES);

  const results = useMemo(() => {
    // We will just pass the raw state to our new aspirations logic to evaluate all schools
    return calculateAspirations(values);
  }, [values]);

  return {
    state: {
      ...values,
      ...generatedSetters,
      hasSavedData,
      clearSavedForm,
      exportData,
      importData,
    },
    results
  };
};
