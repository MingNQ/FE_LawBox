import { Edit, Trash2 } from "lucide-react";

export default function DocumentTable({ documents, onEdit, onDelete }) {
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
            <th className="px-6 py-4">Định Dạng</th>
            <th className="px-6 py-4">Trạng thái</th>
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
              <td className="px-6 py-4 font-medium text-gray-900">
                {doc.name || "Không có tiêu đề"}
              </td>
              <td className="px-6 py-4">{doc.type == 1 ? "File" : "Text"}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.status === "active"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {doc.status === "active" ? "Đã duyệt" : "Chưa duyệt"}
                </span>
              </td>
              <td className="px-6 py-4">
                {doc.createdOn
                  ? new Date(doc.createdOn).toLocaleDateString("vi-VN")
                  : "-"}
              </td>
              <td className="px-6 py-4 border-l border-gray-100">
                <div className="flex justify-center gap-3">
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
