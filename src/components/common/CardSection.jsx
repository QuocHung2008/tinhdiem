import { useId } from 'react';

export const CardSection = ({ title, icon: Icon, children }) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="overflow-hidden rounded-[1.75rem] border border-[color:var(--line-soft)] bg-[color:var(--panel-elevated)] shadow-[0_24px_80px_-36px_rgba(13,59,102,0.22)] backdrop-blur"
    >
      <div className="flex items-center gap-3 border-b border-[color:var(--line-soft)] bg-[linear-gradient(90deg,var(--panel-muted),transparent)] px-5 py-4 sm:px-6">
        {Icon && (
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--brand-700)] text-white shadow-sm ring-1 ring-[color:var(--line-soft)]">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
            Admission Panel
          </p>
          <h2 id={titleId} className="text-lg font-black tracking-tight text-[color:var(--text-strong)]">
            {title}
          </h2>
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
};
