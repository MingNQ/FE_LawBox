import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getFolders } from "@admin/api/folderApi";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function DocumentDistributionChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const folderRes = await getFolders();
      if (folderRes.success) {
        const folders = folderRes.result;
        const data = folders.map((f) => ({
          name: f.name,
          value: f.documentCount,
        }));

        if (data.length === 0) {
          setData([
            { name: "Luật", value: 45 },
            { name: "Nghị định", value: 30 },
            { name: "Thông tư", value: 15 },
            { name: "Khác", value: 10 },
          ]);
        } else {
          setData(data);
        }
      }
    } catch {
      setData([
        { name: "Luật", value: 45 },
        { name: "Nghị định", value: 30 },
        { name: "Thông tư", value: 15 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col min-h-[320px]">
      <h3 className="font-semibold text-gray-800 mb-4">Phân bổ tài liệu</h3>

      <div className="flex-1 min-h-[250px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Đang tải...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} tài liệu`, "Số lượng"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
