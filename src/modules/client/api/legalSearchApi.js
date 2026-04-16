import { http } from "@shared/api/http";

const baseUrl = "/documents";

export async function legalSearch(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}
