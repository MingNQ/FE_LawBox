import { XCircle, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { useLanguage } from "@shared/hooks/useLanguage";

export function PaymentFailed({ orderId, code, message }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl max-w-lg w-full animate-fade-in">
      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
        <XCircle className="w-12 h-12 text-rose-500" />
      </div>
      
      <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-4">
        {t("payment.failed.title")}
      </h1>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        {t("payment.failed.desc")}
      </p>
      
      <div className="w-full bg-rose-50/50 dark:bg-rose-900/10 rounded-xl p-5 mb-8 border border-rose-100 dark:border-rose-900/20 text-left">
        {orderId && (
          <div className="mb-3">
            <p className="text-[10px] text-rose-400 dark:text-rose-500 uppercase font-bold tracking-wider mb-0.5">
              {t("payment.success.orderId")}
            </p>
            <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {orderId}
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-rose-400 dark:text-rose-500 uppercase font-bold tracking-wider mb-0.5">
              {t("payment.failed.code")}
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {code || "99"}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-rose-400 dark:text-rose-500 uppercase font-bold tracking-wider mb-0.5">
              {t("payment.failed.reason")}
            </p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {message || "Unknown error"}
            </p>
          </div>
        </div>
      </div>
      
      <Link
        to={ROUTES.PRICING}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl hover:bg-slate-900 dark:hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
      >
        <RefreshCcw className="w-4 h-4" />
        {t("payment.failed.retry")}
      </Link>
    </div>
  );
}
