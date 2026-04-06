import { useState, useEffect } from "react";

export default function AISettingsForm({ initialData, onSubmit, isSaving }) {
  const embeddingProviders = [
    "OpenAI",
    "GitHub",
    "Custom",
  ];

  const llmProviders = [
    "OpenAI",
    "GitHub",
    "Custom",
  ];

  const [form, setForm] = useState({
    activeEmbeddingProvider: "",
    embeddingProviderCustom: "",
    embeddingEndpoint: "",
    embeddingModel: "",
    embeddingApiKey: "",
    activeLlmProvider: "",
    llmProviderCustom: "",
    llmEndpoint: "",
    llmModel: "",
    llmApiKey: "",
  });

  useEffect(() => {
    if (initialData) {
      const rawEmbedding =
        initialData.activeEmbeddingProvider ?? initialData.ActiveEmbeddingProvider ?? "";
      const rawLlm = initialData.activeLlmProvider ?? initialData.ActiveLlmProvider ?? "";

      setForm({
        activeEmbeddingProvider: embeddingProviders.includes(rawEmbedding)
          ? rawEmbedding
          : rawEmbedding
          ? "Custom"
          : "",
        embeddingProviderCustom: embeddingProviders.includes(rawEmbedding) ? "" : rawEmbedding || "",
        embeddingEndpoint:
          initialData.embeddingEndpoint ?? initialData.EmbeddingEndpoint ?? "",
        embeddingModel: initialData.embeddingModel ?? initialData.EmbeddingModel ?? "",
        embeddingApiKey: initialData.embeddingApiKey ?? initialData.EmbeddingApiKey ?? "",
        activeLlmProvider: llmProviders.includes(rawLlm) ? rawLlm : rawLlm ? "Custom" : "",
        llmProviderCustom: llmProviders.includes(rawLlm) ? "" : rawLlm || "",
        llmEndpoint: initialData.llmEndpoint ?? initialData.LlmEndpoint ?? "",
        llmModel: initialData.llmModel ?? initialData.LlmModel ?? "",
        llmApiKey: initialData.llmApiKey ?? initialData.LlmApiKey ?? "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };

    payload.activeEmbeddingProvider =
      form.activeEmbeddingProvider === "Custom" ? form.embeddingProviderCustom : form.activeEmbeddingProvider;
    payload.activeLlmProvider =
      form.activeLlmProvider === "Custom" ? form.llmProviderCustom : form.activeLlmProvider;

    delete payload.embeddingProviderCustom;
    delete payload.llmProviderCustom;

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Cấu hình Embedding</h2>
        <p className="text-sm text-gray-500">Thiết lập provider và model cho embedding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Provider (Active)</label>
          <select
            name="activeEmbeddingProvider"
            value={form.activeEmbeddingProvider}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-white"
          >
            <option value="">-- Chọn provider --</option>
            {embeddingProviders.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {form.activeEmbeddingProvider === "Custom" && (
            <input
              name="embeddingProviderCustom"
              value={form.embeddingProviderCustom}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 border rounded-lg"
              placeholder="Nhập tên provider tùy chỉnh"
            />
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Embedding Endpoint</label>
          <input
            name="embeddingEndpoint"
            value={form.embeddingEndpoint}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://api.openai.com/v1/embeddings"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Embedding Model</label>
          <input
            name="embeddingModel"
            value={form.embeddingModel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="text-embedding-3-small"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Embedding API Key (optional)</label>
          <input
            name="embeddingApiKey"
            value={form.embeddingApiKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="sk-..."
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800">Cấu hình LLM</h2>
        <p className="text-sm text-gray-500">Thiết lập provider và model cho LLM.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Provider (Active)</label>
          <select
            name="activeLlmProvider"
            value={form.activeLlmProvider}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-white"
          >
            <option value="">-- Chọn provider --</option>
            {llmProviders.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {form.activeLlmProvider === "Custom" && (
            <input
              name="llmProviderCustom"
              value={form.llmProviderCustom}
              onChange={handleChange}
              className="w-full mt-2 px-3 py-2 border rounded-lg"
              placeholder="Nhập tên provider tùy chỉnh"
            />
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">LLM Endpoint</label>
          <input
            name="llmEndpoint"
            value={form.llmEndpoint}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="https://api.openai.com/v1/chat/completions"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">LLM Model</label>
          <input
            name="llmModel"
            value={form.llmModel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="gpt-4o-mini or gpt-4o"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">LLM API Key (optional)</label>
          <input
            name="llmApiKey"
            value={form.llmApiKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="sk-..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isSaving ? "Đang lưu..." : "Lưu cấu hình"}
        </button>
      </div>
    </form>
  );
}
