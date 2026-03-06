import { ChatSidebar } from "../../chat/ChatSidebar";

export function ConversationLayout({
  children,
  conversations,
  currentConversationId,
  onSelectConversation,
}) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-slate-200">
      <div className="flex h-screen w-full overflow-hidden">
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={onSelectConversation}
        />
        <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark relative">
          {children}
        </main>
      </div>
    </div>
  );
}
