import { X, User, Mail, Shield, Calendar } from "lucide-react";
import { ROLES } from "@shared/constants/appConst";

export default function UserDetailModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 absolute top-0 left-0 right-0 z-0"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition z-20 bg-black/10 rounded-full p-1 hover:bg-black/20"
        >
          <X size={20} />
        </button>

        <div className="px-6 pb-6 pt-16 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-md border-4 border-white flex items-center justify-center text-blue-600">
              <User size={36} />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {user.fullName || "Người dùng ẩn danh"}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>

            <div className="flex justify-center gap-2 mt-3">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                  user.userRoles.find(
                    (userRole) => userRole.role.name === ROLES.Admin,
                  )
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {user.userRoles.find(
                  (userRole) => userRole.role.name === ROLES.Admin,
                )
                  ? "Super Admin"
                  : "User"}
              </span>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                  user.isActive !== false
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {user.isActive !== false ? "Đang hoạt động" : "Bị khóa"}
              </span>
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email liên hệ</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                <Shield size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phân quyền</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.userRoles.find(
                    (userRole) => userRole.role.name === ROLES.Admin,
                  )
                    ? "Quản trị viên hệ thống"
                    : "Người dùng"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Ngày tham gia</p>
                <p className="text-sm font-medium text-gray-800">
                  {user.joinDate
                    ? new Date(user.joinDate).toLocaleDateString("vi-VN")
                    : "Không xác định"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="w-full py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition font-medium"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
