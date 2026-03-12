import { Search } from "lucide-react";

export function ChatHeader({ title }) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative group">
          <input
            className="no-focus-outline h-9 w-64 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm px-4 pl-10 focus:ring-1 focus:ring-primary transition-all"
            placeholder="Tìm kiếm trong hội thoại..."
            type="text"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
