import { useEffect, useState } from "react";
import AdminLayout from "@admin/components/layout/AdminLayout";
import AgentCardList from "@admin/components/ai/AgentCardList";
import AgentFormModal from "@admin/components/ai/AgentFormModal";
import { getAiAgents, createAiAgent, updateAiAgent, deleteAiAgent } from "@admin/api/aiAgentApi";
import { useToast } from "@shared/hooks/useToast";

export default function AgentManagePage() {
  const { toast } = useToast();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = await getAiAgents();
      setAgents(data.result ?? data);
    } catch (err) {
      toast.error("Không tải được danh sách agents");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (agent) => {
    setEditing(agent);
    setModalOpen(true);
  };

  const handleDelete = async (agent) => {
    if (!confirm(`Xóa agent "${agent.name}" ?`)) return;
    try {
      await deleteAiAgent(agent.id);
      toast.success("Xóa thành công");
      fetchAgents();
    } catch (err) {
      toast.error("Xóa thất bại");
    }
  };

  const handleToggle = async (agent) => {
    try {
      const payload = { ...agent, isEnabled: !agent.isEnabled };
      await updateAiAgent(agent.id, payload);
      toast.success("Cập nhật trạng thái thành công");
      fetchAgents();
    } catch (err) {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        await updateAiAgent(editing.id, payload);
        toast.success("Cập nhật agent thành công");
      } else {
        await createAiAgent(payload);
        toast.success("Tạo agent thành công");
      }
      setModalOpen(false);
      fetchAgents();
    } catch (err) {
      toast.error("Lưu agent thất bại");
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Quản lý AI Agents</h1>
          <p className="text-sm text-gray-500">Tạo, chỉnh sửa và quản lý các AI Agents sử dụng trong hệ thống.</p>
        </div>
        <div>
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Tạo Agent</button>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="p-6 bg-white rounded-xl">Đang tải...</div>
        ) : (
          <AgentCardList agents={agents} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
        )}
      </div>

      <AgentFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editing} />
    </AdminLayout>
  );
}
