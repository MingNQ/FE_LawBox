import { useState } from "react";
import { OtpInput } from "@client/components/auth/OtpInput";
import { PasswordInput } from "@client/components/auth/PasswordInput";
import EmailInput from "@client/components/auth/EmailInput";
import { initiateSignIn } from "@shared/api/authApi";
import { verifySignIn } from "../../../shared/api/authApi";
import { ROUTES } from "@shared/constants/routes";
import { useAuth } from "@shared/hooks/useAuth";

export function AuthPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await initiateSignIn({
        contact: email,
        password,
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
    setError("");
    setIsLoading(true);

    try {
      const data = await verifySignIn({
        contact: email,
        verificationCode: otp,
        rememberMe: remember,
      });

      if (data.success) {
        await login(
          data.result.accessToken,
          data.result.refreshToken,
          remember,
        );
        window.location.href = ROUTES.ADMIN.DASHBOARD;
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {!showOtp ? (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <EmailInput
                  placeholder="Email"
                  value={email}
                  onEmailChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                />

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Lưu đăng nhập
                </label>

                {isLoading && (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <button
                  disabled={isLoading}
                  className={`w-full py-2 rounded text-white 
                    ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"}`}
                >
                  {isLoading ? "Đang tải" : "Đăng nhập"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <OtpInput value={otp} onChange={setOtp} />

                {isLoading && (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                <button
                  disabled={isLoading}
                  onClick={handleVerifyOtp}
                  className={`w-full text-white py-2 rounded
                    ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"}`}
                >
                  {isLoading ? "Đang tải" : "Xác nhận"}
                </button>
              </div>

              <button
                onClick={handleResendOtp}
                className="text-sm text-center mt-4 text-blue-600"
              >
                Gửi lại mã
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
