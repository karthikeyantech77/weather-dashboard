export function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/40">
      <p className="text-3xl">⚠️</p>
      <p className="mt-2 font-medium text-red-700 dark:text-red-300">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">Try again</button>
      )}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center dark:border-slate-600">
      <p className="text-4xl">🌤️</p>
      <p className="mt-2 font-medium">Search for a city to see its weather</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">Or tap “My location” to use your current position.</p>
    </div>
  );
}
