import { http } from "@shared/api/http";

const baseUrl = "/client/agents";

export async function getAvailableAgents() {
  const result = await http.get(baseUrl);
  return result.data;
}

export async function chatWithAgent(payload) {
  const result = await http.post(baseUrl + "/chat", payload);
  return result.data;
}
