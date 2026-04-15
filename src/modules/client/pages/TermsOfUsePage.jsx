import { ClientLayout } from "@client/components/layout/ClientLayout";
import { FileText } from "lucide-react";

export function TermsOfUsePage() {
  return (
    <ClientLayout>
      <div className="max-w-[1000px] mx-auto px-6 py-16 min-h-[60vh]">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Điều khoản sử dụng
          </h1>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">
            Vui lòng đọc kỹ các điều khoản dưới đây trước khi tiến hành sử dụng dịch vụ tra cứu và tư vấn của LawBox. Việc sử dụng nền tảng đồng nghĩa với việc bạn chấp nhận đầy đủ các điều khoản này.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">1. Tính chất tham khảo của thông tin</h2>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200/50 dark:border-amber-800/30 mb-4">
                <p className="text-amber-800 dark:text-amber-400/90 text-sm font-medium">
                  Lưu ý quan trọng: LawBox là một công cụ AI được thiết kế để hỗ trợ việc tìm kiếm và tóm tắt thông tin pháp luật. Các câu trả lời từ AI KHÔNG thay thế cho lời khuyên pháp lý chuyên nghiệp từ luật sư được cấp phép.
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Người dùng hoàn toàn tự chịu trách nhiệm khi đưa ra quyết định hành động dựa trên những thông tin, tài liệu và tư vấn do hệ thống phản hồi.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">2. Tài khoản và Quản lý Hạn mức (Quota)</h2>
              <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 space-y-2">
                <li>Mỗi người dùng cần tạo tài khoản để sử dụng tính năng ChatBot AI.</li>
                <li>Tài khoản sẽ tuân thủ các quy định về Hạn mức Số lượng câu hỏi (Tokens/Requests) theo ngày và theo tháng tương ứng với gói dịch vụ đang sử dụng.</li>
                <li>Người dùng phải bảo vệ độ an toàn của mật khẩu và chịu trách nhiệm cho các hoạt động phát sinh từ tài khoản của mình.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">3. Quy định chung khi sử dụng</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Nghiêm cấm các hành vi:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mt-2 space-y-1">
                <li>Sử dụng AI của nền tảng vào các mục đích lừa đảo, vi phạm pháp luật Nhà Nước Việt Nam.</li>
                <li>Can thiệp, phá hoại hoặc cố ý làm quá tải hệ thống qua hình thức spam requests.</li>
                <li>Sử dụng ngôn ngữ thiếu chuẩn mực, công kích hoặc thù ghét nạp vào hệ thống AI.</li>
              </ul>
            </section>
          </div>
          
        </div>
      </div>
    </ClientLayout>
  );
}
