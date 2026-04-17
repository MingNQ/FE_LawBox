import { useEffect, useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Activity } from "lucide-react";
import { getConversationStat } from "../../api/conversationApi";

export default function ConversationStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getConversationStat();
      if (data.success) {
        setStats(data.result);
      }
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-center p-12 h-full min-h-[320px]">
            <span className="text-gray-400">Đang tải...</span>
        </div>
     );
  }

  if (!stats) return null;

  const totalConversations = stats.totalConversations ?? 0;
  const totalMessages = stats.totalMessages ?? 0;
  const avgMessages = stats.avgMessagesPerConversation ?? 0;
  const likes = stats.likes ?? 0;
  const dislikes = stats.disLikes ?? 0;

  const totalInteractions = likes + dislikes;
  const likePercentage = totalInteractions === 0 ? 0 : Math.round((likes / totalInteractions) * 100);
  const dislikePercentage = totalInteractions === 0 ? 0 : 100 - likePercentage;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 min-h-[320px]">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-600" />
        Tương tác & Phản hồi AI
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Cuộc hội thoại
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {totalConversations.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Tin nhắn
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {totalMessages.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Trung bình tin/hội thoại</span>
            <span className="font-semibold">
              {Number(avgMessages).toFixed(1)}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, Number(avgMessages) * 10)}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Đánh giá hữu ích</span>
            <span className="font-semibold">
              {likePercentage}%
            </span>
          </div>
          <div className="flex h-2 w-full rounded-full overflow-hidden gap-0.5 bg-gray-100">
            {totalInteractions > 0 ? (
               <>
                <div
                  className="h-full bg-emerald-500 rounded-l-full"
                  style={{
                    width: `${likePercentage}%`,
                  }}
                  title={`${likes} Likes`}
                ></div>
                <div
                  className="h-full bg-red-400 rounded-r-full"
                  style={{
                    width: `${dislikePercentage}%`,
                  }}
                  title={`${dislikes} Dislikes`}
                ></div>
               </>
            ) : null}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 text-emerald-600">
              <ThumbsUp className="w-3 h-3" /> {likes} hữu ích
            </span>
            <span className="flex items-center gap-1 text-red-500">
              {dislikes} <ThumbsDown className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
