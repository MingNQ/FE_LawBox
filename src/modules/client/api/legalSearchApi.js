import { http } from "@shared/api/http";

const baseUrl = "/client/documents";

export async function legalSearch(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}
