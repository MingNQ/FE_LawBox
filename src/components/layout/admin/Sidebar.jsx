import { LayoutDashboard, FileText, Folder, Upload, Users } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-r-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h1 className="text-lg font-bold text-blue-600">LawBox</h1>
          <p className="text-xs text-gray-500">PHÁP LUẬT VIỆT NAM</p>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={18} />} active>
            Thống kê
          </SidebarItem>
          <SidebarItem icon={<FileText size={18} />}>
            Quản lý tài liệu
          </SidebarItem>
          <SidebarItem icon={<Folder size={18} />}>Danh mục</SidebarItem>
          <SidebarItem icon={<Upload size={18} />}>Tải lên</SidebarItem>
          <SidebarItem icon={<Users size={18} />}>Người dùng</SidebarItem>
        </nav>
      </div>

      <div className="p-4 space-y-4">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          + Tải lên mới
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, children, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm
        ${active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"}
      `}
    >
      {icon}
      {children}
    </div>
  );
}
