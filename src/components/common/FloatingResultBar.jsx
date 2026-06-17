const toneClass = {
  blue: 'bg-blue-700 hover:bg-blue-800',
  indigo: 'bg-indigo-700 hover:bg-indigo-800',
  emerald: 'bg-emerald-700 hover:bg-emerald-800',
  red: 'bg-rose-700 hover:bg-rose-800',
};

export const FloatingResultBar = ({
  tone = 'blue',
  label = 'Tổng điểm xét tuyển',
  value,
  onOpen,
}) => {
  const buttonTone = toneClass[tone] || toneClass.blue;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--line-soft)] bg-[color:var(--panel-base)]/95 p-4 shadow-[0_-14px_36px_-20px_rgba(15,23,42,0.45)] backdrop-blur supports-[padding:max(0px)]:pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--text-faint)]">
            {label}
          </div>
          <div className="mt-1 text-2xl font-black leading-none text-[color:var(--text-strong)]">
            {value}
          </div>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition ${buttonTone}`}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};
