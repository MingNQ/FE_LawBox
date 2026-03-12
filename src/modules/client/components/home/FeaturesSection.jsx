import { ScanSearch, Bot, RefreshCw } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          <h2 className="text-[#0d121b] dark:text-white text-2xl font-bold tracking-tight">
            Tính năng chính
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group p-8 rounded-xl border border-[#cfd7e7] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:shadow-lg transition-all">
          <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary transition-colors">
            <ScanSearch className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">
            Tìm kiếm Đa năng
          </h3>
          <p className="text-[#4c669a] dark:text-slate-400 text-sm leading-relaxed">
            Tìm kiếm chính xác theo số hiệu, trích yếu, người ký hoặc toàn văn
            nội dung trong hàng triệu văn bản.
          </p>
        </div>
        <div className="group p-8 rounded-xl border border-[#cfd7e7] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:shadow-lg transition-all">
          <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary transition-colors">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">
            Tư vấn Pháp luật AI
          </h3>
          <p className="text-[#4c669a] dark:text-slate-400 text-sm leading-relaxed">
            Hỏi đáp các tình huống pháp lý trực tiếp với AI. Nhận câu trả lời
            kèm trích dẫn nguồn văn bản chính thống.
          </p>
        </div>
        <div className="group p-8 rounded-xl border border-[#cfd7e7] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:shadow-lg transition-all">
          <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary transition-colors">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2 dark:text-white">
            Dữ liệu Thời gian thực
          </h3>
          <p className="text-[#4c669a] dark:text-slate-400 text-sm leading-relaxed">
            Cập nhật các văn bản mới nhất ngay khi được ban hành. Theo dõi lược
            đồ quan hệ và tình trạng hiệu lực.
          </p>
        </div>
      </div>
    </section>
  );
}
