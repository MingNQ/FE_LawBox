import { Bot, Scale, BookOpen, Shield } from "lucide-react";

export function ChatWelcome() {
  const suggestions = [
    {
      icon: Scale,
      title: "Tư vấn pháp luật",
      desc: "Hỏi về các vấn đề pháp lý hàng ngày",
    },
    {
      icon: BookOpen,
      title: "Tra cứu luật",
      desc: "Tìm hiểu các điều luật, nghị định",
    },
    {
      icon: Shield,
      title: "Quyền lợi của bạn",
      desc: "Tìm hiểu quyền lợi pháp lý cá nhân",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 select-none">
      <div className="relative mb-6">
        <div className="size-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-700/20 animate-float">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 size-5 bg-green-500 rounded-full border-[3px] border-white dark:border-[#0d1117]" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 tracking-tight">
        Xin chào! Tôi là <span className="text-blue-700">AI Luật Sư</span>
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mb-8 leading-relaxed">
        Trợ lý pháp lý thông minh, sẵn sàng hỗ trợ bạn giải đáp mọi thắc mắc về
        pháp luật Việt Nam.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {suggestions.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/40 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-700/5 transition-all cursor-pointer group"
          >
            <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
              <item.icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {item.title}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
