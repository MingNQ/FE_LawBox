import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { OtpInput } from "./OtpInput";
import { RESEND_OTP_SECONDS } from "../../constants/appConst";

export default function OtpVerificationStep({
  title = "Xác thực mã OTP",
  description = "Vui lòng nhập mã đã được gửi đến email của bạn.",
  otp,
  onOtpChange,
  isLoading,
  error,
  onVerify,
  onResend,
  onBack,
}) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_OTP_SECONDS);
  const [canResend, setCanResend] = useState(false);

  // Reset countdown on mount
  useEffect(() => {
    setSecondsLeft(RESEND_OTP_SECONDS);
    setCanResend(false);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    if (!canResend) return;
    onResend?.();
    setSecondsLeft(RESEND_OTP_SECONDS);
    setCanResend(false);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <>
      <div className="mb-10">
        <ShieldCheck className="w-full size-12 text-center mb-6" />

        <h2 className="text-[#0d121b] text-center dark:text-white text-3xl font-bold mb-2">
          {title}
        </h2>
        <p className="text-slate-500 text-center dark:text-slate-400 text-sm">
          {description}
        </p>
      </div>
      <div className="space-y-4">
        <OtpInput value={otp} onChange={onOtpChange} />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {isLoading && (
          <div className="flex justify-center">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <button
          disabled={isLoading}
          onClick={onVerify}
          className={`w-full text-white py-2 rounded
                        ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"}`}
        >
          {isLoading ? "Đang tải" : "Xác nhận"}
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <div className="flex items-center gap-2 text-[#4f5b72] dark:text-gray-400">
          <span className="text-sm">Gửi lại mã sau</span>
          <div className="flex gap-1 items-center">
            <div className="flex h-8 w-10 items-center justify-center rounded bg-[#e7ebf3] dark:bg-[#2d3648]">
              <p className="text-primary text-sm font-bold">{minutes}</p>
            </div>
            <span className="text-xs">:</span>
            <div className="flex h-8 w-10 items-center justify-center rounded bg-[#e7ebf3] dark:bg-[#2d3648]">
              <p className="text-primary text-sm font-bold">{seconds}</p>
            </div>
          </div>
        </div>
        <button
          className={`text-sm font-medium flex items-center gap-1 transition
                        ${
                          canResend
                            ? "text-blue-600 hover:text-blue-700 cursor-pointer"
                            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        }`}
          disabled={!canResend}
          onClick={handleResend}
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          Gửi lại mã
        </button>
      </div>

      <div
        onClick={onBack}
        className="mt-6 text-[#4f5b72] dark:text-gray-400 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-1 justify-center cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Quay lại bước trước
      </div>
    </>
  );
}
