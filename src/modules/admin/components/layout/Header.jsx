import { Bell, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@shared/hooks/useAuth";
import { useLanguage } from "@shared/hooks/useLanguage";
import { SettingsMenu } from "@shared/components/ui/SettingsMenu";
import SettingsModal from "@shared/components/ui/SettingsModal";

export default function Header() {
  const { user } = useAuth();
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
      <header className="sticky top-0 z-50 h-16 bg-white border-b border-b-gray-200 flex items-center justify-between px-6">  
        <h2 className="font-semibold text-gray-700">Tổng quan hệ thống</h2>

        <div className="flex items-center gap-6">
          {/* <Bell size={20} className="text-gray-600 cursor-pointer" /> */}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar?.fullPathUrl || "/images/default-avatar.jpg"}
                alt="Avatar"
                className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs uppercase"
              />
              <div>
                <p className="text-sm font-medium">
                  {user?.fullName || "Admin User"}
                </p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="size-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-700 hover:bg-slate-100 transition-all"
                title={t("header.settings")}
              >
                <ChevronDown
                  className="w-5 h-5 transition-transform duration-200"
                  style={{
                    transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {showDropdown && (
                <SettingsMenu
                  className="right-0 mt-2 w-48 shadow-2xl"
                  onSettingsClick={() => setShowSettings(true)}
                  onClose={() => setShowDropdown(false)}
                  isAdmin={true}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isAdmin={true}
      />
    </>
  );
}
