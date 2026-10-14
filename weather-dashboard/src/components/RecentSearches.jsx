import { memo } from 'react';

function RecentSearches({ cities, onSelect, onClear }) {
  if (!cities.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">Recent:</span>
      {cities.map((city) => (
        <button key={city} onClick={() => onSelect(city)}
          className="rounded-full bg-white px-3 py-1 text-sm shadow-sm ring-1 ring-slate-200 hover:bg-sky-100 dark:bg-slate-800 dark:ring-slate-700 dark:hover:bg-slate-700">
          {city}
        </button>
      ))}
      <button onClick={onClear} className="text-sm text-slate-500 underline hover:text-red-500">Clear</button>
    </div>
  );
}
export default memo(RecentSearches);
