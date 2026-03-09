import { http } from "./http";

const baseUrl = "/client/agents/chat";

export async function sendMessage(request) {
    const result = await http.post(baseUrl, {
        conversationId: request.conversationId,
        question: request.message,
    });
    return result.data;
}