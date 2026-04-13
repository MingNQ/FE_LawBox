import { useState } from "react";
import { ClientLayout } from "@client/components/layout/ClientLayout";
import { legalSearch } from "@client/api/legalSearchApi";
import {
  Search,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { DocumentCard } from "@shared/components/documents/DocumentCard";
import { DocumentSkeleton } from "@shared/components/documents/DocumentSkeleton";

const FILTER_TAGS = [
  { label: "Tất cả", value: "all" },
  { label: "Luật", value: "luat" },
  { label: "Nghị định", value: "nghi-dinh" },
  { label: "Quyết định", value: "quyet-dinh" },
];

export default function LegalSearchPage() {
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSearch = async (e) => {
    e?.preventDefault();
    const query = searchInput.trim();
    if (!query) return;
    setIsSearching(true);
    setKeyword(query);
    try {
      const data = await legalSearch({ keyword: query });
      if (data.success) {
        setResults(data.result);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTagClick = (tag) => {
    setActiveFilter(tag);
    if (tag !== "all" && searchInput.trim()) {
      // Could add filter logic here when API supports it
    }
  };

  const resultCount = results?.length ?? 0;

  return (
    <ClientLayout>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            Tra cứu văn bản
            <br className="hidden md:block" />
            <span className="text-blue-200">Pháp luật</span>
          </h1>
          <div className="max-w-xl mx-auto">
            <p className="text-blue-200/80 text-base md:text-lg mb-10">
              Tìm kiếm bộ luật, nghị định, thông tư và các văn bản pháp luật.
              Nhập từ khóa, số hiệu hoặc nội dung liên quan.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-[750px] mx-auto">
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-2xl shadow-blue-900/30 border border-white/20">
              <div className="flex items-center pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                className="no-focus-outline flex-1 border-none bg-transparent text-slate-800 dark:text-white text-base md:text-lg placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-0"
                placeholder="Nhập từ khóa, số hiệu văn bản..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={isSearching || !searchInput.trim()}
                className="bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-base transition-all flex items-center gap-2 shrink-0"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Tìm kiếm</span>
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag.value}
                onClick={() => handleTagClick(tag.value)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 border ${
                  activeFilter === tag.value
                    ? "bg-white text-blue-700 border-white shadow-lg shadow-blue-900/20"
                    : "bg-white/10 text-blue-100 border-white/10 hover:bg-white/20 hover:border-white/20"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 dark:bg-[#0b0f19] py-12 md:py-16 min-h-[400px]">
        <div className="max-w-[900px] mx-auto px-6">
          {isSearching && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>
                  Đang tìm kiếm "
                  <strong className="text-blue-600">{keyword}</strong>"...
                </span>
              </div>
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
            </div>
          )}

          {!isSearching && results && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                  Kết quả cho "<span className="text-blue-600">{keyword}</span>"
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full font-medium">
                  {resultCount} kết quả
                </span>
              </div>

              {resultCount > 0 ? (
                <div className="grid gap-4">
                  {results.map((result, index) => (
                    <DocumentCard 
                      key={index} 
                      document={result} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Không tìm thấy văn bản nào phù hợp
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                    Hãy thử tìm kiếm với từ khóa khác
                  </p>
                </div>
              )}
            </div>
          )}

          {!isSearching && !results && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
                Bắt đầu tra cứu
              </h3>
              <div className="max-w-md mx-auto">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Nhập từ khóa vào ô tìm kiếm phía trên để tra cứu văn bản pháp
                  luật, nghị định, thông tư và các văn bản liên quan.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </ClientLayout>
  );
}
