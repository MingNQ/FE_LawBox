import { X, FileText, Calendar, HardDrive, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { getDocumentById } from "@admin/api/documentApi";
import { DOCUMENT_TYPES, EFFECTIVENESS_STATUS } from "../../../../shared/constants/appConst";

export default function DocumentDetailModal({ isOpen, onClose, document: initialDoc }) {
  const [detailedDoc, setDetailedDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialDoc?.id) {
      setLoading(true);
      getDocumentById(initialDoc.id)
        .then((data) => {
          if (data.success) {
            setDetailedDoc(data.result);
          } else {
            setDetailedDoc(initialDoc);
          }
        })
        .catch(() => setDetailedDoc(initialDoc))
        .finally(() => setLoading(false));
    } else {
      setDetailedDoc(null);
    }
  }, [isOpen, initialDoc]);

  const displayDoc = detailedDoc || initialDoc;

  if (!isOpen || !displayDoc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 absolute top-0 left-0 right-0 z-0"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition z-20 bg-black/10 rounded-full p-1 hover:bg-black/20"
        >
          <X size={20} />
        </button>

        <div className="px-6 pb-6 pt-16 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-md border-4 border-white flex items-center justify-center text-blue-600">
              <FileText size={36} />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-3">
              {displayDoc.name || "Tài liệu chưa có tên"}
            </h2>
            
            <div className="flex justify-center mt-3 gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-blue-50 text-blue-700 border-blue-200 uppercase">
                {DOCUMENT_TYPES[displayDoc.type] || "Không rõ danh mục"}
              </span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-green-50 text-green-700 border-green-200 uppercase">
                {EFFECTIVENESS_STATUS[displayDoc.effectivenessStatus] || "Không xác định"}
              </span>
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
            {loading && (
              <div className="text-sm text-blue-600 mb-2 animate-pulse">Đang tải thông tin chi tiết...</div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Số hiệu</p>
                  <p className="text-sm font-medium text-gray-800">
                    {displayDoc.officialNumber || "Chưa cập nhật"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ngày tạo</p>
                  <p className="text-sm font-medium text-gray-800">
                    {displayDoc.createdOn
                      ? new Date(displayDoc.createdOn).toLocaleDateString("vi-VN")
                      : "Không xác định"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ngày ban hành</p>
                  <p className="text-sm font-medium text-gray-800">
                    {displayDoc.issuedDate
                      ? new Date(displayDoc.issuedDate).toLocaleDateString("vi-VN")
                      : "Chưa cập nhật"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ngày có hiệu lực</p>
                  <p className="text-sm font-medium text-gray-800">
                    {displayDoc.effectiveDate
                      ? new Date(displayDoc.effectiveDate).toLocaleDateString("vi-VN")
                      : "Chưa cập nhật"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500">
                  <HardDrive size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Kích thước</p>
                  <p className="text-sm font-medium text-gray-800">
                    {displayDoc.fileStorage?.size ? (displayDoc.fileStorage.size / 1024).toFixed(2) + " KB" : "Không rõ"}
                  </p>
                </div>
              </div>
            </div>

            {displayDoc.summary && (
               <div className="mt-4 pt-4 border-t border-gray-200">
                 <div className="flex items-center gap-2 mb-2">
                    <Info size={16} className="text-gray-500" />
                    <p className="text-xs font-semibold text-gray-600">Mô tả / Tóm tắt</p>
                 </div>
                 <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100 max-h-32 overflow-y-auto custom-scrollbar">
                   {displayDoc.summary}
                 </p>
               </div>
            )}
            
            {(displayDoc.chunksCount !== undefined) && (
               <div className="mt-2 pt-4 border-t border-gray-200 flex justify-between items-center">
                 <p className="text-xs text-gray-500">Số lượng chunks (Vector):</p>
                 <span className="text-sm font-bold text-gray-800 bg-white px-3 py-1 rounded-md shadow-sm">
                   {displayDoc.chunksCount || 0}
                 </span>
               </div>
            )}
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
