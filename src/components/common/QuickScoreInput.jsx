import { useId } from 'react';

const toneClass = {
  blue: {
    ring: 'focus:ring-blue-500',
    active: 'text-blue-800',
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))]',
  },
  hcmut: {
    ring: 'focus:ring-blue-800',
    active: 'text-blue-800',
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))]',
  },
  emerald: {
    ring: 'focus:ring-emerald-600',
    active: 'text-emerald-800',
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))]',
  },
  indigo: {
    ring: 'focus:ring-indigo-600',
    active: 'text-indigo-800',
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))]',
  },
  red: {
    ring: 'focus:ring-red-500',
    active: 'text-red-800',
    panel: 'border-[color:var(--line-soft)] bg-[linear-gradient(135deg,var(--panel-muted),var(--panel-elevated))]',
  },
};

export const QuickScoreInput = ({
  title,
  description = 'Tổng điểm 3 môn trên thang 30.',
  value,
  onChange,
  disabled,
  max = 30,
  step = '0.01',
  placeholder = '0.00',
  tone = 'blue',
  className = '',
}) => {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;
  const toneStyle = toneClass[tone] || toneClass.blue;
  const handleChange = (event) => {
    const { value } = event.target;
    if (value !== '') {
      if (value.toString().trim().startsWith('-')) {
        event.target.value = '0';
        onChange(event);
        return;
      }
      const number = parseFloat(value);
      const maxValue = parseFloat(max);
      if (!Number.isNaN(number)) {
        event.target.value = Math.min(Math.max(number, 0), maxValue).toString();
      }
    }
    onChange(event);
  };

  return (
    <div className={`rounded-[1.5rem] border p-4 shadow-sm ${toneStyle.panel} ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label htmlFor={inputId} className="mb-1 block text-sm font-bold text-[color:var(--text-strong)]">
            {title}
          </label>
          <p id={descriptionId} className="text-xs leading-6 text-[color:var(--text-muted)]">{description}</p>
        </div>
        <input
          id={inputId}
          type="number"
          min="0"
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-describedby={description ? descriptionId : undefined}
          className={`w-full rounded-2xl border px-4 py-3 text-right text-xl font-black tracking-tight shadow-sm focus:outline-none focus:ring-2 sm:w-44 ${toneStyle.ring} ${
            disabled
              ? 'cursor-not-allowed border-[color:var(--line-soft)] bg-[color:var(--panel-muted)] text-[color:var(--text-faint)]'
              : `border-[color:var(--line-soft)] bg-[color:var(--panel-base)] ${toneStyle.active}`
          }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
