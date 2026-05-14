import { FileText, Download } from "lucide-react";
import { DOCUMENT_TYPES, EFFECTIVENESS_STATUS } from "@shared/constants/appConst";
import { Badge } from "@shared/components/ui/Badge";

export function DocumentCard({ document, onClick }) {
  const date = document.createdOn
    ? new Date(document.createdOn).toLocaleDateString("vi-VN")
    : "N/A";

  const handleDownload = (e) => {
    e.stopPropagation();
    if (document.fileStorage?.fullPathUrl) {
      window.open(document.fileStorage.fullPathUrl, "_blank");
    } else {
      console.warn("Download URL not found");
      alert("Liên kết tải xuống không khả dụng.");
    }
  };
  const getStatusVariant = (status) => {
    switch(status) {
      case 2: return "success";
      case 3: return "danger";
      case 4: return "warning";
      case 5: return "primary";
      default: return "secondary";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full relative overflow-hidden ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 group-hover:bg-blue-500 transition-all duration-300" />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant={document.type === 1 ? "primary" : "secondary"}>
          {DOCUMENT_TYPES[document.type] || "Văn bản"}
        </Badge>
        {document.effectivenessStatus && (
          <Badge variant={getStatusVariant(document.effectivenessStatus)}>
            {EFFECTIVENESS_STATUS[document.effectivenessStatus] || "Không xác định"}
          </Badge>
        )}
      </div>

      <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
        {document.name || "Tài liệu pháp luật"}
      </h3>

      <div className="grid grid-cols-1 gap-1 mb-4 text-xs text-slate-500 dark:text-slate-400">
        {document.officialNumber && (
          <p><span className="font-semibold text-slate-600 dark:text-slate-300">Số hiệu:</span> {document.officialNumber}</p>
        )}
        <div className="flex gap-4">
          {document.issuedDate && (
            <p><span className="font-semibold text-slate-600 dark:text-slate-300">Ban hành:</span> {new Date(document.issuedDate).toLocaleDateString("vi-VN")}</p>
          )}
          {document.effectiveDate && (
            <p><span className="font-semibold text-slate-600 dark:text-slate-300">Hiệu lực:</span> {new Date(document.effectiveDate).toLocaleDateString("vi-VN")}</p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
          <FileText className="w-4 h-4 text-blue-500" />
          <span className="uppercase">
            {document.fileStorage?.extension || "DOC"}
          </span>
          {document.fileStorage?.size && (
            <span className="text-slate-300 dark:text-slate-700 ml-1">
              • {(document.fileStorage.size / 1024).toFixed(1)} KB
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center group/btn"
            title="Tải xuống tài liệu"
          >
            <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
