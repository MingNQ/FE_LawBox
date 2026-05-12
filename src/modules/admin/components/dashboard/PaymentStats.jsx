import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { getPaymentStats } from "../../api/paymentApi";

export default function PaymentStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPaymentStats();
      if (res.success) {
        setData(res.result);
      }
    } catch (error) {
      console.error("Failed to fetch payment stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const dailyData = data?.dailyRevenue?.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    }),
  })) || [];

  const monthlyData = data?.monthlyRevenue?.map((item) => ({
    ...item,
    formattedMonth: item.month, // e.g., "2026-05"
  })) || [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Daily Revenue Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Doanh thu theo ngày</h3>
        </div>

        <div className="flex-1 min-h-[250px]">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Đang tải...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Doanh thu theo tháng</h3>
        </div>

        <div className="flex-1 min-h-[250px]">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Đang tải...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="formattedMonth"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  name="Doanh thu"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
