import { http } from "@shared/api/http";

const baseUrl = "/client/conversations/";

export async function getMyConversation() {
  const result = await http.get(baseUrl + "my");
  return result.data;
}

export async function getConversationById(id) {
  const result = await http.get(baseUrl + id);
  return result.data;
}

export async function createConversation(request) {
  const result = await http.post(baseUrl, {
    title: request.title,
  });
  return result.data;
}

export async function updateConversation(id, request) {
  const result = await http.put(baseUrl + id, {
    title: request.title,
  });
  return result.data;
}

export async function deleteConversation(id) {
  const result = await http.delete(baseUrl + id);
  return result.data;
}

export async function updatePinnedConversation(id, request) {
  const result = await http.post(baseUrl + `${id}/pin`, {
    pinned: request.pinned,
  });
  return result.data;
}

export async function reactionMessage(id, messageId, request) {
  const result = await http.post(
    baseUrl + `${id}/messages/${messageId}/reaction`,
    {
      reaction: request.reaction,
    },
  );
  return result.data;
}

export async function commentMessage(id, messageId, data) {
  const result = await http.post(
    baseUrl + `${id}/messages/${messageId}/comment`,
    data,
  );
  return result.data;
}
