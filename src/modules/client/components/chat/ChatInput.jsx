import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

export function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message);
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
    <div className="p-4 bg-white dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto relative flex items-end gap-3">
        <div className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-2 transition-all flex items-end gap-2">
          <button className="p-2 text-slate-400 hover:text-blue-700 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            id="chat-input-textarea"
            className="no-focus-outline flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-2 px-1 resize-none overflow-y-auto max-h-32 placeholder:text-slate-400 min-h-[40px]"
            placeholder="Nhập câu hỏi tại đây..."
            rows={1}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={handleSend}
          className="bg-blue-700 text-white size-12 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-blue-700/30 transition-all shrink-0 mb-1"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-2 italic">
        AI Luật Sư có thể đưa ra câu trả lời không chính xác. Hãy luôn kiểm
        chứng cho các quyết định pháp lý quan trọng.
      </p>
    </div>
  );
}
