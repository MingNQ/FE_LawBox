import { Edit, Trash2, Eye, RefreshCcw } from "lucide-react";
import { DOCUMENT_TYPES, EFFECTIVENESS_STATUS } from "../../../../shared/constants/appConst";

export default function DocumentTable({
  documents,
  onEdit,
  onDelete,
  onView,
  onEmbedding,
}) {
  if (!documents || documents.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
        Không có tài liệu nào để hiển thị.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-100">
          <tr>
            <th className="px-6 py-4">Tên tài liệu</th>
            <th className="px-6 py-4">Số hiệu</th>
            <th className="px-6 py-4">Danh mục</th>
            <th className="px-6 py-4">Trạng thái</th>
            <th className="px-6 py-4">Ngày ban hành</th>
            <th className="px-6 py-4">Ngày tải lên</th>
            <th className="px-6 py-4 border-l border-gray-100 text-center">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr
              key={doc.id || index}
              className="border-b border-gray-50 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium text-gray-900 max-w-xl">
                {doc.name || "Không có tiêu đề"}
              </td>
              <td className="px-6 py-4 text-gray-700 font-semibold">
                {doc.officialNumber || "-"}
              </td>
              <td className="px-6 py-4">{DOCUMENT_TYPES[doc.type] || "Không rõ"}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  doc.effectivenessStatus === 2 ? "bg-green-50 text-green-700 border border-green-200" :
                  doc.effectivenessStatus === 3 ? "bg-red-50 text-red-700 border border-red-200" :
                  doc.effectivenessStatus === 4 ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                  doc.effectivenessStatus === 5 ? "bg-blue-50 text-blue-700 border border-blue-200" :
                  "bg-gray-50 text-gray-700 border border-gray-200"
                }`}>
                  {EFFECTIVENESS_STATUS[doc.effectivenessStatus] || "Không xác định"}
                </span>
              </td>
              <td className="px-6 py-4">
                {doc.issuedDate
                  ? new Date(doc.issuedDate).toLocaleDateString("vi-VN")
                  : "-"}
              </td>
              <td className="px-6 py-4">
                {doc.createdOn
                  ? new Date(doc.createdOn).toLocaleDateString("vi-VN")
                  : "-"}
              </td>
              <td className="px-6 py-4 border-l border-gray-100">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onView?.(doc)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Xem chi tiết"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEmbedding(doc.id)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    title="Re-index (Embedding)"
                  >
                    <RefreshCcw size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(doc)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Chỉnh sửa"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
