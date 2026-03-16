import { http } from "../../../shared/api/http";

const baseUrl = "/admin/documents";

export async function getDocumentStat() {
  const result = await http.get(baseUrl + "/stat");
  return result.data;
}

export async function uploadDocument(data) {
  const result = await http.post(baseUrl + "/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
}

export async function updateDocument(id, data) {
  const result = await http.put(`${baseUrl}/${id}`, data);
  return result.data;
}

export async function deleteDocument(id) {
  const result = await http.delete(`${baseUrl}/${id}`);
  return result.data;
}
