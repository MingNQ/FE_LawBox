import { ZapOff, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function UsageLimitNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleLimitExceeded = (event) => {
      setMessage(event.detail?.message || "Bạn đã đạt giới hạn sử dụng AI cho ngày hôm nay.");
      setIsOpen(true);
    };

    window.addEventListener("app:usage-limit-exceeded", handleLimitExceeded);
    return () => window.removeEventListener("app:usage-limit-exceeded", handleLimitExceeded);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-[108px] left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="relative group overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 flex items-center gap-4">
        
        {/* Accent Glow */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
        
        {/* Icon Container */}
        <div className="size-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <ZapOff className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Thông báo giới hạn
          </h4>
          <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
            {message} Vui lòng nâng cấp gói hoặc quay lại sau.
          </p>
        </div>

        {/* Action & Close Section */}
        <div className="flex items-center gap-2">
          {/* Action Button */}
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20 active:scale-95 whitespace-nowrap">
            <span>Nâng cấp</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
