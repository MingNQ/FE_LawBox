import { http } from "@shared/api/http";

var baseUrl = "/admin/token-usages";

export async function getTokenUsageStat(day) {
  const result = await http.get(baseUrl + `/stat/day/${day}`);
  return result.data;
}
