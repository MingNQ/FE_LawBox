import { X, Zap, Settings as SettingsIcon } from "lucide-react";
import { useLanguage } from "@shared/hooks/useLanguage";
import { useEffect, useRef, useState } from "react";
import GeneralTab from "./GeneralTab";
import QuotaTab from "./QuotaTab";

const TABS = [
  { id: "general", icon: SettingsIcon, labelKey: "settings.tab.general" },
  { id: "quota", icon: Zap, labelKey: "settings.tab.quota" },
];

export default function SettingsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const overlayRef = useRef(null);
  const [activeTab, setActiveTab] = useState("general");

  // Reset tab on open
  useEffect(() => {
    if (isOpen) setActiveTab("general");
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ animation: "settingsOverlayIn 0.2s ease-out" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#1a2233] rounded-2xl shadow-2xl dark:shadow-black/40 overflow-hidden border border-slate-200 dark:border-slate-700/50"
        style={{ animation: "settingsModalIn 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/50">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {t("settings.title")}
          </h2>
          <button
            onClick={onClose}
            className="size-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-700/50 px-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px
                  ${
                    isActive
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {t(tab.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "general" && <GeneralTab />}
          {activeTab === "quota" && <QuotaTab />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {t("settings.close")}
          </button>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes settingsOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes settingsModalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
