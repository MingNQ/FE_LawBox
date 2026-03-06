import { ConversationLayout } from "../../../components/layout/client/ConversationLayout";
import { ChatHeader } from "../../../components/chat/ChatHeader";
import { ChatInput } from "../../../components/chat/ChatInput";
import { useAuth } from "../../../hooks/useAuth";
import AuthModal from "../../../components/auth/AuthModal";
import { useEffect, useState } from "react";
import {
  getMyConversation,
  getConversationById,
} from "../../../api/conversationApi";
import ChatContent from "../../../components/chat/ChatContent";

export default function ConversationPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      try {
        const data = await getMyConversation();

        if (data.success) {
          setConversations(data.result);
        } else {
          console.log(data.result.messages);
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchConversations();
  }, [user]);

  const handleSelectConversation = async (conversation) => {
    try {
      const data = await getConversationById(conversation.id);

      if (data.success) {
        setCurrentConversation(data.result);
      } else {
        console.log(data.result.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <AuthModal open={!user} />

      <ConversationLayout
        conversations={conversations}
        currentConversationId={currentConversation?.id}
        onSelectConversation={handleSelectConversation}
      >
        <ChatHeader
          title={currentConversation?.title || "Chọn cuộc trò chuyện"}
        />

        <ChatContent messages={currentConversation?.messages} />

        <ChatInput />
      </ConversationLayout>
    </>
  );
}
