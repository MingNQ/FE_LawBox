import {
  Bot,
  FileText,
  FileCheck,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export function AIMessage({ children, time }) {
  return (
    <div className="flex gap-3 max-w-4xl mr-auto">
      <div className="size-9 rounded-xl bg-blue-700 flex items-center justify-center text-white shrink-0 shadow-lg">
        <Bot className="w-5 h-5" />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-sm font-bold text-blue-700 mb-2">AI Luật Sư</p>
          <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {children}
          </div>
          <div className="mt-4 flex items-center gap-4 pt-3 border-t border-slate-50 dark:border-slate-700/50">
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-700 transition-colors">
              <Copy className="w-3.5 h-3.5" />
              Sao chép
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-700 transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Chia sẻ
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-700 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-700 transition-colors">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">{time}</span>
      </div>
    </div>
  );
}

export function DocumentCard({ title, code, variant = "red" }) {
  const colorMap = {
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-600",
      Icon: FileText,
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600",
      Icon: FileCheck,
    },
  };

  const { bg, text, Icon } = colorMap[variant] || colorMap.red;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all cursor-pointer group">
      <div
        className={`size-10 rounded-lg ${bg} flex items-center justify-center ${text}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="overflow-hidden">
        <p className="text-xs font-bold truncate group-hover:text-blue-700 transition-colors">
          {title}
        </p>
        <p className="text-[10px] text-slate-500 uppercase tracking-tight">
          {code}
        </p>
      </div>
    </div>
  );
}
