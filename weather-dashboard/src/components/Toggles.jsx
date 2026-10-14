import { memo } from 'react';

export const UnitToggle = memo(function UnitToggle({ unit, onChange }) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg ring-1 ring-slate-300 dark:ring-slate-600" role="group" aria-label="Temperature unit">
      {['C', 'F'].map((u) => (
        <button key={u} onClick={() => onChange(u)} aria-pressed={unit === u}
          className={`px-3 py-1.5 text-sm font-medium ${unit === u ? 'bg-sky-600 text-white' : 'bg-white dark:bg-slate-800'}`}>
          °{u}
        </button>
      ))}
    </div>
  );
});

export const ThemeToggle = memo(function ThemeToggle({ theme, onToggle }) {
  return (
    <button onClick={onToggle} aria-label="Toggle dark mode"
      className="rounded-lg bg-white px-3 py-1.5 text-sm ring-1 ring-slate-300 dark:bg-slate-800 dark:ring-slate-600">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
});
