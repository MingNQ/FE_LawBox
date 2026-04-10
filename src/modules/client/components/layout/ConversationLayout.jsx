import { ChatSidebar } from "../chat/ChatSidebar";
import UsageLimitNotice from "@shared/components/toast/UsageLimitNotice";

export function ConversationLayout({
  children,
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onPinConversation,
  onRenameConversation,
}) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-slate-200">
      <div className="flex h-screen w-full overflow-hidden">
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={onSelectConversation}
          onNewConversation={onNewConversation}
          onDeleteConversation={onDeleteConversation}
          onPinConversation={onPinConversation}
          onRenameConversation={onRenameConversation}
        />
        <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark relative">
          <UsageLimitNotice />
          {children}
        </main>
      </div>
    </div>
  );
}
