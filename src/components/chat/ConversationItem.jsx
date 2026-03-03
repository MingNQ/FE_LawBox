import { useState, useRef, useEffect } from "react";
import { MessageSquare, MoreHorizontal, Pin, Trash2 } from "lucide-react";

export default function ConversationItem({ title, current }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

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

    return (
        <div
            className={`relative flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer group ${current ? "bg-blue-700/10" : ""}`}
        >
            <MessageSquare className={`w-4 h-4 shrink-0 ${current ? "text-blue-700" : ""}`} />
            <p className={`text-sm font-medium truncate flex-1 ${current ? "text-blue-700" : ""}`}>{title}</p>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                }}
                className="opacity-0 group-hover:opacity-100 shrink-0 p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 top-full mt-1 z-20 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 animate-in fade-in"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <Pin className="w-4 h-4" />
                        Ghim
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
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