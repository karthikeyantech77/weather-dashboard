import { memo, useState } from 'react';

function SearchBar({ onSearch, onLocate, error, disabled }) {
  const [value, setValue] = useState('');
  const submit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search city, e.g. Chennai"
          aria-label="City name"
          aria-invalid={!!error}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800"
        />
        <div className="flex gap-2">
          <button type="submit" disabled={disabled}
            className="flex-1 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-700 disabled:opacity-50 sm:flex-none">
            Search
          </button>
          <button type="button" onClick={onLocate} disabled={disabled} title="Use my location"
            className="rounded-xl border border-slate-300 px-4 py-3 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-800">
            📍 My location
          </button>
        </div>
      </form>
      {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
export default memo(SearchBar);
