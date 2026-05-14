import { http } from "@shared/api/http";

const baseUrl = "/documents";

export async function legalSearch(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}

export async function getDocumentById(id) {
  const result = await http.get(`${baseUrl}/${id}`);
  return result.data;
}

export async function getDocumentChunks(id) {
  const result = await http.get(`${baseUrl}/${id}/chunks`);
  return result.data;
}
