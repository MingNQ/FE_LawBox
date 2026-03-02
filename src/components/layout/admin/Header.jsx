import { Bell, Search, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-b-gray-200 flex items-center justify-between px-6">
      <h2 className="font-semibold text-gray-700">Tổng quan hệ thống</h2>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search size={18} className="absolute inset-y-0 left-0 mt-2.5 ml-3 text-gray-400"/>
          <input
            type="text"
            placeholder="Tìm kiếm văn bản pháp luật..."
            className="rounded-lg px-4 py-2 text-sm text-gray-400 w-80 h-10 pl-10 pr-3 border-none bg-gray-100"
          />
        </div>

        <Bell size={20} className="text-gray-600 cursor-pointer" />
        <Settings size={20} className="text-gray-600 cursor-pointer" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}
