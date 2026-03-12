import { Bot } from "lucide-react";

export function AIThinking() {
  return (
    <div className="flex gap-3 max-w-4xl mr-auto animate-fade-in">
      <div className="size-9 rounded-xl bg-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg">
        <Bot className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-white dark:bg-slate-800 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700 inline-flex items-center gap-1.5 w-fit">
          <div className="thinking-dots flex items-center gap-1">
            <span className="thinking-dot size-2 rounded-full bg-blue-700/60" />
            <span className="thinking-dot size-2 rounded-full bg-blue-700/60" />
            <span className="thinking-dot size-2 rounded-full bg-blue-700/60" />
          </div>
          <span className="text-xs text-slate-400 ml-2 font-medium">
            Đang suy nghĩ...
          </span>
        </div>
      </div>
    </div>
  );
}
