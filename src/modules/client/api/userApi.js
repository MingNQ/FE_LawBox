import { http } from "@shared/api/http";

const baseUrl = "/client/users";

export async function updateProfile(payload) {
  const result = await http.put(`${baseUrl}/profile`, payload);
  return result.data;
}
