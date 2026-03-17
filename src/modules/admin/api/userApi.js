import { http } from "../../../shared/api/http";

const baseUrl = "/admin/user";

export async function getUserStat() {
  const result = await http.get(baseUrl + "/stat");
  return result.data;
}

export async function getUsers(params) {
  const result = await http.post(baseUrl + "/search", {
    pageNumber: 0,
    pageSize: 10,
    ignorePagination: false,
  });
  return result.data;
}

export async function createUser(data) {
  const result = await http.post(baseUrl, data);
  return result.data;
}

export async function updateUser(id, data) {
  const result = await http.put(`${baseUrl}/${id}`, data);
  return result.data;
}

export async function deleteUser(id) {
  const result = await http.delete(`${baseUrl}/${id}`);
  return result.data;
}

export async function updateUserStatus(id, isActive) {
  const result = await http.put(`${baseUrl}/${id}/status`, { isActive });
  return result.data;
}

export async function resetPasswordUser(id) {
  const result = await http.put(`${baseUrl}/${id}/reset-password`);
  return result.data;
}
