import { Bell, Search, Settings } from "lucide-react";
import { useState } from "react";
import ChangeAdminPasswordModal from "./ChangeAdminPasswordModal";

export default function Header() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-b-gray-200 flex items-center justify-between px-6">
        <h2 className="font-semibold text-gray-700">Tổng quan hệ thống</h2>

        <div className="flex items-center gap-6">
          <Bell size={20} className="text-gray-600 cursor-pointer" />
          <Settings 
            size={20} 
            className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" 
            onClick={() => setIsPasswordModalOpen(true)}
            title="Đổi mật khẩu"
          />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
          </div>
        </div>
      </header>

      <ChangeAdminPasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </>
  );
}
