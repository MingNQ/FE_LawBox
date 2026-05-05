import { ClientLayout } from "@client/components/layout/ClientLayout";
import { Info } from "lucide-react";

export function AboutUsPage() {
  return (
    <ClientLayout>
      <div className="max-w-[1000px] mx-auto px-6 py-16 min-h-[60vh]">
        <div className="flex items-center gap-3 mb-8">
          <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Về chúng tôi
          </h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Chào mừng bạn đến với LawBox - nền tảng tra cứu và tư vấn pháp luật
            thông minh sử dụng trí tuệ nhân tạo (AI).
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-4">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Chúng tôi tin rằng mọi người và mọi doanh nghiệp đều có quyền tiếp
            cận kiến thức pháp luật một cách dễ dàng, chính xác và nhanh chóng.
            Sứ mệnh của LawBox là phá bỏ những rào cản phức tạp của ngôn từ pháp
            lý, mang đến cho bạn các thông tin và lời khuyên chuẩn xác nhất
            thông qua sức mạnh của công nghệ AI hiện đại.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-4">
            Tầm nhìn
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Trở thành trợ lý pháp lý AI đáng tin cậy nhất tại Việt Nam, đồng
            hành cùng người dân và doanh nghiệp trong mọi vấn đề liên quan đến
            luật pháp.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-4">
            Liên hệ với chúng tôi
          </h3>
          <div className="flex gap-1">
            <p className="text-slate-800 dark:text-slate-100 leading-relaxed">Email:{" "}</p>
            <a href="mailto:contact@lawbox.vn" className="underline">
              contact@lawbox.vn
            </a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
