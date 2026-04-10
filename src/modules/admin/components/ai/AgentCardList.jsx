import {
  Bot,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Cpu,
  Activity,
} from "lucide-react";

export default function AgentCardList({
  agents = [],
  onEdit,
  onDelete,
  onToggle,
}) {
  if (!agents || agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <Bot className="w-12 h-12 text-slate-300 mb-4" />
        <p className="text-slate-500 font-medium">Chưa có agent nào được tạo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="group relative bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden flex flex-col"
        >
          {agent.isDefault && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-lg z-10 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Mặc định</span>
            </div>
          )}

          <div className="p-6 flex-1">
            <div className="flex items-start gap-4 mb-5">
              <div
                className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  agent.isEnabled
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                <Bot className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                  {agent.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      agent.isEnabled
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {agent.isEnabled ? "Hoạt động" : "Vô hiệu hóa"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Cpu className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">
                  {agent.providerName} / {agent.modelName}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Activity className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">
                  Temperature: {agent.temperature}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 min-h-[60px] leading-relaxed">
              {agent.description ||
                "Chưa có mô tả cho agent này. Agent này giúp xử lý các yêu cầu pháp lý thông minh."}
            </p>
          </div>

          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-auto">
            <button
              onClick={() => onToggle?.(agent)}
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                agent.isEnabled
                  ? "text-emerald-600 hover:text-emerald-700"
                  : "text-slate-400 hover:text-slate-500"
              }`}
            >
              {agent.isEnabled ? (
                <ToggleRight className="w-8 h-8" />
              ) : (
                <ToggleLeft className="w-8 h-8" />
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onEdit?.(agent)}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
              >
                <Edit className="w-4 h-4" />
                <span>Sửa</span>
              </button>
              <button
                onClick={() => onDelete?.(agent)}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
