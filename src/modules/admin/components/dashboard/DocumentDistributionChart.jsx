import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

const TYPE_LABELS = {
  1: "Luật",
  2: "Nghị định",
  3: "Thông tư",
  4: "Quyết định",
};

export default function DocumentDistributionChart({ documentStat }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (documentStat && documentStat.documents) {
      const documents = documentStat.documents;
      const grouped = documents.reduce((acc, doc) => {
        const label = TYPE_LABELS[doc.type] || "Khác";
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.keys(grouped).map((label) => ({
        name: label,
        value: grouped[label],
      }));

      if (chartData.length === 0) {
        setData([
          { name: "Luật", value: 0 },
          { name: "Nghị định", value: 0 },
          { name: "Thông tư", value: 0 },
        ]);
      } else {
        setData(chartData);
      }
    }
  }, [documentStat]);

  const loading = !documentStat;

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
