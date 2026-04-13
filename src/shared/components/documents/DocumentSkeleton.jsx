export function DocumentSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 animate-pulse h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="w-24 h-4 bg-slate-100 dark:bg-slate-800/60 rounded" />
        </div>
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-6" />
        <div className="mt-auto flex justify-between items-center">
          <div className="w-16 h-4 bg-slate-100 dark:bg-slate-800/60 rounded" />
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
