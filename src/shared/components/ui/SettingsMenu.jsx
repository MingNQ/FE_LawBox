import { Settings, HelpCircle, LogOut, Heart } from "lucide-react";
import { useLanguage } from "@shared/hooks/useLanguage";
import { useAuth } from "@shared/hooks/useAuth";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";

export function SettingsMenu({
  onSettingsClick,
  onHelpClick,
  onClose,
  className = "",
  showHelp = false,
  isAdmin = false,
}) {
  const { t } = useLanguage();
  const { logout } = useAuth();

  return (
    <div
      className={`absolute bg-white dark:bg-[#1c2333] border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden animate-fade-in z-50 ${className}`}
    >
      <Link
        to={ROUTES.FAVORITES}
        onClick={onClose}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Heart className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        {t("sidebar.favorites")}
      </Link>
      
      <button
        onClick={() => {
          onClose();
          onSettingsClick();
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
      >
        <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        {t("sidebar.settings")}
      </button>

      {showHelp && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-700/50" />
          <button
            onClick={() => {
              onClose();
              onHelpClick?.();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            {t("sidebar.help")}
          </button>
        </>
      )}

      <div className="h-px bg-slate-100 dark:bg-slate-700/50" />
      <button
        onClick={() => {
          onClose();
          logout(isAdmin);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        {t("sidebar.logout")}
      </button>
    </div>
  );
}
