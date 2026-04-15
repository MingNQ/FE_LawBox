import { http } from "./http";

const baseUrl = "/file-storage";

export async function uploadSingleFile(request) {
  const res = await http.post(baseUrl + "/upload/single", request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
