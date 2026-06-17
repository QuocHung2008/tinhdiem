import { Calculator, X } from 'lucide-react';

const toneClass = {
  blue: {
    border: 'border-blue-200/70',
    gradient: 'from-blue-700 via-blue-800 to-slate-900',
    soft: 'text-blue-100',
  },
  indigo: {
    border: 'border-indigo-200/70',
    gradient: 'from-indigo-700 via-indigo-800 to-slate-900',
    soft: 'text-indigo-100',
  },
  emerald: {
    border: 'border-emerald-200/70',
    gradient: 'from-emerald-700 via-emerald-800 to-slate-900',
    soft: 'text-emerald-100',
  },
  red: {
    border: 'border-rose-200/70',
    gradient: 'from-rose-700 via-rose-800 to-slate-900',
    soft: 'text-rose-100',
  },
};

export const ResultShell = ({
  tone = 'blue',
  showMobile,
  onClose,
  title = 'Điểm xét tuyển',
  score,
  suffix = '/ 100',
  subtitle,
  children,
}) => {
  const styles = toneClass[tone] || toneClass.blue;

  return (
    <div
      className={`
        lg:block lg:w-[25rem] lg:flex-none lg:static
        ${showMobile ? 'fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-md sm:items-center sm:p-4 animate-in fade-in' : 'hidden'}
      `}
    >
      <div
        className={`
          relative flex w-full flex-col overflow-hidden bg-[color:var(--panel-base)] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.6)]
          ${showMobile ? 'max-h-[92vh] rounded-t-[2rem] sm:max-w-md sm:rounded-[2rem] animate-in slide-in-from-bottom-full sm:zoom-in-95' : `sticky top-24 rounded-[2rem] border ${styles.border}`}
        `}
      >
        {showMobile && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-2 text-white/80 backdrop-blur-sm transition hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className={`relative overflow-hidden bg-gradient-to-br ${styles.gradient} px-6 pb-7 pt-6 text-white`}>
          <div className="absolute -right-3 -top-3 rounded-full bg-white/10 p-6">
            <Calculator className="h-16 w-16" />
          </div>
          <div className="relative">
            <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${styles.soft}`}>
              Tong hop ket qua
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white/90">{title}</h2>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight">{score}</span>
              <span className={`pb-1 text-base font-medium ${styles.soft}`}>{suffix}</span>
            </div>
            {subtitle && <p className={`mt-3 text-sm ${styles.soft}`}>{subtitle}</p>}
          </div>
        </div>

        <div className="space-y-6 bg-[color:var(--panel-base)] p-6 text-[color:var(--text-body)]">{children}</div>
      </div>
    </div>
  );
};
