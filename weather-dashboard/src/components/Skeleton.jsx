const Block = ({ className }) => <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`} />;

export default function Skeleton() {
  return (
    <div aria-busy="true" aria-label="Loading weather" className="space-y-6">
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800">
        <Block className="h-7 w-48" />
        <Block className="h-5 w-32" />
        <Block className="h-16 w-40" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[...Array(4)].map((_, i) => <Block key={i} className="h-16" />)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => <Block key={i} className="h-36" />)}
      </div>
    </div>
  );
}
