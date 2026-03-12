import { Gavel, Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-[#e7ebf3] dark:border-slate-800 py-12 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-primary">
              <Gavel className="w-6 h-6"/>
            </div>
            <h2 className="text-[#0d121b] dark:text-white text-lg font-bold">
              LawBox
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Hệ thống hỏi đáp, tra cứu văn bản luật Lao động Việt Nam. Cung cấp
            thông tin chính xác, nhanh chóng và đầy đủ.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase text-xs tracking-widest">
            Dịch vụ
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Tra cứu văn bản
              </a>
            </li>
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Hỏi đáp AI
              </a>
            </li>
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Công báo pháp luật
              </a>
            </li>
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Điểm tin tuần
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase text-xs tracking-widest">
            Thông tin
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Về chúng tôi
              </a>
            </li>
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                className="text-sm text-slate-500 hover:text-blue-700"
                href="#"
              >
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase text-xs tracking-widest">
            Kết nối
          </h4>
          <div className="flex gap-4">
            <a
              className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-blue-700 transition-all"
              href="#"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-blue-700 transition-all"
              href="#"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
        © 2026 LawBox. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}
