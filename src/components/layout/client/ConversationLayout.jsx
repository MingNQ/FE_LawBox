import { ChatSidebar } from "../../chat/ChatSidebar";

export function ConversationLayout({ children }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-slate-200">
      <div className="flex h-screen w-full overflow-hidden">
        <ChatSidebar />
        <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark relative">
          {children}
        </main>
      </div>
    </div>
  );
}
