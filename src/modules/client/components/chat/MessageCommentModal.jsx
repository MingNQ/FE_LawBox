import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function MessageCommentModal({ isOpen, onClose, onSubmit }) {
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
          <h3 className="font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Đóng góp ý kiến
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ý kiến của bạn sẽ giúp AI Luật sư học hỏi và cải thiện chất lượng câu trả lời trong tương lai.
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập nội dung phản hồi chi tiết..."
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161b22] focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[120px] resize-none text-slate-700 dark:text-slate-300"
            autoFocus
          ></textarea>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Gửi phản hồi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
