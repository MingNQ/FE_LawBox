import { useEffect, useState } from "react";
import { getTokenUsageStat } from "../../api/tokenUsageApi";
import { useAuth } from "@shared/hooks/useAuth";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function TokenUsageStat() {
  const [tokenUsages, setTokenUsages] = useState([]);
  const [days, setDays] = useState(7);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchTokenUsageStat(days);
  }, [user, days]);

  const fetchTokenUsageStat = async (d) => {
    try {
      const data = await getTokenUsageStat(d - 1);
      if (data.success) {
        setTokenUsages(data.result);
      }
    } catch {
      setTokenUsages([]);
    }
  };

  const chartData = tokenUsages.map((x) => ({
    ...x,
    day: new Date(x.period).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 h-80 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Cường độ sử dụng LLM Token</h3>
        <select 
          value={days} 
          onChange={(e) => setDays(Number(e.target.value))}
          className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer text-gray-700"
        >
          <option value={7}>7 ngày qua</option>
          <option value={30}>30 ngày qua</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip labelFormatter={(label) => `Ngày: ${label}`} />

          <Legend />

          <Bar
            dataKey="promptTokens"
            stackId="a"
            fill="#93c5fd"
            name="Prompt Tokens"
          />

          <Bar
            dataKey="completionTokens"
            stackId="a"
            fill="#2563eb"
            name="Completion Tokens"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
