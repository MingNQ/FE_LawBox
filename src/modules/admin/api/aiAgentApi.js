import { http } from "@shared/api/http";

const baseUrl = "/admin/ai-agents";

export async function getAiAgents(params = {}) {
  const result = await http.get(baseUrl, { params });
  return result.data;
}

export async function getAiAgentById(id) {
  const result = await http.get(`${baseUrl}/${id}`);
  return result.data;
}

export async function createAiAgent(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}

export async function updateAiAgent(id, data) {
  const result = await http.put(`${baseUrl}/${id}`, data);
  return result.data;
}

export async function deleteAiAgent(id) {
  const result = await http.delete(`${baseUrl}/${id}`);
  return result.data;
}
