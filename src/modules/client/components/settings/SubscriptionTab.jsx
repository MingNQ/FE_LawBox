import {
  Crown,
  Calendar,
  Clock,
  ArrowUpCircle,
  Zap,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@shared/hooks/useLanguage";
import { useAuth } from "@shared/hooks/useAuth";
import { Badge } from "@shared/components/ui/Badge";
import { getMyQuota } from "@client/api/quotaApi";
import { ProgressBar } from "./ProgressBar";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";

export default function SubscriptionTab({ onCloseModal }) {
  const { t } = useLanguage();
  const { subscription } = useAuth();
  const [quota, setQuota] = useState(null);
  const [loadingQuota, setLoadingQuota] = useState(true);

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        setLoadingQuota(true);
        const data = await getMyQuota();
        if (data.success) {
          setQuota(data.result);
        }
      } catch (err) {
        console.error("Failed to fetch quota:", err);
      } finally {
        setLoadingQuota(false);
      }
    };
    fetchQuota();
  }, []);

  function formatResetTime(dateStr) {
    if (!dateStr) return "";
    const resetDate = new Date(dateStr);
    const now = new Date();
    const diffMs = resetDate - now;
    if (diffMs <= 0) return t("settings.quota.resetSoon");
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffHours >= 24) {
      const days = Math.floor(diffHours / 24);
      return `${days} ${t("settings.quota.days")}`;
    }
    return `${diffHours}h ${diffMins}m`;
  }

  if (loadingQuota) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Đang tải thông tin...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscription Info */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mb-0.5">
                {t("settings.quota.currentPlan")}
              </p>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">
                  {subscription?.tierName || quota?.tierName || "Free"}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {subscription ? (
              <Badge variant={subscription.isActive ? "success" : "danger"}>
                {subscription.isActive
                  ? t("settings.subscription.active")
                  : t("settings.subscription.expired")}
              </Badge>
            ) : (
              <Badge variant="secondary">{t("pricing.default")}</Badge>
            )}
            <Link
              to={ROUTES.PRICING}
              onClick={onCloseModal}
              className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-lg transition-all shadow-sm"
            >
              <ArrowUpCircle className="size-3" />
              {t("settings.subscription.upgrade")}
            </Link>
          </div>
        </div>

        {subscription && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {t("settings.subscription.startDate")}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {new Date(subscription.startDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {t("settings.subscription.endDate")}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {new Date(subscription.endDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        )}

        {subscription && (
          <ProgressBar
            used={30 - subscription.remainingDays}
            total={30}
            color="blue"
            label={t("settings.subscription.remaining")}
            sublabel={`${subscription.remainingDays} ${t("settings.quota.days")}`}
          />
        )}

        {!subscription && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Bạn đang sử dụng gói mặc định. Nâng cấp để nhận thêm quyền lợi.
          </p>
        )}
      </div>

      {/* Quota Usage */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
              {t("settings.tab.quota")}
            </h4>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
              {t("settings.quota.rateLimit")}
            </p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {quota?.maxRequestsPerMinute ?? 0} req/min
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50">
          <ProgressBar
            used={quota?.currentDayTokens ?? 0}
            total={quota?.dayTokenLimit ?? 0}
            color="blue"
            label={t("settings.quota.daily")}
            sublabel={`${t("settings.quota.resetIn")} ${formatResetTime(quota?.dayResetAt)}`}
          />
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50">
          <ProgressBar
            used={quota?.currentMonthTokens ?? 0}
            total={quota?.monthTokenLimit ?? 0}
            color="emerald"
            label={t("settings.quota.monthly")}
            sublabel={`${t("settings.quota.resetIn")} ${formatResetTime(quota?.monthResetAt)}`}
          />
        </div>
      </div>
    </div>
  );
}
