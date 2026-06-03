import { Database, RotateCcw } from 'lucide-react';

const toneClass = {
  blue: {
    panel: 'border-blue-200 bg-blue-50/80 text-blue-950',
    icon: 'bg-blue-600 text-white',
    button: 'border-blue-200 bg-white text-blue-800 hover:bg-blue-100 focus-visible:ring-blue-500',
    badge: 'bg-blue-100 text-blue-800',
  },
  indigo: {
    panel: 'border-indigo-200 bg-indigo-50/80 text-indigo-950',
    icon: 'bg-indigo-600 text-white',
    button: 'border-indigo-200 bg-white text-indigo-800 hover:bg-indigo-100 focus-visible:ring-indigo-500',
    badge: 'bg-indigo-100 text-indigo-800',
  },
  emerald: {
    panel: 'border-emerald-200 bg-emerald-50/80 text-emerald-950',
    icon: 'bg-emerald-600 text-white',
    button: 'border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-100 focus-visible:ring-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  red: {
    panel: 'border-red-200 bg-red-50/80 text-red-950',
    icon: 'bg-red-600 text-white',
    button: 'border-red-200 bg-white text-red-800 hover:bg-red-100 focus-visible:ring-red-500',
    badge: 'bg-red-100 text-red-800',
  },
};

export const SavedScoresBanner = ({
  hasSavedData,
  onClear,
  tone = 'blue',
}) => {
  const styles = toneClass[tone] || toneClass.blue;

  return (
    <section
      aria-live="polite"
      className={`mb-8 rounded-2xl border p-4 shadow-sm backdrop-blur ${styles.panel}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className={`rounded-xl p-2 shadow-sm ${styles.icon}`}>
            <Database className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold sm:text-base">
                Tự động lưu điểm trên trình duyệt
              </h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
                {hasSavedData ? 'Đang hoạt động' : 'Sẵn sàng'}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-700">
              Điểm đã nhập được lưu cục bộ bằng `localStorage` trên trình duyệt này.
              {hasSavedData
                ? ' Khi mở lại trang, dữ liệu sẽ được phục hồi tự động.'
                : ' Hãy nhập điểm, thông tin sẽ tự động được lưu cho lần truy cập sau.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasSavedData}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles.button}`}
        >
          <RotateCcw className="h-4 w-4" />
          Xóa dữ liệu đã lưu
        </button>
      </div>
    </section>
  );
};
