import { Gavel, Plus, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ConversationItem from "./ConversationItem";
import { ROUTES } from "../../constants/routes";

export function ChatSidebar() {
  return (
    <aside className="w-72 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b22] h-full">
      <Link
        to={ROUTES.HOME}
        className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3"
      >
        <div className="size-8 rounded-lg flex items-center justify-center text-white bg-blue-700">
          <Gavel className="w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold tracking-tight text-blue-700">
          AI Luật Sư
        </h2>
      </Link>

      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-700/90 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm">
          <Plus className="w-5 h-5" />
          <span className="text-sm">Cuộc trò chuyện mới</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 px-3 py-3">
          Lịch sử trò chuyện
        </h3>
        <ConversationItem title="Tư vấn hợp đồng thuê nhà" current={true} />
        <ConversationItem title="Thủ tục sang tên sổ đỏ" />
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-colors">
          <Settings className="w-5 h-5" />
          <p className="text-sm font-medium">Cài đặt</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer transition-colors">
          <HelpCircle className="w-5 h-5" />
          <p className="text-sm font-medium">Trợ giúp</p>
        </div>
      </div>
    </aside>
  );
}
