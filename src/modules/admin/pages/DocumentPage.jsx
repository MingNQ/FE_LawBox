import { useState, useEffect } from "react";
import { Plus, Search, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@admin/components/layout/AdminLayout";
import DocumentTable from "@admin/components/document/DocumentTable";
import DocumentFormModal from "@admin/components/document/DocumentFormModal";
import {
  uploadDocument,
  updateDocument,
  deleteDocument,
} from "@admin/api/documentApi";
import { getDocuments } from "../api/folderApi";

export default function DocumentPage() {
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (folderId) {
      fetchDocuments();
    }
  }, [searchQuery, folderId]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const data = await getDocuments(folderId);
      if (data && data.success) {
        setDocuments(data.result);
      } else {
        setDocuments(data.result || []);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách tài liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      try {
        const data = await deleteDocument(id);

        if (data.result == true) {
          fetchDocuments();
        } else {
          alert("Không thể xóa tài liệu này!");          
        }
      } catch (error) {
        console.error("Lỗi khi xóa tài liệu:", error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDoc(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      const apiData = new FormData();
      apiData.append("name", formData.name);
      apiData.append("folderId", folderId);
      if (formData.file) {
        apiData.append("file", formData.file);
      }

      if (editingDoc) {
        await updateDocument(editingDoc.id, {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          folderId: folderId,
        });
      } else {
        await uploadDocument(apiData);
      }
      
      handleModalClose();
      fetchDocuments();
    } catch (error) {
      console.error("Lỗi khi lưu tài liệu:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/folders")}
          className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Tài liệu thư mục
          </h1>
          <p className="text-sm text-gray-500">
            Quản lý tài liệu thuộc thư mục này.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Danh sách tài liệu</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          <Plus size={18} />
          Thêm tài liệu mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Tất cả danh mục</option>
          <option value="civil">Dân sự</option>
          <option value="criminal">Hình sự</option>
          <option value="business">Doanh nghiệp</option>
          <option value="tax">Thuế</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đã duyệt</option>
          <option value="pending">Chưa duyệt</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DocumentTable
          documents={documents}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      <DocumentFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editingDoc}
      />
    </AdminLayout>
  );
}
