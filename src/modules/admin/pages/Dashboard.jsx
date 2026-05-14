import { Blend, FileText, Search, Users, RefreshCw, DollarSign, CreditCard } from "lucide-react";
import StatCard from "@admin/components/dashboard/StatCard";
import AdminLayout from "@admin/components/layout/AdminLayout";
import { useAuth } from "@shared/hooks/useAuth";
import { useEffect, useState } from "react";
import { getTokenUsageStat } from "../api/tokenUsageApi";
import { getDocumentStat } from "../api/documentApi";
import { getUserStat } from "../api/userApi";
import { getPaymentStats } from "../api/paymentApi";
import TokenUsageStat from "../components/dashboard/TokenUsageStat";
import UserGrowthChart from "../components/dashboard/UserGrowthChart";
import ConversationStats from "../components/dashboard/ConversationStats";
import DocumentDistributionChart from "../components/dashboard/DocumentDistributionChart";
import RecentActivityFeed from "../components/dashboard/RecentActivityFeed";
import PaymentStats from "../components/dashboard/PaymentStats";
import { useToast } from "@shared/hooks/useToast";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tokenStat, setTokenStat] = useState(null);
  const [documentStat, setDocumentStat] = useState(null);
  const [userStat, setUserStat] = useState(null);
  const [paymentStat, setPaymentStat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchStat();
  }, [user]);

  const fetchStat = async () => {
    setIsLoading(true);
    try {
      const tokenData = await getTokenUsageStat(29);
      const documentData = await getDocumentStat();
      const userData = await getUserStat();
      const paymentData = await getPaymentStats();

      if (tokenData.success) {
        setTokenStat(tokenData.result);
      }

      if (documentData.success) {
        setDocumentStat(documentData.result);
      }

      if (userData.success) {
        setUserStat(userData.result);
      }

      if (paymentData.success) {
        setPaymentStat(paymentData.result);
      }
    } catch {
      toast.error("Lỗi khi tải thống kê");
    } finally {
      setIsLoading(false);
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>
        <button 
          onClick={fetchStat}
          disabled={isLoading}
          className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 transition"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Làm mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Tổng số tài liệu"
          value={documentStat?.totalDocuments}
          loading={isLoading}
          formatter={(v) => v?.toLocaleString("vi-VN")}
          subtitle="So với 30 ngày trước"
          icon={<FileText size={20} />}
        />
        <StatCard
          title="Số lượng truy vấn"
          value={totalRequests}
          loading={isLoading}
          formatter={(v) => v?.toLocaleString("vi-VN")}
          subtitle="So với 30 ngày trước"
          icon={<Search size={20} />}
        />
        <StatCard
          title="Số lượng tokens"
          value={totalTokens}
          loading={isLoading}
          formatter={(v) => v ? (v / 1000).toFixed(1) + 'k' : '0'}
          subtitle="So với 30 ngày trước"
          icon={<Blend size={20} />}
        />
        <StatCard
          title="Người dùng hoạt động"
          value={userStat?.totalUsers}
          loading={isLoading}
          formatter={(v) => v?.toLocaleString("vi-VN")}
          subtitle="So với 30 ngày trước"
          icon={<Users size={20} />}
        />
        <StatCard
          title="Tổng doanh thu"
          value={paymentStat?.totalRevenue}
          loading={isLoading}
          formatter={(v) => v ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v) : '0 ₫'}
          subtitle="Tất cả thời gian"
          icon={<DollarSign size={20} className="text-emerald-500" />}
        />
        <StatCard
          title="Tổng giao dịch"
          value={paymentStat?.totalTransactions}
          loading={isLoading}
          formatter={(v) => v?.toLocaleString("vi-VN")}
          subtitle="Tất cả thời gian"
          icon={<CreditCard size={20} className="text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <PaymentStats />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TokenUsageStat />
        <UserGrowthChart />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ConversationStats />
        <DocumentDistributionChart documentStat={documentStat} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentActivityFeed />
      </div>
    </AdminLayout>
  );
}
