import { useState, useEffect } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@admin/components/layout/AdminLayout";
import DocumentTable from "@admin/components/document/DocumentTable";
import DocumentFormModal from "@admin/components/document/DocumentFormModal";
import DocumentDetailModal from "@admin/components/document/DocumentDetailModal";
import AdvancedSearchFilter from "@shared/components/filters/AdvancedSearchFilter";
import { BackgroundTaskIndicator } from "@shared/components/ui/BackgroundTaskIndicator";
import {
  uploadDocument,
  updateDocument,
  deleteDocument,
  searchDocuments,
  embeddingDocument,
} from "@admin/api/documentApi";
import { useToast } from "@shared/hooks/useToast";
import Pagination from "@shared/components/ui/Pagination";

export default function DocumentPage() {
  const { toast } = useToast();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchPayload, setSearchPayload] = useState({
    pageNumber: 1,
    pageSize: 5,
    ignorePagination: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReindexing, setIsReindexing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchDocuments();
  }, [searchPayload, folderId]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      let data;

      const currentPayload = { ...searchPayload };

      if (folderId) {
        if (currentPayload.advancedFilter) {
          currentPayload.advancedFilter = {
            logic: "and",
            filters: [
              currentPayload.advancedFilter,
              { field: "folderId", operator: "eq", value: Number(folderId) },
            ],
          };
        } else {
          currentPayload.advancedFilter = {
            field: "folderId",
            operator: "eq",
            value: Number(folderId),
          };
        }
      }

      data = await searchDocuments(currentPayload);

      if (data && data.success) {
        const fetchedDocs = data.result?.data || (Array.isArray(data.result) ? data.result : []);
        setDocuments(fetchedDocs);
        setTotalCount(data.result?.totalCount || fetchedDocs.length);
      } else {
        const fetchedDocs = data.result?.data || data.result || [];
        setDocuments(fetchedDocs);
        setTotalCount(data.result?.totalCount || fetchedDocs.length);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tài liệu!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setIsModalOpen(true);
  };

  const handleOpenView = (doc) => {
    setViewingDoc(doc);
    setIsDetailModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      try {
        const data = await deleteDocument(id);

        if (data.result == true) {
          fetchDocuments();
        } else {
          toast.error("Không thể xóa tài liệu này!");
        }
      } catch (error) {
        toast.error("Lỗi khi xóa tài liệu!");
      }
    }
  };

  const handleEmbedding = async (id) => {
    try {
      setIsReindexing(true);
      const data = await embeddingDocument(id);
      if (data.success) {
        toast.success("Đã kích hoạt re-index tài liệu thành công!");
      } else {
        toast.error(data.message || "Không thể re-index tài liệu này!");
      }
    } catch (error) {
      toast.error("Lỗi khi thực hiện re-index tài liệu!");
    } finally {
      setIsReindexing(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDoc(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const apiData = new FormData();
      if (folderId) {
        apiData.append("folderId", folderId);
      }
      apiData.append("name", formData.name);
      apiData.append("type", formData.type);
      if (formData.file) {
        apiData.append("file", formData.file);
      }

      if (editingDoc) {
        await updateDocument(editingDoc.id, {
          name: formData.name,
          type: formData.type,
        });
      } else {
        await uploadDocument(apiData, (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 99) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          }
        });
      }

      fetchDocuments();
    } catch (error) {
      toast.error("Lỗi khi lưu tài liệu!");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      handleModalClose();
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-6">
        {folderId && (
          <button
            onClick={() => navigate("/admin/folders")}
            className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {folderId ? "Tài liệu thư mục" : "Tất cả tài liệu"}
          </h1>
          <p className="text-sm text-gray-500">
            {folderId
              ? "Quản lý tài liệu thuộc thư mục này."
              : "Quản lý toàn bộ tài liệu lưu trữ."}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Danh sách tài liệu
          </h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
        >
          <Plus size={18} />
          Thêm tài liệu mới
        </button>
      </div>

      <AdvancedSearchFilter
        onSearch={(payload) => setSearchPayload({
          ...searchPayload,
          ...payload,
          pageNumber: 1 // Reset to page 1 on search
        })}
        filterFields={[
          { label: "Tên tài liệu", value: "name" },
          {
            label: "Danh mục (1=Luật, 2=Nghị định, 3=Thông tư, 4=Quyết định)",
            value: "type",
          },
        ]}
        searchFields={["name"]}
        sortFields={[
          { label: "Tên tài liệu", value: "name" },
          { label: "Ngày tạo", value: "createdOn" },
        ]}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-gray-500">
          Đang tải dữ liệu...
        </div>
      ) : (
        <DocumentTable
          documents={documents}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
          onView={handleOpenView}
          onEmbedding={handleEmbedding}
        />
      )}

      <div className="mt-4">
        <Pagination
          currentPage={searchPayload.pageNumber}
          totalCount={totalCount}
          pageSize={searchPayload.pageSize}
          onPageChange={(page) => setSearchPayload({ ...searchPayload, pageNumber: page })}
          isLoading={isLoading}
        />
      </div>

      <DocumentFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialData={editingDoc}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      <DocumentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        document={viewingDoc}
      />

      <BackgroundTaskIndicator
        isOpen={isReindexing}
        message="Hệ thống đang thực hiện re-index tài liệu, vui lòng đợi..."
      />
    </AdminLayout>
  );
}
