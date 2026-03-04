import { Bot } from "lucide-react";

export function AIPromptSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 mb-12">
      <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-[500px]">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Bạn có câu hỏi pháp lý khó?
            </h2>
            <p className="text-lg">
              Thử ngay trợ lý AI chuyên nghiệp của chúng tôi để được giải đáp
              tức thì dựa trên cơ sở pháp luật hiện hành.
            </p>
          </div>
          <button className="flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white text-primary text-base font-black shadow-xl hover:bg-slate-100 transition-all">
            <Bot className="w-5 h-5" />
            Hỏi đáp AI ngay
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}
