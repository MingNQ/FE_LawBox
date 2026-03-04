import { Search, Bell } from "lucide-react";

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
        <button className="size-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Bell className="w-5 h-5" />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer pl-1">
          <div className="size-8 rounded-full bg-slate-300 overflow-hidden">
            <img
              src="images/default-avatar.jpg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
