import { http } from "../../../shared/api/http";

const baseUrl = "/admin/folders";

export async function getFolders() {
  const result = await http.get(baseUrl);
  return result.data;
}

export async function getDocuments(id) {
  const result = await http.get(`${baseUrl}/${id}/documents`);
  return result.data;
}

export async function createFolder(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}

export async function updateFolder(id, data) {
  const result = await http.put(`${baseUrl}/${id}`, data);
  return result.data;
}

export async function deleteFolder(id) {
  const result = await http.delete(`${baseUrl}/${id}`);
  return result.data;
}
