# Hướng dẫn tích hợp API Chat Stream (SSE)

Tài liệu này cung cấp hướng dẫn cho đội ngũ Frontend (FE) về cách kết nối và sử dụng tính năng Chat Stream (trả về kết quả dưới dạng Server-Sent Events - SSE) cho ứng dụng LawBox.

## 1. Thông tin API Endpoint

- **URL:** `POST /api/v1/agents/chat-stream`
- **Method:** `POST`
- **Headers yêu cầu:**
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <token>` (Bắt buộc, do là endpoint yêu cầu xác thực)
- **Response Content-Type:** `text/event-stream`

## 2. Request Body (Payload)

Payload gửi lên hoàn toàn tương tự như API chat thông thường (`AgentChatCommand`), với các trường sau:

```json
{
  "conversationId": 123, // (Tùy chọn) ID của cuộc hội thoại, bỏ trống nếu là hội thoại mới
  "question": "Luật lao động quy định thế nào về nghỉ phép?", // (Bắt buộc) Câu hỏi của user
  "agentId": 456 // (Tùy chọn) ID của AI Agent, nếu có
}
```

## 3. Định dạng Response (Server-Sent Events)

Server sẽ trả về các cục dữ liệu theo chuẩn SSE dưới dạng văn bản (text), cấu trúc mỗi block dữ liệu sẽ có dạng `data: <JSON_STRING>\n\n`.

Mỗi dòng dữ liệu JSON sẽ tuân theo cấu trúc của DTO `AgentStreamEvent`, bao gồm:

```typescript
interface AgentStreamEvent {
  type: "start" | "chunk" | "done";
  conversationId?: number | null;
  content: string;
}
```

### Các sự kiện (Events) trả về:

1. **Sự kiện `start` (Bắt đầu stream)**
   - Luôn là event đầu tiên trả về.
   - Chứa `conversationId` hợp lệ (kể cả khi tạo mới hội thoại). Frontend nên lấy ID này để update URL hoặc gán vào các tin nhắn tiếp theo.
   - Ví dụ: 
     ```
     data: {"type":"start","conversationId":123,"content":""}
     ```

2. **Sự kiện `chunk` (Các mảnh nội dung của câu trả lời)**
   - Trả về liên tục trong quá trình LLM generate text.
   - Frontend cần nối (`append`) chuỗi `content` này vào giao diện tin nhắn hiện tại của bot.
   - Ví dụ:
     ```
     data: {"type":"chunk","conversationId":null,"content":"Theo "}
     data: {"type":"chunk","conversationId":null,"content":"quy định của pháp "}
     data: {"type":"chunk","conversationId":null,"content":"luật..."}
     ```

3. **Sự kiện `done` (Kết thúc stream)**
   - Trả về khi quá trình chat hoàn tất và dữ liệu (tin nhắn, quota) đã được lưu vào database.
   - Frontend dựa vào event này để dừng trạng thái "đang sinh câu trả lời" (stop loading/typing state).
   - Ví dụ:
     ```
     data: {"type":"done","conversationId":null,"content":""}
     ```

## 4. Hướng dẫn code phía Frontend (React / TypeScript)

Bởi vì endpoint là `POST` và yêu cầu truyền Header `Authorization`, bạn **KHÔNG THỂ** sử dụng đối tượng `EventSource` mặc định của trình duyệt (do `EventSource` chỉ hỗ trợ GET và không thể custom Headers). 

Bạn nên dùng thư viện `@microsoft/fetch-event-source` hoặc tự implement bằng `fetch` API với stream reader. Dưới đây là hướng dẫn dùng `fetch` API gốc của trình duyệt:

### Sử dụng Fetch API với ReadableStream

```typescript
async function fetchChatStream(question: string, conversationId?: number) {
  try {
    const response = await fetch('/api/v1/agents/chat-stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        question: question,
        conversationId: conversationId,
        agentId: null // Có thể đổi tùy logic
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Đọc stream từ response body
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let aiMessage = ""; // Biến để lưu text gộp lại từ stream

    if (!reader) return;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      // Decode mảng byte thành chuỗi
      const chunkString = decoder.decode(value, { stream: true });
      
      // SSE trả về có dạng "data: { ... }\n\n"
      // Cần tách theo dòng để xử lý các event bị gộp chung trong 1 chunk
      const lines = chunkString.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.substring(6).trim();
          if (!jsonStr) continue;

          try {
            const eventData = JSON.parse(jsonStr) as AgentStreamEvent;

            if (eventData.type === 'start') {
              console.log('Bắt đầu hội thoại với ID:', eventData.conversationId);
              // TODO: Cập nhật Conversation ID trên UI nếu đây là hội thoại mới
            } 
            else if (eventData.type === 'chunk') {
              aiMessage += eventData.content;
              // TODO: Update state của UI tại đây để chữ hiện ra dần dần
              // ví dụ: setBotMessage(aiMessage);
            } 
            else if (eventData.type === 'done') {
              console.log('Kết thúc stream');
              // TODO: Stop loading state, enable lại nút send
            }
          } catch (e) {
            console.error('Lỗi khi parse JSON chunk:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Lỗi gọi API chat stream:', error);
  }
}
```

## 5. Xử lý Lỗi và Ngắt kết nối

- **Mất kết nối giữa chừng**: Backend sử dụng `HttpContext.RequestAborted` để nhận biết FE ngắt kết nối. Nếu User nhấn "Stop generating" ở client, hãy dùng `AbortController` gắn vào fetch request để ngắt. Backend sẽ tự động dừng gọi LLM và lưu lại phần tin nhắn đã sinh ra vào DB.
- **Quota Exceeded (Hết số lượng tin nhắn/token)**: API có thể sẽ ném ra lỗi (HTTP 400 hoặc 403) ngay từ lúc khởi tạo request, vì backend kiểm tra quota trước khi bắt đầu gọi LLM. Frontend nhớ bắt exception (ở `!response.ok`) để hiển thị thông báo yêu cầu nâng cấp gói cước.
