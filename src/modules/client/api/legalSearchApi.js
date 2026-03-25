import { http } from "@shared/api/http";

const baseUrl = "/client/legal-search";

export async function legalSearch(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}
