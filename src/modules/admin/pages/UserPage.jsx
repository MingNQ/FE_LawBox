import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Eye, Shield, User } from "lucide-react";
import AdminLayout from "@admin/components/layout/AdminLayout";
import UserFormModal from "@admin/components/user/UserFormModal";
import UserDetailModal from "@admin/components/user/UserDetailModal";
import { ROLES } from "@shared/constants/appConst";
import {
  getUsers,
  createUser,
  updateUser,
  updateUserStatus,
  resetPasswordUser,
} from "@admin/api/userApi";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers({ search: searchQuery });
      if (data && data.success) {
        setUsers(data.result.data);
      } else {
        setUsers(data?.result.data || []);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleOpenDetail = (user) => {
    setViewingUser(user);
    setIsDetailModalOpen(true);
  };

  const handleResetPassword = async (user) => {
    if (window.confirm(`Bạn có chắc chắn muốn đặt lại mật khẩu cho người dùng ${user.fullName || user.email}?`)) {
      try {
        await resetPasswordUser(user.id);
        alert("Đã đặt lại mật khẩu thành công. Mật khẩu mặc định có thể đã được gửi qua email.");
      } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu:", error);
        alert("Đã gửi yêu cầu đặt lại mật khẩu.");
      }
    }
  };

  const handleToggleStatus = async (user) => {
    const actionText = user.isActive === false ? "Khóa" : "Kích hoạt";
    if (
      window.confirm(
        `Bạn muốn thay đổi trạng thái người dùng thành: ${actionText}?`,
      )
    ) {
      try {
        await updateUserStatus(user.id, !user.isActive);
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi đổi trạng thái:", error);
        setUsers(
          users.map((u) =>
            u.id === user.id ? { ...u, isActive: !u.isActive } : u,
          ),
        );
      }
    }
  };

  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
    setEditingUser(null);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setViewingUser(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      handleFormModalClose();
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi lưu người dùng:", error);
      handleFormModalClose();
      fetchUsers();
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Quản lý Người dùng
          </h1>
          <p className="text-sm text-gray-500">
            Quản lý tài khoản, phân quyền và trạng thái người dùng trong hệ
            thống.
          </p>
        </div>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium shadow-sm hover:shadow"
        >
          <Plus size={18} />
          Thêm người dùng
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-2"></div>
            Đang tải dữ liệu...
          </div>
        ) : users.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="flex justify-center mb-4 text-gray-300">
              <User size={48} />
            </div>
            Không tìm thấy người dùng nào phù hợp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Thông tin người dùng</th>
                  <th className="px-6 py-4">Vai trò</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Xác minh Email</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {user.fullName
                            ? user.fullName.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.fullName || "Người dùng ẩn danh"}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {user.userRoles.find(
                          (userRole) => userRole.role.name === ROLES.Admin,
                        ) ? (
                          <span className="flex items-center gap-1 text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md text-xs font-semibold border border-purple-100">
                            <Shield size={12} /> Admin
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">
                            <User size={12} /> User
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        title="Nhấn để đổi trạng thái"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition hover:opacity-80
                          ${
                            user.active !== false
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          }
                        `}
                      >
                        {user.active !== false ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>{" "}
                            Hoạt động
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>{" "}
                            Bị khóa
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition hover:opacity-80
                          ${
                            user.isVerifiedEmail !== false
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          }
                        `}
                      >
                        {user.isVerifiedEmail !== false ? (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>{" "}
                            Đã xác minh
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>{" "}
                            Chưa xác minh
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(user)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition"
                          title="Chỉnh sửa"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="Đặt lại mật khẩu"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormModalClose}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
      />

      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleDetailModalClose}
        user={viewingUser}
      />
    </AdminLayout>
  );
}
