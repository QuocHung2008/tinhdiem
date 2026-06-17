import { useRef, useState, useEffect } from 'react';
import { Database, RotateCcw, Download, Upload, CheckCircle2, AlertTriangle, X } from 'lucide-react';

const toneClass = {
  blue: {
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))] text-[color:var(--text-strong)]',
    icon: 'bg-blue-600 text-white',
    button: 'border-[color:var(--line-soft)] bg-[color:var(--panel-base)] text-blue-800 hover:bg-blue-100/70 focus-visible:ring-blue-500',
    badge: 'bg-blue-100 text-blue-800',
  },
  indigo: {
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))] text-[color:var(--text-strong)]',
    icon: 'bg-indigo-600 text-white',
    button: 'border-[color:var(--line-soft)] bg-[color:var(--panel-base)] text-indigo-800 hover:bg-indigo-100/70 focus-visible:ring-indigo-500',
    badge: 'bg-indigo-100 text-indigo-800',
  },
  emerald: {
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))] text-[color:var(--text-strong)]',
    icon: 'bg-emerald-600 text-white',
    button: 'border-[color:var(--line-soft)] bg-[color:var(--panel-base)] text-emerald-800 hover:bg-emerald-100/70 focus-visible:ring-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  red: {
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))] text-[color:var(--text-strong)]',
    icon: 'bg-red-600 text-white',
    button: 'border-[color:var(--line-soft)] bg-[color:var(--panel-base)] text-red-800 hover:bg-red-100/70 focus-visible:ring-red-500',
    badge: 'bg-red-100 text-red-800',
  },
};

export const SavedScoresBanner = ({
  hasSavedData,
  onClear,
  onExport,
  onImport,
  tone = 'blue',
}) => {
  const styles = toneClass[tone] || toneClass.blue;
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null);

  useEffect(() => {
    if (importStatus?.type === 'success') {
      const timer = setTimeout(() => setImportStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [importStatus]);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportStatus(null);
    try {
      if (onImport) {
        await onImport(file);
        setImportStatus({ type: 'success', message: 'Nhập dữ liệu thành công!' });
      }
    } catch (error) {
      setImportStatus({ type: 'error', message: error.message });
    }
    // Reset input
    e.target.value = '';
  };

  return (
    <section
      aria-live="polite"
      className={`rounded-[1.75rem] border p-4 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.38)] backdrop-blur sm:p-5 ${styles.panel}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className={`rounded-2xl p-2.5 shadow-sm ${styles.icon}`}>
            <Database className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-black tracking-tight sm:text-base">
                Tự động lưu điểm trên trình duyệt
              </h2>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
                {hasSavedData ? 'Đang hoạt động' : 'Sẵn sàng'}
              </span>
            </div>
            <p className="text-sm leading-7 text-[color:var(--text-body)]">
              Điểm đã nhập được lưu cục bộ bằng `localStorage` trên trình duyệt này.
              {hasSavedData
                ? ' Khi mở lại trang, dữ liệu sẽ được phục hồi tự động.'
                : ' Hãy nhập điểm, thông tin sẽ tự động được lưu cho lần truy cập sau.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onExport && (
            <button
              type="button"
              onClick={onExport}
              disabled={!hasSavedData}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles.button}`}
              title="Xuất dữ liệu để nhập trên thiết bị khác"
            >
              <Download className="h-4 w-4" />
              Xuất
            </button>
          )}

          {onImport && (
            <>
              <button
                type="button"
                onClick={handleImportClick}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles.button}`}
                title="Nhập dữ liệu đã xuất từ thiết bị khác"
              >
                <Upload className="h-4 w-4" />
                Nhập
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
            </>
          )}

          <button
            type="button"
            onClick={onClear}
            disabled={!hasSavedData}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${styles.button}`}
          >
            <RotateCcw className="h-4 w-4" />
            Xóa dữ liệu
          </button>
        </div>
      </div>

      {importStatus && (
        <div className={`mt-4 flex items-start gap-3 rounded-xl p-3 text-sm font-medium border border-[color:var(--line-soft)] bg-[color:var(--panel-base)] ${importStatus.type === 'error' ? 'text-rose-500' : 'text-emerald-500'}`}>
          {importStatus.type === 'error' ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <CheckCircle2 className="h-5 w-5 shrink-0" />}
          <div className="flex-1 pt-0.5 text-[color:var(--text-body)]">{importStatus.message}</div>
          {importStatus.type === 'error' && (
             <button type="button" onClick={() => setImportStatus(null)} className="p-0.5 hover:bg-[color:var(--panel-muted)] rounded-lg transition-colors text-[color:var(--text-muted)]">
               <X className="h-4 w-4" />
             </button>
          )}
        </div>
      )}
    </section>
  );
};
