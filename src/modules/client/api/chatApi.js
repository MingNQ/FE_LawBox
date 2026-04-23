import { http } from "@shared/api/http";
import { authStorage } from "@shared/stores/authStore";

const baseUrl = "/client/agents";
const baseApiUrl = "https://localhost:7142/api/v1"; // Match from http.js

export async function sendMessage(request) {
  const result = await http.post(baseUrl + "/chat", {
    conversationId: request.conversationId,
    question: request.message,
    ...(request.agentId ? { agentId: request.agentId } : {}),
  });
  return result.data;
}

export async function fetchChatStream(
  request,
  onStart,
  onChunk,
  onDone,
  onError,
  signal,
) {
  try {
    const token = authStorage.getToken();
    const response = await fetch(`${baseApiUrl + baseUrl}/chat-stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: request.message,
        conversationId: request.conversationId,
        agentId: request.agentId || null,
      }),
      signal: signal,
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("429");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiMessage = "";

    if (!reader) return;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunkString = decoder.decode(value, { stream: true });
      const lines = chunkString.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonStr = line.substring(6).trim();
          if (!jsonStr) continue;

          try {
            const eventData = JSON.parse(jsonStr);

            if (eventData.type === "start") {
              if (onStart) onStart(eventData);
            } else if (eventData.type === "chunk") {
              aiMessage += eventData.content;
              if (onChunk) onChunk(aiMessage);
            } else if (eventData.type === "done") {
              if (onDone) onDone(eventData);
            } else if (eventData.type === "error") {
              if (onError) onError(new Error(eventData.content));
              return;
            }
          } catch (e) {
            console.error("Lỗi khi parse JSON chunk:", e);
          }
        }
      }
    }
  } catch (error) {
    // Ignore DOMException abort error
    if (error.name !== "AbortError") {
      if (onError) onError(error);
    }
  }
}
