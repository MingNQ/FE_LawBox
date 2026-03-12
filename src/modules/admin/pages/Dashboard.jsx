import { FileText, Search, Users } from "lucide-react";
import CategoryChartCard from "@admin/components/dashboard/CategoryChartCard";
import SearchTrendCard from "@admin/components/dashboard/SearchTrendCard";
import StatCard from "@admin/components/dashboard/StatCard";
import AdminLayout from "@admin/components/layout/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Tổng số tài liệu"
          value="12,450"
          percent="5.2%"
          subtitle="Cập nhật lúc 10:30 hôm nay"
          icon={<FileText size={20} />}
        />
        <StatCard
          title="Số lượng truy vấn"
          value="85,200"
          percent="12.4%"
          subtitle="Dựa trên dữ liệu 30 ngày qua"
          icon={<Search size={20} />}
        />
        <StatCard
          title="Người dùng hoạt động"
          value="1,240"
          percent="3.1%"
          subtitle="Người dùng trực tuyến hiện tại"
          icon={<Users size={20} />}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SearchTrendCard />
        <CategoryChartCard />
      </div>
    </AdminLayout>
  );
}
