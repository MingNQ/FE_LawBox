import { Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full bg-white dark:bg-background-dark py-16 md:py-24 border-b border-[#e7ebf3] dark:border-slate-800">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <div className="mb-8 @container">
          <h1 className="text-[#0d121b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl mb-4">
            Hệ thống hỏi đáp, tra cứu <br className="hidden md:block" /> Luật lao động
            Việt Nam
          </h1>
          <p className="text-[#4c669a] dark:text-slate-400 text-base md:text-lg mx-auto">
            Truy cập kho dữ liệu văn bản pháp luật chính thống, cập nhật hàng ngày với công cụ tìm kiếm thông minh và tư vấn AI.
          </p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center bg-background-light dark:bg-slate-800 rounded-xl p-2 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              className="no-focus-outline flex-1 border-none bg-transparent text-[#0d121b] dark:text-white text-base md:text-lg placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-0"
              placeholder="Tìm kiếm văn bản pháp luật, nghị định, thông tư..."
              type="text"
              defaultValue=""
            />
            <button className="bg-primary bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold text-base transition-colors flex items-center gap-2">
              <span>Tìm kiếm</span>
            </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="text-sm text-slate-500 font-medium py-1">
              Xu hướng:
            </span>
            <a className="text-sm text-primary hover:underline py-1" href="#">
              Nghị định 123
            </a>
            <a className="text-sm text-primary hover:underline py-1" href="#">
              Luật Đất đai 2024
            </a>
            <a className="text-sm text-primary hover:underline py-1" href="#">
              Thông tư BHXH
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
