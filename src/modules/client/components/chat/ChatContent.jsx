import { UserMessage } from "./UserMessage";
import { AIMessage } from "./AIMessage";
import { AIThinking } from "./AIThinking";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatContent({
  messages,
  pendingMessage,
  isThinking,
  streamingMessage,
  onMessageReaction,
  onMessageComment,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingMessage, isThinking, streamingMessage]);

  const hasContent =
    (messages && messages.length > 0) ||
    pendingMessage ||
    isThinking ||
    streamingMessage;

  if (!hasContent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-3">
        <MessageSquare className="w-12 h-12 opacity-30" />
        <p className="text-sm font-medium">
          Chọn một cuộc trò chuyện để bắt đầu
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
      {messages?.map((message) =>
        message.role === 2 ? (
          <AIMessage
            key={message.id}
            message={message}
            onMessageReaction={onMessageReaction}
            onMessageComment={onMessageComment}
          >
            <MarkdownRenderer content={message.content} />
          </AIMessage>
        ) : (
          <UserMessage
            key={message.id}
            content={message.content}
            time={message.time}
          />
        ),
      )}

      {pendingMessage && (
        <UserMessage content={pendingMessage} time="Vừa xong" />
      )}

      {isThinking && <AIThinking />}

      {streamingMessage && (
        <AIMessage
          message={{
            content: streamingMessage,
            role: 2,
            id: "streaming",
            time: "Đang trả lời...",
          }}
        >
          <MarkdownRenderer content={streamingMessage} />
        </AIMessage>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
