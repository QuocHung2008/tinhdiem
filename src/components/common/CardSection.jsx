import { useId } from 'react';

export const CardSection = ({ title, icon: Icon, children }) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.28)] backdrop-blur"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
        {Icon && (
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm ring-1 ring-slate-200">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Section
          </p>
          <h2 id={titleId} className="text-lg font-black tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
};
