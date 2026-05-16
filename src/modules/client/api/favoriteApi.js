import { http } from "@shared/api/http";

const baseUrl = "client/favorite-documents";

export async function toggleFavorite(documentId) {
  const result = await http.post(`${baseUrl}/${documentId}/toggle`);
  return result.data;
}

export async function searchFavoriteDocuments(params) {
  const result = await http.post(`${baseUrl}/search`, params);
  return result.data;
}
