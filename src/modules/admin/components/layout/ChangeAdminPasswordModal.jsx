import { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { changeCurrentAdminPassword } from "@admin/api/userApi";

export default function ChangeAdminPasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const data = await changeCurrentAdminPassword({ 
        currentPassword, 
        newPassword 
      });
      if (data.success) {
        alert("Đổi mật khẩu thành công!");
        onClose();
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Lỗi khi đổi mật khẩu");
      }
    } catch (e) {
       alert("Đã xảy ra lỗi hệ thống");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2 text-gray-800">
            <ShieldCheck size={20} className="text-purple-600" />
            Đổi mật khẩu Quản trị
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu hiện tại..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nhập mật khẩu mới..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Xác nhận mật khẩu mới..."
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
             <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !newPassword.trim() || !currentPassword.trim()}
              className="px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg disabled:opacity-50 transition shadow-sm"
            >
              {isSubmitting ? "Đang xử lý..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
