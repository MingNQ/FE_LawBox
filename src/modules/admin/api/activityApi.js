import { http } from "../../../shared/api/http";

const baseUrl = "/admin/activities";

export async function getRecentActivities(params = {}) {
  const result = await http.get(baseUrl, { params });
  return result.data;
}
