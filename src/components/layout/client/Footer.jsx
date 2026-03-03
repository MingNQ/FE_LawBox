import { Globe, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-[#e7ebf3] dark:border-slate-800 py-12 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-primary">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                  fill="currentColor"
                ></path>
              </svg>
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
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
                Tra cứu văn bản
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
                Hỏi đáp AI
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
                Công báo pháp luật
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
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
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-500 hover:text-blue-700" href="#">
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
