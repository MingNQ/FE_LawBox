import { FileText, ChevronRight } from "lucide-react";

export function NewDocumentsSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-8 bg-primary rounded-full"></span>
          <h2 className="text-[#0d121b] dark:text-white text-2xl font-bold tracking-tight">
            Văn bản mới cập nhật
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded">
                Có hiệu lực
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Ban hành: 15/05/2024
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
              Nghị định 48/2024/NĐ-CP sửa đổi Nghị định 130/2018/NĐ-CP hướng dẫn
              Luật Giao dịch điện tử về chữ ký số và dịch vụ chứng thực chữ ký
              số
            </h3>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex items-center gap-4">
            <button className="flex items-center gap-1 text-primary text-sm font-semibold">
              <FileText className="w-4 h-4" />
              PDF
            </button>
            <button className="bg-primary/5 dark:bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded">
                Chờ hiệu lực
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Ban hành: 10/05/2024
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
              Thông tư 05/2024/TT-BXD quy định về quản lý và sử dụng kinh phí
              bảo trì phần sở hữu chung nhà chung cư
            </h3>
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 flex items-center gap-4">
            <button className="flex items-center gap-1 text-primary text-sm font-semibold">
              <FileText className="w-4 h-4" />
              PDF
            </button>
            <button className="bg-primary/5 dark:bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button className="px-8 py-3 border border-primary text-primary hover:bg-primary/5 rounded-lg font-bold transition-colors">
          Xem tất cả văn bản mới
        </button>
      </div>
    </section>
  );
}
