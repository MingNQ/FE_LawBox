export default function SearchTrendCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 h-80">
      <h3 className="font-semibold mb-4">Xu hướng tìm kiếm</h3>

      <div className="flex items-end gap-2 h-52">
        {[40, 80, 60, 90, 50, 100, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-blue-200 rounded-t-lg"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
