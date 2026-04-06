import { useState, useEffect } from "react";
import { Plus, Search, Folder, Edit, Trash2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@admin/components/layout/AdminLayout";
import FolderFormModal from "@admin/components/folder/FolderFormModal";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@admin/api/folderApi";
import { useToast } from "@shared/hooks/useToast";

export default function FolderPage() {
  const { toast } = useToast();
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, [searchQuery]);

  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      const data = await getFolders({ search: searchQuery });
      if (data && data.success) {
        setFolders(data.result);
      } else {
        setFolders(data.result || []);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách thư mục");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (e, folder) => {
    e.stopPropagation();
    setEditingFolder(folder);
    setIsModalOpen(true);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa thư mục này?")) {
      try {
        const data = await deleteFolder(id);

        if (data.result) {
          fetchFolders();
        } else {
          alert("Không thể xóa thư mục này!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa thư mục:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingFolder(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingFolder) {
        await updateFolder(editingFolder.id, formData);
      } else {
        await createFolder(formData);
      }
      handleModalClose();
      fetchFolders();
    } catch (error) {
      console.error("Lỗi khi lưu thư mục:", error);
    }
  };

  const navigateToDocuments = (folderId) => {
    navigate(`/admin/folders/${folderId}/documents`);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Quản lý Thư mục</h1>
          <p className="text-sm text-gray-500">
            Quản lý và tổ chức các tài liệu theo nhóm thư mục.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          <Plus size={18} />
          Tạo thư mục mới
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Đang tải dữ liệu...
        </div>
      ) : folders.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          Không có thư mục nào. Hãy tạo một thư mục mới.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => navigateToDocuments(folder.id)}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Folder
                    size={24}
                    fill="currentColor"
                    className="text-blue-500 opacity-80"
                  />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => handleOpenEdit(e, folder)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Chỉnh sửa"
                  >
                    <Edit size={16} />
                  </button>
                  {folder.isDeletable !== false && (
                    <button
                      onClick={(e) => handleDelete(e, folder.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 truncate flex items-center gap-2">
                {folder.name}
                {folder.isDeletable === false && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-normal flex items-center gap-1">
                    <Lock size={10} /> Không thể xóa
                  </span>
                )}
              </h3>
              <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-gray-50">
                <span>{folder.documentCount} tài liệu</span>
                <span>
                  {folder.createdOn
                    ? new Date(folder.createdOn).toLocaleDateString("vi-VN")
                    : "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <FolderFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editingFolder}
      />
    </AdminLayout>
  );
}
