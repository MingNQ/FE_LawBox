import { useState } from "react";
import { Trash2, Edit, ToggleLeft, ToggleRight } from "lucide-react";

export default function AgentTable({ agents = [], onEdit, onDelete, onToggle }) {
  if (!agents || agents.length === 0) {
    return <div className="p-4 bg-white rounded">Chưa có agent</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider / Model</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mặc định</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kích hoạt</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {agents.map((a) => (
            <tr key={a.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.providerName} / {a.modelName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">{a.isDefault ? 'Yes' : '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                <button onClick={() => onToggle && onToggle(a)} className="inline-flex items-center gap-2 px-2 py-1 rounded">
                  {a.isEnabled ? <ToggleRight className="text-green-600"/> : <ToggleLeft className="text-gray-400"/>}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                <button onClick={() => onEdit && onEdit(a)} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                  <Edit size={16}/> Sửa
                </button>
                <button onClick={() => onDelete && onDelete(a)} className="text-red-600 hover:text-red-800 flex items-center gap-2">
                  <Trash2 size={16}/> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
