export default function CategoryChartCard() {
  const data = [
    { name: "Dân sự", value: 60 },
    { name: "Hình sự", value: 90 },
    { name: "Đất đai", value: 50 },
    { name: "Lao động", value: 80 },
    { name: "Thuế", value: 40 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 h-80">
      <h3 className="font-semibold mb-6">Tài liệu theo danh mục</h3>

      <div className="flex items-end gap-4 h-52">
        {data.map((item, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              className="bg-blue-300 rounded-t-lg"
              style={{ height: `${item.value}%` }}
            ></div>
            <p className="text-xs mt-2 text-gray-600">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
