import { Lock, Verified } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";

export default function AuthModal({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!open) return null;

  const redirectParam = `?redirect=${encodeURIComponent(location.pathname)}`;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 dark:bg-black/40 backdrop-blur-[4px]">
      <div className="bg-white dark:bg-gray-900 w-full max-w-[440px] p-8 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 bg-blue-700/10 rounded-full flex items-center justify-center mb-2">
          <Lock className="text-blue-700 text-[40px]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0d121b] dark:text-white">
            Yêu cầu Đăng nhập
          </h2>
          <p className="text-[#4c669a] dark:text-gray-400 text-sm leading-relaxed px-4">
            Vui lòng Đăng nhập hoặc Đăng ký tài khoản để sử dụng ChatBot.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-4">
          <button
            onClick={() => navigate(ROUTES.AUTH.SIGN_IN + redirectParam)}
            className="w-full h-12 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-700/90 transition-all shadow-lg shadow-blue-700/20"
          >
            Đăng nhập ngay
          </button>
          <button
            onClick={() => navigate(ROUTES.AUTH.SIGN_UP + redirectParam)}
            className="w-full h-12 bg-[#f0f2f5] dark:bg-gray-800 text-[#0d121b] dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Tạo tài khoản mới
          </button>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Verified className="text-green-500 text-sm" />
          <p className="text-[12px] text-gray-500">
            Bảo mật thông tin theo tiêu chuẩn luật pháp
          </p>
        </div>
      </div>
    </div>
  );
}
