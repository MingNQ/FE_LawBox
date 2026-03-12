import { http } from "../../../shared/api/http";

const baseUrl = "/admin/documents";

export async function getDocumentStat() {
  const result = await http.get(baseUrl + "/stat");
  return result.data;
}
