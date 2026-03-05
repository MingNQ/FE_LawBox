import { Gavel, User } from "lucide-react";
import { PasswordInput } from "../../../components/auth/PasswordInput";
import EmailInput from "../../../components/auth/EmailInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  initiateSignIn,
  verifySignIn,
  resendSignInOtp,
} from "../../../api/authApi";
import OtpVerificationStep from "../../../components/auth/OtpVerificationStep";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/routes";
import { authStorage } from "../../../stores/authStore";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(0);
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await initiateSignIn({
        contact: email,
        password: password,
        rememberMe: remember,
      });

      if (data.success) {
        setVerificationId(data.result.verificationId);
        setShowOtp(true);
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);

    try {
      const data = await verifySignIn({
        contact: email,
        verificationCode: otp,
        rememberMe: remember,
      });

      if (data.success == true) {
        await login(data.result.accessToken, data.result.refreshToken);
        authStorage.setTokens(
          data.result.accessToken,
          data.result.refreshToken,
          remember,
        );

        window.location.href = ROUTES.HOME;
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendSignInOtp({
        contact: email,
        verificationId: verificationId,
      });

      if (data.success == true) {
        console.log("Resend OTP success");
      } else {
        setError(data.result.message);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <title>Đăng nhập</title>

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
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Hệ thống tìm kiếm văn bản pháp luật và giải đáp pháp lý thông
                minh bằng công nghệ AI hàng đầu.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-700 bg-white rounded-full p-1 text-sm">
                    check
                  </span>
                  <span className="text-sm font-medium">
                    Hơn 500.000+ văn bản pháp luật
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-700 bg-white rounded-full p-1 text-sm">
                    check
                  </span>
                  <span className="text-sm font-medium">
                    Cập nhật văn bản mới mỗi ngày
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-700 bg-white rounded-full p-1 text-sm">
                    check
                  </span>
                  <span className="text-sm font-medium">
                    Hỗ trợ tư vấn pháp lý 24/7
                  </span>
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
            {showOtp ? (
              <OtpVerificationStep
                otp={otp}
                onOtpChange={setOtp}
                isLoading={isLoading}
                error={error}
                onVerify={handleVerifyOtp}
                onResend={handleResendOtp}
                onBack={() => {
                  setOtp("");
                  setShowOtp(false);
                }}
              />
            ) : (
              <>
                <div className="max-w-[420px] mx-auto w-full">
                  <div className="lg:hidden mb-8 flex items-center gap-2 text-blue-700">
                    <Gavel />
                    <span className="text-xl font-bold">LAWBOX</span>
                  </div>
                  <div className="mb-10">
                    <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold mb-2">
                      Chào mừng trở lại
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Vui lòng nhập thông tin để truy cập hệ thống.
                    </p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                        Email
                      </label>
                      <div className="relative flex items-center">
                        <EmailInput
                          placeholder={"Nhập email"}
                          value={email}
                          onEmailChange={(e) => setEmail(e.target.value)}
                        />
                        <User className="material-symbols-outlined absolute right-4 text-[#94a3b8]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[#0d121b] dark:text-white text-sm font-semibold">
                        Mật khẩu
                      </label>
                      <PasswordInput
                        placeholder={"Mật khẩu"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {error && (
                        <p className="text-red-500 text-sm text-center">
                          {error}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          className="w-4 h-4 rounded border-[#cfd7e7] text-blue-700 focus:ring-blue-700/20 transition-all cursor-pointer"
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium group-hover:text-blue-700 transition-colors">
                          Ghi nhớ đăng nhập
                        </span>
                      </label>
                      <Link className="text-sm text-blue-700 font-semibold hover:underline">
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <button
                      className="w-full bg-blue-700 hover:bg-blue-700/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-700/20 transition-all active:scale-[0.98]"
                      type="submit"
                    >
                      Đăng nhập
                    </button>
                  </form>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-[#1a2131] px-3 text-slate-400 font-medium tracking-wider">
                        Hoặc đăng nhập bằng
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
                      Bạn chưa có tài khoản?
                      <Link
                        to={ROUTES.AUTH.SIGN_UP}
                        className="text-blue-700 font-bold hover:underline ml-1"
                      >
                        Đăng ký ngay
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
