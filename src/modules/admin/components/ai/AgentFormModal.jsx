import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function AgentFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    systemPrompt: "",
    providerName: "",
    providerEndpoint: "",
    providerApiKey: "",
    modelName: "",
    temperature: 0.7,
    isDefault: false,
    isEnabled: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        systemPrompt: initialData.systemPrompt || "",
        providerName: initialData.providerName || "",
        providerEndpoint: initialData.providerEndpoint || "",
        providerApiKey: initialData.providerApiKey || "",
        modelName: initialData.modelName || "",
        temperature: initialData.temperature ?? 0.7,
        isDefault: initialData.isDefault || false,
        isEnabled:
          initialData.isEnabled !== undefined ? initialData.isEnabled : true,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        systemPrompt: "",
        providerName: "",
        providerEndpoint: "",
        providerApiKey: "",
        modelName: "",
        temperature: 0.7,
        isDefault: false,
        isEnabled: true,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-800">
          {initialData ? "Chỉnh sửa Agent" : "Tạo Agent mới"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lời chú dẫn cho agent
            </label>
            <textarea
              name="systemPrompt"
              value={formData.systemPrompt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider (Github Model, OpenAI, Ollama,...)
              </label>
              <select
                name="providerName"
                value={formData.providerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="">Chọn Provider</option>
                <option value="GithubModel">GithubModel</option>
                <option value="Ollama">Ollama</option>
                <option value="GoogleAI">GoogleAI</option>
                <option value="OpenAI">OpenAI</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model (gpt-o4, gpt-oss,...)
              </label>
              <input
                name="modelName"
                value={formData.modelName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider Endpoint (https://your-endpoint.example)
            </label>
            <input
              name="providerEndpoint"
              value={formData.providerEndpoint}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ApiKey
            </label>
            <input
              name="providerApiKey"
              value={formData.providerApiKey}
              onChange={handleChange}
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="2"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="w-32 px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                Mặc định
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isEnabled"
                name="isEnabled"
                checked={formData.isEnabled}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="isEnabled" className="ml-2 text-sm text-gray-700">
                Kích hoạt
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {initialData ? "Lưu" : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
