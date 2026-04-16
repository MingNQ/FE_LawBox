import { Gavel, Plus, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import ConversationItem from "./ConversationItem";
import { ROUTES } from "@shared/constants/routes";
import { useAuth } from "@shared/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@shared/hooks/useLanguage";
import SettingsModal from "@shared/components/ui/SettingsModal";
import { SettingsMenu } from "@shared/components/ui/SettingsMenu";

export function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onPinConversation,
  onRenameConversation,
}) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <aside className="w-72 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b22] h-full">
        <Link
          to={ROUTES.HOME}
          className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3"
        >
          <div className="size-8 rounded-lg flex items-center justify-center text-white bg-blue-700">
            <Gavel className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-blue-700">
            AI Luật Sư
          </h2>
        </Link>

        <div className="p-4">
          <button
            onClick={onNewConversation}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-700/90 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">{t("sidebar.newChat")}</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 px-3 py-3">
            {t("sidebar.history")}
          </h3>
          {conversations
            ?.slice()
            .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
            .map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                current={conversation.id === currentConversationId}
                onClick={() => onSelectConversation?.(conversation)}
                onDeleteConversation={onDeleteConversation}
                onPinConversation={onPinConversation}
                onRenameConversation={onRenameConversation}
              />
            ))}
        </nav>

        <div
          className="relative p-4 border-t border-slate-100 dark:border-slate-800"
          ref={popupRef}
        >
          {showPopup && (
            <SettingsMenu
              className="bottom-full left-3 right-3 mb-2"
              showHelp={true}
              onSettingsClick={() => setShowSettings(true)}
              onClose={() => setShowPopup(false)}
            />
          )}

          <div
            onClick={() => setShowPopup((prev) => !prev)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <div className="size-8 rounded-full bg-slate-300 overflow-hidden shrink-0">
              <img
                src={user?.avatar?.fullPathUrl || "/images/default-avatar.jpg"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1 truncate">
              {user?.fullName}
            </p>
            <ChevronUp
              className={`w-4 h-4 text-slate-400 transition-transform ${
                showPopup ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>
        </div>
      </aside>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
