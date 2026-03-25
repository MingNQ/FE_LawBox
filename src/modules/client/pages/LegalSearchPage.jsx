import { useState, useEffect } from "react";
import { ConversationLayout } from "@client/components/layout/ConversationLayout";
import { ChatHeader } from "@client/components/chat/ChatHeader";
import { ChatInput } from "@client/components/chat/ChatInput";
import { legalSearch } from "@client/api/legalSearchApi";
import AuthModal from "@client/components/auth/AuthModal";
import { useAuth } from "@shared/hooks/useAuth";
import { DocumentCard } from "@client/components/chat/AIMessage";
import {
  getMyConversation,
  deleteConversation,
  updatePinnedConversation,
  updateConversation,
} from "@client/api/conversationApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";

export default function LegalSearchPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState(null);
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (user) {
      getMyConversation().then((data) => {
        if (data.success) setConversations(data.result);
      });
    }
  }, [user]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setIsSearching(true);
    setKeyword(query);
    try {
      const data = await legalSearch({ query });
      if (data.success) {
        setResults(data.result);
      } else {
        setResults([]);
      }
    } catch (e) {
      console.log(e);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectConversation = (conversation) => {
    navigate(`${ROUTES.CHAT}/${conversation.id}`);
  };

  const handleNewConversation = () => {
    navigate(ROUTES.CHAT);
  };

  const handleDeleteConversation = async (id) => {
    const data = await deleteConversation(id);
    if (data.success) {
      setConversations((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handlePinConversation = async (id, pinned) => {
    const data = await updatePinnedConversation(id, { pinned });
    if (data.success) {
      setConversations((prev) =>
        prev?.map((c) => (c.id === id ? { ...c, pinned } : c))
      );
    }
  };

  const handleRenameConversation = async (id, title) => {
    const data = await updateConversation(id, { title });
    if (data.success) {
      setConversations((prev) =>
        prev?.map((c) => (c.id === id ? { ...c, title } : c))
      );
    }
  };

  return (
    <>
      <AuthModal open={!user} />

      <ConversationLayout
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onPinConversation={handlePinConversation}
        onRenameConversation={handleRenameConversation}
      >
        <ChatHeader title="Tra cứu Pháp luật" />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-[#0d121b]">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tìm kiếm bộ luật, nghị định</h2>
            <p className="text-slate-500">Tra cứu trực tiếp qua cơ sở dữ liệu pháp luật. Nhập từ khóa, số hiệu, hoặc nội dung.</p>
            
            {results && (
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                  Kết quả tìm kiếm cho: "<span className="text-blue-600 dark:text-blue-400">{keyword}</span>"
                </h3>
                {results.length > 0 ? (
                  <div className="grid gap-4">
                    {results.map((result, index) => (
                      <div key={index} className="bg-white dark:bg-[#161b22] p-5 rounded-xl space-y-3 shadow-md border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <DocumentCard title={result.title || "Tài liệu pháp luật"} code={result.code || "N/A"} variant="blue" />
                        {result.content && (
                          <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                            {result.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white dark:bg-[#161b22] rounded-xl border border-slate-200 dark:border-slate-800">
                     <p className="text-slate-500 dark:text-slate-400">Không tìm thấy tài liệu nào phù hợp với từ khóa.</p>
                  </div>
                )}
              </div>
            )}
            
            {isSearching && (
              <div className="flex gap-2 items-center justify-center p-8 text-slate-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                <span className="text-sm ml-2 font-medium text-blue-700 dark:text-blue-400">Đang tìm kiếm...</span>
              </div>
            )}
          </div>
        </div>

        <ChatInput onSendMessage={handleSearch} disabled={isSearching} />
      </ConversationLayout>
    </>
  );
}
