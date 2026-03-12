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

export default function SearchTrendCard() {
  const [tokenUsages, setTokenUsages] = useState([]);
  const [documentStat, setDocumentStat] = useState([]);
  const [userStat, setUserStat] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchTokenUsageStat();
  }, [user]);

  const fetchTokenUsageStat = async () => {
    try {
      const data = await getTokenUsageStat(6);
      if (data.success) {
        setTokenUsages(data.result);
      }
    } catch {
      setTokenUsages([]);
    }
  };

  const fetchDocuments = () => {};

  const chartData = tokenUsages.map((x) => ({
    ...x,
    day: new Date(x.period).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 h-80">
      <h3 className="font-semibold mb-4">Số lượng Token (7 ngày)</h3>

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
