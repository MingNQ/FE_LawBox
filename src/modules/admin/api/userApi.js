import { http } from "../../../shared/api/http";

const baseUrl = "/admin/user";

export async function getUserStat() {
  const result = await http.get(baseUrl + "/stat");
  return result.data;
}
