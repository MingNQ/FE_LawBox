import { Blend, FileText, Search, Users } from "lucide-react";
import StatCard from "@admin/components/dashboard/StatCard";
import AdminLayout from "@admin/components/layout/AdminLayout";
import { useAuth } from "@shared/hooks/useAuth";
import { useEffect, useState } from "react";
import { getTokenUsageStat } from "../api/tokenUsageApi";
import { getDocumentStat } from "../api/documentApi";
import { getUserStat } from "../api/userApi";
import TokenUsageStat from "../components/dashboard/TokenUsageStat";
import { useToast } from "@shared/hooks/useToast";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tokenStat, setTokenStat] = useState(null);
  const [documentStat, setDocumentStat] = useState(null);
  const [userStat, setUserStat] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetchStat();
  }, [user]);

  const fetchStat = async () => {
    try {
      const tokenData = await getTokenUsageStat(29);
      const documentData = await getDocumentStat();
      const userData = await getUserStat();

      if (tokenData.success) {
        setTokenStat(tokenData.result);
      }

      if (documentData.success) {
        setDocumentStat(documentData.result);
      }

      if (userData.success) {
        setUserStat(userData.result);
      }
    } catch {
      toast.error("Lỗi khi tải thống kê");
    }
  };

  const totalRequests = tokenStat?.reduce(
    (sum, item) => sum + item.totalRequests,
    0,
  );

  const totalTokens = tokenStat?.reduce(
    (sum, item) => sum + item.totalTokens,
    0,
  );

  return (
    <AdminLayout>
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Tổng số tài liệu"
          value={documentStat?.totalDocuments}
          percent="5.2%"
          subtitle="Cập nhật lúc 10:30 hôm nay"
          icon={<FileText size={20} />}
        />
        <StatCard
          title="Số lượng truy vấn"
          value={totalRequests}
          percent="100%"
          subtitle="Dựa trên dữ liệu 30 ngày qua"
          icon={<Search size={20} />}
        />
        <StatCard
          title="Số lượng tokens"
          value={totalTokens}
          percent="100%"
          subtitle="Dựa trên dữ liệu 30 ngày qua"
          icon={<Blend size={20} />}
        />
        <StatCard
          title="Người dùng hoạt động"
          value={userStat?.totalUsers}
          percent="3.1%"
          icon={<Users size={20} />}
        />
      </div>

      <div className="grid gap-6">
        <TokenUsageStat />
        {/* <CategoryChartCard /> */}
      </div>
    </AdminLayout>
  );
}
