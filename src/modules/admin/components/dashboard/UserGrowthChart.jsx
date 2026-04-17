import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { getUserGrowth } from "../../api/userApi";

export default function UserGrowthChart() {
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUserGrowth(days);
      if (data.success) {
        const formattedData = data.result.map((x) => ({
          ...x,
          day: new Date(x.day).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          }),
          newUsers: x.newUsers ?? 0,
          totalUser: x.totalUser ?? 0,
        }));
        setChartData(formattedData);
      }
    } catch {
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col h-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Tăng trưởng người dùng</h3>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer text-gray-700"
        >
          <option value={7}>7 ngày qua</option>
          <option value={30}>30 ngày qua</option>
          <option value={90}>90 ngày qua</option>
        </select>
      </div>

      <div className="flex-1 min-h-[250px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Đang tải...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelFormatter={(label) => `Ngày: ${label}`}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="newUsers"
                name="Đăng ký mới"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalUser"
                name="Tổng người dùng"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
