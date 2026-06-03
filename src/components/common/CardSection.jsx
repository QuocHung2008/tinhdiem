import { useId } from 'react';

export const CardSection = ({ title, icon: Icon, children }) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
        {Icon && <Icon className="w-5 h-5 text-blue-700" />}
        <h2 id={titleId} className="text-lg font-bold text-slate-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </section>
  );
};
