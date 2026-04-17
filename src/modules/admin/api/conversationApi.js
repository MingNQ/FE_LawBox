import { http } from "../../../shared/api/http";

const baseUrl = "/admin/conversations";

export async function getConversationStat() {
  const result = await http.get(baseUrl + "/stat");
  return result.data;
}
