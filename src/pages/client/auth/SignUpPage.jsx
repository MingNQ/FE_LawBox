import { Gavel, User } from "lucide-react";
import EmailInput from "../../../components/auth/EmailInput";
import { PasswordInput } from "../../../components/auth/PasswordInput";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <>
      <title>Đăng ký</title>

      <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-0 md:p-4">
        <div className="flex w-full max-w-[1200px] min-h-[700px] bg-white dark:bg-[#1a2131] rounded-none md:rounded-xl shadow-2xl overflow-hidden">
          <div
            className="hidden lg:flex flex-col justify-center items-start w-1/2 p-16 bg-linear-to-b from-[#135beccc] to-[#101622e6] text-white relative"
            data-alt="Scales of justice and law books in a library"
          >
            <div className="max-w-md">
              <div className="mb-8 flex items-center gap-2">
                <Gavel />
                <span className="text-2xl font-black tracking-tight">
                  LAWBOX
                </span>
              </div>
              <h1 className="text-4xl font-extrabold leading-tight mb-6">
                Tra cứu Luật Lao động Việt Nam nhanh chóng &amp; chính xác
              </h1>
              <p className="text-xl font-medium opacity-90 leading-relaxed mb-8">
                Khám phá hệ thống thư viện luật đồ sộ, hỏi đáp cùng chuyên gia
                và cập nhật tin tức pháp lý mới nhất mỗi ngày.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                  <span className="material-symbols-outlined text-white">
                    verified
                  </span>
                  <span className="text-sm font-semibold">
                    Dữ liệu chính thống
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                  <span className="material-symbols-outlined text-white">
                    support_agent
                  </span>
                  <span className="text-sm font-semibold">Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-16">
              <p className="text-sm text-white/50">
                © 2026 LawBox Platform. Bảo lưu mọi quyền.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 bg-white dark:bg-[#1a2131]">
            <div className="max-w-[420px] mx-auto w-full">
              <div className="lg:hidden mb-8 flex items-center gap-2 text-blue-700">
                <Gavel />
                <span className="text-xl font-bold">LAWBOX</span>
              </div>
              <div className="mb-10">
                <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold mb-2">
                  Tạo tài khoản mới
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Vui lòng nhập thông tin để bắt đầu sử dụng dịch vụ.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                      Tên
                    </label>
                    <input
                      name="firstName"
                      placeholder="Tên"
                      className="border px-3 py-2 rounded mr-2"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                      Họ
                    </label>
                    <input
                      name="lastName"
                      placeholder="Họ"
                      className="border px-3 py-2 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <EmailInput />
                    <User className="material-symbols-outlined absolute right-4 text-[#94a3b8]" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                    Mật khẩu
                  </label>
                  <PasswordInput />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                    Xác nhận mật khẩu
                  </label>
                  <PasswordInput />
                </div>
                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      className="w-4 h-4 rounded border-[#cfd7e7] text-blue-700 focus:ring-blue-700/20 transition-all cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium group-hover:text-blue-700 transition-colors">
                      Tôi đồng ý với{" "}
                      <a
                        class="font-semibold text-blue-700 hover:underline"
                        href="#"
                      >
                        Điều khoản
                      </a>{" "}
                      và{" "}
                      <a
                        class="font-semibold text-blue-700 hover:underline"
                        href="#"
                      >
                        Chính sách bảo mật
                      </a>
                      .
                    </span>
                  </label>
                </div>
                <button
                  className="w-full bg-blue-700 hover:bg-blue-700/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-700/20 transition-all active:scale-[0.98]"
                  type="submit"
                >
                  Đăng ký
                </button>
              </div>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-[#1a2131] px-3 text-slate-400 font-medium tracking-wider">
                    Hoặc đăng ký bằng
                  </span>
                </div>
              </div>
              <div className="grid gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#cfd7e7] dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Google
                  </span>
                </button>
              </div>
              <div className="mt-12 text-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Bạn đã có tài khoản?
                  <Link
                    to="/auth/sign-in"
                    className="text-blue-700 font-bold hover:underline ml-1"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
