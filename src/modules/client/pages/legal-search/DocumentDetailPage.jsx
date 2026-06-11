import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClientLayout } from "@client/components/layout/ClientLayout";
import { getDocumentById, getDocumentChunks } from "@client/api/legalSearchApi";
import {
  ArrowLeft,
  Book,
  Calendar,
  FileText,
  Hash,
  Loader2,
  ChevronRight,
  List,
  ExternalLink,
  Heart,
} from "lucide-react";
import { useFavorite } from "@shared/hooks/useFavorite";
import {
  DOCUMENT_TYPES,
  EFFECTIVENESS_STATUS,
} from "@shared/constants/appConst";
import { Badge } from "@shared/components/ui/Badge";
import { MarkdownRenderer } from "@client/components/chat/MarkdownRenderer";

export default function DocumentDetailPage() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { isFavorite: checkFavorite, toggleFavorite: toggleFavoriteCtx } =
    useFavorite();
  const [document, setDocument] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isToggling, setIsToggling] = useState(false);

  const isFavorite = checkFavorite(documentId);
  const contentRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [docRes, chunksRes] = await Promise.all([
          getDocumentById(documentId),
          getDocumentChunks(documentId),
        ]);

        if (docRes.success) {
          setDocument(docRes.result);
        } else {
          setError("Không tìm thấy thông tin tài liệu.");
        }

        if (chunksRes.success) {
          // Sort chunks by article number
          const sortedChunks = (chunksRes.result || []).sort(
            (a, b) => a.articleNumber - b.articleNumber,
          );
          setChunks(sortedChunks);
          if (sortedChunks.length > 0) {
            setActiveArticle(sortedChunks[0].articleNumber);
          }
        }
      } catch (err) {
        console.error("Error fetching document details:", err);
        setError("Đã có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  const handleFavoriteToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    await toggleFavoriteCtx(documentId);
    setIsToggling(false);
  };

  const selectArticle = (articleNumber) => {
    setActiveArticle(articleNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 2:
        return "success";
      case 3:
        return "danger";
      case 4:
        return "warning";
      case 5:
        return "primary";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium">
            Đang tải nội dung tài liệu...
          </p>
        </div>
      </ClientLayout>
    );
  }

  if (error || !document) {
    return (
      <ClientLayout>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Rất tiếc!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            {error || "Tài liệu không tồn tại hoặc đã bị xóa."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
        </div>
      </ClientLayout>
    );
  }

  const currentChunk = chunks.find((c) => c.articleNumber === activeArticle);

  const formatLegalContent = (text) => {
    if (!text) return "";
    let s = text;

    // Remove bracketed markers like "[Chương ... > Mục ...]" only if at start
    s = s.replace(/^\s*\[[^\]]+\]\s*:?\s*/g, "");

    // Convert chunking markers like "]: " into paragraph breaks
    s = s.replace(/\]\:\s*/g, "]\n\n");

    // Ensure 'Điều N.' starts on its own line
    s = s.replace(/\s*(Điều\s*\d+\.)\s*/gi, "\n\n$1 ");

    // Put enumerations (1., 2., ...) on new lines
    s = s.replace(/\s*([0-9]+)\.\s*/g, "\n\n$1. ");

    // Remove accidental repeated header (if first sentence repeats twice)
    const firstChunk = s.slice(0, 200).trim();
    if (firstChunk.length > 40) {
      const rest = s.slice(firstChunk.length).trim();
      if (rest.startsWith(firstChunk.slice(0, 80))) {
        s = rest;
      }
    }

    // Collapse multiple blank lines to maximum two
    s = s.replace(/\n{3,}/g, "\n\n");

    // Remove standalone 'Điều' at start (no number) to avoid empty heading
    s = s.replace(/^\s*Điều\s*[\r\n]+/i, "");

    // Normalize blank lines before numbered lists: ensure single newline before numbers
    s = s.replace(/\n{2,}(?=\s*[0-9]+\.\s)/g, "\n");

    // Ensure numbering starts at beginning of line (no leading spaces)
    s = s.replace(/^[ \t]+(?=[0-9]+\.)/gm, "");

    // If a heading like '### Điều N.' is followed by extra blank line before '1.', tighten it
    s = s.replace(/(###\s*Điều\s*\d+\.)\s*\n+\s*([0-9]+\.)/i, "$1\n$2");

    // Trim edges
    return s.trim();
  };

  return (
    <ClientLayout>
      <div className="bg-slate-50 dark:bg-[#0b0f19] min-h-screen pb-20">
        {/* Header Section */}
        <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[60px] z-30 pt-4 pb-6 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-4 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại tìm kiếm
            </button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant={document.type === 1 ? "primary" : "secondary"}
                  >
                    {DOCUMENT_TYPES[document.type] || "Văn bản"}
                  </Badge>
                  {document.effectivenessStatus && (
                    <Badge
                      variant={getStatusVariant(document.effectivenessStatus)}
                    >
                      {EFFECTIVENESS_STATUS[document.effectivenessStatus] ||
                        "Không xác định"}
                    </Badge>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                  {document.name}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Số hiệu:
                    </span>
                    {document.officialNumber || "Đang cập nhật"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Ban hành:
                    </span>
                    {document.issuedDate
                      ? new Date(document.issuedDate).toLocaleDateString(
                          "vi-VN",
                        )
                      : "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Hiệu lực:
                    </span>
                    {document.effectiveDate
                      ? new Date(document.effectiveDate).toLocaleDateString(
                          "vi-VN",
                        )
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 shrink-0">
                <button
                  onClick={handleFavoriteToggle}
                  disabled={isToggling}
                  className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-500 shadow-sm"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
                  }`}
                  title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>

                {document.fileStorage?.fullPathUrl && (
                  <a
                    href={document.fileStorage.fullPathUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Xem bản gốc ({document.fileStorage?.extension})
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-[1200px] mx-auto px-6 mt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4">
              <div className="sticky top-[280px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
                  <List className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-800 dark:text-white text-sm">
                    Danh mục nội dung
                  </span>
                </div>
                <div className="max-h-[calc(100vh-320px)] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {chunks.length > 0 ? (
                    chunks.map((chunk) => (
                      <button
                        key={chunk.id}
                        onClick={() => selectArticle(chunk.articleNumber)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                          activeArticle === chunk.articleNumber
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <span className="truncate">
                          Điều {chunk.articleNumber}
                        </span>
                        {activeArticle === chunk.articleNumber && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Không có danh mục điều luật
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Document Content */}
            <main className="lg:w-3/4">
              {currentChunk ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black">
                      {currentChunk.articleNumber}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      Điều {currentChunk.articleNumber}
                    </h3>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <MarkdownRenderer
                      content={formatLegalContent(currentChunk.content)}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
                  <Book className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Vui lòng chọn một điều luật từ danh mục để xem nội dung.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
