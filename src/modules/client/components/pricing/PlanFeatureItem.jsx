import { Check } from "lucide-react";

export function PlanFeatureItem({ label, value }) {
  return (
    <li className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex items-center gap-2">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full">
          <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</span>
    </li>
  );
}
