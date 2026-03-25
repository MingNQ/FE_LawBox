import { useState } from "react";
import { X, KeyRound } from "lucide-react";
import { changePassword } from "@admin/api/userApi";

export default function ChangePasswordModal({ isOpen, onClose, user }) {
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      alert("Vui lòng nhập mật khẩu mới");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const data = await changePassword(user.id, { password: newPassword });
      if (data.success) {
        alert("Đổi mật khẩu thành công!");
        onClose();
        setNewPassword("");
      } else {
        alert(data.message || "Lỗi khi đổi mật khẩu");
      }
    } catch (e) {
       alert("Đã xảy ra lỗi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2 text-gray-800">
            <KeyRound size={20} className="text-orange-500" />
            Đổi mật khẩu
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-sm text-gray-500">
            Đổi mật khẩu cho người dùng: <span className="font-semibold text-gray-700">{user.email}</span>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu mới..."
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
             <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !newPassword.trim()}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 transition shadow-sm"
            >
              {isSubmitting ? "Đang xử lý..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
