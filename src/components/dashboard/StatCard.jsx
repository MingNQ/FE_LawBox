export default function StatCard({ title, value, percent, subtitle, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex justify-between">
      <div className="space-y-2">
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>

      <div className="text-right space-y-2">
        <div className="text-green-600 text-sm font-medium">↑ {percent}</div>
        <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}
