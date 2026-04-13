import { Loader2, Info } from "lucide-react";

export function BackgroundTaskIndicator({ isOpen, message = "Hệ thống đang xử lý..." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 duration-500">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-sm">
        <div className="relative flex items-center justify-center shrink-0">
          <div className="w-10 h-10 rounded-full border-4 border-blue-50 dark:border-blue-900/20" />
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin absolute top-0 left-0" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Tác vụ ngầm
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
            {message}
          </p>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
