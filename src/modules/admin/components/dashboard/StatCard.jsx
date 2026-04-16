import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  percent,
  subtitle,
  icon,
  loading = false,
  trendType = "neutral",
  formatter,
}) {
  const displayValue = formatter ? formatter(value) : value;
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex justify-between">
      <div className="space-y-2">
        <div className="text-gray-500 text-sm font-medium">{title}</div>
        <div className="text-2xl font-bold text-gray-900">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-gray-400 my-1" />
          ) : (
            (displayValue ?? "-")
          )}
        </div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>

      <div className="text-right flex flex-col items-end space-y-2 justify-between">
        {!loading && percent && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold px-2 py-0.5 rounded-full ${
              trendType === "up"
                ? "text-emerald-700 bg-emerald-50"
                : trendType === "down"
                  ? "text-red-700 bg-red-50"
                  : "text-gray-600 bg-gray-50"
            }`}
          >
            {trendType === "up" && <TrendingUp size={14} />}
            {trendType === "down" && <TrendingDown size={14} />}
            {trendType === "neutral" && <Minus size={14} />}
            {percent}
          </div>
        )}
        <div
          className={`p-2 rounded-xl text-blue-600 ${!percent ? "mt-auto" : ""} bg-blue-50/80`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
