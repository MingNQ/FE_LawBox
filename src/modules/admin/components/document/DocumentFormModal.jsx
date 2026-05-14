import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function DocumentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isUploading,
  uploadProgress,
}) {
  const [formData, setFormData] = useState({
    name: "",
    type: 1,
    officialNumber: "",
    effectivenessStatus: 1,
    effectiveDate: "",
    issuedDate: "",
    file: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        type: initialData.type || "",
        officialNumber: initialData.officialNumber || "",
        effectivenessStatus: initialData.effectivenessStatus || 1,
        effectiveDate: initialData.effectiveDate ? new Date(initialData.effectiveDate).toISOString().split('T')[0] : "",
        issuedDate: initialData.issuedDate ? new Date(initialData.issuedDate).toISOString().split('T')[0] : "",
        file: null,
      });
    } else {
      setFormData({
        name: "",
        type: 1,
        officialNumber: "",
        effectivenessStatus: 1,
        effectiveDate: "",
        issuedDate: "",
        file: null,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
        ...formData,
        issuedDate: formData.issuedDate
          ? new Date(formData.issuedDate).toISOString()
          : null,

        effectiveDate: formData.effectiveDate
          ? new Date(formData.effectiveDate).toISOString()
          : null,
      };

    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-800">
          {initialData ? "Chỉnh sửa tài liệu" : "Tải lên tài liệu mới"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={initialData ? "hidden" : ""}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File tài liệu <span className="text-gray-400 font-normal">(Chỉ nhận .pdf, .doc, .docx, .txt)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài liệu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên tài liệu"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số hiệu
              </label>
              <input
                type="text"
                name="officialNumber"
                value={formData.officialNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số hiệu văn bản"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Chọn danh mục</option>
                <option value="1">Luật</option>
                <option value="2">Nghị định</option>
                <option value="3">Thông tư</option>
                <option value="4">Quyết định</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày ban hành
              </label>
              <input
                type="date"
                name="issuedDate"
                value={formData.issuedDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày có hiệu lực
              </label>
              <input
                type="date"
                name="effectiveDate"
                value={formData.effectiveDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tình trạng hiệu lực
            </label>
            <select
              name="effectivenessStatus"
              value={formData.effectivenessStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="1">Không xác định</option>
              <option value="2">Còn hiệu lực</option>
              <option value="3">Hết hiệu lực</option>
              <option value="4">Hết hiệu lực một phần</option>
              <option value="5">Sắp có hiệu lực</option>
            </select>
          </div>

          {isUploading && uploadProgress !== undefined && !initialData && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Đang tải lên...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50 min-w-[100px]"
            >
              {isUploading
                ? "Đang xử lý..."
                : initialData
                  ? "Lưu thay đổi"
                  : "Tải lên"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
