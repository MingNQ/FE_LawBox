export function ProgressBar({ used, total, color = "blue", label, sublabel }) {
  const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;
  const isWarning = percentage >= 80;
  const isDanger = percentage >= 95;

  const barColor = isDanger
    ? "bg-red-500"
    : isWarning
      ? "bg-amber-500"
      : color === "blue"
        ? "bg-blue-500"
        : "bg-emerald-500";

  const glowColor = isDanger
    ? "shadow-red-500/30"
    : isWarning
      ? "shadow-amber-500/30"
      : color === "blue"
        ? "shadow-blue-500/30"
        : "shadow-emerald-500/30";

  function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num?.toLocaleString() ?? "0";
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {label}
          </p>
          {sublabel && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              {sublabel}
            </p>
          )}
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {formatNumber(used)}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {" "}
            / {formatNumber(total)}
          </span>
        </div>
      </div>
      <div className="relative h-3 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out ${barColor} shadow-lg ${glowColor}`}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </div>
      </div>
      <p
        className={`text-[11px] font-medium text-right ${isDanger ? "text-red-500" : isWarning ? "text-amber-500" : "text-slate-400 dark:text-slate-500"}`}
      >
        {percentage.toFixed(1)}% đã sử dụng
      </p>
    </div>
  );
}
