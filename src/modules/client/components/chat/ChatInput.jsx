import { Paperclip, Send, Bot, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function ChatInput({ onSendMessage, disabled, agents, selectedAgent, onAgentChange }) {
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message, selectedAgent?.id);
      setMessage("");
      const textarea = document.getElementById("chat-input-textarea");
      if (textarea) textarea.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    const textarea = e.target;
    setMessage(textarea.value);

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 128);
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="py-2 px-4 bg-white dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-2 shadow-sm focus-within:shadow-md focus-within:border-blue-500/50 dark:focus-within:border-blue-500/30 transition-all duration-200">
          <textarea
            id="chat-input-textarea"
            className="no-focus-outline w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-1 px-2 resize-none overflow-y-auto max-h-32 placeholder:text-slate-400 min-h-[24px]"
            placeholder="Nhập câu hỏi của bạn tại đây..."
            rows={1}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <div className="flex items-center justify-between mt-0.5">
            <div className="flex items-center gap-0.5">
              <button
                className="p-1.5 text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-all"
                title="Đính kèm tệp"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-all"
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="text-[12px] font-semibold truncate max-w-[150px]">
                    {selectedAgent?.name || "Model"}
                  </span>
                </button>

                {isMenuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute bottom-full left-0 mb-2 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-1 duration-200"
                  >
                    <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                      <h3 className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Models
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
                      {agents?.map((agent) => (
                        <button
                          key={agent.id}
                          onClick={() => {
                            onAgentChange(agent);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-xl transition-all text-left ${
                            selectedAgent?.id === agent.id
                              ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                          }`}
                        >
                          <div
                            className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${
                              selectedAgent?.id === agent.id
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                                {agent.name}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {agent.description || "Chuyên gia AI"}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={disabled || !message.trim()}
              className="bg-blue-700 text-white p-2 rounded-xl flex items-center justify-center shadow-lg hover:shadow-blue-700/30 transition-all disabled:opacity-50 disabled:shadow-none active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-1 italic">
        AI Luật Sư có thể đưa ra câu trả lời không chính xác.
      </p>
    </div>
  );
}
