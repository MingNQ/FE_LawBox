import { useState } from "react";
import { OtpInput } from "@client/components/auth/OtpInput";
import { PasswordInput } from "@client/components/auth/PasswordInput";
import EmailInput from "@client/components/auth/EmailInput";

export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO: Implement admin login API call
      console.log("Login", { email, password });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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
              <form onSubmit={() => {console.log("LogIn")}} className="space-y-4">
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
