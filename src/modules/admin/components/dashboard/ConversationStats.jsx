import { MessageSquare, ThumbsUp, ThumbsDown, Activity } from "lucide-react";

const mockStats = {
  totalConversations: 1245,
  totalMessages: 8540,
  avgMessagesPerConversation: 6.8,
  likes: 852,
  dislikes: 43,
};

export default function ConversationStats() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
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
            {mockStats.totalConversations.toLocaleString()}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Tin nhắn
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {mockStats.totalMessages.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Trung bình tin/hội thoại</span>
            <span className="font-semibold">
              {mockStats.avgMessagesPerConversation}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[68%] rounded-full"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Đánh giá hữu ích</span>
            <span className="font-semibold">
              {Math.round(
                (mockStats.likes / (mockStats.likes + mockStats.dislikes)) *
                  100,
              )}
              %
            </span>
          </div>
          <div className="flex h-2 w-full rounded-full overflow-hidden gap-0.5">
            <div
              className="h-full bg-emerald-500 rounded-l-full"
              style={{
                width: `${(mockStats.likes / (mockStats.likes + mockStats.dislikes)) * 100}%`,
              }}
              title={`${mockStats.likes} Likes`}
            ></div>
            <div
              className="h-full bg-red-400 rounded-r-full"
              style={{
                width: `${(mockStats.dislikes / (mockStats.likes + mockStats.dislikes)) * 100}%`,
              }}
              title={`${mockStats.dislikes} Dislikes`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1 text-emerald-600">
              <ThumbsUp className="w-3 h-3" /> {mockStats.likes} hữu ích
            </span>
            <span className="flex items-center gap-1 text-red-500">
              {mockStats.dislikes} <ThumbsDown className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
