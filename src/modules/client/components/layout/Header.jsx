import { Gavel, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@shared/hooks/useLanguage";
import SettingsModal from "@client/components/settings/SettingsModal";
import { SettingsMenu } from "@client/components/settings/SettingsMenu";

export function Header({ user }) {
  const { t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#e7ebf3] dark:border-slate-700/50 bg-white/80 dark:bg-[#0f1520]/90 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <div className="text-blue-700 dark:text-blue-400">
              <Gavel className="w-8 h-8" />
            </div>
            <h2 className="text-blue-700 dark:text-white text-xl font-extrabold tracking-tight">
              LawBox
            </h2>
          </Link>
          <nav className="hidden md:flex flex-1 justify-center gap-10">
            <Link
              to={ROUTES.LEGAL_SEARCH}
              className="text-blue-700 dark:text-white text-sm font-semibold hover:underline hover:decoration-blue-400 dark:hover:decoration-blue-400"
            >
              {t("header.search")}
            </Link>
            <Link
              to={ROUTES.CHAT}
              className="text-blue-700 dark:text-white text-sm font-semibold hover:underline hover:decoration-blue-400 dark:hover:decoration-blue-400"
            >
              {t("header.chat")}
            </Link>
          </nav>
          <div className="flex items-center gap-1">
            {!user ? (
              <></>
            ) : (
              <p className="text-slate-700 dark:text-slate-100 font-medium">
                {t("header.greeting")} {user.fullName}
              </p>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="size-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
                title={t("header.settings")}
              >
                <ChevronDown className="w-5 h-5" />
              </button>

              {showDropdown && (
                <SettingsMenu
                  className="right-0 mt-2 w-48"
                  onSettingsClick={() => setShowSettings(true)}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
