import { Zap, Loader2, Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@shared/hooks/useLanguage";
import { getMyQuota } from "@client/api/quotaApi";
import { ProgressBar } from "./ProgressBar";

export default function QuotaTab() {
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMyQuota();
        if (data.success) {
          setQuota(data.result);
        } else {
          setError("Không thể tải dữ liệu quota.");
        }
      } catch (err) {
        setError("Không thể kết nối đến máy chủ.");
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Đang tải thông tin...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Zap className="w-10 h-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-xl p-5">
        <div className="relative flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                {t("settings.quota.currentPlan")}
              </p>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">
                {quota?.tierName || "Free"}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {t("settings.quota.rateLimit")}
            </p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {quota?.maxRequestsPerMinute ?? 0} req/min
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {t("settings.quota.tip")}
        </p>
      </div>

      {/* Daily Token Usage */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50">
        <ProgressBar
          used={quota?.currentDayTokens ?? 0}
          total={quota?.dayTokenLimit ?? 0}
          color="blue"
          label={t("settings.quota.daily")}
          sublabel={`${t("settings.quota.resetIn")} ${formatResetTime(quota?.dayResetAt)}`}
        />
      </div>

      {/* Monthly Token Usage */}
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
  );
}
