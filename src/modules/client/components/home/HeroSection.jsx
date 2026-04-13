import { Sparkles, ShieldCheck, Scale } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full bg-slate-50 py-20 md:py-32 relative overflow-hidden border-b border-slate-200">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 skew-x-12 -translate-x-1/4" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h1 className="text-slate-900 text-4xl md:text-7xl font-black leading-[1.1] tracking-tight mb-8 max-w-4xl mx-auto">
          Tra cứu văn bản
          <br />
          <span className="text-blue-600">Luật Lao động</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          <p className="text-slate-600 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            Hệ thống lưu trữ và tra cứu văn bản quy phạm pháp luật. Hỗ trợ bóc
            tách nội dung bằng AI và cập nhật dữ liệu thời gian thực.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-12 border-t border-slate-200">
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-w-[200px] transition-transform hover:scale-105 duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-slate-900 font-bold text-lg">
                Chính thống
              </div>
              <div className="text-slate-500 text-xs font-medium">
                Dữ liệu từ Cổng Chính Phủ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 min-w-[200px] transition-transform hover:scale-105 duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-slate-900 font-bold text-lg">
                AI Phân tích
              </div>
              <div className="text-slate-500 text-xs font-medium">
                Hiểu sâu từng văn bản
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
