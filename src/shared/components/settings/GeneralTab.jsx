import { Sun, Moon, Monitor, Languages } from "lucide-react";
import { useTheme } from "@shared/hooks/useTheme";
import { useLanguage } from "@shared/hooks/useLanguage";

const THEME_OPTIONS = [
  { value: "light", icon: Sun, labelKey: "settings.theme.light" },
  { value: "dark", icon: Moon, labelKey: "settings.theme.dark" },
  { value: "system", icon: Monitor, labelKey: "settings.theme.system" },
];

const LANGUAGE_OPTIONS = [
  { value: "vi", label: "Tiếng Việt", flag: "VN" },
  { value: "en", label: "English", flag: "EN" },
];

function CheckBadge() {
  return (
    <svg
      className="w-3 h-3 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function GeneralTab() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Appearance */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <Sun className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {t("settings.appearance")}
          </h3>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          {t("settings.appearance.desc")}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {THEME_OPTIONS.map((option) => {
            const isActive = theme === option.value;
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`
                  relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm shadow-blue-500/10"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
              >
                {/* Theme preview mini card */}
                <div
                  className={`w-full aspect-[4/3] rounded-lg overflow-hidden border transition-all ${
                    isActive
                      ? "border-blue-300 dark:border-blue-700"
                      : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  {option.value === "light" && (
                    <div className="w-full h-full bg-white flex flex-col">
                      <div className="h-2 bg-slate-100 border-b border-slate-200" />
                      <div className="flex flex-1">
                        <div className="w-1/4 bg-slate-50 border-r border-slate-100" />
                        <div className="flex-1 p-1.5 space-y-1">
                          <div className="h-1 bg-slate-200 rounded-full w-3/4" />
                          <div className="h-1 bg-slate-100 rounded-full w-1/2" />
                        </div>
                      </div>
                    </div>
                  )}
                  {option.value === "dark" && (
                    <div className="w-full h-full bg-[#0d1117] flex flex-col">
                      <div className="h-2 bg-[#161b22] border-b border-slate-800" />
                      <div className="flex flex-1">
                        <div className="w-1/4 bg-[#161b22] border-r border-slate-800" />
                        <div className="flex-1 p-1.5 space-y-1">
                          <div className="h-1 bg-slate-700 rounded-full w-3/4" />
                          <div className="h-1 bg-slate-800 rounded-full w-1/2" />
                        </div>
                      </div>
                    </div>
                  )}
                  {option.value === "system" && (
                    <div className="w-full h-full flex">
                      <div className="w-1/2 bg-white flex flex-col">
                        <div className="h-2 bg-slate-100" />
                        <div className="flex-1 p-1 space-y-0.5">
                          <div className="h-0.5 bg-slate-200 rounded-full w-3/4" />
                          <div className="h-0.5 bg-slate-100 rounded-full w-1/2" />
                        </div>
                      </div>
                      <div className="w-1/2 bg-[#0d1117] flex flex-col">
                        <div className="h-2 bg-[#161b22]" />
                        <div className="flex-1 p-1 space-y-0.5">
                          <div className="h-0.5 bg-slate-700 rounded-full w-3/4" />
                          <div className="h-0.5 bg-slate-800 rounded-full w-1/2" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`w-3.5 h-3.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`}
                  />
                  <span
                    className={`text-xs font-semibold ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    {t(option.labelKey)}
                  </span>
                </div>

                {isActive && (
                  <div className="absolute -top-px -right-px size-5 bg-blue-500 rounded-bl-lg rounded-tr-[10px] flex items-center justify-center">
                    <CheckBadge />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div className="h-px bg-slate-100 dark:bg-slate-700/50" />

      {/* Language */}
      <section>
        <div className="flex items-center gap-2 mb-1">
          <Languages className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            {t("settings.language")}
          </h3>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
          {t("settings.language.desc")}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = language === option.value;
            return (
              <button
                key={option.value}
                onClick={() => setLanguage(option.value)}
                className={`
                  relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200
                  ${
                    isActive
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm shadow-emerald-500/10"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
              >
                <span className="text-2xl">{option.flag}</span>
                <span
                  className={`text-sm font-semibold ${isActive ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {option.label}
                </span>

                {isActive && (
                  <div className="absolute -top-px -right-px size-5 bg-emerald-500 rounded-bl-lg rounded-tr-[10px] flex items-center justify-center">
                    <CheckBadge />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
