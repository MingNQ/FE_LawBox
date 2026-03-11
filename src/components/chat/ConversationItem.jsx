import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  MoreHorizontal,
  Pin,
  PinOff,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

export default function ConversationItem({
  conversation,
  current,
  onClick,
  onDeleteConversation,
  onPinConversation,
  onRenameConversation,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation?.title || "");
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setEditTitle(conversation?.title || "");
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleConfirmRename = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== conversation?.title) {
      onRenameConversation(conversation?.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancelRename = () => {
    setEditTitle(conversation?.title || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleConfirmRename();
    } else if (e.key === "Escape") {
      handleCancelRename();
    }
  };

  return (
    <div
      onClick={isEditing ? undefined : onClick}
      className={`relative flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer group ${current ? "bg-blue-700/10" : ""}`}
    >
      {!conversation?.pinned ? (
        <MessageSquare
          className={`w-4 h-4 shrink-0 ${current ? "text-blue-700" : ""}`}
        />
      ) : (
        <Pin className={`w-4 h-4 shrink-0 ${current ? "text-blue-700" : ""}`} />
      )}

      {isEditing ? (
        <div
          className="flex items-center gap-1 flex-1 min-w-0"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-sm font-medium flex-1 min-w-0 bg-white dark:bg-slate-700 border border-blue-400 dark:border-blue-500 rounded-md px-2 py-0.5 outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
          />
          <button
            onClick={handleConfirmRename}
            className="shrink-0 p-1 rounded-md text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCancelRename}
            className="shrink-0 p-1 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <>
          <p
            className={`text-sm font-medium truncate flex-1 ${current ? "text-blue-700" : ""}`}
          >
            {conversation?.title}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="opacity-0 group-hover:opacity-100 shrink-0 p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </>
      )}

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 z-20 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 animate-in fade-in"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStartEditing();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Đổi tên
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPinConversation(conversation?.id, !conversation?.pinned);
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {!conversation?.pinned ? (
              <>
                <Pin className="w-4 h-4" />
                Ghim
              </>
            ) : (
              <>
                <PinOff className="w-4 h-4" />
                Bỏ ghim
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteConversation(conversation?.id);
              setMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </button>
        </div>
      )}
    </div>
  );
}
