import {
  LayoutDashboard,
  FileText,
  Folder,
  Users,
  Settings,
  BotIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-r-gray-200 flex flex-col justify-between sticky top-0 h-screen">
      <div>
        <div className="p-6">
          <h1 className="text-lg font-bold text-blue-600">LawBox</h1>
          <p className="text-xs text-gray-500">PHÁP LUẬT VIỆT NAM</p>
        </div>

        <nav className="p-4 space-y-2">
          <SidebarItem
            to={ROUTES.ADMIN.DASHBOARD}
            icon={<LayoutDashboard size={18} />}
            active={location.pathname === ROUTES.ADMIN.DASHBOARD}
          >
            Thống kê
          </SidebarItem>
          <SidebarItem
            to={ROUTES.ADMIN.ALL_DOCUMENTS}
            icon={<FileText size={18} />}
            active={location.pathname === ROUTES.ADMIN.ALL_DOCUMENTS}
          >
            Tài liệu
          </SidebarItem>
          <SidebarItem
            to={ROUTES.ADMIN.FOLDERS}
            icon={<Folder size={18} />}
            active={
              location.pathname === ROUTES.ADMIN.FOLDERS ||
              location.pathname.startsWith("/admin/folders/")
            }
          >
            Thư mục
          </SidebarItem>
          <SidebarItem
            to={ROUTES.ADMIN.USERS}
            icon={<Users size={18} />}
            active={location.pathname === ROUTES.ADMIN.USERS}
          >
            Người dùng
          </SidebarItem>
          <SidebarItem
            to={ROUTES.ADMIN.AI_AGENTS}
            icon={<BotIcon size={18} />}
            active={location.pathname === ROUTES.ADMIN.AI_AGENTS}
          >
            Agents
          </SidebarItem>
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, children, active, to }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm
        ${active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 text-gray-700"}
      `}
    >
      {icon}
      {children}
    </Link>
  );
}
