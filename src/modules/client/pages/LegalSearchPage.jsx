import { useState } from "react";
import { ClientLayout } from "@client/components/layout/ClientLayout";
import { legalSearch } from "@client/api/legalSearchApi";
import {
  Search,
  Scale,
  BookOpen,
  FileCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";

const FILTER_TAGS = [
  { label: "Tất cả", value: "all" },
  { label: "Luật", value: "luat" },
  { label: "Nghị định", value: "nghi-dinh" },
  { label: "Quyết định", value: "quyet-dinh" },
];

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-1/3" />
          <div className="space-y-2 mt-4">
            <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-full" />
            <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ result }) {
  return (
    <div className="group bg-white dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
          <FileCheck className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {result.title || "Tài liệu pháp luật"}
          </h3>
          <span className="inline-block mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            {result.code || "N/A"}
          </span>
          {result.content && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
              {result.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
      const data = await legalSearch({ query });
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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/10">
            <Scale className="w-4 h-4" />
            Cơ sở dữ liệu pháp luật Việt Nam
          </div>
          <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
            Tra cứu văn bản
            <br className="hidden md:block" />
            <span className="text-blue-200">Pháp luật</span>
          </h1>
          <p className="text-blue-200/80 text-base md:text-lg max-w-[600px] mx-auto mb-10">
            Tìm kiếm bộ luật, nghị định, thông tư và các văn bản pháp luật. Nhập từ khóa, số hiệu hoặc nội dung liên quan.
          </p>

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
                <span>Đang tìm kiếm "<strong className="text-blue-600">{keyword}</strong>"...</span>
              </div>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
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
                    <ResultCard key={index} result={result} />
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
              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-md mx-auto">
                Nhập từ khóa vào ô tìm kiếm phía trên để tra cứu văn bản pháp luật, nghị định, thông tư và các văn bản liên quan.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {["Luật Lao động", "Nghị định 145", "Bảo hiểm xã hội", "Hợp đồng lao động"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSearchInput(suggestion);
                        setIsSearching(true);
                        setKeyword(suggestion);
                        legalSearch({ query: suggestion })
                          .then((data) => {
                            if (data.success) setResults(data.result);
                            else setResults([]);
                          })
                          .catch(() => setResults([]))
                          .finally(() => setIsSearching(false));
                      }}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
                    >
                      <Search className="w-3.5 h-3.5" />
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </ClientLayout>
  );
}
