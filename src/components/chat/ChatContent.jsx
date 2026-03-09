import { UserMessage } from "./UserMessage";
import { AIMessage } from "./AIMessage";
import { AIThinking } from "./AIThinking";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatContent({ messages, pendingMessage, isThinking }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingMessage, isThinking]);

  const hasContent =
    (messages && messages.length > 0) || pendingMessage || isThinking;

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
          <AIMessage key={message.id} time={message.time}>
            <p>{message.content}</p>
          </AIMessage>
        ) : (
          <UserMessage
            key={message.id}
            content={message.content}
            time={message.time}
            avatarUrl="images/default-avatar.jpg"
          />
        ),
      )}

      {pendingMessage && (
        <UserMessage
          content={pendingMessage}
          time="Vừa xong"
          avatarUrl="images/default-avatar.jpg"
        />
      )}

      {isThinking && <AIThinking />}

      <div ref={bottomRef} />
    </div>
  );
}
