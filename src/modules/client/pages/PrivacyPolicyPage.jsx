import { ClientLayout } from "@client/components/layout/ClientLayout";
import { ShieldCheck } from "lucide-react";

export function PrivacyPolicyPage() {
  return (
    <ClientLayout>
      <div className="max-w-[1000px] mx-auto px-6 py-16 min-h-[60vh]">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Chính sách bảo mật
          </h1>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">
            Bảo vệ quyền riêng tư và thông tin cá nhân của bạn là ưu tiên hàng đầu tại LawBox. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">1. Thu thập thông tin</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Chúng tôi thu thập thông tin khi bạn đăng ký tài khoản, sử dụng tính năng ChatBot AI, hoặc tương tác với nền tảng. Các thông tin có thể bao gồm: tên, email, lịch sử tìm kiếm, và các đoạn hội thoại tư vấn pháp luật.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">2. Sử dụng thông tin</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Thông tin thu thập được sử dụng để:
              </p>
              <ul className="list-disc pl-6 text-slate-600 dark:text-slate-300 mt-2 space-y-1">
                <li>Cung cấp và cá nhân hóa các câu trả lời tư vấn pháp luật.</li>
                <li>Cải thiện và huấn luyện mô hình AI (các dữ liệu phân tích sẽ được ẩn danh).</li>
                <li>Xử lý giới hạn quota và các gói dịch vụ tài khoản.</li>
                <li>Gửi thông báo về những thay đổi quan trọng hoặc cập nhật tính năng.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">3. Bảo vệ dữ liệu</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Tất cả các truy vấn và thông tin cá nhân được mã hóa đường truyền theo chuẩn bảo mật TLS. Lịch sử hội thoại của bạn được lưu trữ an toàn và chỉ mình bạn (thông qua tài khoản) mới có quyền truy cập, trừ khi có yêu cầu từ cơ quan pháp luật có thẩm quyền.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">4. Cam kết không chia sẻ</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Chúng tôi tuyệt đối không bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba vì mục đích tiếp thị hoặc thương mại khi chưa có sự đồng ý rõ ràng.
              </p>
            </section>
          </div>
          
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
            Cập nhật lần cuối: 15/04/2026. Nếu bạn có câu hỏi về chính sách này, xin vui lòng liên hệ privacy@lawbox.vn
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
