import { CheckCircle2, Home, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { useLanguage } from "@shared/hooks/useLanguage";

export function PaymentSuccess({ orderId, onShowQuota }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl max-w-lg w-full animate-fade-in">
      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
      </div>
      
      <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-4">
        {t("payment.success.title")}
      </h1>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        {t("payment.success.desc")}
      </p>
      
      {orderId && (
        <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-8 border border-slate-100 dark:border-slate-700/50">
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mb-1">
            {t("payment.success.orderId")}
          </p>
          <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
            {orderId}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <Link
          to={ROUTES.HOME}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all"
        >
          <Home className="w-4 h-4" />
          {t("payment.success.home")}
        </Link>
        <button
          onClick={onShowQuota}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
        >
          <BarChart3 className="w-4 h-4" />
          {t("payment.success.quota")}
        </button>
      </div>
    </div>
  );
}
