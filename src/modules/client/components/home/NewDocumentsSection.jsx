import { useState, useEffect } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { legalSearch } from "@client/api/legalSearchApi";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../shared/constants/routes";
import { DocumentCard } from "@shared/components/documents/DocumentCard";
import { DocumentSkeleton } from "@shared/components/documents/DocumentSkeleton";

export function NewDocumentsSection() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await legalSearch({ keyword: "" });
        if (response.success && response.result) {
          setDocuments(response.result.slice(0, 2));
        }
      } catch (error) {
        console.error("Failed to fetch new documents", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  return (
    <section className="bg-white dark:bg-[#0b0f19] py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-wider mb-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full" />
              Cập nhật mới nhất
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Văn bản pháp luật mới <br className="hidden md:block" /> công bố
              tháng này
            </h2>
          </div>

          <Link
            to={ROUTES.LEGAL_SEARCH}
            className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            Xem tất cả thư viện
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, idx) => (
              <DocumentSkeleton key={idx} />
            ))}
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
            {documents.map((doc, idx) => (
              <DocumentCard key={doc.id || idx} document={doc} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/40 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">
              Hiện tại chưa có văn bản mới nào được cập nhật.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
