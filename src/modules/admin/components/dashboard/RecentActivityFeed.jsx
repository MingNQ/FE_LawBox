import { UserPlus, FileText, MessageSquare, Clock } from "lucide-react";

const getRelativeTime = (minutes) => {
  if (minutes < 60) return `${minutes} phút trước`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} giờ trước`;
  return `${Math.floor(minutes / 1440)} ngày trước`;
};

// Mock data
const mockActivities = [
  { id: 1, type: "user", user: "Nguyễn Văn A", action: "đã đăng ký tài khoản mới", minutesAgo: 5 },
  { id: 2, type: "document", user: "Admin", action: "đã tải lên tài liệu 'Luật Lao động 2019'", minutesAgo: 45 },
  { id: 3, type: "chat", user: "Trần Thị B", action: "bắt đầu một cuộc hội thoại mới", minutesAgo: 120 },
  { id: 4, type: "document", user: "Admin", action: "đã cập nhật tài liệu 'Nghị định 145/2020/NĐ-CP'", minutesAgo: 300 },
  { id: 5, type: "user", user: "Lê Văn C", action: "đã đăng ký tài khoản mới", minutesAgo: 1400 },
];

export default function RecentActivityFeed() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Hoạt động gần đây
        </h3>
        <button className="text-sm text-blue-600 hover:underline">Xem tất cả</button>
      </div>

      <div className="space-y-6">
        {mockActivities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 relative">
            {/* Timeline line */}
            {index !== mockActivities.length - 1 && (
              <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-gray-200"></div>
            )}
            
            {/* Icon icon */}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${
              activity.type === 'user' ? 'bg-indigo-100 text-indigo-600' :
              activity.type === 'document' ? 'bg-amber-100 text-amber-600' :
              'bg-emerald-100 text-emerald-600'
            }`}>
              {activity.type === 'user' && <UserPlus className="w-4 h-4" />}
              {activity.type === 'document' && <FileText className="w-4 h-4" />}
              {activity.type === 'chat' && <MessageSquare className="w-4 h-4" />}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1.5">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getRelativeTime(activity.minutesAgo)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
