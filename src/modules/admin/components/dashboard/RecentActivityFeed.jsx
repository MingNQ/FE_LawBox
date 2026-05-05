import { useState, useEffect } from "react";
import {
  UserPlus,
  FileText,
  MessageSquare,
  Clock,
  Shield,
  Bot,
  Loader2,
  Crown,
} from "lucide-react";
import { getRecentActivities } from "../../api/activityApi";

const getRelativeTime = (performedAt) => {
  const diffInMs = new Date() - new Date(performedAt);
  const minutes = Math.max(0, Math.floor(diffInMs / 60000));

  if (minutes < 1) return `Vừa xong`;
  if (minutes < 60) return `${minutes} phút trước`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} giờ trước`;
  return `${Math.floor(minutes / 1440)} ngày trước`;
};

const getEntityConfig = (entityType) => {
  switch (entityType) {
    case 1: // Authentication
      return { icon: Shield, bg: "bg-blue-100", text: "text-blue-600" };
    case 2: // Document
      return { icon: FileText, bg: "bg-amber-100", text: "text-amber-600" };
    case 3: // Conversation
      return {
        icon: MessageSquare,
        bg: "bg-emerald-100",
        text: "text-emerald-600",
      };
    case 4: // Agent
      return { icon: Bot, bg: "bg-purple-100", text: "text-purple-600" };
    case 6: // Subscription
      return { icon: Crown, bg: "bg-blue-100", text: "text-blue-600" };
    case 5: // User
    default:
      return { icon: UserPlus, bg: "bg-indigo-100", text: "text-indigo-600" };
  }
};

export default function RecentActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const LIMIT = 5;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await getRecentActivities();
        const items = data.result || [];
        setActivities(items);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Hoạt động gần đây
        </h3>
        {activities.length > LIMIT && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {isExpanded ? "Thu gọn" : "Xem tất cả"}
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-6 text-sm text-gray-500">
          Chưa có hoạt động nào gần đây.
        </div>
      ) : (
        <div className="space-y-6">
          {(isExpanded ? activities : activities.slice(0, LIMIT))?.map((activity, index, currentArray) => {
            const config = getEntityConfig(activity.entityType);
            const IconComponent = config.icon;

            const userName = activity.user?.fullName || "";
            let description = activity.description || "";
            let actionText = description;
            let userSpan = null;

            if (userName && description.startsWith(userName)) {
              userSpan = <span className="font-semibold">{userName}</span>;
              actionText = description.substring(userName.length);
            }

            return (
              <div key={activity.id} className="flex gap-4 relative">
                {/* Timeline line */}
                {index !== currentArray.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-gray-200"></div>
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${config.bg} ${config.text}`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <p className="text-sm text-gray-800">
                    {userSpan} {actionText}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getRelativeTime(activity.performedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
