import { http } from "@shared/api/http";

const baseUrl = "admin/ai-settings"

export const getAiSettings = async () => {
  const res = await http.get(baseUrl);
  return res.data;
};

export const updateAiSettings = async (payload) => {
  const res = await http.put(baseUrl, payload);
  return res.data;
};
