import { http } from "@shared/api/http";

const baseUrl = "/client/quotas";

export async function getMyQuota() {
  const result = await http.get(baseUrl);
  return result.data;
}
