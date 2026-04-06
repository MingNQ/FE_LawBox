import { useEffect, useState } from "react";
import AdminLayout from "@admin/components/layout/AdminLayout";
import AISettingsForm from "@admin/components/ai/AISettingsForm";
import { getAiSettings, updateAiSettings } from "@admin/api/aiSettingApi";
import { useToast } from "@shared/hooks/useToast";

export default function AISettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getAiSettings();
      setSettings(data.result ?? data);
    } catch (err) {
      toast.error("Không tải được cấu hình AI");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (payload) => {
    try {
      setSaving(true);
      await updateAiSettings(payload);
      toast.success("Cập nhật cấu hình AI thành công");
      fetchSettings();
    } catch (err) {
      toast.error("Lỗi khi lưu cấu hình AI");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Cấu hình AI</h1>
          <p className="text-sm text-gray-500">Quản lý provider, endpoint và model cho Embedding &amp; LLM.</p>
        </div>
      </div>

      <div className="max-w-4xl">
        {loading ? (
          <div className="p-6 bg-white rounded-xl">Đang tải...</div>
        ) : (
          <AISettingsForm initialData={settings} onSubmit={handleSubmit} isSaving={saving} />
        )}
      </div>
    </AdminLayout>
  );
}
