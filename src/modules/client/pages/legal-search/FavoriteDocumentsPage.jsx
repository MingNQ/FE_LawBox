import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientLayout } from "@client/components/layout/ClientLayout";
import { searchFavoriteDocuments } from "@client/api/favoriteApi";
import { Heart, BookOpen, AlertCircle, Loader2 } from "lucide-react";
import { DocumentCard } from "@shared/components/documents/DocumentCard";
import { DocumentSkeleton } from "@shared/components/documents/DocumentSkeleton";
import Pagination from "@shared/components/ui/Pagination";
import { ROUTES } from "@shared/constants/routes";
import { useLanguage } from "@shared/hooks/useLanguage";

export default function FavoriteDocumentsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 3;

  const fetchFavorites = async (page = 1) => {
    setIsLoading(true);
    try {
      const data = await searchFavoriteDocuments({
        pageNumber: page,
        pageSize: pageSize,
      });
      
      if (data.success) {
        setResults(data.result.data || []);
        setTotalCount(data.result.totalCount || 0);
      } else {
        setResults([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites(currentPage);
  }, [currentPage]);

  return (
    <ClientLayout>
      <section className="w-full bg-slate-50 dark:bg-[#0b0f19] py-12 md:py-16 min-h-[400px]">
        <div className="max-w-[1200px] mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
            </div>
          ) : results && results.length > 0 ? (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                  Đã lưu {totalCount} văn bản
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <DocumentCard 
                    key={result.id || index} 
                    document={result} 
                    onClick={() => navigate(ROUTES.DOCUMENT_DETAIL.replace(":documentId", result.id))}
                  />
                ))}
              </div>

              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                Chưa có văn bản yêu thích
              </h3>
              <div className="text-slate-400 dark:text-slate-500 max-w-md mx-auto mb-8">
                <p>
                  Bạn chưa lưu văn bản nào vào danh sách yêu thích. Hãy nhấn vào
                  biểu tượng trái tim trên các văn bản để lưu lại tại đây.
                </p>
              </div>

              <button
                onClick={() => navigate(ROUTES.LEGAL_SEARCH)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                <BookOpen className="w-5 h-5" />
                Khám phá văn bản
              </button>
            </div>
          )}
        </div>
      </section>
    </ClientLayout>
  );
}
