import { useLanguage } from "@shared/hooks/useLanguage";
import { Badge } from "@shared/components/ui/Badge";
import { PlanFeatureItem } from "./PlanFeatureItem";
import { Loader2 } from "lucide-react";

export function PlanCard({ plan, isCurrentPlan, remainingDays, onSubscribe, loading }) {
  const { t } = useLanguage();

  const formatPrice = (price) => {
    if (price === 0) return t("pricing.free");
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const isFree = plan.price === 0;
  const isRecommended = plan.name === "Plus";

  return (
    <div
      className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
        isRecommended
          ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-xl shadow-blue-500/10 scale-105 z-10"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md"
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 ">
          <Badge variant="primary" className="px-4 py-1.5 dark:bg-slate-900 rounded-full font-bold uppercase tracking-wider text-[10px]">
            {t("pricing.recommended")}
          </Badge>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute top-4 right-4">
          <Badge variant="success" className="px-2 py-0.5 rounded-lg text-[10px] font-bold">
            {t("pricing.currentPlan")}
          </Badge>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {formatPrice(plan.price)}
          </span>
          {plan.durationInDays > 0 && (
            <span className="text-slate-500 dark:text-slate-500 text-sm">
              /{plan.durationInDays} {t("pricing.days")}
            </span>
          )}
        </div>
      </div>

      <ul className="flex-1 space-y-1 mb-8">
        <PlanFeatureItem
          label={t("pricing.tokenDaily")}
          value={plan.dailyTokenLimit.toLocaleString()}
        />
        <PlanFeatureItem
          label={t("pricing.tokenMonthly")}
          value={plan.monthlyTokenLimit.toLocaleString()}
        />
        <PlanFeatureItem
          label={t("pricing.requestsPerMinute")}
          value={plan.maxRequestsPerMinute}
        />
        <PlanFeatureItem
          label={t("pricing.concurrentChats")}
          value={plan.maxConcurrentChats}
        />
      </ul>

      <button
        onClick={() => onSubscribe(plan.id)}
        disabled={loading || isCurrentPlan || isFree}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
          isCurrentPlan
            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-default"
            : isFree
            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-default"
            : isRecommended
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            : "bg-slate-800 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-900 dark:hover:bg-slate-100 active:scale-[0.98]"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("pricing.processing")}
          </>
        ) : isCurrentPlan ? (
          `${t("pricing.currentPlan")} (${remainingDays} ${t("pricing.days")})`
        ) : isFree ? (
          t("pricing.default")
        ) : (
          t("pricing.subscribe")
        )}
      </button>
    </div>
  );
}
